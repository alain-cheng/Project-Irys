import { useMemo, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"

import { customers, getAllCustomers, getCustomerById } from "../../../MockData/customers.js"

import { Search } from "lucide-react"

function Customers() {
    const navigate = useNavigate()
    
    const {
        selectedCustomer,
        setSelectedCustomer
    } = useOutletContext()

    const [searchTerm, setSearchTerm] = useState("")

    // Retrieves and loads all customers from the database
    const [customersView, setCustomersView] = useState(() => {
        return getAllCustomers().map(c => ({
            ...c,
        }))
    }, [])

    // Sets the actual displayed data in the Table while also handling filtering
    const filteredView = useMemo(() => {
        const query = searchTerm.toLowerCase().trim()

        if (!query) return customersView

        return customersView.filter(customer =>
            Object.values(customer).some(value => 
                String(value)
                    .toLowerCase()
                    .includes(query)
            )
        )
    }, [customersView, searchTerm])

    const handleAddCustomer = () => {
        const newCustomer = {
            id: Date.now(),
            name: "New Customer",
            title: "Mr.",
            address: "Somewhere",
            city: "City",
            province: "Province",
            zipCode: 1234,
            phone: "639000000000",
            fax: "0000",
            tin: "0000000",
            creditLimit: 50.50,
            salesman: "Demo"
        }
        setCustomersView(prev => [...prev, newCustomer])
    }

    return(
        <div className="flex flex-col gap-2 h-full">
            <h1 className="text-2xl text-text">Customers</h1>
            
            {/* Search bar */}
            <div className="flex flex-row items-center justify-center">
                <Search className="w-10" />
                <input 
                    type="text"
                    className="flex-1 px-3 py-1 border border-border-soft rounded-2xl bg-background text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Customer..."
                />
            </div>
            
            {/* table container */}
            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        {/* header */}
                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10">ID</th>
                                <th>Name</th>
                                <th>Title</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Province</th>
                                <th>Zipcode</th>
                                <th>Phone</th>
                                <th>Fax</th>
                                <th>TIN</th>
                                <th>Credit Limit</th>
                                <th>Salesman</th>
                            </tr>
                        </thead>

                        {/* body */}
                        <tbody className="border">
                            {filteredView.map((customer, index) => (
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
                                    <td>{customer.name}</td>
                                    <td>{customer.title}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.city}</td>
                                    <td>{customer.province}</td>
                                    <td>{customer.zipCode}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.fax}</td>
                                    <td>{customer.tin}</td>
                                    <td>{customer.creditLimit.toFixed(2)}</td>
                                    <td>{customer.salesman}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Customers