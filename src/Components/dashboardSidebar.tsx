import { NavLink, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  ChartNoAxesCombined,
  LayoutDashboard,
  MapPinHouse,
  MapPinned,
  Users,
} from "lucide-react";

function DashboardSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkClass =
    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors";
  const activeClass = "bg-green-600 text-white shadow hover:bg-green-600";
  const inactiveClass = "hover:bg-gray-100 text-gray-700";

  return (
    <aside className="h-screen w-64 bg-white border-r-2 border-gray-200 shadow-md flex flex-col justify-between fixed left-0 top-0">
      <div>
        <div className="h-16 flex items-center justify-center font-bold text-2xl border-b border-gray-200">
          <span className="text-green-600 mr-2 text-3xl">SportZone</span>
        </div>
        <nav className="flex-1 px-2 py-6 space-y-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `${linkClass} ${
                isActive ? activeClass : inactiveClass
              } hover:bg-gray-100`
            }
          >
            <span className="text-xl">
              <LayoutDashboard />
            </span>{" "}
            Tổng quan
          </NavLink>
          <NavLink
            to="/dashboard/booking"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <span className="text-xl">
              <CalendarDays />
            </span>{" "}
            Quản lý đặt sân
          </NavLink>
          <NavLink
            to="/dashboard/businessLocation"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <span className="text-xl">
              <MapPinHouse />
            </span>{" "}
            Quản lý địa điểm
          </NavLink>
          <NavLink
            to="/dashboard/court"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <span className="text-xl">
              <MapPinned />
            </span>{" "}
            Quản lý sân
          </NavLink>
          <NavLink
            to="/dashboard/user"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <span className="text-xl">
              <Users />
            </span>{" "}
            Quản lý người dùng
          </NavLink>
          <NavLink
            to="/dashboard/statistic"
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            <span className="text-xl">
              <ChartNoAxesCombined />
            </span>{" "}
            Thống kê
          </NavLink>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full border border-red-500 text-red-500 rounded-lg py-2 hover:bg-red-50 font-semibold"
        >
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
export default DashboardSidebar;
