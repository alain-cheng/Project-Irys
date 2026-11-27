import { beforeEach, describe, expect, test, vi } from "vitest"
import { act, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Link, MemoryRouter, Route, Routes } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import SalesOrderDetails from "./SalesOrderDetails"

vi.mock("@tauri-apps/api/core", () => ({ invoke: vi.fn() }))

const mockSalesOrder = {
    id: 2001,
    customerId: 1001,
    orderDate: "2026-11-17",
    remarks: "Requested hardware supplies",
    orderStatusId: 3,
    total: 5450,
    salesman: 2,
    poNumber: "PO-2026-001",
    termCode: 4,
    shipperId: 5,
    user: 6,
    employeeId: 7,
    notes: "Deliver in the morning",
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

function mockBackend({ order = mockSalesOrder, details = [], items = { 15: { itemCode: 15, itemName: "Database Drill" } } } = {}) {
    invoke.mockImplementation((command, args) => {
        const result = command === "get_sales_order_by_id" ? order
            : command === "get_sales_order_details_by_sales_order_id" ? details
                : command === "get_item_by_id" ? items[args.id] ?? null
                    : new Error(`Unexpected command: ${command}`)
        return result instanceof Error ? Promise.reject(result.message) : Promise.resolve(result)
    })
}

function renderDetails() {
    return render(
        <MemoryRouter initialEntries={["/orders/sales_orders/2001"]}>
            <Link to="/orders/sales_orders/2002">Next sales order</Link>
            <Routes>
                <Route path="/orders/sales_orders/:salesOrderId" element={<SalesOrderDetails />} />
            </Routes>
        </MemoryRouter>
    )
}

describe("SalesOrderDetails", () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    test("Loads the SalesOrders record using the URL ID", () => {
        invoke.mockReturnValue(new Promise(() => {}))
        renderDetails()
        expect(invoke).toHaveBeenCalledWith("get_sales_order_by_id", { id: 2001 })
        expect(screen.getByRole("status")).toHaveTextContent("Loading sales order...")
        expect(invoke).toHaveBeenCalledTimes(1)
    })

    test("Displays every SalesOrders field and loads the items table below the text fields", async () => {
        mockBackend()
        renderDetails()
        await screen.findByText("Sales Order: 2001")
        const table = within(screen.getByRole("table", { name: "Sales order information" }))
        const rows = table.getAllByRole("row")
        expect(rows.map(row => within(row).getAllByRole("cell").slice(0, 2).map(cell => cell.textContent))).toEqual([
            ["Order Number", "2001"], ["Order Date", "2026-11-17"], ["Customer ID", "1001"],
            ["Order Status ID", "3"], ["Total", "5450.00"], ["Salesman ID", "2"],
            ["PO Number", "PO-2026-001"], ["Term Code", "4"], ["Shipper ID", "5"],
            ["User ID", "6"], ["Employee ID", "7"],
        ])
        expect(screen.getByLabelText("Remarks")).toHaveValue("Requested hardware supplies")
        expect(screen.getByLabelText("Notes")).toHaveValue("Deliver in the morning")
        expect(screen.getByLabelText("Remarks")).toHaveAttribute("readonly")
        expect(screen.getAllByRole("table")).toHaveLength(2)
        const itemsTable = screen.getByRole("table", { name: "Sales order items" })
        expect(screen.getByLabelText("Notes").compareDocumentPosition(itemsTable) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
        expect(await screen.findByText("No details found for this sales order.")).toBeInTheDocument()
        expect(invoke).toHaveBeenCalledWith("get_sales_order_details_by_sales_order_id", { salesOrderId: 2001 })
        expect(invoke).toHaveBeenCalledTimes(2)
    })

    test("Preserves zero values and handles nullable fields", async () => {
        mockBackend({ order: {
            ...mockSalesOrder, customerId: null, orderStatusId: 0, total: 0, salesman: null,
            poNumber: null, termCode: null, shipperId: null, user: null, employeeId: null,
            remarks: null, notes: null,
        } })
        renderDetails()
        await screen.findByText("Sales Order: 2001")
        for (const [label, expected] of [["Order Status ID", "0"], ["Total", "0.00"], ["Customer ID", "-"], ["PO Number", "-"]]) {
            const row = screen.getByText(label, { exact: true }).closest("tr")
            expect(within(row).getAllByRole("cell")[1]).toHaveTextContent(expected)
        }
        expect(screen.getByLabelText("Remarks")).toHaveValue("")
        expect(screen.getByLabelText("Notes")).toHaveValue("")
    })

    test("Shows not found when the backend returns null", async () => {
        invoke.mockResolvedValue(null)
        renderDetails()
        expect(await screen.findByText(/was not found/)).toHaveTextContent("2001")
        expect(invoke).toHaveBeenCalledTimes(1)
    })

    test("Displays Tauri errors", async () => {
        invoke.mockRejectedValue("Database unavailable")
        renderDetails()
        expect(await screen.findByRole("alert")).toHaveTextContent("DB Error: Database unavailable")
        expect(screen.queryByText(/was not found/)).not.toBeInTheDocument()
    })

    test("Loads the next route ID and ignores a late response for the previous record", async () => {
        const user = userEvent.setup()
        let finishFirst
        invoke.mockImplementation((command, args) => {
            if (command === "get_sales_order_by_id") {
                return args.id === 2001
                    ? new Promise(resolve => { finishFirst = resolve })
                    : Promise.resolve({ ...mockSalesOrder, id: 2002 })
            }
            return Promise.resolve([])
        })
        renderDetails()
        await user.click(screen.getByRole("link", { name: "Next sales order" }))
        await screen.findByText("Sales Order: 2002")
        await act(async () => { finishFirst(mockSalesOrder) })
        expect(screen.getByText("Sales Order: 2002")).toBeInTheDocument()
        expect(screen.queryByText("Sales Order: 2001")).not.toBeInTheDocument()
        expect(invoke).toHaveBeenCalledWith("get_sales_order_by_id", { id: 2002 })
        expect(invoke).toHaveBeenCalledWith("get_sales_order_details_by_sales_order_id", { salesOrderId: 2002 })
        expect(invoke).not.toHaveBeenCalledWith("get_sales_order_details_by_sales_order_id", { salesOrderId: 2001 })
    })

    test("Renders named item lines, nullable values, and Closed labels with shared name lookups", async () => {
        mockBackend({ details: [
            mockDetail,
            { ...mockDetail, id: 9002, isClosed: true },
            { ...mockDetail, id: 9003, itemCode: null, unitPrice: 0, amount: null, invoiced: 0, sDisc1: null },
        ] })
        renderDetails()
        const table = within(await screen.findByRole("table", { name: "Sales order items" }))
        expect(await table.findAllByText("Database Drill")).toHaveLength(2)
        expect(table.getAllByRole("columnheader").map(header => header.textContent)).toEqual([
            "Item Name", "Quantity", "Unit Price", "Amount", "Invoiced", "Closed",
            ...Array.from({ length: 10 }, (_, index) => `SDisc${index + 1}`), "Discount Type",
        ])
        const rows = table.getAllByRole("row").slice(1)
        expect(within(rows[0]).getAllByRole("cell").map(cell => cell.textContent)).toEqual([
            "Database Drill", "2", "2200.00", "4400.00", "1", "Open",
            ...Array(10).fill("0"), "Net",
        ])
        expect(within(rows[1]).getByText("Closed")).toHaveClass("bg-red-500")
        expect(within(rows[0]).getByText("Open")).toHaveClass("bg-green-500")
        expect(within(rows[2]).getAllByRole("cell").slice(0, 7).map(cell => cell.textContent)).toEqual([
            "-", "2", "0.00", "-", "0", "Open", "-",
        ])
        expect(table.queryByText("9001")).not.toBeInTheDocument()
        expect(table.queryByText("2001")).not.toBeInTheDocument()
        expect(invoke.mock.calls.filter(([command]) => command === "get_item_by_id")).toEqual([
            ["get_item_by_id", { id: 15 }],
        ])
    })

    test("Keeps the order information visible while item lines load", async () => {
        let finishLines
        mockBackend({ details: new Promise(resolve => { finishLines = resolve }) })
        renderDetails()
        await screen.findByText("Sales Order: 2001")
        expect(screen.getByRole("status")).toHaveTextContent("Loading sales order details...")
        expect(screen.getByLabelText("Notes")).toHaveValue("Deliver in the morning")
        await act(async () => { finishLines([]) })
        expect(screen.getByText("No details found for this sales order.")).toBeInTheDocument()
    })

    test("Shows item-line failures inside the table without hiding the order", async () => {
        mockBackend({ details: new Error("Line query failed") })
        renderDetails()
        expect(await screen.findByRole("alert")).toHaveTextContent("DB Error: Line query failed")
        expect(screen.getByText("Sales Order: 2001")).toBeInTheDocument()
        expect(screen.getByLabelText("Remarks")).toHaveValue("Requested hardware supplies")
        expect(screen.queryByText("No details found for this sales order.")).not.toBeInTheDocument()
    })

    test("Shows fallback item names when lookup records are missing or unavailable", async () => {
        mockBackend({
            details: [mockDetail, { ...mockDetail, id: 9002, itemCode: 24 }],
            items: { 15: null, 24: new Error("Item lookup failed") },
        })
        renderDetails()
        const table = within(await screen.findByRole("table", { name: "Sales order items" }))
        expect(await table.findByText("Unknown item (#15)")).toBeInTheDocument()
        expect(await table.findByText("Unavailable item (#24)")).toBeInTheDocument()
        expect(table.getAllByRole("row")).toHaveLength(3)
        expect(screen.queryByRole("alert")).not.toBeInTheDocument()
    })

    test("Discards late item lines when the route changes to another order", async () => {
        const user = userEvent.setup()
        let finishFirstLines
        const pendingLines = new Promise(resolve => { finishFirstLines = resolve })
        invoke.mockImplementation((command, args) => {
            if (command === "get_sales_order_by_id") return Promise.resolve({ ...mockSalesOrder, id: args.id })
            if (command === "get_sales_order_details_by_sales_order_id") {
                return args.salesOrderId === 2001 ? pendingLines : Promise.resolve([{ ...mockDetail, salesOrderId: 2002, itemCode: 24 }])
            }
            return Promise.resolve({ itemCode: args.id, itemName: "Next Order Item" })
        })
        renderDetails()
        await screen.findByText("Sales Order: 2001")
        await user.click(screen.getByRole("link", { name: "Next sales order" }))
        const table = within(await screen.findByRole("table", { name: "Sales order items" }))
        await table.findByText("Next Order Item")
        await act(async () => { finishFirstLines([mockDetail]) })
        expect(screen.getByText("Sales Order: 2002")).toBeInTheDocument()
        expect(table.getByText("Next Order Item")).toBeInTheDocument()
        expect(invoke).not.toHaveBeenCalledWith("get_item_by_id", { id: 15 })
    })

    test("Ignores late item names from the previous route", async () => {
        const user = userEvent.setup()
        let finishFirstName
        let itemRequests = 0
        const pendingName = new Promise(resolve => { finishFirstName = resolve })
        invoke.mockImplementation((command, args) => {
            if (command === "get_sales_order_by_id") return Promise.resolve({ ...mockSalesOrder, id: args.id })
            if (command === "get_sales_order_details_by_sales_order_id") return Promise.resolve([{ ...mockDetail, salesOrderId: args.salesOrderId }])
            itemRequests += 1
            return itemRequests === 1 ? pendingName : Promise.resolve({ itemCode: 15, itemName: "Current Item Name" })
        })
        renderDetails()
        const firstTable = within(await screen.findByRole("table", { name: "Sales order items" }))
        await firstTable.findByText("Loading...")
        await user.click(screen.getByRole("link", { name: "Next sales order" }))
        await screen.findByText("Current Item Name")
        await act(async () => { finishFirstName({ itemCode: 15, itemName: "Old Item Name" }) })
        expect(screen.getByText("Current Item Name")).toBeInTheDocument()
        expect(screen.queryByText("Old Item Name")).not.toBeInTheDocument()
    })
})
