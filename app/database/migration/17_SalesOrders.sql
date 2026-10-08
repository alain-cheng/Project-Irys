USE IRYS;
GO
INSERT INTO dbo.SalesOrders
(
    Id,
    CustomerId,
    OrderDate,
    Remarks,
    OrderStatusId,
    Total,
    Salesman,
    PONumber,
    TermCode,
    ShipperId,
    [User],
    EmployeeId,
    Notes
)
SELECT
    TRY_CONVERT(INT, s.S_ORDERID),

    CASE
        WHEN NULLIF(LTRIM(RTRIM(s.CUSTOMERID)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, s.CUSTOMERID) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Customers AS c
            WHERE c.Id = TRY_CONVERT(INT, s.CUSTOMERID)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, s.CUSTOMERID)
    END,

    s.ORDERDATE,

    NULLIF(LTRIM(RTRIM(CAST(s.REMARKS AS VARCHAR(MAX)))),''),

    CASE
        WHEN NULLIF(LTRIM(RTRIM(s.STATUS)), '') IS NULL THEN 0
        ELSE os.Id
    END,

    s.TOTAL,

    CASE
        WHEN NULLIF(LTRIM(RTRIM(s.SALESMAN)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, s.SALESMAN) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Employees AS e
            WHERE e.Id = TRY_CONVERT(INT, s.SALESMAN)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, s.SALESMAN)
    END,

    NULLIF(LTRIM(RTRIM(s.PONO)), ''),

    CASE
        WHEN NULLIF(LTRIM(RTRIM(s.TERMCODE)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, s.TERMCODE) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Terms AS t
            WHERE t.TermCode = TRY_CONVERT(INT, s.TERMCODE)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, s.TERMCODE)
    END,

    CASE
        WHEN NULLIF(LTRIM(RTRIM(s.SHIPPERID)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, s.SHIPPERID) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Shippers AS sh
            WHERE sh.Id = TRY_CONVERT(INT, s.SHIPPERID)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, s.SHIPPERID)
    END,

    NULL,

    CASE
        WHEN NULLIF(LTRIM(RTRIM(s.EMPLOYEEID)), '') IS NULL THEN NULL
        WHEN TRY_CONVERT(INT, s.EMPLOYEEID) IS NULL THEN NULL
        WHEN NOT EXISTS
        (
            SELECT 1
            FROM IRYS.dbo.Employees AS e
            WHERE e.Id = TRY_CONVERT(INT, s.EMPLOYEEID)
        ) THEN NULL
        ELSE TRY_CONVERT(INT, s.EMPLOYEEID)
    END,

    NULLIF(LTRIM(RTRIM(CAST(s.NOTES AS VARCHAR(MAX)))),'')
FROM FoxProLegacy.dbo.SALESORDERS AS s
LEFT JOIN IRYS.dbo.OrderStatuses AS os
    ON LTRIM(RTRIM(os.StatusName)) = LTRIM(RTRIM(s.STATUS));
GO