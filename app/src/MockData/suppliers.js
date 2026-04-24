export const suppliers = [
    {
        id: 20001,
        supplierName: "X Trading Co.",
        contact: "Bobby",
        title: "Secretary",
        address: "123 AVE",
        city: "Taguig",
        province: "NCR",
        zipCode: "7654",
        phone: "",
        header1: "",
    },
    {
        id: 20001,
        supplierName: "One Inc.",
        contact: "Tom",
        title: "CEO",
        address: "Fifth Street",
        city: "Clark",
        province: "",
        zipCode: "3345",
        phone: "",
        header1: "",
    },
]

export const getAllSuppliers = () => { return suppliers }

export const getSupplierById = (id) => suppliers.find(s => s.id === id)