export const payments = [
    {
        id: 4001,
        customerId: 1000,
        salesOrderId: 2001,
        collector: "Mark Lee",                  // which employee received/collected the payment
        ciNumber: 0,                            // ???
        orderDate: new Date("2026-01-31"),
        amount: 1251.55,
        balance: 0.00,
        credits: 0.00,
        adjustment: 0.00,
        wtax: 0.00,
        amountApplied: 0.00,
        paymentMode: "",
    },
    {
        id: 4002,
        customerId: 1001,
        salesOrderId: 2003,
        collector: "John Doe",
        ciNumber: 0,
        orderDate: new Date("2026-01-31"),
        amount: 1500.00,
        balance: 0.00,
        credits: 0,
        adjustment: 0.00,
        wtax: 0,
        amountApplied: 0.00,
        paymentMode: "",
    },
    {
        id: 4002,
        customerId: 1001,
        salesOrderId: 2004,
        collector: "John Doe",
        ciNumber: 0,
        orderDate: new Date("2026-02-01"),
        amount: 5552.25,
        balance: 0.00,
        credits: 0,
        adjustment: 0.00,
        wtax: 0,
        amountApplied: 0.00,
        paymentMode: "Bank Transfer",
    }
];

// helper functions

/**
 * Gets all payment records
 * 
 * @returns payments
 */
export const getAllPayments = () => { return payments }

/**
 * Gets a payment record given its id.
 * 
 * @param {*} id 
 * @returns a payment record if it matches the given id
 */
export const getPaymentById = (id) => payments.find(p => p.id === id)

/**
 * 
 * @param {*} customerId 
 * @returns 
 */
export const getPaymentBySalesOrderId = (salesOrderId) => payments.find(p => p.salesOrderId === salesOrderId)