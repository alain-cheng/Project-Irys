import Sidebar from "../components/Sidebar"
import Node from "../components/Node"
import { BanknoteArrowDown, Building2, Landmark, Wallet } from "lucide-react"

function Expenses() {
    const expensesLink = [
        { icon: Building2, label: "Vendors", path: ""},
        { icon: BanknoteArrowDown, label: "Enter Bills", path: ""},
        { icon: Wallet, label: "Pay Bills", path: ""},
        { icon: Landmark, label: "Accounts", path: ""}
    ]

    return(
        <div className="flex pt-2 space-x-2">
            <Sidebar links={expensesLink} />

            <main className="ml-80 mt-20">
                <h1 className="text-2xl text-text mb-5">Expenses</h1>

                <div className="flex items-center gap-5">
                    <Node 
                        icon={expensesLink[0].icon}
                        label={expensesLink[0].label}
                        path={expensesLink[0].path}
                    />

                    <Node 
                        icon={expensesLink[1].icon}
                        label={expensesLink[1].label}
                        path={expensesLink[1].path}
                    />

                    <Node 
                        icon={expensesLink[2].icon}
                        label={expensesLink[2].label}
                        path={expensesLink[2].path}
                    />
                </div>

                <div className="flex gap-5 mt-20">
                    <Node 
                        icon={expensesLink[3].icon}
                        label={expensesLink[3].label}
                        path={expensesLink[3].path}
                    />
                </div>
            </main>
        </div>
    )
}

export default Expenses