import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"
import { Image as ImageIcon } from "lucide-react"

import { commonLinks } from "../../../routes/commonLinks"
import Sidebar from "../../components/Sidebar"
import CopyButton from "../../components/CopyButton"
import Breadcrumb from "../../../components/Breadcrumb"

function ItemPhoto({ photoFile, itemName }) {
    const [failed, setFailed] = useState(false)
    const source = photoFile?.trim()

    return (
        <div className="mx-auto aspect-square w-full max-w-64 overflow-hidden rounded-lg border border-border-soft bg-background-light">
            {source && !failed ? (
                <img
                    src={source}
                    alt={itemName}
                    onError={() => setFailed(true)}
                    className="h-full w-full object-contain p-3"
                />
            ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-text">
                    <ImageIcon size={48} strokeWidth={1} aria-hidden="true" />
                    <span className="text-sm">No photo available</span>
                </div>
            )}
        </div>
    )
}


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
                <div className="grid grid-cols-1 items-start gap-6 px-4 py-4 my-2 border border-border-soft rounded-lg bg-background shadow-xs lg:grid-cols-2">
                    <div className="min-w-0 space-y-5">
                        <section aria-labelledby="item-photo-heading" className="space-y-3">
                            <ItemPhoto
                                key={`${item.itemCode}:${item.photoFile ?? ""}`}
                                photoFile={item.photoFile}
                                itemName={item.itemName}
                            />
                        </section>

                        <section aria-labelledby="item-information-heading" className="space-y-3">
                            <h3 id="item-information-heading" className="text-accent-strong">Item Information</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border border-border-soft shadow-xs overflow-hidden">
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
                                                <td className="w-full"><span className="whitespace-normal wrap-break-word">{value}</span></td>
                                                <td>
                                                    <CopyButton value={value}/>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        <section aria-labelledby="item-stock-heading" className="space-y-3">
                            <div className="overflow-x-auto">
                                <table className="w-full border border-border-soft shadow-xs overflow-hidden">
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
                        </section>
                    </div>

                    <section aria-labelledby="item-pricing-heading" className="min-w-0 space-y-3">
                        <h3 id="item-pricing-heading" className="text-accent-strong">Pricing per Unit</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full border border-border-soft shadow-xs">
                                <thead>
                                    <tr>
                                        <th>Price Type</th>
                                        <th className="text-right">Amount</th>
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
                                            <td className="font-semibold whitespace-nowrap">{label}</td>
                                            <td className="text-right tabular-nums">{price}</td>
                                            <td>{discount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}

export default ItemDetails
