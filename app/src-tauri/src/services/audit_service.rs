use crate::models::audit_log::{AuditAction, AuditContext, AuditEntity, AuditEvent, AuditOutcome};
use anyhow::Context;
use deadpool_tiberius::{deadpool::managed::Object, Client, Manager, Pool};

/// Explicit projection: contact details, tax IDs, free text, photos and secrets
/// are deliberately not copied into the audit trail.
pub(super) fn snapshot_columns(entity: AuditEntity) -> &'static str {
    match entity {
        AuditEntity::Users => "UserId, Username, EmployeeId, RoleId, isActive",
        AuditEntity::Customers => "Id, CompanyName, Alarm, EmployeeId, PriceLvl, CreditLimit, Balance, Credit, InvBalance, AreaCode, CustomerCode, CustomerArea, CustomerAgent, CustomerType, StartDate, SmCode, Term, TermCode, PType",
        AuditEntity::Items => "ItemCode, ItemName, UnitsInStock, ReturnStocks, UnitCode, CategoryId, SupplierId, SellingPrice, R1SPrice, R2Price, SPPrice, PurchasePrice, AverageCost, BasePrice, ReorderLevel, isDiscontinued, OnSOrder, OnPOrder, SDisc1, SDisc2, SDisc3, SDisc4, SDisc5, SDisc6, SDisc7, SDisc8, SDisc9, SDisc10, SDiscId, R1Price, R1Disc1, R1Disc2, R1Disc3, R1Disc4, R1Disc5, R1Disc6, R1Disc7, R1Disc8, R1Disc9, R1Disc10, R1DiscId, R2Disc1, R2Disc2, R2Disc3, R2Disc4, R2Disc5, R2Disc6, R2Disc7, R2Disc8, R2Disc9, R2Disc10, R2DiscId, SPDisc1, SPDisc2, SPDisc3, SPDisc4, SPDisc5, SPDisc6, SPDisc7, SPDisc8, SPDisc9, SPDisc10, SPDiscId, PDisc1, PDisc2, PDisc3, PDisc4, PDisc5, PDisc6, PDisc7, PDisc8, PDisc9, PDisc10, PDiscId, PUnitPrice, RetailPrice, ItemGroupId, ItemLocationId, ItemCommission, TermCode, PTermCode, Pack, isEdited, isReorderActive, isInventoryAdjust, TempAverageCost, isKit",
        AuditEntity::Suppliers => "Id, SupplierName, Balance, PurchaseBalance, Credit",
        AuditEntity::Orders => "Id, CustomerId, InvoiceNumber, EmployeeId, OrderDate, DeliveryDate, isPaid, DueDate, TermCode, Total, DeliveredBy, PackedBy, OrderStatusId, Balance, Salesman, [User], Returns, AmountPaid, BIR, ShipperId, Adjust, OrderProfit, OrderFree, SalesOrderId, CreditsApplied, Consign, DRNumber, Commission, SINumber, SIDate, SIBalance, SINetAmount, PONumber, BeginningBalance, WTax, Cancelled, WarehouseId, Rebate, CommissionPaid, CommissionDate, NoCommission, ReferenceNumber, CommissionAmount, CommissionFixed, Collector, isCommissionComputable, DatePaid, CollectedAmount, isHeavy, Err, PaymentModeId, Driver, Helper, Truck",
        AuditEntity::SalesOrders => "Id, CustomerId, OrderDate, OrderStatusId, Total, Salesman, PONumber, TermCode, ShipperId, [User], EmployeeId",
        AuditEntity::SalesOrderDetails => "Id, SalesOrderId, Quantity, ItemCode, UnitPrice, Amount, Invoiced, isClosed, SDisc1, SDisc2, SDisc3, SDisc4, SDisc5, SDisc6, SDisc7, SDisc8, SDisc9, SDisc10, SDiscId",
        AuditEntity::OrderStatuses => "Id, StatusName",
    }
}

struct Snapshot {
    data: String,
    // Transient fingerprint detects edits to omitted fields without logging their values.
    fingerprint: Vec<u8>,
}

