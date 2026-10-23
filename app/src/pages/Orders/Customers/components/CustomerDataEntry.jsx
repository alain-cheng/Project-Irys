
import { X } from "lucide-react"
import { useState } from "react"

const initialFormData = {
    companyName: "",
    contactName: "",
    contactTitle: "",
    address: "",
    city: "",
    province: "",
    zipCode: "",
    phone: "",
    fax: "",
    tin: "",
    creditLimit: "",
    employeeId: "",
    areaCode: "",
    customerCode: "",
    customerArea: "",
    customerAgent: "",
    agentName: "",
    customerType: "",
    smCode: "",
    term: "",
    termCode: "",
    pType: "",
    remarks: "",
}

const fields = [
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "contactName", label: "Contact Name", type: "text" },
    { name: "contactTitle", label: "Contact Title", type: "text" },
    { name: "address", label: "Address", type: "text" },
    { name: "city", label: "City", type: "text" },
    { name: "province", label: "Province", type: "text" },
    { name: "zipCode", label: "Zip Code", type: "text", placeholder: "1234" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "fax", label: "FAX", type: "text" },
    { name: "tin", label: "TIN", type: "text", description: "Taxpayer Identification Number" },
    { name: "creditLimit", label: "Credit Limit", type: "number", placeholder: "0.00", step: "any" },
    { name: "employeeId", label: "Employee ID", type: "number" },
    { name: "areaCode", label: "Area Code", type: "number" },
    { name: "customerCode", label: "Customer Code", type: "text" },
    { name: "customerArea", label: "Customer Area", type: "text" },
    { name: "customerAgent", label: "Customer Agent", type: "text" },
    { name: "agentName", label: "Agent Name", type: "text" },
    { name: "customerType", label: "Customer Type", type: "text" },
    { name: "smCode", label: "SM Code", type: "text" },
    { name: "term", label: "Term", type: "text" },
    { name: "termCode", label: "Term Code", type: "text" },
    { name: "pType", label: "P Type", type: "text" },
]

/**
 * A modal form for creating a new customer data entry.
 *
 * @returns {JSX.Element | null} Customer data creation form
 */
function CustomerDataEntry({ isOpen, onClose, onSubmit, isSaving }) {
    const [formData, setFormData] = useState(initialFormData)

    if (!isOpen) return null

    function handleChange(e) {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const optionalStringFields = [
            "companyName",
            "contactName",
            "contactTitle",
            "address",
            "city",
            "province",
            "zipCode",
            "phone",
            "fax",
            "tin",
            "customerCode",
            "customerArea",
            "customerAgent",
            "agentName",
            "customerType",
            "smCode",
            "term",
            "termCode",
            "pType",
            "remarks",
        ]

        const newCustomer = {
            ...formData,
            ...Object.fromEntries(
                optionalStringFields.map((field) => [
                    field,
                    formData[field].trim() || null,
                ])
            ),
            creditLimit:
                formData.creditLimit.trim() === ""
                    ? 0
                    : Number(formData.creditLimit),
            employeeId:
                formData.employeeId.trim() === ""
                    ? null
                    : Number(formData.employeeId),
            areaCode:
                formData.areaCode.trim() === ""
                    ? null
                    : Number(formData.areaCode),
        }

        const createdCustomer = await onSubmit(newCustomer)
        
        if (createdCustomer) {
            setFormData(initialFormData)
        }
    }

    return (
        <div className="fixed flex items-center justify-center inset-0 bg-black/40 z-1000 w-full h-full">
            <div className="flex flex-col gap-2 px-2 py-2 w-200 max-h-[80vh] overflow-hidden rounded-lg bg-background">
                <div className="flex justify-between">
                    <h2 className="text-accent-strong">Add Customer</h2>

                    <button
                        type="button"
                        className="px-1 py-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>

                <hr className="border-gray-200" />

                <form
                    id="customer-form"
                    className="flex flex-col px-2 gap-3 overflow-y-auto"
                    onSubmit={handleSubmit}
                >
                    {fields.map((field) => (
                        <div className="flex flex-col" key={field.name}>
                            <label
                                htmlFor={field.name}
                                className="font-medium"
                            >
                                {field.label}
                            </label>

                            {field.description && (
                                <span className="text-sm text-gray-500">
                                    {field.description}
                                </span>
                            )}

                            <input
                                id={field.name}
                                name={field.name}
                                className="px-1 py-1 rounded-lg border border-gray-200"
                                type={field.type}
                                placeholder={field.placeholder ?? ""}
                                step={field.step}
                                value={formData[field.name]}
                                onChange={handleChange}
                                min={
                                    field.name === "creditLimit" ||
                                    field.name === "employeeId" ||
                                    field.name === "areaCode"
                                        ? 0
                                        : undefined
                                }
                            />
                        </div>
                    ))}

                    <div className="flex flex-col">
                        <label htmlFor="remarks" className="font-medium">
                            Remarks
                        </label>
                        <textarea
                            id="remarks"
                            name="remarks"
                            className="px-1 py-1 rounded-lg border border-gray-200"
                            rows={3}
                            value={formData.remarks}
                            onChange={handleChange}
                        />
                    </div>
                </form>

                <hr className="border-gray-200" />

                <div className="flex px-2 py-2 justify-end gap-2">
                    <button
                        type="button"
                        className="px-2 py-1 border border-accent-strong rounded-lg text-accent-strong hover:bg-yellow-50 cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        form="customer-form"
                        className="px-2 py-1 bg-green-400 hover:bg-green-500 text-white border rounded-lg cursor-pointer"
                        type="submit"
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Add Customer"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomerDataEntry
