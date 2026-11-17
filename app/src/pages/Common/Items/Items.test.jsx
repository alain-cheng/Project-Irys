import { beforeEach, describe, expect, test, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import userEvent from "@testing-library/user-event"
import { invoke } from "@tauri-apps/api/core"

import Items from "./Items"
import ItemsLayout from "./ItemsLayout"

vi.mock("@tauri-apps/api/core", () => ({ invoke: vi.fn() }))

const mockItem = {
    itemCode: 101,
    itemName: "Database Test Item",
    unitsInStock: 120,
    returnStocks: null,
    unitCode: 16,
    itemCommission: 0,
    termCode: null,
    itemLocationId: null,
    categoryId: 1,
    sellingPrice: 85,
    sDiscId: "Net",
    r1SPrice: 100,
    r1DiscId: "Net",
    r2Price: 95,
    r2DiscId: "Net",
    purchasePrice: 65,
    pDiscId: "Net",
    spPrice: 80,
    spDiscId: "Net",
    averageCost: 63.5,
    remarks: "Workshop supplies",
}

function renderItems() {
    return render(
        <MemoryRouter initialEntries={["/items"]}>
            <Routes>
                <Route path="/items" element={<ItemsLayout />}>
                    <Route index element={<Items />} />
                </Route>
            </Routes>
        </MemoryRouter>
    )
}

describe("Items", () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    test("Shows a loading state while the backend request is pending", () => {
        invoke.mockReturnValue(new Promise(() => {}))
        renderItems()
        expect(invoke).toHaveBeenCalledWith("get_all_items")
        expect(screen.getByRole("status")).toHaveTextContent("Loading items...")
    })

    test("Renders database fields", async () => {
        invoke.mockResolvedValue([mockItem])
        renderItems()
        const row = (await screen.findByText("Database Test Item")).closest("tr")
        expect(within(row).getAllByRole("cell").map(cell => cell.textContent)).toEqual([
            "101", "Database Test Item", "120", "-", "16", "0", "-", "-", "1",
            "85.00", "Net", "100.00", "Net", "95.00", "Net", "65.00", "Net",
            "80.00", "Net", "63.50", "Workshop supplies",
        ])
        expect(screen.queryByRole("status")).not.toBeInTheDocument()
    })

    test("Shows an empty state when there are no items", async () => {
        invoke.mockResolvedValue([])
        renderItems()
        expect(await screen.findByText("No items found.")).toBeInTheDocument()
    })

    test("Displays errors returned by Tauri", async () => {
        invoke.mockRejectedValue("Failed to retrieve database connection.")
        renderItems()
        expect(await screen.findByRole("alert")).toHaveTextContent(
            "DB Error: Failed to retrieve database connection."
        )
        expect(screen.queryByText("No items found.")).not.toBeInTheDocument()
    })

    test("Searches names, IDs, and remarks without another backend request", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValue([mockItem, { ...mockItem, itemCode: 102, itemName: "Garden Hose", remarks: null }])
        renderItems()
        await screen.findByText("Garden Hose")
        const search = screen.getByRole("searchbox", { name: "Search items" })

        await user.type(search, "  WORKSHOP  ")
        expect(screen.getByText("Database Test Item")).toBeInTheDocument()
        expect(screen.queryByText("Garden Hose")).not.toBeInTheDocument()
        await user.clear(search)
        await user.type(search, "102")
        expect(screen.getByText("Garden Hose")).toBeInTheDocument()
        expect(screen.queryByText("Database Test Item")).not.toBeInTheDocument()
        await user.clear(search)
        await user.type(search, "missing item")
        expect(screen.getByText("No items match your search.")).toBeInTheDocument()
        await user.clear(search)
        expect(screen.getByText("Database Test Item")).toBeInTheDocument()
        expect(screen.getByText("Garden Hose")).toBeInTheDocument()
        expect(invoke).toHaveBeenCalledTimes(1)
    })

    test("Adds an item with numeric values and nullable IDs, then reloads the table", async () => {
        const user = userEvent.setup()
        const createdItem = { ...mockItem, itemName: "New Drill" }
        invoke.mockResolvedValueOnce([]).mockResolvedValueOnce(createdItem).mockResolvedValueOnce([createdItem])
        renderItems()
        await screen.findByText("No items found.")
        await user.click(screen.getByRole("button", { name: "Add new item" }))
        const dialog = within(screen.getByRole("dialog", { name: "Add Item" }))
        await user.type(dialog.getByLabelText("Item Name"), " New Drill ")
        await user.type(dialog.getByLabelText("In Stock"), "12")
        await user.type(dialog.getByLabelText("Unit Code"), "1")
        await user.type(dialog.getByLabelText("Wholesale Price"), "125.50")
        await user.type(dialog.getByLabelText("Remarks"), " New stock ")
        await user.click(dialog.getByRole("button", { name: "Add Item" }))

        expect(invoke).toHaveBeenCalledWith("add_item", {
            item: expect.objectContaining({
                itemName: "New Drill", unitsInStock: 12, returnStocks: 0,
                unitCode: 1, categoryId: null, supplierId: null,
                sellingPrice: 125.5, basePrice: 125.5,
                r1Price: 0, r1SPrice: 0, pUnitPrice: 0, purchasePrice: 0,
                retailPrice: 0, photoFile: null, remarks: "New stock",
            }),
        })
        const payload = invoke.mock.calls.find(([command]) => command === "add_item")[1].item
        expect(payload).not.toHaveProperty("sDisc1")
        expect(payload).not.toHaveProperty("sDiscId")
        expect(await screen.findByText("New Drill")).toBeInTheDocument()
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
        expect(invoke.mock.calls.filter(([command]) => command === "get_all_items")).toHaveLength(2)
    })

    test("Keeps entered values and shows the backend error when adding fails", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValueOnce([mockItem]).mockRejectedValueOnce("Supplier does not exist")
        renderItems()
        await screen.findByText("Database Test Item")
        await user.click(screen.getByRole("button", { name: "Add new item" }))
        const dialog = within(screen.getByRole("dialog", { name: "Add Item" }))
        await user.type(dialog.getByLabelText("Item Name"), "New Drill")
        await user.click(dialog.getByRole("button", { name: "Add Item" }))
        expect(await dialog.findByRole("alert")).toHaveTextContent("Supplier does not exist")
        expect(dialog.getByLabelText("Item Name")).toHaveValue("New Drill")
        expect(dialog.getByRole("button", { name: "Add Item" })).toBeEnabled()
        expect(screen.getByText("Database Test Item")).toBeInTheDocument()
    })

    test("Rejects whitespace-only item names without submitting", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValue([])
        renderItems()
        await screen.findByText("No items found.")
        await user.click(screen.getByRole("button", { name: "Add new item" }))
        const dialog = within(screen.getByRole("dialog", { name: "Add Item" }))
        await user.type(dialog.getByLabelText("Item Name"), "   ")
        await user.click(dialog.getByRole("button", { name: "Add Item" }))
        expect(dialog.getByRole("alert")).toHaveTextContent("Enter an item name.")
        expect(invoke).toHaveBeenCalledTimes(1)
    })

    test("Disables the form while a new item is being saved", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValueOnce([]).mockReturnValueOnce(new Promise(() => {}))
        renderItems()
        await screen.findByText("No items found.")
        await user.click(screen.getByRole("button", { name: "Add new item" }))
        const dialog = within(screen.getByRole("dialog", { name: "Add Item" }))
        await user.type(dialog.getByLabelText("Item Name"), "New Drill")
        await user.click(dialog.getByRole("button", { name: "Add Item" }))
        expect(dialog.getByRole("button", { name: "Saving..." })).toBeDisabled()
        expect(dialog.getByLabelText("Item Name")).toBeDisabled()
        expect(dialog.getByRole("button", { name: "Cancel" })).toBeDisabled()
    })

    test("Requires confirmation, deletes the selected item, reloads, and clears selection", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValueOnce([mockItem]).mockResolvedValueOnce(true).mockResolvedValueOnce([])
        renderItems()
        const rowLabel = await screen.findByText("Database Test Item")
        const deleteButton = screen.getByRole("button", { name: "Delete selected item" })
        expect(deleteButton).toBeDisabled()
        await user.click(rowLabel)
        expect(rowLabel.closest("tr")).toHaveClass("bg-yellow-200")
        await user.click(deleteButton)
        let dialog = within(screen.getByRole("dialog", { name: "Delete Item #101?" }))
        expect(dialog.getByText("Database Test Item")).toBeInTheDocument()
        await user.click(dialog.getByRole("button", { name: "Cancel" }))
        expect(invoke).toHaveBeenCalledTimes(1)

        await user.click(deleteButton)
        dialog = within(screen.getByRole("dialog"))
        await user.click(dialog.getByRole("button", { name: "Delete", exact: true }))
        expect(invoke).toHaveBeenCalledWith("delete_item_by_id", { id: 101 })
        expect(await screen.findByText("No items found.")).toBeInTheDocument()
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
        expect(deleteButton).toBeDisabled()
    })

    test.each([
        [false, "Item #101 was not found."],
        ["error", "Item is referenced by an order"],
    ])("Keeps the row and confirmation open when deletion returns %s", async (result, message) => {
        const user = userEvent.setup()
        invoke.mockResolvedValueOnce([mockItem])
        if (result === false) invoke.mockResolvedValueOnce(false)
        else invoke.mockRejectedValueOnce(message)
        renderItems()
        await user.click(await screen.findByText("Database Test Item"))
        await user.click(screen.getByRole("button", { name: "Delete selected item" }))
        const dialog = within(screen.getByRole("dialog"))
        await user.click(dialog.getByRole("button", { name: "Delete", exact: true }))
        expect(await dialog.findByRole("alert")).toHaveTextContent(message)
        expect(dialog.getByRole("button", { name: "Delete", exact: true })).toBeEnabled()
        expect(within(screen.getByRole("table")).getByText("Database Test Item")).toBeInTheDocument()
        expect(invoke.mock.calls.filter(([command]) => command === "get_all_items")).toHaveLength(1)
    })
})
