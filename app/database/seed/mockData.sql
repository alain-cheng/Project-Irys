USE IRYS_Dev;
GO

---------------------------------------------------
---                CustomerArea                 ---
---------------------------------------------------
SET IDENTITY_INSERT dbo.CustomerArea ON;
GO
INSERT INTO dbo.CustomerArea
(
    AreaCode,
    AreaName
)
VALUES
    (1, 'Metro Manila'),
    (2, 'Rizal'),
    (3, 'Laguna'),
    (4, 'Cavite'),
    (5, 'Bulacan');
GO
SET IDENTITY_INSERT dbo.CustomerArea OFF;
GO

---------------------------------------------------
---                  Employees                  ---
---------------------------------------------------
SET IDENTITY_INSERT dbo.Employees ON;
GO
INSERT INTO dbo.Employees
(
    Id,
    FirstName,
    MiddleName,
    LastName,
    NickName,
    Position,
    Address,
    City,
    Province,
    ZipCode,
    Phone,
    BirthDate,
    Sex,
    DateHired,
    SSS,
    GroupId,
    AgentType
)
VALUES
    (
        1,
        'Miguel',
        'Santos',
        'Reyes',
        'Mig',
        'Sales Representative',
        '12 Sampaguita St.',
        'Marikina',
        'Metro Manila',
        '1800',
        '09170000001',
        '1990-03-15',
        'M',
        '2021-06-01',
        NULL,
        1,
        1
    ),
    (
        2,
        'Andrea',
        'Cruz',
        'Mendoza',
        'Andi',
        'Sales Representative',
        '45 Acacia Ave.',
        'Pasig',
        'Metro Manila',
        '1600',
        '09170000002',
        '1992-08-22',
        'F',
        '2022-01-10',
        NULL,
        1,
        1
    ),
    (
        3,
        'Daniel',
        NULL,
        'Navarro',
        'Dan',
        'Account Manager',
        '78 Narra St.',
        'Antipolo',
        'Rizal',
        '1870',
        '09170000003',
        '1988-11-07',
        'M',
        '2020-09-14',
        NULL,
        2,
        2
    ),
    (
        4,
        'Sofia',
        'Garcia',
        'Lim',
        NULL,
        'Sales Coordinator',
        '21 Molave St.',
        'Santa Rosa',
        'Laguna',
        '4026',
        '09170000004',
        '1995-01-30',
        'F',
        '2023-04-03',
        NULL,
        2,
        1
    ),
    (
        5,
        'Joshua',
        NULL,
        'Torres',
        'Josh',
        'Sales Supervisor',
        '9 Mahogany Rd.',
        'Dasmarinas',
        'Cavite',
        '4114',
        '09170000005',
        '1985-12-18',
        'M',
        '2019-02-18',
        NULL,
        1,
        2
    );
GO
SET IDENTITY_INSERT dbo.Employees OFF;
GO

