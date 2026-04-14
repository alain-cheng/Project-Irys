import { creditMemo, getAllCreditMemo } from "../../../MockData/creditMemo"
import { getCustomerById } from "../../../MockData/customers"
import { getItemById } from "../../../MockData/items"

function CreditReturns() {
    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Credit Returns</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="bg-background">

                        <thead className="sticky top-0 z-10 bg-background border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 bg-background">ID</th>
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
                            {getAllCreditMemo().map((cm) => (
                                <tr key={cm.id} className="bg-background hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5 bg-background">{cm.id}</td>
                                    <td>{getCustomerById(cm.customerId)?.name ?? "-"}</td>
                                    <td>{cm.date}</td>
                                    <td>{cm.poNumber}</td>
                                    <td>{cm.creditId}</td>
                                    <td>{getItemById(cm.itemId)?.id ?? "-"}</td>
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