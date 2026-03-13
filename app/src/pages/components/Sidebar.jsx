import { NavLink } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

function Sidebar({ links }) {
  const [expanded, setExpanded] = useState(null)
  
  return(
    <aside className="fixed left-0 top-16 border border-border-soft w-64 h-full rounded-2xl px-4 py-2 bg-background">
        <ul className="flex flex-col">
            {links.map((link) => {

              const Icon = link.icon
              const isOpen = expanded === link.path

              return(
                <li key={link.path}>
                  <div
                    onClick={() => setExpanded(isOpen ? null : link.path)}
                    className="flex items-center justify-between px-3 py-1 rounded-lg text-sm hover:text-accent cursor-pointer"
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-3 py-1 rounded-lg text-sm ${
                          isActive 
                            ? "text-accent-strong" 
                            : "hover:text-accent-strong"
                        }` 
                      }
                    >
                      <Icon size={18} />
                      {link.label}
                    </NavLink>

                    {isOpen
                      ? <ChevronDown size={16} />
                      : <ChevronRight size={16} />
                    }
                  </div>
                </li>
              )
            })}
        </ul>
    </aside>
  )
}

export default Sidebar