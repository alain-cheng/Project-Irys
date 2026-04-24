import { useMemo } from "react";

import { getAllSuppliers } from "../../../MockData/suppliers";

function Suppliers () {
    const suppliersView = useMemo(() => {
        return getAllSuppliers().map(supplier => ({
            ...supplier,
        }))
    }, [])

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Suppliers</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">
                        <thead className="sticky top-0 z-10 border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10">Supplier Id</th>
                                <th>Supplier Name</th>
                                <th>Contact</th>
                                <th>Title</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Province</th>
                                <th>Zipcode</th>
                                <th>Phone</th>
                                <th>Header1</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {suppliersView.map((supplier) => (
                                <tr key={supplier.id} className="hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5">{supplier.id}</td>
                                    <td>{supplier.supplierName}</td>
                                    <td>{supplier.contact}</td>
                                    <td>{supplier.title}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.city}</td>
                                    <td>{supplier.province}</td>
                                    <td>{supplier.zipCode}</td>
                                    <td>{supplier.phone}</td>
                                    <td>{supplier.header1}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Suppliers