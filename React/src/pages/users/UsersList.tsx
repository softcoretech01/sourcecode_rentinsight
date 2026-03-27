import React, { useState } from "react";
import { Search, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Data for Users
const userData = [
    { id: 1, userName: "John Doe", department: "IT", isHOD: true, roleName: "Admin", status: "Saved", isActive: true },
    { id: 2, userName: "Jane Smith", department: "HR", isHOD: false, roleName: "Manager", status: "Posted", isActive: false },
    { id: 3, userName: "Mike Johnson", department: "Finance", isHOD: true, roleName: "Supervisor", status: "Saved", isActive: true },
];

export default function UsersList() {
    const navigate = useNavigate();
    const [searchUser, setSearchUser] = useState("");
    const [searchDept, setSearchDept] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [appliedUser, setAppliedUser] = useState("");
    const [appliedDept, setAppliedDept] = useState("");
    const [userStates, setUserStates] = useState<Record<number, boolean>>(
        userData.reduce((acc, user) => ({ ...acc, [user.id]: user.isActive }), {})
    );

    const handleToggleActive = (id: number) => {
        setUserStates(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSearch = () => {
        setAppliedUser(searchUser);
        setAppliedDept(searchDept);
    };

    const handleCancel = () => {
        setSearchUser("");
        setSearchDept("");
        setSearchKeyword("");
        setAppliedUser("");
        setAppliedDept("");
    };

    const filteredData = userData.filter(row => {
        const matchesUser = row.userName.toLowerCase().includes(appliedUser.toLowerCase());
        const matchesDept = appliedDept === "" || row.department.toLowerCase().includes(appliedDept.toLowerCase());
        const matchesGlobal = searchKeyword === "" ||
            Object.values(row).some(val => String(val).toLowerCase().includes(searchKeyword.toLowerCase()));

        return matchesUser && matchesDept && matchesGlobal;
    });

    return (
        <div className="p-2 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-3 space-y-2">
                    {/* Page Title */}
                    <div className="flex items-center justify-between pb-2">
                        <h1 className="text-xl font-bold text-slate-800">Master Users - List</h1>
                    </div>

                    <div className="space-y-1">
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap gap-2 items-center">
                            <span className="text-sm font-semibold text-slate-600 mr-2">Search</span>

                            <div className="w-[150px]">
                                <Select value={searchUser} onValueChange={(val) => setSearchUser(val === "all" ? "" : val)}>
                                    <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                                        <SelectValue placeholder="Select User" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Users</SelectItem>
                                        {Array.from(new Set(userData.map(item => item.userName))).map(user => (
                                            <SelectItem key={user} value={user}>{user}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-[150px]">
                                <Select value={searchDept} onValueChange={(val) => setSearchDept(val === "all" ? "" : val)}>
                                    <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                                        <SelectValue placeholder="Select Dept" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Departments</SelectItem>
                                        {Array.from(new Set(userData.map(item => item.department))).map(dept => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1"></div>

                            <Button size="sm" className="h-9 text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4" onClick={handleSearch}>
                                Search
                            </Button>
                            <Button size="sm" className="h-9 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4" onClick={() => navigate("/master/users/add")}>
                                + New
                            </Button>
                            <Button size="sm" className="h-9 text-sm bg-[#DAA520] hover:bg-[#B8860B] text-white px-4">
                                Export Excel
                            </Button>
                            <Button size="sm" className="h-9 text-sm bg-red-600 hover:bg-red-700 text-white px-4" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </div>
                    </div>

                    {/* List Table Section */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center bg-primary/5 p-2 rounded-t-lg border-b border-primary/10 h-10">
                            <h2 className="text-sm font-semibold text-primary pl-2">Users Master Data</h2>


                            <div className="flex items-center gap-4">
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center gap-1.5">
                                        <Badge className="bg-red-600 hover:bg-red-700 text-white font-bold w-6 h-6 text-[10px] rounded flex items-center justify-center p-0 shadow-sm border-none">S</Badge>
                                        <span className="text-xs font-medium text-slate-600">Saved</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold w-6 h-6 text-[10px] rounded flex items-center justify-center p-0 shadow-sm border-none">P</Badge>
                                        <span className="text-xs font-medium text-slate-600">Posted</span>
                                    </div>
                                </div>

                                <div className="relative w-64">
                                    <Search className="absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
                                    <Input
                                        placeholder="Keyword search..."
                                        className="bg-white border-slate-300 pr-8 h-9 text-sm"
                                        value={searchKeyword}
                                        onChange={(e) => setSearchKeyword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border border-slate-200 rounded-b-lg overflow-hidden mt-0">
                            <Table>
                                <TableHeader className="bg-sidebar">
                                    <TableRow>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">User Name</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Department</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">HOD</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Role Name</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Status</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white text-center whitespace-nowrap w-24">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row) => (
                                            <TableRow key={row.id} className="hover:bg-slate-50 bg-white">
                                                <TableCell className="py-2 text-slate-600 font-medium text-sm">{row.userName}</TableCell>
                                                <TableCell className="py-2 text-slate-600 font-medium text-sm">{row.department}</TableCell>
                                                <TableCell className="py-2">
                                                    <Badge
                                                        className={cn(
                                                            "font-bold px-2 py-0.5 rounded text-xs border-none",
                                                            row.isHOD ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                                                        )}
                                                    >
                                                        {row.isHOD ? "Yes" : "No"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-2 text-slate-600 font-medium text-sm">{row.roleName}</TableCell>
                                                <TableCell className="py-2">
                                                    <Badge
                                                        className={cn(
                                                            "font-bold w-6 h-6 rounded flex items-center justify-center p-0 border-none",
                                                            row.status === "Posted" ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"
                                                        )}
                                                    >
                                                        {row.status === "Posted" ? "P" : "S"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-2 text-center">
                                                    <div className="flex justify-center gap-4 items-center">
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10" onClick={() => navigate(`/master/users/edit/${row.id}`)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <div className="flex items-center gap-2">
                                                            <Switch
                                                                checked={userStates[row.id]}
                                                                onCheckedChange={() => handleToggleActive(row.id)}
                                                                className={cn(
                                                                    "transition-colors",
                                                                    "data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
                                                                )}
                                                            />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-4 text-slate-500">
                                                No records found
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
