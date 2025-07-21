import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Config/api";
import type { ForgotPassword as ForgotPasswordType } from "../Model/forgotPassword";

function ForgotPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<ForgotPasswordType>({
    email: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await api.post("/auth/forgot-password", formData);
      if (response.data.code === 200) {
        setSuccess("Mật khẩu mới đã được gửi về email của bạn.");
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setError("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Gửi yêu cầu thất bại, vui lòng thử lại.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Left side */}
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-emerald-900 via-emerald-700 to-emerald-500 p-10 relative overflow-hidden">
        <div className="absolute inset-0">
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
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Back */}
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại đăng nhập
          </button>

          {/* Form Card */}
          <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <Mail className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Khôi phục mật khẩu
              </h3>
              <p className="text-sm text-gray-600">
                Nhập email tài khoản của bạn để nhận mật khẩu mới.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded text-sm border border-red-200">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 text-green-600 rounded text-sm border border-green-200 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2" />
                {success}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  placeholder="example@email.com"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition ${
                  isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Đang gửi..." : "Xác nhận email"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
