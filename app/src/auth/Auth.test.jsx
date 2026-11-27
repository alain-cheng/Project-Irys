import { beforeEach, describe, expect, test, vi } from "vitest"
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Link, MemoryRouter, Route, Routes } from "react-router-dom"
import { invoke } from "@tauri-apps/api/core"
import AuthProvider from "./AuthProvider"
import ProtectedLayout from "./ProtectedLayout"
import Login from "../pages/Login/Login"
import Register from "../pages/Login/Register"

vi.mock("@tauri-apps/api/core", () => ({ invoke: vi.fn() }))

const profile = { userId: 1, username: "staff.one", roleName: "Staff", permissions: ["items.view"] }

function renderAuth(path = "/") {
    return render(
        <MemoryRouter initialEntries={[path]}>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<ProtectedLayout />}>
                        <Route path="/dashboard" element={<h2>Private dashboard</h2>} />
                        <Route path="/orders" element={<Link to="/dashboard">Return to dashboard</Link>} />
                    </Route>
                </Routes>
            </AuthProvider>
        </MemoryRouter>
    )
}

async function fillLogin(user) {
    await user.type(screen.getByLabelText("Username"), "staff.one")
    await user.type(screen.getByLabelText("Password"), "A long test password")
}

async function fillRegistration(user, confirmation = "A long test password") {
    await fillLogin(user)
    await user.type(screen.getByLabelText("Confirm password"), confirmation)
}

