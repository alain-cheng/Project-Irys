import Sidebar from "../components/Sidebar"

function Orders() {
    const orderLinks = [
        { label: "Customers", path: "/orders/customers" },
        { label: ""}
    ]

    return (
        <div className="flex pt-2 space-x-2">
            <Sidebar 
                links={orderLinks}
            />

            <main>
                <h1 className="text-2xl text-text">Orders</h1>
            </main>
        </div>
    )
}

export default Orders