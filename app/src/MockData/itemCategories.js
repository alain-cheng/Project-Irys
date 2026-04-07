export const itemCategories = [
    {
        id: 1,
        categoryName: "Furniture"
    },
    {
        id: 2,
        categoryName: "Office Furniture"
    },
    {
        id: 3,
        categoryName: "Storage & Cabinets"
    },
    {
        id: 4,
        categoryName: "Tables"
    },
    {
        id: 5,
        categoryName: "Chairs & Seating"
    },
    {
        id: 6,
        categoryName: "Electronics"
    },
    {
        id: 7,
        categoryName: "Appliances"
    },
    {
        id: 8,
        categoryName: "Office Supplies"
    }
];

// helpers

export const getItemCategoryById = (id) => itemCategories.find(i => i.id === id)