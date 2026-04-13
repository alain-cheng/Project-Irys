import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();

    return(
        <div className="border-b border-border-soft rounded-2xl py-2">
            <div className="">
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `px-3 py-2 rounded-l-2xl ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                        Dashboard
                </NavLink>

                <NavLink 
                    to="/orders"
                    className={({ isActive }) =>
                        `px-3 py-2 ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                    Orders
                </NavLink>

                <NavLink
                    to="/purchases"
                    className={({ isActive}) => 
                        `px-3 py-2 ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                        Purchases
                </NavLink>

                <NavLink 
                    to="/expenses"
                    className={({ isActive }) => 
                        `px-3 py-2 ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                    Expenses
                </NavLink>

                <NavLink 
                    to="/reports"
                    className={({ isActive }) => 
                        `px-3 py-2 rounded-r-2xl ${
                            isActive ? "bg-accent" : "hover:bg-accent-soft"
                        }`
                    }
                >
                    Reports
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar