import { X } from "lucide-react"
import { useState } from "react"

/**
 * 
 * @returns 
 */
function SalesHistoryFilter({ 
    isOpen, onClose,
    paymentStatus, setPaymentStatus,
}) {
    if (!isOpen) return null

    return(
        <div 
            className="fixed flex z-1000 w-full h-full inset-0 bg-black/40"
            onMouseDown={(e) => {
                if (e.target === e.currentTarget)
                    onClose();
            }}
        >
            <div className="fixed flex flex-col gap-2 top-16 right-0 w-150 h-full px-2 py-2 border bg-background">
                <div className="flex justify-end">
                    <button
                        className="px-1 py-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>
                

                <h2 className="text-accent-strong">Filters</h2>

                <hr className="border-gray-200" />

                <h3 className="text-text">Payment Status</h3>

                <div className="flex gap-2">
                    <input
                        type="radio"
                        name="payment_status"
                        value="all"
                        checked={paymentStatus === "all"}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                    />
                    <label>All</label>
                </div>

                <div className="flex gap-2">
                    <input
                        type="radio"
                        name="payment_status"
                        value="unpaid_sales"
                        checked={paymentStatus === "unpaid_sales"}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                    />
                    <label>Unpaid Sales</label>
                </div>

                <hr className="border-gray-200" />
            </div>
        </div>
    )
}

export default SalesHistoryFilter