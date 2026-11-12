import { beforeEach, describe, expect, test, vi } from "vitest"
import { act, fireEvent, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Link, MemoryRouter, Route, Routes, useOutletContext } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import ItemDetails from "./ItemDetails"
import ItemsLayout from "./ItemsLayout"

vi.mock("@tauri-apps/api/core", () => ({ invoke: vi.fn() }))

const mockItem = {
    itemCode: 42,
    itemName: "Database Drill",
    categoryId: 8,
    unitCode: 1,
    itemCommission: 0,
    termCode: null,
    itemLocationId: null,
    unitsInStock: 12,
    returnStocks: null,
    sellingPrice: 2200,
    sDiscId: "Net",
    r1SPrice: 2700,
    r1DiscId: "Net",
    r2Price: 2500,
    r2DiscId: "Net",
    purchasePrice: 1750,
    pDiscId: "Net",
    spPrice: 2100,
    spDiscId: "Net",
    averageCost: 1700,
    itemGroupId: 2,
    basePrice: 2200,
    r1Price: 2700,
    pUnitPrice: 1750,
    retailPrice: 2700,
    reorderLevel: 3,
    isDiscontinued: false,
    onSOrder: 5,
    onPOrder: 9,
    supplierId: 7,
    photoFile: null,
    isEdited: false,
    isReorderActive: true,
    pTermCode: null,
    pack: "1 unit",
    isInventoryAdjust: false,
    tempAverageCost: 1710,
    isKit: false,
    remarks: "Existing remarks",
    ...Object.fromEntries(["s", "r1", "r2", "sp", "p"].flatMap(prefix =>
        Array.from({ length: 10 }, (_, index) => [`${prefix}Disc${index + 1}`, 0])
    )),
    sDisc10: null,
}

function ItemsListDestination() {
    const { selectedItem } = useOutletContext()
    return <p>Items list; selection: {selectedItem ?? "none"}</p>
}

function renderDetails() {
    return render(
        <MemoryRouter initialEntries={["/items/42"]}>
            <Link to="/items/43">Next item</Link>
            <Routes>
                <Route path="/items" element={<ItemsLayout />}>
                    <Route index element={<ItemsListDestination />} />
                    <Route path=":itemId" element={<ItemDetails />} />
                </Route>
            </Routes>
        </MemoryRouter>
    )
}

