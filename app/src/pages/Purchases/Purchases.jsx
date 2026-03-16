import Sidebar from "../components/Sidebar"
import Node from "../components/Node"

import { Box, CreditCard, ListTodo, PackageCheck, ReceiptText, ShoppingCart, Truck, Undo2, Wrench } from "lucide-react"

function Purchases() {
    const purchasesLinks = [
        { icon: Truck, label: "Suppliers", path: "/purchases/suppliers"},
        { icon: ShoppingCart, label: "P.O.", path: "/purchases/po"},
        { icon: PackageCheck, label: "Receive", path: "/purchases/receive"},
        { icon: CreditCard, label: "Purchase Payment", path: "/purchases/purchase_payment"},
        { icon: ReceiptText, label: "Credit Memo", path: "/purchases/credit_memo"},
        { icon: Box, label: "Items", path: "/purchases/items"},
        { icon: ListTodo, label: "Item Orders", path: "/purchases/item_orders"},
        { icon: Wrench, label: "Assembly", path: "/purchases/assembly"},
        { icon: Undo2, label: "Purchase Return", path: "/purchases/purchase_return"}
    ]


    return(
        <div className="flex pt-2 space-x-2">
            <Sidebar links={purchasesLinks} />

            <main className="ml-80 mt-20">
                <h1 className="text-2xl text-text">Purchases</h1>

                <div className="flex items-center gap-5">
                    <Node 
                        icon={purchasesLinks[0].icon}
                        label={purchasesLinks[0].label}
                        path={purchasesLinks[0].path}
                    />

                    <Node 
                        icon={purchasesLinks[1].icon}
                        label={purchasesLinks[1].label}
                        path={purchasesLinks[1].path}
                    />

                    <Node 
                        icon={purchasesLinks[2].icon}
                        label={purchasesLinks[2].label}
                        path={purchasesLinks[2].path}
                    />
                    
                    <div className="flex flex-col gap-5">
                        <Node 
                            icon={purchasesLinks[3].icon}
                            label={purchasesLinks[3].label}
                            path={purchasesLinks[3].path}
                        />

                        <Node 
                            icon={purchasesLinks[4].icon}
                            label={purchasesLinks[4].label}
                            path={purchasesLinks[4].path}
                        />
                    </div>
                </div>

                <div className="flex gap-5 mt-20">
                        <Node 
                        icon={purchasesLinks[5].icon}
                        label={purchasesLinks[5].label}
                        path={purchasesLinks[5].path}
                        />

                        <Node 
                            icon={purchasesLinks[6].icon}
                            label={purchasesLinks[6].label}
                            path={purchasesLinks[6].path}
                        />

                        <Node 
                            icon={purchasesLinks[7].icon}
                            label={purchasesLinks[7].label}
                            path={purchasesLinks[7].path}
                        />

                        <Node 
                            icon={purchasesLinks[8].icon}
                            label={purchasesLinks[8].label}
                            path={purchasesLinks[8].path}
                        />
                    </div>
            </main>
        </div>    
    )
}

export default Purchases