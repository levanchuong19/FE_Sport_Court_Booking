import { useState } from "react";
import { FiUser, FiMail, FiPhone, FiLock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../Config/api";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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
      const requestData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      const response = await api.post("auth/register", requestData);
      if (response.status === 200 || response.status === 201) {
        alert("Đăng ký thành công!");
        navigate("/login");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại."
      );
      console.error("Registration error:", err); // Add this for debugging
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left side */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 p-10 relative overflow-hidden">
        {/* Color */}
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
      <div className="relative flex flex-1 items-center justify-center px-6 sm:px-10 py-14 bg-white overflow-hidden">
        {/* Blur góc trên trái */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-300/30 rounded-full blur-3xl z-0" />

        {/* Blur góc dưới phải */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-400/30 rounded-full blur-3xl z-0" />
        <div className="w-full max-w-md bg-white p-10 shadow-2xl rounded-2xl border-gray-100 relative z-10">
          <h2 className="text-3xl font-bold text-center text-emerald-600 mb-2">
            Đăng ký Sport-Zone
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Vui lòng nhập thông tin bên dưới
          </p>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Fullname */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Họ và tên
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  placeholder="Nguyễn Văn A"
                />
                <FiUser className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  placeholder="you@example.com"
                />
                <FiMail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Số điện thoại
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10,11}"
                  maxLength={11}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  placeholder="0123456789"
                />
                <FiPhone className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
                  placeholder="••••••••"
                />
                <FiLock className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-all duration-200 text-lg font-semibold shadow-md ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </form>
          {/* Form Đăng Nhập Google :D */}
          <div className="flex justify-center mt-6">
            <GoogleOAuthProvider clientId="136882428338-vclkmobr196nsjj3g9eldo1nt6vm4fq2.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  console.log("Google credential:", credentialResponse.credential);
                  try {
                    const res = await api.post("auth/google/login", {
                      token: credentialResponse.credential,
                    });

                    const token = res.data?.data?.token;

                    if (token) {
                      localStorage.setItem("accessToken", token);
                      localStorage.setItem("token", res.data.data.token);
                      localStorage.setItem("user", JSON.stringify(res.data.data));
                      alert("Đăng Nhập thành công!");
                      navigate("/");
                    } else {
                      alert("Không tìm thấy token trong phản hồi từ server.");
                    }
                  } catch (err) {
                    console.error(err);
                    alert("Đăng Nhập thất bại!");
                  }
                }}
                onError={() => alert("Google login failed")}
                useOneTap
              />
            </GoogleOAuthProvider>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
