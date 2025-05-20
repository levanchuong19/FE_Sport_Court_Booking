import { LayoutDashboard, Calendar, MapPin, Users, SettingsIcon, LogOut } from "lucide-react"
import { Button } from "./ui/button"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "overview", label: "Tổng quan", icon: LayoutDashboard },
    { id: "bookings", label: "Quản lý đặt sân", icon: Calendar },
    { id: "fields", label: "Quản lý sân", icon: MapPin },
    { id: "users", label: "Quản lý người dùng", icon: Users },
    { id: "settings", label: "Cài đặt", icon: SettingsIcon },
  ]

  return (
    <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <MapPin className="h-6 w-6 text-green-600" />
          <span>SportField Admin</span>
        </h1>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === item.id
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="outline"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Đăng xuất
        </Button>
      </div>
    </div>
  )
}
