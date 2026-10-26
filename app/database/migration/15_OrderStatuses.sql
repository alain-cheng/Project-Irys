USE IRYS;
GO
SET IDENTITY_INSERT dbo.OrderStatuses ON;
GO
INSERT INTO dbo.OrderStatuses
(
	Id,
	StatusName
)
VALUES
	(0, 'UNSPECIFIED'),
	(1, 'CLOSED'),
	(2, 'OPEN'),
	(3, 'POSTED'),
	(4, 'CANCEL')
GO
SET IDENTITY_INSERT dbo.OrderStatuses OFF;
GO