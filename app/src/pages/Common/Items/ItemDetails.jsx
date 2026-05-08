import { useParams } from "react-router-dom"

import { getItemById } from "../../../MockData/items"
import { getUnitById } from "../../../MockData/units"
import { getItemCategoryById } from "../../../MockData/itemCategories"
import { getAverageCost } from "../../../helpers/helpers"

import { commonLinks } from "../../../routes/commonLinks"
import Sidebar from "../../components/Sidebar"
import CopyButton from "../../components/CopyButton"
import Breadcrumb from "../../../components/Breadcrumb"


function ItemDetails () {
    const { itemId } = useParams()

    const item = getItemById(Number(itemId))

    if (!item) {
        return (
            <div className="p-8 text-text text-sm">
                <Sidebar links={commonLinks} />

                <div className="mt-10">
                    <h1>Error</h1>
                    <p>Item with the ID No. <b className="text-accent-strong">{itemId}</b> was not found.</p>
                </div>
            </div>
        )
    }

    const generalFields = [
        ["Item ID Number", item.id],
        ["Item", item.itemName],
        ["Category", getItemCategoryById(item.categoryId).categoryName],
        ["Unit", getUnitById(item.unitId).unitName],
        ["Commission", item.comm],
        ["Terms", item.terms],
        ["Location", item.loc],
    ]

    const numericalFields = [
        ["In Stock", item.stocks],
        ["Bad Stock", item.badStocks],
    ]

    const priceFields = [
        ["Wholesale", item.wholesalePrice.toFixed(2), item.wholesaleDiscount],
        ["Retail 1", item.retail1Price.toFixed(2), item.retail1Discount],
        ["Retail 2", item.retail2Price.toFixed(2), item.retail2Discount],
        ["Purchase", item.purchasePrice.toFixed(2), item.purchaseDiscount],
        ["Special", item.specialPrice.toFixed(2), item.specialDiscount],
        ["Average", getAverageCost(item).toFixed(2), 0],
    ]

    return(
        <div className="pt-16">
            <Sidebar links={commonLinks} />

            <main className="flex-1 ml-70 mr-5 min-w-0">
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