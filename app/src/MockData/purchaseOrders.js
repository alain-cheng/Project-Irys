export const purchaseOrders = [
    {
        id: 20001,
        itemName: "Steel Beam",
        date: new Date("2026-01-31"),
        term: "",
        quantity: 2,
        unitId: 3,
        unitPrice: 4500.03,
        discountTypeId: 0,
        discounts: 0,
        amount: 9000.06,
    },
]

export const getAllPurchaseOrders = () => { return purchaseOrders }

export const getPurchaseOrderById = (id) => purchaseOrders.find(po => po.id === id)