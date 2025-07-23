import { useEffect, useState } from "react";
import api from "../../Config/api";
import { Button, Input, Table, Tag, Dropdown, Menu, message } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import type { BusinessLocation } from "../../Model/businessLocation";

export default function ShowBusinessLocation() {
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocations();
  }, [status, search]);

  const fetchLocations = async () => {
    setLoading(true);
    try {
      const res = await api.get("location/getAll");
      let data = res.data.data.content || [];
      if (status !== "ALL") {
        data = data.filter((item: any) => item.status === status);
      }
      if (search) {
        data = data.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      setLocations(data);
    } catch (err) {
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleActivateLocation = async (id: string) => {
    try {
      await api.patch(`/location/activeLocation/${id}`);
      message.success("Kích hoạt địa điểm thành công");
      fetchLocations();
    } catch (error: any) {
      message.error("Kích hoạt thất bại: " + (error.response?.data?.message || ""));
    }
  };

  const columns = [
    {
      title: "Tên địa điểm",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      render: (text: string) => <span className="text-gray-600">{text}</span>,
    },
    {
      title: "Chủ sở hữu",
      dataIndex: ["owner", "fullName"],
      key: "owner",
    },
    {
      title: "Số sân",
      dataIndex: ["courtNum"],
      key: "courtNum",
      render: (courts: number) => <span>{courts || 0}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) =>
        status === "ACTIVE" ? (
          <Tag color="green">Đang hoạt động</Tag>
        ) : (
          <Tag color="red">Chưa xác thực</Tag>
        ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: BusinessLocation) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit" onClick={() => {/* TODO: Thêm logic sửa */}}>
              Sửa
            </Menu.Item>
            <Menu.Item key="delete" onClick={() => {/* TODO: Thêm logic xóa */}} danger>
              Xóa
            </Menu.Item>
          </Menu>
        );
        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  const inactiveColumns = [
    {
      title: "Tên địa điểm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Chủ sở hữu",
      dataIndex: ["owner", "fullName"],
      key: "owner",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: BusinessLocation) => (
        <Button type="primary" onClick={() => handleActivateLocation(record.id)}>
          Kích hoạt
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <h2 className="text-xl font-bold">Danh sách địa điểm kinh doanh</h2>
        <div className="flex gap-2">
          <Input.Search
            placeholder="Tìm kiếm theo tên..."
            allowClear
            onSearch={setSearch}
            style={{ width: 220 }}
          />
          <select
            className="border rounded px-2 py-1"
            value={status}
            onChange={e => setStatus(e.target.value as any)}
          >
            <option value="ALL">Tất cả</option>
            <option value="ACTIVE">Đang hoạt động</option>
            <option value="INACTIVE">Vô hiệu hóa</option>
          </select>
          <Button type="primary" onClick={() => navigate("/businessLocation/create")}>
            + Thêm mới
          </Button>
        </div>
      </div>

      {/* Bảng chính */}
      <Table
        columns={columns}
        dataSource={locations}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 8 }}
      />

      {/* Bảng phụ - chỉ hiện địa điểm INACTIVE */}
      {status === "ALL" && locations.some(loc => loc.status === "INACTIVE") && (
        <div className="mt-10">
          <h3 className="font-semibold mb-2 text-lg text-red-600">
            Địa điểm chưa xác thực
          </h3>
          <Table
            columns={inactiveColumns}
            dataSource={locations.filter(loc => loc.status === "INACTIVE")}
            rowKey="id"
            pagination={false}
            bordered
          />
        </div>
      )}
    </div>
  );
}
