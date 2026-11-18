import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import CopyButton from "../../components/CopyButton"
import StatusLabelV1 from "../../components/StatusLabelV1"

const generalFields = [
    ["Order Number", "id"],
    ["Order Date", "orderDate"],
    ["Customer ID", "customerId"],
    ["Order Status ID", "orderStatusId"],
    ["Total", "total"],
    ["Salesman ID", "salesman"],
    ["PO Number", "poNumber"],
    ["Term Code", "termCode"],
    ["Shipper ID", "shipperId"],
    ["User ID", "user"],
    ["Employee ID", "employeeId"],
]

const textFields = [
    ["Remarks", "remarks"],
    ["Notes", "notes"],
]

const discountColumns = Array.from({ length: 10 }, (_, index) => ({
    field: `sDisc${index + 1}`,
    label: `SDisc${index + 1}`,
}))

function SalesOrderDetails() {
    const { salesOrderId } = useParams()

    const [salesOrder, setSalesOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [salesOrderItems, setSalesOrderItems] = useState([])
    const [itemsLoading, setItemsLoading] = useState(true)
    const [itemsError, setItemsError] = useState(null)
    const [itemNames, setItemNames] = useState({})

    useEffect(() => {
        let active = true

        async function loadItemName(id) {
            try {
                const item = await invoke("get_item_by_id", { id })
                if (active) {
                    setItemNames(prev => ({ ...prev, [id]: item?.itemName ?? `Unknown item (#${id})` }))
                }
            } catch {
                if (active) setItemNames(prev => ({ ...prev, [id]: `Unavailable item (#${id})` }))
            }
        }

        async function loadItems(id) {
            try {
                const result = await invoke("get_sales_order_details_by_sales_order_id", { salesOrderId: id })
                if (!active) return

                setSalesOrderItems(result)
                const itemCodes = new Set(result.map(detail => detail.itemCode).filter(code => code != null))
                itemCodes.forEach(code => loadItemName(code))
            } catch (error) {
                if (active) setItemsError(String(error))
            } finally {
                if (active) setItemsLoading(false)
            }
        }

        async function loadSalesOrder() {
            setLoading(true)
            setError(null)
            setSalesOrder(null)
            setSalesOrderItems([])
            setItemsLoading(true)
            setItemsError(null)
            setItemNames({})

            try {
                const result = await invoke("get_sales_order_by_id", {
                    id: Number(salesOrderId),
                })
                if (active) {
                    setSalesOrder(result)
                    if (result) loadItems(result.id)
                }
            } catch (error) {
                if (active) setError(String(error))
            } finally {
                if (active) setLoading(false)
            }
        }

        loadSalesOrder()

        return () => {
            active = false
        }
    }, [salesOrderId])

    return (
        <div className="flex flex-col gap-3 text-text">
            {salesOrder && (
                <div className="rounded-lg border border-border-soft bg-background shadow-xs">
                    <h4 className="px-2 py-1 text-accent-strong">Sales Order: {salesOrder.id}</h4>
                </div>
            )}

            <h1>Sales Order Details</h1>

            {loading ? (
                <p role="status">Loading sales order...</p>
            ) : error ? (
                <p role="alert" className="text-red-700">DB Error: {error}</p>
            ) : !salesOrder ? (
                <p>Sales Order No. <b className="text-accent-strong">{salesOrderId}</b> was not found.</p>
            ) : (
                <div className="flex flex-col gap-5 rounded-lg border border-border-soft bg-background px-4 py-4 shadow-xs">
                    <section aria-labelledby="sales-order-information-heading" className="min-w-0 space-y-3">
                        <h3 id="sales-order-information-heading" className="text-accent-strong">Information</h3>
                        <div className="overflow-x-auto">
                            <table aria-label="Sales order information" className="w-full border border-border-soft shadow-xs overflow-hidden">
                                <tbody>
                                    {generalFields.map(([label, field], index) => {
                                        const value = field === "total"
                                            ? salesOrder.total.toFixed(2)
                                            : salesOrder[field] ?? "-"

                                        return (
                                            <tr key={field} className={index % 2 === 0 ? "bg-background" : "bg-background-light"}>
                                                <td className="w-48 font-semibold">{label}</td>
                                                <td className="w-full"><span className="whitespace-normal wrap-break-word">{value}</span></td>
                                                <td><CopyButton value={value} /></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {textFields.map(([label, field]) => (
                        <div key={field} className="flex flex-col gap-2">
                            <label htmlFor={`sales-order-${field}`} className="font-semibold text-accent-strong">{label}</label>
                            <textarea
                                id={`sales-order-${field}`}
                                name={field}
                                value={salesOrder[field] ?? ""}
                                readOnly
                                rows={4}
                                className="w-full resize-none rounded-lg border border-border-soft bg-background px-2 py-2 text-sm"
                            />
                        </div>
                    ))}

                    <section aria-labelledby="sales-order-items-heading" className="min-w-0 space-y-3">
                        <h3 id="sales-order-items-heading" className="text-accent-strong">Items</h3>
                        <div className="max-h-96 overflow-auto border border-border-soft">
                            <table aria-label="Sales order items" className="min-w-full">
                                <thead className="sticky top-0 z-10 border">
                                    <tr>
                                        <th className="sticky left-0 top-0 z-10">Item Name</th>
                                        <th>Quantity</th>
                                        <th>Unit Price</th>
                                        <th>Amount</th>
                                        <th>Invoiced</th>
                                        <th>Closed</th>
                                        {discountColumns.map(column => <th key={column.field}>{column.label}</th>)}
                                        <th>Discount Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemsLoading && (
                                        <tr><td colSpan={17} role="status">Loading sales order details...</td></tr>
                                    )}
                                    {itemsError && (
                                        <tr className="bg-red-200"><td colSpan={17} role="alert">DB Error: {itemsError}</td></tr>
                                    )}
                                    {!itemsLoading && !itemsError && salesOrderItems.length === 0 && (
                                        <tr><td colSpan={17}>No details found for this sales order.</td></tr>
                                    )}
                                    {!itemsLoading && !itemsError && salesOrderItems.map((detail, index) => (
                                        <tr key={detail.id} className={index % 2 === 0 ? "bg-background" : "bg-background-light"}>
                                            <td className="sticky left-0 z-5 bg-inherit">
                                                {detail.itemCode == null ? "-" : itemNames[detail.itemCode] ?? "Loading..."}
                                            </td>
                                            <td>{detail.quantity}</td>
                                            <td>{detail.unitPrice.toFixed(2)}</td>
                                            <td>{detail.amount == null ? "-" : detail.amount.toFixed(2)}</td>
                                            <td>{detail.invoiced ?? "-"}</td>
                                            <td><StatusLabelV1 status={detail.isClosed} /></td>
                                            {discountColumns.map(column => <td key={column.field}>{detail[column.field] ?? "-"}</td>)}
                                            <td>{detail.sDiscId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            )}
        </div>
    )
}

export default SalesOrderDetails
