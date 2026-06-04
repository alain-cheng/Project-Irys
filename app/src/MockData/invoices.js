export const invoices = [
    {
        id: 3001,
        invoiceNumber: "00001",
        poNumber: null,
        customerName: "Alpha Beta",
        customerId: 1000,
        address: "",
        collectorId: 0,
        collector: "",
        salesperson: "",
        dueDate: new Date("2026-02-29"),
        drNumber: 0,
        salesOrderId: 2002,
        orderNumber: "70002",
        orderDate: new Date("2026-01-31"),
        term: "75 days",
        via: "",
        isCancelled: false,
        isNoComm: false,
        isCommPaid: false,
        isHeavy: false,
        user: 0,
        driver: "",
        helper: "",
        truck: "",
        adjustments: 0.00,
        rebates: 0.00,
        creditsApplied: 0.00,
        returns: 0.00,
        amountPaid: 0.00,
        balance: 1500.00,
        total: 1500.00,
        isDraft: false,
    },
    {
        id: 3002,
        invoiceNumber: "00002",
        poNumber: null,
        customerName: "Gamma Corp",
        customerId: 1001,
        address: "",
        collectorId: 0,
        collector: "",
        salesperson: "",
        dueDate: new Date("2026-02-29"),
        drNumber: 0,
        salesOrderId: 2003,
        orderNumber: "70003",
        orderDate: new Date("2026-01-31"),
        term: "75 days",
        via: "",
        isCancelled: false,
        isNoComm: false,
        isCommPaid: false,
        isHeavy: false,
        user: 0,
        driver: "",
        helper: "",
        truck: "",
        adjustments: 0.00,
        rebates: 0.00,
        creditsApplied: 0.00,
        returns: 0.00,
        amountPaid: 0.00,
        balance: 3200.50,
        total: 3200.50,
        isDraft: false,
    },
];

// helper functions

/**
 * Gets all invoices.
 * 
 * @returns invoices
 */
export const getAllInvoices = () => { return invoices }

/**
 * 
 * @param {*} id 
 * @returns an invoice if it exists
 */
export const getInvoiceById = (id) => invoices.find(i => i.id === id)