---------------------------------------------------
---                  Customers                  ---
---------------------------------------------------
SET IDENTITY_INSERT dbo.Customers ON;
GO
INSERT INTO dbo.Customers
(
    Id,
    CompanyName,
    ContactName,
    ContactTitle,
    Address,
    City,
    Province,
    ZipCode,
    Phone,
    Fax,
    Alarm,
    EmployeeId,
    PriceLvl,
    CreditLimit,
    Balance,
    Credit,
    InvBalance,
    TIN,
    AreaCode,
    CustomerCode,
    CustomerArea,
    CustomerAgent,
    AgentName,
    CustomerType,
    StartDate,
    SmCode,
    Term,
    TermCode,
    PType,
    Remarks
)
VALUES
    (
        1001,
        'Northstar Hardware Trading',
        'Paolo Rivera',
        'Purchasing Manager',
        '101 Commerce St.',
        'Marikina',
        'Metro Manila',
        '1800',
        '09180000001',
        NULL,
        0,
        1,
        1,
        100000.00,
        25000.00,
        0.00,
        7500.00,
        NULL,
        1,
        'CUS1001',
        'Metro',
        'REP01',
        'Miguel Reyes',
        'WHOLESALE',
        '2022-01-15',
        'MR',
        'D',
        '30',
        'C',
        'Sample customer for development testing.'
    ),
    (
        1002,
        'Silverline Office Supply',
        'Maria Santos',
        'Owner',
        '22 Rizal Ave.',
        'Antipolo',
        'Rizal',
        '1870',
        '09180000002',
        NULL,
        1,
        2,
        2,
        75000.00,
        12000.00,
        5000.00,
        3000.00,
        NULL,
        2,
        'CUS1002',
        'Rizal',
        'REP02',
        'Andrea Mendoza',
        'RETAIL',
        '2023-03-20',
        'AM',
        'C',
        '15',
        'C',
        'Preferred customer.'
    ),
    (
        1003,
        'Greenfield Food Distribution',
        'Carlo Mendoza',
        'Purchasing Officer',
        '88 Laguna Industrial Rd.',
        'Santa Rosa',
        'Laguna',
        '4026',
        '09180000003',
        NULL,
        0,
        3,
        1,
        150000.00,
        45000.00,
        0.00,
        12500.00,
        NULL,
        3,
        'CUS1003',
        'Laguna',
        'REP03',
        'Daniel Navarro',
        'WHOLESALE',
        '2021-11-08',
        'DN',
        'D',
        '30',
        'C',
        NULL
    ),
    (
        1004,
        'Harborview Equipment Co.',
        'Elena Cruz',
        'Operations Manager',
        '14 Portside Blvd.',
        'Bacoor',
        'Cavite',
        '4102',
        '09180000004',
        NULL,
        0,
        4,
        3,
        200000.00,
        10000.00,
        15000.00,
        5000.00,
        NULL,
        4,
        'CUS1004',
        'Cavite',
        'REP04',
        'Sofia Lim',
        'WHOLESALE',
        '2024-02-12',
        'SL',
        'D',
        '45',
        'C',
        'Credit account.'
    ),
    (
        1005,
        'Blue Oak General Store',
        'Nina Flores',
        'Manager',
        '57 Market Road',
        'Malolos',
        'Bulacan',
        '3000',
        '09180000005',
        NULL,
        0,
        5,
        1,
        50000.00,
        0.00,
        0.00,
        0.00,
        NULL,
        5,
        'CUS1005',
        'Bulacan',
        NULL,
        NULL,
        'RETAIL',
        '2024-07-01',
        NULL,
        'C',
        '15',
        'C',
        'No assigned customer agent yet.'
    ),
    (
        1006,
        'Pinecrest Builders Supply',
        'Victor Tan',
        'Purchasing Officer',
        '31 Builder Lane',
        'Quezon City',
        'Metro Manila',
        '1100',
        '09180000006',
        NULL,
        0,
        NULL,
        2,
        90000.00,
        18000.00,
        0.00,
        2500.00,
        NULL,
        NULL,
        'CUS1006',
        NULL,
        NULL,
        NULL,
        'WHOLESALE',
        '2025-01-06',
        NULL,
        'D',
        '30',
        'C',
        'Intentionally contains nullable employee and area references for testing.'
    ),
    (
        1007,
        'Cedar Point Supplies',
        'Rafael Diaz',
        'Owner',
        '19 Cedar Street',
        'Pasig',
        'Metro Manila',
        '1600',
        '09180000007',
        NULL,
        0,
        3,
        1,
        60000.00,
        5000.00,
        0.00,
        1500.00,
        NULL,
        1,
        'CUS1007',
        'Metro',
        'REP03',
        'Daniel Navarro',
        'RETAIL',
        '2025-05-19',
        'DN',
        'C',
        '15',
        'C',
        NULL
    ),
    (
        1008,
        'Summit Industrial Parts',
        'Angela Reyes',
        'Purchasing Manager',
        '63 Industry Ave.',
        'Meycauayan',
        'Bulacan',
        '3020',
        '09180000008',
        NULL,
        1,
        5,
        2,
        125000.00,
        32000.00,
        3000.00,
        8500.00,
        NULL,
        5,
        'CUS1008',
        'Bulacan',
        'REP05',
        'Joshua Torres',
        'WHOLESALE',
        '2023-09-11',
        'JT',
        'D',
        '30',
        'C',
        'Alarm enabled for testing.'
    );
