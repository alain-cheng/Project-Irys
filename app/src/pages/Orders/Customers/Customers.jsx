import { use, useEffect, useMemo, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import { Plus, Search } from "lucide-react"

import { customers, getAllCustomers, getCustomerById } from "../../../MockData/customers.js"
import { invoke } from "@tauri-apps/api/core"

import Tooltip from "../../components/Tooltip.jsx"
import CustomerDataEntry from "./components/CustomerDataEntry.jsx"
import Toast from "../../components/Toast.jsx"

import useToast from "../../components/hooks/useToast.js"

function Customers() {
    const navigate = useNavigate()

    const {
        selectedCustomer,
        setSelectedCustomer
    } = useOutletContext()

    const { // Toast controller
        toast,
        showToast,
    } = useToast()

    const [searchTerm, setSearchTerm] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [customers, setCustomers] = useState(null)
    const [loading, setLoading] = useState(false)
    const [hasLoaded, setHasLoaded] = useState(false)
    const [error, setError] = useState(null)

    // Load all customers from database
    useEffect(() => {
        async function getAllCustomers() {
            setLoading(true)
            setError(null)
            setHasLoaded(false)
            
            try {
                const result = await invoke("get_all_customers")
                setCustomers(result)
                setHasLoaded(true)
            } catch (error) {
                setError(String(error.message))
            } finally {
                setLoading(false)
            }
        }

        getAllCustomers()
    }, [])

    // Sets the actual displayed data (customers) in the Table, 
    // while also capable of handling filtering actions (i.e. search)
    const filteredView = useMemo(() => {
        const query = searchTerm.toLowerCase().trim()

        if (!query) return customers

        return customers.filter(customer =>
            Object.values(customer).some(value => 
                String(value)
                    .toLowerCase()
                    .includes(query)
            )
        )
    }, [customers, searchTerm])


    async function handleAddCustomer(newCustomer) {
        setError(null)
        setIsSaving(true)

        try {
            const createdCustomer = await invoke("add_customer", {
                customer: newCustomer
            })

            setIsModalOpen(false)

            if (createdCustomer) showToast("Customer created successfully.")

            return createdCustomer
        } catch (error) {
            setError(String(message))
            showToast(error, "error")
        } finally {
            setIsSaving(false)
        }
    }

    async function handleDeleteCustomer(deleteId) {
        setError(null)

        try {
            const deleted = await invoke("delete_customer_by_id", { id: deleteId })

            if (deleted) {
                setCustomers(prev =>
                    prev.filter(c => c.id !== deleteId)
                )

                showToast("Customer deleted.")
            } else {
                showToast("Customer to be deleted not found.", "error")
            }
        } catch (error) {
            setError(String(message))
            showToast(error, "error")
        } 
    }

    return(
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-2xl text-text">Customers</h1>
            
            {/* To summon a toast, see `useToast.js` for example usage */}
            {toast && (
                <Toast message={toast.message} type={toast.type} />
            )}

            <CustomerDataEntry 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                // onSuccess={showToast}
                onSubmit={handleAddCustomer}
                isSaving={isSaving}
            />
            
            {/* Toolbar */}
            <div
                className="flex gap-3 items-center"
            >
                {/* Add Customer */}
                <div className="relative group">
                    <button
                        className="px-2 py-1 rounded-lg bg-accent-light cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="text-accent-strong"/>
                    </button>

                    <Tooltip text="Add New Customer" />
                </div>
                

                {/* Search bar */}
                <div className="relative flex flex-row items-center justify-center">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="text"
                        className="flex-1 pl-10 py-2 border border-border-soft rounded-lg bg-background text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Customer..."
                    />
                </div>
            </div>
            
            
            {/* table container */}
            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        {/* header */}
                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10">ID</th>
                                <th>Company Name</th>
                                <th>Contact Name</th>
                                <th>Contact Title</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Province</th>
                                <th>Zip Code</th>
                                <th>Phone No.</th>
                                <th>FAX</th>
                            </tr>
                        </thead>

                        {/* body */}
                        <tbody className="border">
                            {loading && <tr>Loading customers...</tr>}

                            {error && (<p role="alert">DB Error: {error}</p>)}

                            {customers && (
                                filteredView.map((customer, index) => (
                                    <tr 
                                        key={customer.id} 
                                        onClick={() => setSelectedCustomer(prev => prev === customer.id ? 0 : customer.id)}
                                        onDoubleClick={() => navigate(`/orders/customers/${customer.id}`)} 
                                        className={`
                                            ${ selectedCustomer === customer.id
                                                ? "bg-yellow-200"
                                                : index % 2 === 0
                                                    ? "bg-background"
                                                    : "bg-background-light"
                                            }
                                            hover:bg-accent-soft transition cursor-pointer
                                        `}
                                    >
                                        <td className="sticky left-0 z-5">{customer.id}</td>
                                        <td>{customer.companyName}</td>
                                        <td>{customer.contactName}</td>
                                        <td>{customer.contactTitle}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.city}</td>
                                        <td>{customer.province}</td>
                                        <td>{customer.zipCode}</td>
                                        <td>{customer.phone}</td>
                                        <td>{customer.fax}</td>
                                        
                                    </tr>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Customers