import { customers, getCustomerById } from "../../../MockData/customers.js"

function Customers() {

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Customers</h1>

            {/* table container */}
            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="bg-background min-w-full">

                        {/* header */}
                        <thead className="sticky top-0 z-10 bg-background border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 bg-background">ID</th>
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
                            {customers.map((customer) => (
                                <tr key={customer.id} className="bg-background hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5 bg-background">{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.title}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.city}</td>
                                    <td>{customer.province}</td>
                                    <td>{customer.zipCode}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.fax}</td>
                                    <td>{customer.tin}</td>
                                    <td>{customer.creditLimit}</td>
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