// This is for CreditMemo.jsx. will update naming convention later to avoid confusion
export const purchaseReturns = [
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

export const getAllPurchaseReturns = () => { return purchaseReturns }

export const getPurchaseReturnById = (id) => purchaseReturns.find(pr => pr.id === id)