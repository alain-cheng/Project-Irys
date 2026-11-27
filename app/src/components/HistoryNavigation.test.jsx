import { expect, test } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter, Link, useLocation } from "react-router-dom"
import HistoryNavigation from "./HistoryNavigation"

function NavigationExample() {
    const location = useLocation()
    return (
        <>
            <HistoryNavigation />
            <p data-testid="current-path">{location.pathname}</p>
            <Link to="/orders">Orders</Link>
            <Link to="/purchases">Purchases</Link>
        </>
    )
}

test("updates disabled arrows at history boundaries and discards forward history after a new link", async () => {
    const user = userEvent.setup()
    render(<BrowserRouter><NavigationExample /></BrowserRouter>)
    const back = screen.getByRole("button", { name: "Go back" })
    const forward = screen.getByRole("button", { name: "Go forward" })

    expect(back).toBeDisabled()
    expect(forward).toBeDisabled()
    expect(back).toHaveClass("disabled:text-gray-400")
    await user.click(screen.getByRole("link", { name: "Orders" }))
    expect(back).toBeEnabled()
    expect(forward).toBeDisabled()

    await user.click(back)
    await waitFor(() => expect(back).toBeDisabled())
    expect(forward).toBeEnabled()
    await user.click(forward)
    await waitFor(() => expect(screen.getByTestId("current-path")).toHaveTextContent("/orders"))
    expect(back).toBeEnabled()
    expect(forward).toBeDisabled()

    await user.click(back)
    await waitFor(() => expect(back).toBeDisabled())
    await user.click(screen.getByRole("link", { name: "Purchases" }))
    expect(screen.getByTestId("current-path")).toHaveTextContent("/purchases")
    expect(back).toBeEnabled()
    expect(forward).toBeDisabled()
})
