import { useParams } from "react-router-dom"
import { getSupplierById } from "../../../MockData/suppliers"

function SupplierDetails () {
    const { supplierId } = useParams()

    const supplier = getSupplierById(Number(supplierId))

    if (!supplier) {
        return (
            <div className="mt-10">
                <h1>Error</h1>
                <p>Supplier with the ID No. <b className="text-accent-strong">{supplierId}</b> was not found.</p>
            </div>
        )
    }

    return(
        <div className="mt-10">
            <h1 className="text-text">Supplier Details</h1>

            <p>Id: {supplier.id}</p>
            <p>Supplier: {supplier.supplierName}</p>
        </div>
    )
}

export default SupplierDetails