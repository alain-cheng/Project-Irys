import { beforeEach, describe, expect, test, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import Items from "./Items"
import ItemsLayout from "./ItemsLayout"

vi.mock("@tauri-apps/api/core", () => ({ invoke: vi.fn() }))

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
        invoke.mockResolvedValue([{
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
        }])
        renderItems()
        const row = (await screen.findByText("Database Test Item")).closest("tr")
        expect(within(row).getAllByRole("cell").map(cell => cell.textContent)).toEqual([
            "101", "Database Test Item", "120", "-", "16", "0", "-", "-", "1",
            "85.00", "Net", "100.00", "Net", "95.00", "Net", "65.00", "Net",
            "80.00", "Net", "63.50",
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
})
