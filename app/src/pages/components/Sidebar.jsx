import { NavLink } from "react-router-dom"
import { ChevronRight, ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { useState } from "react"
import Tooltip from "./Tooltip"

function Sidebar({ links }) {
  const [expanded, setExpanded] = useState(null)
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  return(
    <aside
      data-collapsed={isCollapsed}
      aria-label="Sidebar navigation"
      className={`peer fixed left-0 top-18 bottom-2 flex flex-col border border-border-soft rounded-2xl py-2 bg-background transition-[width] duration-200 motion-reduce:transition-none ${isCollapsed ? "w-16 px-2" : "w-64 px-4"}`}
    >
        <ul className="flex min-h-0 flex-1 flex-col overflow-y-auto">
            {links
              .filter(link => link.showInSidebar !== false)
              .map((link) => {
                const Icon = link.icon
                const isOpen = expanded === link.path
                const hasChildren = link.children && link.children.length > 0

                return(
                  <li key={link.path}>
                    <div
                      onClick={() => { 
                        if (hasChildren && !isCollapsed) {
                          setExpanded(isOpen ? null : link.path)
                        }
                      }}
                      className={`flex items-center rounded-lg text-sm ${isCollapsed ? "justify-center py-1" : `justify-between px-3 py-1 ${hasChildren ? "cursor-pointer" : ""}`}`}
                    >
                      <NavLink
                        to={link.path}
                        aria-label={link.label}
                        className={({ isActive }) =>
                          `relative group flex items-center gap-3 py-1 rounded-lg text-sm ${isCollapsed ? "justify-center p-2" : "px-3"} ${
                            isActive 
                              ? "text-accent-strong" 
                              : "hover:text-accent-strong"
                          }` 
                        }
                      >
                        <Icon size={18} className="shrink-0" aria-hidden="true" />
                        {!isCollapsed && link.label}
                        {isCollapsed && <Tooltip text={link.label} placement="right" />}
                      </NavLink>

                      {!isCollapsed && hasChildren && (isOpen
                        ? <ChevronDown size={16} className="hover:text-accent" />
                        : <ChevronRight size={16} className="hover:text-accent" />
                    )}
                    </div>
                    
                    {!isCollapsed && isOpen && link.children && (
                      <ul className="ml-6 flex flex-col gap-1">
                        {link.children.map((child) => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              className={({ isActive }) =>
                                `block text-sm font-light pl-8 py-0.5 rounded-lg hover:text-accent-strong ${
                                isActive 
                                  ? "text-accent-strong" 
                                  : "hover:text-accent-strong"
                                }`
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
            })}
        </ul>
        <button
          type="button"
          onClick={() => setIsCollapsed(prev => !prev)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!isCollapsed}
          className={`relative group flex shrink-0 mt-2 py-2 gap-3 cursor-pointer items-center rounded-lg border-t border-border-soft text-sm text-text hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-accent-strong ${isCollapsed ? "justify-center" : "px-3"}`}
        >
          {isCollapsed ? <PanelLeftOpen size={20} aria-hidden="true" /> : <PanelLeftClose size={20} aria-hidden="true" />}
          {!isCollapsed && <span>Collapse sidebar</span>}
          {isCollapsed && <Tooltip text="Expand sidebar" placement="right" />}
        </button>
    </aside>
  )
}

export default Sidebar