GO
SET IDENTITY_INSERT dbo.Customers OFF;
GO

---------------------------------------------------
---                    Units                    ---
---------------------------------------------------
SET IDENTITY_INSERT dbo.Units ON;
GO
INSERT INTO dbo.Units
(
    UnitCode,
    UnitName
)
VALUES
    (1, 'Unit'),
    (2, 'Piece'),
    (3, 'Pair'),
    (4, 'Set'),
    (5, 'Box'),
    (6, 'Pack'),
    (7, 'Bundle'),
    (8, 'Roll'),
    (9, 'Bag'),
    (10, 'Sack'),
    (11, 'Bottle'),
    (12, 'Jar'),
    (13, 'Can'),
    (14, 'Pail'),
    (15, 'Drum'),
    (16, 'Kilogram'),
    (17, 'Gram'),
    (18, 'Liter'),
    (19, 'Milliliter'),
    (20, 'Meter'),
    (21, 'Square Meter'),
    (22, 'Cubic Meter');
GO
SET IDENTITY_INSERT dbo.Units OFF;
GO

---------------------------------------------------
---                 Categories                  ---
---------------------------------------------------
SET IDENTITY_INSERT dbo.Categories ON;
GO
INSERT INTO dbo.Categories
(
    Id,
    CategoryName,
    Description
)
VALUES
    (1, 'Hardware Supplies', 'General hardware, fasteners, hinges, locks, and fittings.'),
    (2, 'Electrical', 'Wires, cables, switches, outlets, breakers, and electrical accessories.'),
    (3, 'Furniture', 'Tables, chairs, cabinets, shelves, and other furnishings.'),
    (4, 'Construction', 'Cement, sand, gravel, reinforcing bars, and other building materials.'),
    (5, 'Plumbing', 'Pipes, valves, faucets, drains, and plumbing fittings.'),
    (6, 'Paints and Coatings', 'Paints, primers, stains, varnishes, and protective coatings.'),
    (7, 'Hand Tools', 'Hammers, screwdrivers, pliers, wrenches, and manual cutting tools.'),
    (8, 'Power Tools', 'Electric drills, grinders, saws, sanders, and their accessories.'),
    (9, 'Safety Equipment', 'Gloves, helmets, safety glasses, masks, and protective clothing.'),
    (10, 'Adhesives and Sealants', 'Glues, epoxies, silicone sealants, tapes, and bonding products.'),
    (11, 'Cleaning Supplies', 'Detergents, brushes, mops, solvents, and maintenance supplies.'),
    (12, 'Garden Supplies', 'Gardening tools, hoses, pots, fertilizers, and outdoor supplies.');
GO
SET IDENTITY_INSERT dbo.Categories OFF;
GO

