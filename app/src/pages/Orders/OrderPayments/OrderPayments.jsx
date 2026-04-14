import { payments, getAllPayments } from "../../../MockData/payments";
import { getCustomerById } from "../../../MockData/customers";
import { getSalesOrderById } from "../../../MockData/salesOrder";

function OrderPayments() {
    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Order Payments</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="bg-background">

                        <thead className="sticky top-0 z-10 bg-background border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 bg-background">Payment No.</th>
                                <th>Customer</th>
                                <th>Sales Order No.</th>
                                <th>Collector</th>
                                <th>CI No.</th>
                                <th>Order Date</th>
                                <th>Amount</th>
                                <th>Balance</th>
                                <th>Credits</th>
                                <th>Adjustment</th>
                                <th>W/Tax</th>
                                <th>Amount Applied</th>
                                <th>Payment Mode</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {getAllPayments().map((payment) => (
                                <tr key={payment.id} className="bg-background hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5 bg-background">{payment.id}</td>
                                    <td>{getCustomerById(payment.customerId)?.name ?? "-"}</td>
                                    <td>{getSalesOrderById(payment.salesOrderId)?.id ?? "-"}</td>
                                    <td>{payment.collector}</td>
                                    <td>{payment.ciNumber}</td>
                                    <td>{payment.orderDate}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.balance}</td>
                                    <td>{payment.credits}</td>
                                    <td>{payment.adjustment}</td>
                                    <td>{payment.wtax}</td>
                                    <td>{payment.amountApplied}</td>
                                    <td>{payment.paymentMode}</td>
                                    <td>{payment.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    )
}

export default OrderPayments