import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"
import { useOutletContext, useParams } from "react-router-dom"
import useToast from "../../../components/hooks/useToast"

import CopyButton from "../../../components/CopyButton"
import Toast from "../../../components/Toast"
import DeleteConfirmation from "../components/DeleteConfirmation"


function CustomerDetails () {
    const navigate = useNavigate()
    const { customerId } = useParams()
    const { setSelectedCustomer } = useOutletContext()

    const {
        toast,
        showToast
    } = useToast()

    //////////////////////////////////
    ///           States           ///
    //////////////////////////////////
    const [refreshKey, setRefreshKey] = useState(0)
    const [customer, setCustomer] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState({
        companyName: "",
        contactName: "",
        contactTitle: "",
        address: "",
        city: "",
        province: "",
        zipCode: "",
        phone: "",
        fax: "",
    })
    //////////////////////////////////

    const generalFields = [
        ["Customer ID", null],
        ["Company Name", "companyName"],
        ["Contact Name", "contactName"],
        ["Contact Title", "contactTitle"],
        ["Address", "address"],
        ["City", "city"],
        ["Province", "province"],
        ["Zip Code", "zipCode"],
        ["Phone Number", "phone"],
    ]

    const financialFields = [
        ["FAX Number", "fax"],
    ]

    //////////////////////////////////
    ///          Effects           ///
    //////////////////////////////////

    // loads customer data
    useEffect(() => {
        async function getCustomerById() {
            setLoading(true)
            setHasLoaded(false)

            try {
                const result = await invoke("get_customer_by_id", {
                    id: Number(customerId)
                })
                setCustomer(result)

                if (result) {
                    setFormData(toFormData(result))
                }

                setHasLoaded(true)
            } catch (error) {
                setError(String(error))
            } finally {
                setLoading(false)
            }
        }

        getCustomerById()
    }, [refreshKey])

    // Sets the customer to "selected" state when their details page is viewed
    useEffect(() => {
        if (customerId) {
            setSelectedCustomer(Number(customerId))
        }
    }, [customerId, setSelectedCustomer])

    //////////////////////////////////
    ///         Functions          ///
    //////////////////////////////////

    function toFormData(customer) {
        return {
            companyName: customer.companyName ?? "",
            contactName: customer.contactName ?? "",
            contactTitle: customer.contactTitle ?? "",
            address: customer.address ?? "",
            city: customer.city ?? "",
            province: customer.province ?? "",
            zipCode: customer.zipCode ?? "",
            phone: customer.phone ?? "",
            fax: customer.fax ?? "",
        }
    }

    async function handleDeleteCustomer(id) {
        setError(null)

        try {
            const deleted = await invoke("delete_customer_by_id", { id: id })

            if (!deleted) {
                showToast(`Customer #${id} was not found.`, "error")
                return false
            }

            setIsDeleteModalOpen(false)
            setRefreshKey(prev => prev + 1)
            setSelectedCustomer(prev => prev === id ? null : prev)

            showToast("Customer deleted.")

            return true
        } catch (error) {
            const message = String(error)
            setError(message)
            showToast(message, "error")
            return false
        }
    }

    //////////////////////////////////
    ///   Edit Handler Functions   ///
    //////////////////////////////////

    function handleFieldChange(event) {
        const { name, value } = event.target

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    function handleDiscard() {
        setFormData(toFormData(customer))
        setIsEditing(false)
        setError(null)
    }

    async function handleSave() {
        setError(null)
        setIsSaving(true)

        // turn blank inputs into null
        const nullable = value => value.trim() || null

        const updatedCustomer = {
            companyName: nullable(formData.companyName),
            contactName: nullable(formData.contactName),
            contactTitle: nullable(formData.contactTitle),
            address: nullable(formData.address),
            city: nullable(formData.city),
            province: nullable(formData.province),
            zipCode: nullable(formData.zipCode),
            phone: nullable(formData.phone),
            fax: nullable(formData.fax),
        }

        try {
            const result = await invoke("update_customer", {
                id: Number(customerId),
                customer: updatedCustomer,
            })

            // if invoked command returned None/null (ex. customer being updated was deleted)
            if (result === null) {
                setCustomer(null)
                setHasLoaded(true)
                setIsEditing(false)
                showToast("Customer not found", "error")
                return
            } 

            setCustomer(result)
            setFormData(toFormData(result))
            setIsEditing(false)

            showToast("Customer records updated.")
        } catch (error) {
            const message = String(error)
            setError(message)
            showToast(message, "error")
        } finally {
            setIsSaving(false)
        }
    }
    //////////////////////////////////

    return(
        <div className="mt-5">
            {loading && <p>Loading customer data...</p>}

            {error && <p role="alert">Error: {error}</p>}

            {toast && (
                <Toast message={toast.message} type={toast.type} />
            )}

            {hasLoaded && customer === null && (
                <div className="text-text text-sm mt-10">
                    <h1>Notice</h1>
                    <p>Customer with the ID No. <b className="text-accent-strong">{customerId}</b> was not found.</p>
                    <p>If you are trying to view their records, this customer was likely deleted.</p>

                    <button 
                        className="mt-5 w-15 px-2 py-1 bg-blue-200 hover:bg-blue-300 rounded-lg"
                        onClick={() => navigate(`/orders/customers`)}
                    >
                        Ok
                    </button>
                </div>
            )}

            {customer && (
                <>
                    <DeleteConfirmation
                        isOpen={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        customerId={Number(customerId)}
                        onDelete={handleDeleteCustomer}
                    />
            
                    <div className="border border-border-soft rounded-lg bg-background shadow-xs mb-2">
                        <h4 className="text-accent-strong px-2 py-1">Customer: {customer?.companyName}</h4>
                    </div>

                    <h1 className="text-text">Customer Details</h1>
                    
                    <div className="border border-border-soft rounded-lg px-2 py-3 my-3 bg-background shadow-xs flex gap-2">
                        <div className="flex-1">
                            <h3 className="text-accent-strong mb-2">Customer Information</h3>
                            <table className="border border-border-soft shadow-xs">
                                <tbody>
                                    {generalFields.map(([label, field], index) => {
                                        const value = field === null
                                            ? customer.id
                                            : customer[field]

                                        return (
                                            <tr
                                                key={label}
                                                className={
                                                    index % 2 === 0
                                                        ? "bg-background"
                                                        : "bg-background-light"
                                                }
                                            >
                                                <td className="w-48 font-semibold whitespace-nowrap px-2 py-1">
                                                    {label}
                                                </td>

                                                <td className="w-full px-2 py-1">
                                                    {isEditing && field !== null ? (
                                                        <input
                                                            type="text"
                                                            name={field}
                                                            value={formData[field]}
                                                            onChange={handleFieldChange}
                                                            className="w-full min-w-0 rounded border border-border-soft bg-background px-2 py-1 outline-none focus:border-accent-strong"
                                                        />
                                                    ) : (
                                                        value || "—"
                                                    )}
                                                </td>

                                                <td className="px-1">
                                                    {!isEditing && (
                                                        <CopyButton value={value ?? ""} />
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="flex-1">
                            <h3 className="text-accent-strong mb-2">Financial Details</h3>
                            <table className="border-collapse shadow-xs">
                                <tbody>
                                    {financialFields.map(([label, field], index) => (
                                        <tr
                                            key={label}
                                            className={
                                                index % 2 === 0
                                                    ? "bg-background"
                                                    : "bg-background-light"
                                            }
                                        >
                                            <td className="w-48 font-semibold whitespace-nowrap px-2 py-1">
                                                {label}
                                            </td>

                                            <td className="w-full px-2 py-1">
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        name={field}
                                                        value={formData[field]}
                                                        onChange={handleFieldChange}
                                                        className="w-full min-w-0 rounded border border-border-soft bg-background px-2 py-1 outline-none focus:border-accent-strong"
                                                    />
                                                ) : (
                                                    customer[field] || "—"
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    {/* Buttons */}
                    <div className="flex space-x-2">
                        {isEditing ? (
                            <>
                                <button
                                    type="button"
                                    className="px-3 py-1 rounded-lg text-white bg-green-600 hover:bg-green-500 disabled:opacity-50"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? "Saving..." : "Save"}
                                </button>

                                <button
                                    type="button"
                                    className="px-3 py-1 rounded-lg text-text bg-background border border-border-soft hover:bg-background-light disabled:opacity-50"
                                    onClick={handleDiscard}
                                    disabled={isSaving}
                                >
                                    Discard
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="px-2 py-1 rounded-lg text-text bg-accent-light hover:bg-accent-strong"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit Records
                                </button>

                                <button
                                    type="button"
                                    className="px-2 py-1 rounded-lg text-white bg-red-500 hover:bg-red-400 cursor-pointer"
                                    onClick={() => setIsDeleteModalOpen(true)}
                                >
                                    Delete Customer
                                </button>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default CustomerDetails