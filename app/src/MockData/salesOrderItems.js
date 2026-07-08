export const salesOrderItems = [
    {
        id: 1,
        salesOrderId: 2001,
        itemId: 10001,
        quantity: 5,
        unitPrice: 250.31,
        discountTypeId: 0,
        discounts: 0.00,
        amount: 1251.55,
        invoiced: 0.00,
        onHand: 0.00,
        closed: true
    },
    {
        id: 2,
        salesOrderId: 2001,
        itemId: 10002,
        quantity: 2,
        unitPrice: 750.00,
        discountTypeId: 0,
        discounts: 0.00,
        amount: 1500.00,
        invoiced: 0.00,
        onHand: 0.00,
        closed: false
    },
    {
        id: 3,
        salesOrderId: 2002,
        itemId: 10002,
        quantity: 2,
        unitPrice: 750.00,
        discountTypeId: 0,
        discounts: 0.00,
        amount: 1500.00,
        invoiced: 0.00,
        onHand: 0.00,
        closed: true
    },
    {
        id: 4,
        salesOrderId: 2003,
        itemId: 10003,
        quantity: 1,
        unitPrice: 3200.50,
        discountTypeId: 0,
        discounts: 0,
        amount: 3200.50,
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 5,
        salesOrderId: 2004,
        itemId: 10004,
        quantity: 3,
        unitPrice: 1850.75,
        discountTypeId: 0,
        discounts: 0,
        amount: 5552.25,
        invoiced: 0,
        onHand: 0,
        closed: false
    },
    {
        id: 6,
        salesOrderId: 2005,
        itemId: 10005,
        quantity: 4,
        unitPrice: 1450.00,
        discountTypeId: 0,
        discounts: 0,
        amount: 5800.00,
        invoiced: 0,
        onHand: 0,
        closed: false
    },
    {
        id: 7,
        salesOrderId: 2006,
        itemId: 10003,
        quantity: 2,
        unitPrice: 3200.50,
        discountTypeId: 0,
        discounts: 0,
        amount: 6401.00,
        invoiced: 0,
        onHand: 0,
        closed: false
    },
    {
        id: 8,
        salesOrderId: 2007,
        itemId: 10004,
        quantity: 1,
        unitPrice: 1850.75,
        discountTypeId: 0,
        discounts: 0,
        amount: 1850.75,
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 9,
        salesOrderId: 2007,
        itemId: 10005,
        quantity: 2,
        unitPrice: 1450.00,
        discountTypeId: 0,
        discounts: 0,
        amount: 2900.00,
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 10,
        salesOrderId: 2008,
        itemId: 10001,
        quantity: 2,
        unitPrice: 250.31,
        discountTypeId: 0,
        discounts: 0,
        amount: 500.62,
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 11,
        salesOrderId: 2008,
        itemId: 10002,
        quantity: 1,
        unitPrice: 750.00,
        discountTypeId: 0,
        discounts: 0,
        amount: 750.00,
        invoiced: 0,
        onHand: 0,
        closed: true
    },
];

// helpers

/**
 * Gets all Sales Order Item records
 * @returns salesOrderItems
 */
export const getAllSalesOrderItems = () => { return salesOrderItems }

/**
 * Retrieves Sales Order Item records given the sales order ID
 * @param {*} salesOrderId 
 * @returns a list of sales order item records
 */
export const getSalesOrderItemsBySOId = (salesOrderId) => salesOrderItems.filter(s => s.salesOrderId === salesOrderId)