//! Opt-in local SQL Server checks. Creates only uniquely named test records.
//! Business records are removed through audited services; test users are retained
//! inactive because their audit history intentionally prevents hard deletion.
use super::{
    audit_service::*, auth_service, customer_service, item_service, order_service,
    order_status_service, sales_order_detail_service, sales_order_service, supplier_service,
};
use crate::auth::AuthSession;
use crate::models::audit_log::{AuditAction, AuditContext, AuditEntity, AuditEvent, AuditOutcome};
use crate::models::user::{LoginRequest, RegistrationRequest};
use anyhow::Context;
use serde_json::{json, Value};
use uuid::Uuid;

#[test]
#[ignore = "requires seeded local IRYS_Dev SQL Server; retains inactive test user and audit evidence"]
fn local_database_audit_roundtrip() {
    // This integration scenario holds all seven large CRUD contracts in one
    // debug future. Keep its test harness off the small Windows test stack.
    std::thread::Builder::new()
        .stack_size(16 * 1024 * 1024)
        .spawn(run_audit_roundtrip)
        .unwrap()
        .join()
        .unwrap();
}

fn run_audit_roundtrip() {
    tauri::async_runtime::block_on(async {
        let pool = crate::config::database::create_connection_pool().unwrap();
        let suffix = Uuid::new_v4().simple().to_string();
        let username = format!("audit_test_{}", &suffix[..16]);
        let marker = format!("AUDIT TEST {}", &suffix[..12]);
        let private = format!("PRIVATE_{}", &suffix[..8]);
        let password = format!("Temporary audit test {}", Uuid::new_v4());
        let user = auth_service::register(
            &pool,
            RegistrationRequest {
                username: username.clone(),
                password: password.clone(),
            },
        )
        .await
        .unwrap();
        let session = AuthSession::default();
        let mut created = Vec::<(AuditEntity, i32)>::new();
        let mut audit = AuditContext::anonymous();

        let result: anyhow::Result<()> = async {
            // Validate every safe projection, even before creating business records.
            let mut client = pool.get().await?;
            for entity in [AuditEntity::Users, AuditEntity::Customers, AuditEntity::Items, AuditEntity::Suppliers,
                AuditEntity::Orders, AuditEntity::SalesOrders, AuditEntity::SalesOrderDetails, AuditEntity::OrderStatuses] {
                let sql = format!("SELECT TOP (1) {} FROM dbo.[{}];", super::audit_service::snapshot_columns(entity), entity.table());
                client.simple_query(sql).await?.into_results().await?;
            }
            drop(client);
            auth_service::login(&pool, &session, LoginRequest { username: username.clone(), password: "Wrong test password".into() })
                .await.err().context("Incorrect password accepted")?;
            auth_service::login(&pool, &session, LoginRequest { username: username.clone(), password: password.clone() }).await?;
            let initial_context = session.identity()?.context("Missing test session")?.audit_context();
            let permissions = auth_service::current_user(&pool, &session).await?.context("Missing active test user")?.permissions;
            if !permissions.iter().any(|p| p == "items.delete") {
                auth_service::authorize(&pool, &session, "items.delete", Some(-1)).await.err().context("Staff deletion was not denied")?;
            }

            // Test fixture role assignment is explicit and audited. No existing account is altered.
            let mut tx = AuditTransaction::begin(&pool, &initial_context, AuditAction::Update, AuditEntity::Users, Some(user.user_id)).await?;
            let promoted = tx.client().execute("UPDATE dbo.Users SET RoleId = (SELECT Id FROM dbo.Roles WHERE RoleName = 'Administrator') WHERE UserId = @P1;", &[&user.user_id]).await.map(|_| user.user_id).map_err(Into::into);
            tx.finish(&pool, promoted, |id| Some(*id)).await?;
            audit = auth_service::authorize(&pool, &session, "items.create", None).await?;

            let mut customer = customer_service::add_customer(&pool, &audit, serde_json::from_value(json!({"companyName":marker,"phone":private,"tin":private}))?).await?;
            created.push((AuditEntity::Customers, customer.id));
            let mut supplier = supplier_service::add_supplier(&pool, &audit, serde_json::from_value(json!({"supplierName":marker,"phone":private,"tin":private}))?).await?;
            created.push((AuditEntity::Suppliers, supplier.id));
            let mut item = item_service::add_item(&pool, &audit, serde_json::from_value(json!({"itemName":marker,"supplierId":supplier.id,"sellingPrice":85}))?).await?;
            created.push((AuditEntity::Items, item.item_code));
            let mut so = sales_order_service::add_sales_order(&pool, &audit, serde_json::from_value(json!({"customerId":customer.id,"total":85}))?).await?;
            created.push((AuditEntity::SalesOrders, so.id));
            let mut detail = sales_order_detail_service::add_sales_order_detail(&pool, &audit, serde_json::from_value(json!({"salesOrderId":so.id,"itemCode":item.item_code,"quantity":1,"unitPrice":85,"amount":85}))?).await?;
            created.push((AuditEntity::SalesOrderDetails, detail.id));
            let mut order = order_service::add_order(&pool, &audit, serde_json::from_value(json!({"customerId":customer.id,"salesOrderId":so.id,"total":85}))?).await?;
            created.push((AuditEntity::Orders, order.id));
            let mut status = order_status_service::add_order_status(&pool, &audit, serde_json::from_value(json!({"statusName":format!("AT{}", &suffix[..6])}))?).await?;
            created.push((AuditEntity::OrderStatuses, status.id));

            macro_rules! update {
                ($module:ident, $method:ident, $record:ident, $id:expr, $field:literal, $value:expr) => {{
                    let mut payload = serde_json::to_value(&$record)?;
                    payload[$field] = json!($value);
                    $record = $module::$method(&pool, &audit, $id, serde_json::from_value(payload)?).await?.context("Updated test row missing")?;
                }};
            }
            update!(customer_service, update_customer, customer, customer.id, "creditLimit", 100);
            update!(supplier_service, update_supplier, supplier, supplier.id, "credit", 10);
            update!(item_service, update_item, item, item.item_code, "sellingPrice", 90);
            update!(sales_order_service, update_sales_order, so, so.id, "total", 90);
            update!(sales_order_detail_service, update_sales_order_detail, detail, detail.id, "quantity", 2);
            update!(order_service, update_order, order, order.id, "total", 90);
            update!(order_status_service, update_order_status, status, status.id, "statusName", format!("AT{} updated", &suffix[..6]));
            anyhow::ensure!(item.selling_price == 90.0 && so.total == 90.0 && detail.quantity == 2 && order.total == 90.0 && supplier.credit == 10.0 && status.status_name.ends_with("updated"));

            // Actual changes to private fields still count as successful updates.
            update!(customer_service, update_customer, customer, customer.id, "phone", format!("{private}_edited"));
            customer_service::update_customer(&pool, &audit, customer.id, serde_json::from_value(serde_json::to_value(&customer)?)?).await?;
            anyhow::ensure!(customer_service::update_customer(&pool, &audit, -1, serde_json::from_value(serde_json::to_value(&customer)?)?).await?.is_none());
            anyhow::ensure!(!customer_service::delete_customer_by_id(&pool, &audit, -1).await?);
            customer_service::delete_customer_by_id(&pool, &audit, customer.id).await.err().context("Referenced customer deletion must fail")?;
            anyhow::ensure!(customer_service::get_customer_by_id(&pool, customer.id).await?.is_some());

            // Force only the audit INSERT to fail using an impossible actor FK.
            let mut invalid_context = audit.clone();
            invalid_context.actor_user_id = Some(-1);
            let rollback_marker = format!("RB{}", &suffix[..6]);
            order_status_service::add_order_status(&pool, &invalid_context, serde_json::from_value(json!({"statusName":rollback_marker}))?)
                .await.err().context("Business write committed despite audit failure")?;
            let mut client = pool.get().await?;
            let count: i32 = client.query("SELECT COUNT(*) AS n FROM dbo.OrderStatuses WHERE StatusName = @P1;", &[&rollback_marker]).await?.into_row().await?.context("Missing rollback count")?.get("n").context("Missing rollback count")?;
            anyhow::ensure!(count == 0, "Audit failure did not roll back business write");
            drop(client);

            // Cancellation must not return an open transaction to the connection pool.
            let cancellation_marker = format!("CX{}", &suffix[..6]);
            let mut unfinished = AuditTransaction::begin(&pool, &audit, AuditAction::Create, AuditEntity::OrderStatuses, None).await?;
            unfinished.client().execute("INSERT INTO dbo.OrderStatuses (StatusName) VALUES (@P1);", &[&cancellation_marker]).await?;
            drop(unfinished);
            let mut client = pool.get().await?;
            let count: i32 = client.query("SELECT COUNT(*) AS n FROM dbo.OrderStatuses WHERE StatusName = @P1;", &[&cancellation_marker]).await?.into_row().await?.context("Missing cancellation count")?.get("n").context("Missing cancellation count")?;
            anyhow::ensure!(count == 0, "Cancelled transaction was not rolled back");
            drop(client);

            let mut bad_json = AuditEvent::new(&audit, AuditAction::Create, AuditEntity::Items, None, AuditOutcome::Success);
            bad_json.after_data = Some("not json".into());
            record(&pool, &bad_json).await.err().context("Invalid JSON was accepted by audit constraints")?;
            let throttled = AuthSession::default();
            for _ in 0..6 {
                auth_service::login(&pool, &throttled, LoginRequest { username: format!("missing_{}", &suffix[..16]), password: password.clone() })
                    .await.err().context("Unknown user authenticated")?;
            }
            let signed_out = AuthSession::default();
            auth_service::authorize(&pool, &signed_out, "items.update", Some(item.item_code)).await.err().context("Anonymous update allowed")?;
            auth_service::logout(&pool, &session).await?;
            anyhow::ensure!(session.user_id()?.is_none());
            Ok(())
        }.await;

        // Cleanup runs on fallible checks too. Existing rows are never modified.
        // Retain immutable audit evidence and disable the dedicated test account.
        for (entity, id) in created.into_iter().rev() {
            let removed = match entity {
                AuditEntity::Customers => {
                    customer_service::delete_customer_by_id(&pool, &audit, id).await
                }
                AuditEntity::Suppliers => {
                    supplier_service::delete_supplier_by_id(&pool, &audit, id).await
                }
                AuditEntity::Items => item_service::delete_item_by_id(&pool, &audit, id).await,
                AuditEntity::Orders => order_service::delete_order_by_id(&pool, &audit, id).await,
                AuditEntity::SalesOrders => {
                    sales_order_service::delete_sales_order_by_id(&pool, &audit, id).await
                }
                AuditEntity::SalesOrderDetails => {
                    sales_order_detail_service::delete_sales_order_detail_by_id(&pool, &audit, id)
                        .await
                }
                AuditEntity::OrderStatuses => {
                    order_status_service::delete_order_status_by_id(&pool, &audit, id).await
                }
                AuditEntity::Users => unreachable!(),
            };
            removed.expect("Test business-record cleanup failed");
        }
        let mut tx = AuditTransaction::begin(
            &pool,
            &audit,
            AuditAction::Update,
            AuditEntity::Users,
            Some(user.user_id),
        )
        .await
        .unwrap();
        let disabled = tx.client().execute("UPDATE dbo.Users SET isActive = 0, RoleId = (SELECT Id FROM dbo.Roles WHERE RoleName = 'Staff') WHERE UserId = @P1;", &[&user.user_id]).await.map(|_| user.user_id).map_err(Into::into);
        tx.finish(&pool, disabled, |id| Some(*id)).await.unwrap();
        result.unwrap();

        // Verify persisted evidence after cleanup, not only service return values.
        let mut client = pool.get().await.unwrap();
        let rows = client.query("SELECT Action, EntityType, Outcome, ReasonCode, ActorUserId, BeforeData, AfterData, SessionReference FROM dbo.AuditLogs WHERE ActorUserId = @P1 OR (EntityType = 'Users' AND EntityId = @P1) OR AttemptedUsername = @P2;", &[&user.user_id, &username])
            .await.unwrap().into_first_result().await.unwrap();
        for table in [
            "Customers",
            "Suppliers",
            "Items",
            "SalesOrders",
            "SalesOrderDetails",
            "Orders",
            "OrderStatuses",
        ] {
            for action in ["CREATE", "UPDATE", "DELETE"] {
                assert!(
                    rows.iter()
                        .any(|r| r.get::<&str, _>("EntityType") == Some(table)
                            && r.get::<&str, _>("Action") == Some(action)
                            && r.get::<&str, _>("Outcome") == Some("SUCCESS")),
                    "Missing {table} {action} audit event"
                );
            }
        }
        for (action, outcome) in [
            ("REGISTER", "SUCCESS"),
            ("LOGIN", "SUCCESS"),
            ("LOGIN", "FAILURE"),
            ("LOGOUT", "SUCCESS"),
            ("UPDATE", "NO_CHANGE"),
            ("DELETE", "FAILURE"),
        ] {
            assert!(
                rows.iter()
                    .any(|r| r.get::<&str, _>("Action") == Some(action)
                        && r.get::<&str, _>("Outcome") == Some(outcome)),
                "Missing {action} {outcome} event"
            );
        }
        assert!(rows
            .iter()
            .any(|r| r.get::<&str, _>("ReasonCode") == Some("REDACTED_FIELDS_CHANGED")));
        let price_edit = rows
            .iter()
            .find(|r| {
                r.get::<&str, _>("EntityType") == Some("Items")
                    && r.get::<&str, _>("Action") == Some("UPDATE")
            })
            .unwrap();
        let before: Value = serde_json::from_str(price_edit.get("BeforeData").unwrap()).unwrap();
        let after: Value = serde_json::from_str(price_edit.get("AfterData").unwrap()).unwrap();
        assert_eq!(before["SellingPrice"].as_f64(), Some(85.0));
        assert_eq!(after["SellingPrice"].as_f64(), Some(90.0));
        for row in &rows {
            for field in ["BeforeData", "AfterData"] {
                let data = row.get::<&str, _>(field).unwrap_or("");
                assert!(
                    !data.contains(&password)
                        && !data.contains("PasswordHash")
                        && !data.contains(&private)
                );
            }
            if row.get::<i32, _>("ActorUserId") == Some(user.user_id)
                && row.get::<&str, _>("Action") != Some("REGISTER")
            {
                assert!(row.get::<Uuid, _>("SessionReference").is_some());
            }
        }
    });
}
