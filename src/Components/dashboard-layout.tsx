import { Outlet } from "react-router-dom";
import { DashboardHeader } from "./dashboard/dashboard-header";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <main className="flex-1 p-6 md:p-8 pt-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 