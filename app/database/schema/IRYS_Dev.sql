IF DB_ID('IRYS_Dev') IS NULL EXECUTE('CREATE DATABASE [IRYS_Dev];');
GO

USE [IRYS_Dev];
GO

IF SCHEMA_ID('dbo') IS NULL EXECUTE('CREATE SCHEMA [dbo];');
GO

---------------------------------------------------
---               AccountClasses                ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.AccountClasses ( 
	AccountClass         int      NOT NULL,
	AccountDescription   varchar(max)      NULL,
	OpeningBalance       float  CONSTRAINT DF_AccountClasses_OpeningBalance DEFAULT 0    NOT NULL,
	CurrentBalance       float  CONSTRAINT DF_AccountClasses_CurrentBalance DEFAULT 0    NOT NULL,
	ClassDescription     varchar(max)      NULL,
	CONSTRAINT pk_AccountClass PRIMARY KEY  ( AccountClass ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.ACCTCLASS > IRYS_Dev.dbo.AccountClasses' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'AccountClasses';;
GO

---------------------------------------------------
---                  Accounts                   ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Accounts ( 
	Id                   int      NOT NULL,
	AccountClass         int      NOT NULL,
	SubAccountOf         int      NULL,
	AccountName          varchar(255)      NOT NULL,
	Description          varchar(max)      NULL,
	OpeningBalance       float  CONSTRAINT DF_Accounts_OpeningBalance DEFAULT 0    NOT NULL,
	CurrentBalance       float  CONSTRAINT DF_Accounts_CurrentBalance DEFAULT 0    NOT NULL,
	CONSTRAINT pk_Accounts PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'Legacy.dbo.ACCOUNTS > IRYS_Dev.dbo.Accounts

---

Altered Cols:
ACCOUNTS.ACCT_NO > Accounts.Id

Dropped Cols:
ACCOUNTS.SUB  			// redundant' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Accounts';;
GO

---------------------------------------------------
---                    Banks                    ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Banks ( 
	Id                   int      NOT NULL,
	BankName             varchar(255)      NOT NULL,
	ContactName          varchar(100)      NULL,
	ContactTitle         varchar(50)      NULL,
	Address              varchar(255)      NULL,
	Province             varchar(50)      NULL,
	City                 varchar(50)      NULL,
	ZipCode              varchar(10)      NULL,
	Phone                varchar(30)      NULL,
	BankCode             varchar(8)      NULL,
	CONSTRAINT pk_Banks PRIMARY KEY  ( Id ) 
 );
GO

---------------------------------------------------
---                 BillStatus                  ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.BillStatus ( 
	Id                   int      NOT NULL,
	StatusName           varchar(20)      NOT NULL,
	CONSTRAINT pk_BillStatus PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'NEW TABLE' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BillStatus';;
GO

---------------------------------------------------
---                 Categories                  ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Categories ( 
	Id                   int      NOT NULL,
	CategoryName         varchar(255)      NOT NULL,
	Description          varchar(max)      NULL,
	CONSTRAINT pk_Categories PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.CATEGORY > IRYS_Dev.dbo.Categories' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Categories';;
GO

---------------------------------------------------
---                CustomerArea                 ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.CustomerArea ( 
	AreaCode             int      NOT NULL,
	AreaName             varchar(50)      NOT NULL,
	CONSTRAINT pk_CustomerArea PRIMARY KEY  ( AreaCode ) ,
	CONSTRAINT unq_CustomerArea_AreaName UNIQUE ( AreaName ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'Legacy.dbo.CUSTAREA > IRYS_Dev.dbo.CustomerArea

---

Dropped Cols:
Legacy.dbo.CUSTAREA.AREACODE0
Legacy.dbo.CUSTAREA.AREADESC0' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CustomerArea';;
GO

---------------------------------------------------
---                  Employees                  ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Employees ( 
	Id                   int      NOT NULL,
	FirstName            varchar(50)      NULL,
	MiddleName           varchar(20)      NULL,
	LastName             varchar(50)      NULL,
	NickName             varchar(50)      NULL,
	Position             varchar(50)      NULL,
	Address              varchar(255)      NULL,
	City                 varchar(50)      NULL,
	Province             varchar(50)      NULL,
	ZipCode              varchar(10)      NULL,
	Phone                varchar(30)      NULL,
	BirthDate            date  CONSTRAINT DF_Employees_BirthDate DEFAULT '1899-12-30'    NOT NULL,
	Sex                  varchar(1)  CONSTRAINT DF_Employees_Sex DEFAULT 'M'    NOT NULL,
	DateHired            date  CONSTRAINT DF_Employees_DateHired DEFAULT getdate()    NOT NULL,
	SSS                  varchar(15)      NULL,
	GroupId              int  CONSTRAINT DF_Employees_GroupId DEFAULT 1    NOT NULL,
	AgentType            int  CONSTRAINT DF_Employees_AgentType DEFAULT 0    NULL,
	CONSTRAINT pk_Employee PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'Legacy.dbo.EMPLOYEES > IRYS_Dev.dbo.Employee

---

Dropped Cols:
Legacy.dbo.EMPLOYEES.NICKNAME1
Legacy.dbo.EMPLOYEES.USERNAME
Legacy.dbo.EMPLOYEES.PASSWORD
Legacy.dbo.EMPLOYEES.AGCODE
Legacy.dbo.EMPLOYEES.AGNAME' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Employees';;
GO

---------------------------------------------------
---                 Collections                 ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Collections ( 
	Id                   int      NOT NULL,
	CollectionDate       date  CONSTRAINT DF_Collections_CollectionDate DEFAULT getdate()    NOT NULL,
	EmployeeId           int      NULL,
	ReferenceNumber      varchar(100)      NULL,
	Remarks              varchar(max)      NULL,
	Salesman             int      NULL,
	CONSTRAINT pk_Collections PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.COLLECTIONS > IRYS_Dev.dbo.Collections' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Collections';;
GO

---------------------------------------------------
---                  Customers                  ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Customers ( 
	Id                   int      NOT NULL,
	CompanyName          varchar(255)      NULL,
	ContactName          varchar(100)      NULL,
	ContactTitle         varchar(50)      NULL,
	Address              varchar(255)      NULL,
	City                 varchar(50)      NULL,
	Province             varchar(50)      NULL,
	ZipCode              varchar(10)      NULL,
	Phone                varchar(30)      NULL,
	Fax                  varchar(20)      NULL,
	Alarm                bit  CONSTRAINT DF_Customers_Alarm DEFAULT 0    NOT NULL,
	EmployeeId           int      NULL,
	PriceLvl             int  CONSTRAINT DF_Customers_PriceLvl DEFAULT 1    NOT NULL,
	CreditLimit          float  CONSTRAINT DF_Customers_CreditLimit DEFAULT 0    NOT NULL,
	Balance              float  CONSTRAINT DF_Customers_Balance DEFAULT 0    NOT NULL,
	Credit               float  CONSTRAINT DF_Customers_Credit DEFAULT 0    NOT NULL,
	InvBalance           float  CONSTRAINT DF_Customers_InvBalance DEFAULT 0    NOT NULL,
	TIN                  varchar(20)      NULL,
	AreaCode             int      NULL,
	CustomerCode         varchar(15)      NULL,
	CustomerArea         varchar(8)      NULL,
	CustomerAgent        varchar(12)      NULL,
	AgentName            varchar(20)      NULL,
	CustomerType         varchar(20)      NULL,
	StartDate            date  CONSTRAINT DF_Customers_StartDate DEFAULT getdate()    NOT NULL,
	SmCode               varchar(2)      NULL,
	Term                 varchar(1)      NULL,
	TermCode             varchar(6)      NULL,
	PType                varchar(1)      NULL,
	Remarks              varchar(max)      NULL,
	CONSTRAINT pk_Customers PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'TBD' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Customers', @level2type=N'COLUMN',@level2name=N'PriceLvl';
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'TBD' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Customers', @level2type=N'COLUMN',@level2name=N'InvBalance';
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'TBD' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Customers', @level2type=N'COLUMN',@level2name=N'SmCode';
GO

---------------------------------------------------
---                 ItemGroups                  ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.ItemGroups ( 
	Id                   int      NOT NULL,
	ItemGroupDescription varchar(255)      NOT NULL,
	PhotoFile            varchar(2083)      NULL,
	CategoryId           int      NULL,
	CONSTRAINT pk_ItemGroups PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.ITEMGRP > IRYS_Dev.dbo.ItemGroups

---

Dropped Cols:
ITEMGRP.CATDESCRIP' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ItemGroups';;
GO

---------------------------------------------------
---                ItemLocations                ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.ItemLocations ( 
	Id                   int      NOT NULL,
	LocationName         varchar(max)      NOT NULL,
	CONSTRAINT pk_ItemLocations PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGAYC.dbo.ITEMLOC > IRYS_Dev.dbo.ItemLocations' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ItemLocations';;
GO

---------------------------------------------------
---                OrderStatuses                ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.OrderStatuses ( 
	Id                   int      NOT NULL,
	StatusName           varchar(20)      NOT NULL,
	CONSTRAINT pk_OrderStatuses PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'NEW TABLE' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'OrderStatuses';;
GO

---------------------------------------------------
---                 PayStatuses                 ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.PayStatuses ( 
	Id                   int      NOT NULL,
	StatusName           varchar(10)      NOT NULL,
	CONSTRAINT pk_PayStatuses PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'NEW TABLE' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PayStatuses';;
GO

---------------------------------------------------
---                PaymentModes                 ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.PaymentModes ( 
	Id                   int      NOT NULL,
	ModeName             varchar(20)      NOT NULL,
	CONSTRAINT pk_PaymentModes PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'NEW TABLE' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PaymentModes';;
GO

---------------------------------------------------
---                  Payments                   ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Payments ( 
	Id                   int      NOT NULL,
	CustomerId           int      NULL,
	PaymentModeId        int      NOT NULL,
	Amount               float  CONSTRAINT DF_Payments_Amount DEFAULT 0    NOT NULL,
	PayDate              date  CONSTRAINT DF_Payments_PayDate DEFAULT getdate()    NOT NULL,
	ReferenceNo          varchar(15)      NULL,
	Remarks              varchar(max)      NULL,
	PayStatusId          int  CONSTRAINT DF_Payments_PayStatusId DEFAULT 1    NOT NULL,
	CreditsApplied       float  CONSTRAINT DF_Payments_CreditsApplied DEFAULT 0    NOT NULL,
	Adjust               float  CONSTRAINT DF_Payments_Adjust DEFAULT 0    NOT NULL,
	EmployeeId           int      NULL,
	Notes                varchar(max)      NULL,
	Collector            int      NULL,
	CONSTRAINT pk_Payments PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.PAYMENTS > IRYS_Dev.dbo.Payments

---

Altered Cols:
LEGACY.dbo.PAYMENTS.MODE > IRYS_Dev.dbo.Payments.PaymentModeId
LEGACY.dbo.PAYMENTS.STATUS > IRYS_Dev.dbo.Payments.PayStatusId

Dropped Cols:
LEGACY.dbo.PAYMENTS.CV
LEGACY.dbo.PAYMENTS.USER' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Payments';;
GO

---------------------------------------------------
---               PurchaseOrders                ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.PurchaseOrders ( 
	Id                   int      NOT NULL,
	CONSTRAINT pk_PurchaseOrders PRIMARY KEY  ( Id ) 
 );
GO

---------------------------------------------------
---              PurchaseStatuses               ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.PurchaseStatuses ( 
	Id                   int      NOT NULL,
	StatusName           varchar(20)      NOT NULL,
	CONSTRAINT pk_PurchaseStatuses PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'NEW TABLE' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'PurchaseStatuses';;
GO

---------------------------------------------------
---                  Purchases                  ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Purchases ( 
	Id                   int      NOT NULL,
	SupplierId           int      NULL,
	PONumber             varchar(100)      NULL,
	EmployeeId           int      NULL,
	OrderDate            date  CONSTRAINT DF_Purchases_OrderDate DEFAULT getdate()    NOT NULL,
	DeliveryDate         date  CONSTRAINT DF_Purchases_DeliveryDate DEFAULT '1899-12-30'    NOT NULL,
	isPaid               bit  CONSTRAINT DF_Purchases_isPaid DEFAULT 0    NOT NULL,
	DueDate              date  CONSTRAINT DF_Purchases_DueDate DEFAULT getdate()    NOT NULL,
	TermCode             int      NULL,
	Amount               float  CONSTRAINT DF_Purchases_Amount DEFAULT 0    NOT NULL,
	isPosted             bit  CONSTRAINT DF_Purchases_isPosted DEFAULT 0    NOT NULL,
	PurchaseStatusId     int  CONSTRAINT DF_Purchases_PurchaseStatusId DEFAULT 0    NOT NULL,
	Returns              float  CONSTRAINT DF_Purchases_Returns DEFAULT 0    NOT NULL,
	Balance              float  CONSTRAINT DF_Purchases_Balance DEFAULT 0    NOT NULL,
	AmountPaid           float  CONSTRAINT DF_Purchases_AmountPaid DEFAULT 0    NOT NULL,
	Adjust               float  CONSTRAINT DF_Purchases_Adjust DEFAULT 0    NOT NULL,
	AdjustRemarks        varchar(max)      NULL,
	Remarks              varchar(max)      NULL,
	InvoiceNumber        varchar(100)      NULL,
	isBIR                bit  CONSTRAINT DF_Purchases_isBIR DEFAULT 0    NOT NULL,
	PurchaseOrderId      int      NULL,
	CreditsApplied       float  CONSTRAINT DF_Purchases_CreditsApplied DEFAULT 0    NOT NULL,
	isConsign            bit  CONSTRAINT DF_Purchases_isConsign DEFAULT 0    NOT NULL,
	DRNumber             varchar(10)      NULL,
	RRNumber             varchar(8)      NULL,
	RRDate               date  CONSTRAINT DF_Purchases_RRDate DEFAULT '1899-12-30'    NOT NULL,
	CONSTRAINT pk_Purchases PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.PURCHASES > IRYS_Dev.dbo.Purchases

---

Altered Cols:
PURCHASES.STATUS > Purchases.PurchaseStatusId

Dropped Cols:
PURCHASES.PYMNT_TYPE' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Purchases';;
GO

---------------------------------------------------
---                  Shippers                   ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Shippers ( 
	Id                   int      NOT NULL,
	ShipperName          varchar(255)      NOT NULL,
	ContactName          varchar(100)      NULL,
	Address              varchar(255)      NULL,
	City                 varchar(50)      NULL,
	Province             varchar(50)      NULL,
	ZipCode              varchar(15)      NULL,
	Phone                varchar(30)      NULL,
	CONSTRAINT pk_Shippers PRIMARY KEY  ( Id ) 
 );
GO

---------------------------------------------------
---                  Suppliers                  ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Suppliers ( 
	Id                   int      NOT NULL,
	SupplierName         varchar(255)      NOT NULL,
	ContactName          varchar(100)      NULL,
	ContactTitle         varchar(50)      NULL,
	Address              varchar(255)      NULL,
	City                 varchar(50)      NULL,
	Province             varchar(50)      NULL,
	ZipCode              varchar(4)      NULL,
	Phone                varchar(30)      NULL,
	Fax                  varchar(20)      NULL,
	Balance              float  CONSTRAINT DF_Suppliers_Balance DEFAULT 0    NOT NULL,
	PurchaseBalance      float  CONSTRAINT DF_Suppliers_PurchaseBalance DEFAULT 0    NOT NULL,
	Credit               float  CONSTRAINT DF_Suppliers_Credit DEFAULT 0    NOT NULL,
	TIN                  varchar(20)      NULL,
	CONSTRAINT pk_Suppliers PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.SUPPLIERS > IRYS_Dev.dbo.Suppliers

---

Dropped cols:
LEGACY.dbo.SUPPLIERS.SUPLCODE
LEGACY.dbo.SUPPLIERS.SUPLNAME
LEGACY.dbo.SUPPLIERS.SUPLSTREET
LEGACY.dbo.SUPPLIERS.SUPLPROVIN
LEGACY.dbo.SUPPLIERS.SUPLCITY
LEGACY.dbo.SUPPLIERS.SUPLCONTAC
LEGACY.dbo.SUPPLIERS.SUPLTELNO
LEGACY.dbo.SUPPLIERS.SUPLFAXNO
LEGACY.dbo.SUPPLIERS.STARTDATE' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Suppliers';;
GO

---------------------------------------------------
---              SupplierPayments               ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.SupplierPayments ( 
	Id                   int      NOT NULL,
	SupplierId           int      NULL,
	PaymentModeId        int      NOT NULL,
	Amount               float  CONSTRAINT DF_SupplierPayments_Amount DEFAULT 0    NOT NULL,
	PayDate              date  CONSTRAINT DF_SupplierPayments_PayDate DEFAULT getdate()    NOT NULL,
	ReferenceNo          varchar(15)      NULL,
	Remarks              varchar(max)      NULL,
	PayStatusId          int      NOT NULL,
	CreditsApplied       float  CONSTRAINT DF_SupplierPayments_CreditsApplied DEFAULT 0    NOT NULL,
	Adjust               float  CONSTRAINT DF_SupplierPayments_Adjust DEFAULT 0    NOT NULL,
	EmployeeId           int      NULL,
	Notes                varchar(max)      NULL,
	CONSTRAINT pk_SupplierPayments PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.PAYMENT2 > IRYS_Dev.dbo.SupplierPayments

---

Alters Cols:
LEGACY.dbo.PAYMENT2.MODE> IRYS_Dev.dbo.SupplierPayments.PaymentModeId
LEGACY.dbo.PAYMENT2.STATUS > IRYS_Dev.dbo.SupplierPayments.PayStatusId

Dropped Cols:
LEGACY.dbo.PAYMENT2.CV
LEGACY.dbo.PAYMENT2.USER' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SupplierPayments';;
GO

---------------------------------------------------
---                    Terms                    ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Terms ( 
	TermCode             int      NOT NULL,
	DiscDate             date      NULL,
	DueDate              date      NULL,
	Discount             float  CONSTRAINT DF_Terms_Discount DEFAULT 0    NOT NULL,
	Charge               float  CONSTRAINT DF_Terms_Charge DEFAULT 0    NOT NULL,
	TermDescription      varchar(max)      NULL,
	TermDays             int  CONSTRAINT DF_Terms_TermDays DEFAULT 0    NOT NULL,
	CONSTRAINT pk_Terms PRIMARY KEY  ( TermCode ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.TERMS > IRYS_Dev.dbo.Terms

---

Dropped Cols:
TERMS.TERMDESC1
TERMS.TERMCODE1' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Terms';;
GO

---------------------------------------------------
---                    Units                    ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Units ( 
	UnitCode             int      NOT NULL,
	UnitName             varchar(25)      NOT NULL,
	CONSTRAINT pk_Unit PRIMARY KEY  ( UnitCode ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'Legacy.dbo.UNIT > IRYS_Dev.dbo.Units

---

Alterd Cols:
UNIT.UNITCODE > Units.Id' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Units';;
GO

---------------------------------------------------
---                    Items                    ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Items ( 
	ItemCode             int      NOT NULL,
	ItemName             varchar(255)      NOT NULL,
	Remarks              varchar(max)      NULL,
	ItemGroupId          int      NULL,
	UnitsInStock         int  CONSTRAINT DF_Items_UnitsInStock DEFAULT 0    NOT NULL,
	ReturnStocks         int  CONSTRAINT DF_Items_ReturnStocks DEFAULT 0    NULL,
	UnitCode             int      NULL,
	BasePrice            float  CONSTRAINT DF_Items_BasePrice DEFAULT 0    NOT NULL,
	SDisc1               int  CONSTRAINT DF_Items_SDisc1 DEFAULT 0    NULL,
	SDisc2               int  CONSTRAINT DF_Items_SDisc2 DEFAULT 0    NULL,
	SDisc3               int  CONSTRAINT DF_Items_SDisc3 DEFAULT 0    NULL,
	SDisc4               int  CONSTRAINT DF_Items_SDisc4 DEFAULT 0    NULL,
	SDisc5               int  CONSTRAINT DF_Items_SDisc5 DEFAULT 0    NULL,
	SDisc6               int  CONSTRAINT DF_Items_SDisc6 DEFAULT 0    NULL,
	SDisc7               int  CONSTRAINT DF_Items_SDisc7 DEFAULT 0    NULL,
	SDisc8               int  CONSTRAINT DF_Items_SDisc8 DEFAULT 0    NULL,
	SDisc9               int  CONSTRAINT DF_Items_SDisc9 DEFAULT 0    NULL,
	SDisc10              int  CONSTRAINT DF_Items_SDisc10 DEFAULT 0    NULL,
	SDiscId              varchar(20)      NOT NULL,
	SellingPrice         float  CONSTRAINT DF_Items_SellingPrice DEFAULT 0    NOT NULL,
	R1Price              float  CONSTRAINT DF_Items_R1Price DEFAULT 0    NOT NULL,
	R1Disc1              int  CONSTRAINT DF_Items_R1Disc1 DEFAULT 0    NULL,
	R1Disc2              int  CONSTRAINT DF_Items_R1Disc2 DEFAULT 0    NULL,
	R1Disc3              int  CONSTRAINT DF_Items_R1Disc3 DEFAULT 0    NULL,
	R1Disc4              int  CONSTRAINT DF_Items_R1Disc4 DEFAULT 0    NULL,
	R1Disc5              int  CONSTRAINT DF_Items_R1Disc5 DEFAULT 0    NULL,
	R1Disc6              int  CONSTRAINT DF_Items_R1Disc6 DEFAULT 0    NULL,
	R1Disc7              int  CONSTRAINT DF_Items_R1Disc7 DEFAULT 0    NULL,
	R1Disc8              int  CONSTRAINT DF_Items_R1Disc8 DEFAULT 0    NULL,
	R1Disc9              int  CONSTRAINT DF_Items_R1Disc9 DEFAULT 0    NULL,
	R1Disc10             int  CONSTRAINT DF_Items_R1Disc10 DEFAULT 0    NULL,
	R1DiscId             varchar(20)      NOT NULL,
	R1SPrice             float  CONSTRAINT DF_Items_R1SPrice DEFAULT 0    NOT NULL,
	R2Price              float  CONSTRAINT DF_Items_R2Price DEFAULT 0    NOT NULL,
	R2Disc1              int  CONSTRAINT DF_Items_R2Disc1 DEFAULT 0    NULL,
	R2Disc2              int  CONSTRAINT DF_Items_R2Disc2 DEFAULT 0    NULL,
	R2Disc3              int  CONSTRAINT DF_Items_R2Disc3 DEFAULT 0    NULL,
	R2Disc4              int  CONSTRAINT DF_Items_R2Disc4 DEFAULT 0    NULL,
	R2Disc5              int  CONSTRAINT DF_Items_R2Disc5 DEFAULT 0    NULL,
	R2Disc6              int  CONSTRAINT DF_Items_R2Disc6 DEFAULT 0    NULL,
	R2Disc7              int  CONSTRAINT DF_Items_R2Disc7 DEFAULT 0    NULL,
	R2Disc8              int  CONSTRAINT DF_Items_R2Disc8 DEFAULT 0    NULL,
	R2Disc9              int  CONSTRAINT DF_Items_R2Disc9 DEFAULT 0    NULL,
	R2Disc10             int  CONSTRAINT DF_Items_R2Disc10 DEFAULT 0    NULL,
	R2DiscId             varchar(20)      NOT NULL,
	SPPrice              float  CONSTRAINT DF_Items_SPPrice DEFAULT 0    NOT NULL,
	SPDisc1              int  CONSTRAINT DF_Items_SPDisc1 DEFAULT 0    NULL,
	SPDisc2              int  CONSTRAINT DF_Items_SPDisc2 DEFAULT 0    NULL,
	SPDisc3              int  CONSTRAINT DF_Items_SPDisc3 DEFAULT 0    NULL,
	SPDisc4              int  CONSTRAINT DF_Items_SPDisc4 DEFAULT 0    NULL,
	SPDisc5              int  CONSTRAINT DF_Items_SPDisc5 DEFAULT 0    NULL,
	SPDisc6              int  CONSTRAINT DF_Items_SPDisc6 DEFAULT 0    NULL,
	SPDisc7              int  CONSTRAINT DF_Items_SPDisc7 DEFAULT 0    NULL,
	SPDisc8              int  CONSTRAINT DF_Items_SPDisc8 DEFAULT 0    NULL,
	SPDisc9              int  CONSTRAINT DF_Items_SPDisc9 DEFAULT 0    NULL,
	SPDisc10             int  CONSTRAINT DF_Items_SPDisc10 DEFAULT 0    NULL,
	SPDiscId             varchar(20)      NOT NULL,
	PUnitPrice           float  CONSTRAINT DF_Items_PUnitPrice DEFAULT 0    NOT NULL,
	PDisc1               int  CONSTRAINT DF_Items_PDisc1 DEFAULT 0    NULL,
	PDisc2               int  CONSTRAINT DF_Items_PDisc2 DEFAULT 0    NULL,
	PDisc3               int  CONSTRAINT DF_Items_PDisc3 DEFAULT 0    NULL,
	PDisc4               int  CONSTRAINT DF_Items_PDisc4 DEFAULT 0    NULL,
	PDisc5               int  CONSTRAINT DF_Items_PDisc5 DEFAULT 0    NULL,
	PDisc6               int  CONSTRAINT DF_Items_PDisc6 DEFAULT 0    NULL,
	PDisc7               int  CONSTRAINT DF_Items_PDisc7 DEFAULT 0    NULL,
	PDisc8               int  CONSTRAINT DF_Items_PDisc8 DEFAULT 0    NULL,
	PDisc9               int  CONSTRAINT DF_Items_PDisc9 DEFAULT 0    NULL,
	PDisc10              int  CONSTRAINT DF_Items_PDisc10 DEFAULT 0    NULL,
	PDiscId              varchar(20)      NOT NULL,
	PurchasePrice        float  CONSTRAINT DF_Items_PurchasePrice DEFAULT 0    NOT NULL,
	RetailPrice          float  CONSTRAINT DF_Items_RetailPrice DEFAULT 0    NOT NULL,
	CategoryId           int      NULL,
	ReorderLevel         int  CONSTRAINT DF_Items_ReorderLevel DEFAULT 0    NOT NULL,
	isDiscontinued       bit  CONSTRAINT DF_Items_isDiscontinued DEFAULT 0    NOT NULL,
	OnSOrder             float  CONSTRAINT DF_Items_OnSOrder DEFAULT 0    NOT NULL,
	OnPOrder             float  CONSTRAINT DF_Items_OnPOrder DEFAULT 0    NOT NULL,
	SupplierId           int      NULL,
	AverageCost          float  CONSTRAINT DF_Items_AverageCost DEFAULT 0    NOT NULL,
	PhotoFile            varchar(2083)      NULL,
	isEdited             bit  CONSTRAINT DF_Items_isEdited DEFAULT 0    NOT NULL,
	isReorderActive      bit  CONSTRAINT DF_Items_isReorderActive DEFAULT 0    NOT NULL,
	ItemCommission       float  CONSTRAINT DF_Items_ItemCommission DEFAULT 0    NOT NULL,
	PTermCode            int      NULL,
	Pack                 varchar(10)      NULL,
	isInventoryAdjust    bit  CONSTRAINT DF_Items_isInventoryAdjust DEFAULT 0    NOT NULL,
	ItemLocationId       int      NULL,
	TempAverageCost      float  CONSTRAINT DF_Items_TempAverageCost DEFAULT 0    NOT NULL,
	isKit                bit  CONSTRAINT DF_Items_isKit DEFAULT 0    NOT NULL,
	TermCode             int      NULL,
	CONSTRAINT pk_Items PRIMARY KEY  ( ItemCode ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.ITEMS > IRYS_Dev.dbo.Items

---

Dropped Cols:
ITEMS.ITMCODE		// duplicate col
ITEMS.ITMGRP' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Items';;
GO

---------------------------------------------------
---               BillOfMaterials               ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.BillOfMaterials ( 
	ItemCode             int      NOT NULL,
	Quantity             int  CONSTRAINT DF_BillOfMaterials_Quantity DEFAULT 0    NOT NULL
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.BILLOFMAT > IRYS_Dev.dbo.BillOfMaterials

---

Dropped Cols:
BILLOFMAT.ITEMCODE1' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BillOfMaterials';;
GO

---------------------------------------------------
---                ItemSuppliers                ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.ItemSuppliers ( 
	ItemCode             int      NULL,
	SupplierId           int      NULL
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.ITEMSUPPLIER > IRYS_Dev.dbo.ItemSuppliers' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'ItemSuppliers';;
GO

---------------------------------------------------
---                    Users                    ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Users ( 
	UserId               int      NOT NULL,
	EmployeeId           int      NULL,
	Username             varchar(255)      NOT NULL,
	PasswordHash         varchar(255)      NOT NULL,
	CONSTRAINT pk_Users PRIMARY KEY  ( UserId ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'NEW TABLE' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Users';;
GO

---------------------------------------------------
---                 SalesOrders                 ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.SalesOrders ( 
	Id                   int      NOT NULL,
	CustomerId           int      NULL,
	OrderDate            date  CONSTRAINT DF_SalesOrders_OrderDate DEFAULT getdate()    NOT NULL,
	Remarks              varchar(max)      NULL,
	OrderStatusId        int  CONSTRAINT DF_SalesOrders_OrderStatusId DEFAULT 0    NOT NULL,
	Total                float  CONSTRAINT DF_SalesOrders_Total DEFAULT 0    NOT NULL,
	Salesman             int      NULL,
	PONumber             varchar(100)      NULL,
	TermCode             int      NULL,
	ShipperId            int      NULL,
	[User]               int      NULL,
	EmployeeId           int      NULL,
	Notes                varchar(max)      NULL,
	CONSTRAINT pk_SalesOrders PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.SALESORDERS > IRYS_Dev.dbo.SalesOrders' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SalesOrders';;
GO

---------------------------------------------------
---              SalesOrderDetails              ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.SalesOrderDetails ( 
	Id                   int      NOT NULL,
	SalesOrderId         int      NULL,
	Quantity             int      NOT NULL,
	ItemCode             int      NULL,
	UnitPrice            float      NOT NULL,
	Amount               float      NULL,
	Invoiced             int  CONSTRAINT DF_SalesOrderDetails_Invoiced DEFAULT 0    NULL,
	isClosed             bit  CONSTRAINT DF_SalesOrderDetails_isClosed DEFAULT 0    NOT NULL,
	SDisc1               int  CONSTRAINT DF_SalesOrderDetails_SDisc1 DEFAULT 0    NULL,
	SDisc2               int  CONSTRAINT DF_SalesOrderDetails_SDisc2 DEFAULT 0    NULL,
	SDisc3               int  CONSTRAINT DF_SalesOrderDetails_SDisc3 DEFAULT 0    NULL,
	SDisc4               int  CONSTRAINT DF_SalesOrderDetails_SDisc4 DEFAULT 0    NULL,
	SDisc5               int  CONSTRAINT DF_SalesOrderDetails_SDisc5 DEFAULT 0    NULL,
	SDisc6               int  CONSTRAINT DF_SalesOrderDetails_SDisc6 DEFAULT 0    NULL,
	SDisc7               int  CONSTRAINT DF_SalesOrderDetails_SDisc7 DEFAULT 0    NULL,
	SDisc8               int  CONSTRAINT DF_SalesOrderDetails_SDisc8 DEFAULT 0    NULL,
	SDisc9               int  CONSTRAINT DF_SalesOrderDetails_SDisc9 DEFAULT 0    NULL,
	SDisc10              int  CONSTRAINT DF_SalesOrderDetails_SDisc10 DEFAULT 0    NULL,
	SDiscId              varchar(20)      NOT NULL,
	CONSTRAINT pk_SalesOrderDetails PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.S_ORDERDETAILS > IRYS_Dev.dbo.SalesOrderDetails' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'SalesOrderDetails';;
GO

---------------------------------------------------
---               TempSalesOrders               ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.TempSalesOrders ( 
	Id                   int      NOT NULL,
	SalesOrderId         int      NULL,
	CustomerId           int      NULL,
	OrderDate            date      NULL,
	Remarks              varchar(max)      NULL,
	OrderStatusId        int      NULL,
	Total                float      NULL,
	Salesman             int      NULL,
	PONumber             varchar(100)      NULL,
	TermCode             int      NULL,
	CONSTRAINT pk_TempSalesOrders PRIMARY KEY  ( Id ) 
 );
GO

---------------------------------------------------
---                   Vendors                   ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Vendors ( 
	Id                   int      NOT NULL,
	VendorName           varchar(255)      NULL,
	ContactName          varchar(100)      NULL,
	ContactTitle         varchar(50)      NULL,
	Address              varchar(255)      NULL,
	City                 varchar(50)      NULL,
	Province             varchar(50)      NULL,
	ZipCode              varchar(10)      NULL,
	Phone                varchar(30)      NULL,
	FAX                  varchar(20)      NULL,
	TIN                  varchar(20)      NULL,
	CONSTRAINT pk_Vendors PRIMARY KEY  ( Id ) 
 );
GO

---------------------------------------------------
---                BillPayments                 ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.BillPayments ( 
	PaymentId            int      NULL,
	VendorId             int      NULL,
	PaymentModeId        int  CONSTRAINT DF_BillPayments_PaymentModeId DEFAULT 1    NOT NULL,
	Amount               float  CONSTRAINT DF_BillPayments_Amount DEFAULT 0    NOT NULL,
	PayDate              date  CONSTRAINT DF_BillPayments_PayDate DEFAULT getdate()    NOT NULL,
	ReferenceNumber      varchar(100)      NULL,
	Remarks              varchar(max)      NULL,
	BillStatusId         int  CONSTRAINT DF_BillPayments_BillStatusId DEFAULT 0    NOT NULL
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.BILLPYMNT > IRYS_Dev.dbo.BillPayments

---

Altered Cols:
BILLPYMNT.STATUS > BillPayments.BillStatusId

Dropped Cols:
BILLPYMNT.CV' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BillPayments';;
GO

---------------------------------------------------
---                    Bills                    ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Bills ( 
	Id                   int      NOT NULL,
	BillDate             date  CONSTRAINT DF_Bills_BillDate DEFAULT getdate()    NOT NULL,
	DueDate              date  CONSTRAINT DF_Bills_DueDate DEFAULT getdate()    NOT NULL,
	VendorId             int      NULL,
	Amount               float  CONSTRAINT DF_Bills_Amount DEFAULT 0    NOT NULL,
	InvoiceNumber        varchar(100)      NULL,
	TermCode             int      NULL,
	Remarks              varchar(max)      NULL,
	isPaid               bit  CONSTRAINT DF_Bills_isPaid DEFAULT 0    NOT NULL,
	BillStatusId         int  CONSTRAINT DF_Bills_BillStatusId DEFAULT 0    NOT NULL,
	Balance              float  CONSTRAINT DF_Bills_Balance DEFAULT 0    NOT NULL,
	AmountPaid           float  CONSTRAINT DF_Bills_AmountPaid DEFAULT 0    NOT NULL,
	PaymentType          varchar(20)      NULL,
	CONSTRAINT pk_Bills PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.BILLS > IRYS_Dev.dbo.Bills

---

Altered Cols:
BILLS.STATUS > Bills.BillStatusId' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Bills';;
GO

---------------------------------------------------
---                 BillDetails                 ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.BillDetails ( 
	Id                   int      NOT NULL,
	BillId               int      NULL,
	AccountId            int      NULL,
	Amount               float  CONSTRAINT DF_BillDetails_Amount DEFAULT 0    NOT NULL,
	Remarks              varchar(max)      NULL,
	CONSTRAINT pk_BillDetails PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.BILLDETAILS > IRYS_Dev.dbo.BillDetails' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BillDetails';;
GO

---------------------------------------------------
---             BillPaymentDetails              ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.BillPaymentDetails ( 
	PaymentId            int      NULL,
	BillId               int      NULL,
	Amount               float  CONSTRAINT DF_BillPaymentDetails_Amount DEFAULT 0    NOT NULL
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.BILLPYMNTDET > IRYS_Dev.dbo.BillPaymentDetails' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'BillPaymentDetails';;
GO

---------------------------------------------------
---                 Warehouses                  ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Warehouses ( 
	Id                   int      NOT NULL,
	WarehouseName        varchar(255)      NULL,
	WarehouseDescription varchar(max)      NULL,
	CONSTRAINT pk_Warehouses PRIMARY KEY  ( Id ) 
 );
GO

---------------------------------------------------
---                   Defects                   ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Defects ( 
	Id                   int      NOT NULL,
	DefectDate           date  CONSTRAINT DF_Defects_DefectDate DEFAULT getdate()    NOT NULL,
	ReferenceNumber      varchar(100)      NULL,
	Remarks              varchar(max)      NULL,
	TransactionType      int      NULL,
	WarehouseId          int      NULL,
	CONSTRAINT pk_Defects PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.DEFECTS > IRYS_Dev.dbo.Defects' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Defects';;
GO

---------------------------------------------------
---                DefectDetails                ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.DefectDetails ( 
	Id                   int      NOT NULL,
	DefectId             int      NOT NULL,
	ItemCode             int      NOT NULL,
	Quantity             int  CONSTRAINT DF_DefectDetails_Quantity DEFAULT 0    NOT NULL,
	CONSTRAINT pk_DefectDetails PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.DEFECTSDET > IRYS_Dev.dbo.DefectDetails' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'DefectDetails';;
GO

---------------------------------------------------
---                   Orders                    ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.Orders ( 
	Id                   int      NOT NULL,
	CustomerId           int      NULL,
	InvoiceNumber        varchar(100)      NULL,
	EmployeeId           int      NULL,
	OrderDate            date  CONSTRAINT DF_Orders_OrderDate DEFAULT getdate()    NOT NULL,
	DeliveryDate         date  CONSTRAINT DF_Orders_DeliveryDate DEFAULT '1899-12-30'    NOT NULL,
	isPaid               bit  CONSTRAINT DF_Orders_isPaid DEFAULT 0    NOT NULL,
	DueDate              date  CONSTRAINT DF_Orders_DueDate DEFAULT getdate()    NOT NULL,
	TermCode             int  CONSTRAINT DF_Orders_TermCode DEFAULT 4    NULL,
	Total                float  CONSTRAINT DF_Orders_Total DEFAULT 0    NOT NULL,
	DeliveredBy          int      NULL,
	PackedBy             int      NULL,
	OrderStatusId        int  CONSTRAINT DF_Orders_OrderStatusId DEFAULT 0    NOT NULL,
	Balance              float  CONSTRAINT DF_Orders_Balance DEFAULT 0    NOT NULL,
	Salesman             int      NULL,
	[User]               int      NULL,
	Returns              float  CONSTRAINT DF_Orders_Returns DEFAULT 0    NOT NULL,
	AmountPaid           float  CONSTRAINT DF_Orders_AmountPaid DEFAULT 0    NOT NULL,
	BIR                  bit  CONSTRAINT DF_Orders_BIR DEFAULT 0    NOT NULL,
	ShipperId            int      NULL,
	Adjust               float  CONSTRAINT DF_Orders_Adjust DEFAULT 0    NOT NULL,
	OrderProfit          float  CONSTRAINT DF_Orders_OrderProfit DEFAULT 0    NOT NULL,
	OrderFree            float  CONSTRAINT DF_Orders_OrderFree DEFAULT 0    NOT NULL,
	SalesOrderId         int      NULL,
	CreditsApplied       float  CONSTRAINT DF_Orders_CreditsApplied DEFAULT 0    NOT NULL,
	Consign              bit  CONSTRAINT DF_Orders_Consign DEFAULT 0    NOT NULL,
	DRNumber             varchar(10)      NULL,
	Commission           float  CONSTRAINT DF_Orders_Commission DEFAULT 0    NOT NULL,
	SINumber             varchar(30)      NULL,
	SIDate               date  CONSTRAINT DF_Orders_SIDate DEFAULT '1899-12-30'    NOT NULL,
	SICustomer           varchar(15)      NULL,
	SITerms              varchar(7)      NULL,
	SIBalance            float  CONSTRAINT DF_Orders_SIBalance DEFAULT 0    NOT NULL,
	SINetAmount          float  CONSTRAINT DF_Orders_SINetAmount DEFAULT 0    NOT NULL,
	SIAgent              varchar(12)      NULL,
	PONumber             varchar(100)      NULL,
	BeginningBalance     float  CONSTRAINT DF_Orders_BeginningBalance DEFAULT 0    NOT NULL,
	ReferenceNumber      varchar(100)      NULL,
	WTax                 float  CONSTRAINT DF_Orders_WTax DEFAULT 0    NOT NULL,
	Cancelled            bit  CONSTRAINT DF_Orders_Cancelled DEFAULT 0    NOT NULL,
	WarehouseId          int      NULL,
	Rebate               float  CONSTRAINT DF_Orders_Rebate DEFAULT 0    NOT NULL,
	CommissionPaid       bit  CONSTRAINT DF_Orders_CommissionPaid DEFAULT 0    NOT NULL,
	CommissionDate       date  CONSTRAINT DF_Orders_CommissionDate DEFAULT '1899-12-30'    NOT NULL,
	NoCommission         bit  CONSTRAINT DF_Orders_NoCommission DEFAULT 0    NOT NULL,
	CommissionAmount     float  CONSTRAINT DF_Orders_CommissionAmount DEFAULT 0    NOT NULL,
	CommissionFixed      float  CONSTRAINT DF_Orders_CommissionFixed DEFAULT 0    NOT NULL,
	Collector            int      NULL,
	isCommissionComputable bit      NULL,
	DatePaid             date  CONSTRAINT DF_Orders_DatePaid DEFAULT '1899-12-30'    NOT NULL,
	CollectedAmount      float  CONSTRAINT DF_Orders_CollectedAmount DEFAULT 0    NOT NULL,
	isHeavy              bit  CONSTRAINT DF_Orders_isHeavy DEFAULT 0    NOT NULL,
	ERR                  int      NULL,
	PaymentModeId        int      NULL,
	Driver               int      NULL,
	Helper               int      NULL,
	Truck                varchar(15)      NULL,
	Notes                varchar(max)      NULL,
	PackList             varchar(max)      NULL,
	Remarks              varchar(max)      NULL,
	AdjustmentRemarks    varchar(max)      NULL,
	CONSTRAINT pk_Orders PRIMARY KEY  ( Id ) 
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.ORDERS > IRYS_Dev.dbo.Orders

---

Altered Cols:
ORDERS.STATUS > Orders.OrderStatusId
ORDERS.PMODE > Orders.PaymentModeId		// do not transfer, init as NULL

Dropped Cols:
ORDERS.CUSCODE
ORDERS.SMCODE
ORDERS.TERMS
ORDERS.NTRANS
ORDERS.PYMNT_TYPE
ORDERS.COMMREM
ORDERS.COMM_AMT_P
ORDERS.COLL_PERC
ORDERS.TMPCOLL

Remarks:
- ORDERS.USERS > Orders.Users will all be turned into NULL
- ORDERS.WHOUSEID > Orders.WarehouseId will all be NULL' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Orders';;
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'Should not allow NULL inserts in the Application Layer' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Orders', @level2type=N'COLUMN',@level2name=N'CustomerId';
GO

---------------------------------------------------
---              CollectionDetails              ---
---------------------------------------------------
CREATE  TABLE IRYS_Dev.dbo.CollectionDetails ( 
	CollectionId         int      NULL,
	OrderId              int      NULL
 );
GO

execute [IRYS_Dev].sys.sp_addextendedproperty  @name=N'MS_Description', @value=N'LEGACY.dbo.COLLDETAILS > IRYS_Dev.dbo.CollectionDetails' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'CollectionDetails';;
GO

ALTER TABLE IRYS_Dev.dbo.Accounts ADD CONSTRAINT fk_accounts_accountclasses FOREIGN KEY ( AccountClass ) REFERENCES IRYS_Dev.dbo.AccountClasses( AccountClass );
GO

ALTER TABLE IRYS_Dev.dbo.Accounts ADD CONSTRAINT fk_accounts_accounts FOREIGN KEY ( SubAccountOf ) REFERENCES IRYS_Dev.dbo.Accounts( Id );
GO

ALTER TABLE IRYS_Dev.dbo.BillDetails ADD CONSTRAINT fk_billdetails_bills FOREIGN KEY ( BillId ) REFERENCES IRYS_Dev.dbo.Bills( Id );
GO

ALTER TABLE IRYS_Dev.dbo.BillDetails ADD CONSTRAINT fk_billdetails_accounts FOREIGN KEY ( AccountId ) REFERENCES IRYS_Dev.dbo.Accounts( Id );
GO

ALTER TABLE IRYS_Dev.dbo.BillOfMaterials ADD CONSTRAINT fk_billofmaterials_items FOREIGN KEY ( ItemCode ) REFERENCES IRYS_Dev.dbo.Items( ItemCode );
GO

ALTER TABLE IRYS_Dev.dbo.BillPaymentDetails ADD CONSTRAINT fk_billpaymentdetails_payments FOREIGN KEY ( PaymentId ) REFERENCES IRYS_Dev.dbo.Payments( Id );
GO

ALTER TABLE IRYS_Dev.dbo.BillPaymentDetails ADD CONSTRAINT fk_billpaymentdetails_bills FOREIGN KEY ( BillId ) REFERENCES IRYS_Dev.dbo.Bills( Id );
GO

ALTER TABLE IRYS_Dev.dbo.BillPayments ADD CONSTRAINT fk_billpayments_payments FOREIGN KEY ( PaymentId ) REFERENCES IRYS_Dev.dbo.Payments( Id );
GO

ALTER TABLE IRYS_Dev.dbo.BillPayments ADD CONSTRAINT fk_billpayments_vendors FOREIGN KEY ( VendorId ) REFERENCES IRYS_Dev.dbo.Vendors( Id );
GO

ALTER TABLE IRYS_Dev.dbo.BillPayments ADD CONSTRAINT fk_billpayments_paymentmodes FOREIGN KEY ( PaymentModeId ) REFERENCES IRYS_Dev.dbo.PaymentModes( Id );
GO

ALTER TABLE IRYS_Dev.dbo.BillPayments ADD CONSTRAINT fk_billpayments_billstatus FOREIGN KEY ( BillStatusId ) REFERENCES IRYS_Dev.dbo.BillStatus( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Bills ADD CONSTRAINT fk_bills_vendors FOREIGN KEY ( VendorId ) REFERENCES IRYS_Dev.dbo.Vendors( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Bills ADD CONSTRAINT fk_bills_billstatus FOREIGN KEY ( BillStatusId ) REFERENCES IRYS_Dev.dbo.BillStatus( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Bills ADD CONSTRAINT fk_bills_terms FOREIGN KEY ( TermCode ) REFERENCES IRYS_Dev.dbo.Terms( TermCode );
GO

ALTER TABLE IRYS_Dev.dbo.CollectionDetails ADD CONSTRAINT fk_collectiondetails_collections FOREIGN KEY ( CollectionId ) REFERENCES IRYS_Dev.dbo.Collections( Id );
GO

ALTER TABLE IRYS_Dev.dbo.CollectionDetails ADD CONSTRAINT fk_collectiondetails_orders FOREIGN KEY ( OrderId ) REFERENCES IRYS_Dev.dbo.Orders( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Collections ADD CONSTRAINT fk_collections_employees FOREIGN KEY ( EmployeeId ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Collections ADD CONSTRAINT fk_collectionsSalesman_employees FOREIGN KEY ( Salesman ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Customers ADD CONSTRAINT fk_customers_employee FOREIGN KEY ( EmployeeId ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Customers ADD CONSTRAINT fk_customers_customerarea FOREIGN KEY ( AreaCode ) REFERENCES IRYS_Dev.dbo.CustomerArea( AreaCode );
GO

ALTER TABLE IRYS_Dev.dbo.DefectDetails ADD CONSTRAINT fk_defectdetails_defects FOREIGN KEY ( DefectId ) REFERENCES IRYS_Dev.dbo.Defects( Id );
GO

ALTER TABLE IRYS_Dev.dbo.DefectDetails ADD CONSTRAINT fk_defectdetails_items FOREIGN KEY ( ItemCode ) REFERENCES IRYS_Dev.dbo.Items( ItemCode );
GO

ALTER TABLE IRYS_Dev.dbo.Defects ADD CONSTRAINT fk_defects_warehouses FOREIGN KEY ( WarehouseId ) REFERENCES IRYS_Dev.dbo.Warehouses( Id );
GO

ALTER TABLE IRYS_Dev.dbo.ItemSuppliers ADD CONSTRAINT fk_itemsuppliers_suppliers FOREIGN KEY ( SupplierId ) REFERENCES IRYS_Dev.dbo.Suppliers( Id );
GO

ALTER TABLE IRYS_Dev.dbo.ItemSuppliers ADD CONSTRAINT fk_itemsuppliers_items FOREIGN KEY ( ItemCode ) REFERENCES IRYS_Dev.dbo.Items( ItemCode );
GO

ALTER TABLE IRYS_Dev.dbo.Items ADD CONSTRAINT fk_items_itemgroups FOREIGN KEY ( ItemGroupId ) REFERENCES IRYS_Dev.dbo.ItemGroups( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Items ADD CONSTRAINT fk_items_units FOREIGN KEY ( UnitCode ) REFERENCES IRYS_Dev.dbo.Units( UnitCode );
GO

ALTER TABLE IRYS_Dev.dbo.Items ADD CONSTRAINT fk_items_categories FOREIGN KEY ( CategoryId ) REFERENCES IRYS_Dev.dbo.Categories( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Items ADD CONSTRAINT fk_items_suppliers FOREIGN KEY ( SupplierId ) REFERENCES IRYS_Dev.dbo.Suppliers( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Items ADD CONSTRAINT fk_items_itemlocations FOREIGN KEY ( ItemLocationId ) REFERENCES IRYS_Dev.dbo.ItemLocations( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Items ADD CONSTRAINT fk_itemsptermcode_terms FOREIGN KEY ( PTermCode ) REFERENCES IRYS_Dev.dbo.Terms( TermCode );
GO

ALTER TABLE IRYS_Dev.dbo.Items ADD CONSTRAINT fk_items_terms FOREIGN KEY ( TermCode ) REFERENCES IRYS_Dev.dbo.Terms( TermCode );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_orders_customers FOREIGN KEY ( CustomerId ) REFERENCES IRYS_Dev.dbo.Customers( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_orders_employees FOREIGN KEY ( EmployeeId ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_orders_terms FOREIGN KEY ( TermCode ) REFERENCES IRYS_Dev.dbo.Terms( TermCode );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_orders_orderstatuses FOREIGN KEY ( OrderStatusId ) REFERENCES IRYS_Dev.dbo.OrderStatuses( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_ordersSalesman_employees FOREIGN KEY ( Salesman ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_orders_shippers FOREIGN KEY ( ShipperId ) REFERENCES IRYS_Dev.dbo.Shippers( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_orders_salesorders FOREIGN KEY ( SalesOrderId ) REFERENCES IRYS_Dev.dbo.SalesOrders( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_orders_warehouses FOREIGN KEY ( WarehouseId ) REFERENCES IRYS_Dev.dbo.Warehouses( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_ordersCollector_employees FOREIGN KEY ( Collector ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_ordersERR_employees FOREIGN KEY ( ERR ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_orders_paymentmodes FOREIGN KEY ( PaymentModeId ) REFERENCES IRYS_Dev.dbo.PaymentModes( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_ordersDriver_employees FOREIGN KEY ( Driver ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_ordersHelper_employees FOREIGN KEY ( Helper ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Orders ADD CONSTRAINT fk_orders_users FOREIGN KEY ( [User] ) REFERENCES IRYS_Dev.dbo.Users( UserId );
GO

ALTER TABLE IRYS_Dev.dbo.Payments ADD CONSTRAINT fk_payments_customers FOREIGN KEY ( CustomerId ) REFERENCES IRYS_Dev.dbo.Customers( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Payments ADD CONSTRAINT fk_payments_paymentmodes FOREIGN KEY ( PaymentModeId ) REFERENCES IRYS_Dev.dbo.PaymentModes( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Payments ADD CONSTRAINT fk_payments_paystatuses FOREIGN KEY ( PayStatusId ) REFERENCES IRYS_Dev.dbo.PayStatuses( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Payments ADD CONSTRAINT fk_paymentsCollector_employees FOREIGN KEY ( Collector ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.Payments ADD CONSTRAINT fk_payments_employees FOREIGN KEY ( EmployeeId ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SalesOrderDetails ADD CONSTRAINT fk_salesorderdetails_items FOREIGN KEY ( ItemCode ) REFERENCES IRYS_Dev.dbo.Items( ItemCode );
GO

ALTER TABLE IRYS_Dev.dbo.SalesOrderDetails ADD CONSTRAINT fk_salesorderdetails_salesorders FOREIGN KEY ( SalesOrderId ) REFERENCES IRYS_Dev.dbo.SalesOrders( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SalesOrders ADD CONSTRAINT fk_salesorders_employees FOREIGN KEY ( EmployeeId ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SalesOrders ADD CONSTRAINT fk_salesordersSalesman_employees FOREIGN KEY ( Salesman ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SalesOrders ADD CONSTRAINT fk_salesorders_customers FOREIGN KEY ( CustomerId ) REFERENCES IRYS_Dev.dbo.Customers( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SalesOrders ADD CONSTRAINT fk_salesorders_users FOREIGN KEY ( [User] ) REFERENCES IRYS_Dev.dbo.Users( UserId );
GO

ALTER TABLE IRYS_Dev.dbo.SalesOrders ADD CONSTRAINT fk_salesorders_terms FOREIGN KEY ( TermCode ) REFERENCES IRYS_Dev.dbo.Terms( TermCode );
GO

ALTER TABLE IRYS_Dev.dbo.SalesOrders ADD CONSTRAINT fk_salesorders_shippers FOREIGN KEY ( ShipperId ) REFERENCES IRYS_Dev.dbo.Shippers( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SalesOrders ADD CONSTRAINT fk_salesorders_orderstatuses FOREIGN KEY ( OrderStatusId ) REFERENCES IRYS_Dev.dbo.OrderStatuses( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SupplierPayments ADD CONSTRAINT fk_supplierpayments_paymentmodes FOREIGN KEY ( PaymentModeId ) REFERENCES IRYS_Dev.dbo.PaymentModes( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SupplierPayments ADD CONSTRAINT fk_supplierpayments_paystatuses FOREIGN KEY ( PayStatusId ) REFERENCES IRYS_Dev.dbo.PayStatuses( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SupplierPayments ADD CONSTRAINT fk_supplierpayments_employees FOREIGN KEY ( EmployeeId ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

ALTER TABLE IRYS_Dev.dbo.SupplierPayments ADD CONSTRAINT fk_supplierpayments_suppliers FOREIGN KEY ( SupplierId ) REFERENCES IRYS_Dev.dbo.Suppliers( Id );
GO

ALTER TABLE IRYS_Dev.dbo.TempSalesOrders ADD CONSTRAINT fk_tempsalesorders_salesorders FOREIGN KEY ( SalesOrderId ) REFERENCES IRYS_Dev.dbo.SalesOrders( Id );
GO

ALTER TABLE IRYS_Dev.dbo.TempSalesOrders ADD CONSTRAINT fk_tempsalesorders_customers FOREIGN KEY ( CustomerId ) REFERENCES IRYS_Dev.dbo.Customers( Id );
GO

ALTER TABLE IRYS_Dev.dbo.TempSalesOrders ADD CONSTRAINT fk_tempsalesorders FOREIGN KEY ( OrderStatusId ) REFERENCES IRYS_Dev.dbo.OrderStatuses( Id );
GO

ALTER TABLE IRYS_Dev.dbo.TempSalesOrders ADD CONSTRAINT fk_tempsalesorders_terms FOREIGN KEY ( TermCode ) REFERENCES IRYS_Dev.dbo.Terms( TermCode );
GO

ALTER TABLE IRYS_Dev.dbo.Users ADD CONSTRAINT fk_users_employees FOREIGN KEY ( EmployeeId ) REFERENCES IRYS_Dev.dbo.Employees( Id );
GO

