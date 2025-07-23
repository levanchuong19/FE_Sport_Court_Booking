import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Slot } from "../../Model/slot";
import api from "../../Config/api";
import formatDate from "../../Utils/date";
import formatVND from "../../Utils/currency";
import { Button, Dropdown, Menu } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

const bookingData = [
  {
    id: "B001",
    customer: "Nguyễn Văn A",
    phone: "0901234567",
    field: "Sân bóng đá Mini 5v5",
    date: "15/05/2025",
    time: "15:00 - 17:00",
    price: "500,000đ",
    status: "Đã xác nhận",
    statusColor: "bg-green-500 text-white",
  },
  {
    id: "B002",
    customer: "Trần Thị B",
    phone: "0901234568",
    field: "Sân tennis số 3",
    date: "15/05/2025",
    time: "08:00 - 10:00",
    price: "350,000đ",
    status: "Chờ xác nhận",
    statusColor: "bg-yellow-400 text-white",
  },
  {
    id: "B003",
    customer: "Lê Văn C",
    phone: "0901234569",
    field: "Sân bóng rổ ngoài trời",
    date: "15/05/2025",
    time: "19:00 - 21:00",
    price: "400,000đ",
    status: "Đã xác nhận",
    statusColor: "bg-green-500 text-white",
  },
  {
    id: "B004",
    customer: "Phạm Thị D",
    phone: "0901234570",
    field: "Sân cầu lông số 2",
    date: "15/05/2025",
    time: "17:00 - 19:00",
    price: "250,000đ",
    status: "Đã huỷ",
    statusColor: "bg-red-500 text-white",
  },
];

export default function BookingManagement() {
  const [bookings, setIsBooking] = useState<Slot[]>([]);

  const fetchBooking = async () => {
      const response = await api.get("slot/getAll")
      setIsBooking(response.data.data.content);
  }

  useEffect(()=> {
    fetchBooking();
  },[])

  const menu = (
    <Menu>
      <Menu.Item key="edit" onClick={() => {/* TODO: Thêm logic sửa */}}>
        Sửa
      </Menu.Item>
      <Menu.Item key="delete" onClick={() => {/* TODO: Thêm logic xóa */}} danger>
        Xóa
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý đặt sân</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700">
          <span>
            <Plus />
          </span>{" "}
          Tạo đặt sân mới
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 w-64 "
          placeholder="Tìm kiếm đặt sân..."
        />
        <button className="border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1">
          <span>
            <Search />
          </span>{" "}
          Lọc
        </button>
        <select className="border border-gray-200 rounded-lg px-3 py-2">
          <option>Tất cả trạng thái</option>
          <option>Đã xác nhận</option>
          <option>Chờ xác nhận</option>
          <option>Đã huỷ</option>
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2">
          <option>Hôm nay</option>
          <option>Tuần này</option>
          <option>Tháng này</option>
        </select>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 ">
              <th className="py-2 px-4 text-left">Khách hàng</th>
              <th className="py-2 px-4 text-left">Sân</th>
              <th className="py-2 px-4 text-left">Ngày</th>
              <th className="py-2 px-4 text-left">Giờ</th>
              <th className="py-2 px-4 text-left">Giá</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(bookings) && bookings.map((b, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-2 px-4">
                  {b.accountUsername}
                  <div className="text-xs text-gray-500">{b.account?.phone}</div>
                </td>
                <td className="py-2 px-4">{b.courtName}</td>
                <td className="py-2 px-4">{formatDate(b?.createAt)}</td>
                <td className="py-2 px-4">{b.startTime + "- " + b.endTime}</td>
                <td className="py-2 px-4">{formatVND(b.price)}</td>
                <td className="py-2 px-4">
                <span className={`px-3 py-1 rounded-full text-xs ${b.status === "COMPLETED"
                  ? "bg-green-500 text-white"
                  : b.status === "CANCELED"
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-black"
                  }`}
                  >
                  {b.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
      
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
