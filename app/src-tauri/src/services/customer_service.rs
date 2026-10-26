use anyhow::Context;
use deadpool_tiberius::Pool;
use chrono::NaiveDate;

use crate::models::customer::{Customer, NewCustomer, UpdateCustomer};

/// Inserts a new customer into the database
/// 
/// # Arguments
/// * `new_customer` - a customer model containing the data for a new customer

pub async fn add_customer(
    pool: &Pool,
    new_customer: NewCustomer,
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
                    Fax,
                    EmployeeId,
                    CreditLimit,
                    TIN,
                    AreaCode,
                    CustomerCode,
                    CustomerArea,
                    CustomerAgent,
                    AgentName,
                    CustomerType,
                    SmCode,
                    Term,
                    TermCode,
                    PType,
                    Remarks
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
                    INSERTED.Fax,
                    INSERTED.Alarm,
                    INSERTED.EmployeeId,
                    INSERTED.PriceLvl,
                    INSERTED.CreditLimit,
                    INSERTED.Balance,
                    INSERTED.Credit,
                    INSERTED.InvBalance,
                    INSERTED.TIN,
                    INSERTED.AreaCode,
                    INSERTED.CustomerCode,
                    INSERTED.CustomerArea,
                    INSERTED.CustomerAgent,
                    INSERTED.AgentName,
                    INSERTED.CustomerType,
                    INSERTED.StartDate,
                    INSERTED.SmCode,
                    INSERTED.Term,
                    INSERTED.TermCode,
                    INSERTED.PType,
                    INSERTED.Remarks
                VALUES (
                    @P1, @P2, @P3, @P4, @P5,
                    @P6, @P7, @P8, @P9, @P10,
                    @P11, @P12, @P13, @P14, @P15,
                    @P16, @P17, @P18, @P19, @P20,
                    @P21, @P22, @P23
                );
            "#,
            &[
                &new_customer.company_name,  // P1
                &new_customer.contact_name,  // P2
                &new_customer.contact_title, // P3
                &new_customer.address,       // P4
                &new_customer.city,          // P5
                &new_customer.province,      // P6
                &new_customer.zip_code,      // P7
                &new_customer.phone,         // P8
                &new_customer.fax,           // P9
                &new_customer.employee_id,   // P10
                &new_customer.credit_limit,  // P11
                &new_customer.tin,           // P12
                &new_customer.area_code,     // P13
                &new_customer.customer_code, // P14
                &new_customer.customer_area, // P15
                &new_customer.customer_agent,// P16
                &new_customer.agent_name,    // P17
                &new_customer.customer_type, // P18
                &new_customer.sm_code,       // P19
                &new_customer.term,          // P20
                &new_customer.term_code,     // P21
                &new_customer.p_type,        // P22
                &new_customer.remarks,       // P23
            ],
        )
        .await?
        .into_row()
        .await?
        .context("Customer inserted, but no record is returned")?;

    let id = row
        .try_get::<i32, _>("Id")?
        .context("Unexpected NULL value for Customer Id")?;

    let company_name = row.try_get::<&str, _>("CompanyName")?.map(str::to_owned);
    let contact_name = row.try_get::<&str, _>("ContactName")?.map(str::to_owned);
    let contact_title = row.try_get::<&str, _>("ContactTitle")?.map(str::to_owned);
    let address = row.try_get::<&str, _>("Address")?.map(str::to_owned);
    let city = row.try_get::<&str, _>("City")?.map(str::to_owned);
    let province = row.try_get::<&str, _>("Province")?.map(str::to_owned);
    let zip_code = row.try_get::<&str, _>("ZipCode")?.map(str::to_owned);
    let phone = row.try_get::<&str, _>("Phone")?.map(str::to_owned);
    let fax = row.try_get::<&str, _>("Fax")?.map(str::to_owned);

    let alarm = row
        .try_get::<bool, _>("Alarm")?
        .context("Unexpected NULL value for Customer Alarm")?;

    let employee_id = row.try_get::<i32, _>("EmployeeId")?;

    let price_lvl = row
        .try_get::<i32, _>("PriceLvl")?
        .context("Unexpected NULL value for Customer PriceLvl")?;

    let credit_limit = row
        .try_get::<f64, _>("CreditLimit")?
        .context("Unexpected NULL value for Customer CreditLimit")?;

    let balance = row
        .try_get::<f64, _>("Balance")?
        .context("Unexpected NULL value for Customer Balance")?;

    let credit = row
        .try_get::<f64, _>("Credit")?
        .context("Unexpected NULL value for Customer Credit")?;

    let inv_balance = row
        .try_get::<f64, _>("InvBalance")?
        .context("Unexpected NULL value for Customer InvBalance")?;

    let tin = row.try_get::<&str, _>("TIN")?.map(str::to_owned);
    let area_code = row.try_get::<i32, _>("AreaCode")?;
    let customer_code = row.try_get::<&str, _>("CustomerCode")?.map(str::to_owned);
    let customer_area = row.try_get::<&str, _>("CustomerArea")?.map(str::to_owned);
    let customer_agent = row.try_get::<&str, _>("CustomerAgent")?.map(str::to_owned);
    let agent_name = row.try_get::<&str, _>("AgentName")?.map(str::to_owned);
    let customer_type = row.try_get::<&str, _>("CustomerType")?.map(str::to_owned);

    let start_date = row
        .try_get::<NaiveDate, _>("StartDate")?
        .context("Unexpected NULL value for Customer StartDate")?;

    let sm_code = row.try_get::<&str, _>("SmCode")?.map(str::to_owned);
    let term = row.try_get::<&str, _>("Term")?.map(str::to_owned);
    let term_code = row.try_get::<&str, _>("TermCode")?.map(str::to_owned);
    let p_type = row.try_get::<&str, _>("PType")?.map(str::to_owned);
    let remarks = row.try_get::<&str, _>("Remarks")?.map(str::to_owned);

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
        alarm,
        employee_id,
        price_lvl,
        credit_limit,
        balance,
        credit,
        inv_balance,
        tin,
        area_code,
        customer_code,
        customer_area,
        customer_agent,
        agent_name,
        customer_type,
        start_date,
        sm_code,
        term,
        term_code,
        p_type,
        remarks,
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
    id: i32,
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
                    Address, City, Province, ZipCode, Phone, Fax,
                    Alarm, EmployeeId, PriceLvl, CreditLimit, Balance,
                    Credit, InvBalance, TIN, AreaCode, CustomerCode,
                    CustomerArea, CustomerAgent, AgentName, CustomerType,
                    StartDate, SmCode, Term, TermCode, PType, Remarks
                FROM dbo.Customers AS c
                WHERE c.Id = @P1;
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

    let company_name = customer.try_get::<&str, _>("CompanyName")?.map(str::to_owned);
    let contact_name = customer.try_get::<&str, _>("ContactName")?.map(str::to_owned);
    let contact_title = customer.try_get::<&str, _>("ContactTitle")?.map(str::to_owned);
    let address = customer.try_get::<&str, _>("Address")?.map(str::to_owned);
    let city = customer.try_get::<&str, _>("City")?.map(str::to_owned);
    let province = customer.try_get::<&str, _>("Province")?.map(str::to_owned);
    let zip_code = customer.try_get::<&str, _>("ZipCode")?.map(str::to_owned);
    let phone = customer.try_get::<&str, _>("Phone")?.map(str::to_owned);
    let fax = customer.try_get::<&str, _>("Fax")?.map(str::to_owned);

    let alarm = customer
        .try_get::<bool, _>("Alarm")?
        .context("Unexpected NULL value for Customer Alarm")?;

    let employee_id = customer.try_get::<i32, _>("EmployeeId")?;

    let price_lvl = customer
        .try_get::<i32, _>("PriceLvl")?
        .context("Unexpected NULL value for Customer PriceLvl")?;

    let credit_limit = customer
        .try_get::<f64, _>("CreditLimit")?
        .context("Unexpected NULL value for Customer CreditLimit")?;

    let balance = customer
        .try_get::<f64, _>("Balance")?
        .context("Unexpected NULL value for Customer Balance")?;

    let credit = customer
        .try_get::<f64, _>("Credit")?
        .context("Unexpected NULL value for Customer Credit")?;

    let inv_balance = customer
        .try_get::<f64, _>("InvBalance")?
        .context("Unexpected NULL value for Customer InvBalance")?;

    let tin = customer.try_get::<&str, _>("TIN")?.map(str::to_owned);

    let area_code = customer.try_get::<i32, _>("AreaCode")?;

    let customer_code = customer
        .try_get::<&str, _>("CustomerCode")?
        .map(str::to_owned);

    let customer_area = customer
        .try_get::<&str, _>("CustomerArea")?
        .map(str::to_owned);

    let customer_agent = customer
        .try_get::<&str, _>("CustomerAgent")?
        .map(str::to_owned);

    let agent_name = customer
        .try_get::<&str, _>("AgentName")?
        .map(str::to_owned);

    let customer_type = customer
        .try_get::<&str, _>("CustomerType")?
        .map(str::to_owned);

    let start_date = customer
        .try_get::<chrono::NaiveDate, _>("StartDate")?
        .context("Unexpected NULL value for Customer StartDate")?;

    let sm_code = customer.try_get::<&str, _>("SmCode")?.map(str::to_owned);
    let term = customer.try_get::<&str, _>("Term")?.map(str::to_owned);
    let term_code = customer.try_get::<&str, _>("TermCode")?.map(str::to_owned);
    let p_type = customer.try_get::<&str, _>("PType")?.map(str::to_owned);
    let remarks = customer.try_get::<&str, _>("Remarks")?.map(str::to_owned);

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
        alarm,
        employee_id,
        price_lvl,
        credit_limit,
        balance,
        credit,
        inv_balance,
        tin,
        area_code,
        customer_code,
        customer_area,
        customer_agent,
        agent_name,
        customer_type,
        start_date,
        sm_code,
        term,
        term_code,
        p_type,
        remarks,
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
                    Address, City, Province, ZipCode, Phone, Fax,
                    Alarm, EmployeeId, PriceLvl, CreditLimit, Balance,
                    Credit, InvBalance, TIN, AreaCode, CustomerCode,
                    CustomerArea, CustomerAgent, AgentName, CustomerType,
                    StartDate, SmCode, Term, TermCode, PType, Remarks
                FROM dbo.Customers
                ORDER BY Id;
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

        let company_name = row.try_get::<&str, _>("CompanyName")?.map(str::to_owned);
        let contact_name = row.try_get::<&str, _>("ContactName")?.map(str::to_owned);
        let contact_title = row.try_get::<&str, _>("ContactTitle")?.map(str::to_owned);
        let address = row.try_get::<&str, _>("Address")?.map(str::to_owned);
        let city = row.try_get::<&str, _>("City")?.map(str::to_owned);
        let province = row.try_get::<&str, _>("Province")?.map(str::to_owned);
        let zip_code = row.try_get::<&str, _>("ZipCode")?.map(str::to_owned);
        let phone = row.try_get::<&str, _>("Phone")?.map(str::to_owned);
        let fax = row.try_get::<&str, _>("Fax")?.map(str::to_owned);

        let alarm = row
            .try_get::<bool, _>("Alarm")?
            .context("Unexpected NULL value for Customer Alarm")?;

        let employee_id = row.try_get::<i32, _>("EmployeeId")?;

        let price_lvl = row
            .try_get::<i32, _>("PriceLvl")?
            .context("Unexpected NULL value for Customer PriceLvl")?;

        let credit_limit = row
            .try_get::<f64, _>("CreditLimit")?
            .context("Unexpected NULL value for Customer CreditLimit")?;

        let balance = row
            .try_get::<f64, _>("Balance")?
            .context("Unexpected NULL value for Customer Balance")?;

        let credit = row
            .try_get::<f64, _>("Credit")?
            .context("Unexpected NULL value for Customer Credit")?;

        let inv_balance = row
            .try_get::<f64, _>("InvBalance")?
            .context("Unexpected NULL value for Customer InvBalance")?;

        let tin = row.try_get::<&str, _>("TIN")?.map(str::to_owned);
        let area_code = row.try_get::<i32, _>("AreaCode")?;

        let customer_code = row
            .try_get::<&str, _>("CustomerCode")?
            .map(str::to_owned);

        let customer_area = row
            .try_get::<&str, _>("CustomerArea")?
            .map(str::to_owned);

        let customer_agent = row
            .try_get::<&str, _>("CustomerAgent")?
            .map(str::to_owned);

        let agent_name = row
            .try_get::<&str, _>("AgentName")?
            .map(str::to_owned);

        let customer_type = row
            .try_get::<&str, _>("CustomerType")?
            .map(str::to_owned);

        let start_date = row
            .try_get::<chrono::NaiveDate, _>("StartDate")?
            .context("Unexpected NULL value for Customer StartDate")?;

        let sm_code = row.try_get::<&str, _>("SmCode")?.map(str::to_owned);
        let term = row.try_get::<&str, _>("Term")?.map(str::to_owned);
        let term_code = row.try_get::<&str, _>("TermCode")?.map(str::to_owned);
        let p_type = row.try_get::<&str, _>("PType")?.map(str::to_owned);
        let remarks = row.try_get::<&str, _>("Remarks")?.map(str::to_owned);

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
            alarm,
            employee_id,
            price_lvl,
            credit_limit,
            balance,
            credit,
            inv_balance,
            tin,
            area_code,
            customer_code,
            customer_area,
            customer_agent,
            agent_name,
            customer_type,
            start_date,
            sm_code,
            term,
            term_code,
            p_type,
            remarks,
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