describe("ItemDetails", () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    test("Shows loading while item request is pending", () => {
        invoke.mockReturnValue(new Promise(() => {}))
        renderDetails()
        expect(invoke).toHaveBeenCalledWith("get_item_by_id", { id: 42 })
        expect(screen.getByRole("status")).toHaveTextContent("Loading item...")
        expect(screen.queryByText(/was not found/)).not.toBeInTheDocument()
    })

    test("Displays backend fields, nullable lookups, and stored average cost", async () => {
        invoke.mockResolvedValue(mockItem)
        renderDetails()
        expect(await screen.findByText("Item: Database Drill")).toBeInTheDocument()
        expect(screen.getByText("No photo available")).toBeInTheDocument()
        for (const [label, expected] of [
            ["Item ID Number", "42"],
            ["Category ID", "8"],
            ["Unit Code", "1"],
            ["Commission", "0"],
            ["Term Code", "-"],
            ["Location ID", "-"],
            ["In Stock", "12"],
            ["Bad Stock", "-"],
            ["Wholesale", "2200.00"],
            ["Average", "1700.00"],
        ]) {
            const row = screen.getByText(label, { exact: true }).closest("tr")
            expect(within(row).getAllByRole("cell")[1]).toHaveTextContent(expected)
        }
        expect(screen.getAllByText("Net")).toHaveLength(5)
    })

    test("Shows item not found when backend returns null", async () => {
        invoke.mockResolvedValue(null)
        renderDetails()
        expect(await screen.findByText(/was not found/)).toHaveTextContent("42")
    })

    test("Displays photoFile and falls back to the placeholder if it cannot load", async () => {
        invoke.mockResolvedValue({ ...mockItem, photoFile: "/images/drill.png" })
        renderDetails()
        const photo = await screen.findByRole("img", { name: "Database Drill" })
        expect(photo).toHaveAttribute("src", "/images/drill.png")
        expect(screen.queryByText("No photo available")).not.toBeInTheDocument()

        fireEvent.error(photo)

        expect(screen.getByText("No photo available")).toBeInTheDocument()
        expect(screen.queryByRole("img", { name: "Database Drill" })).not.toBeInTheDocument()
    })

    test("Shows errors returned by Tauri", async () => {
        invoke.mockRejectedValue("Database unavailable")
        renderDetails()
        expect(await screen.findByRole("alert")).toHaveTextContent("DB Error: Database unavailable")
        expect(screen.queryByText(/was not found/)).not.toBeInTheDocument()
    })

    test("Reloads the item when its route ID changes", async () => {
        invoke.mockResolvedValueOnce(mockItem).mockResolvedValueOnce({
            ...mockItem,
            itemCode: 43,
            itemName: "Next Database Item",
        })
        const user = userEvent.setup()
        renderDetails()
        await screen.findByText("Item: Database Drill")
        await user.click(screen.getByRole("link", { name: "Next item" }))
        expect(await screen.findByText("Item: Next Database Item")).toBeInTheDocument()
        expect(invoke).toHaveBeenLastCalledWith("get_item_by_id", { id: 43 })
        expect(screen.queryByText("Item: Database Drill")).not.toBeInTheDocument()
    })

    test("Edit creates a separate Save button without submitting the form", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValue(mockItem)
        renderDetails()
        await screen.findByText("Item: Database Drill")

        const editButton = screen.getByRole("button", { name: "Edit", exact: true })
        await user.click(editButton)

        const saveButton = screen.getByRole("button", { name: "Save", exact: true })
        expect(saveButton).not.toBe(editButton)
        expect(editButton).not.toBeInTheDocument()
        expect(saveButton).toHaveAttribute("type", "submit")
        expect(invoke).toHaveBeenCalledTimes(1)

        const name = screen.getByRole("textbox", { name: "Item", exact: true })
        await user.clear(name)
        await user.type(name, "Unsaved changes")
        expect(name).toHaveValue("Unsaved changes")
        expect(invoke).toHaveBeenCalledTimes(1)
    })

    test("Enables fields and remarks for editing, then discards changes", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValue(mockItem)
        renderDetails()
        await screen.findByText("Item: Database Drill")
        expect(screen.getByRole("textbox", { name: "Remarks" })).toBeDisabled()
        await user.click(screen.getByRole("button", { name: "Edit", exact: true }))
        const name = screen.getByRole("textbox", { name: "Item", exact: true })
        const remarks = screen.getByRole("textbox", { name: "Remarks" })
        expect(name).toHaveValue("Database Drill")
        expect(screen.getByRole("spinbutton", { name: "Term Code" })).toHaveValue(null)
        await user.clear(name)
        await user.type(name, "Unsaved name")
        await user.clear(remarks)
        await user.type(remarks, "Unsaved remarks")
        await user.click(screen.getByRole("button", { name: "Discard", exact: true }))
        expect(screen.getByText("Item: Database Drill")).toBeInTheDocument()
        expect(remarks).toHaveValue("Existing remarks")
        expect(remarks).toBeDisabled()
        expect(invoke).toHaveBeenCalledTimes(1)
    })

    test("Saves typed values, preserves hidden fields, and displays the returned record", async () => {
        const user = userEvent.setup()
        const returnedItem = { ...mockItem, itemName: "Updated Drill", unitsInStock: 20, sellingPrice: 2300.5, unitCode: null, remarks: null }
        invoke.mockResolvedValueOnce(mockItem).mockResolvedValueOnce(returnedItem)
        renderDetails()
        await screen.findByText("Item: Database Drill")
        await user.click(screen.getByRole("button", { name: "Edit", exact: true }))
        for (const [label, value] of [["Item", " Updated Drill "], ["In Stock", "20"], ["Wholesale Price", "2300.50"]]) {
            const input = screen.getByLabelText(label, { exact: true })
            await user.clear(input)
            await user.type(input, value)
        }
        await user.clear(screen.getByLabelText("Unit Code"))
        await user.clear(screen.getByLabelText("Remarks"))
        await user.click(screen.getByRole("button", { name: "Save", exact: true }))

        const expectedItem = { ...returnedItem }
        delete expectedItem.itemCode
        expect(invoke).toHaveBeenCalledWith("update_item", { id: 42, item: expectedItem })
        expect(await screen.findByText("Item: Updated Drill")).toBeInTheDocument()
        expect(screen.getByRole("button", { name: "Edit", exact: true })).toBeInTheDocument()
        expect(screen.getByRole("textbox", { name: "Remarks" })).toBeDisabled()
    })

    test("Validates the item name before invoking an update", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValue(mockItem)
        renderDetails()
        await screen.findByText("Item: Database Drill")
        await user.click(screen.getByRole("button", { name: "Edit", exact: true }))
        const name = screen.getByLabelText("Item", { exact: true })
        await user.clear(name)
        await user.type(name, "   ")
        await user.click(screen.getByRole("button", { name: "Save", exact: true }))
        expect(screen.getByRole("alert")).toHaveTextContent("Enter an item name.")
        expect(invoke).toHaveBeenCalledTimes(1)
    })

    test("Keeps edited values and shows errors when saving fails", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValueOnce(mockItem).mockRejectedValueOnce("Update failed")
        renderDetails()
        await screen.findByText("Item: Database Drill")
        await user.click(screen.getByRole("button", { name: "Edit", exact: true }))
        const name = screen.getByLabelText("Item", { exact: true })
        await user.clear(name)
        await user.type(name, "My edited item")
        await user.click(screen.getByRole("button", { name: "Save", exact: true }))
        expect(await screen.findByRole("alert")).toHaveTextContent("Update failed")
        expect(name).toHaveValue("My edited item")
        expect(screen.getByRole("button", { name: "Save", exact: true })).toBeEnabled()
        expect(screen.getByText("Item: Database Drill")).toBeInTheDocument()
    })

    test("Disables saving controls and ignores an old update after route navigation", async () => {
        const user = userEvent.setup()
        let finishSave
        invoke.mockResolvedValueOnce(mockItem)
            .mockReturnValueOnce(new Promise(resolve => { finishSave = resolve }))
            .mockResolvedValueOnce({ ...mockItem, itemCode: 43, itemName: "Next Item" })
        renderDetails()
        await screen.findByText("Item: Database Drill")
        await user.click(screen.getByRole("button", { name: "Edit", exact: true }))
        await user.click(screen.getByRole("button", { name: "Save", exact: true }))
        expect(screen.getByRole("button", { name: "Saving..." })).toBeDisabled()
        expect(screen.getByRole("button", { name: "Discard" })).toBeDisabled()
        expect(screen.getByLabelText("Item", { exact: true })).toBeDisabled()
        await user.click(screen.getByRole("link", { name: "Next item" }))
        await screen.findByText("Item: Next Item")
        await act(async () => { finishSave({ ...mockItem, itemName: "Old saved record" }) })
        expect(screen.getByText("Item: Next Item")).toBeInTheDocument()
        expect(screen.queryByText("Item: Old saved record")).not.toBeInTheDocument()
    })

    test("Shows not found when an item disappears before saving", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValueOnce(mockItem).mockResolvedValueOnce(null)
        renderDetails()
        await screen.findByText("Item: Database Drill")
        await user.click(screen.getByRole("button", { name: "Edit", exact: true }))
        await user.click(screen.getByRole("button", { name: "Save", exact: true }))
        expect(await screen.findByText(/was not found/)).toHaveTextContent("42")
        expect(screen.queryByRole("button", { name: "Save", exact: true })).not.toBeInTheDocument()
    })

    test("Confirms deletion and returns to Items with selection cleared", async () => {
        const user = userEvent.setup()
        invoke.mockResolvedValueOnce(mockItem).mockResolvedValueOnce(true)
        renderDetails()
        await screen.findByText("Item: Database Drill")
        await user.click(screen.getByRole("button", { name: "Delete", exact: true }))
        let dialog = within(screen.getByRole("dialog", { name: "Delete Item #42?" }))
        await user.click(dialog.getByRole("button", { name: "Cancel" }))
        expect(invoke).toHaveBeenCalledTimes(1)
        await user.click(screen.getByRole("button", { name: "Delete", exact: true }))
        dialog = within(screen.getByRole("dialog"))
        await user.click(dialog.getByRole("button", { name: "Delete", exact: true }))
        expect(invoke).toHaveBeenCalledWith("delete_item_by_id", { id: 42 })
        expect(await screen.findByText("Items list; selection: none")).toBeInTheDocument()
    })

    test.each([
        [false, "Item #42 was not found."],
        ["error", "Item is referenced by an order"],
    ])("Keeps the delete dialog open on %s", async (result, message) => {
        const user = userEvent.setup()
        invoke.mockResolvedValueOnce(mockItem)
        if (result === false) invoke.mockResolvedValueOnce(false)
        else invoke.mockRejectedValueOnce(message)
        renderDetails()
        await screen.findByText("Item: Database Drill")
        await user.click(screen.getByRole("button", { name: "Delete", exact: true }))
        const dialog = within(screen.getByRole("dialog"))
        await user.click(dialog.getByRole("button", { name: "Delete", exact: true }))
        expect(await dialog.findByRole("alert")).toHaveTextContent(message)
        expect(dialog.getByRole("button", { name: "Delete", exact: true })).toBeEnabled()
        expect(screen.getByText("Item: Database Drill")).toBeInTheDocument()
    })
})
