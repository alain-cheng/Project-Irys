/**
 * Displays a tooltip when the parent element is hovered.
 * 
 * Requires parent to have the `group` Tailwind class.
 * 
 * Example:
 * ```
 * <div className="relative group">
 *      <button>Hover me</button>
 *      <Tooltip text="Hello World!" />
 * </div>
 * ```
 * 
 * @param {Object} props Component props.
 * @param {string} props.text The Text display on the tooltip. 
 * @returns {JSX.Element} Tooltip component
 */
function Tooltip({ text }) {
    return(
        <div
            className="
                absolute left-1/2 -translate-x-1/2 
                mt-1 px-2 py-2
                text-xs text-white whitespace-nowrap
                rounded bg-black
                opacity-0 group-hover:opacity-100 transition-opacity
                pointer-events-none
                z-500
            "
        >
            {text}
        </div>
    )
}

export default Tooltip