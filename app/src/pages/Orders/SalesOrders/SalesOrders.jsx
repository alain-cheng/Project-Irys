import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import StatusLabelV1 from "../../components/StatusLabelV1"
import StatusLabelV2 from "../../components/StatusLabelV2"

const discountColumns = Array.from({ length: 10 }, (_, index) => ({
    field: `sDisc${index + 1}`,
    label: `SDisc${index + 1}`,
}))

function SalesOrders () {
    const navigate = useNavigate()

    const [selectedSalesOrderId, setSelectedSalesOrderId] = useState(null)
    const [salesOrdersView, setSalesOrdersView] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [statusNames, setStatusNames] = useState({})
    const [salesOrdersItemsView, setSalesOrdersItemsView] = useState([])
    const [detailsLoading, setDetailsLoading] = useState(false)
    const [detailsError, setDetailsError] = useState(null)
    const [itemNames, setItemNames] = useState({})

    const selectedSalesOrder = salesOrdersView.find(order => order.id === selectedSalesOrderId)

    useEffect(() => {
        let active = true

        async function loadSalesOrders() {
            setLoading(true)
            setError(null)

            try {
                const result = await invoke("get_all_sales_orders")
                if (active) setSalesOrdersView(result)
            } catch (error) {
                if (active) setError(String(error))
            } finally {
                if (active) setLoading(false)
            }
        }

        loadSalesOrders()

        return () => {
            active = false
        }
    }, [])

    // Fetch shared statuses once per id.
    useEffect(() => {
        let active = true
        const statusIds = new Set(salesOrdersView.map(order => order.orderStatusId))

        async function loadStatus(id) {
            try {
                const status = await invoke("get_order_status_by_id", { id })
                if (active) {
                    setStatusNames(prev => ({
                        ...prev,
                        [id]: status?.statusName ?? `Unknown (#${id})`,
                    }))
                }
            } catch {
                if (active) {
                    setStatusNames(prev => ({ ...prev, [id]: `Unavailable (#${id})` }))
                }
            }
        }

        statusIds.forEach(id => loadStatus(id))

        return () => {
            active = false
        }
    }, [salesOrdersView])

    // Load sub table when a sales order is selected
    useEffect(() => {
        if (selectedSalesOrderId === null) return
        let active = true

        async function loadDetails() {
            try {
                const result = await invoke("get_sales_order_details_by_sales_order_id", {
                    salesOrderId: selectedSalesOrderId,
                })
                if (active) setSalesOrdersItemsView(result)
            } catch (error) {
                if (active) setDetailsError(String(error))
            } finally {
                if (active) setDetailsLoading(false)
            }
        }

        loadDetails()

        return () => {
            active = false
        }
    }, [selectedSalesOrderId])

    // Fetch shared item names once per code in the loaded sub table's rows.
    useEffect(() => {
        let active = true
        const itemCodes = new Set(salesOrdersItemsView
            .map(detail => detail.itemCode)
            .filter(code => code != null))

        async function loadItemName(id) {
            try {
                const item = await invoke("get_item_by_id", { id })
                if (active) {
                    setItemNames(prev => ({
                        ...prev,
                        [id]: item?.itemName ?? `Unknown item (#${id})`,
                    }))
                }
            } catch {
                if (active) {
                    setItemNames(prev => ({ ...prev, [id]: `Unavailable item (#${id})` }))
                }
            }
        }

        itemCodes.forEach(id => loadItemName(id))

        return () => {
            active = false
        }
    }, [salesOrdersItemsView])

    function handleSelectSalesOrder(id) {
        const nextId = selectedSalesOrderId === id ? null : id
        setSelectedSalesOrderId(nextId)
        setSalesOrdersItemsView([])
        setDetailsError(null)
        setDetailsLoading(nextId !== null)
    }

    return(
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-2xl text-text">Sales Orders</h1>

            {/* Filter Controls */}
            <div className="flex flex-col gap-2 p-2 border border-border-soft rounded-lg bg-background">
                <label className="flex items-center gap-2">
                    <span>Customer:</span>

                    <select
                        value=""
                        disabled
                        className="px-2 py-1 border border-border-soft"
                    >
                        <option value="">All</option>
                    </select>
                </label>
            </div>

            {/* Main Table */}
            <div className="min-h-0">
                <div className="w-full max-h-50 overflow-auto border border-border-soft">
                    <table aria-label="Sales orders" className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">Order Number</th>
                                <th>Order Date</th>
                                <th>Customer ID</th>
                                <th>Order Status</th>
                                <th>Total</th>
                                <th>Salesman ID</th>
                                <th>PO Number</th>
                                <th>Term Code</th>
                                <th>Shipper ID</th>
                                <th>User ID</th>
                                <th>Employee ID</th>
                                <th>Remarks</th>
                                <th>Notes</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading && (
                                <tr>
                                    <td colSpan={13} role="status">Loading sales orders...</td>
                                </tr>
                            )}
                            {error && (
                                <tr className="bg-red-200">
                                    <td colSpan={13} role="alert">DB Error: {error}</td>
                                </tr>
                            )}
                            {!loading && !error && salesOrdersView.length === 0 && (
                                <tr>
                                    <td colSpan={13}>No sales orders found.</td>
                                </tr>
                            )}
                            {salesOrdersView.map((so, index) => (
                                // onDoubleClick={() => navigate(`/orders/sales_orders/${so.id}`)}
                                <tr 
                                    key={so.id} 
                                    onClick={() => handleSelectSalesOrder(so.id)}
                                    className={`
                                        ${ selectedSalesOrderId === so.id
                                            ? "bg-yellow-200"
                                            : index % 2 === 0
                                                ? "bg-background"
                                                : "bg-background-light"
                                        }
                                        hover:bg-accent-soft transition cursor-pointer
                                    `}
                                >
                                    <td className="sticky left-0 z-5">{so.id}</td>
                                    <td>{so.orderDate}</td>
                                    <td>{so.customerId ?? "-"}</td>
                                    <td>
                                        <StatusLabelV2 statusName={statusNames[so.orderStatusId] ?? "Loading..."} />
                                    </td>
                                    <td>{so.total.toFixed(2)}</td>
                                    <td>{so.salesman ?? "-"}</td>
                                    <td>{so.poNumber ?? "-"}</td>
                                    <td>{so.termCode ?? "-"}</td>
                                    <td>{so.shipperId ?? "-"}</td>
                                    <td>{so.user ?? "-"}</td>
                                    <td>{so.employeeId ?? "-"}</td>
                                    <td>{so.remarks ?? "-"}</td>
                                    <td>{so.notes ?? "-"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>

            {/* Sub table */}
            <div className="min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table aria-label="Sales order items" className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">Item Name</th>
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
                            {selectedSalesOrderId === null && (
                                <tr>
                                    <td colSpan={17}>Select a sales order to view its items.</td>
                                </tr>
                            )}
                            {selectedSalesOrderId !== null && detailsLoading && (
                                <tr>
                                    <td colSpan={17} role="status">Loading sales order details...</td>
                                </tr>
                            )}
                            {selectedSalesOrderId !== null && detailsError && (
                                <tr className="bg-red-200">
                                    <td colSpan={17} role="alert">DB Error: {detailsError}</td>
                                </tr>
                            )}
                            {selectedSalesOrderId !== null && !detailsLoading && !detailsError && salesOrdersItemsView.length === 0 && (
                                <tr>
                                    <td colSpan={17}>No details found for this sales order.</td>
                                </tr>
                            )}
                            {selectedSalesOrderId !== null && !detailsLoading && !detailsError && salesOrdersItemsView.map((soi, index) => (
                                <tr 
                                    key={soi.id}
                                    className={`
                                        ${ index % 2 === 0
                                                ? "bg-background"
                                                : "bg-background-light"
                                        }
                                    `}
                                >
                                    <td className="sticky left-0 z-5 ">
                                        {soi.itemCode == null ? "-" : itemNames[soi.itemCode] ?? "Loading..."}
                                    </td>
                                    <td>{soi.quantity}</td>
                                    <td>{soi.unitPrice.toFixed(2)}</td>
                                    <td>{soi.amount == null ? "-" : soi.amount.toFixed(2)}</td>
                                    <td>{soi.invoiced ?? "-"}</td>
                                    <td><StatusLabelV1 status={soi.isClosed}/></td>
                                    {discountColumns.map(column => <td key={column.field}>{soi[column.field] ?? "-"}</td>)}
                                    <td>{soi.sDiscId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>

            {/* TODO */}
            {selectedSalesOrder && (
                <div>
                    <button
                        className="
                            px-1 py-2 border border-border-soft bg-background cursor-pointer 
                            disabled:opacity-50 
                            disabled:cursor-not-allowed
                        "
                        onClick={() => navigate(`/orders/invoices?salesOrderId=${selectedSalesOrder?.id}`)}
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
