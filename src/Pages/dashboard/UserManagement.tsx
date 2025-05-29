import { Plus, Search } from "lucide-react";
import React from "react";

const users = [
  {
    id: "U001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    role: "Người dùng",
    roleColor: "bg-gray-400 text-white",
    status: "Hoạt động",
    statusColor: "bg-green-500 text-white",
    joined: "01/01/2025",
    avatar: "https://ui-avatars.com/api/?name=Nguyen+Van+A&background=eee&color=888&size=32",
  },
  {
    id: "U002",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0901234568",
    role: "Người dùng",
    roleColor: "bg-gray-400 text-white",
    status: "Hoạt động",
    statusColor: "bg-green-500 text-white",
    joined: "15/01/2025",
    avatar: "https://ui-avatars.com/api/?name=Tran+Thi+B&background=eee&color=888&size=32",
  },
  {
    id: "U003",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0901234569",
    role: "Admin",
    roleColor: "bg-purple-500 text-white",
    status: "Hoạt động",
    statusColor: "bg-green-500 text-white",
    joined: "20/01/2025",
    avatar: "https://ui-avatars.com/api/?name=Le+Van+C&background=eee&color=888&size=32",
  },
  {
    id: "U004",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0901234570",
    role: "Người dùng",
    roleColor: "bg-gray-400 text-white",
    status: "Không hoạt động",
    statusColor: "bg-red-500 text-white",
    joined: "05/02/2025",
    avatar: "https://ui-avatars.com/api/?name=Pham+Thi+D&background=eee&color=888&size=32",
  },
];

export default function UserManagement() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700">
          <span><Plus /></span> Thêm người dùng
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input className="border border-gray-200 rounded-lg px-3 py-2 w-64" placeholder="Tìm kiếm người dùng..." />
        <button className="border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1">
          <span><Search /></span> Lọc
        </button>
        <select className="border border-gray-200 rounded-lg px-3 py-2">
          <option>Tất cả vai trò</option>
          <option>Người dùng</option>
          <option>Admin</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2">
          <option>Tất cả trạng thái</option>
          <option>Hoạt động</option>
          <option>Không hoạt động</option>
        </select>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Người dùng</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Số điện thoại</th>
              <th className="py-2 px-4 text-left">Vai trò</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">Ngày tham gia</th>
              <th className="py-2 px-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-2 px-4 font-semibold">{u.id}</td>
                <td className="py-2 px-4 flex items-center gap-2">
                  <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full bg-gray-200" />
                  <span>{u.name}</span>
                </td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.phone}</td>
                <td className="py-2 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${u.roleColor}`}>{u.role}</span>
                </td>
                <td className="py-2 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${u.statusColor}`}>{u.status}</span>
                </td>
                <td className="py-2 px-4">{u.joined}</td>
                <td className="py-2 px-4">
                  <button className="px-2 py-1 rounded hover:bg-gray-100">...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 