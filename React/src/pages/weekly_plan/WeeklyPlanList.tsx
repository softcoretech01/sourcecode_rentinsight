import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface WeeklyPlanRow {
  id: number;
  dateScheduled: string;
  department: string;
  machineNumber: string;
  task: string;
  responsibility: string;
  assignedTo: string;
  targetDate: string;
}

const defaultData: WeeklyPlanRow[] = [
  { id: 1, dateScheduled: "2025-02-05", department: "Operations", machineNumber: "M001", task: "Inspection", responsibility: "John Doe", assignedTo: "Jane Smith", targetDate: "2025-02-10" },
  { id: 2, dateScheduled: "2025-02-07", department: "IT", machineNumber: "M002", task: "Calibration", responsibility: "Mike Johnson", assignedTo: "Sarah Williams", targetDate: "2025-02-12" },
  { id: 3, dateScheduled: "2025-02-12", department: "Maintenance", machineNumber: "M003", task: "Repair", responsibility: "Robert Brown", assignedTo: "John Doe", targetDate: "2025-02-17" },
];

export default function WeeklyPlanList() {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [keyword, setKeyword] = useState("");
  const [appliedDepartment, setAppliedDepartment] = useState("");

  const handleSearch = () => setAppliedDepartment(selectedDepartment);
  const handleCancel = () => {
    setSelectedDepartment("");
    setKeyword("");
    setAppliedDepartment("");
  };

  const filteredData = useMemo(() => {
    const lower = keyword.toLowerCase();
    return defaultData
      .filter((row) => appliedDepartment === "" || row.department === appliedDepartment)
      .filter((row) =>
        row.department.toLowerCase().includes(lower) ||
        row.machineNumber.toLowerCase().includes(lower) ||
        row.task.toLowerCase().includes(lower) ||
        row.responsibility.toLowerCase().includes(lower) ||
        row.assignedTo.toLowerCase().includes(lower) ||
        row.dateScheduled.toLowerCase().includes(lower) ||
        row.targetDate.toLowerCase().includes(lower)
      );
  }, [keyword, appliedDepartment]);

  const departments = ["IT", "HR", "Finance", "Operations", "Sales", "Marketing"];

  return (
    <div className="p-2 bg-slate-50 min-h-screen font-sans">
      <div className="w-full bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between pb-2">
            <h1 className="text-xl font-bold text-slate-800">Weekly Plan - List</h1>
          </div>

          <div className="space-y-1">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap justify-between gap-2 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-600">Search</span>
                <div className="w-[200px]">
                  <Select value={selectedDepartment} onValueChange={(val) => setSelectedDepartment(val === "all" ? "" : val)}>
                    <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" className="h-9 text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4" onClick={handleSearch}>
                  Search
                </Button>
                <Button size="sm" className="h-9 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4" onClick={() => navigate("/transaction/weekly-plan/add")}>
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

            <div className="flex justify-between items-center bg-primary/5 p-2 rounded-md border border-primary/10">
              <h2 className="text-sm font-semibold text-primary">Weekly Plan Data</h2>
              <div className="relative w-64">
                <Search className="absolute right-2 top-2.5 h-4 w-4 text-slate-400" />
                <Input placeholder="Keyword search..." className="bg-white border-slate-300 pr-8 h-9 text-sm" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-b-lg overflow-x-auto mt-0">
            <Table>
              <TableHeader className="bg-sidebar">
                <TableRow>
                  <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Date Scheduled</TableHead>
                  <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Department</TableHead>
                  <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Machine No.</TableHead>
                  <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Task</TableHead>
                  <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Responsibility</TableHead>
                  <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Assigned To</TableHead>
                  <TableHead className="font-semibold text-white h-10 whitespace-nowrap">Target Date</TableHead>
                  <TableHead className="font-semibold text-white text-center h-10 whitespace-nowrap">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <TableRow key={row.id} className="hover:bg-slate-50 bg-white">
                      <TableCell className="py-2 text-sm">{row.dateScheduled}</TableCell>
                      <TableCell className="py-2 text-sm">{row.department}</TableCell>
                      <TableCell className="py-2 text-sm">{row.machineNumber}</TableCell>
                      <TableCell className="py-2 text-sm">{row.task}</TableCell>
                      <TableCell className="py-2 text-sm">{row.responsibility}</TableCell>
                      <TableCell className="py-2 text-sm">{row.assignedTo}</TableCell>
                      <TableCell className="py-2 text-sm">{row.targetDate}</TableCell>
                      <TableCell className="py-2 text-center">
                        <div className="flex justify-center gap-2 items-center">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10" onClick={() => navigate(`/transaction/weekly-plan/edit/${row.id}`)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-red-600 hover:bg-red-50" onClick={() => alert("Delete Weekly Plan") }>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4 text-slate-500">No records found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
