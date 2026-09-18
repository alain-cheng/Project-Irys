USE IRYS;
GO
INSERT INTO dbo.PaymentModes
(
	Id,
	ModeName
)
VALUES
	(1, 'Cash'),
	(2, 'Check'),
	(3, 'Credit Card'),
	(4, 'Bank Transfer'),
	(5, 'Offst'),
	(6, 'Others'),
	(7, 'Unspecified')
GO