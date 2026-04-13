export const payments = [
    {
        id: 4001,
        customerId: 1000,
        salesOrderId: 2001,
        collector: "",
        ciNumber: 0,
        orderDate: "",
        amount: 1251.55,
        balance: 0,
        credits: 0,
        adjustment: 0,
        wtax: 0,
        amountApplied: 0,
        paymentMode: "",
        remarks: ""
    },
    {
        id: 4002,
        customerId: 1001,
        salesOrderId: 2002,
        collector: "",
        ciNumber: 0,
        orderDate: "",
        amount: 1500.00,
        balance: 0,
        credits: 0,
        adjustment: 0,
        wtax: 0,
        amountApplied: 0,
        paymentMode: "",
        remarks: ""
    },
    {
        id: 4003,
        customerId: 1002,
        salesOrderId: 2003,
        collector: "",
        ciNumber: 0,
        orderDate: "",
        amount: 3200.50,
        balance: 0,
        credits: 0,
        adjustment: 0,
        wtax: 0,
        amountApplied: 0,
        paymentMode: "",
        remarks: ""
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