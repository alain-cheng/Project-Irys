export const creditMemo = [
    {
        id: 5001,
        customerId: 1009,
        date: "",
        poNumber: 0,
        creditId: 0,
        itemId: 0,
        quantity: 5,
        badQty: 1,
        unitPrice: 25.5,
        discount: 0,
        amount: 127.5,
        replaced: 1,
        amountReplaced: 25.5,
        remarks: "sample return"
    }
]

// helpers

export const getAllCreditMemo = () => { return creditMemo }

export const getCreditMemoById = (id) => creditMemo.find(c => c.id === id)