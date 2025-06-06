import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <header className="w-full bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-emerald-600">SportZone</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="/" className="hover:text-emerald-600 font-medium">
            Trang chủ
          </a>
          <a href="#" className="hover:text-emerald-600 font-medium">
            Tìm sân
          </a>
          <a href="#" className="hover:text-emerald-600 font-medium">
            Thể loại
          </a>
          <a href="/guide" className="hover:text-emerald-600 font-medium">
            Hướng dẫn & Liên hệ
          </a>
        </nav>
        <div className="flex gap-2">
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
        </div>
      </div>
    </header>
  );
}
export default Header;
