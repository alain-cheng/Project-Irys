import { invoices, getAllInvoices } from "../../../MockData/invoices"
import { getCustomerById } from "../../../MockData/customers"
import { getItemById } from "../../../MockData/items"
import { getUnitById } from "../../../MockData/units"

function Invoices() {
    return (
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Invoices</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="bg-background">

                        <thead className="sticky top-0 z-10 bg-background border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 bg-background">ID</th>
                                <th>Customer</th>
                                <th>Item</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Packaging</th>
                                <th>Unit Price</th>
                                <th>Discount</th>
                                <th>Amount</th>
                            </tr>
                        </thead>

                        <tbody className="border">
                            {getAllInvoices().map((invoice) => (
                                <tr key={invoice.id} className="bg-background hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5 bg-background">{invoice.id}</td>
                                    <td>{getCustomerById(invoice.customerId).name}</td>
                                    <td>{getItemById(invoice.itemId).itemName}</td>
                                    <td>{invoice.quantity}</td>
                                    <td>{getUnitById(invoice.unitId).unitName}</td>
                                    <td>{invoice.packaging}</td>
                                    <td>{invoice.unitPrice}</td>
                                    <td>{invoice.discount}</td>
                                    <td>{invoice.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Invoices