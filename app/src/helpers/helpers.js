import { getDiscountTypeById } from "../MockData/discountTypes"

export default function formatDiscount(id) {
    const type = getDiscountTypeById(id)?.type

    if (type === "NET") {
        return "NET"
    }

    if (type === "Percentage") {
        return `${po.discounts}%`
    }

    return ""
}