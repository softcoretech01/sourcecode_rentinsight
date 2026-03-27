import React, { useEffect, useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

export default function PreventiveMaintenanceEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [machineType, setMachineType] = useState("Boom Lift");
    const [machineNumber, setMachineNumber] = useState("");
    const [height, setHeight] = useState("");
    const [status, setStatus] = useState("Pending");
    const [engineerAssigned, setEngineerAssigned] = useState("");
    const [lastPreventiveDate, setLastPreventiveDate] = useState<Date>();
    const [dueDate, setDueDate] = useState<Date>();

    useEffect(() => {
        if (id) {
            // fill mocked data
            setMachineType("Boom Lift");
            setMachineNumber(`M00${id}`);
            setHeight("12m");
            setStatus("In Progress");
            setEngineerAssigned("Senior Engineer");
            setLastPreventiveDate(new Date(2025, 1, 1));
            setDueDate(new Date(2025, 1, 15));
        }
    }, [id]);

    return (
        <div className="p-3 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-100/30">
                    <h1 className="text-lg font-bold text-slate-800">Preventive Maintenance - Edit</h1>
                    <div className="flex gap-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8 px-4">Update</Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-4">Post</Button>
                        <Button size="sm" variant="outline" className="text-slate-600 border-slate-300 bg-white hover:bg-slate-50 h-8 w-8 p-0 rounded-md" onClick={() => navigate("/transaction/preventive-maintenance-plan")}> <ArrowLeft className="h-4 w-4" /> </Button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Machine Type</Label>
                            <div className="flex gap-4">
                                {['Boom Lift', 'Scissors'].map((type) => (
                                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            value={type}
                                            checked={machineType === type}
                                            onChange={(e) => setMachineType(e.target.value)}
                                            className="w-4 h-4 text-indigo-600"
                                        />
                                        <span className="text-sm text-slate-700">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Machine Number</Label>
                            <Input value={machineNumber} onChange={(e) => setMachineNumber(e.target.value)} placeholder="Enter machine number" className="h-10" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Height</Label>
                            <Input value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Enter height" className="h-10" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger className="h-10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Engineer Assigned</Label>
                            <Input value={engineerAssigned} onChange={(e) => setEngineerAssigned(e.target.value)} placeholder="Enter engineer name" className="h-10" />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Last Preventive Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={`w-full justify-start text-left font-normal bg-white border-slate-300 h-10 text-sm ${!lastPreventiveDate ? 'text-muted-foreground' : ''}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {lastPreventiveDate ? format(lastPreventiveDate, 'P') : 'Select date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={lastPreventiveDate} onSelect={setLastPreventiveDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Due Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className={`w-full justify-start text-left font-normal bg-white border-slate-300 h-10 text-sm ${!dueDate ? 'text-muted-foreground' : ''}`}>
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {dueDate ? format(dueDate, 'P') : 'Select date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
