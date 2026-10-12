import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function Dashboard() {
    const [customer, setCustomer] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [hasLoaded, setHasLoaded] = useState(false)

    async function loadCustomer() {
        setLoading(true)
        setError(null)
        setHasLoaded(false)

        try {
            const result = await invoke("get_customer")
            setCustomer(result)
            setHasLoaded(true)
        } catch (err) {
            setError(String(err))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex space-x-2">
            <main className="ml-5 mt-20">
                <h1 className="text-2xl text-text">Dashboard</h1>

                <section>
                    <h2>Test</h2>
                    <button
                        className="border hover:cursor-pointer"
                        onClick={loadCustomer}
                        disabled={loading}
                    >
                        { loading ? "Loading..." : "Load first customer in db"}
                    </button>

                    {error && (
                        <p role="alert">DB Error: {error}</p>
                    )}

                    {hasLoaded && customer === null && (
                        <p>No customers were found in the DB.</p>
                    )}

                    {customer && (
                        <div>
                            <p>Customer ID: {customer.id}</p>
                            <p>Company Name: {customer.companyName}</p>
                            <p>City: {customer.city}</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}

export default Dashboard