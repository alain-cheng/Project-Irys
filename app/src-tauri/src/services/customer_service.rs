use anyhow::Context;
use deadpool_tiberius::Pool;

use crate::models::customer::{Customer, NewCustomer};

/// Inserts a new customer into the database
/// 
/// # Arguments
/// * `new_customer` - a customer model containing the data for a new customer
pub async fn add_customer(
    pool: &Pool,
    new_customer: NewCustomer
) -> anyhow::Result<Customer> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                INSERT INTO dbo.Customers (
                    CompanyName,
                    ContactName,
                    ContactTitle,
                    Address,
                    City,
                    Province,
                    ZipCode,
                    Phone,
                    Fax
                )
                OUTPUT 
                    INSERTED.Id,
                    INSERTED.CompanyName,
                    INSERTED.ContactName,
                    INSERTED.ContactTitle,
                    INSERTED.Address,
                    INSERTED.City,
                    INSERTED.Province,
                    INSERTED.ZipCode,
                    INSERTED.Phone,
                    INSERTED.Fax
                VALUES (
                    @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9
                );
            "#,
            &[
                &new_customer.company_name,
                &new_customer.contact_name,
                &new_customer.contact_title,
                &new_customer.address,
                &new_customer.city,
                &new_customer.province,
                &new_customer.zip_code,
                &new_customer.phone,
                &new_customer.fax,
            ],
        )
        .await?
        .into_row()
        .await?
        .context("Customer inserted, but no record is returned")?;

    let id = row
        .try_get::<i32, _>("Id")?
        .context("Unexpected NULL value for Customer Id")?;

    let company_name = row
        .try_get::<&str, _>("CompanyName")?
        .map(str::to_owned);

    let contact_name = row
        .try_get::<&str, _>("ContactName")?
        .map(str::to_owned);

    let contact_title = row
        .try_get::<&str, _>("ContactTitle")?
        .map(str::to_owned);

    let address = row
        .try_get::<&str, _>("Address")?
        .map(str::to_owned);

    let city = row
        .try_get::<&str, _>("City")?
        .map(str::to_owned);

    let province = row
        .try_get::<&str, _>("Province")?
        .map(str::to_owned);

    let zip_code = row
        .try_get::<&str, _>("ZipCode")?
        .map(str::to_owned);

    let phone = row
        .try_get::<&str, _>("Phone")?
        .map(str::to_owned);

    let fax = row
        .try_get::<&str, _>("Fax")?
        .map(str::to_owned);

    Ok(Customer {
        id,
        company_name,
        contact_name,
        contact_title,
        address,
        city,
        province,
        zip_code,
        phone,
        fax,
    })
}

/// Retrieves a customer from the database given by its unique id.
/// 
/// If customer is not found, then it returns `Ok(None)`
/// 
/// # Arguments
/// * `id` - A 32-bit integer representing the customer's unique identifier.
pub async fn get_customer_by_id(
    pool: &Pool, 
    id: i32
) -> anyhow::Result<Option<Customer>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?; 

    let customer = client
        .query(
            r#" 
                SELECT
                    Id, CompanyName, ContactName, ContactTitle,
                    Address, City, Province, ZipCode, Phone, Fax
                FROM       dbo.Customers AS c
                WHERE      c.Id = @P1;
            "#,
            &[&id],
        )
        .await?
        .into_row()
        .await?;

    let Some(customer) = customer else {
        return Ok(None);
    };

    let id = customer
        .try_get::<i32, _>("Id")?
        .context("Unexpected NULL value for Customer Id")?;

    let company_name = customer
        .try_get::<&str, _>("CompanyName")?
        .map(str::to_owned);

    let contact_name = customer
        .try_get::<&str, _>("ContactName")?
        .map(str::to_owned);

    let contact_title = customer
        .try_get::<&str, _>("ContactTitle")?
        .map(str::to_owned);

    let address = customer
        .try_get::<&str, _>("Address")?
        .map(str::to_owned);

    let city = customer
        .try_get::<&str, _>("City")?
        .map(str::to_owned);

    let province = customer
        .try_get::<&str, _>("Province")?
        .map(str::to_owned);

    let zip_code = customer
        .try_get::<&str, _>("ZipCode")?
        .map(str::to_owned);

    let phone = customer
        .try_get::<&str, _>("Phone")?
        .map(str::to_owned);

    let fax = customer
        .try_get::<&str, _>("Fax")?
        .map(str::to_owned);

    Ok(Some(Customer {
        id,
        company_name,
        contact_name,
        contact_title,
        address,
        city,
        province,
        zip_code,
        phone,
        fax,
    }))
}

// Retrieves all customers from the database
pub async fn get_all_customers(pool: &Pool) -> anyhow::Result<Vec<Customer>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?; 

    let rows = client
        .query(
            r#" 
                SELECT
                    Id, CompanyName, ContactName, ContactTitle,
                    Address, City, Province, ZipCode, Phone, Fax
                FROM      dbo.Customers
                ORDER BY  Id;
            "#,
            &[],
        )
        .await?
        .into_first_result()
        .await?;

    let mut customers = Vec::with_capacity(rows.len());

    for row in rows {
        let id = row
            .try_get::<i32, _>("Id")?
            .context("Unexpected NULL value for Customer Id")?;

        let company_name = row
            .try_get::<&str, _>("CompanyName")?
            .map(str::to_owned);

        let contact_name = row
            .try_get::<&str, _>("ContactName")?
            .map(str::to_owned);

        let contact_title = row
            .try_get::<&str, _>("ContactTitle")?
            .map(str::to_owned);

        let address = row
            .try_get::<&str, _>("Address")?
            .map(str::to_owned);

        let city = row
            .try_get::<&str, _>("City")?
            .map(str::to_owned);

        let province = row
            .try_get::<&str, _>("Province")?
            .map(str::to_owned);

        let zip_code = row
            .try_get::<&str, _>("ZipCode")?
            .map(str::to_owned);

        let phone = row
            .try_get::<&str, _>("Phone")?
            .map(str::to_owned);

        let fax = row
            .try_get::<&str, _>("Fax")?
            .map(str::to_owned);

        customers.push(Customer {
            id,
            company_name,
            contact_name,
            contact_title,
            address,
            city,
            province,
            zip_code,
            phone,
            fax,
        });
    }

    Ok(customers)
}

/// Removes a customer from the database given its id
/// 
/// # Arguments
/// * `id` - The unique identifier of the customer record to be deleted.
pub async fn delete_customer_by_id(
    pool: &Pool,
    id: i32
) -> anyhow::Result<bool> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection")?;

    let result = client 
        .execute(
            "DELETE FROM dbo.Customers WHERE Id = @P1", 
            &[&id],
        )
        .await
        .context("Failed to delete customer.")?;

    Ok(result.total() > 0)
}