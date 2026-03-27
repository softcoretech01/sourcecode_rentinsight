import React, { useState } from "react";
import { Search, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

// Mock Data
const meetingsData = [
    { 
        id: "1", 
        dateScheduled: "25-03-2026", 
        department: "IT", 
        participants: "John Doe, Jane Smith", 
        pointsToDiscuss: "Equipment maintenance schedules", 
        machineNumber: "M001", 
        actionItem: "Schedule preventive maintenance", 
        responsibility: "John Doe", 
        targetDate: "30-03-2026", 
        status: "Saved", 
        isActive: true 
    },
    { 
        id: "2", 
        dateScheduled: "26-03-2026", 
        department: "Finance", 
        participants: "Mike Johnson, Sarah Williams", 
        pointsToDiscuss: "Budget review for maintenance", 
        machineNumber: "M002", 
        actionItem: "Review maintenance budget", 
        responsibility: "Mike Johnson", 
        targetDate: "02-04-2026", 
        status: "Posted", 
        isActive: false 
    },
    { 
        id: "3", 
        dateScheduled: "27-03-2026", 
        department: "HR", 
        participants: "Robert Brown", 
        pointsToDiscuss: "Staff training on equipment", 
        machineNumber: "M003", 
        actionItem: "Organize training session", 
        responsibility: "Robert Brown", 
        targetDate: "05-04-2026", 
        status: "Saved", 
        isActive: true 
    },
];

export default function MaintenanceMeetingList() {
    const navigate = useNavigate();
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [appliedDepartment, setAppliedDepartment] = useState("");
    const [meetingStates, setMeetingStates] = useState<Record<string, boolean>>(
        meetingsData.reduce((acc, meeting) => ({ ...acc, [meeting.id]: meeting.isActive }), {})
    );

    const handleSearch = () => {
        setAppliedDepartment(selectedDepartment);
    };

    const handleCancel = () => {
        setSelectedDepartment("");
        setSearchKeyword("");
        setAppliedDepartment("");
    };

    const handleToggleActive = (id: string) => {
        setMeetingStates(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredData = meetingsData.filter(row => {
        const matchesDept = appliedDepartment === "" || row.department === appliedDepartment;
        const matchesGlobal = searchKeyword === "" ||
            Object.values(row).some(val => String(val).toLowerCase().includes(searchKeyword.toLowerCase()));

        return matchesDept && matchesGlobal;
    });

    const departments = ["IT", "HR", "Finance", "Operations", "Sales", "Marketing"];

    return (
        <div className="p-2 bg-slate-50 min-h-screen font-sans">
            <div className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-3 space-y-2">
                    {/* Page Title */}
                    <div className="flex items-center justify-between pb-2">
                        <h1 className="text-xl font-bold text-slate-800">Maintenance Meeting - List</h1>
                    </div>

                    <div className="space-y-1">
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap gap-2 items-center">
                            <span className="text-sm font-semibold text-slate-600 mr-2">Search</span>

                            <div className="w-[200px]">
                                <Select value={selectedDepartment} onValueChange={(val) => setSelectedDepartment(val === "all" ? "" : val)}>
                                    <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                                        <SelectValue placeholder="Select Department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Departments</SelectItem>
                                        {departments.map(dept => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1"></div>

                            <Button size="sm" className="h-9 text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4" onClick={handleSearch}>
                                Search
                            </Button>
                            <Button size="sm" className="h-9 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4" onClick={() => navigate("/transaction/maintenance-meetings/add")}>
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

                    {/* Meetings List Header with Legend */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center bg-primary/5 p-2 rounded-t-lg border-b border-primary/10 h-10">
                            <div className="flex items-center gap-4 pl-2">
                                <h2 className="text-sm font-semibold text-primary">Maintenance Meeting Data</h2>
                            </div>

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

                        <div className="border border-slate-200 rounded-b-lg overflow-x-auto mt-0">
                            <Table>
                                <TableHeader className="bg-sidebar">
                                    <TableRow>
                                        <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Date Scheduled</TableHead>
                                        <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Department</TableHead>
                                        <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Participants</TableHead>
                                        <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Action Item</TableHead>
                                        <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Status</TableHead>
                                        <TableHead className="font-semibold text-white text-center h-10 whitespace-nowrap">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row, index) => (
                                            <TableRow key={index} className="hover:bg-slate-50 bg-white">
                                                <TableCell className="py-2 text-sm">{row.dateScheduled}</TableCell>
                                                <TableCell className="py-2 text-sm">{row.department}</TableCell>
                                                <TableCell className="py-2 text-sm text-xs">{row.participants}</TableCell>
                                                <TableCell className="py-2 text-sm max-w-[180px] truncate" title={row.actionItem}>{row.actionItem}</TableCell>
                                                <TableCell className="py-2">
                                                    <Badge
                                                        className={cn(
                                                            "font-bold w-6 h-6 rounded flex items-center justify-center p-0 border-none",
                                                            row.status === "Saved" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white"
                                                        )}
                                                    >
                                                        {row.status === "Saved" ? "S" : "P"}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-2 text-center">
                                                    <div className="flex justify-center gap-4 items-center">
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10" onClick={() => navigate(`/transaction/maintenance-meetings/edit/${row.id}`)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <div className="flex items-center gap-2">
                                                            <Switch
                                                                checked={meetingStates[row.id]}
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
