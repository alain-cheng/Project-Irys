import { NavLink } from "react-router-dom"

function MenuModal({ onClose }) {
    return(
        <>
            {/* overlay */}
            <div
                onClick={onClose}
                className="fixed inset-0 bg-black/20 z-55"
            />

            {/* panel */}
            <div
                className="border border-border-soft fixed left-1 top-17 z-60 bg-background p-5 min-w-200 shadow-lg rounded-2xl"
            >
                <h2 className="text-xl text-accent-strong">Navigate</h2>

                <hr className="my-2"></hr>

                <div className="">
                    <div className="flex">
                        <NavLink 
                            to="/"
                            end
                            className="flex-1 text-left pl-2 hover:underline"
                            onClick={onClose}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink 
                            to="/orders"
                            className="flex-1 text-left pl-2 hover:underline"
                            onClick={onClose}
                        >
                            Orders
                        </NavLink>
                    </div>

                    <div className="flex">
                        <NavLink
                            to="/purchases"
                            className="flex-1 text-left pl-2 hover:underline"
                            onClick={onClose}
                        >
                            Purchases
                        </NavLink>
                        <NavLink 
                            to="/expenses"
                            className="flex-1 text-left pl-2 hover:underline"
                            onClick={onClose}
                        >
                            Expenses
                        </NavLink>
                    </div>

                    <div className="flex">
                        <NavLink 
                            to="/reports"
                            className="flex-1 text-left pl-2 hover:underline"
                            onClick={onClose}
                        >
                            Reports
                        </NavLink>
                    </div>

                    <h3 className="text-lg text-text">Misc</h3>
                    <div className="flex">
                        <NavLink
                            to="/items" 
                            className="flex-1 text-left pl-2 hover:underline"
                            onClick={onClose}
                        >
                            Items
                        </NavLink>
                        <NavLink 
                            to="/item_orders"
                            className="flex-1 text-left pl-2 hover:underline"
                            onClick={onClose}
                        >
                            Item Orders
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MenuModal