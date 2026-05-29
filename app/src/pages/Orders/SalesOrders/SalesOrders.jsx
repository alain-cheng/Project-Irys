import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import { getAllItems, items } from "../../../MockData/items"
import { getAllUnits, getUnitById } from "../../../MockData/units"
import { getAllCustomers, getCustomerById } from "../../../MockData/customers"
import { getAllSalesOrder } from "../../../MockData/salesOrder"
import { getAllSalesOrderItems, getSalesOrderItemsBySOId } from "../../../MockData/salesOrderItems"

import { formatDiscount } from "../../../helpers/helpers"

import StatusLabel from "../../components/StatusLabel"
import { getAllStatuses, getStatusById } from "../../../MockData/status"

function SalesOrders () {
    const navigate = useNavigate()

    const [selectedCustomerId, setSelectedCustomerId] = useState("")
    const [selectedSalesOrder, setSelectedSalesOrder] = useState(null) // selected SO Object

    const [salesOrdersView, setSalesOrdersView] = useState(() => {
        const customersMap = Object.fromEntries(
            getAllCustomers().map(c => [c.id, c])
        )

        const statusesMap = Object.fromEntries(
            getAllStatuses().map(s => [s.id, s])
        )

        return getAllSalesOrder().map(so => ({
            ...so,
            customerName: customersMap[so.customerId]?.name ?? "-",
            status: statusesMap[so.statusId]?.statusName ?? "-",
        }))
    }, [])

    const filteredView = useMemo(() => {
        if (!selectedCustomerId) return salesOrdersView

        return salesOrdersView.filter(so => so.customerId === Number(selectedCustomerId))
    }, [salesOrdersView, selectedCustomerId])


    const salesOrdersItemsView = useMemo(() => {
        if (!selectedSalesOrder) return []

        const itemsMap = Object.fromEntries(
            getAllItems().map(i => [i.id, i])
        )

        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        return getSalesOrderItemsBySOId(selectedSalesOrder.id).map(soi => ({
            ...soi,
            itemName: itemsMap[soi.itemId].itemName ?? "-",
            unit: unitsMap[itemsMap[soi.itemId].unitId].unitName ?? "-",
        }))
    }, [selectedSalesOrder])

    const customer = useMemo(() => {
        return getCustomerById(Number(selectedCustomerId))
    }, [selectedCustomerId])

    return(
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-2xl text-text">Sales Orders</h1>

            <div className="flex flex-col gap-2 p-2 border border-border-soft rounded-lg bg-background">
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
                
                {customer && (
                    <div className="flex space-x-2">
                        <div>Address:</div>
                        <div>{[customer.address, customer.city, customer.province].filter(Boolean).join(", ")}</div>
                    </div>
                )}
                
            </div>

            <div className="min-h-0">
                <div className="w-full max-h-50 overflow-auto border border-border-soft">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">Order Number</th>
                                <th>Order Date</th>
                                <th>Customer</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredView.map((so, index) => (
                                <tr 
                                    key={so.id} 
                                    onClick={() => setSelectedSalesOrder(prev => prev?.id === so.id ? null : so)}
                                    onDoubleClick={() => navigate(`/orders/sales_orders/${so.id}`)}
                                    className={`
                                        ${ selectedSalesOrder?.id === so.id
                                            ? "bg-yellow-200"
                                            : index % 2 === 0
                                                ? "bg-background"
                                                : "bg-background-light"
                                        }
                                        hover:bg-accent-soft transition cursor-pointer
                                    `}
                                >
                                    <td className="sticky left-0 z-5">{so.orderNumber}</td>
                                    <td className="">{so.orderDate.toLocaleDateString()}</td>
                                    <td className="">{so.customerName}</td>
                                    <td>{so.status.toLocaleUpperCase()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>

            <div className="min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">Item Name</th>
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
                            {salesOrdersItemsView.map((soi, index) => (
                                <tr 
                                    key={soi.id}
                                    className={`
                                        ${ index % 2 === 0
                                                ? "bg-background"
                                                : "bg-background-light"
                                        }
                                    `}
                                >
                                    <td className="sticky left-0 z-5 ">{soi.itemName}</td>
                                    <td>{soi.quantity}</td>
                                    <td>{soi.unit}</td>
                                    <td>{soi.unitPrice.toFixed(2)}</td>
                                    <td>{formatDiscount(soi.discountTypeId, soi.discounts)}</td>
                                    <td>{soi.amount.toFixed(2)}</td>
                                    <td>{soi.invoiced.toFixed(2)}</td>
                                    <td>{soi.onHand.toFixed(2)}</td>
                                    <td><StatusLabel status={soi.closed}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>

            {selectedSalesOrder && (
                <div>
                    <button
                        className="
                            px-1 py-2 border border-border-soft bg-background cursor-pointer 
                            disabled:opacity-50 
                            disabled:cursor-not-allowed
                        "
                        onClick={() => console.log("Creating invoice...")}
                        disabled={!(selectedSalesOrder?.status?.toLowerCase() === "open")}
                    >
                        Create Invoice
                    </button>
                </div>
            )}
        </div>
    )
}

export default SalesOrders