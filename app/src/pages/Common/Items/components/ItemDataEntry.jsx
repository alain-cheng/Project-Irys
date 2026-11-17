import { useState } from "react"
import { X } from "lucide-react"

const fieldGroups = [
    {
        label: "Item Information",
        fields: [
            { name: "itemName", label: "Item Name", type: "text", required: true, maxLength: 255 },
            { name: "unitCode", label: "Unit Code", type: "number", nullable: true, integer: true },
            { name: "categoryId", label: "Category ID", type: "number", nullable: true, integer: true },
            { name: "supplierId", label: "Supplier ID", type: "number", nullable: true, integer: true },
            { name: "photoFile", label: "Photo File", type: "text", maxLength: 2083 },
        ],
    },
    {
        label: "Stock Levels",
        fields: [
            { name: "unitsInStock", label: "In Stock", type: "number", integer: true },
            { name: "returnStocks", label: "Bad Stock", type: "number", integer: true },
        ],
    },
    {
        label: "Pricing per Unit",
        fields: [
            { name: "sellingPrice", label: "Wholesale Price", type: "number" },
            { name: "r1SPrice", label: "Retail 1 Price", type: "number" },
            { name: "r2Price", label: "Retail 2 Price", type: "number" },
            { name: "purchasePrice", label: "Purchase Price", type: "number" },
            { name: "spPrice", label: "Special Price", type: "number" },
            { name: "averageCost", label: "Average Cost", type: "number" },
            { name: "itemCommission", label: "Commission", type: "number" },
        ],
    },
]

const fields = fieldGroups.flatMap(group => group.fields)
const initialFormData = Object.fromEntries([
    ...fields.map(field => [field.name, ""]),
    ["remarks", ""],
])

function ItemDataEntry({ isOpen, onClose, onSubmit, isSaving, error }) {
    const [formData, setFormData] = useState(initialFormData)
    const [validationError, setValidationError] = useState(null)

    if (!isOpen) return null

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setValidationError(null)
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (isSaving) return

        if (!formData.itemName.trim()) {
            setValidationError("Enter an item name.")
            return
        }

        const item = Object.fromEntries(fields.map(field => {
            const value = formData[field.name].trim()
            if (field.type === "number") {
                return [field.name, value === "" ? (field.nullable ? null : 0) : Number(value)]
            }
            return [field.name, value || null]
        }))

        // With Net discounts, the corresponding base and final prices are equal.
        // Omitted discount fields use the Rust model's zero / Net defaults.
        item.basePrice = item.sellingPrice
        item.r1Price = item.r1SPrice
        item.pUnitPrice = item.purchasePrice
        item.retailPrice = item.r1SPrice
        item.remarks = formData.remarks.trim() || null

        const createdItem = await onSubmit(item)
        if (createdItem) {
            setFormData(initialFormData)
            setValidationError(null)
        }
    }

    return (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/40 p-4">
            <div role="dialog" aria-modal="true" aria-labelledby="add-item-title" className="flex max-h-[85vh] w-full max-w-2xl flex-col gap-3 overflow-hidden rounded-lg bg-background p-4">
                <div className="flex items-center justify-between">
                    <h2 id="add-item-title" className="text-accent-strong">Add Item</h2>
                    <button type="button" aria-label="Close add item" disabled={isSaving} onClick={onClose} className="cursor-pointer rounded-full p-1 hover:bg-background-darker disabled:cursor-wait">
                        <X aria-hidden="true" />
                    </button>
                </div>

                <form id="item-form" onSubmit={handleSubmit} className="overflow-y-auto border-y border-border-soft py-3">
                    <fieldset disabled={isSaving} className="space-y-5">
                        {fieldGroups.map(group => (
                            <section key={group.label} className="space-y-2">
                                <h3 className="text-accent-strong">{group.label}</h3>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {group.fields.map(field => (
                                        <div key={field.name} className="flex min-w-0 flex-col gap-1">
                                            <label htmlFor={`new-item-${field.name}`} className="text-sm font-medium">{field.label}</label>
                                            <input
                                                id={`new-item-${field.name}`}
                                                name={field.name}
                                                type={field.type}
                                                required={field.required}
                                                maxLength={field.maxLength}
                                                min={field.type === "number" ? (field.nullable ? 1 : 0) : undefined}
                                                max={field.integer ? 2147483647 : undefined}
                                                step={field.type === "number" ? (field.integer ? 1 : "any") : undefined}
                                                value={formData[field.name]}
                                                onChange={handleChange}
                                                className="min-w-0 rounded-lg border border-border-soft px-2 py-1 focus:border-accent-strong focus:outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="new-item-remarks" className="text-sm font-medium">Remarks</label>
                            <textarea id="new-item-remarks" name="remarks" rows={3} value={formData.remarks} onChange={handleChange} className="rounded-lg border border-border-soft px-2 py-1" />
                        </div>
                    </fieldset>
                </form>

                {(validationError || error) && <p role="alert" className="text-sm text-red-700">{validationError || error}</p>}

                <div className="flex justify-end gap-2">
                    <button type="button" disabled={isSaving} onClick={onClose} className="cursor-pointer rounded-lg border border-accent-strong px-3 py-1 text-accent-strong disabled:cursor-wait">Cancel</button>
                    <button type="submit" form="item-form" disabled={isSaving} className="cursor-pointer rounded-lg bg-green-500 px-3 py-1 text-white hover:bg-green-600 disabled:cursor-wait disabled:opacity-50">
                        {isSaving ? "Saving..." : "Add Item"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ItemDataEntry
