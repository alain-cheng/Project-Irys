export const invoices = [
    {
        id: 3001,
        customerId: 1000,
        itemId: 10001,
        quantity: 5,
        unitId: 1,
        packaging: "",
        unitPrice: 250.31,
        discount: 0,
        amount: 1251.55,
    },
    {
        id: 3002,
        customerId: 1001,
        itemId: 10002,
        quantity: 2,
        unitId: 1,
        packaging: "Box",
        unitPrice: 750.00,
        discount: 0,
        amount: 1500.00,
    },
    {
        id: 3003,
        customerId: 1002,
        itemId: 10003,
        quantity: 1,
        unitId: 1,
        packaging: "",
        unitPrice: 3200.50,
        discount: 0,
        amount: 3200.50,
    }
];

// helper functions

/**
 * Gets all invoices.
 * 
 * @returns invoices
 */
export const getAllInvoices = () => { return invoices }

/**
 * 
 * @param {*} id 
 * @returns an invoice if it exists
 */
export const getInvoiceById = (id) => invoices.find(i => i.id === id)