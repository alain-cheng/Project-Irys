import { useMemo } from "react"

import { getAllPurchaseCreditMemo } from "../../../MockData/purchaseCreditMemo"
import { getAllUnits } from "../../../MockData/units"
import { getAllDiscountTypes } from "../../../MockData/discountTypes"

import { formatDiscount } from "../../../helpers/helpers"

function CreditMemo () {
    const purchaseCreditMemoViews = useMemo(() => {
        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        return getAllPurchaseCreditMemo().map(pcm => ({
            ...pcm,
            unitName: unitsMap[pcm.unitId]?.unitName ?? "-",
        }))
    }, [])

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Credit Memo</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">
                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10">Credit ID</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Bad Stocks</th>
                                <th>Unit</th>
                                <th>Unit Price</th>
                                <th>Discounts</th>
                                <th>Amount</th>
                                <th>Replaced</th>
                                <th>Amt Replaced</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {purchaseCreditMemoViews.map((pcm) => (
                                <tr key={pcm.id} className=" bg-background hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5">{pcm.id}</td>
                                    <td>{pcm.itemName}</td>
                                    <td>{pcm.quantity}</td>
                                    <td>{pcm.badStocks}</td>
                                    <td>{pcm.unitName}</td>
                                    <td>{pcm.unitPrice.toFixed(2)}</td>
                                    <td>{formatDiscount(pcm.discountTypeId, pcm.discounts)}</td>
                                    <td>{pcm.amount.toFixed(2)}</td>
                                    <td>{pcm.replaced}</td>
                                    <td>{pcm.amountReplaced.toFixed(2)}</td>
                                    <td>{pcm.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CreditMemo