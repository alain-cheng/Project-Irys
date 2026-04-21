import NavBar
 from "./NavBar"
function Header() {
    return(
        <div className="fixed top-0 left-0 flex min-w-screen items-center z-50 h-16 space-x-5 px-2 py-2 border border-border-soft bg-background">
            {/* Logo Placeholder*/}
            <h1 className="text-accent-strong">IRYS</h1>

            
            <NavBar />
        </div>
    )
}

export default Header