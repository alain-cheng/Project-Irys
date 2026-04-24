import {
    Box, 
    ListTodo
} from "lucide-react"

export const commonLinks = [
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
    }
]