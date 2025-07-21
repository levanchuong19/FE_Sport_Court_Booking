import { useEffect, useState } from "react";
import { Table } from "antd";
import api from "../../Config/api";
import type { Court } from "../../Model/court";
import type { JwtPayload } from "../../Model/user";
import { jwtDecode } from "jwt-decode";

interface OwnerCourtTabProps {
  onDetail: (record: Court) => void;
}

export default function OwnerCourtTab({ onDetail }: OwnerCourtTabProps) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      api.get(`location/getCourtsByOwnerId/${decodedToken.sub}`)
      .then(res => setCourts(Array.isArray(res.data.data.content) ? res.data.data.content : []))
      .catch(() => setCourts([]))
      .finally(() => setLoading(false));
    } else {
      setCourts([]);
      setLoading(false);
    }
  }, []);

  const columns = [
    { title: "Tên sân", dataIndex: "name", key: "name" },
    { title: "Loại sân", dataIndex: "type", key: "type" },
    { title: "Giá", dataIndex: "price", key: "price" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "", key: "detail", render: (_: any, record: Court) => <a onClick={() => onDetail(record)}>Chi tiết</a> },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Quản lý sân</h2>
      <Table
        columns={columns}
        dataSource={courts}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
} 