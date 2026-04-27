export const purchasePayments = [
    {
        id: 50001,
        userId: 0,
        checkNo: 0,
        Bank: "",
        drNo: 0,
        invNo: 0,
        checkDate: new Date("2026-01-31"),
        orderDate: new Date("2026-01-31"),
        balance: 0.00,
        credits: 0.00,
        creditsApplied: 0.00,
        adjustment: 0.00,
        wTax: 0.00,
        amount: 0.00,
        amountApplied: 0.00,
        paymentMode: "",
        statusId: 0,
        remarks: "",
    },
]

export const getAllPurchasePayments = () => { return purchasePayments }

export const getPurchasePaymentById = (id) => purchasePayments.find(pp => pp.id === id)