import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function RolesAdd() {
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState("");
    const [responsibilities, setResponsibilities] = useState("");

    return (
        <div className="p-3 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-100/30">
                    <h1 className="text-lg font-bold text-slate-800">
                        Master Roles - Add
                    </h1>
                    <div className="flex gap-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8 px-4 rounded-md transition-all shadow-sm">
                            Save
                        </Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-4 rounded-md transition-all shadow-sm">
                            Post
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-slate-600 border-slate-300 bg-white hover:bg-slate-50 h-8 w-8 p-0 rounded-md transition-all"
                            onClick={() => navigate("/master/roles")}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Role Name</Label>
                            <Input
                                placeholder="Enter role name"
                                value={roleName}
                                onChange={(e) => setRoleName(e.target.value)}
                                className="bg-white border-slate-300 h-10 text-sm"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Responsibilities</Label>
                            <Textarea
                                placeholder="Enter responsibilities"
                                value={responsibilities}
                                onChange={(e) => setResponsibilities(e.target.value)}
                                className="bg-white border-slate-300 text-sm min-h-24"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
