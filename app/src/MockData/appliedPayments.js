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
    }
]

// helpers

/**
 * 
 * @param {*} paymentId 
 * @returns 
 */
export const getAppliedPaymentsByPaymentID = (paymentId) => appliedPayments.filter(ap => ap.paymentId === paymentId)