import { getDiscountTypeById } from "../MockData/discountTypes"
import { getSalesOrderItemsBySOId } from "../MockData/salesOrderItems"

/**
 * Formats the displayed text/value of a discount.
 * 
 * @param {*} id - The ID of the type of discount
 * @param {*} amount - The value of the discount (if applicable)
 * @returns The appropriate value to display based on discount type
 */
export function formatDiscount(id, amount) {
    const type = getDiscountTypeById(id)?.type

    if (type === "NET") {
        return "NET"
    }

    if (type === "Percentage") {
        return `-${amount}%`
    }

    return ""
}

/**
 * Calculates the average cost of an item object by factoring all its available price range.
 * 
 * @param {*} item 
 * @returns the calculate average cost of an item
 */
export function getAverageCost(item) {
    const prices = [
        item.wholesalePrice,
        item.retail1Price,
        item.retail2Price,
        item.purchasePrice,
        item.specialPrice
    ].filter(p => typeof p === "number" && p > 0)

    if (prices.length === 0) return 0

    return prices.reduce((sum, p) => sum + p, 0) / prices.length
}

/**
 * Retrieves the total cost of a sales order
 * 
 * @param {*} order - the sales order object
 * @returns totalAmount - sum of all item price cost
 */
export function getOrderTotalAmount(order) {
    let totalAmount = 0.00
    let itemsList = getSalesOrderItemsBySOId(order.id)

    for (let i = 0; i < itemsList.length; ++i) {
        totalAmount += itemsList[i].amount
    }

    return totalAmount
}