---------------------------------------------------
---                  Suppliers                  ---
---------------------------------------------------
SET IDENTITY_INSERT dbo.Suppliers ON;
GO
INSERT INTO dbo.Suppliers
(
    Id,
    SupplierName,
    ContactName,
    ContactTitle,
    Address,
    City,
    Province,
    ZipCode,
    Phone,
    Fax,
    Balance,
    PurchaseBalance,
    Credit,
    TIN
)
VALUES
    (
        1,
        'Ironbridge Hardware Wholesale',
        'Gabriel Santos',
        'Sales Manager',
        '18 Foundry Street',
        'Marikina',
        'Metro Manila',
        '1800',
        '09200000001',
        '02-8000-0001',
        25000.00,
        10000.00,
        0.00,
        '000-100-001-000'
    ),
    (
        2,
        'Brightpath Electrical Trading',
        'Isabel Cruz',
        'Account Executive',
        '42 Circuit Avenue',
        'Pasig',
        'Metro Manila',
        '1600',
        '09200000002',
        NULL,
        18000.00,
        7500.00,
        1500.00,
        '000-100-002-000'
    ),
    (
        3,
        'Timberline Furniture Supply',
        'Marco Reyes',
        'Owner',
        '7 Workshop Road',
        'Antipolo',
        'Rizal',
        '1870',
        '09200000003',
        NULL,
        0.00,
        0.00,
        0.00,
        '000-100-003-000'
    ),
    (
        4,
        'Stonecrest Building Materials',
        'Patricia Mendoza',
        'Sales Supervisor',
        '65 Quarry Lane',
        'Bacoor',
        'Cavite',
        '4102',
        '09200000004',
        '046-800-0004',
        60000.00,
        35000.00,
        5000.00,
        '000-100-004-000'
    ),
    (
        5,
        'Clearflow Plumbing Distributors',
        'Luis Navarro',
        'Account Manager',
        '23 Pipeline Street',
        'Santa Rosa',
        'Laguna',
        '4026',
        '09200000005',
        NULL,
        12000.00,
        4000.00,
        0.00,
        '000-100-005-000'
    ),
    (
        6,
        'Colorhaven Paint and Chemical Supply',
        'Camille Lim',
        'Sales Representative',
        '91 Palette Avenue',
        'Meycauayan',
        'Bulacan',
        '3020',
        '09200000006',
        NULL,
        0.00,
        0.00,
        2500.00,
        '000-100-006-000'
    ),
    (
        7,
        'Forgepoint Tools and Safety Supply',
        'Ramon Garcia',
        'Sales Manager',
        '34 Toolmaker Road',
        'Quezon City',
        'Metro Manila',
        '1100',
        '09200000007',
        '02-8000-0007',
        32000.00,
        15000.00,
        0.00,
        '000-100-007-000'
    ),
    (
        8,
        'Meadowgate Garden and Cleaning Supplies',
        NULL,
        NULL,
        '16 Garden Lane',
        'Malolos',
        'Bulacan',
        '3000',
        '09200000008',
        NULL,
        0.00,
        0.00,
        0.00,
        NULL
    );
GO
SET IDENTITY_INSERT dbo.Suppliers OFF;
GO

