import React, { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const departments = ["IT", "HR", "Finance", "Operations", "Sales", "Marketing"];
const machineNumbers = ["M001", "M002", "M003", "M004", "M005"];
const tasks = ["Clean-up", "Inspection", "Repair", "Calibration", "Preventive Maintenance"];
const responsibilities = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Robert Brown"];
const assignedTo = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Robert Brown"];

export default function WeeklyPlanEdit() {
    const navigate = useNavigate();
    const [dateScheduled, setDateScheduled] = useState<Date>(new Date());
    const [department, setDepartment] = useState("Operations");
    const [machineNumber, setMachineNumber] = useState("M002");
    const [task, setTask] = useState("Inspection");
    const [responsibility, setResponsibility] = useState("Jane Smith");
    const [assignedToUser, setAssignedToUser] = useState("Mike Johnson");
    const [targetDate, setTargetDate] = useState<Date>(new Date());

    return (
        <div className="p-3 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-100/30">
                    <h1 className="text-lg font-bold text-slate-800">Weekly Plan - Edit</h1>
                    <div className="flex gap-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8 px-4 rounded-md">Save</Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-4 rounded-md">Post</Button>
                        <Button size="sm" variant="outline" className="text-slate-600 border-slate-300 bg-white hover:bg-slate-50 h-8 w-8 p-0 rounded-md" onClick={() => navigate("/transaction/weekly-plan")}> <ArrowLeft className="h-4 w-4" /> </Button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Date Scheduled</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={`w-full justify-start text-left font-normal bg-white border-slate-300 h-10 text-sm ${!dateScheduled ? "text-muted-foreground" : ""}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dateScheduled ? format(dateScheduled, "P") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={dateScheduled} onSelect={setDateScheduled} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Department</Label>
                            <Select value={department} onValueChange={setDepartment}>
                                <SelectTrigger className="bg-white border-slate-300 h-10 text-sm">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Machine Number</Label>
                            <Select value={machineNumber} onValueChange={setMachineNumber}>
                                <SelectTrigger className="bg-white border-slate-300 h-10 text-sm">
                                    <SelectValue placeholder="Select machine" />
                                </SelectTrigger>
                                <SelectContent>
                                    {machineNumbers.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Task</Label>
                            <Select value={task} onValueChange={setTask}>
                                <SelectTrigger className="bg-white border-slate-300 h-10 text-sm">
                                    <SelectValue placeholder="Select task" />
                                </SelectTrigger>
                                <SelectContent>
                                    {tasks.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Responsibility</Label>
                            <Select value={responsibility} onValueChange={setResponsibility}>
                                <SelectTrigger className="bg-white border-slate-300 h-10 text-sm">
                                    <SelectValue placeholder="Select responsibility" />
                                </SelectTrigger>
                                <SelectContent>
                                    {responsibilities.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Assigned To</Label>
                            <Select value={assignedToUser} onValueChange={setAssignedToUser}>
                                <SelectTrigger className="bg-white border-slate-300 h-10 text-sm">
                                    <SelectValue placeholder="Select assignee" />
                                </SelectTrigger>
                                <SelectContent>
                                    {assignedTo.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Target Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={`w-full justify-start text-left font-normal bg-white border-slate-300 h-10 text-sm ${!targetDate ? "text-muted-foreground" : ""}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {targetDate ? format(targetDate, "P") : "Select date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={targetDate} onSelect={setTargetDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
