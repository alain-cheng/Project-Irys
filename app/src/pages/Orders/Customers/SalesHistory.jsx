import { useState } from "react"

import { getSalesOrderByCustomerId } from "../../../MockData/salesOrder"

import CustomerNav from "./components/CustomerNav"
import { getPaymentBySalesOrderId } from "../../../MockData/payments"

function SalesHistory() {
    const [viewedCustomer, setViewedCustomer] = useState(1000)

    const [salesHistoryView, setSalesHistoryView] = useState(() => {
        const customerOrders = getSalesOrderByCustomerId(viewedCustomer)

        return customerOrders.map(order => {
            const payment = getPaymentBySalesOrderId(order.id)

            return {
                orderDate: order.orderDate.toLocaleDateString(),
                orderNumber: order.orderNumber,
                amount: order.amount.toFixed(2),
                balance: payment.balance.toFixed(2),
                amountPaid: payment.amount.toFixed(2),
                adjustments: payment.adjustment.toFixed(2),
                returns: 0.00, //
                // status: order.closed ? "Closed" : "Open",
                // items
            }
        })
    }, [viewedCustomer, setViewedCustomer])


    return(
        <div className="flex flex-col gap-2 h-full">
            <CustomerNav />

            <h1 className="text-2xl text-text mb-5">Sales History</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">Order Date</th>
                                <th>Order No.</th>
                                <th>Amount</th>
                                <th>Balance</th>
                                <th>Amount Paid</th>
                                <th>Adjustments</th>
                                <th>Returns</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {salesHistoryView.map((s, index) => (
                                <tr key={s} className={`${index % 2 === 0 ? "bg-background" : "bg-background-light"} hover:bg-accent-soft transition`}>
                                    <td className="sticky left-0 z-5 ">{s.orderDate}</td>
                                    <td>{s.orderNumber}</td>
                                    <td>{s.amount}</td>
                                    <td>{s.balance}</td>
                                    <td>{s.amountPaid}</td>
                                    <td>{s.adjustments}</td>
                                    <td>{s.returns}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SalesHistory