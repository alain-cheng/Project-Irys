USE IRYS;
GO
INSERT INTO dbo.Orders
(
    Id,
    CustomerId,
    InvoiceNumber,
    EmployeeId,
    OrderDate,
    DeliveryDate,
    isPaid,
    DueDate,
    TermCode,
    Total,
    DeliveredBy,
    PackedBy,
    OrderStatusId,
    Balance,
    Salesman,
    [User],
    Returns,
    AmountPaid,
    BIR,
    ShipperId,
    Adjust,
    OrderProfit,
    OrderFree,
    SalesOrderId,
    CreditsApplied,
    Consign,
    DRNumber,
    Commission,
    SINumber,
    SIDate,
    SICustomer,
    SITerms,
    SIBalance,
    SINetAmount,
    SIAgent,
    PONumber,
    BeginningBalance,
    ReferenceNumber,
    WTax,
    Cancelled,
    WarehouseId,
    Rebate,
    CommissionPaid,
    CommissionDate,
    NoCommission,
    CommissionAmount,
    CommissionFixed,
    Collector,
    isCommissionComputable,
    DatePaid,
    CollectedAmount,
    isHeavy,
    ERR,
    PaymentModeId,
    Driver,
    Helper,
    Truck,
    Notes,
    PackList,
    Remarks,
    AdjustmentRemarks
)
SELECT
    TRY_CONVERT(INT, o.ORDERID),

    CASE
        WHEN NULLIF(LTRIM(RTRIM(o.CUSTOMERID)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, o.CUSTOMERID) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Customers AS c
            WHERE TRY_CONVERT(INT, c.id) = TRY_CONVERT(INT, o.CUSTOMERID)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, o.CUSTOMERID)
    END,

    NULLIF(LTRIM(RTRIM(o.INVOICE_NO)), ''),

    CASE
        WHEN NULLIF(LTRIM(RTRIM(o.EMPLOYEEID)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, o.EMPLOYEEID) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Employees AS e
            WHERE TRY_CONVERT(INT, e.id) = TRY_CONVERT(INT, o.EMPLOYEEID)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, o.EMPLOYEEID)
    END,

    o.ORDERDATE,
    o.DELIVERYDA,
    o.PAID,
    o.DUEDATE,

	CASE
		WHEN NULLIF(LTRIM(RTRIM(o.TERMCODE)), '') IS NULL THEN NULL
		WHEN TRY_CONVERT(INT, o.TERMCODE) IS NULL THEN NULL
		WHEN NOT EXISTS
		(
			SELECT 1
			FROM IRYS.dbo.Terms AS t
			WHERE TRY_CONVERT(INT, t.TermCode) = TRY_CONVERT(INT, o.TERMCODE)
		) THEN NULL
		ELSE TRY_CONVERT(INT,NULLIF(LTRIM(RTRIM(o.TERMCODE)), ''))
	END,

    o.TOTAL,
    TRY_CONVERT(INT, o.DELIVEREDB),
    TRY_CONVERT(INT, o.PACKEDBY),

    CASE
        WHEN NULLIF(LTRIM(RTRIM(o.STATUS)), '') IS NULL THEN 0
        ELSE os.Id
    END,

    o.BALANCE,

    CASE
        WHEN NULLIF(LTRIM(RTRIM(o.SALESMAN)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, o.SALESMAN) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Employees AS e
            WHERE TRY_CONVERT(INT, e.id) = TRY_CONVERT(INT, o.SALESMAN)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, o.SALESMAN)
    END,

    NULL,
    o.RETURNS,
    o.AMTPAID,
    o.BIR,

    CASE
        WHEN NULLIF(LTRIM(RTRIM(o.SHIPPERID)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, o.SHIPPERID) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Shippers AS s
            WHERE TRY_CONVERT(INT, s.id) = TRY_CONVERT(INT, o.SHIPPERID)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, o.SHIPPERID)
    END,

    o.ADJUST,
    o.ORDPROFIT,
    o.ORDFREE,

	CASE
		WHEN NULLIF(LTRIM(RTRIM(o.S_ORDERID)), '') IS NULL THEN NULL
		WHEN TRY_CONVERT(INT, o.S_ORDERID) IS NULL THEN NULL
		WHEN NOT EXISTS
		(
			SELECT 1
			FROM IRYS.dbo.SalesOrders AS s
			WHERE TRY_CONVERT(INT, s.id) = TRY_CONVERT(INT, o.S_ORDERID)
		) THEN NULL
		ELSE TRY_CONVERT(INT, o.S_ORDERID)
	END,

    o.CREDITSAPP,
    o.CONSIGN,
    NULLIF(LTRIM(RTRIM(o.DR_NO)), ''),
    o.COMM,
    NULLIF(LTRIM(RTRIM(o.SINO)), ''),
    o.SIDATE,
    NULLIF(LTRIM(RTRIM(o.SICUSTOMER)), ''),
    NULLIF(LTRIM(RTRIM(o.SITERMS)), ''),
    o.SIBALANCE,
    o.SINETAMOUN,
    NULLIF(LTRIM(RTRIM(o.SIAGENT)), ''),
    NULLIF(LTRIM(RTRIM(o.PONO)), ''),
    o.BEGINBAL,
    NULLIF(LTRIM(RTRIM(o.REFNO)), ''),
    o.WTAX,
    o.CANCELLED,
    NULL,
    o.REBATES,
    o.COMM_PD,
    o.COMMDATE,
    o.NOCOMM,
    o.COMM_AMT,
    o.COMM_FIXED,

    CASE
        WHEN NULLIF(LTRIM(RTRIM(o.COLLECTOR)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, o.COLLECTOR) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Employees AS e
            WHERE TRY_CONVERT(INT, e.id) = TRY_CONVERT(INT, o.COLLECTOR)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, o.COLLECTOR)
    END,

    o.COMM_COMPU,
    o.DATE_PAID,
    o.COLL_AMT,
    o.HEAVY,

    CASE
		WHEN NULLIF(LTRIM(RTRIM(o.ERR)), '') IS NULL THEN NULL
		WHEN TRY_CONVERT(INT, o.ERR) IS NULL THEN NULL
		WHEN NOT EXISTS (
			SELECT 1
			FROM IRYS.dbo.Employees AS e
			WHERE TRY_CONVERT(INT, e.id) = TRY_CONVERT(INT, o.ERR)
		) THEN NULL
		ELSE TRY_CONVERT(INT, o.ERR)
	END,

    NULL,

    CASE
		WHEN NULLIF(LTRIM(RTRIM(o.DRIVER)), '') IS NULL THEN NULL
		WHEN TRY_CONVERT(INT, o.DRIVER) IS NULL THEN NULL
		WHEN NOT EXISTS (
			SELECT 1
			FROM IRYS.dbo.Employees AS e
			WHERE TRY_CONVERT(INT, e.id) = TRY_CONVERT(INT, o.DRIVER)
		) THEN NULL
		ELSE TRY_CONVERT(INT, o.DRIVER)
	END,

    CASE
		WHEN NULLIF(LTRIM(RTRIM(o.HELPER)), '') IS NULL THEN NULL
		WHEN TRY_CONVERT(INT, o.HELPER) IS NULL THEN NULL
		WHEN NOT EXISTS (
			SELECT 1
			FROM IRYS.dbo.Employees AS e
			WHERE TRY_CONVERT(INT, e.id) = TRY_CONVERT(INT, o.HELPER)
		) THEN NULL
		ELSE TRY_CONVERT(INT, o.HELPER)
	END,

    NULLIF(LTRIM(RTRIM(o.TRUCK)), ''),
    NULLIF(LTRIM(RTRIM(CAST(o.NOTES AS VARCHAR(MAX)))), ''),
    NULLIF(LTRIM(RTRIM(CAST(o.PACKLIST AS VARCHAR(MAX)))), ''),
    NULLIF(LTRIM(RTRIM(CAST(o.REMARKS AS VARCHAR(MAX)))), ''),
    NULLIF(LTRIM(RTRIM(CAST(o.ADJREM AS VARCHAR(MAX)))), '')
FROM FoxProLegacy.dbo.ORDERS AS o
LEFT JOIN IRYS.dbo.OrderStatuses AS os
    ON LTRIM(RTRIM(os.StatusName)) = LTRIM(RTRIM(o.STATUS));
GO