import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react"
import { useState } from "react"
import { useAuth } from "../auth/useAuth"

function NavBar() {
    const navigate = useNavigate();
    const { logout } = useAuth()
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")

    async function handleLogout() {
        if (submitting) return
        setSubmitting(true)
        setError("")
        try {
            await logout()
            navigate("/", { replace: true })
        } catch (error) {
            setError(String(error))
        } finally {
            setSubmitting(false)
        }
    }

    return(
        <nav className="flex flex-1 min-w-0 items-center gap-4">
            <div className="shrink-0 border-b border-border-soft rounded-2xl py-2 shadow-xs">
                <NavLink
                    to="/dashboard"
                    end
                    className={({ isActive }) =>
                        `px-3 py-2 rounded-l-2xl ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                        Dashboard
                </NavLink>

                <NavLink 
                    to="/orders"
                    className={({ isActive }) =>
                        `px-3 py-2 ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                    Orders
                </NavLink>

                <NavLink
                    to="/purchases"
                    className={({ isActive}) => 
                        `px-3 py-2 ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                        Purchases
                </NavLink>

                <NavLink 
                    to="/expenses"
                    className={({ isActive }) => 
                        `px-3 py-2 ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                    Expenses
                </NavLink>

                <NavLink 
                    to="/reports"
                    className={({ isActive }) => 
                        `px-3 py-2 rounded-r-2xl ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                    Reports
                </NavLink>
            </div>
            {error && <p role="alert" className="ml-auto text-sm text-red-700">{error}</p>}
            <button
                type="button"
                onClick={handleLogout}
                disabled={submitting}
                className="ml-auto flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-text transition hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
            >
                <LogOut size={18} aria-hidden="true" />
                {submitting ? "Logging out..." : "Logout"}
            </button>
        </nav>
    )
}

export default NavBar
