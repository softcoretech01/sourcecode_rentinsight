import React, { useState } from "react";
import { Search, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock Data for Departments
const masterData = [
    { id: "1", deptName: "IT", responsibilities: "Information Technology and Infrastructure", status: "Saved", isActive: true },
    { id: "2", deptName: "HR", responsibilities: "Human Resources and Administration", status: "Posted", isActive: false },
    { id: "3", deptName: "Finance", responsibilities: "Financial Planning and Reporting", status: "Saved", isActive: true },
];

export default function DepartmentList() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchDept, setSearchDept] = useState("");
    const [appliedDept, setAppliedDept] = useState("");
    const [wmNumberSearch, setWmNumberSearch] = useState("");
    const [operatorSearch, setOperatorSearch] = useState("");
    const [regionSearch, setRegionSearch] = useState("");
    const [wmStates, setWmStates] = useState<Record<string, boolean>>(
        masterData.reduce((acc, dept) => ({ ...acc, [dept.id]: dept.isActive }), {})
    );
    const [deptStates, setDeptStates] = useState<Record<string, boolean>>(
        masterData.reduce((acc, dept) => ({ ...acc, [dept.id]: dept.isActive }), {})
    );

    const handleToggleActive = (id: string) => {
        setWmStates(prev => ({ ...prev, [id]: !prev[id] }));
        setDeptStates(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSearch = () => {
        setAppliedDept(searchDept);
    };

    const handleCancel = () => {
        setSearchDept("");
        setAppliedDept("");
        setWmNumberSearch("");
        setOperatorSearch("");
        setRegionSearch("");
        setSearchTerm("");
    };

    const filteredData = masterData.filter(row => {
        const matchesDept = appliedDept === "" || row.deptName === appliedDept;
        const matchesTerm = searchTerm === "" || 
            row.deptName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.responsibilities.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesDept && matchesTerm;
    });

    return (
        <div className="p-2 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-3 space-y-2">
                    {/* Page Title */}
                    <div className="flex items-center justify-between pb-2">
                        <h1 className="text-xl font-bold text-slate-800">Master Department - List</h1>
                    </div>

                    <div className="space-y-1">
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap gap-2 items-center">
                            <span className="text-sm font-semibold text-slate-600 mr-2">Search</span>

                            <div className="w-[200px]">
                                <Select value={searchDept} onValueChange={(val) => setSearchDept(val === "all" ? "" : val)}>
                                    <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                                        <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Departments</SelectItem>
                                        {Array.from(new Set(masterData.map(item => item.deptName))).map(dept => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1"></div>

                            <Button size="sm" className="h-9 text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4" onClick={handleSearch}>
                                Search
                            </Button>
                            <Button size="sm" className="h-9 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4" onClick={() => navigate("/master/department/add")}>
                                + New
                            </Button>
                            <Button size="sm" className="h-9 text-sm bg-[#DAA520] hover:bg-[#B8860B] text-white px-4">
                                Export Excel
                            </Button>
                            <Button size="sm" className="h-9 text-sm bg-red-600 hover:bg-red-700 text-white px-4" onClick={handleCancel}>
                                Reset
                            </Button>
                        </div>
                    </div>

                    {/* List Table Section */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center bg-primary/5 p-2 rounded-t-lg border-b border-primary/10 h-10">
                            <h2 className="text-sm font-semibold text-primary pl-2">Department Master Data</h2>

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
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="border border-slate-200 rounded-b-lg overflow-hidden mt-0">
                            <Table>
                                <TableHeader className="bg-sidebar">
                                    <TableRow>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Dept ID</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Department Name</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Responsibilities</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Status</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white text-center whitespace-nowrap">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row, index) => (
                                            <TableRow key={index} className="hover:bg-slate-50 bg-white">
                                                <TableCell className="py-2 text-slate-600 font-medium text-sm">{row.id}</TableCell>
                                                <TableCell className="py-2 text-slate-600 text-sm">{row.deptName}</TableCell>
                                                <TableCell className="py-2 text-slate-600 text-sm">{row.responsibilities}</TableCell>
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
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10" onClick={() => navigate(`/master/department/edit/${row.id}`)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <div className="flex items-center gap-2">
                                                            <Switch
                                                                checked={deptStates[row.id]}
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
