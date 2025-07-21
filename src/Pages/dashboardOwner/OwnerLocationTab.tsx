import { useEffect, useState } from "react";
import { Table } from "antd";
import api from "../../Config/api";
import type { BusinessLocation } from "../../Model/businessLocation";
import type { JwtPayload } from "../../Model/user";
import { jwtDecode } from "jwt-decode";

interface OwnerLocationTabProps {
  onDetail: (record: BusinessLocation) => void;
}

export default function OwnerLocationTab({ onDetail }: OwnerLocationTabProps) {
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      api.get(`location/getByOwner/${decodedToken.sub}`)
      .then(res => setLocations(Array.isArray(res.data.data) ? res.data.data : []))
      .catch(() => setLocations([]))
      .finally(() => setLoading(false));
    } else {
      setLocations([]);
      setLoading(false);
    }
  }, []);

  const columns = [
    { title: "Tên địa điểm", dataIndex: "name", key: "name" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    { title: "", key: "detail", render: (_: any, record: BusinessLocation) => <a onClick={() => onDetail(record)}>Chi tiết</a> },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Quản lý địa điểm</h2>
      <Table
        columns={columns}
        dataSource={locations}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
} 