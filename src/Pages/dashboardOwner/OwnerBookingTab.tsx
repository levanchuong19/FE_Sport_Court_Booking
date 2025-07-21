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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      api.get(`slot/getBookingByAccount/${decodedToken.sub}`)
      .then(res => setBookings(Array.isArray(res.data.data) ? res.data.data : []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
    } else {
      setBookings([]);
      setLoading(false);
    }
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
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
} 