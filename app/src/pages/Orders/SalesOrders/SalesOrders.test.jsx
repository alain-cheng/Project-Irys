import { beforeEach, describe, expect, test, vi } from "vitest"
import { act, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import SalesOrders from "./SalesOrders"

vi.mock("@tauri-apps/api/core", () => ({ invoke: vi.fn() }))

const mockSalesOrder = {
    id: 2001,
    orderDate: "2026-11-17",
    customerId: 1001,
    orderStatusId: 3,
    total: 5450,
    salesman: 2,
    poNumber: "PO-2026-001",
    termCode: 4,
    shipperId: 5,
    user: 6,
    employeeId: 7,
    remarks: "Database sales order",
    notes: "Deliver in the morning",
}

const mockStatuses = {
    0: { id: 0, statusName: "UNSPECIFIED" },
    1: { id: 1, statusName: "CLOSED" },
    2: { id: 2, statusName: "OPEN" },
    3: { id: 3, statusName: "POSTED" },
}

const mockDetail = {
    id: 9001,
    salesOrderId: 2001,
    itemCode: 15,
    quantity: 2,
    unitPrice: 2200,
    amount: 4400,
    invoiced: 1,
    isClosed: false,
    sDiscId: "Net",
    ...Object.fromEntries(Array.from({ length: 10 }, (_, index) => [`sDisc${index + 1}`, 0])),
}

const mockItems = {
    15: { itemCode: 15, itemName: "Database Drill" },
    24: { itemCode: 24, itemName: "Plant Pot" },
}

function mockBackend(orders, detailsByOrder = {}, itemsByCode = mockItems) {
    invoke.mockImplementation((command, args) => {
        if (command === "get_all_sales_orders") return Promise.resolve(orders)
        if (command === "get_order_status_by_id") return Promise.resolve(mockStatuses[args.id] ?? null)
        if (command === "get_sales_order_details_by_sales_order_id") {
            const details = detailsByOrder[args.salesOrderId] ?? []
            return details instanceof Error ? Promise.reject(details.message) : Promise.resolve(details)
        }
        if (command === "get_item_by_id") {
            const item = itemsByCode[args.id] ?? null
            return item instanceof Error ? Promise.reject(item.message) : Promise.resolve(item)
        }
        return Promise.reject(new Error(`Unexpected command: ${command}`))
    })
}

function renderSalesOrders() {
    return render(
        <MemoryRouter initialEntries={["/orders/sales_orders"]}>
            <Routes>
                <Route path="/orders/sales_orders" element={<SalesOrders />} />
                <Route path="/orders/sales_orders/:id" element={<p>Unexpected detail navigation</p>} />
            </Routes>
        </MemoryRouter>
    )
}

describe("SalesOrders Main Table", () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    test("Loads sales orders through Tauri and shows loading feedback", () => {
        invoke.mockReturnValue(new Promise(() => {}))
        renderSalesOrders()
        expect(invoke).toHaveBeenCalledWith("get_all_sales_orders")
        expect(screen.getByRole("status")).toHaveTextContent("Loading sales orders...")
    })

    test("Displays every backend column, status labels, and remaining raw lookup IDs", async () => {
        mockBackend([
            mockSalesOrder,
            {
                id: 2002, orderDate: "2026-11-16", customerId: 1002, orderStatusId: 0,
                total: 0, salesman: null, poNumber: null, termCode: null, shipperId: null,
                user: null, employeeId: null, remarks: null, notes: null,
            },
        ])
        renderSalesOrders()
        await screen.findByText("Database sales order")
        await screen.findByText("POSTED")
        await screen.findByText("UNSPECIFIED")
        const table = within(screen.getByRole("table", { name: "Sales orders", exact: true }))
        expect(table.getAllByRole("columnheader").map(header => header.textContent)).toEqual([
            "Order Number", "Order Date", "Customer ID", "Order Status", "Total",
            "Salesman ID", "PO Number", "Term Code", "Shipper ID", "User ID", "Employee ID",
            "Remarks", "Notes",
        ])
        const rows = table.getAllByRole("row").slice(1)
        expect(rows).toHaveLength(2)
        expect(within(rows[0]).getAllByRole("cell").map(cell => cell.textContent)).toEqual([
            "2001", "2026-11-17", "1001", "POSTED", "5450.00", "2", "PO-2026-001", "4",
            "5", "6", "7", "Database sales order", "Deliver in the morning",
        ])
        expect(within(rows[1]).getAllByRole("cell").map(cell => cell.textContent)).toEqual([
            "2002", "2026-11-16", "1002", "UNSPECIFIED", "0.00", "-", "-", "-", "-", "-", "-", "-", "-",
        ])
        const customerFilter = screen.getByRole("combobox", { name: "Customer:" })
        expect(customerFilter).toBeDisabled()
        expect(customerFilter).toHaveValue("")
        expect(within(customerFilter).getAllByRole("option")).toHaveLength(1)
    })

    test("Loads details only after selection and clears them when the row is deselected", async () => {
        const user = userEvent.setup()
        mockBackend([mockSalesOrder])
        renderSalesOrders()
        const cell = await screen.findByText("Database sales order")
        expect(screen.getByText("Select a sales order to view its items.")).toBeInTheDocument()
        expect(invoke.mock.calls.filter(([command]) => command === "get_sales_order_details_by_sales_order_id")).toHaveLength(0)
        await user.click(cell)
        expect(invoke).toHaveBeenCalledWith("get_sales_order_details_by_sales_order_id", { salesOrderId: 2001 })
        expect(cell.closest("tr")).toHaveClass("bg-yellow-200")
        expect(await screen.findByText("No details found for this sales order.")).toBeInTheDocument()
        await user.click(cell)
        expect(screen.getByText("Select a sales order to view its items.")).toBeInTheDocument()
        expect(cell.closest("tr")).not.toHaveClass("bg-yellow-200")
        expect(screen.queryByText("Unexpected detail navigation")).not.toBeInTheDocument()
        expect(invoke).toHaveBeenCalledWith("get_order_status_by_id", { id: 3 })
        expect(invoke).toHaveBeenCalledTimes(3)
    })

    test("Shows an empty state when the database has no sales orders", async () => {
        invoke.mockResolvedValue([])
        renderSalesOrders()
        expect(await screen.findByText("No sales orders found.")).toBeInTheDocument()
    })

    test("Displays Tauri string errors without showing an empty result", async () => {
        invoke.mockRejectedValue("Failed to retrieve database connection.")
        renderSalesOrders()
        expect(await screen.findByRole("alert")).toHaveTextContent("DB Error: Failed to retrieve database connection.")
        expect(screen.queryByText("No sales orders found.")).not.toBeInTheDocument()
    })

    test("Looks up each distinct status once, including zero, and renders label colors", async () => {
        mockBackend([
            mockSalesOrder,
            { ...mockSalesOrder, id: 2002 },
            { ...mockSalesOrder, id: 2003, orderStatusId: 2 },
            { ...mockSalesOrder, id: 2004, orderStatusId: 0 },
            { ...mockSalesOrder, id: 2005, orderStatusId: 1 },
        ])
        renderSalesOrders()
        expect(await screen.findByText("OPEN")).toHaveClass("bg-green-500")
        expect(await screen.findByText("CLOSED")).toHaveClass("bg-red-500")
        expect(await screen.findByText("UNSPECIFIED")).toHaveClass("bg-gray-300")
        const postedLabels = await screen.findAllByText("POSTED")
        expect(postedLabels).toHaveLength(2)
        postedLabels.forEach(label => expect(label).toHaveClass("bg-yellow-200"))
        const lookups = invoke.mock.calls.filter(([command]) => command === "get_order_status_by_id")
        expect(lookups).toHaveLength(4)
        expect(lookups.map(([, args]) => args.id).sort()).toEqual([0, 1, 2, 3])
    })

    test("Shows the sales order immediately while its status lookup is pending", async () => {
        invoke.mockImplementation(command => command === "get_all_sales_orders"
            ? Promise.resolve([mockSalesOrder])
            : new Promise(() => {}))
        renderSalesOrders()
        expect(await screen.findByText("Database sales order")).toBeInTheDocument()
        expect(screen.getByText("Loading...")).toHaveClass("bg-gray-300")
        expect(screen.queryByText("Loading sales orders...")).not.toBeInTheDocument()
    })

    test("Preserves all rows when a status is missing or its lookup fails", async () => {
        invoke.mockImplementation((command, args) => {
            if (command === "get_all_sales_orders") return Promise.resolve([
                mockSalesOrder,
                { ...mockSalesOrder, id: 2002, orderStatusId: 2 },
                { ...mockSalesOrder, id: 2003, orderStatusId: 99 },
            ])
            if (args.id === 3) return Promise.reject("Status lookup failed")
            return Promise.resolve(mockStatuses[args.id] ?? null)
        })
        renderSalesOrders()
        expect(await screen.findByText("Unavailable (#3)")).toHaveClass("bg-gray-300")
        expect(await screen.findByText("Unknown (#99)")).toHaveClass("bg-gray-300")
        expect(await screen.findByText("OPEN")).toHaveClass("bg-green-500")
        const table = within(screen.getByRole("table", { name: "Sales orders", exact: true }))
        expect(table.getAllByRole("row")).toHaveLength(4)
        expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    })

    test("Displays Item Name first, hides both IDs, and renders Closed labels", async () => {
        const user = userEvent.setup()
        mockBackend([mockSalesOrder], { 2001: [
            { ...mockDetail, sDisc2: null, sDisc3: 3, sDisc4: 4, sDisc5: 5, sDisc6: 6, sDisc7: 7, sDisc8: 8, sDisc9: 9, sDisc10: 10 },
            { ...mockDetail, id: 9002, itemCode: null, quantity: 1, unitPrice: 0, amount: 0, invoiced: null, isClosed: true },
        ] })
        renderSalesOrders()
        await user.click(await screen.findByText("Database sales order"))
        const table = within(screen.getByRole("table", { name: "Sales order items" }))
        await table.findByText("Database Drill")
        expect(await table.findByText("Open")).toHaveClass("bg-green-500")
        expect(table.getByText("Closed", { selector: "div" })).toHaveClass("bg-red-500")
        expect(table.getAllByRole("columnheader").map(header => header.textContent)).toEqual([
            "Item Name", "Quantity", "Unit Price", "Amount", "Invoiced", "Closed",
            ...Array.from({ length: 10 }, (_, index) => `SDisc${index + 1}`), "Discount Type",
        ])
        const rows = table.getAllByRole("row").slice(1)
        expect(rows).toHaveLength(2)
        expect(within(rows[0]).getAllByRole("cell").map(cell => cell.textContent)).toEqual([
            "Database Drill", "2", "2200.00", "4400.00", "1", "Open", "0", "-", "3", "4", "5", "6", "7", "8", "9", "10", "Net",
        ])
        expect(within(rows[1]).getAllByRole("cell").slice(0, 5).map(cell => cell.textContent)).toEqual([
            "-", "1", "0.00", "0.00", "-",
        ])
        expect(table.queryByText("9001")).not.toBeInTheDocument()
        expect(table.queryByText("2001")).not.toBeInTheDocument()
        expect(invoke).toHaveBeenCalledWith("get_item_by_id", { id: 15 })
        expect(invoke.mock.calls.filter(([command]) => command === "get_item_by_id")).toHaveLength(1)
    })

    test("Clears old details immediately and ignores late results for a previous selection", async () => {
        const user = userEvent.setup()
        let finishFirst
        mockBackend([
            mockSalesOrder,
            { ...mockSalesOrder, id: 2002, remarks: "Second sales order" },
        ], {
            2001: new Promise(resolve => { finishFirst = resolve }),
            2002: [{ ...mockDetail, id: 9002, salesOrderId: 2002, itemCode: 24 }],
        })
        renderSalesOrders()
        await user.click(await screen.findByText("Database sales order"))
        expect(screen.getByRole("status")).toHaveTextContent("Loading sales order details...")
        await user.click(screen.getByText("Second sales order"))
        const table = within(screen.getByRole("table", { name: "Sales order items" }))
        expect(await table.findByText("Plant Pot")).toBeInTheDocument()
        await act(async () => { finishFirst([mockDetail]) })
        expect(table.getByText("Plant Pot")).toBeInTheDocument()
        expect(table.queryByText("Database Drill")).not.toBeInTheDocument()
        expect(invoke).not.toHaveBeenCalledWith("get_item_by_id", { id: 15 })
        expect(invoke).toHaveBeenCalledWith("get_sales_order_details_by_sales_order_id", { salesOrderId: 2002 })
    })

    test("Does not repopulate the Sub table if an order is deselected during loading", async () => {
        const user = userEvent.setup()
        let finishDetails
        mockBackend([mockSalesOrder], { 2001: new Promise(resolve => { finishDetails = resolve }) })
        renderSalesOrders()
        const cell = await screen.findByText("Database sales order")
        await user.click(cell)
        await user.click(cell)
        await act(async () => { finishDetails([mockDetail]) })
        const table = within(screen.getByRole("table", { name: "Sales order items" }))
        expect(table.getByText("Select a sales order to view its items.")).toBeInTheDocument()
        expect(table.queryByText("15")).not.toBeInTheDocument()
    })

    test("Shows detail errors without hiding orders, then recovers on the next selection", async () => {
        const user = userEvent.setup()
        mockBackend([
            mockSalesOrder,
            { ...mockSalesOrder, id: 2002, remarks: "Second sales order" },
        ], { 2001: new Error("Details unavailable"), 2002: [mockDetail] })
        renderSalesOrders()
        await user.click(await screen.findByText("Database sales order"))
        expect(await screen.findByRole("alert")).toHaveTextContent("DB Error: Details unavailable")
        expect(screen.getByText("Second sales order")).toBeInTheDocument()
        await user.click(screen.getByText("Second sales order"))
        const table = within(screen.getByRole("table", { name: "Sales order items" }))
        expect(await table.findByText("Database Drill")).toBeInTheDocument()
        expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    })

    test("Looks up each distinct Item Code once and skips null codes", async () => {
        const user = userEvent.setup()
        mockBackend([mockSalesOrder], { 2001: [
            mockDetail,
            { ...mockDetail, id: 9002 },
            { ...mockDetail, id: 9003, itemCode: 24 },
            { ...mockDetail, id: 9004, itemCode: null },
        ] })
        renderSalesOrders()
        await user.click(await screen.findByText("Database sales order"))
        const table = within(screen.getByRole("table", { name: "Sales order items" }))
        expect(await table.findAllByText("Database Drill")).toHaveLength(2)
        expect(await table.findByText("Plant Pot")).toBeInTheDocument()
        const lookups = invoke.mock.calls.filter(([command]) => command === "get_item_by_id")
        expect(lookups.map(([, args]) => args.id).sort()).toEqual([15, 24])
    })

    test("Keeps detail rows visible while item names are loading", async () => {
        const user = userEvent.setup()
        mockBackend([mockSalesOrder], { 2001: [mockDetail] }, { 15: new Promise(() => {}) })
        renderSalesOrders()
        await user.click(await screen.findByText("Database sales order"))
        const table = within(screen.getByRole("table", { name: "Sales order items" }))
        expect(await table.findByText("Loading...")).toBeInTheDocument()
        expect(table.getByText("2200.00")).toBeInTheDocument()
        expect(table.queryByText("Loading sales order details...")).not.toBeInTheDocument()
    })

    test("Shows fallback names for missing or failed item lookups without hiding details", async () => {
        const user = userEvent.setup()
        mockBackend([mockSalesOrder], { 2001: [
            mockDetail,
            { ...mockDetail, id: 9002, itemCode: 24 },
            { ...mockDetail, id: 9003, itemCode: 25 },
        ] }, {
            15: null,
            24: new Error("Item lookup failed"),
            25: { itemCode: 25, itemName: "Available Item" },
        })
        renderSalesOrders()
        await user.click(await screen.findByText("Database sales order"))
        const table = within(screen.getByRole("table", { name: "Sales order items" }))
        expect(await table.findByText("Unknown item (#15)")).toBeInTheDocument()
        expect(await table.findByText("Unavailable item (#24)")).toBeInTheDocument()
        expect(await table.findByText("Available Item")).toBeInTheDocument()
        expect(table.getAllByRole("row")).toHaveLength(4)
        expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    })

    test("Ignores late item names from a previous sales order selection", async () => {
        const user = userEvent.setup()
        let finishFirstName
        mockBackend([
            mockSalesOrder,
            { ...mockSalesOrder, id: 2002, remarks: "Second sales order" },
        ], { 2001: [mockDetail], 2002: [{ ...mockDetail, salesOrderId: 2002 }] })
        const baseImplementation = invoke.getMockImplementation()
        let itemRequests = 0
        invoke.mockImplementation((command, args) => {
            if (command !== "get_item_by_id") return baseImplementation(command, args)
            itemRequests += 1
            return itemRequests === 1
                ? new Promise(resolve => { finishFirstName = resolve })
                : Promise.resolve({ itemCode: 15, itemName: "Current Item Name" })
        })
        renderSalesOrders()
        await user.click(await screen.findByText("Database sales order"))
        const table = within(screen.getByRole("table", { name: "Sales order items" }))
        await table.findByText("Loading...")
        await user.click(screen.getByText("Second sales order"))
        await table.findByText("Current Item Name")
        await act(async () => { finishFirstName({ itemCode: 15, itemName: "Outdated Item Name" }) })
        expect(table.getByText("Current Item Name")).toBeInTheDocument()
        expect(table.queryByText("Outdated Item Name")).not.toBeInTheDocument()
    })
})
