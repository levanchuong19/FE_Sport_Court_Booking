import { useUserRole } from "../Hooks/use-user-role"
import { AdminOverview } from "./overview/admin-overview"
import { CourtManagerOverview } from "./overview/court-manager-overview"
import { CourtStaffOverview } from "./overview/court-staff-overview"

export function DashboardOverview() {
  const { role } = useUserRole()

  switch (role) {
    case "court_manager":
      return <CourtManagerOverview />
    case "court_staff":
      return <CourtStaffOverview />
    case "admin":
    default:
      return <AdminOverview />
  }
}
