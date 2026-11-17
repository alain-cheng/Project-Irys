use anyhow::Context;
use deadpool_tiberius::Pool;
use tiberius::Row;

use crate::models::sales_order_detail::{
    NewSalesOrderDetail, SalesOrderDetail, UpdateSalesOrderDetail,
};

/// Shared field mapping for all SalesOrderDetails queries.
fn sales_order_detail_from_row(row: Row) -> anyhow::Result<SalesOrderDetail> {
    Ok(SalesOrderDetail {
        id: row
            .try_get::<i32, _>("Id")?
            .context("Unexpected NULL value for SalesOrderDetail Id")?,
        sales_order_id: row.try_get::<i32, _>("SalesOrderId")?,
        quantity: row
            .try_get::<i32, _>("Quantity")?
            .context("Unexpected NULL value for SalesOrderDetail Quantity")?,
        item_code: row.try_get::<i32, _>("ItemCode")?,
        unit_price: row
            .try_get::<f64, _>("UnitPrice")?
            .context("Unexpected NULL value for SalesOrderDetail UnitPrice")?,
        amount: row.try_get::<f64, _>("Amount")?,
        invoiced: row.try_get::<i32, _>("Invoiced")?,
        is_closed: row
            .try_get::<bool, _>("isClosed")?
            .context("Unexpected NULL value for SalesOrderDetail isClosed")?,
        s_disc1: row.try_get::<i32, _>("SDisc1")?,
        s_disc2: row.try_get::<i32, _>("SDisc2")?,
        s_disc3: row.try_get::<i32, _>("SDisc3")?,
        s_disc4: row.try_get::<i32, _>("SDisc4")?,
        s_disc5: row.try_get::<i32, _>("SDisc5")?,
        s_disc6: row.try_get::<i32, _>("SDisc6")?,
        s_disc7: row.try_get::<i32, _>("SDisc7")?,
        s_disc8: row.try_get::<i32, _>("SDisc8")?,
        s_disc9: row.try_get::<i32, _>("SDisc9")?,
        s_disc10: row.try_get::<i32, _>("SDisc10")?,
        s_disc_id: row
            .try_get::<&str, _>("SDiscId")?
            .map(str::to_owned)
            .context("Unexpected NULL value for SalesOrderDetail SDiscId")?,
    })
}

pub async fn add_sales_order_detail(
    pool: &Pool,
    sales_order_detail: NewSalesOrderDetail,
) -> anyhow::Result<SalesOrderDetail> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                INSERT INTO dbo.SalesOrderDetails (
                    SalesOrderId, Quantity, ItemCode, UnitPrice, Amount,
                    Invoiced, isClosed, SDisc1, SDisc2, SDisc3,
                    SDisc4, SDisc5, SDisc6, SDisc7, SDisc8,
                    SDisc9, SDisc10, SDiscId
                )
                OUTPUT
                    INSERTED.Id, INSERTED.SalesOrderId, INSERTED.Quantity, INSERTED.ItemCode, INSERTED.UnitPrice,
                    INSERTED.Amount, INSERTED.Invoiced, INSERTED.isClosed, INSERTED.SDisc1, INSERTED.SDisc2,
                    INSERTED.SDisc3, INSERTED.SDisc4, INSERTED.SDisc5, INSERTED.SDisc6, INSERTED.SDisc7,
                    INSERTED.SDisc8, INSERTED.SDisc9, INSERTED.SDisc10, INSERTED.SDiscId
                VALUES (
                    @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10,
                    @P11, @P12, @P13, @P14, @P15, @P16, @P17, @P18
                );
            "#,
            &[
                &sales_order_detail.sales_order_id,
                &sales_order_detail.quantity,
                &sales_order_detail.item_code,
                &sales_order_detail.unit_price,
                &sales_order_detail.amount,
                &sales_order_detail.invoiced,
                &sales_order_detail.is_closed,
                &sales_order_detail.s_disc1,
                &sales_order_detail.s_disc2,
                &sales_order_detail.s_disc3,
                &sales_order_detail.s_disc4,
                &sales_order_detail.s_disc5,
                &sales_order_detail.s_disc6,
                &sales_order_detail.s_disc7,
                &sales_order_detail.s_disc8,
                &sales_order_detail.s_disc9,
                &sales_order_detail.s_disc10,
                &sales_order_detail.s_disc_id,
            ],
        )
        .await?
        .into_row()
        .await?
        .context("SalesOrderDetail inserted, but no record is returned")?;

    sales_order_detail_from_row(row)
}

