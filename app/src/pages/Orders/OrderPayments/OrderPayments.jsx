import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { payments, getAllPayments } from "../../../MockData/payments";
import { getAllCustomers, getCustomerById } from "../../../MockData/customers";
import { getAllSalesOrder, getSalesOrderById } from "../../../MockData/salesOrder";

function OrderPayments() {
    const navigate = useNavigate()

    const paymentsView = useMemo(() => {
        const customersMap = Object.fromEntries(
            getAllCustomers().map(c => [c.id, c])
        )

        const salesOrderMap = Object.fromEntries(
            getAllSalesOrder().map(so => [so.id, so])
        )

        return getAllPayments().map(payment => ({
            ...payment,
            customerName: customersMap[payment.customerId]?.name ?? "-",
            salesOrderNo: salesOrderMap[payment.salesOrderId]?.id ?? "-",
        }))
    }, [])

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Order Payments</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">Payment No.</th>
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
                            {paymentsView.map((payment) => (
                                <tr 
                                    key={payment.id} 
                                    onClick={() => navigate(`/orders/order_payments/${payment.id}`)}
                                    className="bg-background hover:bg-accent-soft transition cursor-pointer"
                                >
                                    <td className="sticky left-0 z-5 ">{payment.id}</td>
                                    <td>{payment.customerName}</td>
                                    <td>{payment.salesOrderNo}</td>
                                    <td>{payment.collector}</td>
                                    <td>{payment.ciNumber}</td>
                                    <td>{payment.orderDate.toLocaleDateString()}</td>
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