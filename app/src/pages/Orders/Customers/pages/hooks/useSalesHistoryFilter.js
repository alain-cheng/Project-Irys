import { useState } from "react"

/**
 * 
 * 
 */
export default function useSalesHistoryFilter() {
    const [paymentStatus, setPaymentStatus] = useState("all") // "all" | "unpaid_sales"

    return {
        paymentStatus, setPaymentStatus
    }
}

