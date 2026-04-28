import { useEffect, useState } from "react"

function InventoryReports() {
    const [selectedReport, setSelectedReport] = useState("")

    const [isCustomPage, setIsCustomPage] = useState(false)

    useEffect(() => {
        console.log(isCustomPage)
    }, [isCustomPage])
    
    return(
        <div>
            <div className="mb-2">
                Inventory Reports
            </div>

            <select 
                className="mx-4"
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
            >
                <option value="" disabled>Please select</option>
                <option value="count">Inventory Count Sheet</option>
                <option value="summary">Item List Summary</option>
                <option value="price_list">Price List</option>
                <option value="item_list">Item List</option>
                <option value="inventory_report">Inventory Report</option>
                <option value="adjustments">Inventory Adjustments</option>
            </select>

            {selectedReport === "count" && (
                <div className="mt-4 px-4">
                    <h3 className="text-text my-2">Inventory Count Sheet Settings</h3>

                    <div className="flex flex-col gap-3">
                        <label>
                            Pages:
                            <select 
                                className="ml-2"
                                value={isCustomPage}
                                onChange={(e) => setIsCustomPage(e.target.value === "true")}
                            >
                                <option value="false">All Pages</option>
                                <option value="true">Custom Range</option>
                            </select>
                        </label>

                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="From"
                                className={`border px-2 ${!isCustomPage ? "cursor-not-allowed text-gray-300" : ""}`}
                                disabled={!isCustomPage}
                            />
                            <input
                                type="number"
                                placeholder="To"
                                className={`border px-2 ${!isCustomPage ? "cursor-not-allowed text-gray-300" : ""}`}
                                disabled={!isCustomPage}
                            />
                        </div>

                        <div className="flex gap-2">
                            <button 
                                className="border min-w-20 px-2 hover:bg-accent-soft"
                                onClick={() => console.log("Preview Selected")}
                            >
                                Preview
                            </button>
                            <button 
                                className="border min-w-20 px-2 hover:bg-accent-soft"
                                onClick={() => console.log("Print Selected")}
                            >
                                Print
                            </button>
                            <button 
                                className="border min-w-20 px-2 hover:bg-accent-soft"
                                onClick={() => console.log("Export Selected")}
                            >
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default InventoryReports