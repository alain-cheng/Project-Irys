import { useState } from "react"

/**
 * Displays a toast notification for a fixed duration.
 *
 * Intended to be used with the `<Toast/>` component.
 *
 * Example:
 * ```js
 * showToast("Customer created successfully", "success")
 * ```
 *
 * @param {string} message - Message to display.
 * @param {"success" | "error" | "warning"} [type="success"] - Toast style.
 */
export default function useToast() {
    const [toast, setToast] = useState(null)

    const showToast = (message, type = "success") => {
        setToast({ message, type })

        setTimeout(() => {
            setToast(null)
        }, 3000)
    }

    return {
        toast, 
        showToast
    }
}