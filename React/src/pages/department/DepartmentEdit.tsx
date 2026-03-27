import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar as CalendarIcon, ArrowLeft, Upload, Eye, FileText, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function DepartmentEdit() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [deptName, setDeptName] = useState("Finance");
    const [responsibilities, setResponsibilities] = useState("Financial planning, budgeting, reporting");
    const [activeTab, setActiveTab] = useState("windmill_details");
    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();
    const [insuranceFromDate, setInsuranceFromDate] = useState<Date>();
    const [insuranceToDate, setInsuranceToDate] = useState<Date>();
    const [unitsExpiring, setUnitsExpiring] = useState("monthly");
    const [type, setType] = useState("windmill");
    const [transactionLoss, setTransactionLoss] = useState("4.50");
    const [edcCircle, setEdcCircle] = useState("South Circle");

    // Uploads State
    const [documents, setDocuments] = useState([
        { id: 1, name: "Upload Commissioning certificate", file: null as File | null, fileName: "" },
        { id: 2, name: "Name transfer document", file: null as File | null, fileName: "" },
        { id: 3, name: "PPA", file: null as File | null, fileName: "" },
        { id: 4, name: "Wheeling agreement", file: null as File | null, fileName: "" },
        { id: 5, name: "Upload AMC document", file: null as File | null, fileName: "" },
        { id: 6, name: "Insurance Policy", file: null as File | null, fileName: "" }
    ]);
    const [viewFile, setViewFile] = useState<{ file: File; name: string } | null>(null);

    const handleFileChange = (id: number, file: File | null) => {
        setDocuments(documents.map(doc =>
            doc.id === id ? { ...doc, file: file, fileName: file ? file.name : "" } : doc
        ));
    };

    // Mock pre-fill to verify logic, normally fetch by ID
    useEffect(() => {
        if (id) {
            // Simulate fetching data
        }
    }, [id]);

    return (
        <div className="p-3 bg-slate-50 min-h-screen font-sans">
            <div className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h1 className="text-lg font-semibold text-indigo-700">
                        Master Department - Update
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
                            onClick={() => navigate("/master/department")}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="p-0">
                    <Tabs defaultValue="windmill_details" className="w-full" onValueChange={setActiveTab}>
                        <TabsList className="w-full justify-start rounded-none h-auto bg-cyan-50 p-0 border-b border-cyan-100">
                            <TabsTrigger
                                value="windmill_details"
                                className={cn(
                                    "flex items-center gap-3 px-8 py-3.5 rounded-none data-[state=active]:bg-cyan-100 data-[state=active]:shadow-none transition-all",
                                    "text-slate-600 font-medium text-[15px] border-r border-cyan-50"
                                )}
                            >
                                <div className={cn(
                                    "flex items-center justify-center w-8 h-8 rounded-full transition-all",
                                    activeTab === "windmill_details" ? "bg-cyan-700 text-white" : "border-2 border-cyan-700 text-cyan-700 bg-transparent"
                                )}>
                                    <FileText className="h-4.5 w-4.5" />
                                </div>
                                <span>Department Details</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="uploads"
                                className={cn(
                                    "flex items-center gap-3 px-8 py-3.5 rounded-none data-[state=active]:bg-cyan-100 data-[state=active]:shadow-none transition-all",
                                    "text-slate-600 font-medium text-[15px] border-r border-cyan-50"
                                )}
                            >
                                <div className={cn(
                                    "flex items-center justify-center w-8 h-8 rounded-full transition-all",
                                    activeTab === "uploads" ? "bg-cyan-700 text-white" : "border-2 border-cyan-700 text-cyan-700 bg-transparent"
                                )}>
                                    <Upload className="h-4.5 w-4.5" />
                                </div>
                                <span>Upload Docs</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="shift_timings"
                                className={cn(
                                    "flex items-center gap-3 px-8 py-3.5 rounded-none data-[state=active]:bg-cyan-100 data-[state=active]:shadow-none transition-all",
                                    "text-slate-600 font-medium text-[15px] border-r border-cyan-50"
                                )}
                            >
                                <div className={cn(
                                    "flex items-center justify-center w-8 h-8 rounded-full transition-all",
                                    activeTab === "shift_timings" ? "bg-cyan-700 text-white" : "border-2 border-cyan-700 text-cyan-700 bg-transparent"
                                )}>
                                    <Clock className="h-4.5 w-4.5" />
                                </div>
                                <span>Slot Timings</span>
                            </TabsTrigger>
                        </TabsList>

                        <div className="p-6">
                            <TabsContent value="windmill_details" className="mt-0 space-y-6 pt-2">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-slate-700">Department Name</Label>
                                        <Input
                                            placeholder="Enter department name"
                                            value={deptName}
                                            onChange={(e) => setDeptName(e.target.value)}
                                            className="bg-white border-slate-300 h-10 text-sm"
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2 space-y-2">
                                        <Label className="text-sm font-semibold text-slate-700">Responsibilities</Label>
                                        <Textarea
                                            placeholder="Enter department responsibilities"
                                            value={responsibilities}
                                            onChange={(e) => setResponsibilities(e.target.value)}
                                            className="bg-white border-slate-300 text-sm min-h-24"
                                        />
                                    </div>

                                    <div className="space-y-1.5 md:col-span-3">
                                        <label className="text-sm font-semibold text-slate-700">Type</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="windmill"
                                                    checked={type === "windmill"}
                                                    onChange={(e) => setType(e.target.value)}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                                <span className="text-sm text-slate-700">Windmill</span>
                                            </label>
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="type"
                                                    value="solar"
                                                    checked={type === "solar"}
                                                    onChange={(e) => setType(e.target.value)}
                                                    className="w-4 h-4 text-indigo-600"
                                                />
                                                <span className="text-sm text-slate-700">Solar</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Windmill Number</label>
                                        <Input defaultValue={id || "WM-001"} className="bg-white border-slate-300 h-9 text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Windmill Name</label>
                                        <Input defaultValue="" placeholder="Enter Windmill Name" className="bg-white border-slate-300 h-9 text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Status</label>
                                        <Select defaultValue="active">
                                            <SelectTrigger className="bg-white border-slate-300 h-9 text-xs">
                                                <SelectValue placeholder="Active" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="inactive">Inactive</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">KVA </label>
                                        <Select defaultValue="1500" onValueChange={(value) => {
                                            // Auto calculate transaction loss based on KVA logic (mocking for now)
                                            setTransactionLoss("4.50"); // Example dynamic update
                                        }}>
                                            <SelectTrigger className="bg-white border-slate-300 h-9 text-xs">
                                                <SelectValue placeholder="Select KVA" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="11">11</SelectItem>
                                                <SelectItem value="33">33</SelectItem>
                                                <SelectItem value="22">22</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Roles-MW</label>
                                        <Select defaultValue="250">
                                            <SelectTrigger className="bg-white border-slate-300 h-9 text-xs">
                                                <SelectValue placeholder="Select Roles" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="0.6">0.6</SelectItem>
                                                <SelectItem value="0.25">0.25</SelectItem>
                                                <SelectItem value="0.225">0.225</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Transmission Loss</label>
                                        <div className="h-9 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-xs text-red-700 font-medium">
                                            {transactionLoss}%
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">EDC Circle</label>
                                        <Select value={edcCircle} onValueChange={setEdcCircle}>
                                            <SelectTrigger className="bg-white border-slate-300 h-9 text-xs">
                                                <SelectValue placeholder="Select EDC Circle" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="South Circle">South Circle</SelectItem>
                                                <SelectItem value="North Circle">North Circle</SelectItem>
                                                <SelectItem value="West Circle">West Circle</SelectItem>
                                                <SelectItem value="East Circle">East Circle</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">AE Name</label>
                                        <Input placeholder="Enter AM Name" className="bg-white border-slate-300 h-9 text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">AE Number</label>
                                        <Input defaultValue="AE-1234" className="bg-white border-slate-300 h-9 text-xs" />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Operator Name</label>
                                        <Input defaultValue="ABC Energy" className="bg-white border-slate-300 h-9 text-xs" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-semibold text-slate-700">Operator Number</label>
                                        <Input defaultValue="9876543210" className="bg-white border-slate-300 h-9 text-xs" />
                                    </div>
                                </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 pt-4 border-t border-slate-100">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">AMC Type</label>
                                            <Select defaultValue="comprehensive">
                                                <SelectTrigger className="bg-white border-slate-300 h-9 text-xs">
                                                    <SelectValue placeholder="Comprehensive" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                                                    <SelectItem value="non-comprehensive">Non-Comprehensive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">AMC Head</label>
                                            <Input defaultValue="Vendor A" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">AMC Head Contact Number</label>
                                            <Input defaultValue="9876543210" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">AM Name</label>
                                            <Input defaultValue="" placeholder="Enter AM Name" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">AMC From Date</label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal bg-white border-slate-300 h-9",
                                                            !fromDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-3 w-3" />
                                                        {fromDate ? format(fromDate, "P") : <span className="text-xs text-slate-400">dd-mm-yyyy</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={fromDate}
                                                        onSelect={setFromDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">AMC To Date</label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal bg-white border-slate-300 h-9",
                                                            !toDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-3 w-3" />
                                                        {toDate ? format(toDate, "P") : <span className="text-xs text-slate-400">dd-mm-yyyy</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={toDate}
                                                        onSelect={setToDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 pt-4 border-t border-slate-100">

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Insurance Policy Number</label>
                                            <Input defaultValue="POL-5678" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Insurance Company Name</label>
                                            <Input defaultValue="" placeholder="Enter Insurance Name" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Insurance Company Phone Number</label>
                                            <Input defaultValue="" placeholder="Enter Phone Number" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Insurance From Date</label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal bg-white border-slate-300 h-9",
                                                            !insuranceFromDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-3 w-3" />
                                                        {insuranceFromDate ? format(insuranceFromDate, "P") : <span className="text-xs text-slate-400">dd-mm-yyyy</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={insuranceFromDate}
                                                        onSelect={setInsuranceFromDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Insurance To Date</label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal bg-white border-slate-300 h-9",
                                                            !insuranceToDate && "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-3 w-3" />
                                                        {insuranceToDate ? format(insuranceToDate, "P") : <span className="text-xs text-slate-400">dd-mm-yyyy</span>}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0">
                                                    <Calendar
                                                        mode="single"
                                                        selected={insuranceToDate}
                                                        onSelect={setInsuranceToDate}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t border-slate-100">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Minimum Level Generation</label>
                                            <Input defaultValue="1000" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Units Expiring</label>
                                            <div className="flex gap-4 h-9 items-center">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="unitsExpiring"
                                                        value="monthly"
                                                        checked={unitsExpiring === "monthly"}
                                                        onChange={(e) => setUnitsExpiring(e.target.value)}
                                                        className="w-4 h-4 text-indigo-600"
                                                    />
                                                    <span className="text-sm text-slate-700">Monthly</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name="unitsExpiring"
                                                        value="yearly"
                                                        checked={unitsExpiring === "yearly"}
                                                        onChange={(e) => setUnitsExpiring(e.target.value)}
                                                        className="w-4 h-4 text-indigo-600"
                                                    />
                                                    <span className="text-sm text-slate-700">Yearly</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Open Access Portal (Website)</label>
                                            <Input defaultValue="https://portal.example.com" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Username</label>
                                            <Input defaultValue="admin_user" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-slate-700">Password</label>
                                            <Input type="text" defaultValue="password123" className="bg-white border-slate-300 h-9 text-xs" />
                                        </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="uploads" className="mt-0 space-y-6 pt-2">
                                <div className="space-y-6 max-w-5xl">
                                    <div className="border border-slate-200 rounded-md overflow-hidden">
                                        <table className="w-full text-sm text-left border-collapse">
                                            <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                                                <tr>
                                                    <th className="px-4 py-3 w-16 border-r border-slate-200">#</th>
                                                    <th className="px-4 py-3 border-r border-slate-200">Document Name</th>
                                                    <th className="px-4 py-3 border-r border-slate-200 w-1/3">Upload</th>
                                                    <th className="px-4 py-3 border-r border-slate-200 w-1/3">File Name</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100">
                                                {documents.map((item, index) => (
                                                    <tr key={item.id} className="hover:bg-slate-50">
                                                        <td className="px-4 py-3 text-slate-500 border-r border-slate-100">{index + 1}</td>
                                                        <td className="px-4 py-3 font-medium text-slate-900 border-r border-slate-100">{item.name}</td>
                                                        <td className="px-4 py-3 border-r border-slate-100">
                                                            <Input
                                                                type="file"
                                                                onChange={(e) => handleFileChange(item.id, e.target.files ? e.target.files[0] : null)}
                                                                className="bg-white border-slate-300 h-9 text-xs focus:ring-blue-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-3 text-slate-600 border-r border-slate-100">
                                                            {item.fileName ? (
                                                                <a
                                                                    href={item.file ? URL.createObjectURL(item.file) : "#"}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                                                                >
                                                                    {item.fileName}
                                                                </a>
                                                            ) : (
                                                                <span className="text-slate-400 italic">No file selected</span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="shift_timings" className="mt-0 space-y-6 pt-2">
                                <div className="space-y-6 px-4 pt-4 max-w-5xl">
                                    <div className="flex flex-col gap-y-4">
                                        <div>
                                            <span className="text-sm font-semibold text-slate-700">C1 (Morning Peak): </span>
                                            <span className="text-sm font-semibold text-[#CB4154]">06:00 AM to 10:00 AM</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-slate-700">C2 (Evening Peak): </span>
                                            <span className="text-sm font-semibold text-[#CB4154]">06:00 PM (18:00) to 10:00 PM (22:00)</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-slate-700">C4 (Normal Hours): </span>
                                            <span className="text-sm font-semibold text-[#CB4154]">05:00 AM to 06:00 AM AND 10:00 AM to 06:00 PM (18:00)</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-semibold text-slate-700">C5 (Night Hours): </span>
                                            <span className="text-sm font-semibold text-[#CB4154]">10:00 PM (22:00) to 05:00 AM (next day)</span>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div >
        </div >
    );
}
