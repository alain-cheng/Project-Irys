export const invoiceReturns = [
    {
        id: 9001,
        customerId: 1009,
        address: "",
        phone: "09891234567",
        orderNumber: 0,             // sales order id?
        returnDate: "",
        orderDate: "",
        itemId: 0,
        unit: 1,
        unitPrice: 0,
        discount: 0,
        qtyReturned: 1,
        badStock: 0,
        amtReturned: 10.05,
        remarks: "sample invoice return" 
    }
]

// helpers

export const getAllInvoiceReturns = () => { return invoiceReturns }

export const getInvoiceReturnsById = (id) => invoiceReturns.find(i => i.id === id)