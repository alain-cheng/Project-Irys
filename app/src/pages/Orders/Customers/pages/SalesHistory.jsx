import { useMemo, useState } from "react"
import { useOutletContext } from "react-router-dom"

import { getSalesOrderByCustomerId } from "../../../../MockData/salesOrder"
import { getAllCustomers } from "../../../../MockData/customers"

import { getPaymentBySalesOrderId } from "../../../../MockData/payments"
import { getCustomerById } from "../../../../MockData/customers"

function SalesHistory() {
    const { selectedCustomer, setSelectedCustomer } = useOutletContext()

    const customer = useMemo(() => {
        if (selectedCustomer) return getCustomerById(selectedCustomer)
        
        return null
    }, [selectedCustomer])

    const salesHistoryView = useMemo(() => {
        if (!selectedCustomer) return []

        const customerOrders = getSalesOrderByCustomerId(selectedCustomer)

        return customerOrders.map(order => {
            const payment = getPaymentBySalesOrderId(order.id) ?? { 
                // if unpaid order
                balance: order.amount,
                amount: 0.00,
                adjustment: 0.00,
            }

            return {
                orderDate: order.orderDate.toLocaleDateString(),
                orderNumber: order.orderNumber,
                amount: order.amount,
                balance: payment.balance,
                amountPaid: payment.amount,
                adjustments: payment.adjustment,
                returns: "0.00", //
                // status: order.closed ? "Closed" : "Open",
                // items
            }
        })
    }, [selectedCustomer])

    return(
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-2xl text-text ">Sales History</h1>

            <div className="flex">
                <select 
                    className="w-15 px-2 py-1 text-center text-sm border border-border-soft appearance-none"
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
                    <p>Customer: {customer.name}</p>
                </div>
            )}

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
                                <tr key={index} className={`${index % 2 === 0 ? "bg-background" : "bg-background-light"} hover:bg-accent-soft transition`}>
                                    <td className="sticky left-0 z-5 ">{s.orderDate}</td>
                                    <td>{s.orderNumber}</td>
                                    <td>{s.amount.toFixed(2)}</td>
                                    <td>{s.balance.toFixed(2)}</td>
                                    <td>{s.amountPaid.toFixed(2)}</td>
                                    <td>{s.adjustments.toFixed(2)}</td>
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