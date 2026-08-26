import { useMemo, useState } from "react"
import { useOutletContext } from "react-router-dom"

import { getAllCustomers, getCustomerById } from "../../../../MockData/customers"
import { getPaymentsByCustomerId } from "../../../../MockData/payments"
import { getAppliedPaymentsByPaymentID } from "../../../../MockData/appliedPayments"

import CustomerNav from "../components/CustomerNav"


function PaymentHistory() {
    const { selectedCustomer, setSelectedCustomer } = useOutletContext()

    const customer = useMemo(() => {
        if (selectedCustomer) return getCustomerById(selectedCustomer)
        
        return null
    }, [selectedCustomer])

    const paymentHistoryView = useMemo(() => {
        if (!selectedCustomer) return []

        const customerPayments = getPaymentsByCustomerId(selectedCustomer)

        return customerPayments.map(payment => {

            const appliedPayments = getAppliedPaymentsByPaymentID(payment.id).map(ap => {
                return {
                    amountApplied: ap.amountApplied,
                    adjustment: ap.adjustment,
                    credits: ap.credits,
                    wtax: ap.wtax,
                }
            })

            return {
                paymentDate: payment.paymentDate,
                paymentId: payment.id,
                amount: appliedPayments.reduce((sum, ap) => sum += ap.amountApplied, 0),
                mode: payment.paymentMode,
                bankName: payment.bankName,
                checkNo: payment.checkNo,
                checkDate: payment.checkDate,
                status: payment.status,
            }
        })
    }, [selectedCustomer])

    const totalAmount = useMemo(() => {
        return paymentHistoryView.reduce((sum, p) => sum += p.amount, 0)
    }, [paymentHistoryView])

    return(
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-2xl text-text">Payment History</h1>

            <div className="flex">
                <select 
                    className="w-15 px-2 py-1 text-center text-sm border border-border-soft appearance-none cursor-pointer"
                    defaultValue={"0"}
                    onChange={(e) => {
                        setSelectedCustomer(Number(e.target.value))
                        e.target.value = "0"
                    }}
                >
                    <option value={0} disabled>Find</option>
                    {getAllCustomers().map((customer) => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
            </div>

            {customer && (
                <div className="px-2 py-1 border rounded-lg text-sm border-border-soft bg-background">
                    <p className="text-text">Customer: {customer.name}</p>
                </div>
            )}

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10">Payment Date</th>
                                <th>Payment ID</th>
                                <th>Amount</th>
                                <th>Mode</th>
                                <th>Bank Name</th>
                                <th>Check No.</th>
                                <th>Check Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {paymentHistoryView.length > 0 ? (
                                paymentHistoryView.map((p, index) => (
                                    <tr key={index} className={`${index % 2 === 0 ? "bg-background" : "bg-background-light"}`}>
                                        <td className="sticky left-0 z-5">{p.paymentDate.toLocaleDateString()}</td>
                                        <td>{p.paymentId}</td>
                                        <td>{p.amount.toFixed(2)}</td>
                                        <td>{p.mode}</td>
                                        <td>{p.bankName}</td>
                                        <td>{p.checkNo}</td>
                                        <td>{p.checkDate.toLocaleDateString()}</td>
                                        <td>{p.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="bg-background">
                                    <td colSpan={8} className="text-center">
                                        No payment records found for this customer.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                        
                        {paymentHistoryView.length !== 0 && (
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td className="font-bold">Total</td>
                                    <td>{totalAmount.toFixed(2)}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory