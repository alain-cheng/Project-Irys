import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { getAllCollection } from "../../../MockData/collection"

function Collections() {
    const navigate = useNavigate()

    const collectionsView = useMemo(() => {
        return getAllCollection().map(c => ({
            ...c,
        }))
    }, [])

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Collections</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">ID</th>
                                <th>Salesman</th>
                                <th>Invoice No.</th>
                                <th>Order Date</th>
                                <th>Customers</th>
                                <th>Amount</th>
                                <th>Balance</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {collectionsView.map((c) => (
                                <tr 
                                    key={c.id} 
                                    onClick={() => navigate(`/orders/collections/${c.id}`)}
                                    className="bg-background hover:bg-accent-soft transition"
                                >
                                    <td className="sticky left-0 z-5 ">{c.id}</td>
                                    <td>{c.salesman}</td>
                                    <td>{c.invoiceId}</td>
                                    <td>{c.orderDate.toLocaleDateString()}</td>
                                    <td>{c.customers}</td>
                                    <td>{c.amount.toFixed(2)}</td>
                                    <td>{c.balance.toFixed(2)}</td>
                                    <td>{c.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    )
}

export default Collections