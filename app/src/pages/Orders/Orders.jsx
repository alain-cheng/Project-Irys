import { Outlet } from "react-router-dom"
import { orderLinks } from "../../routes/orderLinks"

import Sidebar from "../components/Sidebar"

function Orders() {
    return (
        <div className="flex pt-2 space-x-2">
            <Sidebar links={orderLinks} />

            <main className="ml-80 mt-20">
                <Outlet />
            </main>
        </div>
    )
}

export default Orders