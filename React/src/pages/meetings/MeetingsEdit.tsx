import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, startOfMonth, startOfYear, eachDayOfInterval, eachWeekOfInterval, getDaysInMonth, getMonth, getYear } from "date-fns";
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

// Calendar View Components
const DailyCalendarView = ({ date }: { date: Date }) => {
    const hours = Array.from({ length: 17 }, (_, i) => i + 7);
    
    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-100 p-4 text-center font-semibold text-slate-800">
                {format(date, "EEEE, MMMM d, yyyy")}
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
                {hours.map((hour) => (
                    <div key={hour} className="flex">
                        <div className="w-16 text-sm font-medium text-slate-500 bg-slate-50 p-2 border-r text-right">
                            {hour}:00
                        </div>
                        <div className="flex-1 p-2 hover:bg-blue-50 cursor-pointer"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const WeeklyCalendarView = ({ date }: { date: Date }) => {
    const start = startOfWeek(date);
    const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const hours = Array.from({ length: 17 }, (_, i) => i + 7);

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <div className="grid grid-cols-8 bg-slate-100 border-b">
                <div className="p-2 text-xs font-semibold text-slate-600 bg-slate-50"></div>
                {days.map((d, idx) => (
                    <div key={idx} className="p-2 text-center">
                        <div className="text-xs font-semibold text-slate-800">{dayNames[idx]}</div>
                        <div className={cn(
                            "text-sm font-bold",
                            format(d, "M/d") === format(new Date(), "M/d") ? "text-blue-600" : "text-slate-600"
                        )}>
                            {format(d, "d")}
                        </div>
                    </div>
                ))}
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
                {hours.map((hour) => (
                    <div key={hour} className="grid grid-cols-8 border-b divide-x">
                        <div className="w-16 text-xs font-medium text-slate-500 bg-slate-50 p-2 text-right">
                            {hour}:00
                        </div>
                        {days.map((_, idx) => (
                            <div key={idx} className="p-2 hover:bg-blue-50 cursor-pointer"></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const MonthlyCalendarView = ({ date }: { date: Date }) => {
    const month = getMonth(date);
    const year = getYear(date);
    const daysInMonth = getDaysInMonth(date);
    const firstDay = startOfMonth(date);
    const startDay = firstDay.getDay();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const days = Array.from({ length: startDay }, () => null).concat(
        Array.from({ length: daysInMonth }, (_, i) => i + 1)
    );

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-100 p-3 text-center font-semibold text-slate-800">
                {format(date, "MMMM yyyy")}
            </div>
            <div className="p-4">
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map((day) => (
                        <div key={day} className="text-center text-sm font-semibold text-slate-600 py-2">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                    {days.map((day, idx) => (
                        <div
                            key={idx}
                            className={cn(
                                "w-full aspect-square flex items-center justify-center rounded text-sm font-medium cursor-pointer transition-colors",
                                day === null ? "bg-transparent" : "border border-slate-300 hover:bg-blue-100 bg-white"
                            )}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const YearlyCalendarView = ({ date }: { date: Date }) => {
    const year = getYear(date);
    const months = Array.from({ length: 12 }, (_, i) => i);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
            <div className="bg-slate-100 p-3 text-center font-semibold text-slate-800 border-b">
                {year}
            </div>
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {months.map((monthIdx) => {
                    const monthDate = new Date(year, monthIdx, 1);
                    const daysInMonth = getDaysInMonth(monthDate);
                    const firstDay = startOfMonth(monthDate);
                    const startDay = firstDay.getDay();
                    const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
                    
                    const days = Array.from({ length: startDay }, () => null).concat(
                        Array.from({ length: daysInMonth }, (_, i) => i + 1)
                    );

                    return (
                        <div key={monthIdx} className="border border-slate-300 rounded p-2">
                            <div className="text-xs font-semibold text-slate-700 text-center mb-1">
                                {monthNames[monthIdx]}
                            </div>
                            <div className="grid grid-cols-7 gap-0.5">
                                {dayNames.map((day, idx) => (
                                    <div key={`day-${idx}`} className="text-center text-xs font-bold text-slate-500">
                                        {day}
                                    </div>
                                ))}
                                {days.map((day, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "text-center text-xs p-0.5 rounded cursor-pointer",
                                            day === null ? "bg-transparent" : "hover:bg-blue-100 border border-slate-200"
                                        )}
                                    >
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default function MeetingsEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [meetingName, setMeetingName] = useState("Team Sync");
    const [meetingDate, setMeetingDate] = useState<Date>(new Date(2026, 2, 25));
    const [department, setDepartment] = useState("IT");
    const [selectedParticipants, setSelectedParticipants] = useState<string[]>(["John Doe", "Jane Smith"]);
    const [isRecurrence, setIsRecurrence] = useState(true);
    const [recurrenceType, setRecurrenceType] = useState("weekly");
    const [calendarDate, setCalendarDate] = useState(new Date());

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
                        Meetings Master - Update
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
                            onClick={() => navigate("/master/meetings")}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="space-y-6 px-4 pt-2">
                        {/* Form Fields - Row 1: Meeting Name, Date, Department */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Meeting Name</Label>
                                <Input
                                    placeholder="Enter meeting name"
                                    value={meetingName}
                                    onChange={(e) => setMeetingName(e.target.value)}
                                    className="bg-white border-slate-300 h-9 text-xs"
                                />
                            </div>


                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Meeting Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal bg-white border-slate-300 h-9 text-xs",
                                                !meetingDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-3 w-3" />
                                            {meetingDate ? format(meetingDate, "P") : <span className="text-xs">dd-mm-yyyy</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={meetingDate}
                                            onSelect={setMeetingDate}
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

                        {/* Form Fields - Row 2: Participants, Is Recurrence, Recurrence Type */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
                            <div className="space-y-2">
                                <Label className="text-sm font-semibold text-slate-700">Participants</Label>
                                <div className="bg-white border border-slate-300 rounded-md p-3 space-y-2 max-h-32 overflow-y-auto">
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

                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Is Recurrence</Label>
                                <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-md p-3">
                                    <Checkbox
                                        id="isRecurrence"
                                        checked={isRecurrence}
                                        onCheckedChange={(checked) => setIsRecurrence(checked as boolean)}
                                    />
                                    <Label htmlFor="isRecurrence" className="text-sm font-normal cursor-pointer">Yes</Label>
                                </div>
                            </div>

                            {isRecurrence && (
                                <div className="space-y-1.5">
                                    <Label className="text-sm font-semibold text-slate-700">Recurrence Type</Label>
                                    <Select value={recurrenceType} onValueChange={setRecurrenceType}>
                                        <SelectTrigger className="bg-white border-slate-300 h-9 text-xs">
                                            <SelectValue placeholder="Select recurrence" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="daily">Daily</SelectItem>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="yearly">Yearly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {/* Calendar View based on Recurrence Type */}
                        {isRecurrence && recurrenceType && (
                            <div className="space-y-3 border-t pt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <Label className="text-sm font-semibold text-slate-700">Recurrence Preview</Label>
                                    <div className="flex gap-1">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 w-7 p-0"
                                            onClick={() => {
                                                if (recurrenceType === "daily") {
                                                    setCalendarDate(addDays(calendarDate, -1));
                                                } else if (recurrenceType === "weekly") {
                                                    setCalendarDate(addDays(calendarDate, -7));
                                                } else if (recurrenceType === "monthly") {
                                                    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, calendarDate.getDate()));
                                                } else if (recurrenceType === "yearly") {
                                                    setCalendarDate(new Date(calendarDate.getFullYear() - 1, calendarDate.getMonth(), calendarDate.getDate()));
                                                }
                                            }}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 px-2 text-xs"
                                            onClick={() => setCalendarDate(new Date())}
                                        >
                                            Today
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-7 w-7 p-0"
                                            onClick={() => {
                                                if (recurrenceType === "daily") {
                                                    setCalendarDate(addDays(calendarDate, 1));
                                                } else if (recurrenceType === "weekly") {
                                                    setCalendarDate(addDays(calendarDate, 7));
                                                } else if (recurrenceType === "monthly") {
                                                    setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, calendarDate.getDate()));
                                                } else if (recurrenceType === "yearly") {
                                                    setCalendarDate(new Date(calendarDate.getFullYear() + 1, calendarDate.getMonth(), calendarDate.getDate()));
                                                }
                                            }}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {recurrenceType === "daily" && <DailyCalendarView date={calendarDate} />}
                                {recurrenceType === "weekly" && <WeeklyCalendarView date={calendarDate} />}
                                {recurrenceType === "monthly" && <MonthlyCalendarView date={calendarDate} />}
                                {recurrenceType === "yearly" && <YearlyCalendarView date={calendarDate} />}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
