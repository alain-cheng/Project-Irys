import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../auth/useAuth"

const inputClass = "w-full rounded-lg border border-border-soft bg-background px-3 py-2 outline-none focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"

export default function Register() {
    const navigate = useNavigate()
    const { register } = useAuth()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [error, setError] = useState("")
    const [submitting, setSubmitting] = useState(false)

    async function handleSubmit(event) {
        event.preventDefault()
        if (submitting) return
        setError("")
        if (password !== confirmation) {
            setError("Passwords do not match.")
            return
        }
        setSubmitting(true)
        try {
            await register({ username, password })
            navigate("/", { replace: true, state: { message: "Account created. Please log in." } })
        } catch (error) {
            setError(String(error))
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-8 text-text">
            <div className="w-full max-w-sm rounded-2xl border border-border-soft bg-background p-8 shadow-sm">
                <h1 className="text-accent-strong text-center">IRYS</h1>
                <h2 className="mt-6 mb-3">Create an account</h2>
                <p className="mb-5 text-sm">Temporary registration: the first account is an Administrator. Later accounts are Staff.</p>
                {error && <p role="alert" className="mb-4 text-sm text-red-700">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm font-semibold">Username</label>
                        <input id="username" name="username" autoComplete="username" required minLength={3} maxLength={64}
                            pattern="[A-Za-z0-9._\-]{3,64}" aria-describedby="username-help"
                            value={username} onChange={event => setUsername(event.target.value)} className={inputClass} />
                        <p id="username-help" className="text-xs">3–64 letters, numbers, dots, underscores, or hyphens. Usernames are case insensitive.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-semibold">Password</label>
                        <input id="password" name="password" type="password" autoComplete="new-password" required minLength={12} maxLength={128}
                            aria-describedby="password-help" value={password} onChange={event => setPassword(event.target.value)} className={inputClass} />
                        <p id="password-help" className="text-xs">Use 12–128 characters. Spaces are allowed.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="confirm-password" className="text-sm font-semibold">Confirm password</label>
                        <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required minLength={12} maxLength={128}
                            value={confirmation} onChange={event => setConfirmation(event.target.value)} className={inputClass} />
                    </div>
                    <button type="submit" disabled={submitting}
                        className="cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold transition hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong">
                        {submitting ? "Creating account..." : "Register"}
                    </button>
                </form>
                <p className="mt-6 text-sm text-center"><Link to="/" className="underline">Back to login</Link></p>
            </div>
        </main>
    )
}