async fn snapshot(
    client: &mut Client,
    entity: AuditEntity,
    id: i32,
) -> anyhow::Result<Option<Snapshot>> {
    let table = entity.table();
    let key = entity.key();
    let columns = snapshot_columns(entity);
    let sql = format!(
        r#"SELECT
        (SELECT {columns} FROM dbo.[{table}] WITH (UPDLOCK, HOLDLOCK) WHERE [{key}] = @P1
            FOR JSON PATH, INCLUDE_NULL_VALUES, WITHOUT_ARRAY_WRAPPER) AS Data,
        HASHBYTES('SHA2_256', (SELECT * FROM dbo.[{table}] WITH (UPDLOCK, HOLDLOCK) WHERE [{key}] = @P1
            FOR JSON PATH, INCLUDE_NULL_VALUES, WITHOUT_ARRAY_WRAPPER)) AS Fingerprint;"#
    );
    let row = client
        .query(sql, &[&id])
        .await?
        .into_row()
        .await?
        .context("Missing audit snapshot result")?;
    let data = row
        .try_get::<&str, _>("Data")?
        .filter(|value| !value.is_empty());
    data.map(|data| {
        Ok(Snapshot {
            data: data.to_owned(),
            fingerprint: row
                .try_get::<&[u8], _>("Fingerprint")?
                .context("Missing audit fingerprint")?
                .to_vec(),
        })
    })
    .transpose()
}

pub async fn insert(client: &mut Client, event: &AuditEvent) -> anyhow::Result<()> {
    client
        .execute(
            r#"INSERT INTO dbo.AuditLogs
        (ActorUserId, ActorUsername, AttemptedUsername, Action, EntityType, EntityId,
         Outcome, ReasonCode, BeforeData, AfterData, CorrelationId, SessionReference)
        VALUES (@P1,@P2,@P3,@P4,@P5,@P6,@P7,@P8,@P9,@P10,@P11,@P12);"#,
            &[
                &event.context.actor_user_id,
                &event.context.actor_username,
                &event.attempted_username,
                &event.action.as_str(),
                &event.entity.table(),
                &event.entity_id,
                &event.outcome.as_str(),
                &event.reason,
                &event.before_data,
                &event.after_data,
                &event.context.correlation_id,
                &event.context.session_reference,
            ],
        )
        .await
        .context("Unable to store audit event")?;
    Ok(())
}

pub async fn record(pool: &Pool, event: &AuditEvent) -> anyhow::Result<()> {
    let mut client = pool
        .get()
        .await
        .context("Audit database connection unavailable")?;
    insert(&mut client, event).await
}

/// Never mask a rejected operation or prevent logout if SQL Server is unavailable.
/// Failure diagnostics intentionally contain no payloads or raw database errors.
pub async fn record_best_effort(pool: &Pool, event: &AuditEvent) {
    if record(pool, event).await.is_err() {
        log::error!(
            "Audit persistence failed: action={}, correlation={}",
            event.action.as_str(),
            event.context.correlation_id
        );
    }
}

pub fn attempted_username(value: &str) -> String {
    // Bound by UTF-16 units, matching NVARCHAR(255), and exclude control characters.
    let mut units = 0;
    value
        .trim()
        .chars()
        .filter(|c| !c.is_control())
        .take_while(|c| {
            units += c.len_utf16();
            units <= 255
        })
        .collect()
}

/// Detaches unfinished connections on cancellation/panic instead of returning an
/// open transaction to the pool. Closing the connection rolls it back in SQL Server.
pub struct AuditTransaction {
    connection: Option<Object<Manager>>,
    active: bool,
    event: AuditEvent,
    before: Option<Snapshot>,
}

impl Drop for AuditTransaction {
    fn drop(&mut self) {
        if self.active {
            if let Some(connection) = self.connection.take() {
                drop(Object::take(connection));
            }
        }
    }
}

impl AuditTransaction {
    pub async fn begin(
        pool: &Pool,
        context: &AuditContext,
        action: AuditAction,
        entity: AuditEntity,
        id: Option<i32>,
    ) -> anyhow::Result<Self> {
        let connection = pool
            .get()
            .await
            .context("Failed to retrieve database connection")?;
        let mut tx = Self {
            connection: Some(connection),
            active: true,
            event: AuditEvent::new(context, action, entity, id, AuditOutcome::Success),
            before: None,
        };
        // SQL batches permit BEGIN and COMMIT in separate calls; RPC execute does not.
        tx.client()
            .simple_query("SET XACT_ABORT ON; BEGIN TRANSACTION;")
            .await?
            .into_results()
            .await?;
        if matches!(action, AuditAction::Update | AuditAction::Delete) {
            if let Some(id) = id {
                tx.before = snapshot(tx.client(), entity, id).await?;
            }
        }
        Ok(tx)
    }

