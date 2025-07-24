import { Table, Button, Tag } from "antd";
import formatDate from "../../Utils/date";
import { useEffect, useState } from "react";
import type { JwtPayload, User } from "../../Model/user";
import api from "../../Config/api";
import { jwtDecode } from "jwt-decode";

export default function OwnerStaffTab() {
  const [staffData, setStaffData] = useState<User[]>([]);

  const fetchStaffData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      api.get(`location/getByOwner/${decodedToken.sub}`);
      const response = await api.get("auth/account");
      const staff = response.data.data.filter(
        (user: User) =>
          user.role === "STAFF" && user.managerId === decodedToken.sub
      );
      setStaffData(staff);
      console.log(staff);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const columns = [
    { title: "Tên nhân viên", dataIndex: "username", key: "username" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Số điện thoại", dataIndex: "phone", key: "phone" },
    { title: "Vai trò", dataIndex: "role", key: "role" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    {
      title: "Trạng thái",
      dataIndex: "isDelete",
      key: "isDelete",
      render: (isDelete: boolean) =>
        isDelete ? (
          <Tag color="red">Đã nghỉ</Tag>
        ) : (
          <Tag color="green">Đang làm</Tag>
        ),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt: Date) => formatDate(createAt),
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => <Button size="small">Sửa</Button>,
    },
  ];
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý nhân viên</h2>
      <Table
        columns={columns}
        dataSource={staffData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
