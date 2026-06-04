import { useEffect, useMemo, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

import { invoices, getAllInvoices } from "../../../MockData/invoices"
import { getAllSalesOrder, getSalesOrderById } from "../../../MockData/salesOrder"
import { getAllStatuses } from "../../../MockData/status"
import { getAllCustomers, getCustomerById } from "../../../MockData/customers"
import { getAllItems } from "../../../MockData/items"
import { getSalesOrderItemsBySOId } from "../../../MockData/salesOrderItems"
import { getAllUnits } from "../../../MockData/units"

import { formatDiscount, getOrderTotalAmount } from "../../../helpers/helpers"

function Invoices() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const salesOrderId = searchParams.get("salesOrderId")

    const [isOpenModal, setIsOpenModal] = useState(false) 
    const [invoiceDraft, setInvoiceDraft] = useState({
        invoiceNumber: "",
        poNumber: "",
        customerName: "",
        customerId: null,
        address: "",
        collectorId: null,
        collector: "",
        salesperson: "",
        dueDate: "",
        drNumber: 0,
        salesOrderId: null,
        orderNumber: "",
        orderDate: "",
        term: "",
        via: "",
        isCancelled: false,
        isNoComm: false,
        isCommPaid: false,
        isHeavy: false,
        user: null,
        driver: "",
        helper: "",
        truck: "",
        adjustments: 0.00,
        rebates: 0.00,
        creditsApplied: 0.00,
        returns: 0.00,
        amountPaid: 0.00,
        balance: 0.00,
        total: 0.00,
        isDraft: true,
    })

    // sets the current sales order to work on
    const salesOrder = useMemo(() => {
        if (!salesOrderId) return null

        return getSalesOrderById(Number(salesOrderId))
    }, [salesOrderId])

    // sets the customer in focus
    const customer = useMemo(() => {
        if (!salesOrder) return null

        return getCustomerById(salesOrder.customerId)
    }, [salesOrder])

    // to select other sales order entries available to work on
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

    // displays items ordered part of the sales order
    const itemsView = useMemo(() => {
        if (!salesOrder) return []

        const itemsMap = Object.fromEntries(
            getAllItems().map(i => [i.id, i])
        )

        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        return getSalesOrderItemsBySOId(salesOrder?.id).map(itemOrder => ({
            ...itemOrder,
            itemName: itemsMap[itemOrder.itemId]?.itemName ?? "-",
            unit: unitsMap[itemsMap[itemOrder.itemId]?.unitId].unitName ?? "-",
        }))
    }, [salesOrder])

    useEffect(() => {
        if (!salesOrder || !customer) return

        setInvoiceDraft({
            invoiceNumber: "",
            poNumber: "",
            customerName: customer.name,
            customerId: customer.id,
            address: [
                customer.address,
                customer.city,
                customer.province
            ].filter(Boolean).join(", "),
            collectorId: null,
            collector: "",
            salesperson: "",
            dueDate: "",
            drNumber: 0,
            salesOrderId: salesOrder.id,
            orderNumber: salesOrder.orderNumber,
            orderDate: salesOrder.orderDate,
            term: "",
            via: "",
            isCancelled: false,
            isNoComm: false,
            isCommPaid: false,
            isHeavy: false,
            user: null,
            driver: "",
            helper: "",
            truck: "",
            adjustments: 0.00,
            rebates: 0.00,
            creditsApplied: 0.00,
            returns: 0.00,
            amountPaid: 0.00,
            balance: 0.00,
            total: getOrderTotalAmount(salesOrder),
            isDraft: true,
        })
    }, [salesOrder, customer])

    return (
        <div className="flex flex-col gap-2 h-full py-5">
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
                                            setIsOpenModal(false)
                                            navigate(`/orders/invoices?salesOrderId=${entry?.id}`)
                                        }}
                                        className={`
                                            ${ Number(salesOrderId) === entry.id
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
            <div className="flex gap-2 px-2 py-1 text-sm border border-border-soft bg-background">
                {/* LEFT */}
                <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Customer</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.customerName ?? ""}
                            onChange={(e) => 
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    customerName: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Address</label>
                        <textarea
                            className="flex-1 px-1 border"
                            rows={2}
                            value={invoiceDraft?.address ?? ""}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    address: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Collector</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.collector ?? ""}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    collector: e.target.value
                                }))
                            }
                        />

                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Salesperson</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.salesperson ?? ""}
                            onChange={(e) => 
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    salesperson: e.target.value
                                }))
                            }
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
                            value={invoiceDraft?.orderNumber ?? ""}
                            onChange={(e) => 
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    orderNumber: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3">
                            <label className="w-25 text-right shrink-0">Due Date</label>
                            <input
                                className="flex-1 px-1 border"
                                type="date"
                                onChange={(e) => 
                                    setInvoiceDraft(prev => ({
                                        ...prev,
                                        dueDate: e.target.value
                                    }))
                                }
                            />
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <label className="w-25 text-right shrink-0">Order Date</label>
                            <input
                                className="flex-1 px-1 border"
                                type="date"
                                onChange={(e) =>
                                    setInvoiceDraft(prev => ({
                                        ...prev,
                                        orderDate: e.target.value
                                    }))
                                }
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">DR No.</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.drNumber}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    drNumber: e.target.value
                                }))
                            }
                        />

                        <label className="w-25 text-right shrink-0">Invoice No.</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.invoiceNumber}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    invoiceNumber: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">S.O. ID</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.salesOrderId}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    salesOrderId: e.target.value
                                }))
                            }
                        />

                        <label className="w-25 text-right shrink-0">P.O. No.</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.poNumber}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    poNumber: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Term</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.term}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    term: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="w-25 text-right shrink-0">Via</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.via}
                            onChange={(e) => 
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    via: e.target.value
                                }))
                            }
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

            <div className="text-sm border border-border-soft bg-background">
                <div className="flex space-x-2 text-[12px] items-center">
                    <div className="flex flex-col items-center">
                        <label>User</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.user}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    user: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <label>Driver</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.driver}
                            onChange={(e) => 
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    driver: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <label>Helper</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.helper}
                            onChange={(e) => 
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    helper: e.target.value
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <label>Truck</label>
                        <input
                            className="flex-1 px-1 border"
                            type="text"
                            value={invoiceDraft?.truck}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    truck: e.target.value
                                }))
                            }
                        />
                    </div>
                </div>

                <div className="flex space-x-2 text-[12px] items-center">
                    <div className="flex flex-col items-center">
                        <label>Adjustments</label>
                        <input
                            className="w-20 flex-1 px-1 border"
                            type="number"
                            placeholder="0.00"
                            value={invoiceDraft?.adjustments}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    adjustments: parseFloat(e.target.value)
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <label>Rebates</label>
                        <input
                            className="w-20 flex-1 px-1 border"
                            type="number"
                            placeholder="0.00"
                            value={invoiceDraft?.rebates}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    rebates: parseFloat(e.target.value)
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <label>Credits Applied</label>
                        <input
                            className="w-20 flex-1 px-1 border"
                            type="number"
                            placeholder="0.00"
                            value={invoiceDraft?.creditsApplied}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    creditsApplied: parseFloat(e.target.value)
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <label>Inv. Returns</label>
                        <input
                            className="w-20 flex-1 px-1 border"
                            type="number"
                            placeholder="0.00"
                            value={invoiceDraft?.returns}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    returns: parseFloat(e.target.value)
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <label>Amount Paid</label>
                        <input
                            className="w-20 flex-1 px-1 border"
                            type="number"
                            placeholder="0.00"
                            value={invoiceDraft?.amountPaid}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    amountPaid: parseFloat(e.target.value)
                                }))
                            }
                        />
                    </div>

                    <div className="flex flex-col items-center">
                        <label>Balance</label>
                        <input
                            className="w-20 flex-1 px-1 border"
                            type="number"
                            placeholder="0.00"
                            value={invoiceDraft?.balance}
                            onChange={(e) =>
                                setInvoiceDraft(prev => ({
                                    ...prev,
                                    balance: parseFloat(e.target.value)
                                }))
                            }
                        />
                    </div>
                </div>

                <div className="">
                    <div>
                        <label>Total</label>
                        <div className="w-25 px-2 py-1 text-right border">
                            {invoiceDraft?.total}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Invoices