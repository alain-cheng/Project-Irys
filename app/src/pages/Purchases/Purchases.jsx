import { Outlet } from "react-router-dom"
import { purchasesLinks } from "../../routes/purchaseLinks"

import Sidebar from "../components/Sidebar"
import Breadcrumb from "../../components/Breadcrumb"

function Purchases() {

    return(
        <div className="flex pt-16 space-x-2">
            <Sidebar links={purchasesLinks} />

            <main className="ml-70 peer-data-[collapsed=true]:ml-22 transition-[margin] duration-200 motion-reduce:transition-none mr-5 flex-1 min-w-0">
                <Breadcrumb />

                <Outlet />
            </main>
        </div>    
    )
}

export default Purchases
