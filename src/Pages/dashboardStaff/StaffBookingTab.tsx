import { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
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

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      const user = decodedToken.sub;
      const account = await api.get(`auth/account/${user}`);
      const response = await api.get("slot/getAll");
      const bookings = response.data.data.content.filter(
        (booking: Slot) => booking.ownerId === account.data.data.managerId
      );
      const booked = response.data.data.content.filter(
        (booking: Slot) =>
          booking.ownerId === account.data.data.managerId &&
          booking.status === "BOOKED"
      );
      setBookings(bookings);
      setIsBooked(booked);
    } else {
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCheckIn = async (values: Slot) => {
    const response = await api.patch(`slot/${values.id}/checkIn`);
    console.log("response", response.data.data);
    customAlert("Thành Công", "Check-In thành công", "default");
    fetchBookings();
  };

  const columnCheckIn = [
    {
      title: "Khách hàng",
      dataIndex: "accountUsername",
      key: "accountUsername",
    },
    { title: "Sân", dataIndex: "courtName", key: "courtName" },
    { title: "Ngày", dataIndex: "startDate", key: "startDate" },
    { title: "Giờ bắt đầu", dataIndex: "startTime", key: "startTime" },
    { title: "Giờ kết thúc", dataIndex: "endTime", key: "endTime" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        if (status === "PENDING")
          return <Tag color="orange">Chưa thanh toán</Tag>;
        if (status === "BOOKED") return <Tag color="gray">Sắp tới</Tag>;
        if (status === "CANCELED") return <Tag color="red">Đã hủy</Tag>;
        if (status === "COMPLETED")
          return <Tag color="green">Đã hoàn thành</Tag>;
        return <Tag color="default">{status}</Tag>;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => formatVND(price),
    },
    {
      title: "",
      key: "detail",
      render: (_: any, record: Slot) => (
        <Button type="primary" onClick={() => handleCheckIn(record)}>
          Check-In
        </Button>
      ),
    },
  ];

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "accountUsername",
      key: "accountUsername",
    },
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
        if (status === "PENDING")
          return <Tag color="orange">Chưa thanh toán</Tag>;
        if (status === "BOOKED") return <Tag color="gray">Sắp tới</Tag>;
        if (status === "CANCELED") return <Tag color="red">Đã hủy</Tag>;
        if (status === "COMPLETED")
          return <Tag color="green">Đã hoàn thành</Tag>;
        return <Tag color="default">{status}</Tag>;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => formatVND(price),
    },
    {
      title: "",
      key: "detail",
      render: (_: any, record: Slot) => (
        <a onClick={() => onDetail(record)}>Chi tiết</a>
      ),
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Quản lý đặt sân</h2>
      <Table
        columns={columns}
        dataSource={bookings}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <h2 className="text-xl font-semibold mb-2">Check-In</h2>
      <Table
        columns={columnCheckIn}
        dataSource={isBooked}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
