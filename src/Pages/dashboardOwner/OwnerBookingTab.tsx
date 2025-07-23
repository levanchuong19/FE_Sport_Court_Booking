import { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import api from "../../Config/api";
import type { Slot } from "../../Model/slot";
import type { JwtPayload } from "../../Model/user";
import { jwtDecode } from "jwt-decode";
import formatVND from "../../Utils/currency";

interface OwnerBookingTabProps {
  onDetail: (record: Slot) => void;
}

export default function OwnerBookingTab({ onDetail }: OwnerBookingTabProps) {
  const [bookings, setBookings] = useState<Slot[]>([]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      const user = decodedToken.sub;
      const response = await api.get("slot/getAll");
      const bookings = response.data.data.content.filter(
        (booking: Slot) => booking.ownerId === user
      );
      setBookings(bookings);
      console.log("response.data.data", response.data.data.content);
    } else {
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "accountUsername",
      key: "accountUsername",
    },
    { title: "Sân", dataIndex: "courtName", key: "courtName" },
    { title: "Ngày", dataIndex: "startDate", key: "startDate" },
    { title: "Giờ", dataIndex: "startTime", key: "startTime" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        if (status === "PENDING") return <Tag color="orange">Chờ xác nhận</Tag>;
        if (status === "BOOKED") return <Tag color="gray">Chờ Check-in</Tag>;
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
    </div>
  );
}
