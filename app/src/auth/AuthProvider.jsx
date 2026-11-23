import { useEffect, useRef, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import { AuthContext } from "./AuthContext"
import Toast from "../pages/components/Toast"
import useToast from "../pages/components/hooks/useToast"

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [initialError, setInitialError] = useState("")
    const revision = useRef(0)
    const { toast, showToast } = useToast()

    useEffect(() => {
        let active = true
        const requestRevision = revision.current
        invoke("get_current_user")
            .then(profile => {
                if (active && requestRevision === revision.current) setUser(profile)
            })
            .catch(error => {
                if (active && requestRevision === revision.current) setInitialError(String(error))
            })
            .finally(() => {
                if (active && requestRevision === revision.current) setLoading(false)
            })
        return () => { active = false }
    }, [])

    async function login(credentials) {
        const requestRevision = ++revision.current
        setInitialError("")
        setUser(null)
        try {
            const profile = await invoke("login", { credentials })
            if (requestRevision === revision.current) {
                setUser(profile)
                showToast(`Welcome ${profile.username}!`, "info")
            }
        } finally {
            if (requestRevision === revision.current) setLoading(false)
        }
    }

    async function logout() {
        ++revision.current
        await invoke("logout")
        setUser(null)
        setLoading(false)
        setInitialError("")
    }

    async function register(registration) {
        return invoke("register_user", { registration })
    }

    return (
        <AuthContext.Provider value={{ user, loading, initialError, login, logout, register }}>
            {children}
            {user && toast && <Toast message={toast.message} type={toast.type} />}
        </AuthContext.Provider>
    )
}
