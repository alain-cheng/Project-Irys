import { Outlet } from "react-router-dom"
import { expensesLinks } from "../../routes/expensesLinks.js"

import Sidebar from "../components/Sidebar"
import Breadcrumb from "../../components/Breadcrumb.jsx"

function Expenses() {

    return(
        <div className="flex pt-16 space-x-2">
            <Sidebar links={expensesLinks} />

            <main className="ml-70 mr-5 flex-1 min-w-0">
                <Breadcrumb />

                <Outlet />
            </main>
        </div>
    )
}

export default Expenses