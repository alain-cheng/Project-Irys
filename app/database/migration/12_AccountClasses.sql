USE IRYS;
GO
SET IDENTITY_INSERT dbo.AccountClasses ON;
GO
INSERT INTO dbo.AccountClasses
(
	AccountClass,
	AccountDescription,
	OpeningBalance,
	CurrentBalance,
	ClassDescription
)
SELECT
	TRY_CONVERT(INT, a.ACCTCLASS),
	NULLIF(LTRIM(RTRIM(a.ACCTDESC)), ''),
	a.OPENBAL,
	a.CURRBAL,
	NULLIF(LTRIM(RTRIM(a.CLASSDESC)), '')
FROM FoxProLegacy.dbo.ACCTCLASS AS a;
GO
SET IDENTITY_INSERT dbo.AccountClasses OFF;
GO