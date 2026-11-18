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

    test("Displays every SalesOrders field without requesting item lines", async () => {
        invoke.mockResolvedValue(mockSalesOrder)
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
        expect(screen.getAllByRole("table")).toHaveLength(1)
        expect(invoke).toHaveBeenCalledTimes(1)
    })

    test("Preserves zero values and handles nullable fields", async () => {
        invoke.mockResolvedValue({
            ...mockSalesOrder, customerId: null, orderStatusId: 0, total: 0, salesman: null,
            poNumber: null, termCode: null, shipperId: null, user: null, employeeId: null,
            remarks: null, notes: null,
        })
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
        invoke.mockReturnValueOnce(new Promise(resolve => { finishFirst = resolve }))
            .mockResolvedValueOnce({ ...mockSalesOrder, id: 2002 })
        renderDetails()
        await user.click(screen.getByRole("link", { name: "Next sales order" }))
        await screen.findByText("Sales Order: 2002")
        await act(async () => { finishFirst(mockSalesOrder) })
        expect(screen.getByText("Sales Order: 2002")).toBeInTheDocument()
        expect(screen.queryByText("Sales Order: 2001")).not.toBeInTheDocument()
        expect(invoke).toHaveBeenLastCalledWith("get_sales_order_by_id", { id: 2002 })
    })
})
