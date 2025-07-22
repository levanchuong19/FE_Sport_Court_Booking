import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Config/api";

interface Profile {
    fullName: string;
    dateOfBirth: string;
    phone: string;
    gender: string;
    address: string;
    image: string;
}

export default function EditProfile() {
    const [profile, setProfile] = useState<Profile>({
        fullName: "",
        dateOfBirth: "",
        phone: "",
        gender: "",
        address: "",
        image: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/user/profile");
                setProfile(res.data);
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...profile,
            dateOfBirth: new Date(profile.dateOfBirth).toISOString(),
        };

        console.log("Payload gửi đi:", payload);

        try {
            const userStr = localStorage.getItem("user");
            const token = localStorage.getItem("token");

            if (!userStr || !token) {
                alert("Không tìm thấy user hoặc token.");
                return;
            }

            const userObj = JSON.parse(userStr);
            const userId = userObj?.account?.id;

            if (!userId) {
                alert("Không tìm thấy user ID.");
                return;
            }
            console.log("Payload gửi đi:", payload);
            await api.put(`/account/${userId}`, payload);

            alert("Cập nhật thành công!");
            navigate("/profile");
        } catch (err) {
            console.error("Update failed", err);
            alert("Lỗi khi cập nhật hồ sơ.");
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "CourtSportZone"); // 👈 cái bạn tạo ở Cloudinary

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dansvb29z/image/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        if (data.secure_url) {
            setProfile({ ...profile, image: data.secure_url });
        } else {
            alert("Lỗi khi upload ảnh.");
        }
    } catch (err) {
        console.error("Upload ảnh thất bại", err);
        alert("Lỗi khi upload ảnh.");
    }
};


    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
            <h2 className="text-2xl font-bold mb-6">Chỉnh sửa hồ sơ</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Họ và tên</label>
                    <input
                        type="text"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Ngày sinh</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={profile.dateOfBirth?.split("T")[0] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Số điện thoại</label>
                    <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Giới tính</label>
                    <select
                        name="gender"
                        value={profile.gender}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">-- Chọn giới tính --</option>
                        <option value="MALE">Nam</option>
                        <option value="FEMALE">Nữ</option>
                        <option value="OTHER">Khác</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-1">Địa chỉ</label>
                    <input
                        type="text"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Ảnh đại diện</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full p-2 border rounded"
                    />
                    {profile.image && (
                        <img
                            src={profile.image}
                            alt="Ảnh đại diện"
                            className="mt-2 w-32 h-32 object-cover rounded-full"
                        />
                    )}
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
    );
}
