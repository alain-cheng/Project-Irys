import { 
    Users, 
    Receipt, 
    FileText, 
    HandCoins, 
    UndoDot, 
    Box, 
    ListTodo, 
    Boxes, 
    Undo, 
    Undo2
} from "lucide-react"

export const orderLinks = [
    { 
        icon: Users, 
        label: "Customers", 
        path: "/orders/customers",
        children: [
            { label: "Data Entry", path: "/orders/customers/data_entry" },
            { label: "Payment History", path: "/orders/customers/payment_history" },
            { label: "Sales History", path: "/orders/customers/sales_history" },
        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: Receipt, 
        label: "Sales Orders", 
        path: "/orders/sales_orders",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: FileText, 
        label: "Invoices", 
        path: "/orders/invoices",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: HandCoins, 
        label: "Order Payments", 
        path: "/orders/order_payments",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: UndoDot, 
        label: "Credit Returns", 
        path: "/orders/credit_returns",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: Box, 
        label: "Items", 
        path: "/items",
        children: [
            { label: "Payment History", path: "/items/payment_history" },
            { label: "Sales History", path: "/items/sales_history" },
            { label: "Return History", path: "/items/return_history" },
            { label: "Audit Trail", path: "/items/audit_trail" },
        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: ListTodo, 
        label: "Item Orders", 
        path: "/item_orders",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: Boxes, 
        label: "Collections", 
        path: "/orders/collections",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: Undo2, 
        label: "Invoice Returns", 
        path: "/orders/invoice_returns",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    }
]