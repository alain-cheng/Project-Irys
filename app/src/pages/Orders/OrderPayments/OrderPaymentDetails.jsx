import { useParams } from "react-router-dom"
import { getPaymentById } from "../../../MockData/payments"

function OrderPaymentDetails() {
    const { orderPaymentId } = useParams()

    const orderPayment = getPaymentById(Number(orderPaymentId))

    if (!orderPayment) {
        return(
            <div className="mt-10">
                <h1>Error</h1>
                <p>Payment ID. <b className="text-accent-strong">{orderPaymentId}</b> was not found.</p>
            </div>
        )
    }

    return (
        <div className="">
            <h1 className="text-text">Order Payment</h1>

            <p>Order Payment ID: {orderPayment.id}</p>
        </div>
    )
}

export default OrderPaymentDetails