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
        path: "/purchases/items",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: ListTodo, 
        label: "Item Orders", 
        path: "/purchases/item_orders",
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
        label: "Purchase Return", 
        path: "/purchases/purchase_return",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    }
]