import { Icon, List } from "lucide-react"
import { NavLink } from "react-router-dom"

function CustomerNav() {
    return(
        <div className="flex bg-background">
            <NavLink 
                to={`/orders/customers`}
                end
                className={({ isActive }) => 
                    `flex flex-1 items-center justify-center gap-2 border border-border-soft rounded-l-lg ${
                        isActive
                            ? "bg-gray-100"
                            : "hover:bg-accent-soft"
                    }`
                }>
                <List size={15}/>
                <span>List</span>
            </NavLink>
            <NavLink 
                to={`/orders/customers/sales_history`}
                className={({ isActive }) => 
                    `flex-1 border border-border-soft  text-center ${
                        isActive
                            ? "bg-gray-100"
                            : "hover:bg-accent-soft"
                    }`
                }>
                Sales History
            </NavLink>
            <NavLink 
                to={`/orders/customers/payment_history`}
                className={({ isActive }) => 
                    `flex-1 border border-border-soft rounded-r-lg text-center ${
                        isActive
                            ? "bg-gray-100"
                            : "hover:bg-accent-soft"
                    }`
                }>
                Payment History
            </NavLink>
        </div>
    )
}

export default CustomerNav