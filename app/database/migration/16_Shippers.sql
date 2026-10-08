USE IRYS;
GO
INSERT INTO dbo.Shippers
(
    Id,
    ShipperName,
    ContactName,
    Address,
    City,
    Province,
    ZipCode,
    Phone
)
SELECT
    TRY_CONVERT(INT, s.SHIPPERID),
    s.SHIPPERNAM,
    NULLIF(LTRIM(RTRIM(s.CONTNAME)), ''),
    NULLIF(LTRIM(RTRIM(s.ADDRESS)), ''),
    NULLIF(LTRIM(RTRIM(s.CITY)), ''),
    NULLIF(LTRIM(RTRIM(s.PROVINCE)), ''),
    NULLIF(LTRIM(RTRIM(s.ZIPCODE)), ''),
    NULLIF(LTRIM(RTRIM(s.PHONE)), '')
FROM FoxProLegacy.dbo.SHIPPERS AS s;
GO