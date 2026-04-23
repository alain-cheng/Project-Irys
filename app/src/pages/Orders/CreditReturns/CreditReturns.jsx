import { useMemo } from "react"

import { creditMemo, getAllCreditMemo } from "../../../MockData/creditMemo"
import { getAllCustomers, getCustomerById } from "../../../MockData/customers"
import { getAllItems, getItemById } from "../../../MockData/items"

function CreditReturns() {
    const creditMemoView = useMemo(() => {
        const customersMap = Object.fromEntries(
            getAllCustomers().map(c => [c.id, c])
        )

        const itemsMap = Object.fromEntries(
            getAllItems().map(i => [i.id, i])
        )

        return getAllCreditMemo().map(cm => ({
            ...cm,
            customerName: customersMap[cm.customerId]?.name ?? "-",
            itemNo: itemsMap[cm.itemId]?.id ?? "-",
        }))
    }, [])

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Credit Returns</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>P.O. No.</th>
                                <th>Credit No.</th>
                                <th>Item No.</th>
                                <th>Quantity</th>
                                <th>Bad Qty</th>
                                <th>Unit Price</th>
                                <th>Discount</th>
                                <th>Amount</th>
                                <th>Replaced</th>
                                <th>Amount Replaced</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {creditMemoView.map((cm) => (
                                <tr key={cm.id} className=" hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5 ">{cm.id}</td>
                                    <td>{cm.customerName}</td>
                                    <td>{cm.date.toLocaleDateString()}</td>
                                    <td>{cm.poNumber}</td>
                                    <td>{cm.creditId}</td>
                                    <td>{cm.itemNo}</td>
                                    <td>{cm.quantity}</td>
                                    <td>{cm.badQty}</td>
                                    <td>{cm.unitPrice}</td>
                                    <td>{cm.discount}</td>
                                    <td>{cm.amount}</td>
                                    <td>{cm.replaced}</td>
                                    <td>{cm.amountReplaced}</td>
                                    <td>{cm.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    )
}

export default CreditReturns