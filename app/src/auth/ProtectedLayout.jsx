import { Navigate, Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useAuth } from "./useAuth"

export default function ProtectedLayout() {
    const { user, loading } = useAuth()
    if (loading) return <p role="status" className="p-8">Checking session...</p>
    if (!user) return <Navigate to="/" replace />
    return <><Header /><Outlet /></>
}
