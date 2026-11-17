use anyhow::Context;
use chrono::NaiveDate;
use deadpool_tiberius::Pool;
use tiberius::Row;

use crate::models::order::{NewOrder, Order, UpdateOrder};

/// Shared field mapping for all Orders queries.
fn order_from_row(row: Row) -> anyhow::Result<Order> {
    Ok(Order {
        id: row
            .try_get::<i32, _>("Id")?
            .context("Unexpected NULL value for Order Id")?,
        customer_id: row.try_get::<i32, _>("CustomerId")?,
        invoice_number: row.try_get::<&str, _>("InvoiceNumber")?.map(str::to_owned),
        employee_id: row.try_get::<i32, _>("EmployeeId")?,
        order_date: row
            .try_get::<NaiveDate, _>("OrderDate")?
            .context("Unexpected NULL value for Order OrderDate")?,
        delivery_date: row
            .try_get::<NaiveDate, _>("DeliveryDate")?
            .context("Unexpected NULL value for Order DeliveryDate")?,
        is_paid: row
            .try_get::<bool, _>("isPaid")?
            .context("Unexpected NULL value for Order isPaid")?,
        due_date: row
            .try_get::<NaiveDate, _>("DueDate")?
            .context("Unexpected NULL value for Order DueDate")?,
        term_code: row.try_get::<i32, _>("TermCode")?,
        total: row
            .try_get::<f64, _>("Total")?
            .context("Unexpected NULL value for Order Total")?,
        delivered_by: row.try_get::<i32, _>("DeliveredBy")?,
        packed_by: row.try_get::<i32, _>("PackedBy")?,
        order_status_id: row
            .try_get::<i32, _>("OrderStatusId")?
            .context("Unexpected NULL value for Order OrderStatusId")?,
        balance: row
            .try_get::<f64, _>("Balance")?
            .context("Unexpected NULL value for Order Balance")?,
        salesman: row.try_get::<i32, _>("Salesman")?,
        user: row.try_get::<i32, _>("User")?,
        returns: row
            .try_get::<f64, _>("Returns")?
            .context("Unexpected NULL value for Order Returns")?,
        amount_paid: row
            .try_get::<f64, _>("AmountPaid")?
            .context("Unexpected NULL value for Order AmountPaid")?,
        bir: row
            .try_get::<bool, _>("BIR")?
            .context("Unexpected NULL value for Order BIR")?,
        shipper_id: row.try_get::<i32, _>("ShipperId")?,
        adjust: row
            .try_get::<f64, _>("Adjust")?
            .context("Unexpected NULL value for Order Adjust")?,
        order_profit: row
            .try_get::<f64, _>("OrderProfit")?
            .context("Unexpected NULL value for Order OrderProfit")?,
        order_free: row
            .try_get::<f64, _>("OrderFree")?
            .context("Unexpected NULL value for Order OrderFree")?,
        sales_order_id: row.try_get::<i32, _>("SalesOrderId")?,
        credits_applied: row
            .try_get::<f64, _>("CreditsApplied")?
            .context("Unexpected NULL value for Order CreditsApplied")?,
        consign: row
            .try_get::<bool, _>("Consign")?
            .context("Unexpected NULL value for Order Consign")?,
        dr_number: row.try_get::<&str, _>("DRNumber")?.map(str::to_owned),
        commission: row
            .try_get::<f64, _>("Commission")?
            .context("Unexpected NULL value for Order Commission")?,
        si_number: row.try_get::<&str, _>("SINumber")?.map(str::to_owned),
        si_date: row
            .try_get::<NaiveDate, _>("SIDate")?
            .context("Unexpected NULL value for Order SIDate")?,
        si_customer: row.try_get::<&str, _>("SICustomer")?.map(str::to_owned),
        si_terms: row.try_get::<&str, _>("SITerms")?.map(str::to_owned),
        si_balance: row
            .try_get::<f64, _>("SIBalance")?
            .context("Unexpected NULL value for Order SIBalance")?,
        si_net_amount: row
            .try_get::<f64, _>("SINetAmount")?
            .context("Unexpected NULL value for Order SINetAmount")?,
        si_agent: row.try_get::<&str, _>("SIAgent")?.map(str::to_owned),
        po_number: row.try_get::<&str, _>("PONumber")?.map(str::to_owned),
        beginning_balance: row
            .try_get::<f64, _>("BeginningBalance")?
            .context("Unexpected NULL value for Order BeginningBalance")?,
        reference_number: row
            .try_get::<&str, _>("ReferenceNumber")?
            .map(str::to_owned),
        w_tax: row
            .try_get::<f64, _>("WTax")?
            .context("Unexpected NULL value for Order WTax")?,
        cancelled: row
            .try_get::<bool, _>("Cancelled")?
            .context("Unexpected NULL value for Order Cancelled")?,
        warehouse_id: row.try_get::<i32, _>("WarehouseId")?,
        rebate: row
            .try_get::<f64, _>("Rebate")?
            .context("Unexpected NULL value for Order Rebate")?,
        commission_paid: row
            .try_get::<bool, _>("CommissionPaid")?
            .context("Unexpected NULL value for Order CommissionPaid")?,
        commission_date: row
            .try_get::<NaiveDate, _>("CommissionDate")?
            .context("Unexpected NULL value for Order CommissionDate")?,
        no_commission: row
            .try_get::<bool, _>("NoCommission")?
            .context("Unexpected NULL value for Order NoCommission")?,
        commission_amount: row
            .try_get::<f64, _>("CommissionAmount")?
            .context("Unexpected NULL value for Order CommissionAmount")?,
        commission_fixed: row
            .try_get::<f64, _>("CommissionFixed")?
            .context("Unexpected NULL value for Order CommissionFixed")?,
        collector: row.try_get::<i32, _>("Collector")?,
        is_commission_computable: row.try_get::<bool, _>("isCommissionComputable")?,
        date_paid: row
            .try_get::<NaiveDate, _>("DatePaid")?
            .context("Unexpected NULL value for Order DatePaid")?,
        collected_amount: row
            .try_get::<f64, _>("CollectedAmount")?
            .context("Unexpected NULL value for Order CollectedAmount")?,
        is_heavy: row
            .try_get::<bool, _>("isHeavy")?
            .context("Unexpected NULL value for Order isHeavy")?,
        err: row.try_get::<i32, _>("ERR")?,
        payment_mode_id: row.try_get::<i32, _>("PaymentModeId")?,
        driver: row.try_get::<i32, _>("Driver")?,
        helper: row.try_get::<i32, _>("Helper")?,
        truck: row.try_get::<&str, _>("Truck")?.map(str::to_owned),
        notes: row.try_get::<&str, _>("Notes")?.map(str::to_owned),
        pack_list: row.try_get::<&str, _>("PackList")?.map(str::to_owned),
        remarks: row.try_get::<&str, _>("Remarks")?.map(str::to_owned),
        adjustment_remarks: row
            .try_get::<&str, _>("AdjustmentRemarks")?
            .map(str::to_owned),
    })
}

