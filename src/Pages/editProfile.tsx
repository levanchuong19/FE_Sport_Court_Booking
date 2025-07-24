import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Config/api";

interface Profile {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  gender: string;
  address: string;
  image: string;
}

export default function EditProfile() {
  const [profile, setProfile] = useState<Profile>({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    address: "",
    image: "",
  });

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!id) return;
        const res = await api.get(`/auth/account/${id}`);
        const account = res.data?.data;

        if (account) {
          setProfile({
            fullName: account.fullName || "",
            dateOfBirth: account.dateOfBirth?.split("T")[0] || "",
            phoneNumber: account.phone || "",
            gender: account.gender || "",
            address: account.address || "",
            image: account.image || "",
          });
        }
      } catch (err) {
        console.error("❌ Lỗi khi tải thông tin:", err);
        alert("Không thể tải thông tin hồ sơ");
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "CourtSportZone");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dansvb29z/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setProfile((prev) => ({ ...prev, image: data.secure_url }));
      } else {
        alert("Lỗi khi upload ảnh.");
      }
    } catch (err) {
      console.error("Upload ảnh thất bại:", err);
      alert("Upload ảnh thất bại.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) return;

    const payload = {
      fullName: profile.fullName,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
      address: profile.address,
      phoneNumber: profile.phoneNumber,
      image: profile.image,
    };

    console.log("📤 Payload gửi lên:", payload);

    try {
      const res = await api.put(`/account/${id}`, payload);
      console.log("Cập nhật thành công:", res.data);
      alert("Cập nhật thành công");
      navigate("/profile");
    } catch (err: any) {
      console.error("Cập nhật thất bại:", err?.response?.data || err.message);
      alert("Cập nhật thất bại");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-emerald-200">
        <h2 className="text-3xl font-bold text-emerald-600 mb-8 text-center">
          Chỉnh sửa hồ sơ cá nhân
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative w-32 h-32 mx-auto">
            <img
              src={profile.image}
              alt="Avatar"
              className="w-32 h-32 object-cover rounded-full border-4 border-emerald-500 shadow-lg"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity rounded-full cursor-pointer">
              <span className="text-white font-semibold text-sm">Đổi ảnh</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Họ và tên
            </label>
            <input
              type="text"
              name="fullName"
              value={profile.fullName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày sinh
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số điện thoại
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giới tính
            </label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            >
              <option value="">-- Chọn giới tính --</option>
              <option value="MALE">Nam</option>
              <option value="FEMALE">Nữ</option>
              <option value="OTHER">Khác</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Địa chỉ
            </label>
            <input
              type="text"
              name="address"
              value={profile.address}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
              required
            />
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
