import { useMemo } from "react"

import { getAllPurchaseOrders } from "../../../MockData/purchaseOrders"
import { getAllUnits } from "../../../MockData/units"
import { getAllDiscountTypes } from "../../../MockData/discountTypes"

import formatDiscount from "../../../helpers/helpers"

function PurchaseOrders () {
    const poViews = useMemo(() => {
        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        return getAllPurchaseOrders().map(po => ({
            ...po,
            unitName: unitsMap[po.unitId]?.unitName ?? "-",
        }))
    }, [])

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Purchase Orders</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">
                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10">P.O. ID</th>
                                <th>Item Name</th>
                                <th>Date</th>
                                <th>Term</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Unit Price</th>
                                <th>Discounts</th>
                                <th>Amount</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {poViews.map((po) => (
                                <tr key={po.id} className="bg-background hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5">{po.id}</td>
                                    <td>{po.itemName}</td>
                                    <td>{po.date.toLocaleDateString()}</td>
                                    <td>{po.term}</td>
                                    <td>{po.quantity}</td>
                                    <td>{po.unitName}</td>
                                    <td>{po.unitPrice}</td>
                                    <td>{formatDiscount(po.discountTypeId, po.discounts)}</td>
                                    <td>{po.amount}</td>
                                    <td>{po.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PurchaseOrders