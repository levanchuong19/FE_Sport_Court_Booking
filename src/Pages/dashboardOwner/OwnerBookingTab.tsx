import { useEffect, useState } from "react";
import { Table } from "antd";
import api from "../../Config/api";
import type { Slot } from "../../Model/slot";
import type { JwtPayload } from "../../Model/user";
import { jwtDecode } from "jwt-decode";

interface OwnerBookingTabProps {
  onDetail: (record: Slot) => void;
}

export default function OwnerBookingTab({ onDetail }: OwnerBookingTabProps) {
  const [bookings, setBookings] = useState<Slot[]>([]);

  const fetchBookings = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      const response = await api.get(`slot/getBookingByAccount/${decodedToken.sub}`)
      setBookings(Array.isArray(response.data.data.bookings) ? response.data.data.bookings : [])
      console.log("response.data.data", response.data.data.bookings);

    } else {
      setBookings([]);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  const columns = [
    { title: "Khách hàng", dataIndex: "customerName", key: "customerName" },
    { title: "Sân", dataIndex: "courtName", key: "courtName" },
    { title: "Thời gian", dataIndex: "time", key: "time" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "", key: "detail", render: (_: any, record: Slot) => <a onClick={() => onDetail(record)}>Chi tiết</a> },
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