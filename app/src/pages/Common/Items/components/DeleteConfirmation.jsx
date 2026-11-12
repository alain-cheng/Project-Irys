import { Trash2, X } from "lucide-react"

function DeleteConfirmation({ isOpen, onClose, itemId, itemName, onDelete, isDeleting, error }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/40 p-4">
            <div role="dialog" aria-modal="true" aria-labelledby="delete-item-title" className="flex w-full max-w-md flex-col gap-4 rounded-lg bg-background p-4">
                <div className="flex justify-end">
                    <button type="button" aria-label="Close delete confirmation" disabled={isDeleting} onClick={onClose} className="cursor-pointer rounded-full p-1 hover:bg-background-darker disabled:cursor-wait">
                        <X aria-hidden="true" />
                    </button>
                </div>
                <Trash2 size={48} aria-hidden="true" className="mx-auto text-red-600" />
                <h4 id="delete-item-title" className="text-center text-text">Delete Item #{itemId}?</h4>
                <p className="wrap-break-word text-center font-semibold text-text">{itemName}</p>
                <p className="text-center text-sm text-text">This action will permanently remove this item and cannot be undone.</p>
                {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
                <div className="flex gap-3">
                    <button type="button" disabled={isDeleting} onClick={onClose} className="flex-1 cursor-pointer rounded-lg bg-gray-500 px-3 py-2 text-white hover:bg-gray-400 disabled:cursor-wait">Cancel</button>
                    <button type="button" disabled={isDeleting} onClick={() => onDelete(itemId)} className="flex-1 cursor-pointer rounded-lg bg-red-500 px-3 py-2 text-white hover:bg-red-600 disabled:cursor-wait disabled:opacity-50">
                        {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmation
