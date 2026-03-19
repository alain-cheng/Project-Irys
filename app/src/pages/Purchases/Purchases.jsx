import { Outlet } from "react-router-dom"
import { purchasesLinks } from "../../routes/purchaseLinks"

import Sidebar from "../components/Sidebar"

function Purchases() {

    return(
        <div className="flex pt-2 space-x-2">
            <Sidebar links={purchasesLinks} />

            <main className="ml-80 mt-20">
                <Outlet />
            </main>
        </div>    
    )
}

export default Purchases