pub async fn add_order(pool: &Pool, order: NewOrder) -> anyhow::Result<Order> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                INSERT INTO dbo.Orders (
                    CustomerId, InvoiceNumber, EmployeeId, OrderDate, DeliveryDate,
                    isPaid, DueDate, TermCode, Total, DeliveredBy,
                    PackedBy, OrderStatusId, Balance, Salesman, [User],
                    Returns, AmountPaid, BIR, ShipperId, Adjust,
                    OrderProfit, OrderFree, SalesOrderId, CreditsApplied, Consign,
                    DRNumber, Commission, SINumber, SIDate, SICustomer,
                    SITerms, SIBalance, SINetAmount, SIAgent, PONumber,
                    BeginningBalance, ReferenceNumber, WTax, Cancelled, WarehouseId,
                    Rebate, CommissionPaid, CommissionDate, NoCommission, CommissionAmount,
                    CommissionFixed, Collector, isCommissionComputable, DatePaid, CollectedAmount,
                    isHeavy, ERR, PaymentModeId, Driver, Helper,
                    Truck, Notes, PackList, Remarks, AdjustmentRemarks
                )
                OUTPUT
                    INSERTED.Id, INSERTED.CustomerId, INSERTED.InvoiceNumber, INSERTED.EmployeeId, INSERTED.OrderDate,
                    INSERTED.DeliveryDate, INSERTED.isPaid, INSERTED.DueDate, INSERTED.TermCode, INSERTED.Total,
                    INSERTED.DeliveredBy, INSERTED.PackedBy, INSERTED.OrderStatusId, INSERTED.Balance, INSERTED.Salesman,
                    INSERTED.[User], INSERTED.Returns, INSERTED.AmountPaid, INSERTED.BIR, INSERTED.ShipperId,
                    INSERTED.Adjust, INSERTED.OrderProfit, INSERTED.OrderFree, INSERTED.SalesOrderId, INSERTED.CreditsApplied,
                    INSERTED.Consign, INSERTED.DRNumber, INSERTED.Commission, INSERTED.SINumber, INSERTED.SIDate,
                    INSERTED.SICustomer, INSERTED.SITerms, INSERTED.SIBalance, INSERTED.SINetAmount, INSERTED.SIAgent,
                    INSERTED.PONumber, INSERTED.BeginningBalance, INSERTED.ReferenceNumber, INSERTED.WTax, INSERTED.Cancelled,
                    INSERTED.WarehouseId, INSERTED.Rebate, INSERTED.CommissionPaid, INSERTED.CommissionDate, INSERTED.NoCommission,
                    INSERTED.CommissionAmount, INSERTED.CommissionFixed, INSERTED.Collector, INSERTED.isCommissionComputable, INSERTED.DatePaid,
                    INSERTED.CollectedAmount, INSERTED.isHeavy, INSERTED.ERR, INSERTED.PaymentModeId, INSERTED.Driver,
                    INSERTED.Helper, INSERTED.Truck, INSERTED.Notes, INSERTED.PackList, INSERTED.Remarks,
                    INSERTED.AdjustmentRemarks
                VALUES (
                    @P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9, @P10,
                    @P11, @P12, @P13, @P14, @P15, @P16, @P17, @P18, @P19, @P20,
                    @P21, @P22, @P23, @P24, @P25, @P26, @P27, @P28, @P29, @P30,
                    @P31, @P32, @P33, @P34, @P35, @P36, @P37, @P38, @P39, @P40,
                    @P41, @P42, @P43, @P44, @P45, @P46, @P47, @P48, @P49, @P50,
                    @P51, @P52, @P53, @P54, @P55, @P56, @P57, @P58, @P59, @P60
                );
            "#,
            &[
                &order.customer_id,
                &order.invoice_number,
                &order.employee_id,
                &order.order_date,
                &order.delivery_date,
                &order.is_paid,
                &order.due_date,
                &order.term_code,
                &order.total,
                &order.delivered_by,
                &order.packed_by,
                &order.order_status_id,
                &order.balance,
                &order.salesman,
                &order.user,
                &order.returns,
                &order.amount_paid,
                &order.bir,
                &order.shipper_id,
                &order.adjust,
                &order.order_profit,
                &order.order_free,
                &order.sales_order_id,
                &order.credits_applied,
                &order.consign,
                &order.dr_number,
                &order.commission,
                &order.si_number,
                &order.si_date,
                &order.si_customer,
                &order.si_terms,
                &order.si_balance,
                &order.si_net_amount,
                &order.si_agent,
                &order.po_number,
                &order.beginning_balance,
                &order.reference_number,
                &order.w_tax,
                &order.cancelled,
                &order.warehouse_id,
                &order.rebate,
                &order.commission_paid,
                &order.commission_date,
                &order.no_commission,
                &order.commission_amount,
                &order.commission_fixed,
                &order.collector,
                &order.is_commission_computable,
                &order.date_paid,
                &order.collected_amount,
                &order.is_heavy,
                &order.err,
                &order.payment_mode_id,
                &order.driver,
                &order.helper,
                &order.truck,
                &order.notes,
                &order.pack_list,
                &order.remarks,
                &order.adjustment_remarks,
            ],
        )
        .await?
        .into_row()
        .await?
        .context("Order inserted, but no record is returned")?;

    order_from_row(row)
}

