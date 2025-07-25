import { useEffect, useState } from "react";
import { Button, Table, Tag, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import api from "../../Config/api";
import type { Slot } from "../../Model/slot";
import type { JwtPayload } from "../../Model/user";
import { jwtDecode } from "jwt-decode";
import formatVND from "../../Utils/currency";
import { customAlert } from "../../Components/customAlert";

interface StaffBookingTabProps {
  onDetail: (record: Slot) => void;
}

export default function StaffBookingTab({ onDetail }: StaffBookingTabProps) {
  const [bookings, setBookings] = useState<Slot[]>([]);
  const [isBooked, setIsBooked] = useState<Slot[]>([]);
  const [searchText, setSearchText] = useState("");
  const [checkInSearchText, setCheckInSearchText] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken: JwtPayload = jwtDecode(token);
        const user = decodedToken.sub;
        const account = await api.get(`auth/account/${user}`);
        const response = await api.get("slot/getAll");
        const all = response.data.data.content.filter(
          (booking: Slot) => booking.ownerId === account.data.data.managerId
        );
        setBookings(all);
        setIsBooked(all.filter((b) => b.status === "BOOKED"));
      } else {
        setBookings([]);
      }
    };
    fetchBookings();
  }, []);

  const handleCheckIn = async (slot: Slot) => {
    await api.patch(`slot/${slot.id}/checkIn`);
    customAlert("Thành Công", "Check-In thành công", "default");
    location.reload(); // reload toàn bộ để tránh lỗi trạng thái không khớp
  };

  const filterSlots = (list: Slot[], keyword: string) =>
    list.filter(
      (s) =>
        s.accountUsername.toLowerCase().includes(keyword.toLowerCase()) ||
        s.phone.includes(keyword)
    );

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "accountUsername",
      key: "accountUsername",
    },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Sân", dataIndex: "courtName", key: "courtName" },
    { title: "Ngày bắt đầu", dataIndex: "startDate", key: "startDate" },
    { title: "Ngày kết thúc", dataIndex: "endDate", key: "endDate" },
    { title: "Giờ bắt đầu", dataIndex: "startTime", key: "startTime" },
    { title: "Giờ kết thúc", dataIndex: "endTime", key: "endTime" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const tagColor =
          status === "PENDING"
            ? "orange"
            : status === "BOOKED"
            ? "gray"
            : status === "IN_USE"
            ? "blue"
            : status === "CANCELED"
            ? "red"
            : "green";
        const label =
          status === "PENDING"
            ? "Chưa thanh toán"
            : status === "BOOKED"
            ? "Sắp tới"
            : status === "IN_USE"
            ? "Đang hoạt động"
            : status === "CANCELED"
            ? "Đã hủy"
            : "Đã hoàn thành";
        return <Tag color={tagColor}>{label}</Tag>;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => formatVND(price),
    },
  ];

  const columnsCheckIn = [
    ...columns,
    {
      title: "",
      key: "action",
      render: (_: any, record: Slot) => (
        <Button type="primary" onClick={() => handleCheckIn(record)}>
          Check-In
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Quản lý đặt sân</h2>
        <Input
          placeholder="Tìm tên hoặc số điện thoại"
          prefix={<SearchOutlined />}
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-3 max-w-sm"
        />
        <Table
          columns={columns}
          dataSource={filterSlots(bookings, searchText)}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Check-In</h2>
        <Input
          placeholder="Tìm tên hoặc số điện thoại"
          prefix={<SearchOutlined />}
          allowClear
          value={checkInSearchText}
          onChange={(e) => setCheckInSearchText(e.target.value)}
          className="mb-3 max-w-sm"
        />
        <Table
          columns={columnsCheckIn}
          dataSource={filterSlots(isBooked, checkInSearchText)}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}
