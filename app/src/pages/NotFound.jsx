import { useLocation } from "react-router-dom"

function NotFound() {
    const location = useLocation()

    return(
        <div className="p-8 text-text text-sm">
            <div className="mt-10">
                <h1>Page does not exist.</h1>
                <p>
                    The route "<b className="text-accent-strong">{location.pathname}</b>" is not registered.
                </p>
            </div>
        </div>
    )
}

export default NotFound