---------------------------------------------------
---                    Items                    ---
---------------------------------------------------
-- SDisc1-10, R1Disc1-10, R2Disc1-10, SPDisc1-10, and PDisc1-10
-- are omitted so their schema defaults keep them at zero.
-- All discount IDs remain "Net" while discount handling is being worked on.
-- ItemGroupId, ItemLocationId, PTermCode, and TermCode are NULL for now.
SET IDENTITY_INSERT dbo.Items ON;
GO
INSERT INTO dbo.Items
(
    ItemCode,
    ItemName,
    UnitsInStock,
    UnitCode,
    BasePrice,
    SDiscId,
    SellingPrice,
    R1Price,
    R1DiscId,
    R1SPrice,
    R2Price,
    R2DiscId,
    SPPrice,
    SPDiscId,
    PUnitPrice,
    PDiscId,
    PurchasePrice,
    RetailPrice,
    CategoryId,
    ReorderLevel,
    SupplierId,
    AverageCost,
    isReorderActive,
    isDiscontinued,
    Remarks
)
VALUES
    (
        1, 'Common Wire Nails 2 inch', 120, 16,
        85.00, 'Net', 85.00, 100.00, 'Net', 100.00, 95.00, 'Net', 80.00, 'Net',
        65.00, 'Net', 65.00, 100.00, 1, 20, 1, 65.00, 1, 0,
        'Sold by kilogram.'
    ),
    (
        2, 'Brass Padlock 40 mm', 48, 2,
        180.00, 'Net', 180.00, 220.00, 'Net', 220.00, 200.00, 'Net', 170.00, 'Net',
        135.00, 'Net', 135.00, 220.00, 1, 10, 1, 135.00, 1, 0,
        NULL
    ),
    (
        3, 'Copper THHN Wire 2.0 sq mm', 350, 20,
        28.00, 'Net', 28.00, 35.00, 'Net', 35.00, 32.00, 'Net', 26.00, 'Net',
        21.00, 'Net', 21.00, 35.00, 2, 100, 2, 21.00, 1, 0,
        'Sold by meter.'
    ),
    (
        4, 'Duplex Convenience Outlet', 8, 2,
        65.00, 'Net', 65.00, 85.00, 'Net', 85.00, 75.00, 'Net', 60.00, 'Net',
        45.00, 'Net', 45.00, 85.00, 2, 15, 2, 45.00, 1, 0,
        'Low-stock sample for reorder testing.'
    ),
    (
        5, 'Folding Utility Table 4 ft', 12, 1,
        1800.00, 'Net', 1800.00, 2200.00, 'Net', 2200.00, 2000.00, 'Net', 1700.00, 'Net',
        1400.00, 'Net', 1400.00, 2200.00, 3, 3, 3, 1400.00, 1, 0,
        NULL
    ),
    (
        6, 'Stackable Plastic Chair', 40, 1,
        320.00, 'Net', 320.00, 400.00, 'Net', 400.00, 360.00, 'Net', 300.00, 'Net',
        250.00, 'Net', 250.00, 400.00, 3, 10, 3, 250.00, 1, 0,
        NULL
    ),
    (
        7, 'Portland Cement 40 kg', 200, 10,
        250.00, 'Net', 250.00, 275.00, 'Net', 275.00, 265.00, 'Net', 240.00, 'Net',
        220.00, 'Net', 220.00, 275.00, 4, 50, 4, 220.00, 1, 0,
        'Sold per 40 kg sack.'
    ),
    (
        8, 'Washed Construction Sand', 15, 22,
        1200.00, 'Net', 1200.00, 1400.00, 'Net', 1400.00, 1300.00, 'Net', 1150.00, 'Net',
        950.00, 'Net', 950.00, 1400.00, 4, 5, 4, 950.00, 1, 0,
        'Sold by cubic meter.'
    ),
    (
        9, 'PVC Pipe 1/2 inch x 3 m', 75, 2,
        95.00, 'Net', 95.00, 120.00, 'Net', 120.00, 110.00, 'Net', 90.00, 'Net',
        70.00, 'Net', 70.00, 120.00, 5, 20, 5, 70.00, 1, 0,
        NULL
    ),
    (
        10, 'Brass Ball Valve 1/2 inch', 0, 2,
        160.00, 'Net', 160.00, 200.00, 'Net', 200.00, 180.00, 'Net', 150.00, 'Net',
        115.00, 'Net', 115.00, 200.00, 5, 10, 5, 115.00, 1, 0,
        'Out-of-stock sample for inventory testing.'
    ),
    (
        11, 'Interior Latex Paint White', 60, 18,
        180.00, 'Net', 180.00, 220.00, 'Net', 220.00, 200.00, 'Net', 170.00, 'Net',
        135.00, 'Net', 135.00, 220.00, 6, 15, 6, 135.00, 1, 0,
        'Sold by liter.'
    ),
    (
        12, 'Wood Varnish Clear 1 L', 6, 13,
        220.00, 'Net', 220.00, 280.00, 'Net', 280.00, 250.00, 'Net', 210.00, 'Net',
        165.00, 'Net', 165.00, 280.00, 6, 10, 6, 165.00, 1, 0,
        'Low-stock sample; sold per 1 L can.'
    ),
    (
        13, 'Claw Hammer 16 oz', 30, 2,
        280.00, 'Net', 280.00, 350.00, 'Net', 350.00, 320.00, 'Net', 260.00, 'Net',
        210.00, 'Net', 210.00, 350.00, 7, 8, 7, 210.00, 1, 0,
        NULL
    ),
    (
        14, 'Screwdriver Set 6 Pieces', 20, 4,
        240.00, 'Net', 240.00, 300.00, 'Net', 300.00, 275.00, 'Net', 225.00, 'Net',
        175.00, 'Net', 175.00, 300.00, 7, 5, 7, 175.00, 1, 0,
        NULL
    ),
    (
        15, 'Corded Impact Drill 650 W', 10, 1,
        2200.00, 'Net', 2200.00, 2700.00, 'Net', 2700.00, 2500.00, 'Net', 2100.00, 'Net',
        1750.00, 'Net', 1750.00, 2700.00, 8, 3, 7, 1750.00, 1, 0,
        NULL
    ),
    (
        16, 'Angle Grinder 4 inch', 2, 1,
        1800.00, 'Net', 1800.00, 2300.00, 'Net', 2300.00, 2100.00, 'Net', 1700.00, 'Net',
        1400.00, 'Net', 1400.00, 2300.00, 8, 3, 7, 1400.00, 1, 0,
        'Low-stock sample for reorder testing.'
    ),
    (
        17, 'Cotton Work Gloves', 100, 3,
        25.00, 'Net', 25.00, 35.00, 'Net', 35.00, 30.00, 'Net', 23.00, 'Net',
        18.00, 'Net', 18.00, 35.00, 9, 25, 7, 18.00, 1, 0,
        'Sold by pair.'
    ),
    (
        18, 'Safety Helmet Yellow', 0, 2,
        150.00, 'Net', 150.00, 190.00, 'Net', 190.00, 175.00, 'Net', 140.00, 'Net',
        110.00, 'Net', 110.00, 190.00, 9, 0, 7, 110.00, 0, 1,
        'Discontinued sample; automatic reorder disabled.'
    ),
    (
        19, 'Wood Glue 250 mL', 45, 11,
        65.00, 'Net', 65.00, 85.00, 'Net', 85.00, 75.00, 'Net', 60.00, 'Net',
        45.00, 'Net', 45.00, 85.00, 10, 12, 1, 45.00, 1, 0,
        'Sold per 250 mL bottle.'
    ),
    (
        20, 'PVC Solvent Cement 100 mL', 25, 12,
        55.00, 'Net', 55.00, 75.00, 'Net', 75.00, 65.00, 'Net', 50.00, 'Net',
        38.00, 'Net', 38.00, 75.00, 10, 8, 5, 38.00, 1, 0,
        'Sold per 100 mL jar.'
    ),
    (
        21, 'All-Purpose Cleaner 1 L', 36, 11,
        75.00, 'Net', 75.00, 100.00, 'Net', 100.00, 90.00, 'Net', 70.00, 'Net',
        55.00, 'Net', 55.00, 100.00, 11, 10, 8, 55.00, 1, 0,
        'Sold per 1 L bottle.'
    ),
    (
        22, 'Microfiber Cleaning Cloth 5 Pieces', 18, 6,
        90.00, 'Net', 90.00, 120.00, 'Net', 120.00, 105.00, 'Net', 85.00, 'Net',
        65.00, 'Net', 65.00, 120.00, 11, 5, 8, 65.00, 1, 0,
        'Sold per pack of five cloths.'
    ),
    (
        23, 'Garden Hose 1/2 inch x 20 m', 14, 8,
        650.00, 'Net', 650.00, 800.00, 'Net', 800.00, 725.00, 'Net', 620.00, 'Net',
        480.00, 'Net', 480.00, 800.00, 12, 4, 8, 480.00, 1, 0,
        'Sold per 20 m roll.'
    ),
    (
        24, 'Plastic Plant Pot 8 inch', 60, 2,
        35.00, 'Net', 35.00, 50.00, 'Net', 50.00, 42.00, 'Net', 32.00, 'Net',
        24.00, 'Net', 24.00, 50.00, 12, 15, 8, 24.00, 1, 0,
        NULL
    );