/// Updates a customer record given its id
/// 
/// # Arguments
/// * `id` - Unique identifier of the customer record to be updated.
/// * `customer` - Customer model containing the updated records.

pub async fn update_customer(
    pool: &Pool,
    id: i32,
    customer: UpdateCustomer,
) -> anyhow::Result<Option<Customer>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
            UPDATE dbo.Customers
            SET
                CompanyName = @P1,
                ContactName = @P2,
                ContactTitle = @P3,
                Address = @P4,
                City = @P5,
                Province = @P6,
                ZipCode = @P7,
                Phone = @P8,
                Fax = @P9,
                Alarm = @P10,
                EmployeeId = @P11,
                PriceLvl = @P12,
                CreditLimit = @P13,
                Balance = @P14,
                Credit = @P15,
                InvBalance = @P16,
                TIN = @P17,
                AreaCode = @P18,
                CustomerCode = @P19,
                CustomerArea = @P20,
                CustomerAgent = @P21,
                AgentName = @P22,
                CustomerType = @P23,
                StartDate = @P24,
                SmCode = @P25,
                Term = @P26,
                TermCode = @P27,
                PType = @P28,
                Remarks = @P29
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
                INSERTED.Fax,
                INSERTED.Alarm,
                INSERTED.EmployeeId,
                INSERTED.PriceLvl,
                INSERTED.CreditLimit,
                INSERTED.Balance,
                INSERTED.Credit,
                INSERTED.InvBalance,
                INSERTED.TIN,
                INSERTED.AreaCode,
                INSERTED.CustomerCode,
                INSERTED.CustomerArea,
                INSERTED.CustomerAgent,
                INSERTED.AgentName,
                INSERTED.CustomerType,
                INSERTED.StartDate,
                INSERTED.SmCode,
                INSERTED.Term,
                INSERTED.TermCode,
                INSERTED.PType,
                INSERTED.Remarks
            WHERE Id = @P30;
            "#,
            &[
                &customer.company_name,  // P1
                &customer.contact_name,  // P2
                &customer.contact_title, // P3
                &customer.address,       // P4
                &customer.city,          // P5
                &customer.province,      // P6
                &customer.zip_code,      // P7
                &customer.phone,         // P8
                &customer.fax,           // P9
                &customer.alarm,         // P10
                &customer.employee_id,   // P11
                &customer.price_lvl,     // P12
                &customer.credit_limit,  // P13
                &customer.balance,       // P14
                &customer.credit,        // P15
                &customer.inv_balance,   // P16
                &customer.tin,           // P17
                &customer.area_code,     // P18
                &customer.customer_code, // P19
                &customer.customer_area, // P20
                &customer.customer_agent,// P21
                &customer.agent_name,    // P22
                &customer.customer_type, // P23
                &customer.start_date,    // P24
                &customer.sm_code,       // P25
                &customer.term,          // P26
                &customer.term_code,     // P27
                &customer.p_type,        // P28
                &customer.remarks,       // P29
                &id,                     // P30
            ],
        )
        .await?
        .into_row()
        .await?;

    let Some(row) = row else {
        return Ok(None);
    };

    let id = row
        .try_get::<i32, _>("Id")?
        .context("Unexpected NULL value for Customer Id")?;

    let company_name = row.try_get::<&str, _>("CompanyName")?.map(str::to_owned);
    let contact_name = row.try_get::<&str, _>("ContactName")?.map(str::to_owned);
    let contact_title = row.try_get::<&str, _>("ContactTitle")?.map(str::to_owned);
    let address = row.try_get::<&str, _>("Address")?.map(str::to_owned);
    let city = row.try_get::<&str, _>("City")?.map(str::to_owned);
    let province = row.try_get::<&str, _>("Province")?.map(str::to_owned);
    let zip_code = row.try_get::<&str, _>("ZipCode")?.map(str::to_owned);
    let phone = row.try_get::<&str, _>("Phone")?.map(str::to_owned);
    let fax = row.try_get::<&str, _>("Fax")?.map(str::to_owned);

    let alarm = row
        .try_get::<bool, _>("Alarm")?
        .context("Unexpected NULL value for Customer Alarm")?;

    let employee_id = row.try_get::<i32, _>("EmployeeId")?;

    let price_lvl = row
        .try_get::<i32, _>("PriceLvl")?
        .context("Unexpected NULL value for Customer PriceLvl")?;

    let credit_limit = row
        .try_get::<f64, _>("CreditLimit")?
        .context("Unexpected NULL value for Customer CreditLimit")?;

    let balance = row
        .try_get::<f64, _>("Balance")?
        .context("Unexpected NULL value for Customer Balance")?;

    let credit = row
        .try_get::<f64, _>("Credit")?
        .context("Unexpected NULL value for Customer Credit")?;

    let inv_balance = row
        .try_get::<f64, _>("InvBalance")?
        .context("Unexpected NULL value for Customer InvBalance")?;

    let tin = row.try_get::<&str, _>("TIN")?.map(str::to_owned);
    let area_code = row.try_get::<i32, _>("AreaCode")?;
    let customer_code = row.try_get::<&str, _>("CustomerCode")?.map(str::to_owned);
    let customer_area = row.try_get::<&str, _>("CustomerArea")?.map(str::to_owned);
    let customer_agent = row.try_get::<&str, _>("CustomerAgent")?.map(str::to_owned);
    let agent_name = row.try_get::<&str, _>("AgentName")?.map(str::to_owned);
    let customer_type = row.try_get::<&str, _>("CustomerType")?.map(str::to_owned);

    let start_date = row
        .try_get::<chrono::NaiveDate, _>("StartDate")?
        .context("Unexpected NULL value for Customer StartDate")?;

    let sm_code = row.try_get::<&str, _>("SmCode")?.map(str::to_owned);
    let term = row.try_get::<&str, _>("Term")?.map(str::to_owned);
    let term_code = row.try_get::<&str, _>("TermCode")?.map(str::to_owned);
    let p_type = row.try_get::<&str, _>("PType")?.map(str::to_owned);
    let remarks = row.try_get::<&str, _>("Remarks")?.map(str::to_owned);

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
        alarm,
        employee_id,
        price_lvl,
        credit_limit,
        balance,
        credit,
        inv_balance,
        tin,
        area_code,
        customer_code,
        customer_area,
        customer_agent,
        agent_name,
        customer_type,
        start_date,
        sm_code,
        term,
        term_code,
        p_type,
        remarks,
    }))
}
