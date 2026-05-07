import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { customers, getAllCustomers, getCustomerById } from "../../../MockData/customers.js"

function Customers() {
    const navigate = useNavigate()

    const [customersView, setCustomersView] = useState(() => {
        return getAllCustomers().map(c => ({
            ...c,
        }))
    }, [])

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
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Customers</h1>
            
            <button
                onClick={handleAddCustomer}
                className="border px-3 py-2 mb-3 hover:bg-accent-soft"
            >
                +Add
            </button>
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
                            {customersView.map((customer, index) => (
                                <tr 
                                    key={customer.id} 
                                    onClick={() => navigate(`/orders/customers/${customer.id}`)} 
                                    className={`${index % 2 === 0 ? "bg-background" : "bg-background-light"} hover:bg-accent-soft transition cursor-pointer`}
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