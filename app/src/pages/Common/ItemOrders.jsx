import { useMemo } from "react"

import { getAllItems, getItemById } from "../../MockData/items"
import { getAllOrders } from "../../MockData/orders"
import { getAllUnits, getUnitById } from "../../MockData/units"
import { commonLinks } from "../../routes/commonLinks"

import Sidebar from "../components/Sidebar"
import Breadcrumb from "../../components/Breadcrumb"

function ItemOrders() {
    const itemOrdersView = useMemo(() => {
        const itemsMap = Object.fromEntries(
            getAllItems().map(i => [i.id, i])
        ) 

        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        return getAllOrders().map(order => ({
            ...order,
            itemNo: itemsMap[order.itemId]?.id ?? "-",
            itemName: itemsMap[order.itemId]?.itemName ?? "-",
            unitName: unitsMap[order.unitId]?.unitName ?? "-",
        }))
    }, [])

    return(
        <div className="flex pt-16 space-x-2">
            <Sidebar links={commonLinks} />

            <main className="ml-70 mr-5 flex-1 min-w-0">
                <Breadcrumb />

                <div className="flex flex-col h-full py-5">
                    <h1 className="text-2xl text-text mb-5">Item Orders</h1>

                    <div className="flex-1 min-h-0">
                        <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                            <table className="bg-background">
        
                                <thead className="sticky top-0 z-10 bg-background border">
                                    <tr>
                                        <th className="sticky left-0 top-0 z-10 bg-background">Order No.</th>
                                        <th>Item No.</th>
                                        <th>Item Name</th>
                                        <th>Supplier</th>
                                        <th>Qty on Hand</th>
                                        <th>Unit</th>
                                        <th>Qty on S.O.</th>
                                        <th>Qty on P.O.</th>
                                        <th>Difference</th>
                                    </tr>
                                </thead>
        
                                <tbody>
                                    {itemOrdersView.map((order) => (
                                        <tr key={order.id} className="bg-background hover:bg-accent-soft transition">
                                            <td className="sticky left-0 z-5 bg-background">{order.id}</td>
                                            <td>{order.itemNo}</td>
                                            <td>{order.itemName}</td>
                                            <td>{order.supplier}</td>
                                            <td>{order.qtyOnHand}</td>
                                            <td>{order.unitName}</td>
                                            <td>{order.qtyOnSO}</td>
                                            <td>{order.qtyOnPO}</td>
                                            <td>{order.difference}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>    
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ItemOrders