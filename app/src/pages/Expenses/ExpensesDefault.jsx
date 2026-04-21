import { expensesLinks } from "../../routes/expensesLinks.js"

import Node from "../components/Node"

function ExpensesDefault() {
    return(
        <>
            <h1 className="text-2xl text-text mb-5">Expenses</h1>

            <div className="flex items-center gap-5">
                <Node 
                    icon={expensesLinks[0].icon}
                    label={expensesLinks[0].label}
                    path={expensesLinks[0].path}
                />

                <Node 
                    icon={expensesLinks[1].icon}
                    label={expensesLinks[1].label}
                    path={expensesLinks[1].path}
                />

                <Node 
                    icon={expensesLinks[2].icon}
                    label={expensesLinks[2].label}
                    path={expensesLinks[2].path}
                />
            </div>

            <div className="flex gap-5 mt-20">
                <Node 
                    icon={expensesLinks[3].icon}
                    label={expensesLinks[3].label}
                    path={expensesLinks[3].path}
                />
            </div>
        </>
    )
}

export default ExpensesDefault