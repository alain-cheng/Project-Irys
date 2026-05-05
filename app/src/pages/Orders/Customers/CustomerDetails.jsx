import { useParams } from "react-router-dom"
import { getCustomerById } from "../../../MockData/customers"

function CustomerDetails () {
    const { customerId } = useParams()

    const customer = getCustomerById(Number(customerId))

    if (!customer) {
        return (
            <div className="mt-10">
                <h1>Error</h1>
                <p>Customer with the ID No. <b className="text-accent-strong">{customerId}</b> was not found.</p>
            </div>
        )
    }

    return(
        <div className="mt-10">
            <h1 className="text-text">Customer Details</h1>

            <p>Id: {customer.id}</p>
            <p>Name: {customer.name}</p>
            <p>Address: {customer.address}</p>
        </div>
    )
}

export default CustomerDetails