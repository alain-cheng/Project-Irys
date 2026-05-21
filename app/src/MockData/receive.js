export const receive = [
    {
        id: 40001,
        productName: "Cement Trowel",
        quantity: 1,
        unitId: 1,
        packaging: "",
        unitPrice: 750.00,
        discountTypeId: 1,
        discount: 5.00,
        amount: 712.5,
        statusId: 0,
    },
]

export const getAllReceives = () => { return receive }

export const getReceiveById = (id) => receive.find(r => r.id === id)