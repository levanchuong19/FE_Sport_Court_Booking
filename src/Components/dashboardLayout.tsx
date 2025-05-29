import { Outlet } from "react-router-dom";
import DashboardSidebar from "./dashboardSidebar";
import DashboardHeader from "./dashboardHeader";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <main className="flex-1 ml-64 ">
        <DashboardHeader />
        <Outlet />
      </main>
    </div>
  );
}