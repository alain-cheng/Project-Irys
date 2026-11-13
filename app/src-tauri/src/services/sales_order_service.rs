use anyhow::Context;
use chrono::NaiveDate;
use deadpool_tiberius::Pool;
use tiberius::Row;

use crate::models::sales_order::{NewSalesOrder, SalesOrder, UpdateSalesOrder};

/// Shared field mapping for all SalesOrders queries.
fn sales_order_from_row(row: Row) -> anyhow::Result<SalesOrder> {
    Ok(SalesOrder {
        id: row
            .try_get::<i32, _>("Id")?
            .context("Unexpected NULL value for SalesOrder Id")?,
        customer_id: row.try_get::<i32, _>("CustomerId")?,
        order_date: row
            .try_get::<NaiveDate, _>("OrderDate")?
            .context("Unexpected NULL value for SalesOrder OrderDate")?,
        remarks: row.try_get::<&str, _>("Remarks")?.map(str::to_owned),
        order_status_id: row
            .try_get::<i32, _>("OrderStatusId")?
            .context("Unexpected NULL value for SalesOrder OrderStatusId")?,
        total: row
            .try_get::<f64, _>("Total")?
            .context("Unexpected NULL value for SalesOrder Total")?,
        salesman: row.try_get::<i32, _>("Salesman")?,
        po_number: row.try_get::<&str, _>("PONumber")?.map(str::to_owned),
        term_code: row.try_get::<i32, _>("TermCode")?,
        shipper_id: row.try_get::<i32, _>("ShipperId")?,
        user: row.try_get::<i32, _>("User")?,
        employee_id: row.try_get::<i32, _>("EmployeeId")?,
        notes: row.try_get::<&str, _>("Notes")?.map(str::to_owned),
    })
}

pub async fn add_sales_order(
    pool: &Pool,
    sales_order: NewSalesOrder,
) -> anyhow::Result<SalesOrder> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                INSERT INTO dbo.SalesOrders (
                    CustomerId, OrderDate, Remarks, OrderStatusId, Total,
                    Salesman, PONumber, TermCode, ShipperId, [User],
                    EmployeeId, Notes
                )
                OUTPUT
                    INSERTED.Id, INSERTED.CustomerId, INSERTED.OrderDate, INSERTED.Remarks, INSERTED.OrderStatusId,
                    INSERTED.Total, INSERTED.Salesman, INSERTED.PONumber, INSERTED.TermCode, INSERTED.ShipperId,
                    INSERTED.[User], INSERTED.EmployeeId, INSERTED.Notes
                VALUES (
                    @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10,
                    @P11, @P12
                );
            "#,
            &[
                &sales_order.customer_id,
                &sales_order.order_date,
                &sales_order.remarks,
                &sales_order.order_status_id,
                &sales_order.total,
                &sales_order.salesman,
                &sales_order.po_number,
                &sales_order.term_code,
                &sales_order.shipper_id,
                &sales_order.user,
                &sales_order.employee_id,
                &sales_order.notes,
            ],
        )
        .await?
        .into_row()
        .await?
        .context("SalesOrder inserted, but no record is returned")?;

    sales_order_from_row(row)
}

pub async fn get_sales_order_by_id(pool: &Pool, id: i32) -> anyhow::Result<Option<SalesOrder>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                SELECT
                    Id, CustomerId, OrderDate, Remarks, OrderStatusId,
                    Total, Salesman, PONumber, TermCode, ShipperId,
                    [User], EmployeeId, Notes
                FROM dbo.SalesOrders
                WHERE Id = @P1;
            "#,
            &[&id],
        )
        .await?
        .into_row()
        .await?;

    row.map(sales_order_from_row).transpose()
}

pub async fn get_all_sales_orders(pool: &Pool) -> anyhow::Result<Vec<SalesOrder>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let rows = client
        .query(
            r#"
                SELECT
                    Id, CustomerId, OrderDate, Remarks, OrderStatusId,
                    Total, Salesman, PONumber, TermCode, ShipperId,
                    [User], EmployeeId, Notes
                FROM dbo.SalesOrders
                ORDER BY Id;
            "#,
            &[],
        )
        .await?
        .into_first_result()
        .await?;

    rows.into_iter().map(sales_order_from_row).collect()
}

pub async fn update_sales_order(
    pool: &Pool,
    id: i32,
    sales_order: UpdateSalesOrder,
) -> anyhow::Result<Option<SalesOrder>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                UPDATE dbo.SalesOrders
                SET
                    CustomerId = @P1,
                    OrderDate = @P2,
                    Remarks = @P3,
                    OrderStatusId = @P4,
                    Total = @P5,
                    Salesman = @P6,
                    PONumber = @P7,
                    TermCode = @P8,
                    ShipperId = @P9,
                    [User] = @P10,
                    EmployeeId = @P11,
                    Notes = @P12
                OUTPUT
                    INSERTED.Id, INSERTED.CustomerId, INSERTED.OrderDate, INSERTED.Remarks, INSERTED.OrderStatusId,
                    INSERTED.Total, INSERTED.Salesman, INSERTED.PONumber, INSERTED.TermCode, INSERTED.ShipperId,
                    INSERTED.[User], INSERTED.EmployeeId, INSERTED.Notes
                WHERE Id = @P13;
            "#,
            &[
                &sales_order.customer_id,
                &sales_order.order_date,
                &sales_order.remarks,
                &sales_order.order_status_id,
                &sales_order.total,
                &sales_order.salesman,
                &sales_order.po_number,
                &sales_order.term_code,
                &sales_order.shipper_id,
                &sales_order.user,
                &sales_order.employee_id,
                &sales_order.notes,
                &id,
            ],
        )
        .await?
        .into_row()
        .await?;

    row.map(sales_order_from_row).transpose()
}

pub async fn delete_sales_order_by_id(pool: &Pool, id: i32) -> anyhow::Result<bool> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let result = client
        .execute("DELETE FROM dbo.SalesOrders WHERE Id = @P1;", &[&id])
        .await
        .context("Failed to delete sales order.")?;

    Ok(result.total() > 0)
}