    pub fn client(&mut self) -> &mut Client {
        self.connection.as_mut().expect("Active audit connection")
    }

    async fn rollback(&mut self) -> anyhow::Result<()> {
        self.client()
            .simple_query("IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;")
            .await?
            .into_results()
            .await?;
        self.active = false;
        Ok(())
    }

    /// The closure extracts the actual changed record ID, or None for not-found.
    pub async fn finish<T>(
        mut self,
        pool: &Pool,
        result: anyhow::Result<T>,
        changed_id: impl FnOnce(&T) -> Option<i32>,
    ) -> anyhow::Result<T> {
        let result = match result {
            Ok(value) => {
                let id = changed_id(&value);
                self.event.entity_id = id.or(self.event.entity_id);
                let completed: anyhow::Result<()> = async {
                    let entity = self.event.entity;
                    let after = if self.event.action != AuditAction::Delete {
                        if let Some(id) = id {
                            Some(
                                snapshot(self.client(), entity, id)
                                    .await?
                                    .context("Changed record missing from audit snapshot")?,
                            )
                        } else {
                            None
                        }
                    } else {
                        None
                    };
                    let unchanged_update = self.event.action == AuditAction::Update
                        && self
                            .before
                            .as_ref()
                            .zip(after.as_ref())
                            .is_some_and(|(old, new)| old.fingerprint == new.fingerprint);
                    self.event.outcome = if id.is_none() || unchanged_update {
                        AuditOutcome::NoChange
                    } else {
                        AuditOutcome::Success
                    };
                    if id.is_none() {
                        self.event.reason = Some("NOT_FOUND");
                    }
                    if self.event.outcome == AuditOutcome::NoChange && id.is_some() {
                        self.event.reason = Some("UNCHANGED");
                    }
                    self.event.before_data = self.before.as_ref().map(|s| s.data.clone());
                    self.event.after_data = after.map(|s| s.data);
                    if self.event.action == AuditAction::Update
                        && self.event.outcome == AuditOutcome::Success
                        && self.event.before_data == self.event.after_data
                    {
                        self.event.reason = Some("REDACTED_FIELDS_CHANGED");
                    }
                    insert(
                        self.connection.as_mut().expect("Active audit connection"),
                        &self.event,
                    )
                    .await?;
                    self.client()
                        .simple_query("COMMIT TRANSACTION;")
                        .await?
                        .into_results()
                        .await?;
                    self.active = false;
                    Ok(())
                }
                .await;
                completed.map(|_| value)
            }
            Err(error) => Err(error),
        };
        match result {
            Ok(value) => Ok(value),
            Err(error) => {
                self.rollback()
                    .await
                    .context("Audit transaction rollback failed")?;
                self.event.outcome = AuditOutcome::Failure;
                self.event.reason = Some("OPERATION_FAILED");
                // Do not retain snapshots of changes that were rolled back.
                self.event.before_data = None;
                self.event.after_data = None;
                drop(self.connection.take());
                // Registration failures are recorded by auth_service, including
                // validation failures and the sanitized attempted username.
                if self.event.action != AuditAction::Register {
                    record_best_effort(pool, &self.event).await;
                }
                Err(error)
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn audit_username_is_bounded_and_removes_control_characters() {
        let name = attempted_username(&format!("  user\r\n{}", "😀".repeat(255)));
        assert!(!name.contains('\n') && !name.contains('\r'));
        assert!(name.encode_utf16().count() <= 255);
    }

    #[test]
    fn snapshot_allowlists_exclude_credentials_and_private_contact_fields() {
        for entity in [
            AuditEntity::Users,
            AuditEntity::Customers,
            AuditEntity::Suppliers,
        ] {
            let columns = snapshot_columns(entity).to_lowercase();
            for secret in ["password", "tin", "phone", "address", "contactname"] {
                assert!(!columns.contains(secret));
            }
        }
        assert!(AuditEntity::from_permission("items.delete").is_ok());
        assert!(AuditEntity::from_permission("arbitrary;sql.delete").is_err());
    }
}
