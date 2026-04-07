export const collection = [
    {
        id: 8001,
        salesman: "",
        invoiceId: 3001,
        orderDate: "",
        customers: "",
        amount: 1251.55,
        balance: 0,
        remarks: ""
    }
]

// helpers

export const getAllCollection = () => { return collection }

export const getCollectionById = (id) => collection.find(c => c.id === id)