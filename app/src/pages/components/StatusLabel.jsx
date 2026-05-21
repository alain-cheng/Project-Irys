// currently only designed for boolean status type
function StatusLabel({ status }) {
    return(
        <div
            className={`px-1 py-1 text-center text-[12px] rounded-lg ${status ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
        >
            { status ? "Closed" : "Open"}
        </div>
    )
}

export default StatusLabel