import NavBar from "./NavBar"
import MenuModal from "./MenuModal"

import useHeader from "./hooks/useHeader"

function Header() {
    const {
        isMenuOpen, setIsMenuOpen
    } = useHeader()


    return(
        <>
            <div className="fixed top-0 left-0 flex w-full items-center z-50 h-16 space-x-5 px-2 py-2 border border-border-soft bg-background shadow-xs">
                {/* Logo Placeholder*/}
                <div
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className="hover:cursor-pointer"
                >
                    <h1 className="text-accent-strong">IRYS</h1>
                </div>
                
                <NavBar />
            </div>

            {isMenuOpen && (
                <MenuModal onClose={() => setIsMenuOpen(false)}/>
            )}
        </>
        
    )
}

export default Header