pub async fn get_order_by_id(pool: &Pool, id: i32) -> anyhow::Result<Option<Order>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                SELECT
                    Id, CustomerId, InvoiceNumber, EmployeeId, OrderDate,
                    DeliveryDate, isPaid, DueDate, TermCode, Total,
                    DeliveredBy, PackedBy, OrderStatusId, Balance, Salesman,
                    [User], Returns, AmountPaid, BIR, ShipperId,
                    Adjust, OrderProfit, OrderFree, SalesOrderId, CreditsApplied,
                    Consign, DRNumber, Commission, SINumber, SIDate,
                    SICustomer, SITerms, SIBalance, SINetAmount, SIAgent,
                    PONumber, BeginningBalance, ReferenceNumber, WTax, Cancelled,
                    WarehouseId, Rebate, CommissionPaid, CommissionDate, NoCommission,
                    CommissionAmount, CommissionFixed, Collector, isCommissionComputable, DatePaid,
                    CollectedAmount, isHeavy, ERR, PaymentModeId, Driver,
                    Helper, Truck, Notes, PackList, Remarks,
                    AdjustmentRemarks
                FROM dbo.Orders
                WHERE Id = @P1;
            "#,
            &[&id],
        )
        .await?
        .into_row()
        .await?;

    row.map(order_from_row).transpose()
}

