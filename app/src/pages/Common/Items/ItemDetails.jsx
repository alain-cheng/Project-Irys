import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import { commonLinks } from "../../../routes/commonLinks"
import Sidebar from "../../components/Sidebar"
import CopyButton from "../../components/CopyButton"
import Breadcrumb from "../../../components/Breadcrumb"


function ItemDetails () {
    const { itemId } = useParams()

    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let active = true

        async function loadItem() {
            setLoading(true)
            setError(null)
            setItem(null)

            try {
                const result = await invoke("get_item_by_id", {
                    id: Number(itemId),
                })
                if (active) setItem(result)
            } catch (error) {
                if (active) setError(String(error))
            } finally {
                if (active) setLoading(false)
            }
        }

        loadItem()

        return () => {
            active = false
        }
    }, [itemId])

    if (loading || error || !item) {
        return (
            <div className="pt-16 text-text text-sm">
                <Sidebar links={commonLinks} />

                <main className="ml-70 peer-data-[collapsed=true]:ml-22 transition-[margin] duration-200 motion-reduce:transition-none mr-5 min-w-0">
                    <Breadcrumb />
                    <h1>Item Details</h1>
                    {loading ? (
                        <p role="status">Loading item...</p>
                    ) : error ? (
                        <p role="alert" className="text-red-700">DB Error: {error}</p>
                    ) : (
                        <p>Item with the ID No. <b className="text-accent-strong">{itemId}</b> was not found.</p>
                    )}
                </main>
            </div>
        )
    }

    const generalFields = [
        ["Item ID Number", item.itemCode],
        ["Item", item.itemName],
        ["Category ID", item.categoryId ?? "-"],
        ["Unit Code", item.unitCode ?? "-"],
        ["Commission", item.itemCommission],
        ["Term Code", item.termCode ?? "-"],
        ["Location ID", item.itemLocationId ?? "-"],
    ]

    const numericalFields = [
        ["In Stock", item.unitsInStock],
        ["Bad Stock", item.returnStocks ?? "-"],
    ]

    const priceFields = [
        ["Wholesale", item.sellingPrice.toFixed(2), item.sDiscId],
        ["Retail 1", item.r1SPrice.toFixed(2), item.r1DiscId],
        ["Retail 2", item.r2Price.toFixed(2), item.r2DiscId],
        ["Purchase", item.purchasePrice.toFixed(2), item.pDiscId],
        ["Special", item.spPrice.toFixed(2), item.spDiscId],
        ["Average", item.averageCost.toFixed(2), "-"],
    ]

    return(
        <div className="pt-16">
            <Sidebar links={commonLinks} />

            <main className="flex-1 ml-70 peer-data-[collapsed=true]:ml-22 transition-[margin] duration-200 motion-reduce:transition-none mr-5 min-w-0">
                <Breadcrumb />

                <div className="mb-2 bg-background border border-border-soft rounded-lg  shadow-xs">
                    <h4 className="px-2 py-1 text-accent-strong">Item: {item.itemName}</h4>
                </div>

                <h1 className="text-text">Item Details</h1>
                <div className="flex flex-col gap-2 px-2 py-3 my-2 border border-border-soft rounded-lg bg-background shadow-xs">
                    <h3 className="text-accent-strong">Item Information</h3>

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <table className="border border-border-soft shadow-xs">
                                <tbody>
                                    {generalFields.map(([label, value], index) => (
                                        <tr
                                            key={label}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-background"
                                                    : "bg-background-light"
                                                }
                                            `}
                                        >
                                            <td className="w-48 font-semibold whitespace-nowrap">{label}</td>
                                            <td className="w-full">{value}</td>
                                            <td>
                                                <CopyButton value={value}/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex-1">
                            <table className="border border-border-soft shadow-xs">
                                <tbody>
                                    {numericalFields.map(([label, value], index) => (
                                        <tr
                                            key={label}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-background"
                                                    : "bg-background-light"
                                                }
                                            `}
                                        >
                                            <td className="w-48 font-semibold whitespace-nowrap">{label}</td>
                                            <td className="w-full">{value}</td>
                                            <td>
                                                <CopyButton value={value}/>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <h3 className="text-accent-strong">Pricing per Unit</h3>
                    
                    <div className="">
                        <table className="border border-border-soft shadow-xs">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Amount</th>
                                    <th>Discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {priceFields.map(([label, price, discount], index) => (
                                    <tr
                                        key={label}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-background"
                                                : "bg-background-light"
                                            }
                                        `}
                                    >
                                        <td className="w-48 font-semibold whitespace-nowrap">{label}</td>
                                        <td className="w-full">{price}</td>
                                        <td className="w-full">{discount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default ItemDetails
