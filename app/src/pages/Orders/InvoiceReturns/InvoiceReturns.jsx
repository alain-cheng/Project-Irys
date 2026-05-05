import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { getAllInvoiceReturns } from "../../../MockData/invoiceReturns"
import { getAllCustomers, getCustomerById } from "../../../MockData/customers"

function InvoiceReturns() {
    const navigate = useNavigate()

    const invoiceReturnsView = useMemo(() => {
        const customersMap = Object.fromEntries(
            getAllCustomers().map(c => [c.id, c])
        )

        return getAllInvoiceReturns().map(ir => ({
            ...ir,
            customerName: customersMap[ir.customerId]?.name ?? "-",
        }))
    }, [])

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Invoice Returns</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">ID</th>
                                <th>Customer</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Order No.</th>
                                <th>Return Date</th>
                                <th>Order Date</th>
                                <th>Item No.</th>
                                <th>Unit</th>
                                <th>Unit Price</th>
                                <th>Discount</th>
                                <th>Qty Returned</th>
                                <th>Bad Stock</th>
                                <th>Amount Returned</th>
                                <th>Remarks</th>
                            </tr>
                        </thead>

                        <tbody>
                            {invoiceReturnsView.map((ir) => (
                                <tr 
                                    key={ir.id} 
                                    onClick={() => navigate(`/orders/invoice_returns/${ir.id}`)}
                                    className="bg-background hover:bg-accent-soft transition cursor-pointer"
                                >
                                    <td className="sticky left-0 z-5 ">{ir.id}</td>
                                    <td>{ir.customerName}</td>
                                    <td>{ir.address}</td>
                                    <td>{ir.phone}</td>
                                    <td>{ir.orderNumber}</td>
                                    <td>{ir.returnDate}</td>
                                    <td>{ir.orderDate}</td>
                                    <td>{ir.itemId}</td>
                                    <td>{ir.unit}</td>
                                    <td>{ir.unitPrice}</td>
                                    <td>{ir.discount}</td>
                                    <td>{ir.qtyReturned}</td>
                                    <td>{ir.badStock}</td>
                                    <td>{ir.amtReturned}</td>
                                    <td>{ir.remarks}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>    
                </div>
            </div>
        </div>
    )
}

export default InvoiceReturns