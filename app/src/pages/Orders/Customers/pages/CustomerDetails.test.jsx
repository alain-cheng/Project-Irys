import { beforeEach, describe, expect, test, vi } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"

import CustomerDetails from "./CustomerDetails"


vi.mock("@tauri-apps/api/core", () => ({
    invoke: vi.fn(),
}))

vi.mock("../../../components/CopyButton", () => ({
    default: () => null,
}))

vi.mock("../../../components/Tooltip", () => ({
    default: () => null,
}))

vi.mock("../components/DeleteConfirmation", () => ({
    default: () => null,
}))

const mockCustomer = {
    id: 42,
    companyName: "Acme Supplies",
    contactName: "Jane Doe",
    contactTitle: "Manager",
    address: "123 Test Street",
    city: "Manila",
    province: "Metro Manila",
    zipCode: "1000",
    phone: "09123456789",
    fax: "",
    alarm: false,
    employeeId: 1,
    priceLvl: 1,
    creditLimit: 5000,
    balance: 1000,
    credit: 0,
    invBalance: 500,
    tin: "123-456-789",
    areaCode: 2,
    customerCode: "ACME01",
    customerArea: "NCR",
    customerAgent: "Agent 1",
    agentName: "John Smith",
    customerType: "Regular",
    startDate: "2026-01-01",
    smCode: "SM01",
    term: "30 Days",
    termCode: "30",
    pType: "A",
    remarks: "Test customer",
}

function renderCustomerDetails() {
    const setSelectedCustomer = vi.fn()

    const result = render(
        <MemoryRouter initialEntries={["/orders/customers/42"]}>
            <Routes>
                <Route
                    path="/orders/customers/:customerId"
                    element={<Outlet context={{ setSelectedCustomer }} />}
                >
                    <Route index element={<CustomerDetails />} />
                </Route>
            </Routes>
        </MemoryRouter>
    )

    return { ...result, setSelectedCustomer }
}

describe("CustomerDetails", () => {
    beforeEach(() => {
        vi.clearAllMocks()
        invoke.mockResolvedValue(mockCustomer)
    })

    test("Renders customer details", async () => {
        const { setSelectedCustomer } = renderCustomerDetails()

        expect(await screen.findByText("Jane Doe")).toBeInTheDocument()

        expect(invoke).toHaveBeenCalledWith(
            "get_customer_by_id",
            { id: 42 }
        )

        expect(screen.getByText("Customer: Acme Supplies")).toBeInTheDocument()
        expect(screen.getByText("123 Test Street")).toBeInTheDocument()
        expect(screen.getByText("Manila")).toBeInTheDocument()
        expect(screen.getByText("5000")).toBeInTheDocument()
        expect(screen.getByText("Test customer")).toBeInTheDocument()

        expect(setSelectedCustomer).toHaveBeenCalledWith(42)
    })

    test("Allows editing customer fields and discarding changes", async () => {
        const user = userEvent.setup()

        renderCustomerDetails()

        await screen.findByText("Jane Doe")

        // Edit then discard
        await user.click(screen.getByRole("button", { name: /edit/i }))
        const companyNameInput = screen.getByRole("textbox", {
            name: "Company Name",
        })
        await user.clear(companyNameInput)
        await user.type(companyNameInput, "Updated Company")
        expect(companyNameInput).toHaveValue("Updated Company")
        await user.click(screen.getByRole("button", { name: /discard/i }))

        expect(screen.getByText("Acme Supplies")).toBeInTheDocument()

        expect(
            screen.getByRole("button", { name: /edit/i })
        ).toBeInTheDocument()
    })

    test("Saves updated customer details", async () => {
        const user = userEvent.setup()

        const updatedCustomer = {
            ...mockCustomer,
            companyName: "Updated Company",
        }

        // Load customer, then simulate a successful update
        invoke
            .mockResolvedValueOnce(mockCustomer)
            .mockResolvedValueOnce(updatedCustomer)

        renderCustomerDetails()

        await screen.findByText("Jane Doe")

        // Edit company name
        await user.click(screen.getByRole("button", { name: /edit/i }))
        const companyNameInput = document.querySelector(
            'input[name="companyName"]'
        )
        await user.clear(companyNameInput)
        await user.type(companyNameInput, "Updated Company")
        await user.click(screen.getByRole("button", { name: /^save$/i }))
        await waitFor(() => {
            expect(invoke).toHaveBeenCalledWith(
                "update_customer",
                {
                    id: 42,
                    customer: expect.objectContaining({
                        companyName: "Updated Company",
                    }),
                }
            )
        })

        expect(
            await screen.findByText("Customer: Updated Company")
        ).toBeInTheDocument()

        expect(
            screen.getByRole("button", { name: /edit/i })
        ).toBeInTheDocument()
    })
})