GO
SET IDENTITY_INSERT dbo.Items OFF;
GO

---------------------------------------------------
---               Order Statuses                ---
---------------------------------------------------
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

---------------------------------------------------
---                  SalesOrders                  ---
---------------------------------------------------
-- Terms, Shippers, and Users are not seeded yet, so those references stay NULL.
SET IDENTITY_INSERT dbo.SalesOrders ON;
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
VALUES
    (
        2001, 1001, '2026-10-01', 'Fully invoiced and paid hardware order.', 1, 5450.00,
        1, 'PO-2026-001', NULL, NULL, NULL, 1,
        NULL
    ),
    (
        2002, 1002, '2026-10-08', 'Fully invoiced furniture order with a partial payment.', 3, 6160.00,
        2, 'PO-2026-002', NULL, NULL, NULL, 2,
        NULL
    ),
    (
        2003, 1003, '2026-11-03', 'Open sales order awaiting invoicing.', 2, 1790.00,
        3, 'PO-2026-003', NULL, NULL, NULL, 3,
        NULL
    ),
    (
        2004, 1004, '2026-10-20', 'Fully invoiced tools order awaiting payment.', 3, 6240.00,
        4, 'PO-2026-004', NULL, NULL, NULL, 4,
        NULL
    ),
    (
        2005, 1005, '2026-10-15', 'Fully invoiced and paid supplies order.', 1, 1140.00,
        5, 'PO-2026-005', NULL, NULL, NULL, 5,
        NULL
    ),
    (
        2006, 1006, '2026-11-04', 'Partially invoiced construction order.', 2, 8350.00,
        NULL, 'PO-2026-006', NULL, NULL, NULL, NULL,
        'Sales order total is 8350.00; invoice total is 3700.00 for 10 sacks of cement and 1 cubic meter of sand. Remaining quantities are not invoiced.'
    ),
    (
        2007, 1007, '2026-10-18', 'Cancelled paint order; retained for cancellation testing.', 4, 2680.00,
        3, 'PO-2026-007', NULL, NULL, NULL, 3,
        NULL
    ),
    (
        2008, 1008, '2026-11-05', 'Unspecified-status sales order awaiting review.', 0, 3350.00,
        5, 'PO-2026-008', NULL, NULL, NULL, 5,
        NULL
    );
