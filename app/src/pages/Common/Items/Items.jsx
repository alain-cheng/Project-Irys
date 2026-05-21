import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

import { getAverageCost } from "../../../helpers/helpers"
import { getAllItems } from "../../../MockData/items"
import { getAllUnits, getUnitById, units } from "../../../MockData/units"
import { getAllItemCategories, getItemCategoryById } from "../../../MockData/itemCategories"

import { commonLinks } from "../../../routes/commonLinks"

import Sidebar from "../../components/Sidebar"
import Breadcrumb from "../../../components/Breadcrumb"

function Items() {
    const navigate = useNavigate()
    
    const itemViews = useMemo(() => {
        const unitsMap = Object.fromEntries(
            getAllUnits().map(u => [u.id, u])
        )

        const categoriesMap = Object.fromEntries(
            getAllItemCategories().map(ic => [ic.id, ic])
        )

        return getAllItems().map(item => ({
            ...item,
            unitName: unitsMap[item.unitId]?.unitName ?? "-",
            categoryName: categoriesMap[item.categoryId]?.categoryName ?? "-",
        }))
    }, [])

    return(
        <div className="flex pt-16 space-x-2">
            <Sidebar links={commonLinks} />

            <main className="ml-70 mr-5 flex-1 min-w-0">
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
                                        <th>Unit</th>
                                        <th>Comm</th>
                                        <th>Terms</th>
                                        <th>Loc</th>
                                        <th>Category</th>
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
                                    {itemViews.map((item) => (
                                        <tr 
                                            key={item.id} 
                                            onClick={() => navigate(`/items/${item.id}`)}
                                            className="bg-background hover:bg-accent-soft transition cursor-pointer"
                                        >
                                            <td className="sticky left-0 z-5 bg-background">{item.id}</td>
                                            <td>{item.itemName}</td>
                                            <td>{item.stocks}</td>
                                            <td>{item.badStocks}</td>
                                            <td>{item.unitName}</td>
                                            <td>{item.comm}</td>
                                            <td>{item.terms}</td>
                                            <td>{item.loc}</td>
                                            <td>{item.categoryName}</td>
                                            <td>{item.wholesalePrice.toFixed(2)}</td>
                                            <td>{item.wholesaleDiscount}</td>
                                            <td>{item.retail1Price.toFixed(2)}</td>
                                            <td>{item.retail1Discount}</td>
                                            <td>{item.retail2Price.toFixed(2)}</td>
                                            <td>{item.retail2Discount}</td>
                                            <td>{item.purchasePrice.toFixed(2)}</td>
                                            <td>{item.purchaseDiscount}</td>
                                            <td>{item.specialPrice.toFixed(2)}</td>
                                            <td>{item.specialDiscount}</td>
                                            <td>{getAverageCost(item).toFixed(2)}</td>
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