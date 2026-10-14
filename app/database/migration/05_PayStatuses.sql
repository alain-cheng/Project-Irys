USE IRYS;
GO
SET IDENTITY_INSERT dbo.PayStatuses ON;
GO
INSERT INTO dbo.PayStatuses
(
	Id,
	StatusName
)
VALUES
	(1, 'CLOSED'),
	(2, 'OPEN'),
	(3, 'UNSPECFIED');
GO
SET IDENTITY_INSERT dbo.PayStatuses OFF;
GO