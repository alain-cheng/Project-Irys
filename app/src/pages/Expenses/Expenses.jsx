import { Outlet } from "react-router-dom"
import { expensesLinks } from "../../routes/expensesLinks"

import Sidebar from "../components/Sidebar"

function Expenses() {

    return(
        <div className="flex pt-2 space-x-2">
            <Sidebar links={expensesLinks} />

            <main className="ml-80 mt-20">
                <Outlet />
            </main>
        </div>
    )
}

export default Expenses