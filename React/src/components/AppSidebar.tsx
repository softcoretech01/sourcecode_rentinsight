import React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarHeader,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CloudSun,
    CreditCard,
    ClipboardList,
    Zap,
    Scale,
    FileText,
    BarChart,
    ReceiptText,
    Fan,
    Settings,
    ChevronRight,
    Wind,
    Activity,
    Users,
    PieChart
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AppSidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const items = [
        {
            title: "Master",
            url: "#",
            icon: Settings,
            items: [
                {
                    title: "Meeting",
                    url: "/master/meetings",
                    icon: Activity,
                },
                {
                    title: "Users",
                    url: "/master/users",
                    icon: ClipboardList,
                },
                {
                    title: "Role",
                    url: "/master/roles",
                    icon: Zap,
                },
                {
                    title: "Department",
                    url: "/master/department",
                    icon: Wind,
                },

            ]
        },
        {
            title: "Transaction",
            url: "#",
            icon: Fan,
            items: [
                {
                    title: "Maintenance Meeting",
                    url: "/transaction/maintenance-meetings",
                    icon: LayoutDashboard,
                },
                {
                    title: "Weekly Plan",
                    url: "/transaction/weekly-plan",
                    icon: CloudSun,
                },
                {
                    title: " Preventive maintainance plan",
                    url: "/transaction/preventive-maintenance-plan",
                    icon: FileText,
                },

                {
                    title: "MOM",
                    url: "/transaction/mom",
                    icon: CreditCard,
                },

                {
                    title: "Payment collection",
                    url: "/transaction/payment-collection",
                    icon: ReceiptText,
                },
                {
                    title: "Sales Meeting",
                    url: "/transaction/sales-meeting",
                    icon: CreditCard,
                },
                {
                    title: "Sales Website promotion",
                    url: "/transaction/sales-website-promotion",
                    icon: Activity,
                },


            ]
        },
        {
            title: "Report",
            url: "#",
            icon: FileText,
            items: [
                {
                    title: "Log sheet",
                    url: "/report/log-sheet-report",
                    icon: FileText,
                },
                {
                    title: "Accounts exps",
                    url: "/accounts-exps-report",
                    icon: ReceiptText,
                },
                {
                    title: "Machine Breakdown",
                    url: "/report/machine-breakdown",
                    icon: ClipboardList,
                },
                {
                    title: "Machine Spares",
                    url: "/report/machine-spares",
                    icon: Zap,
                },
            ]
        }
    ];

    const isChildActive = (itemItems: any[]) => {
        return itemItems?.some(subItem =>
            subItem.url === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(subItem.url)
        );
    };

    return (
        <Sidebar collapsible="icon" className="border-r-sidebar-border/50">
            <SidebarHeader className="border-b border-sidebar-border/50 px-6 py-4 bg-sidebar-accent/30 group-data-[collapsible=icon]:px-2">
                <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
                    {/* clicking logo goes to dashboard */}
                    <button
                        onClick={() => navigate("/master/meetings")}
                        className="text-xl font-bold tracking-tight text-sidebar-foreground group-data-[collapsible=icon]:hidden text-left"
                    >
                        RentInsight
                    </button>
                    <SidebarTrigger className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-sidebar">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sidebar-foreground/60 px-4">Menu</SidebarGroupLabel>
                    <SidebarMenu className="px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:items-center">
                        {items.map((item) => (
                            <Collapsible
                                key={item.title}
                                asChild
                                defaultOpen={isChildActive(item.items)}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            className="h-11 hover:bg-sidebar-accent/50 text-sidebar-foreground data-[state=open]:bg-sidebar-accent/40 group-data-[collapsible=icon]:!p-0 group-data-[collapsible=icon]:justify-center"
                                        >
                                            <div className="p-1.5 rounded-md bg-white/10">
                                                <item.icon className="w-4 h-4 text-sidebar-foreground" />
                                            </div>
                                            <span className="font-semibold group-data-[collapsible=icon]:hidden">{item.title}</span>
                                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden" />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub className="border-l-0 ml-0 pl-4 pr-2 space-y-1 mt-1">
                                            {item.items?.map((subItem: any) => {
                                                const splitPath = location.pathname.split('/');
                                                const splitUrl = subItem.url.split('/');
                                                const isActive = subItem.url === "/"
                                                    ? location.pathname === "/"
                                                    : location.pathname === subItem.url ||
                                                    (location.pathname.startsWith(subItem.url + "/") && splitPath[splitUrl.length] !== 'eb-bill' && splitPath[splitUrl.length] !== 'client-invoice' && splitPath[splitUrl.length] !== 'actuals') && subItem.url !== "#";

                                                return (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton
                                                            asChild
                                                            isActive={isActive}
                                                            className={cn(
                                                                "h-9 rounded-lg transition-all duration-200",
                                                                isActive
                                                                    ? "bg-white/20 text-white shadow-sm"
                                                                    : "text-sidebar-foreground/80 hover:bg-white/10 hover:text-white"
                                                            )}
                                                        >
                                                            <Link to={subItem.url} className="flex items-center gap-3">
                                                                <subItem.icon className={cn(
                                                                    "w-4 h-4 transition-colors",
                                                                    isActive ? "text-white" : "text-sidebar-foreground/60"
                                                                )} />
                                                                <span className="font-medium">
                                                                    {subItem.title}
                                                                </span>
                                                            </Link>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                )
                                            })}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
