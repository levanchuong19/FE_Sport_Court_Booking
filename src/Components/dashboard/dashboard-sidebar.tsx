"use client"

import { Link, useLocation } from "react-router-dom"
import {
  BarChart3,
  CalendarDays,
  ClipboardCheck,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  MapPin,
} from "lucide-react"

import { Button } from "../ui/button"
import { useUserRole } from "../../Hooks/use-user-role"
import { cn } from "../../Utils/utils"

interface DashboardSidebarProps {
  isMobile?: boolean
  onNavigate?: () => void
}

export function DashboardSidebar({ isMobile = false, onNavigate }: DashboardSidebarProps) {
  const pathname = useLocation()
  const { role } = useUserRole()

  // Define sidebar items based on user role
  const getSidebarItems = () => {
    const commonItems = [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ]

    const courtManagerItems = [
      {
        title: "Quản lý sân",
        href: "/dashboard/courts",
        icon: MapPin,
      },
      {
        title: "Đặt sân",
        href: "/dashboard/bookings",
        icon: CalendarDays,
      },
      {
        title: "Nhân viên",
        href: "/dashboard/staff",
        icon: Users,
      },
      {
        title: "Báo cáo",
        href: "/dashboard/reports",
        icon: BarChart3,
      },
    ]

    const courtStaffItems = [
      {
        title: "Check-in",
        href: "/dashboard/checkin",
        icon: ClipboardCheck,
      },
      {
        title: "Lịch sân",
        href: "/dashboard/schedule",
        icon: CalendarDays,
      },
    ]

    const adminItems = [
      {
        title: "Quản lý sân",
        href: "/dashboard/courts",
        icon: MapPin,
      },
      {
        title: "Đặt sân",
        href: "/dashboard/bookings",
        icon: CalendarDays,
      },
      {
        title: "Người dùng",
        href: "/dashboard/users",
        icon: Users,
      },
      {
        title: "Báo cáo",
        href: "/dashboard/reports",
        icon: BarChart3,
      },
    ]

    const settingsItem = [
      {
        title: "Cài đặt",
        href: "/dashboard/settings",
        icon: Settings,
      },
    ]

    switch (role) {
      case "court_manager":
        return [...commonItems, ...courtManagerItems, ...settingsItem]
      case "court_staff":
        return [...commonItems, ...courtStaffItems, ...settingsItem]
      case "admin":
      default:
        return [...commonItems, ...adminItems, ...settingsItem]
    }
  }

  const sidebarItems = getSidebarItems()

  return (
    <div className={cn("flex h-full flex-col border-r bg-background", isMobile ? "w-full" : "hidden md:flex md:w-64")}>
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold" onClick={onNavigate}>
          <Home className="h-6 w-6" />
          <span>SportCourt</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname.pathname === item.href ? "default" : "ghost"}
              className={cn("justify-start", pathname.pathname === item.href && "bg-primary text-primary-foreground")}
              asChild
            >
              <Link to={item.href} onClick={onNavigate}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <Button variant="outline" className="w-full justify-start text-destructive" onClick={onNavigate}>
          <LogOut className="mr-2 h-4 w-4" />
          Đăng xuất
        </Button>
      </div>
    </div>
  )
}