describe("Authentication", () => {
    beforeEach(() => {
        vi.resetAllMocks()
        invoke.mockImplementation(command => {
            if (command === "get_current_user") return Promise.resolve(null)
            if (command === "login" || command === "register_user") return Promise.resolve(profile)
            if (command === "logout") return Promise.resolve()
            throw new Error(`Unexpected command: ${command}`)
        })
    })

    test("blocks direct access to private routes when signed out", async () => {
        renderAuth("/dashboard")
        expect(await screen.findByRole("button", { name: "Login" })).toBeInTheDocument()
        expect(screen.queryByText("Private dashboard")).not.toBeInTheDocument()
    })

    test("waits for the backend before displaying a private route", async () => {
        let resolveSession
        invoke.mockReturnValue(new Promise(resolve => { resolveSession = resolve }))
        renderAuth("/dashboard")
        expect(screen.getByRole("status")).toHaveTextContent("Checking session...")
        expect(screen.queryByText("Private dashboard")).not.toBeInTheDocument()
        await act(async () => { resolveSession(profile) })
        expect(await screen.findByText("Private dashboard")).toBeInTheDocument()
        expect(screen.queryByText(`Welcome ${profile.username}!`)).not.toBeInTheDocument()
    })

    test("submits credentials to Rust before entering the dashboard", async () => {
        const user = userEvent.setup()
        renderAuth()
        await fillLogin(user)
        await user.click(screen.getByRole("button", { name: "Login" }))
        expect(invoke).toHaveBeenCalledWith("login", {
            credentials: { username: "staff.one", password: "A long test password" },
        })
        expect(await screen.findByText("Private dashboard")).toBeInTheDocument()
        expect(screen.getByRole("status")).toHaveTextContent(`Welcome ${profile.username}!`)
        expect(screen.getByRole("status")).toHaveClass("bg-blue-500")
    })

    test("does not repeat the welcome toast when returning to the dashboard", async () => {
        const user = userEvent.setup()
        renderAuth()
        await fillLogin(user)
        await user.click(screen.getByRole("button", { name: "Login" }))
        expect(screen.getByText(`Welcome ${profile.username}!`)).toBeInTheDocument()
        await waitFor(() => {
            expect(screen.queryByText(`Welcome ${profile.username}!`)).not.toBeInTheDocument()
        }, { timeout: 5000 })
        await user.click(screen.getByRole("link", { name: "Orders" }))
        await user.click(screen.getByRole("link", { name: "Return to dashboard" }))
        expect(screen.getByText("Private dashboard")).toBeInTheDocument()
        expect(screen.queryByText(`Welcome ${profile.username}!`)).not.toBeInTheDocument()
        expect(invoke.mock.calls.filter(([command]) => command === "login")).toHaveLength(1)
    }, 15000)

    test("shows failed credentials and stays on the login screen", async () => {
        invoke.mockImplementation(command => command === "login"
            ? Promise.reject("Invalid username or password.") : Promise.resolve(null))
        const user = userEvent.setup()
        renderAuth()
        await fillLogin(user)
        await user.click(screen.getByRole("button", { name: "Login" }))
        expect(await screen.findByRole("alert")).toHaveTextContent("Invalid username or password.")
        expect(screen.queryByText(`Welcome ${profile.username}!`)).not.toBeInTheDocument()
        expect(screen.queryByText("Private dashboard")).not.toBeInTheDocument()
    })

    test("ignores a stale startup session response after logging in", async () => {
        let resolveSession
        invoke.mockImplementation(command => command === "get_current_user"
            ? new Promise(resolve => { resolveSession = resolve }) : Promise.resolve(profile))
        const user = userEvent.setup()
        renderAuth()
        await fillLogin(user)
        await user.click(screen.getByRole("button", { name: "Login" }))
        expect(await screen.findByText("Private dashboard")).toBeInTheDocument()
        await act(async () => { resolveSession(null) })
        expect(screen.getByText("Private dashboard")).toBeInTheDocument()
    })

    test("validates password confirmation without creating an account", async () => {
        const user = userEvent.setup()
        renderAuth("/register")
        await fillRegistration(user, "A different password")
        await user.click(screen.getByRole("button", { name: "Register" }))
        expect(screen.getByRole("alert")).toHaveTextContent("Passwords do not match.")
        expect(invoke).not.toHaveBeenCalledWith("register_user", expect.anything())
    })

    test("registers without choosing a role and returns to login", async () => {
        const user = userEvent.setup()
        renderAuth()
        await user.click(screen.getByRole("link", { name: "Create an account (temporary)" }))
        await fillRegistration(user)
        await user.click(screen.getByRole("button", { name: "Register" }))
        expect(invoke).toHaveBeenCalledWith("register_user", {
            registration: { username: "staff.one", password: "A long test password" },
        })
        expect(await screen.findByRole("button", { name: "Login" })).toBeInTheDocument()
        expect(screen.getByRole("status")).toHaveTextContent("Account created. Please log in.")
        expect(invoke).not.toHaveBeenCalledWith("login", expect.anything())
    })

    test("shows registration errors without leaving the form", async () => {
        invoke.mockImplementation(command => command === "register_user"
            ? Promise.reject("Username is already in use.") : Promise.resolve(null))
        const user = userEvent.setup()
        renderAuth("/register")
        await fillRegistration(user)
        await user.click(screen.getByRole("button", { name: "Register" }))
        expect(await screen.findByRole("alert")).toHaveTextContent("Username is already in use.")
        expect(screen.getByRole("button", { name: "Register" })).toBeEnabled()
    })

    test("logs out through Rust and removes access to the private page", async () => {
        invoke.mockImplementation(command => Promise.resolve(command === "get_current_user" ? profile : undefined))
        const user = userEvent.setup()
        renderAuth("/dashboard")
        await user.click(await screen.findByRole("button", { name: "Logout" }))
        await waitFor(() => expect(invoke).toHaveBeenCalledWith("logout"))
        expect(await screen.findByRole("button", { name: "Login" })).toBeInTheDocument()
        expect(screen.queryByText("Private dashboard")).not.toBeInTheDocument()
    })

    test("shows a logout failure rather than pretending the session ended", async () => {
        invoke.mockImplementation(command => command === "logout"
            ? Promise.reject("Session unavailable") : Promise.resolve(profile))
        const user = userEvent.setup()
        renderAuth("/dashboard")
        await user.click(await screen.findByRole("button", { name: "Logout" }))
        expect(await screen.findByRole("alert")).toHaveTextContent("Session unavailable")
        expect(screen.getByText("Private dashboard")).toBeInTheDocument()
    })
})
