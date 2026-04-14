import { 
    BanknoteArrowDown, 
    Building2, 
    Landmark, 
    Wallet 
} from "lucide-react"

export const expensesLinks = [
    { 
        icon: Building2, 
        label: "Vendors", 
        path: "/expenses/vendors",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: BanknoteArrowDown, 
        label: "Enter Bills", 
        path: "/expenses/enter_bills",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: Wallet, 
        label: "Pay Bills", 
        path: "/expenses/pay_bills",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    },
    { 
        icon: Landmark, 
        label: "Accounts", 
        path: "/expenses/accounts",
        children: [

        ],
        showInSidebar: true,
        showInFlow: true
    }
]