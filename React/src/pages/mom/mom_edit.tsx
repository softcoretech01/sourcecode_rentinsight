import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router-dom";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const meetingOptions = [
    "Weekly Standup",
    "Sprint Planning",
    "Retrospective",
    "Management Review",
    "Project Sync",
];

const statusOptions = ["Open", "In Progress", "Completed", "Cancelled"];

export default function MomEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [meeting, setMeeting] = useState("Weekly Standup");
    const [status, setStatus] = useState("In Progress");
    const [remarks, setRemarks] = useState("Discuss project milestones and blockers.");
    const [continueNextWeek, setContinueNextWeek] = useState(true);

    return (
        <div className="p-3 bg-slate-50 min-h-screen font-sans">
            <div className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h1 className="text-lg font-semibold text-indigo-700">Minute of meeting - Update</h1>
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
                            onClick={() => navigate("/transaction/mom")}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="p-4">
                    <div className="space-y-6 px-4 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Meeting</Label>
                                <Select value={meeting} onValueChange={setMeeting}>
                                    <SelectTrigger className="bg-white border-slate-300 h-9 text-sm">
                                        <SelectValue placeholder="Select meeting" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {meetingOptions.map((opt) => (
                                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1.5">
                                <Label className="text-sm font-semibold text-slate-700">Status</Label>
                                <Select value={status} onValueChange={setStatus}>
                                    <SelectTrigger className="bg-white border-slate-300 h-9 text-sm">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map((opt) => (
                                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-sm font-semibold text-slate-700">Remarks</Label>
                            <Textarea
                                placeholder="Enter meeting remarks (max 300 characters)"
                                value={remarks}
                                maxLength={300}
                                onChange={(e) => setRemarks(e.target.value)}
                                className="bg-white border-slate-300 min-h-[120px] text-sm"
                            />
                            <div className="text-xs text-slate-500 text-right">{remarks.length}/300</div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="continue-next-week"
                                checked={continueNextWeek}
                                onCheckedChange={setContinueNextWeek}
                            />
                            <Label htmlFor="continue-next-week" className="text-sm font-medium text-slate-700 cursor-pointer">
                                Continue with next week meeting
                            </Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
