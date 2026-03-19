import { purchasesLinks } from "../../routes/purchaseLinks"

import Node from "../components/Node"

function PurchasesDefault() {
    return(
        <>
            <h1 className="text-2xl text-text mb-5">Purchases</h1>

            <div className="flex items-center gap-5">
                <Node 
                    icon={purchasesLinks[0].icon}
                    label={purchasesLinks[0].label}
                    path={purchasesLinks[0].path}
                />

                <Node 
                    icon={purchasesLinks[1].icon}
                    label={purchasesLinks[1].label}
                    path={purchasesLinks[1].path}
                />

                <Node 
                    icon={purchasesLinks[2].icon}
                    label={purchasesLinks[2].label}
                    path={purchasesLinks[2].path}
                />
                
                <div className="flex flex-col gap-5">
                    <Node 
                        icon={purchasesLinks[3].icon}
                        label={purchasesLinks[3].label}
                        path={purchasesLinks[3].path}
                    />

                    <Node 
                        icon={purchasesLinks[4].icon}
                        label={purchasesLinks[4].label}
                        path={purchasesLinks[4].path}
                    />
                </div>
            </div>

            <div className="flex gap-5 mt-20">
                    <Node 
                    icon={purchasesLinks[5].icon}
                    label={purchasesLinks[5].label}
                    path={purchasesLinks[5].path}
                    />

                    <Node 
                        icon={purchasesLinks[6].icon}
                        label={purchasesLinks[6].label}
                        path={purchasesLinks[6].path}
                    />

                    <Node 
                        icon={purchasesLinks[7].icon}
                        label={purchasesLinks[7].label}
                        path={purchasesLinks[7].path}
                    />

                    <Node 
                        icon={purchasesLinks[8].icon}
                        label={purchasesLinks[8].label}
                        path={purchasesLinks[8].path}
                    />
            </div>
        </>
    )
}

export default PurchasesDefault