import { Link, useLocation } from "react-router-dom"
import { pathLabelMap } from "../constants/pathLabelMap"
import HistoryNavigation from "./HistoryNavigation"

function Breadcrumb() {
    const location = useLocation()

    const paths = location.pathname.split("/").filter(Boolean)

    //console.log("paths: ", paths);

    return(
        <div className="flex items-center gap-2">
            <HistoryNavigation />
            <div className="min-w-0 flex-1 border border-border-soft rounded-lg flex items-center space-x-2 text-text text-sm px-2 py-1 my-2 bg-background shadow-xs">
                {paths.map((path, i) => {
                    const routeTo = "/" + paths.slice(0, i + 1).join("/")

                    const isLast = i === paths.length - 1

                    return(
                        <span
                            key={routeTo}
                            className="flex space-x-2 items-center"
                        >
                            {(i > 0) ? (
                                <span>{">"}</span>
                            ) : (
                                <>
                                    {/* to insert icon here */}
                                </>
                            )}


                            {isLast ? (
                                <span className="text-accent-strong">
                                    {pathLabelMap[path] || path }
                                </span>
                            ) : (
                                <Link
                                    to={routeTo}
                                    className="hover:text-accent-strong"
                                >
                                    {pathLabelMap[path] || path }
                                </Link>
                            )}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

export default Breadcrumb
