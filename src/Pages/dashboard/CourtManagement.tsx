import { Plus, Search } from "lucide-react";


const fields = [
  {
    id: "F001",
    name: "Sân bóng đá Mini 5v5",
    type: "Bóng đá",
    location: "Quận 1, TP.HCM",
    price: "250,000đ/giờ",
    status: "Hoạt động",
    statusColor: "bg-green-500 text-white",
  },
  {
    id: "F002",
    name: "Sân tennis số 3",
    type: "Tennis",
    location: "Quận 3, TP.HCM",
    price: "175,000đ/giờ",
    status: "Hoạt động",
    statusColor: "bg-green-500 text-white",
  },
  {
    id: "F003",
    name: "Sân bóng rổ ngoài trời",
    type: "Bóng rổ",
    location: "Quận 7, TP.HCM",
    price: "200,000đ/giờ",
    status: "Bảo trì",
    statusColor: "bg-yellow-400 text-white",
  },
  {
    id: "F004",
    name: "Sân cầu lông số 2",
    type: "Cầu lông",
    location: "Quận 5, TP.HCM",
    price: "125,000đ/giờ",
    status: "Hoạt động",
    statusColor: "bg-green-500 text-white",
  },
];

export default function CourtManagement() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý sân thể thao</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700">
          <span><Plus /></span> Thêm sân mới
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input className="border border-gray-200 rounded-lg px-3 py-2 w-64" placeholder="Tìm kiếm sân..." />
        <button className="border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1">
          <span><Search /></span> Lọc
        </button>
        <select className="border border-gray-200 rounded-lg px-3 py-2">
          <option>Tất cả loại sân</option>
          <option>Bóng đá</option>
          <option>Tennis</option>
          <option>Bóng rổ</option>
          <option>Cầu lông</option>
        </select>
        <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">Danh sách</button>
        <button className="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-lg font-semibold">Lưới</button>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Mã sân</th>
              <th className="py-2 px-4 text-left">Tên sân</th>
              <th className="py-2 px-4 text-left">Loại</th>
              <th className="py-2 px-4 text-left">Địa điểm</th>
              <th className="py-2 px-4 text-left">Giá</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-2 px-4 font-semibold">{f.id}</td>
                <td className="py-2 px-4">{f.name}</td>
                <td className="py-2 px-4">{f.type}</td>
                <td className="py-2 px-4">{f.location}</td>
                <td className="py-2 px-4">{f.price}</td>
                <td className="py-2 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs ${f.statusColor}`}>{f.status}</span>
                </td>
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
