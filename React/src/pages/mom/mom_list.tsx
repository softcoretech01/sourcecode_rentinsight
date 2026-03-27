import React, { useState } from "react";
import { Search, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface MomRow {
  id: string;
  meeting: string;
  status: string;
  remarks: string;
  continueNextWeek: boolean;
  isActive: boolean;
}

const initialData: MomRow[] = [
  { id: "1", meeting: "Weekly Standup", status: "Open", remarks: "Review last week and plan next week.", continueNextWeek: true, isActive: true },
  { id: "2", meeting: "Sprint Planning", status: "In Progress", remarks: "Define sprint backlog and tasks.", continueNextWeek: false, isActive: false },
  { id: "3", meeting: "Retrospective", status: "Completed", remarks: "Discuss wins, issues, and improvements.", continueNextWeek: true, isActive: true },
];

export default function MomList() {
    const navigate = useNavigate();
    const [selectedMeeting, setSelectedMeeting] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [appliedMeeting, setAppliedMeeting] = useState("");
    const [appliedStatus, setAppliedStatus] = useState("");
    const [rowStates, setRowStates] = useState<Record<string, boolean>>(
        initialData.reduce((acc, row) => ({ ...acc, [row.id]: row.isActive }), {})
    );

    const handleSearch = () => {
        setAppliedMeeting(selectedMeeting);
        setAppliedStatus(selectedStatus);
    };

    const handleCancel = () => {
        setSelectedMeeting("");
        setSelectedStatus("");
        setSearchKeyword("");
        setAppliedMeeting("");
        setAppliedStatus("");
    };

    const handleToggleActive = (id: string) => {
        setRowStates((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const filteredData = initialData.filter(row => {
        const matchesMeeting = appliedMeeting === "" || row.meeting === appliedMeeting;
        const matchesStatus = appliedStatus === "" || row.status === appliedStatus;
        const matchesGlobal = searchKeyword === "" ||
            row.meeting.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            row.status.toLowerCase().includes(searchKeyword.toLowerCase()) ||
            row.remarks.toLowerCase().includes(searchKeyword.toLowerCase());

        return matchesMeeting && matchesStatus && matchesGlobal;
    });

    return (
        <div className="p-2 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between pb-2">
                        <h1 className="text-xl font-bold text-slate-800">Minute of meeting - List</h1>
                    </div>

                    <div className="space-y-1">
                        <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap gap-2 items-center">
                            <span className="text-sm font-semibold text-slate-600 mr-2">Search</span>

                            <div className="w-[200px]">
                                <Select value={selectedMeeting} onValueChange={(val) => setSelectedMeeting(val === "all" ? "" : val)}>
                                    <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                                        <SelectValue placeholder="Meeting" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Meetings</SelectItem>
                                        {Array.from(new Set(initialData.map((item) => item.meeting))).map((meeting) => (
                                            <SelectItem key={meeting} value={meeting}>{meeting}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="w-[200px]">
                                <Select value={selectedStatus} onValueChange={(val) => setSelectedStatus(val === "all" ? "" : val)}>
                                    <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        {Array.from(new Set(initialData.map((item) => item.status))).map((status) => (
                                            <SelectItem key={status} value={status}>{status}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1"></div>

                            <Button size="sm" className="h-9 text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4" onClick={handleSearch}>
                                Search
                            </Button>
                            <Button size="sm" className="h-9 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4" onClick={() => navigate("/transaction/mom/add")}>
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

                    <div className="space-y-2">
                        <div className="flex justify-between items-center bg-primary/5 p-2 rounded-t-lg border-b border-primary/10 h-10">
                            <h2 className="text-sm font-semibold text-primary pl-2">Minute of Meeting Data</h2>
                            <div className="flex items-center gap-4">
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
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Meeting</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Status</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Remarks</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Next Week</TableHead>
                                        <TableHead className="py-2 h-10 font-semibold text-white text-center whitespace-nowrap w-24">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredData.length > 0 ? (
                                        filteredData.map((row) => (
                                            <TableRow key={row.id} className="hover:bg-slate-50 bg-white">
                                                <TableCell className="py-2 text-sm">{row.meeting}</TableCell>
                                                <TableCell className="py-2 text-sm">
                                                    <Badge className={cn(
                                                        "font-bold px-2 py-1 rounded-full text-xs",
                                                        row.status === "Completed" ? "bg-emerald-600 text-white" : row.status === "In Progress" ? "bg-amber-500 text-white" : row.status === "Open" ? "bg-sky-500 text-white" : "bg-slate-400 text-white"
                                                    )}>
                                                        {row.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-2 text-sm text-slate-700 text-xs">{row.remarks}</TableCell>
                                                <TableCell className="py-2 text-sm">{row.continueNextWeek ? "Yes" : "No"}</TableCell>
                                                <TableCell className="py-2 text-center">
                                                    <div className="flex justify-center gap-3 items-center">
                                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10" onClick={() => navigate(`/transaction/mom/edit/${row.id}`)}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Switch
                                                            checked={rowStates[row.id]}
                                                            onCheckedChange={() => handleToggleActive(row.id)}
                                                            className={cn(
                                                                "transition-colors",
                                                                "data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-red-600"
                                                            )}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center py-4 text-slate-500">
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
