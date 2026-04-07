export const salesHistory = [
    {
        id: 7001,
        orderDate: "",
        orderNumber: 0,
        balance: 0,
        amountPaid: 0,
        adjustments: 0,
        returns: 0,
        status: ""
    }
]

// helpers

/**
 * Gets all sales history records
 * 
 * @returns salesHistory
 */
export const getAllSalesHistory = () => { return salesHistory }

/**
 * Gets a sales history record given by its unique id
 * 
 * @param {*} id 
 * @returns a sales history record if it matches the given id
 */
export const getSalesHistoryById = (id) => salesHistory.find(s => s.id === id)