GO
SET IDENTITY_INSERT dbo.SalesOrders OFF;
GO

---------------------------------------------------
---               SalesOrderDetails               ---
---------------------------------------------------
-- Amount = Quantity * UnitPrice; each sales order total equals its detail amounts.
-- Invoiced records the quantity invoiced; closed or cancelled lines have isClosed = 1.
-- SDisc1-10 use their zero defaults; SDiscId stays Net.
SET IDENTITY_INSERT dbo.SalesOrderDetails ON;
GO
INSERT INTO dbo.SalesOrderDetails
(
    Id,
    SalesOrderId,
    Quantity,
    ItemCode,
    UnitPrice,
    Amount,
    Invoiced,
    isClosed,
    SDiscId
)
VALUES
    (
        1, 2001, 10, 1, 85.00, 850.00,
        10, 1, 'Net'
    ),
    (
        2, 2001, 10, 2, 180.00, 1800.00,
        10, 1, 'Net'
    ),
    (
        3, 2001, 100, 3, 28.00, 2800.00,
        100, 1, 'Net'
    ),
    (
        4, 2002, 2, 5, 1800.00, 3600.00,
        2, 1, 'Net'
    ),
    (
        5, 2002, 8, 6, 320.00, 2560.00,
        8, 1, 'Net'
    ),
    (
        6, 2003, 12, 21, 75.00, 900.00,
        0, 0, 'Net'
    ),
    (
        7, 2003, 6, 22, 90.00, 540.00,
        0, 0, 'Net'
    ),
    (
        8, 2003, 10, 24, 35.00, 350.00,
        0, 0, 'Net'
    ),
    (
        9, 2004, 2, 15, 2200.00, 4400.00,
        2, 1, 'Net'
    ),
    (
        10, 2004, 4, 13, 280.00, 1120.00,
        4, 1, 'Net'
    ),
    (
        11, 2004, 3, 14, 240.00, 720.00,
        3, 1, 'Net'
    ),
    (
        12, 2005, 5, 19, 65.00, 325.00,
        5, 1, 'Net'
    ),
    (
        13, 2005, 5, 20, 55.00, 275.00,
        5, 1, 'Net'
    ),
    (
        14, 2005, 3, 2, 180.00, 540.00,
        3, 1, 'Net'
    ),
    (
        15, 2006, 20, 7, 250.00, 5000.00,
        10, 0, 'Net'
    ),
    (
        16, 2006, 2, 8, 1200.00, 2400.00,
        1, 0, 'Net'
    ),
    (
        17, 2006, 10, 9, 95.00, 950.00,
        0, 0, 'Net'
    ),
    (
        18, 2007, 4, 12, 220.00, 880.00,
        0, 1, 'Net'
    ),
    (
        19, 2007, 10, 11, 180.00, 1800.00,
        0, 1, 'Net'
    ),
    (
        20, 2008, 1, 16, 1800.00, 1800.00,
        0, 0, 'Net'
    ),
    (
        21, 2008, 2, 23, 650.00, 1300.00,
        0, 0, 'Net'
    ),
    (
        22, 2008, 10, 17, 25.00, 250.00,
        0, 0, 'Net'
    );
