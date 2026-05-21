import { paymentHistory, getAllPaymentHistory } from "../../../MockData/paymentHistory"

import CustomerNav from "./components/CustomerNav"

function PaymentHistory() {
    return(
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-2xl text-text mb-5">Payment History</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10">Payment ID</th>
                                <th>Amount</th>
                                <th>Payment Mode</th>
                                <th>Bank Name</th>
                                <th>Check No.</th>
                                <th>Check Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {getAllPaymentHistory().map((p, index) => (
                                <tr 
                                    key={p.id} 
                                    className={`${index % 2 === 0 ? "bg-background" : "bg-background-light"} hover:bg-accent-soft transition`}>
                                    <td className="sticky left-0 z-5">{p.paymentId}</td>
                                    <td>{p.amount}</td>
                                    <td>{p.paymentMode}</td>
                                    <td>{p.bankName}</td>
                                    <td>{p.checkNumber}</td>
                                    <td>{p.checkDate.toLocaleDateString()}</td>
                                    <td>{p.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory