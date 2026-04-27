import { getDiscountTypeById } from "../MockData/discountTypes"

export default function formatDiscount(id, amount) {
    const type = getDiscountTypeById(id)?.type

    if (type === "NET") {
        return "NET"
    }

    if (type === "Percentage") {
        return `-${amount}%`
    }

    return ""
}