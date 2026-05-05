import { useParams } from "react-router-dom"
import { getCreditMemoById } from "../../../MockData/creditMemo"

function CreditReturnDetails () {
    const { creditReturnId } = useParams()

    const creditReturn = getCreditMemoById(Number(creditReturnId))

    if (!creditReturn) {
        return (
            <div className="mt-10">
                <h1>Error</h1>
                <p>Credit Return No. <b className="text-accent-strong">{creditReturnId}</b> was not found.</p>
            </div>
        )
    }

    return(
        <div className="mt-10">
            <h1 className="text-text">Credit Return</h1>

            <p>Id: {creditReturn.id}</p>
        </div>
    )
}

export default CreditReturnDetails