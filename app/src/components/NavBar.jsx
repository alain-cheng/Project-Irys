import { useNavigate } from "react-router-dom"

function NavBar() {
    const navigate = useNavigate();

    return(
        <div className="border-b border-border-soft rounded-2xl">
            {/* */}
            <div className="">
                <button 
                    onClick={() => navigate("/")}
                    className="px-3 py-2 rounded-l-2xl hover:bg-accent-soft"
                >
                        Dashboard
                </button>

                <button 
                    onClick={() => navigate("/orders")}
                    className="px-3 py-2 hover:bg-accent-soft"
                >
                    Orders
                </button>

                <button 
                    onClick={() => navigate("/purchases")}
                    className="px-3 py-2 hover:bg-accent-soft"
                >
                        Purchases
                </button>

                <button 
                    onClick={() => navigate("/expenses")}
                    className="px-3 py-2 hover:bg-accent-soft"
                >
                    Expenses
                </button>

                <button 
                    onClick={() => navigate("/reports")}
                    className="px-3 py-2 rounded-r-2xl hover:bg-accent-soft"
                >
                    Reports
                </button>
            </div>
        </div>
    )
}

export default NavBar