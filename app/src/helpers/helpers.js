import { getDiscountTypeById } from "../MockData/discountTypes"

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