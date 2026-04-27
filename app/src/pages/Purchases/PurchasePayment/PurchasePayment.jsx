import { useMemo } from "react"

import { getAllPurchasePayments } from "../../../MockData/purchasePayments"
import { getAllStatuses } from "../../../MockData/status"

function PurchasePayment () {
    const purchasePaymentViews = useMemo(() => {
        const statusesMap = Object.fromEntries(
            getAllStatuses().map(s => [s.id, s])
        )

        return getAllPurchasePayments().map(pp => ({
            ...pp,
            statusName: statusesMap[pp.statusId]?.statusName ?? "-",
        }))
    }, [])

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Receive</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">
                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10">Payment ID</th>
                                <th>DR No.</th>
                                <th>Inv No.</th>
                                <th>Order Date</th>
                                <th>Amount</th>
                                <th>Balance</th>
                                <th>Credits</th>
                                <th>Adjustment</th>
                                <th>W/Tax</th>
                                <th>Amt. Applied</th>
                                <th>Status</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {purchasePaymentViews.map((pp) => (
                                <tr key={pp.id} className="hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5">{pp.id}</td>
                                    <td>{pp.drNo}</td>
                                    <td>{pp.invNo}</td>
                                    <td>{pp.orderDate.toLocaleDateString()}</td>
                                    <td>{pp.amount.toFixed(2)}</td>
                                    <td>{pp.balance.toFixed(2)}</td>
                                    <td>{pp.credits.toFixed(2)}</td>
                                    <td>{pp.adjustment.toFixed(2)}</td>
                                    <td>{pp.wTax.toFixed(2)}</td>
                                    <td>{pp.amountApplied.toFixed(2)}</td>
                                    <td>{pp.statusName}</td>
                                    <td>{pp.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PurchasePayment