pub async fn get_sales_order_detail_by_id(
    pool: &Pool,
    id: i32,
) -> anyhow::Result<Option<SalesOrderDetail>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                SELECT
                    Id, SalesOrderId, Quantity, ItemCode, UnitPrice,
                    Amount, Invoiced, isClosed, SDisc1, SDisc2,
                    SDisc3, SDisc4, SDisc5, SDisc6, SDisc7,
                    SDisc8, SDisc9, SDisc10, SDiscId
                FROM dbo.SalesOrderDetails
                WHERE Id = @P1;
            "#,
            &[&id],
        )
        .await?
        .into_row()
        .await?;

    row.map(sales_order_detail_from_row).transpose()
}

pub async fn get_all_sales_order_details(pool: &Pool) -> anyhow::Result<Vec<SalesOrderDetail>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let rows = client
        .query(
            r#"
                SELECT
                    Id, SalesOrderId, Quantity, ItemCode, UnitPrice,
                    Amount, Invoiced, isClosed, SDisc1, SDisc2,
                    SDisc3, SDisc4, SDisc5, SDisc6, SDisc7,
                    SDisc8, SDisc9, SDisc10, SDiscId
                FROM dbo.SalesOrderDetails
                ORDER BY Id;
            "#,
            &[],
        )
        .await?
        .into_first_result()
        .await?;

    rows.into_iter().map(sales_order_detail_from_row).collect()
}

pub async fn update_sales_order_detail(
    pool: &Pool,
    id: i32,
    sales_order_detail: UpdateSalesOrderDetail,
) -> anyhow::Result<Option<SalesOrderDetail>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                UPDATE dbo.SalesOrderDetails
                SET
                    SalesOrderId = @P1,
                    Quantity = @P2,
                    ItemCode = @P3,
                    UnitPrice = @P4,
                    Amount = @P5,
                    Invoiced = @P6,
                    isClosed = @P7,
                    SDisc1 = @P8,
                    SDisc2 = @P9,
                    SDisc3 = @P10,
                    SDisc4 = @P11,
                    SDisc5 = @P12,
                    SDisc6 = @P13,
                    SDisc7 = @P14,
                    SDisc8 = @P15,
                    SDisc9 = @P16,
                    SDisc10 = @P17,
                    SDiscId = @P18
                OUTPUT
                    INSERTED.Id, INSERTED.SalesOrderId, INSERTED.Quantity, INSERTED.ItemCode, INSERTED.UnitPrice,
                    INSERTED.Amount, INSERTED.Invoiced, INSERTED.isClosed, INSERTED.SDisc1, INSERTED.SDisc2,
                    INSERTED.SDisc3, INSERTED.SDisc4, INSERTED.SDisc5, INSERTED.SDisc6, INSERTED.SDisc7,
                    INSERTED.SDisc8, INSERTED.SDisc9, INSERTED.SDisc10, INSERTED.SDiscId
                WHERE Id = @P19;
            "#,
            &[
                &sales_order_detail.sales_order_id,
                &sales_order_detail.quantity,
                &sales_order_detail.item_code,
                &sales_order_detail.unit_price,
                &sales_order_detail.amount,
                &sales_order_detail.invoiced,
                &sales_order_detail.is_closed,
                &sales_order_detail.s_disc1,
                &sales_order_detail.s_disc2,
                &sales_order_detail.s_disc3,
                &sales_order_detail.s_disc4,
                &sales_order_detail.s_disc5,
                &sales_order_detail.s_disc6,
                &sales_order_detail.s_disc7,
                &sales_order_detail.s_disc8,
                &sales_order_detail.s_disc9,
                &sales_order_detail.s_disc10,
                &sales_order_detail.s_disc_id,
                &id,
            ],
        )
        .await?
        .into_row()
        .await?;

    row.map(sales_order_detail_from_row).transpose()
}

pub async fn delete_sales_order_detail_by_id(pool: &Pool, id: i32) -> anyhow::Result<bool> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let result = client
        .execute("DELETE FROM dbo.SalesOrderDetails WHERE Id = @P1;", &[&id])
        .await
        .context("Failed to delete sales order detail.")?;

    Ok(result.total() > 0)
}
