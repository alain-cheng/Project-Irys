import { 
    Box, 
    CreditCard, 
    ListTodo, 
    PackageCheck, 
    ReceiptText, 
    ShoppingCart, 
    Truck, 
    Undo2, 
    Wrench 
} from "lucide-react"

export const purchasesLinks = [
    { 
        icon: Truck, 
        label: "Suppliers", 
        path: "/purchases/suppliers",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: ShoppingCart, 
        label: "P.O.", 
        path: "/purchases/po",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: PackageCheck, 
        label: "Receive", 
        path: "/purchases/receive",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: CreditCard, 
        label: "Purchase Payment", 
        path: "/purchases/purchase_payment",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: ReceiptText, 
        label: "Credit Memo", 
        path: "/purchases/credit_memo",
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
        icon: Wrench, 
        label: "Assembly", 
        path: "/purchases/assembly",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: Undo2, 
        label: "Returns", 
        path: "/purchases/returns",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    }
]