import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault()
        navigate("/dashboard", { replace: true })
    }

    return (
        <main className="flex min-h-screen items-center justify-center px-4 py-8 text-text">
            <div className="w-full max-w-sm rounded-2xl border border-border-soft bg-background p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-accent-strong">IRYS</h1>
                    <p className="mt-2 text-sm">Hardware Inventory ERP System</p>
                </div>

                <h2 className="mb-6">Login</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="text-sm font-semibold">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
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
                            className="w-full rounded-lg border border-border-soft bg-background px-3 py-2 outline-none focus:border-accent-strong focus:ring-2 focus:ring-accent-soft"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-1 cursor-pointer rounded-lg bg-accent px-4 py-2 font-semibold transition hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    )
}

export default Login
