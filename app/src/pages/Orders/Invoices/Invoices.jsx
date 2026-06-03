import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { invoices, getAllInvoices } from "../../../MockData/invoices"
import { getAllSalesOrder } from "../../../MockData/salesOrder"
import { getAllStatuses } from "../../../MockData/status"
import { getAllCustomers, getCustomerById } from "../../../MockData/customers"
import { getAllItems } from "../../../MockData/items"
import { getSalesOrderItemsBySOId } from "../../../MockData/salesOrderItems"
import { getAllUnits } from "../../../MockData/units"

import { formatDiscount } from "../../../helpers/helpers"

function Invoices() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const salesOrderId = searchParams.get("salesOrderId")

    const [selectedEntry, setSelectedEntry] = useState(null) // Sales Order Entry
    const [isOpenModal, setIsOpenModal] = useState(false) 
    const [currCustomer, setCurrCustomer] = useState(null)

    const findEntriesView = useMemo(() => {
        const statusesMap = Object.fromEntries(
            getAllStatuses().map(s => [s.id, s])
        )

        const customersMap = Object.fromEntries(
            getAllCustomers().map(c => [c.id, c])
        )

        return getAllSalesOrder()
            .filter(so => statusesMap[so.statusId]?.statusName.toLowerCase() === "open")
            .map(entry => ({
                ...entry,
                customerName: customersMap[entry.customerId]?.name ?? "-",
            }))
    }, [])

    const itemsView = useMemo(() => {
        if (!selectedEntry) return []

        const itemsMap = Object.fromEntries(
            getAllItems().map(i => [i.id, i])
        )

        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        return getSalesOrderItemsBySOId(selectedEntry?.id).map(itemOrder => ({
            ...itemOrder,
            itemName: itemsMap[itemOrder.itemId]?.itemName ?? "-",
            unit: unitsMap[itemsMap[itemOrder.itemId]?.unitId].unitName ?? "-",
        }))
    }, [selectedEntry])

    // Sets the current customer focus when an unprocessed valid order entry is selected from the list 
    useEffect(() => {
        if (!selectedEntry) return

        setCurrCustomer(getCustomerById(selectedEntry?.customerId))
    }, [selectedEntry])

    return (
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Invoices</h1>

            <div className="relative">
                <button
                    className="px-2 py-1 border border-border-soft"
                    onClick={() => setIsOpenModal(prev => !prev)}
                >
                    Find
                </button>

                {isOpenModal && (
                    <div className="absolute top-full left-0 w-200 z-50 border">
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>S.O. ID</th>
                                    <th>Order No.</th>
                                    <th>Customer</th>
                                    <th>Order Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {findEntriesView.map((entry, index) => (
                                    <tr
                                        key={entry.id}
                                        onClick={() => {
                                            setSelectedEntry(prev => prev?.id === entry.id ? null : entry)
                                            setIsOpenModal(false)
                                        }}
                                        className={`
                                            ${ selectedEntry?.id === entry.id
                                                ? "bg-yellow-200"
                                                : index % 2 === 0
                                                    ? "bg-background"
                                                    : "bg-background-light"
                                            }    
                                            hover:bg-accent-soft transition cursor-pointer
                                        `}
                                    >
                                        <td>{entry.id}</td>
                                        <td>{entry.orderNumber}</td>
                                        <td>{entry.customerName}</td>
                                        <td>{entry.orderDate.toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
            {/* FORM CONTENTS */}
            <div className="flex gap-2 px-2 py-1 border border-border-soft bg-background">
                {/* LEFT */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Customer</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={currCustomer?.name}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Address</label>
                        <textarea
                            className="flex-1 px-1 border"
                            rows={2}
                            value={[
                                currCustomer?.address, 
                                currCustomer?.city, 
                                currCustomer?.province
                            ].filter(Boolean).join(", ")}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Collector</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                        />

                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Salesperson</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={currCustomer?.salesman}
                        />
                    </div>
                </div>
                
                {/* RIGHT */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Order No.</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={selectedEntry?.orderNumber}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3">
                            <label className="w-25 text-right shrink-0">Due Date</label>
                            <input
                                className="flex-1 px-1 border"
                                type="date"
                            />
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <label className="w-25 text-right shrink-0">Order Date</label>
                            <input
                                className="flex-1 px-1 border"
                                type="date"
                                value={selectedEntry?.orderDate?.toISOString().split("T")[0] || ""}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">DR No.</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                        />

                        <label className="w-25 text-right shrink-0">Invoice No.</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">S.O. ID</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                        />

                        <label className="w-25 text-right shrink-0">P.O. No.</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Term</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Via</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                        />
                    </div>
                </div>
            </div>

            
            <div className="bg-background">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Packaging</th>
                            <th>Unit Price</th>
                            <th>Discount</th>
                            <th>Amount</th>
                        </tr>
                    </thead>

                    <tbody>
                        {itemsView.map((itemOrder, index) => (
                            <tr>
                                <td>{itemOrder.itemName}</td>
                                <td>{itemOrder.quantity}</td>
                                <td>{itemOrder.unit}</td>
                                <td>{}</td>
                                <td>{itemOrder.unitPrice.toFixed(2)}</td>
                                <td>{formatDiscount(itemOrder.discountTypeId, itemOrder.discounts)}</td>
                                <td>{itemOrder.amount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Invoices