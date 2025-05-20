import { DashboardOverview } from "../Components/dashboard-overview"
import { RoleSelector } from "../Components/dashboard/role-selector"
import { UserRoleProvider } from "../Hooks/use-user-role"
import { DashboardSidebar } from "../Components/dashboard/dashboard-sidebar"

export default function DashboardPage() {
  return (
    <UserRoleProvider>
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Tổng quan về hoạt động của hệ thống</p>
            </div>
            <RoleSelector />
          </div>
          <DashboardOverview />
        </div>
      </div>
    </UserRoleProvider>
  )
}