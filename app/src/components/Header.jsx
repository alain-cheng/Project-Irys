import NavBar
 from "./NavBar"
function Header() {
    return(
        <div className="fixed flex min-w-screen items-center space-x-5 px-2 py-2 border border-border-soft bg-background">
            {/* Logo Placeholder*/}
            <h1 className="text-accent-strong">IRYS</h1>

            
            <NavBar />
        </div>
    )
}

export default Header