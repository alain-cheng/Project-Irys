export const salesOrder = [
    {
        id: 2001,
        itemName: "Red Monobloc Chair",
        quantity: 5,
        unitId: 1,
        unitPrice: 250.31,
        discounts: 0,
        amount: 1251.55,                    // quantity * unitPrice - discounts ?
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 2002,
        itemName: "Plastic Folding Table",
        quantity: 2,
        unitId: 1,
        unitPrice: 750.00,
        discounts: 0,
        amount: 1500.00,
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 2003,
        itemName: "Steel Cabinet",
        quantity: 1,
        unitId: 1,
        unitPrice: 3200.50,
        discounts: 0,
        amount: 3200.50,
        invoiced: 0,
        onHand: 0,
        closed: true
    },
    {
        id: 2004,
        itemName: "Office Desk",
        quantity: 3,
        unitId: 1,
        unitPrice: 1850.75,
        discounts: 0,
        amount: 5552.25,
        invoiced: 0,
        onHand: 0,
        closed: false
    },
    {
        id: 2005,
        itemName: "Ergonomic Chair",
        quantity: 4,
        unitId: 1,
        unitPrice: 1450.00,
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