export const purchaseOrders = [
    {
        id: 30001,
        itemName: "203x133x30 Steel Beam",
        date: new Date("2026-01-31"),
        term: "",
        quantity: 2,
        unitId: 3,
        unitPrice: 4500.03,
        discountTypeId: 0,
        discounts: 0,
        amount: 9000.06,
        remarks: "",
    },
]

export const getAllPurchaseOrders = () => { return purchaseOrders }

export const getPurchaseOrderById = (id) => purchaseOrders.find(po => po.id === id)