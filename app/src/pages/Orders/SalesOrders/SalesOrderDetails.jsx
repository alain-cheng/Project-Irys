import { useParams } from "react-router-dom"
import { getSalesOrderById } from "../../../MockData/salesOrder"

function SalesOrderDetails() {
    const { salesOrderId } = useParams()

    const salesOrder = getSalesOrderById(Number(salesOrderId))

    if (!salesOrder) {
        return(
            <div className="mt-10">
                <h1>Error</h1>
                <p>Sales Order No. <b className="text-accent-strong">{salesOrderId}</b> was not found.</p>
            </div>
        )
    }

    return (
        <div className="">
            <h1 className="text-text">Sales Order</h1>

            <p>Sales Order No.: {salesOrder.id}</p>
            <p>Item Name: {salesOrder.itemName}</p>
            <p>Quantity: {salesOrder.quantity}</p>
        </div>
    )
}

export default SalesOrderDetails