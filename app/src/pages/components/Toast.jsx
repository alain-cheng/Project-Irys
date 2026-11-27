import { Info, CircleX, TriangleAlert } from "lucide-react"

/**
 * Displays a notification message to the user.
 *
 * This component is purely UI and cannot manage
 * its own visibility, lifetime, and/or dismissal behavior.
 *
 * A parent component (controller) is responsible for:
 * - Storing the toast state
 * - Showing or hiding the toast
 * - Automatically dismissing the toast after a timeout
 *
 * Supported toast types:
 * - "info"
 * - "success"
 * - "error"
 * - "warning"
 *
 * Example:
 * ```jsx
 * const [toast, setToast] = useState(null)
 *
 * {toast && (
 *     <Toast
 *         message={toast.message}
 *         type={toast.type}
 *     />
 * )}
 * ```
 * NOTE:
 * This component is not intended to be used directly.
 * Prefer using the application's toast controller/helper
 * to display notifications.
 * 
 * @param {Object} props
 * @param {string} props.message - Message displayed to the user.
 * @param {"info" | "success" | "error" | "warning"} [props.type="success"] - Visual style and icon.
 *
 * @returns {JSX.Element} Toast notification component.
 * 
 * 
 */
function Toast({ message, type = "success"}) {
    const baseStyle = "flex gap-2 fixed items-center bottom-5 px-3 py-2 text-white rounded shadow transition z-1000"

    const styles = {
        info: "bg-blue-500",
        success: "bg-green-500",
        error: "bg-red-500",
        warning: "bg-yellow-500 text-black"
    }

    const icons = {
        info: Info,
        success: Info,
        error: CircleX,
        warning: TriangleAlert
    }

    const Icon = icons[type] ?? Info

    return(
        <div role="status" className={`${baseStyle} ${styles[type]}`}>
            <Icon size={18} />
            {message}
        </div>
    )
}

export default Toast
