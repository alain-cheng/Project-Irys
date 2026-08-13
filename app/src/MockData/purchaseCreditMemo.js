export const purchaseCreditMemo = [
    {
        id: 60001,
        supplier: "",
        drNo: 0,
        date: new Date("2026-01-31"),
        poNo: 0,
        itemName: "sample item",
        quantity: 1,
        badStocks: 0,
        unitId: 2,
        unitPrice: 500.34,
        discountTypeId: 0,
        discounts: 0.00,
        amount: 0.00,
        replaced: 0,
        amountReplaced: 0.00,
        remarks: "my remarks",
    },
]

export const getAllPurchaseCreditMemo = () => { return purchaseCreditMemo }

export const getPurchaseCreditMemoById = (id) => purchaseCreditMemo.find(pcm => pcm.id === id)