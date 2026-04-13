import { getAllItems, items } from "../../../MockData/items"
import { getItemCategoryById } from "../../../MockData/itemCategories"
import { getUnitById } from "../../../MockData/units"

function getAverageCost(item) {
    const prices = [
        item.wholesalePrice,
        item.retail1Price,
        item.retail2Price,
        item.purchasePrice,
        item.specialPrice
    ].filter(p => typeof p === "number" && p > 0)

    if (prices.length === 0) return 0

    return prices.reduce((sum, p) => sum + p, 0) / prices.length
}

function SalesOrders () {

    return(
        <div className="flex flex-col h-full py-5">
            <h1 className="text-2xl text-text mb-5">Sales Orders</h1>

            {/* table container */}
            <div className="flex-1 min-h-0">
                <div className="w-full max-h-[calc(100vh-180px)] overflow-auto">
                    <table className="bg-background">

                        <thead className="sticky top-0 z-10 bg-background border">
                            <tr>
                                <th className="sticky left-0 top-0 z-10 bg-background">Item ID</th>
                                <th>Name</th>
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
                            {getAllItems().map((item) => (
                                <tr key={item.id} className="bg-background hover:bg-accent-soft transition">
                                    <td className="sticky left-0 z-5 bg-background">{item.id}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.stocks}</td>
                                    <td>{item.badStocks}</td>
                                    <td>{getUnitById(item.unitId).unitName}</td>
                                    <td>{item.comm}</td>
                                    <td>{item.terms}</td>
                                    <td>{item.loc}</td>
                                    <td>{getItemCategoryById(item.categoryId).categoryName}</td>
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
    )
}

export default SalesOrders