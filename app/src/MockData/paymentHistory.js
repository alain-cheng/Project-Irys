export const paymentHistory = [
    {
        id: 6001,
        paymentId: 4001,
        amount: 1251.55,
        paymentMode: "",
        bankName: "",
        checkNumber: 0,
        checkData: "",
        status: "paid"
    },
    {
        id: 6002,
        paymentId: 4002,
        amount: 1500.00,
        paymentMode: "",
        bankName: "",
        checkNumber: 0,
        checkData: "",
        status: "paid"
    },
    {
        id: 6003,
        paymentId: 4003,
        amount: 3200.50,
        paymentMode: "",
        bankName: "",
        checkNumber: 0,
        checkData: "",
        status: "paid"
    },
]

// helpers

export const getAllPaymentHistory = () => { return paymentHistory }

export const getPaymentHistoryById = (id) => paymentHistory.find(p => p.id === id)