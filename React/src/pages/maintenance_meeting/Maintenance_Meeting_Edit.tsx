import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const departments = ["IT", "HR", "Finance", "Operations", "Sales", "Marketing"];
const participantsList = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Robert Brown"];
const machineNumbers = ["M001", "M002", "M003", "M004", "M005"];
const responsibilities = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Williams", "Robert Brown"];

export default function MaintenanceMeetingEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [dateScheduled, setDateScheduled] = useState<Date>(new Date(2026, 2, 25));
    const [department, setDepartment] = useState("IT");
    const [selectedParticipants, setSelectedParticipants] = useState<string[]>(["John Doe", "Jane Smith"]);
    const [pointsToDiscuss, setPointsToDiscuss] = useState("Discuss maintenance schedules and equipment status");
    const [machineNumber, setMachineNumber] = useState("M001");
    const [actionItem, setActionItem] = useState("Schedule preventive maintenance");
    const [responsibility, setResponsibility] = useState("John Doe");
    const [targetDate, setTargetDate] = useState<Date>(new Date(2026, 2, 30));

    const handleParticipantChange = (participant: string) => {
        setSelectedParticipants(prev =>
            prev.includes(participant)
                ? prev.filter(p => p !== participant)
                : [...prev, participant]
        );
    };

    // Mock pre-fill to verify logic, normally fetch by ID
    useEffect(() => {
        if (id) {
            // Simulate fetching data by ID
        }
    }, [id]);

    return (
        <div className="p-3 bg-slate-50 min-h-screen font-sans">
            <div className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h1 className="text-lg font-semibold text-indigo-700">
                        Maintenance Meeting - Update
                    </h1>
                    <div className="flex gap-2">
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white h-8 px-4">
                            Update
                        </Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 px-4">
                            Post
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            className="text-slate-600 border-slate-300 bg-white hover:bg-slate-50 h-8 w-8 p-0"
                            onClick={() => navigate("/transaction/maintenance-meetings")}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="space-y-6 px-4 pt-2">
                        {/* Form Fields - Row 1: Date Scheduled, Department */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Date Scheduled</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal bg-white border-slate-300 h-9 text-xs",
                                                !dateScheduled && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-3 w-3" />
                                            {dateScheduled ? format(dateScheduled, "P") : <span className="text-xs">dd-mm-yyyy</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={dateScheduled}
                                            onSelect={setDateScheduled}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Department</Label>
                                <Select value={department} onValueChange={setDepartment}>
                                    <SelectTrigger className="bg-white border-slate-300 h-9 text-xs">
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {departments.map(dept => (
                                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Form Fields - Row 2: Participants */}
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-slate-700">Participants</Label>
                            <div className="bg-white border border-slate-300 rounded-md p-3">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {participantsList.map(participant => (
                                        <div key={participant} className="flex items-center gap-2">
                                            <Checkbox
                                                id={participant}
                                                checked={selectedParticipants.includes(participant)}
                                                onCheckedChange={() => handleParticipantChange(participant)}
                                            />
                                            <Label htmlFor={participant} className="text-sm font-normal cursor-pointer">{participant}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Form Fields - Row 3: Points to be discussed */}
                        <div className="space-y-1.5">
                            <Label className="text-sm font-semibold text-slate-700">Points to be discussed</Label>
                            <Textarea
                                placeholder="Enter points to be discussed"
                                value={pointsToDiscuss}
                                onChange={(e) => setPointsToDiscuss(e.target.value)}
                                className="bg-white border-slate-300 min-h-[80px] text-xs"
                            />
                        </div>

                        {/* Form Fields - Row 4: Machine Number, Action Item */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Machine Number</Label>
                                <Select value={machineNumber} onValueChange={setMachineNumber}>
                                    <SelectTrigger className="bg-white border-slate-300 h-9 text-xs">
                                        <SelectValue placeholder="Select machine number" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {machineNumbers.map(machine => (
                                            <SelectItem key={machine} value={machine}>{machine}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Action Item</Label>
                                <Input
                                    placeholder="Enter action item"
                                    value={actionItem}
                                    onChange={(e) => setActionItem(e.target.value)}
                                    className="bg-white border-slate-300 h-9 text-xs"
                                />
                            </div>
                        </div>

                        {/* Form Fields - Row 5: Responsibility, Target Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Responsibility</Label>
                                <Select value={responsibility} onValueChange={setResponsibility}>
                                    <SelectTrigger className="bg-white border-slate-300 h-9 text-xs">
                                        <SelectValue placeholder="Select responsibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {responsibilities.map(resp => (
                                            <SelectItem key={resp} value={resp}>{resp}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Target Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal bg-white border-slate-300 h-9 text-xs",
                                                !targetDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-3 w-3" />
                                            {targetDate ? format(targetDate, "P") : <span className="text-xs">dd-mm-yyyy</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={targetDate}
                                            onSelect={setTargetDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
