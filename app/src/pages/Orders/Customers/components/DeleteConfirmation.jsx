import { UserRoundX, X } from "lucide-react"

function DeleteConfirmation({ isOpen, onClose, customerId, onDelete }) {
    if (!isOpen) return null

    async function handleDelete(e) {
        e.preventDefault()
        await onDelete(customerId)
    }

    return (
        <div className="fixed flex items-center justify-center inset-0 bg-black/40 z-1000 w-full h-full">
            <div className="flex flex-col space-y-5 px-2 py-2 rounded-lg bg-background">
                <div className="flex justify-end">
                    <button
                        className="px-1 py-1 rounded-full hover:bg-gray-100 cursor-pointer"
                        onClick={onClose}
                    >
                        <X />
                    </button>
                </div>
                
                <div className="flex justify-center text-red-600">
                    <UserRoundX size={50}/>
                </div>
                
                <div>
                    <h4 className="flex justify-center text-text">
                        Delete Customer #{customerId}?
                    </h4>

                    <p className="text-center text-text w-100">
                        This action will permanently remove this customer and cannot be undone.
                    </p>
                </div>

                <div
                    className="flex space-x-5 justify-between"
                >
                    <button
                        className="px-2 py-1 w-full rounded-lg bg-gray-500 hover:bg-gray-400 text-white  cursor-pointer"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-2 py-1 w-full rounded-lg text-white bg-red-500 hover:bg-red-400 cursor-pointer"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default DeleteConfirmation