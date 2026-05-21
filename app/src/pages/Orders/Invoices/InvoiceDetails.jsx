import { useParams } from "react-router-dom"
import { getInvoiceById } from "../../../MockData/invoices"

function InvoiceDetails() {
    const { invoiceId } = useParams()

    const invoice = getInvoiceById(Number(invoiceId))

    if (!invoice) {
        return(
            <div className="mt-10">
                <h1>Error</h1>
                <p>Invoice No. <b className="text-accent-strong">{invoiceId}</b> was not found.</p>
            </div>
        )
    }

    return (
        <div className="">
            <h1 className="text-text">Invoice</h1>

            <p>Invoice No.: {invoice.id}</p>
            <p>Customer ID: {invoice.customerId}</p>
            <p>Item ID: {invoice.itemId}</p>
        </div>
    )
}

export default InvoiceDetails