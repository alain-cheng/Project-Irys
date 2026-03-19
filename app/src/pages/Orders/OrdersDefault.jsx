import { orderLinks } from "../../routes/orderLinks"

import Node from "../components/Node"

function OrdersDefault() {
    return(
        <>
            <h1 className="text-2xl text-text mb-5">Orders</h1>

            {/* to consider using React Flow for the flowchart-style UI */}
            <div className="flex items-center gap-5">
                <Node 
                    icon={orderLinks[0].icon}  
                    label={orderLinks[0].label}
                    path={orderLinks[0].path}
                />

                <Node 
                    icon={orderLinks[1].icon}  
                    label={orderLinks[1].label}
                    path={orderLinks[1].path}
                />

                <Node 
                    icon={orderLinks[2].icon}  
                    label={orderLinks[2].label}
                    path={orderLinks[2].path}
                />

                <div className="flex flex-col gap-5">
                    <Node 
                        icon={orderLinks[3].icon}  
                        label={orderLinks[3].label}
                        path={orderLinks[3].path}
                    />

                    <Node 
                        icon={orderLinks[4].icon}  
                        label={orderLinks[4].label}
                        path={orderLinks[4].path}
                    />
                </div>
            </div>

            <div className="flex gap-5 mt-20">
                <Node 
                    icon={orderLinks[5].icon}  
                    label={orderLinks[5].label}
                    path={orderLinks[5].path}
                />

                <Node 
                    icon={orderLinks[6].icon}  
                    label={orderLinks[6].label}
                    path={orderLinks[6].path}
                />

                <Node 
                    icon={orderLinks[7].icon}  
                    label={orderLinks[7].label}
                    path={orderLinks[7].path}
                />

                <Node 
                    icon={orderLinks[8].icon}  
                    label={orderLinks[8].label}
                    path={orderLinks[8].path}
                />
            </div>
        </>
    )
}

export default OrdersDefault