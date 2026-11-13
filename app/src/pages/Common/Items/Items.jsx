import { useEffect, useMemo, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"
import { Plus, Search, Trash2 } from "lucide-react"

import { commonLinks } from "../../../routes/commonLinks"
import { orderLinks } from "../../../routes/orderLinks"

import Sidebar from "../../components/Sidebar"
import Breadcrumb from "../../../components/Breadcrumb"
import Tooltip from "../../components/Tooltip"
import Toast from "../../components/Toast"
import useToast from "../../components/hooks/useToast"
import ItemDataEntry from "./components/ItemDataEntry"
import DeleteConfirmation from "./components/DeleteConfirmation"

function Items() {
    const navigate = useNavigate()

    //////////////////////////////////
    ///           States           ///
    //////////////////////////////////
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [refreshKey, setRefreshKey] = useState(0)
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [actionError, setActionError] = useState(null)
    const { toast, showToast } = useToast()

    const {
        selectedItem,
        setSelectedItem,
    } = useOutletContext()

    useEffect(() => {
        let active = true

        async function loadItems() {
            setLoading(true)
            setError(null)
            try {
                const result = await invoke("get_all_items")
                if (active) setItems(result)
            } catch (error) {
                if (active) setError(String(error))
            } finally {
                if (active) setLoading(false)
            }
        }

        loadItems()

        return () => {
            active = false
        }
    }, [refreshKey])

    const filteredView = useMemo(() => {
        const query = searchTerm.toLowerCase().trim()
        if (!query) return items

        return items.filter(item => Object.values(item).some(value =>
            value != null && String(value).toLowerCase().includes(query)
        ))
    }, [items, searchTerm])

    const selectedItemRecord = items.find(item => item.itemCode === selectedItem)

    async function handleAddItem(newItem) {
        setActionError(null)
        setIsSaving(true)

        try {
            const createdItem = await invoke("add_item", { item: newItem })
            setIsAddModalOpen(false)
            setRefreshKey(prev => prev + 1)
            showToast("Item created successfully.")
            return createdItem
        } catch (error) {
            const message = String(error)
            setActionError(message)
            showToast(message, "error")
            return null
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDeleteItem(id) {
        setActionError(null)
        setIsDeleting(true)

        try {
            const deleted = await invoke("delete_item_by_id", { id })
            if (!deleted) {
                const message = `Item #${id} was not found.`
                setActionError(message)
                showToast(message, "error")
                return false
            }

            setIsDeleteModalOpen(false)
            setSelectedItem(prev => prev === id ? null : prev)
            setRefreshKey(prev => prev + 1)
            showToast("Item deleted.")
            return true
        } catch (error) {
            const message = String(error)
            setActionError(message)
            showToast(message, "error")
            return false
        } finally {
            setIsDeleting(false)
        }
    }

    return(
        <div className="flex pt-16 space-x-2">
            <Sidebar links={orderLinks} />

            <main className="ml-70 peer-data-[collapsed=true]:ml-22 transition-[margin] duration-200 motion-reduce:transition-none mr-5 flex-1 min-w-0">
                <Breadcrumb />

                <div className="flex flex-col h-full py-5">
                    <h1 className="text-2xl text-text mb-5">Items</h1>

                    {toast && <Toast message={toast.message} type={toast.type} />}

                    <ItemDataEntry
                        isOpen={isAddModalOpen}
                        onClose={() => setIsAddModalOpen(false)}
                        onSubmit={handleAddItem}
                        isSaving={isSaving}
                        error={actionError}
                    />

                    <DeleteConfirmation
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        itemId={selectedItem}
                        itemName={selectedItemRecord?.itemName}
                        onDelete={handleDeleteItem}
                        isDeleting={isDeleting}
                        error={actionError}
                    />

                    <div className="mb-2 flex flex-wrap items-center rounded-lg border border-border-soft bg-background">
                        <div className="relative group rounded-l-lg hover:bg-background-darker">
                            <button
                                type="button"
                                aria-label="Add new item"
                                className="flex h-10 w-10 cursor-pointer items-center justify-center"
                                onClick={() => {
                                    setActionError(null)
                                    setIsAddModalOpen(true)
                                }}
                            >
                                <Plus size={25} aria-hidden="true" />
                            </button>
                            <Tooltip text="Add New Item" />
                        </div>

                        <div className="relative group hover:bg-background-darker">
                            <button
                                type="button"
                                aria-label="Delete selected item"
                                disabled={!selectedItemRecord || loading || isDeleting}
                                className="flex h-10 w-10 cursor-pointer items-center justify-center disabled:cursor-default disabled:text-gray-300"
                                onClick={() => {
                                    setActionError(null)
                                    setIsDeleteModalOpen(true)
                                }}
                            >
                                <Trash2 size={23} aria-hidden="true" />
                            </button>
                            <Tooltip text={selectedItemRecord ? "Delete Selected Item" : "Select an item to delete"} />
                        </div>

                        <div className="relative min-w-0 flex-1">
                            <Search size={20} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input
                                type="search"
                                aria-label="Search items"
                                placeholder="Search Item..."
                                value={searchTerm}
                                onChange={event => setSearchTerm(event.target.value)}
                                className="h-10 w-full rounded-r-lg border-l border-border-soft bg-background py-2 pl-10 pr-3 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 min-h-0">
                        <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                            <table className="bg-background">
        
                                <thead className="sticky top-0 z-10 bg-background border">
                                    <tr>
                                        <th className="sticky left-0 top-0 z-10 bg-background">ID</th>
                                        <th>Item Name</th>
                                        <th>Stocks</th>
                                        <th>Bad Stocks</th>
                                        <th>Unit Code</th>
                                        <th>Comm</th>
                                        <th>Term Code</th>
                                        <th>Location ID</th>
                                        <th>Category ID</th>
                                        <th>Wholesale Price</th>
                                        <th>Wholesale Discount</th>
                                        <th>Retail 1 Price</th>
                                        <th>Retail 1 Discount</th>
                                        <th>Retail 2 Price</th>
                                        <th>Retail 2 Discount</th>
                                        <th>Purchase Price</th>
                                        <th>Purchase Discount</th>
                                        <th>Special Price</th>
                                        <th>Special Discount</th>
                                        <th>Average Cost</th>
                                        <th>Remarks</th>
                                    </tr>
                                </thead>
        
                                <tbody>
                                    {loading && (
                                        <tr>
                                            <td colSpan={21} role="status">Loading items...</td>
                                        </tr>
                                    )}
                                    {error && (
                                        <tr className="bg-red-200">
                                            <td colSpan={21} role="alert">DB Error: {error}</td>
                                        </tr>
                                    )}
                                    {!loading && !error && filteredView.length === 0 && (
                                        <tr>
                                            <td colSpan={21}>{items.length === 0 ? "No items found." : "No items match your search."}</td>
                                        </tr>
                                    )}
                                    {filteredView.map((item, index) => (
                                        <tr 
                                            key={item.itemCode}
                                            onClick={() => setSelectedItem(
                                                prev => prev === item.itemCode ? 0 : item.itemCode
                                            )}
                                            onDoubleClick={() => navigate(`/items/${item.itemCode}`)}
                                            className={`
                                                ${selectedItem === item.itemCode
                                                    ? "bg-yellow-200"
                                                    : index % 2 === 0
                                                        ? "bg-background"
                                                        : "bg-background-light"
                                                }
                                                hover:bg-accent-soft transition cursor-pointer
                                            `}
                                        >
                                            <td className="sticky left-0 z-5 bg-inherit">{item.itemCode}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.unitsInStock}</td>
                                            <td>{item.returnStocks ?? "-"}</td>
                                            <td>{item.unitCode ?? "-"}</td>
                                            <td>{item.itemCommission}</td>
                                            <td>{item.termCode ?? "-"}</td>
                                            <td>{item.itemLocationId ?? "-"}</td>
                                            <td>{item.categoryId ?? "-"}</td>
                                            <td>{item.sellingPrice.toFixed(2)}</td>
                                            <td>{item.sDiscId}</td>
                                            <td>{item.r1SPrice.toFixed(2)}</td>
                                            <td>{item.r1DiscId}</td>
                                            <td>{item.r2Price.toFixed(2)}</td>
                                            <td>{item.r2DiscId}</td>
                                            <td>{item.purchasePrice.toFixed(2)}</td>
                                            <td>{item.pDiscId}</td>
                                            <td>{item.spPrice.toFixed(2)}</td>
                                            <td>{item.spDiscId}</td>
                                            <td>{item.averageCost.toFixed(2)}</td>
                                            <td>{item.remarks}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>    
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Items
