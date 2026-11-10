import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import { commonLinks } from "../../../routes/commonLinks"

import Sidebar from "../../components/Sidebar"
import Breadcrumb from "../../../components/Breadcrumb"

function Items() {
    const navigate = useNavigate()
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let active = true

        async function loadItems() {
            try {
                const result = await invoke("get_all_items")
                if (active) setItems(result)
            } catch (error) {
                if (active) setError(String(error))
            } finally {
                if (active) setLoading(false)
            }
        }

        loadItems()

        return () => {
            active = false
        }
    }, [])

    return(
        <div className="flex pt-16 space-x-2">
            <Sidebar links={commonLinks} />

            <main className="ml-70 peer-data-[collapsed=true]:ml-22 transition-[margin] duration-200 motion-reduce:transition-none mr-5 flex-1 min-w-0">
                <Breadcrumb />

                <div className="flex flex-col h-full py-5">
                    <h1 className="text-2xl text-text mb-5">Items</h1>

                    <div className="flex-1 min-h-0">
                        <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                            <table className="bg-background">
        
                                <thead className="sticky top-0 z-10 bg-background border">
                                    <tr>
                                        <th className="sticky left-0 top-0 z-10 bg-background">ID</th>
                                        <th>Item Name</th>
                                        <th>Stocks</th>
                                        <th>Bad Stocks</th>
                                        <th>Unit Code</th>
                                        <th>Comm</th>
                                        <th>Term Code</th>
                                        <th>Location ID</th>
                                        <th>Category ID</th>
                                        <th>Wholesale Price</th>
                                        <th>Wholesale Discount</th>
                                        <th>Retail 1 Price</th>
                                        <th>Retail 1 Discount</th>
                                        <th>Retail 2 Price</th>
                                        <th>Retail 2 Discount</th>
                                        <th>Purchase Price</th>
                                        <th>Purchase Discount</th>
                                        <th>Special Price</th>
                                        <th>Special Discount</th>
                                        <th>Average Cost</th>
                                    </tr>
                                </thead>
        
                                <tbody>
                                    {loading && (
                                        <tr>
                                            <td colSpan={20} role="status">Loading items...</td>
                                        </tr>
                                    )}
                                    {error && (
                                        <tr className="bg-red-200">
                                            <td colSpan={20} role="alert">DB Error: {error}</td>
                                        </tr>
                                    )}
                                    {!loading && !error && items.length === 0 && (
                                        <tr>
                                            <td colSpan={20}>No items found.</td>
                                        </tr>
                                    )}
                                    {items.map((item, index) => (
                                        <tr 
                                            key={item.itemCode}
                                            onClick={() => navigate(`/items/${item.itemCode}`)}
                                            className={`
                                                ${index % 2 === 0
                                                    ? "bg-background"
                                                    : "bg-background-light"
                                                }
                                                bg-background hover:bg-accent-soft transition cursor-pointer
                                            `}
                                        >
                                            <td className="sticky left-0 z-5 bg-background">{item.itemCode}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.unitsInStock}</td>
                                            <td>{item.returnStocks ?? "-"}</td>
                                            <td>{item.unitCode ?? "-"}</td>
                                            <td>{item.itemCommission}</td>
                                            <td>{item.termCode ?? "-"}</td>
                                            <td>{item.itemLocationId ?? "-"}</td>
                                            <td>{item.categoryId ?? "-"}</td>
                                            <td>{item.sellingPrice.toFixed(2)}</td>
                                            <td>{item.sDiscId}</td>
                                            <td>{item.r1SPrice.toFixed(2)}</td>
                                            <td>{item.r1DiscId}</td>
                                            <td>{item.r2Price.toFixed(2)}</td>
                                            <td>{item.r2DiscId}</td>
                                            <td>{item.purchasePrice.toFixed(2)}</td>
                                            <td>{item.pDiscId}</td>
                                            <td>{item.spPrice.toFixed(2)}</td>
                                            <td>{item.spDiscId}</td>
                                            <td>{item.averageCost.toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>    
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Items