pub async fn get_all_orders(pool: &Pool) -> anyhow::Result<Vec<Order>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let rows = client
        .query(
            r#"
                SELECT
                    Id, CustomerId, InvoiceNumber, EmployeeId, OrderDate,
                    DeliveryDate, isPaid, DueDate, TermCode, Total,
                    DeliveredBy, PackedBy, OrderStatusId, Balance, Salesman,
                    [User], Returns, AmountPaid, BIR, ShipperId,
                    Adjust, OrderProfit, OrderFree, SalesOrderId, CreditsApplied,
                    Consign, DRNumber, Commission, SINumber, SIDate,
                    SICustomer, SITerms, SIBalance, SINetAmount, SIAgent,
                    PONumber, BeginningBalance, ReferenceNumber, WTax, Cancelled,
                    WarehouseId, Rebate, CommissionPaid, CommissionDate, NoCommission,
                    CommissionAmount, CommissionFixed, Collector, isCommissionComputable, DatePaid,
                    CollectedAmount, isHeavy, ERR, PaymentModeId, Driver,
                    Helper, Truck, Notes, PackList, Remarks,
                    AdjustmentRemarks
                FROM dbo.Orders
                ORDER BY Id;
            "#,
            &[],
        )
        .await?
        .into_first_result()
        .await?;

    rows.into_iter().map(order_from_row).collect()
}

