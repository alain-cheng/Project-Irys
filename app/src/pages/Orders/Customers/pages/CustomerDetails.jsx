import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"
import { useOutletContext, useParams } from "react-router-dom"
import useToast from "../../../components/hooks/useToast"

import CopyButton from "../../../components/CopyButton"
import Toast from "../../../components/Toast"
import DeleteConfirmation from "../components/DeleteConfirmation"
import { Bell, BellDot, CircleX, Pencil, Save, Trash } from "lucide-react"
import Tooltip from "../../../components/Tooltip"


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
        alarm: false,
        employeeId: 0,
        priceLvl: 0,
        creditLimit: 0,
        balance: 0,
        credit: 0,
        invBalance: 0,
        tin: "",
        areaCode: 0,
        customerCode: "",
        customerArea: "",
        customerAgent: "",
        agentName: "",
        customerType: "",
        startDate: "",
        smCode: "",
        term: "",
        termCode: "",
        pType: "",
        remarks: "",
    })
    //////////////////////////////////

    const generalFields = [
        { label: "Customer ID", field: null, type: null },
        { label: "Company Name", field: "companyName", type: "text" },
        { label: "Contact Name", field: "contactName", type: "text" },
        { label: "Contact Title", field: "contactTitle", type: "text" },
        { label: "Address", field: "address", type: "text" },
        { label: "City", field: "city", type: "text" },
        { label: "Province", field: "province", type: "text" },
        { label: "Zip Code", field: "zipCode", type: "text" },
        { label: "Phone Number", field: "phone", type: "text" },
        { label: "Employee", field: "employeeId", type: "number", min: 0,step: 1,},
        { label: "FAX Number", field: "fax", type: "text" },
        { label: "TIN", field: "tin", type: "text" },
        { label: "Area Code", field: "areaCode", type: "number", min: 0, step: 1, },
        { label: "Customer Code", field: "customerCode", type: "text" },
        { label: "Customer Area", field: "customerArea", type: "text" },
        { label: "Customer Agent", field: "customerAgent", type: "text" },
        { label: "Agent Name", field: "agentName", type: "text" },
        { label: "Customer Type", field: "customerType", type: "text" },
        { label: "Start Date", field: "startDate", type: "date" },
        { label: "SM Code", field: "smCode", type: "text" },
        { label: "Term", field: "term", type: "text" },
        { label: "Term Code", field: "termCode", type: "text" },
        { label: "P Type", field: "pType", type: "text" },
    ]


    const financialFields = [
        ["Price Level", "priceLvl"],
        ["Credit Limit", "creditLimit"],
        ["Balance", "balance"],
        ["Credit", "credit"],
        ["Inventory Balance", "invBalance"],
    ]

    const toggleFields = [
        ["Alarm", "alarm"],
    ]

    const textFields = [
        ["Remarks", "remarks"]
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
            alarm: customer.alarm ?? false,
            employeeId: customer.employeeId ?? 0,
            priceLvl: customer.priceLvl ?? 0,
            creditLimit: customer.creditLimit ?? 0,
            balance: customer.balance ?? 0,
            credit: customer.credit ?? 0,
            invBalance: customer.invBalance ?? 0,
            tin: customer.tin ?? "",
            areaCode: customer.areaCode ?? 0,
            customerCode: customer.customerCode ?? "",
            customerArea: customer.customerArea ?? "",
            customerAgent: customer.customerAgent ?? "",
            agentName: customer.agentName ?? "",
            customerType: customer.customerType ?? "",
            startDate: customer.startDate ?? "",
            smCode: customer.smCode ?? "",
            term: customer.term ?? "",
            termCode: customer.termCode ?? "",
            pType: customer.pType ?? "",
            remarks: customer.remarks ?? "",
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

        // convert blank inputs into null
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
            alarm: Boolean(formData.alarm),
            employeeId: parseInt(formData.employeeId, 10),
            priceLvl: parseInt(formData.priceLvl, 10),
            creditLimit: Number(formData.creditLimit),
            balance: Number(formData.balance),
            credit: Number(formData.credit),
            invBalance: Number(formData.invBalance),
            tin: nullable(formData.tin),
            areaCode: parseInt(formData.areaCode, 10),
            customerCode: nullable(formData.customerCode),
            customerArea: nullable(formData.customerArea),
            customerAgent: nullable(formData.customerAgent),
            agentName: nullable(formData.agentName),
            customerType: nullable(formData.customerType),
            startDate: nullable(formData.startDate),
            smCode: nullable(formData.smCode),
            term: nullable(formData.term),
            termCode: nullable(formData.termCode),
            pType: nullable(formData.pType),
            remarks: nullable(formData.remarks),
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

    /* 
        TODO: 
        - Display alarm
        - Input validation
    */
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

                    <h1 className="text-text mb-2">Customer Details</h1>

                    {/* Toolbar */}
                    <div className="flex bg-background border border-border-soft rounded-lg">
                        {/* Icon Buttons */}
                        <div className="flex flex-1 px-2 py-3 justify-start items-center">
                            <div className="relative group">
                                <button 
                                    className={`
                                        px-2 py-2 border border-border-soft rounded-full 
                                        ${ isEditing ? "cursor-pointer" : ""}
                                        ${ formData.alarm ? "bg-red-200 border-red-500" : ""}
                                    `}
                                    disabled={!isEditing}
                                    onClick={() => 
                                        setFormData(prev => ({
                                            ...prev,
                                            alarm: !prev.alarm
                                        }))
                                    }
                                >
                                    {formData.alarm ? (
                                        <>
                                            <BellDot size={20} className="text-red-500" />
                                        </>
                                    ) : (
                                        <>
                                            <Bell size={20} className="text-text" />
                                        </>
                                    )}
                                    
                                </button>
                                <Tooltip 
                                    text={`
                                        ${isEditing 
                                            ? `${formData.alarm 
                                                ? "Turn off alarm" 
                                                : "Turn on alarm"
                                                }` 
                                            : `${formData.alarm 
                                                ? "Edit to turn off alarm" 
                                                : "Edit to turn on alarm"
                                                }`
                                        }
                                    `}
                                />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-1 px-2 py-3 space-x-2 justify-end">
                            {isEditing ? (
                                <>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center px-2 py-1 rounded-lg text-white bg-green-600 hover:bg-green-500 disabled:opacity-50"
                                        onClick={handleSave}
                                        disabled={isSaving}
                                    >
                                        <Save size={15} className="mr-2"/>
                                        {isSaving ? "Saving..." : "Save"}
                                    </button>

                                    <button
                                        type="button"
                                        className="flex items-center justify-center px-2 py-1 rounded-lg text-text bg-background border border-border-soft hover:bg-background-light disabled:opacity-50"
                                        onClick={handleDiscard}
                                        disabled={isSaving}
                                    >
                                        <CircleX size={15} className="mr-2"/>
                                        Discard
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center px-2 py-1 rounded-lg text-text bg-accent-light hover:bg-accent-strong"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <Pencil size={15} className="mr-2"/>
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        className="flex items-center justify-center px-2 py-1 rounded-lg text-white bg-red-500 hover:bg-red-400 cursor-pointer"
                                        onClick={() => setIsDeleteModalOpen(true)}
                                    >
                                        <Trash size={15} className="mr-2"/>
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div className="border border-border-soft rounded-lg px-2 py-3 my-3 bg-background shadow-xs flex gap-2">
                        <div className="flex-1">
                            <h3 className="text-accent-strong mb-2">Customer Information</h3>
                            <table className="border border-border-soft shadow-xs">
                                <tbody>
                                    {generalFields.map(({label, field, type, min, max, step}, index) => {
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
                                                            type={type}
                                                            name={field}
                                                            value={formData[field] ?? ""}
                                                            onChange={handleFieldChange}
                                                            min={min}
                                                            max={max}
                                                            step={step}
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
                        
                        <div className="flex-1 space-y-3">
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
                                                        type="number"
                                                        name={field}
                                                        value={formData[field]}
                                                        onChange={handleFieldChange}
                                                        className="w-full min-w-0 rounded border border-border-soft bg-background px-2 py-1 outline-none focus:border-accent-strong"
                                                    />
                                                ) : (
                                                    customer[field] || "—"
                                                )}
                                            </td>

                                            <td className="px-1">
                                                {!isEditing && (
                                                    <CopyButton value={customer[field] ?? ""} />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            
                            {textFields.map(([label, field]) => (
                                <div className="flex-col space-y-3">
                                    <h3 className="text-accent-strong">{label}</h3>
                                    <textarea 
                                        rows={4} 
                                        name={field} 
                                        onChange={handleFieldChange}
                                        className="w-full px-2 py-2 text-sm resize-none border border-border-soft" 
                                        disabled={!isEditing}
                                    >
                                        {customer[field]}
                                    </textarea>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CustomerDetails