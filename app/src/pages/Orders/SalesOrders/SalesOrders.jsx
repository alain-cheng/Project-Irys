import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getAllItems, items } from "../../../MockData/items"
import { getAllUnits, getUnitById } from "../../../MockData/units"
import { getAllCustomers } from "../../../MockData/customers"
import { getAllSalesOrder } from "../../../MockData/salesOrder"

import { formatDiscount } from "../../../helpers/helpers"

import StatusLabel from "../../components/StatusLabel"

function SalesOrders () {
    const navigate = useNavigate()

    const [selectedCustomerId, setSelectedCustomerId] = useState("")

    const [salesOrdersView, setSalesOrdersView] = useState(() => {
        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        const customersMap = Object.fromEntries(
            getAllCustomers().map(c => [c.id, c])
        )

        const itemsMap = Object.fromEntries(
            getAllItems().map(i => [i.id, i])
        )

        return getAllSalesOrder().map(so => ({
            ...so,
            customerName: customersMap[so.customerId]?.name ?? "-",
            unitName: unitsMap[so.unitId]?.unitName ?? "-",
            itemName: itemsMap[so.itemId]?.itemName ?? "-",
        }))
    }, [])

    const filteredView = useMemo(() => {
        if (!selectedCustomerId) return salesOrdersView

        return salesOrdersView.filter(so => so.customerId === Number(selectedCustomerId))
    }, [salesOrdersView, selectedCustomerId])

    return(
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-2xl text-text">Sales Orders</h1>

            <div className="p-2 border border-border-soft rounded-lg bg-background">
                <label className="flex items-center gap-2">
                    <span>Customer:</span>

                    <select
                        value={selectedCustomerId}
                        onChange={(e) => setSelectedCustomerId(e.target.value)}
                        className="px-2 py-1 border border-border-soft"
                    >
                        <option value="">All</option>
                        {getAllCustomers().map(customer => (
                            <option
                                key={customer.id}
                                value={customer.id}
                            >
                                {customer.id} - {customer.name}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">Order Number</th>
                                <th>Order Date</th>
                                <th>Customer</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Unit Price</th>
                                <th>Discounts</th>
                                <th>Amount</th>
                                <th>Invoiced</th>
                                <th>On Hand</th>
                                <th>Closed</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredView.map((so) => (
                                <tr 
                                    key={so.id} 
                                    onClick={() => navigate(`/orders/sales_orders/${so.id}`)}
                                    className="bg-background hover:bg-accent-soft transition cursor-pointer"
                                >
                                    <td className="sticky left-0 z-5 ">{so.orderNumber}</td>
                                    <td>{so.orderDate.toLocaleDateString()}</td>
                                    <td>{so.customerName}</td>
                                    <td>{so.itemName}</td>
                                    <td>{so.quantity}</td>
                                    <td>{so.unitName}</td>
                                    <td className="text-right">{so.unitPrice.toFixed(2)}</td>
                                    <td>{formatDiscount(so.discountTypeId, so.discounts)}</td>
                                    <td className="text-right">{so.amount}</td>
                                    <td>{so.invoiced}</td>
                                    <td>{so.onHand}</td>
                                    <td><StatusLabel status={so.closed}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    )
}

export default SalesOrders