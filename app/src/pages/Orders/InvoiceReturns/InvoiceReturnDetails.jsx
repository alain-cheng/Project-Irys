import { useParams } from "react-router-dom"
import { getInvoiceReturnsById } from "../../../MockData/invoiceReturns"

function InvoiceReturnDetails () {
    const { invoiceReturnId } = useParams()

    const invoiceReturn = getInvoiceReturnsById(Number(invoiceReturnId))

    if (!invoiceReturn) {
        return (
            <div className="mt-10">
                <h1>Error</h1>
                <p>Invoice Return ID No. <b className="text-accent-strong">{invoiceReturnId}</b> was not found.</p>
            </div>
        )
    }

    return(
        <div className="mt-10">
            <h1 className="text-text">Invoice Return</h1>

            <p>Id: {invoiceReturn.id}</p>
        </div>
    )
}

export default InvoiceReturnDetails