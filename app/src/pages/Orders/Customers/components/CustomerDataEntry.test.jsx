import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CustomerDataEntry from "./CustomerDataEntry";

describe("CustomerDataEntry", () => {
    test("Renders the customer form on open", () => {
        render(
            <CustomerDataEntry 
                isOpen={true}
                onClose={vi.fn()}
                onSubmit={vi.fn().mockResolvedValue({ id: 1 })}
                isSaving={false}
            />
        )

        expect(
            screen.getByLabelText(/company name/i)
        ).toBeInTheDocument()

        expect(
            screen.getByLabelText(/contact name/i)
        ).toBeInTheDocument()

        expect(
            screen.getByRole("button", { name: /add customer/i })
        ).toBeInTheDocument()
    })

    test("Submits entered customer data", async () => {
        const user = userEvent.setup()
        const handleSubmit = vi.fn().mockResolvedValue({ id: 1 })
        
        const companyName = "Test Company"
        const contactName = "Jane Doe"

        render(
            <CustomerDataEntry 
                isOpen={true}
                onClose={vi.fn()}
                onSubmit={handleSubmit}
                isSaving={false}
            />
        )

        await user.type(
            screen.getByLabelText(/company name/i),
            companyName
        )

        await user.type(
            screen.getByLabelText(/contact name/i),
            contactName
        )

        await user.click(
            screen.getByRole("button", { name: /add customer/i })
        )

        expect(handleSubmit).toHaveBeenCalledOnce()

        expect(handleSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
                companyName: companyName,
                contactName: contactName,
            })
        )
    })
})