pub async fn update_order(
    pool: &Pool,
    id: i32,
    order: UpdateOrder,
) -> anyhow::Result<Option<Order>> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let row = client
        .query(
            r#"
                UPDATE dbo.Orders
                SET
                    CustomerId = @P1,
                    InvoiceNumber = @P2,
                    EmployeeId = @P3,
                    OrderDate = @P4,
                    DeliveryDate = @P5,
                    isPaid = @P6,
                    DueDate = @P7,
                    TermCode = @P8,
                    Total = @P9,
                    DeliveredBy = @P10,
                    PackedBy = @P11,
                    OrderStatusId = @P12,
                    Balance = @P13,
                    Salesman = @P14,
                    [User] = @P15,
                    Returns = @P16,
                    AmountPaid = @P17,
                    BIR = @P18,
                    ShipperId = @P19,
                    Adjust = @P20,
                    OrderProfit = @P21,
                    OrderFree = @P22,
                    SalesOrderId = @P23,
                    CreditsApplied = @P24,
                    Consign = @P25,
                    DRNumber = @P26,
                    Commission = @P27,
                    SINumber = @P28,
                    SIDate = @P29,
                    SICustomer = @P30,
                    SITerms = @P31,
                    SIBalance = @P32,
                    SINetAmount = @P33,
                    SIAgent = @P34,
                    PONumber = @P35,
                    BeginningBalance = @P36,
                    ReferenceNumber = @P37,
                    WTax = @P38,
                    Cancelled = @P39,
                    WarehouseId = @P40,
                    Rebate = @P41,
                    CommissionPaid = @P42,
                    CommissionDate = @P43,
                    NoCommission = @P44,
                    CommissionAmount = @P45,
                    CommissionFixed = @P46,
                    Collector = @P47,
                    isCommissionComputable = @P48,
                    DatePaid = @P49,
                    CollectedAmount = @P50,
                    isHeavy = @P51,
                    ERR = @P52,
                    PaymentModeId = @P53,
                    Driver = @P54,
                    Helper = @P55,
                    Truck = @P56,
                    Notes = @P57,
                    PackList = @P58,
                    Remarks = @P59,
                    AdjustmentRemarks = @P60
                OUTPUT
                    INSERTED.Id, INSERTED.CustomerId, INSERTED.InvoiceNumber, INSERTED.EmployeeId, INSERTED.OrderDate,
                    INSERTED.DeliveryDate, INSERTED.isPaid, INSERTED.DueDate, INSERTED.TermCode, INSERTED.Total,
                    INSERTED.DeliveredBy, INSERTED.PackedBy, INSERTED.OrderStatusId, INSERTED.Balance, INSERTED.Salesman,
                    INSERTED.[User], INSERTED.Returns, INSERTED.AmountPaid, INSERTED.BIR, INSERTED.ShipperId,
                    INSERTED.Adjust, INSERTED.OrderProfit, INSERTED.OrderFree, INSERTED.SalesOrderId, INSERTED.CreditsApplied,
                    INSERTED.Consign, INSERTED.DRNumber, INSERTED.Commission, INSERTED.SINumber, INSERTED.SIDate,
                    INSERTED.SICustomer, INSERTED.SITerms, INSERTED.SIBalance, INSERTED.SINetAmount, INSERTED.SIAgent,
                    INSERTED.PONumber, INSERTED.BeginningBalance, INSERTED.ReferenceNumber, INSERTED.WTax, INSERTED.Cancelled,
                    INSERTED.WarehouseId, INSERTED.Rebate, INSERTED.CommissionPaid, INSERTED.CommissionDate, INSERTED.NoCommission,
                    INSERTED.CommissionAmount, INSERTED.CommissionFixed, INSERTED.Collector, INSERTED.isCommissionComputable, INSERTED.DatePaid,
                    INSERTED.CollectedAmount, INSERTED.isHeavy, INSERTED.ERR, INSERTED.PaymentModeId, INSERTED.Driver,
                    INSERTED.Helper, INSERTED.Truck, INSERTED.Notes, INSERTED.PackList, INSERTED.Remarks,
                    INSERTED.AdjustmentRemarks
                WHERE Id = @P61;
            "#,
            &[
                &order.customer_id,
                &order.invoice_number,
                &order.employee_id,
                &order.order_date,
                &order.delivery_date,
                &order.is_paid,
                &order.due_date,
                &order.term_code,
                &order.total,
                &order.delivered_by,
                &order.packed_by,
                &order.order_status_id,
                &order.balance,
                &order.salesman,
                &order.user,
                &order.returns,
                &order.amount_paid,
                &order.bir,
                &order.shipper_id,
                &order.adjust,
                &order.order_profit,
                &order.order_free,
                &order.sales_order_id,
                &order.credits_applied,
                &order.consign,
                &order.dr_number,
                &order.commission,
                &order.si_number,
                &order.si_date,
                &order.si_customer,
                &order.si_terms,
                &order.si_balance,
                &order.si_net_amount,
                &order.si_agent,
                &order.po_number,
                &order.beginning_balance,
                &order.reference_number,
                &order.w_tax,
                &order.cancelled,
                &order.warehouse_id,
                &order.rebate,
                &order.commission_paid,
                &order.commission_date,
                &order.no_commission,
                &order.commission_amount,
                &order.commission_fixed,
                &order.collector,
                &order.is_commission_computable,
                &order.date_paid,
                &order.collected_amount,
                &order.is_heavy,
                &order.err,
                &order.payment_mode_id,
                &order.driver,
                &order.helper,
                &order.truck,
                &order.notes,
                &order.pack_list,
                &order.remarks,
                &order.adjustment_remarks,
                &id,
            ],
        )
        .await?
        .into_row()
        .await?;

    row.map(order_from_row).transpose()
}

pub async fn delete_order_by_id(pool: &Pool, id: i32) -> anyhow::Result<bool> {
    let mut client = pool
        .get()
        .await
        .context("Failed to retrieve database connection.")?;

    let result = client
        .execute("DELETE FROM dbo.Orders WHERE Id = @P1;", &[&id])
        .await
        .context("Failed to delete order.")?;

    Ok(result.total() > 0)
}
