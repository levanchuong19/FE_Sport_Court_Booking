import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Config/api";
import { useDispatch } from "react-redux";
import { login } from "../redux/features/userSlice";
import { FaPhoneAlt, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface LoginProps {
  phone: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginProps>({
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("auth/login", formData);
      if (response.data.status === true) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        dispatch(login(response.data.data.user));
        navigate("/");
      } else {
        throw new Error(response.data.data);
      }
    } catch (err: any) {
      const message = "Đăng nhập thất bại. Vui lòng thử lại.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate("/register");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 p-10 relative overflow-hidden">
        {/* Color Circles */}
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
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm bg-white">
          <h2 className="text-3xl font-bold text-center text-emerald-600 mb-2">
            Đăng nhập Sport-Zone
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Vui lòng nhập thông tin để đăng nhập
          </p>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                  <FaPhoneAlt />
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="0123456789"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  placeholder="••••••••"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </span>
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-emerald-600"
                />
                Ghi nhớ đăng nhập
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>
          <p className="mt-5 text-center text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <span
              onClick={handleSignIn}
              className="text-emerald-600 font-medium cursor-pointer transition-all duration-300 hover:text-emerald-700 hover:underline relative group"
            >
              Đăng ký ngay
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
