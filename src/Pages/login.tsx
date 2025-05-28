import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/register");
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 p-10 relative overflow-hidden">
        {/*Color */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-[10%] left-[20%] w-72 h-72 rounded-full bg-emerald-300/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-64 h-64 rounded-full bg-emerald-200/10 blur-3xl animate-pulse delay-700" />
          <div className="absolute top-[40%] right-[30%] w-60 h-60 rounded-full bg-emerald-400/10 blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10 text-white flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 leading-snug">
            Chào mừng bạn đến với Sport-Zone
          </h2>
          <p className="text-lg leading-relaxed">
            Đặt lịch sân thể thao dễ dàng – Tận hưởng những giờ chơi chất lượng
            cùng bạn bè và đồng nghiệp.
          </p>
          <div className="bg-white rounded-xl mt-10 flex justify-center">
            <img
              src="/src/assets/Sportzone.svg"
              alt="Logo"
              className="h-36 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="flex flex-1 items-center justify-center px-6 sm:px-10 py-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-emerald-600 mb-2">
            Đăng nhập Sport-Zone
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Vui lòng nhập thông tin để đăng nhập
          </p>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
            >
              Đăng nhập
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <a
              onClick={handleSignIn}
              className="text-emerald-600 font-medium cursor-pointer transition-all duration-300 hover:text-emerald-700 hover:underline-offset-4 hover:underline relative group"
            >
              Đăng ký ngay
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
