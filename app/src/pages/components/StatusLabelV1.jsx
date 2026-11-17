/**
 * Status label designed only for binary values.
 * 
 * Use `StatusLabelV2` component when dealing with Strings.
 * 
 * @param {Object} props
 * @param {Boolean} status - `0` for Closed, `1` for Open.
 *  
 * @returns {JSX.Element} Status Label Component
 */
function StatusLabel({ status }) {
    return(
        <div
            className={`
                ${status 
                    ? "bg-red-500" 
                    : "bg-green-500"
                } 
                px-1 py-1 text-center text-[12px] rounded-lg text-white 
            `}
        >
            { status ? "Closed" : "Open"}
        </div>
    )
}

export default StatusLabel