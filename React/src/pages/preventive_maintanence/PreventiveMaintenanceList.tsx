import React, { useMemo, useState } from "react";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PreventiveRow {
  id: string;
  machineType: string;
  machineNumber: string;
  height: string;
  status: string;
  engineerAssigned: string;
  lastPreventiveDate: string;
  dueDate: string;
}

const defaultData: PreventiveRow[] = [
  { id: "1", machineType: "Boom Lift", machineNumber: "M001", height: "10m", status: "Pending", engineerAssigned: "John Doe", lastPreventiveDate: "2025-03-01", dueDate: "2025-03-15" },
  { id: "2", machineType: "Scissors", machineNumber: "M002", height: "8m", status: "In Progress", engineerAssigned: "Jane Smith", lastPreventiveDate: "2025-03-05", dueDate: "2025-03-19" },
  { id: "3", machineType: "Boom Lift", machineNumber: "M003", height: "12m", status: "Completed", engineerAssigned: "Mike Johnson", lastPreventiveDate: "2025-02-20", dueDate: "2025-03-06" },
];

export default function PreventiveMaintenanceList() {
  const navigate = useNavigate();
  const [filterMachineType, setFilterMachineType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [keyword, setKeyword] = useState("");

  const filteredData = useMemo(() => {
    const lower = keyword.toLowerCase();
    return defaultData.filter((row) =>
      (filterMachineType === "" || row.machineType === filterMachineType) &&
      (filterStatus === "" || row.status === filterStatus) &&
      (row.machineNumber.toLowerCase().includes(lower) ||
        row.engineerAssigned.toLowerCase().includes(lower) ||
        row.machineType.toLowerCase().includes(lower) ||
        row.status.toLowerCase().includes(lower) ||
        row.lastPreventiveDate.toLowerCase().includes(lower) ||
        row.dueDate.toLowerCase().includes(lower))
    );
  }, [filterMachineType, filterStatus, keyword]);

  return (
    <div className="p-2 bg-slate-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between pb-2">
            <h1 className="text-xl font-bold text-slate-800">Preventive Maintenance - List</h1>
          </div>

          <div className="space-y-1">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex flex-wrap justify-between gap-2 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-600">Search</span>
                <div className="w-[200px]">
                  <Select value={filterMachineType} onValueChange={(val) => setFilterMachineType(val === "all" ? "" : val)}>
                    <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                      <SelectValue placeholder="Machine Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Boom Lift">Boom Lift</SelectItem>
                      <SelectItem value="Scissors">Scissors</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="w-[200px]">
                  <Select value={filterStatus} onValueChange={(val) => setFilterStatus(val === "all" ? "" : val)}>
                    <SelectTrigger className="bg-white border-slate-200 h-9 text-sm">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" className="h-9 text-sm bg-primary hover:bg-primary/90 text-primary-foreground px-4" onClick={() => {}}>
                  Search
                </Button>
                <Button size="sm" className="h-9 text-sm bg-emerald-600 hover:bg-emerald-700 text-white px-4" onClick={() => navigate("/transaction/preventive-maintenance-plan/add")}>
                  + New
                </Button>
                <Button size="sm" className="h-9 text-sm bg-[#DAA520] hover:bg-[#B8860B] text-white px-4">
                  Export Excel
                </Button>
                <Button size="sm" className="h-9 text-sm bg-red-600 hover:bg-red-700 text-white px-4" onClick={() => { setFilterMachineType(""); setFilterStatus(""); setKeyword(""); }}>
                  Reset
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center bg-primary/5 p-2 rounded-md border border-primary/10">
              <h2 className="text-sm font-semibold text-primary">Preventive Maintenance Data</h2>
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
                  <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Machine Type</TableHead>
                  <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Machine No.</TableHead>
                  <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Height</TableHead>
                  <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Status</TableHead>
                  <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Engineer</TableHead>
                  <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Last Date</TableHead>
                  <TableHead className="py-2 h-10 font-semibold text-white whitespace-nowrap">Due Date</TableHead>
                  <TableHead className="py-2 h-10 font-semibold text-white text-center whitespace-nowrap">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((row) => (
                    <TableRow key={row.id} className="hover:bg-slate-50 bg-white">
                      <TableCell className="py-2 text-sm">{row.machineType}</TableCell>
                      <TableCell className="py-2 text-sm">{row.machineNumber}</TableCell>
                      <TableCell className="py-2 text-sm">{row.height}</TableCell>
                      <TableCell className="py-2 text-sm"><Badge className={cn("text-xs py-1 px-2 rounded-full", row.status === "Completed" ? "bg-emerald-100 text-emerald-800" : row.status === "In Progress" ? "bg-amber-100 text-amber-800" : "bg-sky-100 text-sky-800")}>{row.status}</Badge></TableCell>
                      <TableCell className="py-2 text-sm">{row.engineerAssigned}</TableCell>
                      <TableCell className="py-2 text-sm">{row.lastPreventiveDate}</TableCell>
                      <TableCell className="py-2 text-sm">{row.dueDate}</TableCell>
                      <TableCell className="py-2 text-center">
                        <div className="flex justify-center gap-2">
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-primary hover:text-primary hover:bg-primary/10" onClick={() => navigate(`/transaction/preventive-maintenance-plan/edit/${row.id}`)}><Edit className="h-4 w-4" /></Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-red-600 hover:bg-red-50" onClick={() => alert("Delete record") }><Trash2 className="h-4 w-4" /></Button>
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
