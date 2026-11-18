import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import CopyButton from "../../components/CopyButton"

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

function SalesOrderDetails() {
    const { salesOrderId } = useParams()

    const [salesOrder, setSalesOrder] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let active = true

        async function loadSalesOrder() {
            setLoading(true)
            setError(null)
            setSalesOrder(null)

            try {
                const result = await invoke("get_sales_order_by_id", {
                    id: Number(salesOrderId),
                })
                if (active) setSalesOrder(result)
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
                </div>
            )}
        </div>
    )
}

export default SalesOrderDetails
