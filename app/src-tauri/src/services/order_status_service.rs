use crate::models::audit_log::{AuditAction, AuditContext, AuditEntity};
use crate::services::audit_service::AuditTransaction;
use anyhow::Context;
use deadpool_tiberius::Pool;
use tiberius::Row;

use crate::models::order_status::{NewOrderStatus, OrderStatus, UpdateOrderStatus};

fn order_status_from_row(row: Row) -> anyhow::Result<OrderStatus> {
    Ok(OrderStatus {
        id: row
            .try_get::<i32, _>("Id")?
            .context("Unexpected NULL value for OrderStatus Id")?,
        status_name: row
            .try_get::<&str, _>("StatusName")?
            .map(str::to_owned)
            .context("Unexpected NULL value for OrderStatus StatusName")?,
    })
}

pub async fn add_order_status(
    pool: &Pool,
    audit: &AuditContext,
    order_status: NewOrderStatus,
) -> anyhow::Result<OrderStatus> {
    let mut transaction = AuditTransaction::begin(
        pool,
        audit,
        AuditAction::Create,
        AuditEntity::OrderStatuses,
        None,
    )
    .await?;
    let result = Box::pin(async {
        let client = transaction.client();

        let row = client
            .query(
                r#"
                INSERT INTO dbo.OrderStatuses (StatusName)
                OUTPUT INSERTED.Id, INSERTED.StatusName
                VALUES (@P1);
            "#,
                &[&order_status.status_name],
            )
            .await?
            .into_row()
            .await?
            .context("OrderStatus inserted, but no record is returned")?;

        order_status_from_row(row)
    })
    .await;
    transaction
        .finish(pool, result, |value| Some(value.id))
        .await
}

pub async fn get_order_status_by_id(pool: &Pool, id: i32) -> anyhow::Result<Option<OrderStatus>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                SELECT Id, StatusName
                FROM dbo.OrderStatuses
                WHERE Id = @P1;
            "#,
            &[&id],
        )
        .await?
        .into_row()
        .await?;

    row.map(order_status_from_row).transpose()
}

pub async fn get_all_order_statuses(pool: &Pool) -> anyhow::Result<Vec<OrderStatus>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let rows = client
        .query(
            r#"
                SELECT Id, StatusName
                FROM dbo.OrderStatuses
                ORDER BY Id;
            "#,
            &[],
        )
        .await?
        .into_first_result()
        .await?;

    rows.into_iter().map(order_status_from_row).collect()
}

pub async fn update_order_status(
    pool: &Pool,
    audit: &AuditContext,
    id: i32,
    order_status: UpdateOrderStatus,
) -> anyhow::Result<Option<OrderStatus>> {
    let mut transaction = AuditTransaction::begin(
        pool,
        audit,
        AuditAction::Update,
        AuditEntity::OrderStatuses,
        Some(id),
    )
    .await?;
    let result = Box::pin(async {
        let client = transaction.client();

        let row = client
            .query(
                r#"
                UPDATE dbo.OrderStatuses
                SET StatusName = @P1
                OUTPUT INSERTED.Id, INSERTED.StatusName
                WHERE Id = @P2;
            "#,
                &[&order_status.status_name, &id],
            )
            .await?
            .into_row()
            .await?;

        row.map(order_status_from_row).transpose()
    })
    .await;
    transaction
        .finish(pool, result, |value| value.as_ref().map(|record| record.id))
        .await
}

pub async fn delete_order_status_by_id(
    pool: &Pool,
    audit: &AuditContext,
    id: i32,
) -> anyhow::Result<bool> {
    let mut transaction = AuditTransaction::begin(
        pool,
        audit,
        AuditAction::Delete,
        AuditEntity::OrderStatuses,
        Some(id),
    )
    .await?;
    let result = Box::pin(async {
        let client = transaction.client();

        let result = client
            .execute("DELETE FROM dbo.OrderStatuses WHERE Id = @P1;", &[&id])
            .await
            .context("Failed to delete order status.")?;

        Ok(result.total() > 0)
    })
    .await;
    transaction
        .finish(pool, result, |deleted| deleted.then_some(id))
        .await
}
