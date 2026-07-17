export const appliedPayments = [
    {
        id: 1,
        paymentId: 4001,
        salesOrderId: 2001,
        amountApplied: 1251.55,
        adjustment: 0.00,
        credits: 0.00,
        wtax: 0.00,
    },
    {
        id: 2,
        paymentId: 4002,
        salesOrderId: 2003,
        amountApplied: 3200.50,
        adjustment: 0.00,
        credits: 0.00,
        wtax: 0.00,
    },
    {
        id: 3,
        paymentId: 4003,
        salesOrderId: 2004,
        amountApplied: 5552.25,
        adjustment: 0.00,
        credits: 0.00,
        wtax: 0.00,
    },
    {
        id: 4,
        paymentId: 4004,
        salesOrderId: 2007,
        amountApplied: 4750.75,
        adjustment: 0.00,
        credits: 0.00,
        wtax: 0.00,
    },
    {
        id: 5,
        paymentId: 4004,
        salesOrderId: 2008,
        amountApplied: 1250.62,
        adjustment: 0.00,
        credits: 0.00,
        wtax: 0.00,
    },
    {
        id: 6,
        paymentId: 4005,
        salesOrderId: 2009,
        amountApplied: 7250.00,
        adjustment: 0.00,
        credits: 0.00,
        wtax: 0.00,
    },
    {
        id: 7,
        paymentId: 4006,
        salesOrderId: 2009,
        amountApplied: 7250.00,
        adjustment: 0.00,
        credits: 0.00,
        wtax: 0.00,
    },
]

// helpers

/**
 * Method for retrieving records belonging to the same payment transaction.
 * 
 * @param {*} paymentId 
 * @returns
 */
export const getAppliedPaymentsByPaymentID = (paymentId) => appliedPayments.filter(ap => ap.paymentId === paymentId)

/**
 * Method for retrieving records that paid for the same order.
 * 
 * @param {*} salesOrderId 
 * @returns 
 */
export const getAppliedPaymentsBySalesOrderID = (salesOrderId) => appliedPayments.filter(ap => ap.salesOrderId === salesOrderId)