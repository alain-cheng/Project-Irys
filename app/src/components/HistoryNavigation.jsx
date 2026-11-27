import { ArrowLeft, ArrowRight } from "lucide-react"
import { useLocation } from "react-router-dom"

const buttonClass = "cursor-auto rounded p-1 transition enabled:hover:bg-accent-soft disabled:text-gray-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-strong"

function HistoryNavigation() {
    // Subscribe to route changes so native history traversal updates the buttons.
    useLocation()
    const historyIndex = window.history.state?.idx
    const canGoBack = Number.isInteger(historyIndex) && historyIndex > 0
    const canGoForward = Number.isInteger(historyIndex) && historyIndex < window.history.length - 1

    return (
        <div role="group" aria-label="Page history" className="flex shrink-0 items-center gap-1 rounded-lg border border-border-soft bg-background p-0.5 text-text shadow-xs">
            <button type="button" aria-label="Go back" disabled={!canGoBack} onClick={() => window.history.back()} className={buttonClass}>
                <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Go forward" disabled={!canGoForward} onClick={() => window.history.forward()} className={buttonClass}>
                <ArrowRight size={16} aria-hidden="true" />
            </button>
        </div>
    )
}

export default HistoryNavigation
