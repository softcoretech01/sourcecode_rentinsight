import React from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentCollectionList() {
    const navigate = useNavigate();

    return (
        <div className="p-2 bg-slate-50 min-h-screen font-sans text-slate-900">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 space-y-4">
                    {/* Page Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-slate-800">Payment Collection - List</h1>
                    </div>

                    {/* Placeholder for future content */}
                    <div className="border border-dashed border-slate-300 rounded-lg h-96 flex flex-col items-center justify-center text-slate-400">
                        <p className="text-lg font-medium">Payment Collection List Content</p>
                        <p className="text-sm">This screen is currently blank and ready for implementation.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
