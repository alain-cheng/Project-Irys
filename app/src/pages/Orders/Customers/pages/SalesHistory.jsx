import { useEffect, useMemo, useState } from "react"
import { useOutletContext } from "react-router-dom"
import { Funnel } from "lucide-react"

import { getAllCustomers, getCustomerById } from "../../../../MockData/customers"
import { getSalesOrderByCustomerId } from "../../../../MockData/salesOrder"
import { getSalesOrderItemsBySOId } from "../../../../MockData/salesOrderItems"
import { getPaymentBySalesOrderId } from "../../../../MockData/payments"
import { getAllItems } from "../../../../MockData/items"
import { getAllUnits } from "../../../../MockData/units"

import { formatDiscount, getOrderTotalAmount } from "../../../../helpers/helpers"

import SalesHistoryFilter from "./components/SalesHistoryFilter"
import Tooltip from "../../../components/Tooltip"
import useSalesHistoryFilter from "./hooks/useSalesHistoryFilter"

function SalesHistory() {
    const { selectedCustomer, setSelectedCustomer } = useOutletContext()

    const [selectedRow, setSelectedRow] = useState(null) // value based on salesOrder.id
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const { 
        paymentStatus, 
        setPaymentStatus 
    } = useSalesHistoryFilter() // filter states

    const customer = useMemo(() => {
        if (selectedCustomer) return getCustomerById(selectedCustomer)
        
        return null
    }, [selectedCustomer])

    const salesHistoryView = useMemo(() => {
        if (!selectedCustomer) return []

        const customerOrders = getSalesOrderByCustomerId(selectedCustomer)

        return customerOrders
            .map(order => {
                const payment = getPaymentBySalesOrderId(order.id) ?? { 
                    // if unpaid order
                    balance: getOrderTotalAmount(order),
                    amount: 0.00,
                    adjustment: 0.00,
                }
                
                return {
                    id: order.id,
                    orderDate: order.orderDate.toLocaleDateString(),
                    orderNumber: order.orderNumber,
                    amount: getOrderTotalAmount(order),
                    balance: payment.balance,
                    amountPaid: payment.amount,
                    adjustments: payment.adjustment,
                    returns: 0.00, //
                    // status: order.closed ? "Closed" : "Open",
                }
            })
            .filter(entry => {
                if (paymentStatus === "all") return true

                if (paymentStatus === "unpaid_sales") {
                    return entry.amountPaid === 0
                }

                return true
            })
    }, [selectedCustomer, paymentStatus])

    const salesHistoryItemsView = useMemo(() => {
        if (!selectedRow) return []

        const itemsMap = Object.fromEntries(
            getAllItems().map(i => [i.id, i])
        )

        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        return getSalesOrderItemsBySOId(selectedRow).map(itemOrder => ({
            ...itemOrder,
            itemName: itemsMap[itemOrder.itemId].itemName ?? "-",
            unit: unitsMap[itemsMap[itemOrder.itemId].unitId].unitName ?? "-",
        }))
    }, [selectedRow])

    const {
        totalAmount,
        totalBalance,
        totalPaid,
        totalAdjustments,
        totalReturns,
    } = useMemo(() => {
        return salesHistoryView.reduce((acc, s) => {
            acc.totalAmount += s.amount
            acc.totalBalance += s.balance
            acc.totalPaid += s.amountPaid
            acc.totalAdjustments += s.adjustments
            acc.totalReturns += s.returns
            return acc
        }, {
            totalAmount: 0,
            totalBalance: 0,
            totalPaid: 0,
            totalAdjustments: 0,
            totalReturns: 0,
        })
    }, [salesHistoryView])

    return(
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-2xl text-text">Sales History</h1>

            <SalesHistoryFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                paymentStatus={paymentStatus}
                setPaymentStatus={setPaymentStatus}
            />

            <div className="flex space-x-2 items-center">
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

                <div className="relative group h-full">
                    <button 
                        className="px-2 py-1 h-full border border-border-soft cursor-pointer"
                        onClick={() => setIsFilterOpen(true)}
                    >
                        <Funnel size={16} />
                    </button>

                    <Tooltip text="Filters" />
                </div>
            </div>
            

            {customer && (
                <div className="px-2 py-1 border rounded-lg text-sm text-text border-border-soft bg-background">
                    <p>Customer: {customer.name}</p>
                    {/* <p>Address: {[customer.address, customer.city, customer.province].filter(Boolean).join(", ")}</p>
                    <p>Phone: {customer.phone}</p> */}
                </div>
            )}

            <div className="min-h-0">
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
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {salesHistoryView.map((s, index) => (
                                <tr 
                                    key={s.id} 
                                    onClick={() => setSelectedRow(prev => prev === s.id ? 0 : s.id)}
                                    className={`
                                        ${ selectedRow === s.id
                                            ? "bg-yellow-200"
                                            : index % 2 === 0 
                                                ? "bg-background" 
                                                : "bg-background-light"
                                        } 
                                        hover:bg-accent-soft transition cursor-pointer
                                    `}
                                >
                                    <td className="sticky left-0 z-5 ">{s.orderDate}</td>
                                    <td>{s.orderNumber}</td>
                                    <td>{s.amount.toFixed(2)}</td>
                                    <td>{s.balance.toFixed(2)}</td>
                                    <td>{s.amountPaid.toFixed(2)}</td>
                                    <td>{s.adjustments.toFixed(2)}</td>
                                    <td>{s.returns}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                        
                        {salesHistoryView.length !== 0 && (
                            <tfoot>
                                <tr>
                                    <td className="font-bold">Total</td>
                                    <td></td>
                                    <td>{totalAmount.toFixed(2)}</td>
                                    <td>{totalBalance.toFixed(2)}</td>
                                    <td>{totalPaid.toFixed(2)}</td>
                                    <td>{totalAdjustments.toFixed(2)}</td>
                                    <td>{totalReturns.toFixed(2)}</td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>

            <div className="min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">Item Name</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Unit Price</th>
                                <th>Discounts</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {salesHistoryItemsView.map((itemOrder, index) => (
                                <tr 
                                    key={itemOrder.id}
                                    className={`
                                        ${ index % 2 === 0 
                                                ? "bg-background" 
                                                : "bg-background-light"
                                        } 
                                    `}
                                >
                                    <td className="sticky left-0 z-5 ">{itemOrder.itemName}</td>
                                    <td>{itemOrder.quantity}</td>
                                    <td>{itemOrder.unit}</td>
                                    <td>{itemOrder.unitPrice.toFixed(2)}</td>
                                    <td>{formatDiscount(itemOrder.discountTypeId, itemOrder.discounts)}</td>
                                    <td>{itemOrder.amount.toFixed(2)}</td>
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