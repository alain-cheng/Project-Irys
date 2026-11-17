import { useState } from "react";
import { Outlet } from "react-router-dom";

function ItemsLayout() {
    const [selectedItem, setSelectedItem] = useState(null)

    return(
        <div className="flex flex-col gap-2 h-full">
            <Outlet 
                context={{
                    selectedItem,
                    setSelectedItem,
                }}
            />
        </div>
    )
}

export default ItemsLayout