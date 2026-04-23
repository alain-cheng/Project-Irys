import { useMemo } from "react"

import { getAllItems, items } from "../../../MockData/items"
import { getAllUnits, getUnitById } from "../../../MockData/units"
import { getAllSalesOrder } from "../../../MockData/salesOrder"

function SalesOrders () {

    const salesOrdersView = useMemo(() => {
        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        return getAllSalesOrder().map(so => ({
            ...so,
            unitName: unitsMap[so.unitId]?.unitName ?? "-",
        }))
    }, [])

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Sales Orders</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">ID</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Unit Price</th>
                                <th>Discounts</th>
                                <th>Amount</th>
                                <th>Invoiced</th>
                                <th>On Hand</th>
                                <th>Closed</th>
                            </tr>
                        </thead>

                        <tbody>
                            {salesOrdersView.map((so) => (
                                <tr key={so.id} className=" hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5 ">{so.id}</td>
                                    <td>{so.itemName}</td>
                                    <td>{so.quantity}</td>
                                    <td>{so.unitName}</td>
                                    <td>{so.unitPrice}</td>
                                    <td>{so.discounts}</td>
                                    <td>{so.amount}</td>
                                    <td>{so.invoiced}</td>
                                    <td>{so.onHand}</td>
                                    <td>{so.closed ? "Closed" : "Open"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    )
}

export default SalesOrders