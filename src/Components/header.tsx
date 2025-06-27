import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/features/userSlice";

function Header() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    setToken(null);
    setShowDropdown(false);
    navigate("/");
  };

  const goToProfile = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  const goToHistory = () => {
    setShowDropdown(false);
    navigate("/history");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-2">
          <span
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-emerald-600 cursor-pointer"
          >
            SportZone
          </span>
        </div>

        <nav className="hidden md:flex gap-6">
          <a href="/" className="hover:text-emerald-600 font-medium">
            Trang chủ
          </a>
          <a href="/court" className="hover:text-emerald-600 font-medium">
            Tìm sân
          </a>
          <a
            href="/registerPartner"
            className="hover:text-emerald-600 font-medium"
          >
            Trở thành đối tác
          </a>
          <a href="/guide" className="hover:text-emerald-600 font-medium">
            Hướng dẫn & Liên hệ
          </a>
        </nav>

        <div className="flex items-center gap-2 relative" ref={dropdownRef}>
          {token ? (
            <>
              <img
                onClick={() => setShowDropdown(!showDropdown)}
                src="https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"
                alt="avatar"
                className="w-9 h-9 rounded-full cursor-pointer object-cover"
              />
              {showDropdown && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white shadow-lg rounded-md py-2 border z-50">
                  <button
                    onClick={goToProfile}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  >
                    Trang cá nhân
                  </button>
                  <button
                    onClick={goToHistory}
                    className="block w-full px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
                  >
                    Lịch sử đặt sân
                  </button>
                  <div className="my-1 border-t border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                className="hidden sm:inline-block px-4 py-2 text-sm font-medium hover:text-emerald-600"
                onClick={handleLogin}
              >
                Đăng nhập
              </button>
              <button
                onClick={handleRegister}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Đăng ký
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
