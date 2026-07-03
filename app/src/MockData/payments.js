export const payments = [
    {
        id: 4001,
        customerId: 1000,
        paymentDate: new Date("2026-02-01"),
        collector: "Mark Lee",                  // which employee received/collected the payment
        paymentMode: "Check",
        ciNumber: 0,                            // ???
        checkNo: "00001234563",
        checkDate: new Date("2026-02-01"),
        bankName: "BDO",
        status: "CLEARED"
    },
    {
        id: 4002,
        customerId: 1001,
        paymentDate: new Date("2026-02-01"),
        collector: "John Doe",
        paymentMode: "Check",
        ciNumber: 0,
        checkNo: "00001234564",
        checkDate: new Date("2026-02-01"),
        bankName: "BDO",
        status: "CLEARED"
    },
    {
        id: 4003,
        customerId: 1001,
        paymentDate: new Date("2026-02-01"),
        collector: "John Doe",
        paymentMode: "Bank Transfer",
        ciNumber: 0,
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