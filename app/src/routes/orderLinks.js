import { 
    Users, 
    Receipt, 
    FileText, 
    HandCoins, 
    UndoDot, 
    Box, 
    ListTodo, 
    Boxes, 
    Undo 
} from "lucide-react"

export const orderLinks = [
    { 
        icon: Users, 
        label: "Customers", 
        path: "/orders/customers",
        children: [
            { label: "List", path: "/orders/customers/list" },
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
        label: "Invoice", 
        path: "/orders/invoices",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: HandCoins, 
        label: "Order Payment", 
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
        path: "/orders/items",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: ListTodo, 
        label: "Item Orders", 
        path: "/orders/item_orders",
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
        icon: Undo, 
        label: "Invoice Returns", 
        path: "/orders/invoice_returns",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    }
]