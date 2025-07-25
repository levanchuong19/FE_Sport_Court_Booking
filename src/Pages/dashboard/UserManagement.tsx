import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "../../Model/user";
import api from "../../Config/api";
import formatDate from "../../Utils/date";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Popover,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { EllipsisOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isSearch, setIsSearch] = useState("");
  const [role, setRole] = useState("ALL");
  const [isDelete, setIsDelete] = useState("ALL");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = useForm();
  const [openId, setOpenId] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleOk = () => {
    form.submit();
  };

  const handleSubmit = async (values: User) => {
    if (editingUser) {
      await api.put(`account/${editingUser.id}`, values);
    } else {
      await api.post("account", values);
    }

    setIsOpenModal(false);
    setEditingUser(null);
    form.resetFields();
    fetchUsers();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`account/${id}`);
    fetchUsers();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsOpenModal(true);
    form.setFieldsValue({
      ...user,
      dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
    });
  };

  const filterUsers = users.filter((u) => {
    const isNotAdmin = u.role !== "ADMIN";
    const matchName = u.fullName.toLowerCase().includes(isSearch.toLowerCase());
    const matchRole = role === "ALL" || u.role === role;
    const matchStatus =
      isDelete === "ALL" ||
      (isDelete === "Đã xóa" && u.isDelete) ||
      (isDelete === "Hoạt động" && !u.isDelete);
    return isNotAdmin && matchName && matchRole && matchStatus;
  });

  const fetchUsers = async () => {
    const response = await api.get("auth/account");
    setUsers(response.data.data);
    console.log(response.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý người dùng</h1>
        <button
          onClick={handleOpenModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700"
        >
          <span>
            <Plus />
          </span>{" "}
          Thêm người dùng
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 w-64"
          placeholder="Tìm kiếm người dùng..."
          value={isSearch}
          onChange={(e) => {
            setIsSearch(e.target.value);
          }}
        />
        <button className="border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1">
          <span>
            <Search />
          </span>{" "}
          Lọc
        </button>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ALL">Tất cả vai trò</option>
          <option value="CUSTOMER">Người dùng</option>
          <option value="STAFF">Nhân viên</option>
          <option value="MANAGER">Quản lý</option>
        </select>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2"
          value={isDelete}
          onChange={(e) => setIsDelete(e.target.value)}
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="Hoạt động">Hoạt động</option>
          <option value="Đã xóa">Không hoạt động</option>
        </select>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Account</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Số điện thoại</th>
              <th className="py-2 px-4 text-left">Role</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">Ngày tham gia</th>
              <th className="py-2 px-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers.map((u, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-2 px-4 flex items-center gap-2">
                  <img
                    src={
                      u.image ||
                      "https://img.lovepik.com/png/20231026/Gray-avatar-placeholder-grey-internet-the-internet_367461_wh860.png"
                    }
                    alt={u.fullName}
                    className="w-8 h-8 rounded-full bg-gray-200"
                  />
                  <span>{u.fullName}</span>
                </td>
                <td className="py-2 px-4">{u.email}</td>
                <td className="py-2 px-4">{u.phone}</td>
                <td className="py-2 px-4">
                  <span
                    className={` ${
                      u.role === "ADMIN"
                        ? "bg-red-500 text-white"
                        : "bg-green-500"
                    }  px-3 py-1 rounded-full text-xs   `}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs w-[30] ${
                      u.isDelete ? "bg-red-500 tx-white" : "bg-green-500"
                    }`}
                  >
                    {u.isDelete ? "Đã xóa" : "Hoạt động"}
                  </span>
                </td>
                <td className="py-2 px-4">{formatDate(u.createAt)}</td>
                <td className="py-2 px-4">
                  <Popover
                    content={
                      <div className="flex  gap-2">
                        <Button onClick={() => handleEdit(u)}> Sửa </Button>
                        <Popconfirm
                          title="Bạn có chắc chắn muốn xóa người dùng này?"
                          onConfirm={() => handleDelete(u.id)}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Button danger> Xóa </Button>
                        </Popconfirm>
                      </div>
                    }
                    trigger="click"
                    open={openId === u.id}
                    onOpenChange={(newOpen) => setOpenId(newOpen ? u.id : null)}
                  >
                    <button className="px-2 py-1 rounded hover:bg-gray-100">
                      <EllipsisOutlined className="text-xl" />
                    </button>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          open={isOpenModal}
          onCancel={handleCloseModal}
          onOk={handleOk}
          title={editingUser ? "Cập nhật người dùng" : "Thêm người dùng"}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="fullName"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label="Ngày sinh"
              rules={[{ required: true, message: "Vui lòng nhập ngày sinh" }]}
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                placeholder="Chọn ngày sinh"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
            {!editingUser && (
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>
            )}
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
            >
              <Select placeholder="Chọn giới tính">
                <Select.Option value="MALE">Nam</Select.Option>
                <Select.Option value="FEMALE">Nữ</Select.Option>
                <Select.Option value="OTHER">Khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
              <Input placeholder="Nhập địa chỉ" />
            </Form.Item>
            <Form.Item name="image" label="Ảnh đại diện">
              <Input placeholder="Nhập đường dẫn ảnh" />
            </Form.Item>
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: "Vui lòng chọn vai trò" }]}
            >
              <Select placeholder="Chọn vai trò">
                <Select.Option value="CUSTOMER">Người dùng</Select.Option>
                <Select.Option value="STAFF">Nhân viên</Select.Option>
                <Select.Option value="MANAGER">Quản lý</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default UserManagement;
