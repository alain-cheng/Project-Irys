import { useEffect, useRef, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"
import { CircleX, Image as ImageIcon, Pencil, Save, Trash } from "lucide-react"

import { commonLinks } from "../../../routes/commonLinks"
import Sidebar from "../../components/Sidebar"
import CopyButton from "../../components/CopyButton"
import Breadcrumb from "../../../components/Breadcrumb"
import Toast from "../../components/Toast"
import useToast from "../../components/hooks/useToast"
import DeleteConfirmation from "./components/DeleteConfirmation"

const initialFormData = {
    itemName: "",
    categoryId: "",
    unitCode: "",
    itemCommission: 0,
    termCode: "",
    itemLocationId: "",
    supplierId: "",
    unitsInStock: 0,
    returnStocks: "",
    sellingPrice: 0,
    r1SPrice: 0,
    r2Price: 0,
    purchasePrice: 0,
    spPrice: 0,
    averageCost: 0,
    remarks: "",
}

const generalFields = [
    { label: "Item ID Number", field: null },
    { label: "Item", field: "itemName", type: "text", maxLength: 255 },
    { label: "Category ID", field: "categoryId", type: "number" },
    { label: "Unit Code", field: "unitCode", type: "number" },
    { label: "Commission", field: "itemCommission", type: "number", step: "any" },
    { label: "Term Code", field: "termCode", type: "number" },
    { label: "Location ID", field: "itemLocationId", type: "number" },
    { label: "Supplier ID", field: "supplierId", type: "number" },
]

const numericalFields = [
    ["In Stock", "unitsInStock"],
    ["Bad Stock", "returnStocks"],
]

const priceFields = [
    ["Wholesale", "sellingPrice", "sDiscId"],
    ["Retail 1", "r1SPrice", "r1DiscId"],
    ["Retail 2", "r2Price", "r2DiscId"],
    ["Purchase", "purchasePrice", "pDiscId"],
    ["Special", "spPrice", "spDiscId"],
    ["Average", "averageCost", null],
]

function toFormData(item) {
    return Object.fromEntries(Object.entries(initialFormData).map(([field, fallback]) => [
        field, item[field] ?? fallback,
    ]))
}

function ItemPhoto({ photoFile, itemName }) {
    const [failed, setFailed] = useState(false)
    const source = photoFile?.trim()

    return (
        <div className="mx-auto aspect-square w-full max-w-64 overflow-hidden rounded-lg border border-border-soft bg-background-light">
            {source && !failed ? (
                <img
                    src={source}
                    alt={itemName}
                    onError={() => setFailed(true)}
                    className="h-full w-full object-contain p-3"
                />
            ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-text">
                    <ImageIcon size={48} strokeWidth={1} aria-hidden="true" />
                    <span className="text-sm">No photo available</span>
                </div>
            )}
        </div>
    )
}


function ItemDetails () {
    const { itemId } = useParams()
    const navigate = useNavigate()
    const { setSelectedItem } = useOutletContext()
    const { toast, showToast } = useToast()
    const requestVersion = useRef(0)

    //////////////////////////////////
    ///           States           ///
    //////////////////////////////////
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [actionError, setActionError] = useState(null)

    useEffect(() => {
        let active = true
        requestVersion.current += 1

        async function loadItem() {
            setLoading(true)
            setError(null)
            setItem(null)
            setIsEditing(false)
            setIsSaving(false)
            setIsDeleting(false)
            setIsDeleteModalOpen(false)
            setActionError(null)
            setFormData(initialFormData)

            try {
                const result = await invoke("get_item_by_id", {
                    id: Number(itemId),
                })
                if (active) {
                    setItem(result)
                    if (result) {
                        setFormData(toFormData(result))
                        setSelectedItem(result.itemCode)
                    }
                }
            } catch (error) {
                if (active) setError(String(error))
            } finally {
                if (active) setLoading(false)
            }
        }

        loadItem()

        return () => {
            active = false
            requestVersion.current += 1
        }
    }, [itemId, setSelectedItem])

    function handleFieldChange(event) {
        const { name, value } = event.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    function handleDiscard() {
        setFormData(toFormData(item))
        setIsEditing(false)
        setActionError(null)
    }

    async function handleSave(event) {
        event.preventDefault()
        if (!isEditing || isSaving) return
        setActionError(null)

        if (!formData.itemName.trim()) {
            setActionError("Enter an item name.")
            return
        }

        // UpdateItem replaces the record. Retain all fields not edited here.
        const updatedItem = { ...item }
        delete updatedItem.itemCode
        for (const field of Object.keys(initialFormData)) {
            const value = formData[field]
            if (field === "itemName") updatedItem[field] = value.trim()
            else if (field === "remarks") updatedItem[field] = value.trim() || null
            else updatedItem[field] = String(value).trim() === "" ? null : Number(value)
        }

        const version = requestVersion.current
        setIsSaving(true)
        try {
            const result = await invoke("update_item", { id: Number(itemId), item: updatedItem })
            if (version !== requestVersion.current) return
            if (result === null) {
                setItem(null)
                setIsEditing(false)
                setSelectedItem(prev => prev === Number(itemId) ? null : prev)
                return
            }
            setItem(result)
            setFormData(toFormData(result))
            setIsEditing(false)
            showToast("Item records updated.")
        } catch (error) {
            if (version !== requestVersion.current) return
            const message = String(error)
            setActionError(message)
            showToast(message, "error")
        } finally {
            if (version === requestVersion.current) setIsSaving(false)
        }
    }

    async function handleDeleteItem(id) {
        const version = requestVersion.current
        setActionError(null)
        setIsDeleting(true)

        try {
            const deleted = await invoke("delete_item_by_id", { id })
            if (version !== requestVersion.current) return
            if (!deleted) {
                setActionError(`Item #${id} was not found.`)
                return
            }
            setSelectedItem(prev => prev === id ? null : prev)
            setIsDeleteModalOpen(false)
            navigate("/items", { replace: true })
        } catch (error) {
            if (version !== requestVersion.current) return
            const message = String(error)
            setActionError(message)
            showToast(message, "error")
        } finally {
            if (version === requestVersion.current) setIsDeleting(false)
        }
    }

    if (loading || error || !item) {
        return (
            <div className="pt-16 text-text text-sm">
                <Sidebar links={commonLinks} />

                <main className="ml-70 peer-data-[collapsed=true]:ml-22 transition-[margin] duration-200 motion-reduce:transition-none mr-5 min-w-0">
                    <Breadcrumb />
                    <h1>Item Details</h1>
                    {loading ? (
                        <p role="status">Loading item...</p>
                    ) : error ? (
                        <p role="alert" className="text-red-700">DB Error: {error}</p>
                    ) : (
                        <p>Item with the ID No. <b className="text-accent-strong">{itemId}</b> was not found.</p>
                    )}
                </main>
            </div>
        )
    }

    return(
        <div className="pt-16">
            <Sidebar links={commonLinks} />

            <main className="flex-1 ml-70 peer-data-[collapsed=true]:ml-22 transition-[margin] duration-200 motion-reduce:transition-none mr-5 min-w-0">
                <Breadcrumb />

                {toast && <Toast message={toast.message} type={toast.type} />}
                <DeleteConfirmation
                    isOpen={isDeleteModalOpen}
                    onClose={() => {
                        setIsDeleteModalOpen(false)
                        setActionError(null)
                    }}
                    itemId={Number(itemId)}
                    itemName={item.itemName}
                    onDelete={handleDeleteItem}
                    isDeleting={isDeleting}
                    error={actionError}
                />

                <div className="mb-2 bg-background border border-border-soft rounded-lg  shadow-xs">
                    <h4 className="px-2 py-1 text-accent-strong">Item: {item.itemName}</h4>
                </div>

                <h1 className="text-text mb-2">Item Details</h1>

                <div className="flex bg-background border border-border-soft rounded-lg">
                    <div className="flex flex-1 px-2 py-3 space-x-2 justify-end">
                        {/* Keep Edit and Save as separate DOM buttons during click activation. */}
                        {isEditing ? (
                            <>
                                <button 
                                    key="save"
                                    type="submit" 
                                    form="item-details-form" 
                                    disabled={isSaving} 
                                    className="flex items-center justify-center px-2 py-1 rounded-lg text-white bg-green-600 hover:bg-green-500 disabled:opacity-50"
                                >
                                    <Save size={15} className="mr-2" aria-hidden="true" />
                                    {isSaving ? "Saving..." : "Save"}
                                </button>
                                <button 
                                    key="discard"
                                    type="button" 
                                    onClick={handleDiscard} 
                                    disabled={isSaving} 
                                    className="flex items-center justify-center px-2 py-1 rounded-lg text-text bg-background border border-border-soft hover:bg-background-light disabled:opacity-50"
                                >
                                    <CircleX size={15} className="mr-2" aria-hidden="true" />
                                    Discard
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    key="edit"
                                    type="button" 
                                    onClick={() => { 
                                        setActionError(null); 
                                        setIsEditing(true) 
                                    }} 
                                    disabled={isDeleting} 
                                    className="flex items-center justify-center px-2 py-1 rounded-lg text-text bg-accent-light hover:bg-accent-strong"
                                >
                                    <Pencil size={15} className="mr-2" aria-hidden="true" />
                                    Edit
                                </button>
                                <button 
                                    key="delete"
                                    type="button" 
                                    onClick={() => { 
                                        setActionError(null); 
                                        setIsDeleteModalOpen(true) 
                                    }} 
                                    disabled={isDeleting} 
                                    className="flex items-center justify-center px-2 py-1 rounded-lg text-white bg-red-500 hover:bg-red-400 cursor-pointer"
                                >
                                    <Trash size={15} className="mr-2" aria-hidden="true" />
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {actionError && !isDeleteModalOpen && <p role="alert" className="my-2 text-sm text-red-700">{actionError}</p>}

                <form 
                    id="item-details-form" 
                    onSubmit={handleSave} 
                    className="grid grid-cols-1 items-start gap-6 px-4 py-4 my-2 border border-border-soft rounded-lg bg-background shadow-xs lg:grid-cols-2"
                >
                    <div className="min-w-0 space-y-5">
                        <section aria-labelledby="item-photo-heading" className="space-y-3">
                            <ItemPhoto
                                key={`${item.itemCode}:${item.photoFile ?? ""}`}
                                photoFile={item.photoFile}
                                itemName={item.itemName}
                            />
                        </section>

                        <section aria-labelledby="item-information-heading" className="space-y-3">
                            <h3 id="item-information-heading" className="text-accent-strong">Item Information</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border border-border-soft shadow-xs overflow-hidden">
                                    <tbody>
                                        {generalFields.map(({ label, field, type, step, maxLength }, index) => (
                                            <tr
                                                key={label}
                                                className={`${
                                                    index % 2 === 0
                                                        ? "bg-background"
                                                        : "bg-background-light"
                                                    }
                                                `}
                                            >
                                                <td className="w-48 font-semibold whitespace-nowrap">{label}</td>
                                                <td className="w-full">
                                                    {isEditing && field !== null ? (
                                                        <input
                                                            type={type}
                                                            name={field}
                                                            aria-label={label}
                                                            value={formData[field]}
                                                            onChange={handleFieldChange}
                                                            required={field === "itemName" || field === "itemCommission"}
                                                            min={type === "number" ? (field === "itemCommission" ? 0 : 1) : undefined}
                                                            max={type === "number" && step !== "any" ? 2147483647 : undefined}
                                                            step={type === "number" ? (step ?? 1) : undefined}
                                                            maxLength={maxLength}
                                                            disabled={isSaving}
                                                            className="w-full min-w-0 rounded border border-border-soft bg-background px-2 py-1 outline-none focus:border-accent-strong"
                                                        />
                                                    ) : (
                                                        <span className="whitespace-normal wrap-break-word">{(field === null ? item.itemCode : item[field]) ?? "-"}</span>
                                                    )}
                                                </td>
                                                <td>
                                                    {!isEditing && <CopyButton value={(field === null ? item.itemCode : item[field]) ?? ""} />}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section aria-labelledby="item-stock-heading" className="space-y-3">
                            <div className="overflow-x-auto">
                                <table className="w-full border border-border-soft shadow-xs overflow-hidden">
                                    <tbody>
                                        {numericalFields.map(([label, field], index) => (
                                            <tr
                                                key={label}
                                                className={`${
                                                    index % 2 === 0
                                                        ? "bg-background"
                                                        : "bg-background-light"
                                                    }
                                                `}
                                            >
                                                <td className="w-48 font-semibold whitespace-nowrap">{label}</td>
                                                <td className="w-full">
                                                    {isEditing ? (
                                                        <input type="number" name={field} aria-label={label} value={formData[field]} onChange={handleFieldChange} required={field === "unitsInStock"} min={0} max={2147483647} step={1} disabled={isSaving} className="w-full min-w-0 rounded border border-border-soft bg-background px-2 py-1 outline-none focus:border-accent-strong" />
                                                    ) : item[field] ?? "-"}
                                                </td>
                                                <td>
                                                    {!isEditing && <CopyButton value={item[field] ?? ""} />}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    </div>

                    <section aria-labelledby="item-pricing-heading" className="min-w-0 space-y-3">
                        <h3 id="item-pricing-heading" className="text-accent-strong">Pricing per Unit</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-border-soft shadow-xs">
                                <thead>
                                    <tr>
                                        <th>Price Type</th>
                                        <th className="text-right">Amount</th>
                                        <th>Discount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {priceFields.map(([label, field, discountField], index) => (
                                        <tr
                                            key={label}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-background"
                                                    : "bg-background-light"
                                                }
                                            `}
                                        >
                                            <td className="font-semibold whitespace-nowrap">{label}</td>
                                            <td className="text-right tabular-nums">
                                                {isEditing ? (
                                                    <input type="number" name={field} aria-label={`${label} Price`} value={formData[field]} onChange={handleFieldChange} required min={0} step="any" disabled={isSaving} className="w-full min-w-0 rounded border border-border-soft bg-background px-2 py-1 text-right outline-none focus:border-accent-strong" />
                                                ) : item[field].toFixed(2)}
                                            </td>
                                            <td>{discountField ? item[discountField] : "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-accent-strong">Remarks</h3>
                            <textarea
                                className="w-full px-2 py-2 text-sm resize-none border border-border-soft"
                                rows={4}
                                name="remarks"
                                aria-label="Remarks"
                                value={formData.remarks}
                                onChange={handleFieldChange}
                                disabled={!isEditing || isSaving}
                            />
                        </div>
                    </section>
                </form>
            </main>
        </div>
    )
}

export default ItemDetails
