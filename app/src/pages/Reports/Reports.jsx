import { useState } from "react"
import InventoryReports from "./components/InventoryReports"
import MiscReports from "./components/MiscReports"
import OrdersReports from "./components/OrdersReports"
import PurchasesReports from "./components/PurchasesReports"

function Reports() {
    /// Constants
    const REPORTS_TYPE = {
        Default: "Inventory",
        Inventory: "Inventory",
        Orders: "Orders",
        Purchases: "Purchases",
        Misc: "Misc"
    }

    const REPORT_COMPONENTS = {
        [REPORTS_TYPE.Inventory]: InventoryReports,
        [REPORTS_TYPE.Orders]: OrdersReports,
        [REPORTS_TYPE.Purchases]: PurchasesReports,
        [REPORTS_TYPE.Misc]: MiscReports
    }

    /// react states
    const [Selected, setSelected] = useState(REPORTS_TYPE.Default)

    const ActiveComponent = REPORT_COMPONENTS[Selected]

    return(
        <div className="flex space-x-2">
            <main className="flex-1 border px-5 py-20">
                <h1 className="text-2xl text-text">Reports</h1>

                <div className="px-5">
                    <div className="flex flex-row gap-1 mt-5">
                        <div 
                            onClick={() => setSelected(REPORTS_TYPE.Inventory)}
                            className={`border border-b-0 px-5 rounded-t-lg hover:bg-accent-soft hover:cursor-pointer
                                ${Selected === REPORTS_TYPE.Inventory
                                    ? "bg-accent border-none font-bold"
                                    : "hover:bg-accent-soft"
                                }
                            `}
                        >
                            Inventory
                        </div>
                        <div 
                            onClick={() => setSelected(REPORTS_TYPE.Orders)}
                            className={`border border-b-0 px-5 rounded-t-lg hover:bg-accent-soft hover:cursor-pointer
                                ${Selected === REPORTS_TYPE.Orders
                                    ? "bg-accent border-none font-bold"
                                    : "hover:bg-accent-soft"
                                }
                            `}
                        >
                            Orders
                        </div>
                        <div 
                            onClick={() => setSelected(REPORTS_TYPE.Purchases)}
                            className={`border border-b-0 px-5 rounded-t-lg hover:bg-accent-soft hover:cursor-pointer
                                ${Selected === REPORTS_TYPE.Purchases
                                    ? "bg-accent border-none font-bold"
                                    : "hover:bg-accent-soft"
                                }
                            `}
                            >
                            Purchases
                        </div>
                        <div 
                            onClick={() => setSelected(REPORTS_TYPE.Misc)}
                            className={`border border-b-0 px-5 rounded-t-lg hover:bg-accent-soft hover:cursor-pointer
                                ${Selected === REPORTS_TYPE.Misc
                                    ? "bg-accent border-none font-bold"
                                    : "hover:bg-accent-soft"
                                }
                            `}
                        >
                            Misc.
                        </div>
                    </div>

                    <div className="border w-full h-full bg-background rounded-lg rounded-tl-none">
                        <ActiveComponent />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Reports