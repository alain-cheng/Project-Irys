import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"
import { data, useOutletContext, useParams } from "react-router-dom"
import { getCustomerById } from "../../../../MockData/customers"
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

    const [refreshKey, setRefreshKey] = useState(0)
    const [customer, setCustomer] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)
    const [error, setError] = useState(null)
    const [generalFields, setGeneralFields] = useState(null)
    const [financialFields, setFinancialFields] = useState(null)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

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
                setHasLoaded(true)
            } catch (error) {
                setError(String(error))
            } finally {
                setLoading(false)
            }
        }

        getCustomerById()
    }, [refreshKey])

    // fills the data fields once customer is loaded
    useEffect(() => {
        setGeneralFields([
            ["Customer ID", customer?.id],
            ["Company Name", customer?.companyName],
            ["Contact Title", customer?.contactTitle],
            ["Full Address", [customer?.address, customer?.city, customer?.province].filter(Boolean).join(", ")],
            ["Zip Code", customer?.zipCode],
            ["Phone Number", customer?.phone],
        ])

        setFinancialFields([
            ["FAX Number", customer?.fax],
            // ["TIN Number", customer?.tin],
            // ["Credit Limit", customer?.creditLimit.toFixed(2)],
            // ["Salesman", customer?.salesman],
        ])
    }, [customer])

    // Sets the customer to "selected" state when their details page is viewed
    useEffect(() => {
        if (customerId) {
            setSelectedCustomer(Number(customerId))
        }
    }, [customerId, setSelectedCustomer])

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
                                    {generalFields.map(([label, value], index) => (
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
                                            <td className="w-full">{value}</td>
                                            <td>
                                                <CopyButton value={value}/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        <div className="flex-1">
                            <h3 className="text-accent-strong mb-2">Financial Details</h3>
                            <table className="border-collapse shadow-xs">
                                <tbody>
                                    {financialFields.map(([label, value], index) => (
                                        <tr
                                            key={label}
                                            className={
                                                index % 2 === 0
                                                ? "bg-background"
                                                : "bg-background-light"
                                            }
                                        >
                                            <td className="w-48 font-semibold whitespace-nowrap">{label}</td>
                                            <td className="w-full">{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="flex space-x-2">
                        <button
                            className="px-2 py-1 rounded-lg text-text bg-accent-light hover:bg-accent-strong"
                        >
                            Edit Records
                        </button>

                        <button
                            className="px-2 py-1 rounded-lg text-white bg-red-500 hover:bg-red-400 cursor-pointer"
                            onClick={() => setIsDeleteModalOpen(true)}
                        >
                            Delete Customer
                        </button>
                    </div>
                    
                </>
            )}
        </div>
    )
}

export default CustomerDetails