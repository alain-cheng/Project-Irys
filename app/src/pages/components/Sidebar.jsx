import { NavLink } from "react-router-dom";

function Sidebar({ links }) {
    return(
        <aside className="border border-border-soft w-64 rounded-2xl px-4 py-2">
            <ul className="flex flex-col">
                Sidebar
            </ul>
            <ul className="flex flex-col">
                Sidebar
            </ul>
        </aside>
    )
}

/**
 *   
 return (
    <aside className="w-64 p-4 border-r border-black">
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg ${
                  isActive ? "bg-accent-soft" : "hover:bg-accent-soft"
                }`
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
 */

export default Sidebar