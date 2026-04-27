import { useMemo } from "react"

import { getAllReceives } from "../../../MockData/receive"
import { getAllUnits } from "../../../MockData/units"
import { getAllStatuses } from "../../../MockData/status"

import formatDiscount from "../../../helpers/helpers"

function Receive () {
    const receiveViews = useMemo(() => {
        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        const statusesMap = Object.fromEntries(
            getAllStatuses().map(s => [s.id, s])
        )

        return getAllReceives().map(r => ({
            ...r,
            unitName: unitsMap[r.unitId]?.unitName ?? "-",
            statusName: statusesMap[r.statusId]?.statusName ?? "-",
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
                                <th className="sticky left-0 top-0 z-10">Purchase No.</th>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Packaging</th>
                                <th>Unit Price</th>
                                <th>Discount</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {receiveViews.map((r) => (
                                <tr key={r.id} className="hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5">{r.id}</td>
                                    <td>{r.productName}</td>
                                    <td>{r.quantity}</td>
                                    <td>{r.unitName}</td>
                                    <td>{r.packaging}</td>
                                    <td>{r.unitPrice}</td>
                                    <td>{formatDiscount(r.discountTypeId, r.discount)}</td>
                                    <td>{r.amount}</td>
                                    <td>{r.statusName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Receive