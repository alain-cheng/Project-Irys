import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/useAuth"

function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const { login, initialError } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        if (submitting) return
        setSubmitting(true)
        setError("")
        try {
            await login({ username, password })
            navigate("/dashboard", { replace: true })
        } catch (error) {
            setError(String(error))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-8 text-text">
            <div className="w-full max-w-sm rounded-2xl border border-border-soft bg-background p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-accent-strong">IRYS</h1>
                    <p className="mt-2 text-sm">Hardware Inventory ERP System</p>
                </div>

                <h2 className="mb-6">Login</h2>
                {location.state?.message && <p role="status" className="mb-4 text-sm">{location.state.message}</p>}
                {(error || initialError) && <p role="alert" className="mb-4 text-sm text-red-700">{error || initialError}</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm font-semibold">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            maxLength={64}
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            className="w-full rounded-lg border border-border-soft bg-background px-3 py-2 outline-none focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-semibold">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            maxLength={128}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            className="w-full rounded-lg border border-border-soft bg-background px-3 py-2 outline-none focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-1 cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold transition hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
                    >
                        {submitting ? "Logging in..." : "Login"}
                    </button>
                </form>
                <p className="mt-6 text-sm text-center">
                    <Link to="/register" className="underline">Register a new account</Link>
                </p>
            </div>
        </main>
    )
}

export default Login
