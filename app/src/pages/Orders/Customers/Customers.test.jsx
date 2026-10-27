import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";

import Customers from "./Customers";


vi.mock("@tauri-apps/api/core", () => ({
    invoke: vi.fn(),
}))

function CustomersTestWrapper() {
    const [selectedCustomer, setSelectedCustomer] = useState(null)

    return(
        <Routes>
            <Route
                path="/"
                element={
                    <Outlet
                        context={{
                            selectedCustomer,
                            setSelectedCustomer,
                        }}
                    />
                }
            >
                <Route index element={<Customers />} />
            </Route>
        </Routes>
    )
}

beforeEach(() => {
    vi.clearAllMocks()
})

describe("Customers", () => {
    test("Renders the customer table", () => {
        render(
            <MemoryRouter>
                <CustomersTestWrapper />
            </MemoryRouter>
        )

        expect(
            screen.getByRole("table")
        ).toBeInTheDocument()

        expect(
            screen.getByRole("columnheader", { name: /company name/i })
        ).toBeInTheDocument()
    })

    test("Loads customers after invoking appropriate Tauri command", async () => {
        invoke.mockResolvedValue([
            {
                id: 1,
                companyName: "Test Company",
                contactName: "Jane Doe",
                contactTitle: "Manager",
                address: "123 Test Street",
                city: "Manila",
                province: "Metro Manila",
                zipCode: "0123",
                phone: "09123456789",
                fax: "",
            },
        ])

        render(
            <MemoryRouter>
                <CustomersTestWrapper />
            </MemoryRouter>
        )

        expect(invoke).toHaveBeenCalledWith("get_all_customers")

        expect(
            await screen.findByText("Test Company")
        ).toBeInTheDocument()

        expect(
            screen.getByText("Jane Doe")
        ).toBeInTheDocument()
    })
})