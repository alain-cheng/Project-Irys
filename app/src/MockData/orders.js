export const orders = [
    {
        id: 11001,
        itemId: 10001,
        supplier: 0,
        qtyOnHand: 0,
        unitId: 1,
        qtyOnSO: 0,
        qtyOnPO: 0,
        difference: 0
    },
    {
        id: 11002,
        itemId: 10002,
        supplier: 0,
        qtyOnHand: 0,
        unitId: 1,
        qtyOnSO: 0,
        qtyOnPO: 0,
        difference: 0
    },
]

// helpers

export const getAllOrders = () => { return orders }

export const getOrderById = (id) => orders.find(o => o.id === id)