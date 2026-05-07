import { Link, useLocation } from "react-router-dom"
import { pathLabelMap } from "../constants/pathLabelMap"

function Breadcrumb({ items }) {
    const location = useLocation()

    const paths = location.pathname.split("/").filter(Boolean)

    //console.log("paths: ", paths);

    return(
        <div className="border border-border-soft rounded-lg flex items-center space-x-2 text-text text-sm px-2 py-1 my-2 bg-background shadow-xs">
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
    )
}

export default Breadcrumb