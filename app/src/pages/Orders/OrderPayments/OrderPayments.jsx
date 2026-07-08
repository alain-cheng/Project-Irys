import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { payments, getAllPayments, getPaymentsByCustomerId, getPaymentById } from "../../../MockData/payments";
import { getAllCustomers, getCustomerById } from "../../../MockData/customers";
import { getAllSalesOrder,  getSalesOrderById } from "../../../MockData/salesOrder";
import { getAppliedPaymentsByPaymentID } from "../../../MockData/appliedPayments";

import { getOrderTotalAmount } from "../../../helpers/helpers";

function OrderPayments() {
    const navigate = useNavigate()

    const [paymentId, setPaymentId] = useState(4001)
    const [isOpenModal, setIsOpenModal] = useState(false) 

    const payment = useMemo(() => {
        if (!paymentId) return null

        return getPaymentById(Number(paymentId))
    }, [paymentId])

    const customer = useMemo(() => {
        if (!payment) return null

        return getCustomerById(payment.customerId)
    }, [payment])

    const findEntriesView = useMemo(() => {
        const customersMap = Object.fromEntries(
            getAllCustomers().map(c => [c.id, c])
        )

        return getAllPayments().map(entry => ({
            ...entry,
            customerName: customersMap[entry.customerId]?.name ?? "-",
        }))
    }, [])

    const apView = useMemo(() => {
        const salesOrdersMap = Object.fromEntries(
            getAllSalesOrder().map(so => [so.id, so])
        )

        return getAppliedPaymentsByPaymentID(paymentId).map(payment => ({
            ...payment,
            orderNumber: salesOrdersMap[payment.salesOrderId]?.orderNumber ?? "-",
            orderDate: salesOrdersMap[payment.salesOrderId]?.orderDate ?? "-",
            amount: getOrderTotalAmount(getSalesOrderById(payment.salesOrderId)),
            balance: 0.00, // to be computed from totalAmount - totalPaid
        }))
    }, [payment])

    const amountPaid = useMemo(() => {
        return apView.reduce((sum, p) => sum + p.amountApplied, 0)
    }, [apView])

    return(
        <div className="flex flex-col gap-2 h-full py-5">
            <h1 className="text-2xl text-text mb-5">Order Payments</h1>

            <div className="flex flex-col gap-3 px-2 py-1 text-sm border border-border-soft bg-background">
                <div className="relative">
                    <button 
                        className="px-2 py-1 border border-border-soft cursor-pointer"
                        onClick={() => setIsOpenModal(prev => !prev)}
                    >
                        Find
                    </button>

                    {isOpenModal && (
                        <div className="absolute top-full left-0 w-200 z-50 border">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>Payment ID</th>
                                        <th>Customer</th>
                                        <th>Payment Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {findEntriesView.map((entry, index) => (
                                        <tr
                                            key={entry.id}
                                            onClick={() => {
                                                setIsOpenModal(false)
                                                setPaymentId(entry.id)
                                            }}
                                            className={`
                                                ${ Number(paymentId) === entry.id
                                                    ? "bg-yellow-200"
                                                    : index % 2 === 0
                                                        ? "bg-background"
                                                        : "bg-background-light"
                                                }
                                                hover:bg-accent-soft transition cursor-pointer
                                            `}
                                        >
                                            <td>{entry.id}</td>
                                            <td>{entry.customerName}</td>
                                            <td>{entry.paymentDate.toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                
                <div className="flex gap-2 py-2 border border-border-soft">
                    <div className="flex flex-col flex-1 gap-3">
                        <div className="flex items-center gap-3">
                            <label className="w-20 text-right shrink-0">Payment ID</label>
                            <input
                                className="px-1 w-20 border"
                                type="text"
                                value={payment?.id ?? "-"}
                                disabled
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="w-20 text-right shrink-0">Date</label>
                            <input
                                className="px-1 w-20 border"
                                type="text"
                                value={payment?.paymentDate.toLocaleDateString() ?? "-"}
                                disabled
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="w-20 text-right shrink-0">Remarks</label>
                            <textarea
                                className="px-1 resize-none border w-full"
                                rows={2}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col flex-1 gap-3">
                        <div className="flex items-center gap-3">
                            <label className="w-15 text-right shrink-0">Customer</label>
                            <input
                                className="px-1 w-60 border"
                                type="text"
                                value={customer?.name ?? "-"}
                                disabled
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="w-15 text-right shrink-0">Collector</label>
                            <input
                                className="px-1 w-60 border"
                                type="text"
                                value={payment?.collector ?? "-"}
                                disabled
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="w-25 text-right shrink-0">Payment Mode</label>
                            <input
                                className="px-1 w-25 border"
                                type="text"
                                value={payment?.paymentMode ?? "-"}
                                disabled
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <label className="w-25 text-right shrink-0">Amount Paid</label>
                            <input
                                className="w-30 text-right font-bold border"
                                type="number"
                                value={amountPaid.toFixed(2)}
                                disabled
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">Order Number</th>
                                <th>CI No.</th>
                                <th>Order Date</th>
                                <th>Amount</th>
                                <th>Balance</th>
                                <th>Credits</th>
                                <th>Adjustment</th>
                                <th>W/Tax</th>
                                <th>Amt. Applied</th>
                            </tr>
                        </thead>

                        <tbody>
                            {apView.map((payment) => (
                                <tr 
                                    key={payment.id} 
                                    className="bg-background"
                                >
                                    <td className="sticky left-0 z-5 ">{payment.orderNumber}</td>
                                    <td>{payment.ciNumber}</td>
                                    <td>{payment.orderDate.toLocaleDateString()}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.balance.toFixed(2)}</td>
                                    <td>{payment.credits.toFixed(2)}</td>
                                    <td>{payment.adjustment.toFixed(2)}</td>
                                    <td>{payment.wtax.toFixed(2)}</td>
                                    <td>{payment.amountApplied.toFixed(2)}</td>
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