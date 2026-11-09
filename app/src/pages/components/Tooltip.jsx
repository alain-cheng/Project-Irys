import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

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
 * @param {"bottom" | "right"} [props.placement="bottom"] Tooltip placement.
 * @returns {JSX.Element} Tooltip component
 */
function Tooltip({ text, placement = "bottom" }) {
    const anchorRef = useRef(null)
    const [position, setPosition] = useState(null)

    useEffect(() => {
        if (placement !== "right") return

        const trigger = anchorRef.current.parentElement
        function show() {
            const bounds = trigger.getBoundingClientRect()
            setPosition({ left: bounds.right + 12, top: bounds.top + bounds.height / 2 })
        }
        function hide() {
            setPosition(null)
        }

        trigger.addEventListener("mouseenter", show)
        trigger.addEventListener("mouseleave", hide)
        trigger.addEventListener("focusin", show)
        trigger.addEventListener("focusout", hide)
        window.addEventListener("scroll", hide, true)
        window.addEventListener("resize", hide)

        return () => {
            trigger.removeEventListener("mouseenter", show)
            trigger.removeEventListener("mouseleave", hide)
            trigger.removeEventListener("focusin", show)
            trigger.removeEventListener("focusout", hide)
            window.removeEventListener("scroll", hide, true)
            window.removeEventListener("resize", hide)
        }
    }, [placement])

    if (placement === "right") {
        return (
            <>
                <span ref={anchorRef} aria-hidden="true" />
                {position && createPortal(
                    <div
                        role="tooltip"
                        style={position}
                        className="fixed -translate-y-1/2 px-2 py-2 text-xs text-white whitespace-nowrap rounded bg-black pointer-events-none z-500"
                    >
                        {text}
                    </div>,
                    document.body
                )}
            </>
        )
    }

    return(
        <div
            role="tooltip"
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
