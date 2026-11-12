use anyhow::Context;
use deadpool_tiberius::Pool;
use tiberius::Row;

use crate::models::supplier::{NewSupplier, Supplier, UpdateSupplier};

/// Shared mapping for all supplier queries.
fn supplier_from_row(row: Row) -> anyhow::Result<Supplier> {
    Ok(Supplier {
        id: row
            .try_get::<i32, _>("Id")?
            .context("Unexpected NULL value for Supplier Id")?,
        supplier_name: row
            .try_get::<&str, _>("SupplierName")?
            .map(str::to_owned)
            .context("Unexpected NULL value for Supplier SupplierName")?,
        contact_name: row.try_get::<&str, _>("ContactName")?.map(str::to_owned),
        contact_title: row.try_get::<&str, _>("ContactTitle")?.map(str::to_owned),
        address: row.try_get::<&str, _>("Address")?.map(str::to_owned),
        city: row.try_get::<&str, _>("City")?.map(str::to_owned),
        province: row.try_get::<&str, _>("Province")?.map(str::to_owned),
        zip_code: row.try_get::<&str, _>("ZipCode")?.map(str::to_owned),
        phone: row.try_get::<&str, _>("Phone")?.map(str::to_owned),
        fax: row.try_get::<&str, _>("Fax")?.map(str::to_owned),
        balance: row
            .try_get::<f64, _>("Balance")?
            .context("Unexpected NULL value for Supplier Balance")?,
        purchase_balance: row
            .try_get::<f64, _>("PurchaseBalance")?
            .context("Unexpected NULL value for Supplier PurchaseBalance")?,
        credit: row
            .try_get::<f64, _>("Credit")?
            .context("Unexpected NULL value for Supplier Credit")?,
        tin: row.try_get::<&str, _>("TIN")?.map(str::to_owned),
    })
}

pub async fn add_supplier(pool: &Pool, supplier: NewSupplier) -> anyhow::Result<Supplier> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                INSERT INTO dbo.Suppliers (
                    SupplierName, ContactName, ContactTitle, Address, City,
                    Province, ZipCode, Phone, Fax, Balance, PurchaseBalance, Credit, TIN
                )
                OUTPUT
                    INSERTED.Id, INSERTED.SupplierName, INSERTED.ContactName,
                    INSERTED.ContactTitle, INSERTED.Address, INSERTED.City,
                    INSERTED.Province, INSERTED.ZipCode, INSERTED.Phone, INSERTED.Fax,
                    INSERTED.Balance, INSERTED.PurchaseBalance, INSERTED.Credit, INSERTED.TIN
                VALUES (
                    @P1, @P2, @P3, @P4, @P5, @P6, @P7,
                    @P8, @P9, @P10, @P11, @P12, @P13
                );
            "#,
            &[
                &supplier.supplier_name,
                &supplier.contact_name,
                &supplier.contact_title,
                &supplier.address,
                &supplier.city,
                &supplier.province,
                &supplier.zip_code,
                &supplier.phone,
                &supplier.fax,
                &supplier.balance,
                &supplier.purchase_balance,
                &supplier.credit,
                &supplier.tin,
            ],
        )
        .await?
        .into_row()
        .await?
        .context("Supplier inserted, but no record is returned")?;

    supplier_from_row(row)
}

pub async fn get_supplier_by_id(pool: &Pool, id: i32) -> anyhow::Result<Option<Supplier>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                SELECT
                    Id, SupplierName, ContactName, ContactTitle, Address, City,
                    Province, ZipCode, Phone, Fax, Balance, PurchaseBalance, Credit, TIN
                FROM dbo.Suppliers
                WHERE Id = @P1;
            "#,
            &[&id],
        )
        .await?
        .into_row()
        .await?;

    row.map(supplier_from_row).transpose()
}

pub async fn get_all_suppliers(pool: &Pool) -> anyhow::Result<Vec<Supplier>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let rows = client
        .query(
            r#"
                SELECT
                    Id, SupplierName, ContactName, ContactTitle, Address, City,
                    Province, ZipCode, Phone, Fax, Balance, PurchaseBalance, Credit, TIN
                FROM dbo.Suppliers
                ORDER BY Id;
            "#,
            &[],
        )
        .await?
        .into_first_result()
        .await?;

    rows.into_iter().map(supplier_from_row).collect()
}

pub async fn update_supplier(
    pool: &Pool,
    id: i32,
    supplier: UpdateSupplier,
) -> anyhow::Result<Option<Supplier>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                UPDATE dbo.Suppliers
                SET
                    SupplierName = @P1,
                    ContactName = @P2,
                    ContactTitle = @P3,
                    Address = @P4,
                    City = @P5,
                    Province = @P6,
                    ZipCode = @P7,
                    Phone = @P8,
                    Fax = @P9,
                    Balance = @P10,
                    PurchaseBalance = @P11,
                    Credit = @P12,
                    TIN = @P13
                OUTPUT
                    INSERTED.Id, INSERTED.SupplierName, INSERTED.ContactName,
                    INSERTED.ContactTitle, INSERTED.Address, INSERTED.City,
                    INSERTED.Province, INSERTED.ZipCode, INSERTED.Phone, INSERTED.Fax,
                    INSERTED.Balance, INSERTED.PurchaseBalance, INSERTED.Credit, INSERTED.TIN
                WHERE Id = @P14;
            "#,
            &[
                &supplier.supplier_name,
                &supplier.contact_name,
                &supplier.contact_title,
                &supplier.address,
                &supplier.city,
                &supplier.province,
                &supplier.zip_code,
                &supplier.phone,
                &supplier.fax,
                &supplier.balance,
                &supplier.purchase_balance,
                &supplier.credit,
                &supplier.tin,
                &id,
            ],
        )
        .await?
        .into_row()
        .await?;

    row.map(supplier_from_row).transpose()
}

pub async fn delete_supplier_by_id(pool: &Pool, id: i32) -> anyhow::Result<bool> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let result = client
        .execute("DELETE FROM dbo.Suppliers WHERE Id = @P1;", &[&id])
        .await
        .context("Failed to delete supplier.")?;

    Ok(result.total() > 0)
}
