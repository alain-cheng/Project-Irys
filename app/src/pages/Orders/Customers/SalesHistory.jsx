import { getAllSalesHistory } from "../../../MockData/salesHistory"

function SalesHistory() {
    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Sales History</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="bg-background min-w-full">

                        <thead className="sticky top-0 z-10 bg-background border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 bg-background">Sales ID</th>
                                <th>Order Date</th>
                                <th>Order No.</th>
                                <th>Balance</th>
                                <th>Amount Paid</th>
                                <th>Adjustments</th>
                                <th>Returns</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {getAllSalesHistory().map((s) => (
                                <tr key={s} className="bg-background hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5 bg-background">{s.id}</td>
                                    <td>{s.orderDate.toLocaleDateString()}</td>
                                    <td>{s.orderNumber}</td>
                                    <td>{s.balance.toFixed(2)}</td>
                                    <td>{s.amountPaid.toFixed(2)}</td>
                                    <td>{s.adjustments.toFixed(2)}</td>
                                    <td>{s.returns}</td>
                                    <td>{s.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default SalesHistory