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