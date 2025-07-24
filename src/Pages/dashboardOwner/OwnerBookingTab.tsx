import { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import api from "../../Config/api";
import type { Slot } from "../../Model/slot";
import type { JwtPayload } from "../../Model/user";
import { jwtDecode } from "jwt-decode";
import formatVND from "../../Utils/currency";
import { customAlert } from "../../Components/customAlert";

interface OwnerBookingTabProps {
  onDetail: (record: Slot) => void;
}

export default function OwnerBookingTab({ onDetail }: OwnerBookingTabProps) {
  const [bookings, setBookings] = useState<Slot[]>([]);
  const [isBooked, setIsBooked] = useState<Slot[]>([]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      const user = decodedToken.sub;
      const response = await api.get("slot/getAll");
      const bookings = response.data.data.content.filter(
        (booking: Slot) => booking.ownerId === user
      );
      const booked = response.data.data.content.filter(
        (booking: Slot) =>
          booking.ownerId === user && booking.status === "BOOKED"
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

useEffect(() => {
  console.log("bookings", bookings);
  console.log("isBooked", isBooked);
}, [bookings, isBooked]);
  const handleCheckIn = async (values: Slot) => {
    await api.patch(`slot/${values.id}/checkIn`);
    customAlert("Thành Công", "Check-In thành công", "default");
    fetchBookings();
  };

  const renderStatus = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Tag color="orange">Chờ xác nhận</Tag>;
      case "BOOKED":
        return <Tag color="gray">Chờ Check-in</Tag>;
      case "CANCELED":
        return <Tag color="red">Đã hủy</Tag>;
      case "COMPLETED":
        return <Tag color="green">Đã hoàn thành</Tag>;
      case "CHECKED_IN":
        return <Tag color="blue">Đã Check-In</Tag>;
      default:
        return <Tag color="default">{status}</Tag>;
    }
  };

  const renderBookingStatus = (bookingStatus: string) => {
    switch (bookingStatus) {
      case "PAID":
        return <Tag color="green">Đã thanh toán</Tag>;
      case "PENDING":
        return <Tag color="orange">Chờ thanh toán</Tag>;
      case "OVERDUE":
        return <Tag color="red">Quá hạn</Tag>;
      case "UNPAID":
        return <Tag color="volcano">Chưa thanh toán</Tag>;
      default:
        return <Tag color="default">{bookingStatus}</Tag>;
    }
  };

  const columns = [
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
      render: renderStatus,
    },
    {
      title: "Thanh toán",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: renderBookingStatus,
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
      render: renderStatus,
    },
    {
      title: "Thanh toán",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: renderBookingStatus,
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