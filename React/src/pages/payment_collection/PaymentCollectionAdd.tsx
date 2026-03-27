import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const departments = ["IT", "HR", "Finance", "Operations", "Sales", "Marketing"];
const roles = ["Admin", "Manager", "Supervisor", "User", "Guest"];

export default function UsersAdd() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [department, setDepartment] = useState("");
    const [isHOD, setIsHOD] = useState(false);
    const [roleName, setRoleName] = useState("");

    return (
        <div className="p-3 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-100/30">
                    <h1 className="text-lg font-bold text-slate-800">
                        Master Users - Add
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
                            onClick={() => navigate("/master/users")}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">User Name</Label>
                            <Input
                                placeholder="Enter user name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="bg-white border-slate-300 h-10 text-sm"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Department</Label>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger className="bg-white border-slate-300 h-10 text-sm">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(dept => (
                                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-md p-3 h-10">
                                <Checkbox
                                    id="isHOD"
                                    checked={isHOD}
                                    onCheckedChange={(checked) => setIsHOD(checked as boolean)}
                                />
                                <Label htmlFor="isHOD" className="text-sm font-normal cursor-pointer">Is HOD</Label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Role Name</Label>
                            <Select value={roleName} onValueChange={setRoleName}>
                                <SelectTrigger className="bg-white border-slate-300 h-10 text-sm">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {roles.map(role => (
                                        <SelectItem key={role} value={role}>{role}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
