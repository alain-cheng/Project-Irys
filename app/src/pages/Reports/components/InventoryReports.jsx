
function InventoryReports() {
    return(
        <div>
            <div>
                Inventory Reports
            </div>

            <select className="border">
                <option value="" disabled="disabled" selected="selected">Please select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
            </select>
        </div>
    )
}

export default InventoryReports