export const salesOrder = [
    {
        id: 2001,
        customerId: 1000,
        orderDate: new Date("2026-01-31"),
        itemId: 10001,
        quantity: 5,
        unitId: 1,
        unitPrice: 250.31,
        discountTypeId: 0,
        discounts: 0,
        amount: 1251.55,                    // quantity * unitPrice - discounts ?
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 2002,
        customerId: 1000,
        orderDate: new Date("2026-01-31"),
        itemId: 10002,
        quantity: 2,
        unitId: 1,
        unitPrice: 750.00,
        discountTypeId: 0,
        discounts: 0,
        amount: 1500.00,
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 2003,
        customerId: 1001,
        orderDate: new Date("2026-01-31"),
        itemId: 10003,
        quantity: 1,
        unitId: 1,
        unitPrice: 3200.50,
        discountTypeId: 0,
        discounts: 0,
        amount: 3200.50,
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 2004,
        customerId: 1001,
        orderDate: new Date("2026-01-31"),
        itemId: 10004,
        quantity: 3,
        unitId: 1,
        unitPrice: 1850.75,
        discountTypeId: 0,
        discounts: 0,
        amount: 5552.25,
        invoiced: 0,
        onHand: 0,
        closed: false
    },
    {
        id: 2005,
        customerId: 1001,
        orderDate: new Date("2026-01-31"),
        itemId: 10005,
        quantity: 4,
        unitId: 1,
        unitPrice: 1450.00,
        discountTypeId: 0,
        discounts: 0,
        amount: 5800.00,
        invoiced: 0,
        onHand: 0,
        closed: false
    }
];

// helper functions

/**
 * Gets all sales order records.
 * 
 * @returns salesOrder
 */
export const getAllSalesOrder = () => { return salesOrder }

/**
 * Obtains a sales order record given its id.
 * 
 * @param {*} id 
 * @returns a salesOrder if it exists
 */
export const getSalesOrderById = (id) => salesOrder.find(s => s.id === id)