import Sidebar from "../components/Sidebar"
import Node from "../components/Node"

import { Users, Receipt, FileText, HandCoins, UndoDot, Box, ListTodo, Boxes, Undo } from "lucide-react"

function Orders() {
    const orderLinks = [
        { icon: Users, label: "Customers", path: "/orders/customers" },
        { icon: Receipt, label: "Sales Orders", path: "/orders/sales_orders"},
        { icon: FileText, label: "Invoice", path: "/orders/invoice"},
        { icon: HandCoins, label: "Order Payment", path: "/orders/order_payment"},
        { icon: UndoDot, label: "Credit Returns", path: "/orders/credit_returns"},
        { icon: Box, label: "Items", path: "/orders/items"},
        { icon: ListTodo, label: "Item Orders", path: "/orders/item_orders"},
        { icon: Boxes, label: "Collections", path: "/orders/collections"},
        { icon: Undo, label: "Invoice Returns", path: "/orders/invoice_returns"}
    ]

    return (
        <div className="flex pt-2 space-x-2">
            <Sidebar links={orderLinks} />

            <main className="ml-80 mt-20">
                <h1 className="text-2xl text-text mb-5">Orders</h1>
                {/* to consider using React Flow for the flowchart-style UI */}
                <div className="flex items-center gap-5">
                    <Node 
                        icon={orderLinks[0].icon}  
                        label={orderLinks[0].label}
                        path={orderLinks[0].path}
                    />

                    <Node 
                        icon={orderLinks[1].icon}  
                        label={orderLinks[1].label}
                        path={orderLinks[1].path}
                    />

                    <Node 
                        icon={orderLinks[2].icon}  
                        label={orderLinks[2].label}
                        path={orderLinks[2].path}
                    />

                    <div className="flex flex-col gap-5">
                        <Node 
                            icon={orderLinks[3].icon}  
                            label={orderLinks[3].label}
                            path={orderLinks[3].path}
                        />

                        <Node 
                            icon={orderLinks[4].icon}  
                            label={orderLinks[4].label}
                            path={orderLinks[4].path}
                        />
                    </div>
                </div>

                <div className="flex gap-5 mt-20">
                    <Node 
                        icon={orderLinks[5].icon}  
                        label={orderLinks[5].label}
                        path={orderLinks[5].path}
                    />

                    <Node 
                        icon={orderLinks[6].icon}  
                        label={orderLinks[6].label}
                        path={orderLinks[6].path}
                    />

                    <Node 
                        icon={orderLinks[7].icon}  
                        label={orderLinks[7].label}
                        path={orderLinks[7].path}
                    />

                    <Node 
                        icon={orderLinks[8].icon}  
                        label={orderLinks[8].label}
                        path={orderLinks[8].path}
                    />
                </div>
            </main>
        </div>
    )
}

export default Orders