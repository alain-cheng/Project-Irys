export const salesHistory = [
    {
        id: 7001,
        orderDate: new Date("2026-01-31"),
        orderNumber: 2001,
        balance: 0,
        amountPaid: 1251.55,
        adjustments: 0,
        returns: 0,
        status: "Complete"
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