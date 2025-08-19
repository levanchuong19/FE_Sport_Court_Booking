/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Tag, Modal, Form, Input, Select, message } from "antd";
import formatDate from "../../Utils/date";
import { useEffect, useState } from "react";
import type { JwtPayload, User } from "../../Model/user";
import api from "../../Config/api";
import { jwtDecode } from "jwt-decode";

export default function OwnerStaffTab() {
  const [staffData, setStaffData] = useState<User[]>([]);
  const [form] = Form.useForm();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const fetchStaffData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      await api.get(`location/getByOwner/${decodedToken.sub}`);
      const response = await api.get("auth/account");
      const staff = response.data.data.filter(
        (user: User) =>
          user.role === "STAFF" && user.managerId === decodedToken.sub
      );
      setStaffData(staff);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  const handleCreate = async () => {
    try {
      const values = await form.validateFields();
      const token = localStorage.getItem("token");
      const decodedToken: JwtPayload = jwtDecode(token!);
      await api.post("/account", values, {
        params: { managerId: decodedToken.sub },
      });
      message.success("Tạo nhân viên thành công");
      setIsCreateModalOpen(false);
      form.resetFields();
      fetchStaffData();
    } catch (error: any) {
      console.error(
        "❌ Tạo nhân viên thất bại:",
        error.response?.data || error
      );
      message.error("Tạo nhân viên thất bại");
    }
  };

  const handleEdit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        fullName: values.fullName,
        dateOfBirth: new Date(values.dateOfBirth).toISOString(),
        gender: values.gender,
        address: values.address,
        phoneNumber: values.phone,
        image: "",
      };
      await api.put(`/account/${editingUser?.id}`, payload);
      message.success("Cập nhật thành công");
      setIsEditModalOpen(false);
      setEditingUser(null);
      fetchStaffData();
    } catch (error: any) {
      console.error("❌ Cập nhật thất bại:", error.response?.data || error);
      message.error("Cập nhật thất bại");
    }
  };

  const handleToggleStatus = async (user: User) => {
    try {
      const newStatus = !user.isDelete; // boolean
      await api.put(`/account/${user.id}/status`, { deleted: newStatus });
      message.success("Cập nhật trạng thái thành công");
      fetchStaffData();
    } catch (error) {
      console.error("❌ Toggle status failed", error);
      message.error("Cập nhật trạng thái thất bại");
    }
  };

  const columns = [
    { title: "Tên nhân viên", dataIndex: "fullName", key: "fullName" },
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
      render: (_: any, record: User) => (
        <>
          <Button
            size="small"
            onClick={() => {
              setEditingUser(record);
              form.setFieldsValue({
                fullName: record.fullName,
                phone: record.phone,
                gender: record.gender,
                address: record.address,
                dateOfBirth: formatDate(record.dateOfBirth), // Format ISO date
              });
              setIsEditModalOpen(true);
            }}
          >
            Sửa
          </Button>
          <Button
            danger
            size="small"
            style={{ marginLeft: 8 }}
            onClick={() => handleToggleStatus(record)}
          >
            {record.isDelete ? "Kích hoạt lại" : "Cho nghỉ việc"}
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Quản lý nhân viên</h2>
      <Button
        type="primary"
        className="mb-4"
        onClick={() => {
          form.resetFields();
          setIsCreateModalOpen(true);
        }}
      >
        Thêm nhân viên
      </Button>

      <Table
        columns={columns}
        dataSource={staffData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      {/* Modal Tạo Nhân Viên */}
      <Modal
        title="Tạo nhân viên"
        open={isCreateModalOpen}
        onCancel={() => setIsCreateModalOpen(false)}
        onOk={handleCreate}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                pattern: /^(84|0[3|5|7|8|9])\d{8}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, min: 6, message: "Tối thiểu 6 ký tự" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="gender" label="Giới tính">
            <Select
              options={[
                { label: "Nam", value: "Nam" },
                { label: "Nữ", value: "Nữ" },
              ]}
            />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Ngày sinh"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item name="role" label="Vai trò" initialValue="STAFF">
            <Select options={[{ value: "STAFF", label: "STAFF" }]} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal Sửa Nhân Viên */}
      <Modal
        title="Cập nhật nhân viên"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingUser(null);
        }}
        onOk={handleEdit}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="phone" label="Số điện thoại">
            <Input />
          </Form.Item>

          <Form.Item name="gender" label="Giới tính">
            <Select
              options={[
                { label: "Nam", value: "Nam" },
                { label: "Nữ", value: "Nữ" },
              ]}
            />
          </Form.Item>

          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>

          <Form.Item name="dateOfBirth" label="Ngày sinh">
            <Input type="date" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
