import { useMemo } from "react"

import { invoices, getAllInvoices } from "../../../MockData/invoices"
import { getAllCustomers, getCustomerById } from "../../../MockData/customers"
import { getAllItems, getItemById, items } from "../../../MockData/items"
import { getAllUnits, getUnitById } from "../../../MockData/units"

function Invoices() {

    const invoicesView = useMemo(() => {
        const customersMap = Object.fromEntries(
            getAllCustomers().map(c => [c.id, c])
        )

        const itemsMap = Object.fromEntries(
            getAllItems().map(i => [i.id, i])
        )

        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        return getAllInvoices().map(invoice => ({
            ...invoice,
            customerName: customersMap[invoice.customerId]?.name ?? "-",
            itemName: itemsMap[invoice.itemId]?.itemName ?? "-",
            unitName: unitsMap[invoice.unitId]?.unitName ?? "-",
        }))
    }, [])

    return (
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Invoices</h1>

            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="min-w-full">

                        <thead className="sticky top-0 z-10  border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 ">ID</th>
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
                            {invoicesView.map((invoice) => (
                                <tr key={invoice.id} className=" hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5 ">{invoice.id}</td>
                                    <td>{invoice.customerName}</td>
                                    <td>{invoice.itemName}</td>
                                    <td>{invoice.quantity}</td>
                                    <td>{invoice.unitName}</td>
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