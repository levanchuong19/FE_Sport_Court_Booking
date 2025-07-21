import { useNavigate } from "react-router-dom";
import { LayoutDashboard, MapPinHouse, MapPinned, CalendarDays } from 'lucide-react';

// Define TabKey locally
type TabKey = "overview" | "location" | "court" | "booking";

const TABS = [
  { key: "overview", label: "Tổng quan", icon: <LayoutDashboard /> },
  { key: "location", label: "Quản lý địa điểm", icon: <MapPinHouse /> },
  { key: "court", label: "Quản lý sân", icon: <MapPinned /> },
  { key: "booking", label: "Quản lý đặt sân", icon: <CalendarDays /> },
];

interface OwnerSidebarProps {
  tab: TabKey;
  setTab: (t: TabKey) => void;
}

export default function OwnerSidebar({ tab, setTab }: OwnerSidebarProps) {
  const navigate = useNavigate();
  const linkClass = "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer";
  const activeClass = "bg-green-600 text-white shadow hover:bg-green-600";
  const inactiveClass = "hover:bg-gray-100 text-gray-700";
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <aside className="h-screen w-64 bg-white border-r-2 border-gray-200 shadow-md flex flex-col justify-between fixed left-0 top-0">
      <div>
        <div className="h-16 flex items-center justify-center font-bold text-2xl border-b border-gray-200">
          <span className="text-green-600 mr-2 text-3xl">SportZone</span>
        </div>
        <nav className="flex-1 px-2 py-6 space-y-1">
          {TABS.map(t => (
            <div
              key={t.key}
              className={linkClass + " " + (tab === t.key ? activeClass : inactiveClass)}
              onClick={() => setTab(t.key as TabKey)}
            >
              <span className="text-xl">{t.icon}</span> {t.label}
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button onClick={handleLogout} className="w-full border border-red-500 text-red-500 rounded-lg py-2 hover:bg-red-50 font-semibold">Đăng xuất</button>
      </div>
    </aside>
  );
} 