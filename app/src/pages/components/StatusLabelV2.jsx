// An improved version of `StatusLabel.jsx`

/**
 * Displays a color coded status label.
 * 
 * This component stylizes itself from a defined set of strings.
 * It will revert to default styling if it does not contain the specific strings.
 * 
 * Example:
 * ```jsx
 *  <StatusLabelV2 statusName={"Open"} />
 * ```
 * 
 * @param {Object} props
 * @param {"open" | "closed" | "posted" | string} props.statusName
 * 
 * @returns {JSX.Element} Status Label Component
 */
function StatusLabelV2({ statusName = "default" }) {
    const baseStyle = "px-1 py-1 text-center text-[12px] rounded-lg"

    const styles = {
        open: "bg-green-500 text-white",
        closed: "bg-red-500 text-white",
        posted: "bg-yellow-100 text-text",
        default: "bg-gray-500 text-text",
    }

    return(
        <div
            className={`${baseStyle} ${styles[statusName?.toLowerCase()] ?? styles.default}`}
        >
            {statusName}
        </div>
    )
}

export default StatusLabelV2