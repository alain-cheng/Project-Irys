import { useState } from "react"

function useHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    return {
        isMenuOpen, setIsMenuOpen
    }
}

export default useHeader