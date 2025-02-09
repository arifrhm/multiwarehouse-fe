"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BarChart,
  Package,
  Truck,
  Users,
  Clipboard,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import { showSuccessToast } from "@/lib/utils/toast";

export function DashboardSidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const { open } = useSidebar();

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    showSuccessToast("Anda berhasil logout");
    router.push("/login");
  };

  const menuItems = [
    { href: "/", icon: BarChart, label: "Overview" },
    { href: "/inventory", icon: Package, label: "Inventory" },
    { href: "/orders", icon: Clipboard, label: "Orders" },
    { href: "/shipments", icon: Truck, label: "Shipments" },
    { href: "/employees", icon: Users, label: "Employees" },
  ];

  return (
    <Sidebar
      className="bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 z-50"
      collapsible="icon"
    >
     <SidebarHeader className="border-b">
       {open ? (
         <div className="p-4 flex items-center justify-between">
           <h2 className="text-xl font-bold text-gray-800">
             Warehouse Dashboard
           </h2>
           <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-lg">
             <ChevronRight
               className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
             />
           </SidebarTrigger>
         </div>
       ) : (
         <div className="flex justify-center p-4">
           <SidebarTrigger className="p-2 hover:bg-gray-100 rounded-lg">
             <ChevronRight
               className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
             />
           </SidebarTrigger>
         </div>
       )}
     </SidebarHeader>

      {open && user?.username && (
        <div className="px-4 py-3 text-sm text-gray-600 border-b">
          Username: {user.username}
        </div>
      )}

      <SidebarContent className="py-2">
        <SidebarMenu>
          {menuItems.map(({ href, icon: Icon, label }) => (
            <SidebarMenuItem key={href}>
              <SidebarMenuButton asChild>
                <Link
                  href={href}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mx-2"
                >
                  <Icon className="h-5 w-5" />
                  {open && <span className="ml-3">{label}</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg mx-2 w-full"
            >
              <LogOut className="h-5 w-5" />
              {open && <span className="ml-3">Logout</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