GO
SET IDENTITY_INSERT dbo.SalesOrderDetails OFF;
GO

---------------------------------------------------
---                    Orders                     ---
---------------------------------------------------
-- Linked invoices include paid, partially paid, unpaid, partial-invoice, and cancelled samples.
-- Order 3005 invoices only part of sales order 2006; its total is therefore lower.
-- Cancelled order 3006 retains its original total but has no collectible balance.
-- TermCode is explicitly NULL to avoid its default of 4 referencing an unseeded Terms row.
-- PaymentModes, Terms, Shippers, Warehouses, and Users are not seeded yet.
SET IDENTITY_INSERT dbo.Orders ON;
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
    OrderStatusId,
    Balance,
    Salesman,
    [User],
    AmountPaid,
    ShipperId,
    SalesOrderId,
    DRNumber,
    SINumber,
    SIDate,
    PONumber,
    Cancelled,
    WarehouseId,
    DatePaid,
    CollectedAmount,
    PaymentModeId,
    Notes,
    Remarks
)
VALUES
    (
        3001, 1001, 'INV-2026-001', 1, '2026-10-01', '2026-10-02',
        1, '2026-10-31', NULL, 5450.00, 1, 0.00,
        1, NULL, 5450.00, NULL, 2001, 'DR260001',
        'INV-2026-001', '2026-10-01', 'PO-2026-001', 0, NULL, '2026-10-03',
        5450.00, NULL, NULL, 'Fully invoiced and paid hardware order.'
    ),
    (
        3002, 1002, 'INV-2026-002', 2, '2026-10-08', '2026-10-09',
        0, '2026-11-07', NULL, 6160.00, 3, 4160.00,
        2, NULL, 2000.00, NULL, 2002, 'DR260002',
        'INV-2026-002', '2026-10-08', 'PO-2026-002', 0, NULL, '1899-12-30',
        2000.00, NULL, NULL, 'Fully invoiced furniture order with a partial payment.'
    ),
    (
        3003, 1004, 'INV-2026-003', 4, '2026-10-20', '2026-10-21',
        0, '2026-11-19', NULL, 6240.00, 3, 6240.00,
        4, NULL, 0.00, NULL, 2004, 'DR260003',
        'INV-2026-003', '2026-10-20', 'PO-2026-004', 0, NULL, '1899-12-30',
        0.00, NULL, NULL, 'Fully invoiced tools order awaiting payment.'
    ),
    (
        3004, 1005, 'INV-2026-004', 5, '2026-10-15', '2026-10-16',
        1, '2026-11-14', NULL, 1140.00, 1, 0.00,
        5, NULL, 1140.00, NULL, 2005, 'DR260004',
        'INV-2026-004', '2026-10-15', 'PO-2026-005', 0, NULL, '2026-10-17',
        1140.00, NULL, NULL, 'Fully invoiced and paid supplies order.'
    ),
    (
        3005, 1006, 'INV-2026-005', NULL, '2026-11-04', '2026-11-05',
        0, '2026-12-04', NULL, 3700.00, 2, 2700.00,
        NULL, NULL, 1000.00, NULL, 2006, 'DR260005',
        'INV-2026-005', '2026-11-04', 'PO-2026-006', 0, NULL, '1899-12-30',
        1000.00, NULL, 'Sales order total is 8350.00; invoice total is 3700.00 for 10 sacks of cement and 1 cubic meter of sand. Remaining quantities are not invoiced.', 'Partially invoiced construction order.'
    ),
    (
        3006, 1007, 'INV-2026-006', 3, '2026-10-18', '1899-12-30',
        0, '2026-10-18', NULL, 2680.00, 4, 0.00,
        3, NULL, 0.00, NULL, 2007, NULL,
        'INV-2026-006', '2026-10-18', 'PO-2026-007', 1, NULL, '1899-12-30',
        0.00, NULL, 'Cancelled invoice retained with its original total and zero collectible balance.', 'Cancelled paint order; retained for cancellation testing.'
    );
GO
SET IDENTITY_INSERT dbo.Orders OFF;
GO
