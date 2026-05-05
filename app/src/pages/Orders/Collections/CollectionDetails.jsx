import { useParams } from "react-router-dom"
import { getCollectionById } from "../../../MockData/collection"

function CollectionDetails () {
    const { collectionId } = useParams()

    const collection = getCollectionById(Number(collectionId))

    if (!collection) {
        return (
            <div className="mt-10">
                <h1>Error</h1>
                <p>Collection ID No. <b className="text-accent-strong">{collectionId}</b> was not found.</p>
            </div>
        )
    }

    return(
        <div className="mt-10">
            <h1 className="text-text">Collection</h1>

            <p>Id: {collection.id}</p>
        </div>
    )
}

export default CollectionDetails