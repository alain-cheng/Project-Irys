import { data, useOutletContext, useParams } from "react-router-dom"
import { getCustomerById } from "../../../MockData/customers"

import CopyButton from "../../components/CopyButton"
import { useEffect } from "react"

function CustomerDetails () {
    const { customerId } = useParams()
    const { setSelectedCustomer } = useOutletContext()

    const customer = getCustomerById(Number(customerId))

    const copyToClipboard = (value) => {
        navigator.clipboard.writeText(String(value))
    }

    if (!customer) {
        return (
            <div className="text-text text-sm mt-10">
                <h1>Error</h1>
                <p>Customer with the ID No. <b className="text-accent-strong">{customerId}</b> was not found.</p>
            </div>
        )
    }

    // Sets the customer to "selected" state when their details page is viewed
    useEffect(() => {
        if (customerId) {
            setSelectedCustomer(Number(customerId))
        }
    }, [customerId, setSelectedCustomer])

    const generalFields = [
        ["Customer ID", customer.id],
        ["Name", customer.name],
        ["Title", customer.title],
        ["Full Address", [customer.address, customer.city, customer.province].filter(Boolean).join(", ")],
        ["Zip Code", customer.zipCode],
        ["Phone Number", customer.phone],
    ]

    const financialFields = [
        ["FAX Number", customer.fax],
        ["TIN Number", customer.tin],
        ["Credit Limit", customer.creditLimit.toFixed(2)],
        ["Salesman", customer.salesman],
    ]

    return(
        <div className="mt-5">
            <div className="border border-border-soft rounded-lg bg-background shadow-xs mb-2">
                <h4 className="text-accent-strong px-2 py-1">Customer: {customer.name}</h4>
            </div>

            <h1 className="text-text">Customer Details</h1>
            
            <div className="border border-border-soft rounded-lg px-2 py-3 my-3 bg-background shadow-xs flex gap-2">
                <div className="flex-1">
                    <h3 className="text-accent-strong mb-2">Customer Information</h3>
                    <table className="border border-border-soft shadow-xs">
                        <tbody>
                            {generalFields.map(([label, value], index) => (
                                <tr
                                    key={label}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-background"
                                            : "bg-background-light"
                                        }
                                    `}
                                >
                                    <td className="w-48 font-semibold whitespace-nowrap">{label}</td>
                                    <td className="w-full">{value}</td>
                                    <td>
                                        <CopyButton value={value}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="flex-1">
                    <h3 className="text-accent-strong mb-2">Financial Details</h3>
                    <table className="border-collapse shadow-xs">
                        <tbody>
                            {financialFields.map(([label, value], index) => (
                                <tr
                                    key={label}
                                    className={
                                        index % 2 === 0
                                        ? "bg-background"
                                        : "bg-background-light"
                                    }
                                >
                                    <td className="w-48 font-semibold whitespace-nowrap">{label}</td>
                                    <td className="w-full">{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerDetails