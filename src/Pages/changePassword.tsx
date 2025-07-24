import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../Config/api";
import type { JwtPayload } from "../Model/user";
import type { ChangePassword } from "../Model/changePassword";
import { Eye, EyeOff } from "lucide-react";
import { customAlert } from "../Components/customAlert";

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  const [accountId, setAccountId] = useState<string>("");
  const [form, setForm] = useState<ChangePassword>({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    customAlert("Warning", "Nếu đăng nhập bằng Google sẽ không thể đổi mật khẩu", "default");
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
      setAccountId(decoded.sub);
    } catch (error) {
      console.error("Token decode failed", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmNewPassword) {
      customAlert("Lỗi", "Mật khẩu xác nhận không khớp.", "destructive");
      return;
    }

    if (form.newPassword.length < 6) {
      customAlert(
        "Lỗi",
        "Mật khẩu mới phải có ít nhất 6 ký tự.",
        "destructive"
      );
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/change-password", form, {
        headers: {
          accountId: accountId,
        },
      });
      customAlert("Thành công", "Đổi mật khẩu thành công!", "default");
      localStorage.removeItem("token");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: any) {
      const errMsg = error?.response?.data?.message || "Lỗi không xác định.";
      customAlert("Lỗi", "Lỗi không xác định", "destructive");
    } finally {
      setLoading(false);
    }
  };

  const togglePassword = (field: "current" | "new" | "confirm") => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const renderPasswordInput = (
    name: keyof ChangePassword,
    label: string,
    show: boolean,
    onToggle: () => void,
    value: string
  ) => (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          required
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500 hover:text-emerald-700"
          onClick={onToggle}
        >
          {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-50 px-4">
      <div className="w-full max-w-md bg-white border border-emerald-100 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
          Đổi mật khẩu
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderPasswordInput(
            "password",
            "Mật khẩu hiện tại",
            showPassword.current,
            () => togglePassword("current"),
            form.password
          )}
          {renderPasswordInput(
            "newPassword",
            "Mật khẩu mới",
            showPassword.new,
            () => togglePassword("new"),
            form.newPassword
          )}
          {renderPasswordInput(
            "confirmNewPassword",
            "Xác nhận mật khẩu mới",
            showPassword.confirm,
            () => togglePassword("confirm"),
            form.confirmNewPassword
          )}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-colors ${
              loading
                ? "bg-emerald-300 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Đang xử lý..." : "Xác nhận đổi mật khẩu"}
          </button>
        </form>
      </div>
    </div>
  );
}
