USE IRYS;
GO
INSERT INTO dbo.Terms
(
	TermCode,
	DiscDate,
	DueDate,
	Discount,
	Charge,
	TermDescription,
	TermDays
)
VALUES
	(4, NULL, NULL, 0, 0, NULL, 75),
	(5, NULL, NULL, 0, 0, 'COD', 0),
	(6, NULL, NULL, 0, 0, NULL, 60),
	(13, NULL, NULL, 0, 0, NULL, 30),
	(17, NULL, NULL, 0, 0, NULL, 45),
	(18, NULL, NULL, 0, 0, NULL, 15),
	(19, NULL, NULL, 0, 0, NULL, 90),
	(33, NULL, NULL, 0, 0, NULL, 0)
GO