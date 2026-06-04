import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import DepartmentList from "./pages/department/DepartmentList";
import DepartmentAdd from "./pages/department/DepartmentAdd";
import DepartmentEdit from "./pages/department/DepartmentEdit";

import MeetingsList from "./pages/meetings/MeetingsList";
import MeetingsAdd from "./pages/meetings/MeetingsAdd";
import MeetingsEdit from "./pages/meetings/MeetingsEdit";


import UsersList from "./pages/users/UsersList";
import UsersAdd from "./pages/users/UsersAdd";
import UsersEdit from "./pages/users/UsersEdit";

import RolesList from "./pages/roles/role_list";
import RolesAdd from "./pages/roles/role_add";
import RolesEdit from "./pages/roles/role_edit";

import MaintenanceMeetingList from "./pages/maintenance_meeting/Maintenance_Meeting_List";
import MaintenanceMeetingAdd from "./pages/maintenance_meeting/Maintenance_Meeting_Add";
import MaintenanceMeetingEdit from "./pages/maintenance_meeting/Maintenance_Meeting_Edit";

import WeeklyPlanList from "./pages/weekly_plan/WeeklyPlanList";
import WeeklyPlanAdd from "./pages/weekly_plan/WeeklyPlanAdd";
import WeeklyPlanEdit from "./pages/weekly_plan/WeeklyPlanEdit";

import PreventiveMaintenanceList from "./pages/preventive_maintanence/PreventiveMaintenanceList";
import PreventiveMaintenanceAdd from "./pages/preventive_maintanence/PreventiveMaintenanceAdd";
import PreventiveMaintenanceEdit from "./pages/preventive_maintanence/PreventiveMaintenanceEdit";

import MomList from "./pages/mom/mom_list";
import MomAdd from "./pages/mom/mom_add";
import MomEdit from "./pages/mom/mom_edit";

import PaymentCollectionList from "./pages/payment_collection/PaymentCollectionList";
import PaymentCollectionAdd from "./pages/payment_collection/PaymentCollectionAdd";
import PaymentCollectionEdit from "./pages/payment_collection/PayementCollectionEdit";


import Layout from "./components/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/uat" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* redirect root to meetings list */}
          <Route path="/" element={<Navigate to="/master/meetings" replace />} />

          <Route element={<Layout />}>
            {/* dashboard is disabled to prevent taking over the screen */}
            {/* <Route path="/dashboard" element={<Index />} /> */}

            <Route path="/master/department" element={<DepartmentList />} />
            <Route path="/master/department/add" element={<DepartmentAdd />} />
            <Route path="/master/department/edit/:id" element={<DepartmentEdit />} />
            <Route path="/master/department/view/:id" element={<DepartmentEdit />} />

            <Route path="/master/meetings" element={<MeetingsList />} />
            <Route path="/master/meetings/add" element={<MeetingsAdd />} />
            <Route path="/master/meetings/edit/:id" element={<MeetingsEdit />} />
            
            <Route path="/master/users" element={<UsersList />} />
            <Route path="/master/users/add" element={<UsersAdd />} />
            <Route path="/master/users/edit/:id" element={<UsersEdit />} />
            <Route path="/master/roles" element={<RolesList />} />
            <Route path="/master/roles/add" element={<RolesAdd />} />
            <Route path="/master/roles/edit/:id" element={<RolesEdit />} />

            <Route path="/transaction/maintenance-meetings" element={<MaintenanceMeetingList />} />
            <Route path="/transaction/maintenance-meetings/add" element={<MaintenanceMeetingAdd />} />
            <Route path="/transaction/maintenance-meetings/edit/:id" element={<MaintenanceMeetingEdit />} />

            <Route path="/transaction/weekly-plan" element={<WeeklyPlanList />} />
            <Route path="/transaction/weekly-plan/add" element={<WeeklyPlanAdd />} />
            <Route path="/transaction/weekly-plan/edit/:id" element={<WeeklyPlanEdit />} />

            <Route path="/transaction/preventive-maintenance-plan" element={<PreventiveMaintenanceList />} />
            <Route path="/transaction/preventive-maintenance-plan/add" element={<PreventiveMaintenanceAdd />} />
            <Route path="/transaction/preventive-maintenance-plan/edit/:id" element={<PreventiveMaintenanceEdit />} />

            <Route path="/transaction/mom" element={<MomList />} />
            <Route path="/transaction/mom/add" element={<MomAdd />} />
            <Route path="/transaction/mom/edit/:id" element={<MomEdit />} />

            <Route path="/transaction/payment-collection" element={<PaymentCollectionList />} />
            <Route path="/transaction/payment-collection/add" element={<PaymentCollectionAdd />} />
            <Route path="/transaction/payment-collection/edit/:id" element={<PaymentCollectionEdit />} />


          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
