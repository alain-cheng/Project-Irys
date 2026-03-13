import { NavLink } from "react-router-dom"

function Node({ icon: Icon, label, path }) {
    return(
        <NavLink 
            to={path}
            className="border border-text rounded-2xl flex flex-col items-center px-2 py-2 w-37 h-30 bg-background hover:bg-accent-soft"
        >
            <Icon size={75} />
            <span className="rounded-2xl bg-accent w-full text-center mt-2 ">
                {label}
            </span>
        </NavLink>
    )
}

export default Node