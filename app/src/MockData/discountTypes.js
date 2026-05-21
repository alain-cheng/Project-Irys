export const discountTypes = [
    {
        id: 0,
        type: "NET",
    },
    {
        id: 1,
        type: "Percentage",
    },
]

export const getAllDiscountTypes = () => { return discountTypes }

export const getDiscountTypeById = (id) => discountTypes.find(dt => dt.id === id)