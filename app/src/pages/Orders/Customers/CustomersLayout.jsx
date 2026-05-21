import { useState } from "react"
import { Outlet } from "react-router-dom"

import CustomerNav from "./components/CustomerNav"

/**
 * Layout for the Customers module.
 * Shared states are placed here.
 * 
 * @returns HTML of the Customers Page Layout
 */
function CustomersLayout() {
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    return(
        <div className="flex flex-col gap-2 h-full">
            <CustomerNav />

            <Outlet 
                context={{
                    selectedCustomer,
                    setSelectedCustomer,
                }}
            />
        </div>
    )
}

export default CustomersLayout