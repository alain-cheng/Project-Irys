import { useState } from "react";
import { Copy } from "lucide-react";

function CopyButton({ value }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(String(value))

        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
    }

    return(
        <div className="relative group inline-flex">
            <button
                onClick={handleCopy}
                className="opacity-50 hover:opacity-100 transition"
            >
                <Copy size={16}/>

                <span className={`
                    absolute -top-8 left-1/2 -translate-x-1/2
                    whitespace-nowrap
                    text-xs px-2 py-1 rounded
                    text-white
                    pointer-events-none
                    transition
                    ${copied 
                        ? "bg-green-600"
                        : "bg-black opacity-0 group-hover:opacity-100"
                    }
                `}>
                    {copied ? "Copied!" : "Copy"}
                </span>
            </button>
        </div>
    )
}

export default CopyButton