import { beforeEach, describe, expect, test, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Link, MemoryRouter, Route, Routes } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import ItemDetails from "./ItemDetails"

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
}

function renderDetails() {
    return render(
        <MemoryRouter initialEntries={["/items/42"]}>
            <Link to="/items/43">Next item</Link>
            <Routes>
                <Route path="/items/:itemId" element={<ItemDetails />} />
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
})
