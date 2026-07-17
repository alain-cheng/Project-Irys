export const salesOrder = [
    {
        id: 2001,
        orderNumber: "70001",
        customerId: 1000,
        orderDate: new Date("2026-01-31"),
        statusId:  0,
    },
    {
        id: 2002,
        orderNumber: "70002",
        customerId: 1000,
        orderDate: new Date("2026-01-31"),
        statusId:  0,
    },
    {
        id: 2003,
        orderNumber: "70003",
        customerId: 1001,
        orderDate: new Date("2026-01-31"),
        statusId:  0,
    },
    {
        id: 2004,
        orderNumber: "70004",
        customerId: 1001,
        orderDate: new Date("2026-01-31"),
        statusId:  0,
    },
    {
        id: 2005,
        orderNumber: "70005",
        customerId: 1001,
        orderDate: new Date("2026-01-31"),
        statusId:  1,
    },
    {
        id: 2006,
        orderNumber: "70006",
        customerId: 1002,
        orderDate: new Date("2026-01-31"),
        statusId:  1,
    },
    {
        id: 2007,
        orderNumber: "70007",
        customerId: 1003,
        orderDate: new Date("2026-07-05"),
        statusId:  0,
    },
    {
        id: 2008,
        orderNumber: "70008",
        customerId: 1003,
        orderDate: new Date("2026-07-05"),
        statusId:  0,
    },
    {
        id: 2009,
        orderNumber: "70009",
        customerId: 1004,
        orderDate: new Date("2026-01-12"),
        statusId:  0,
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

/**
 * Retrieves sales order records containing the given customer ID.
 * 
 * @param {*} customerId 
 * @returns 
 */
export const getSalesOrderByCustomerId = (customerId) => salesOrder.filter(s => s.customerId === customerId)