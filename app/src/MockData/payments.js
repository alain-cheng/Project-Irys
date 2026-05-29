export const payments = [
    {
        id: 4001,
        customerId: 1000,
        salesOrderId: 2001,
        collector: "Mark Lee",                  // which employee received/collected the payment
        ciNumber: 0,                            // ???
        orderDate: new Date("2026-01-31"),
        paymentDate: new Date("2026-02-01"),
        amount: 1251.55,
        balance: 0.00,
        credits: 0.00,
        adjustment: 0.00,
        wtax: 0.00,
        amountApplied: 0.00,
        paymentMode: "Check",
        checkNo: "00001234563",
        checkDate: new Date("2026-02-01"),
        bankName: "BDO",
        status: "CLEARED"
    },
    {
        id: 4002,
        customerId: 1001,
        salesOrderId: 2003,
        collector: "John Doe",
        ciNumber: 0,
        orderDate: new Date("2026-01-31"),
        paymentDate: new Date("2026-02-01"),
        amount: 3200.50,
        balance: 0.00,
        credits: 0,
        adjustment: 0.00,
        wtax: 0,
        amountApplied: 0.00,
        paymentMode: "Check",
        checkNo: "00001234564",
        checkDate: new Date("2026-02-01"),
        bankName: "BDO",
        status: "CLEARED"
    },
    {
        id: 4003,
        customerId: 1001,
        salesOrderId: 2004,
        collector: "John Doe",
        ciNumber: 0,
        orderDate: new Date("2026-02-01"),
        paymentDate: new Date("2026-02-01"),
        amount: 5552.25,
        balance: 0.00,
        credits: 0,
        adjustment: 0.00,
        wtax: 0,
        amountApplied: 0.00,
        paymentMode: "Bank Transfer",
        checkNo: "00001234565",
        checkDate: new Date("2026-02-01"),
        bankName: "BDO",
        status: "CLEARED"
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
 * @param {*} salesOrderId 
 * @returns 
 */
export const getPaymentBySalesOrderId = (salesOrderId) => payments.find(p => p.salesOrderId === salesOrderId)

/**
 * Retrieves Payment Records given the customer ID
 * 
 * @param {*} customerId 
 * @returns 
 */
export const getPaymentsByCustomerId = (customerId) => payments.filter(p => p.customerId === customerId)