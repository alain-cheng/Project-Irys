import { useEffect } from "react"
import { invoke } from "@tauri-apps/api/core"
import { Outlet } from "react-router-dom"
import { orderLinks } from "../../routes/orderLinks"

import Sidebar from "../components/Sidebar"
import Breadcrumb from "../../components/Breadcrumb"

function Orders() {
    // test Rust call
    useEffect(() => {
        const testRust = async () => {
            const message = await invoke("greet", {
                name: "Test",
            })

            console.log(message)
        }

        testRust()
    }, [])

    return (
        <div className="flex pt-16 space-x-2">
            <Sidebar links={orderLinks} />

            <main className="ml-70 mr-5 flex-1 min-w-0">
                <Breadcrumb />

                <Outlet />
            </main>
        </div>
    )
}

export default Orders