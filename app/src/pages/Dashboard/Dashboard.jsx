import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";

function Dashboard() {
    return (
        <div className="flex space-x-2">
            <main className="ml-5 mt-20">
                <h1 className="text-2xl text-text">Dashboard</h1>
            </main>
        </div>
    )
}

export default Dashboard