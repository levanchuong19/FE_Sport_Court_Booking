import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  message,
  Row,
  Col,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import api from "../../Config/api";
import { jwtDecode } from "jwt-decode";
import formatVND from "../../Utils/currency";
import type { Court } from "../../Model/court";
import type { JwtPayload } from "../../Model/user";
import type { BusinessLocation } from "../../Model/businessLocation";
import { useForm } from "antd/es/form/Form";

const { Option } = Select;

interface OwnerCourtTabProps {
  onDetail: (record: Court) => void;
}

interface PriceItem {
  priceType?: "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY";
  price?: number;
}

export default function OwnerCourtTab({ onDetail }: OwnerCourtTabProps) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [editingCourt, setEditingCourt] = useState<Court | null>(null);
  const [form] = useForm();
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [managerId, setManagerId] = useState<string>("");

  const fetchCourts = async (ownerId: string) => {
    try {
      const res = await api.get(`court/getCourtByOwner/${ownerId}`);
      if (Array.isArray(res.data.data)) {
        setCourts(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded: JwtPayload = jwtDecode(token);
    setManagerId(decoded.sub);
    fetchCourts(decoded.sub);

    api
      .get("location/getAll")
      .then((res) => {
        const locs: BusinessLocation[] = res.data.data.content;
        setLocations(locs.filter((loc) => loc.owner?.id === decoded.sub));
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (values: any) => {
    const payload = {
      courtType: values.courtType,
      courtName: values.courtName,
      description: values.description,
      manager_id: managerId,
      businessLocationId: values.businessLocationId,
      yearBuild: values.yearBuild,
      length: values.length,
      width: values.width,
      maxPlayers: values.maxPlayers,
      prices: values.prices || [],
      images: values.images
        ? values.images.map((url: string) => ({ imageUrl: url }))
        : [],
    };

    try {
      if (editingCourt) {
        await api.put(`court/update/${editingCourt.id}`, payload);
        message.success("Cập nhật sân thành công");
      } else {
        await api.post("court/create", payload);
        message.success("Tạo sân thành công");
      }
      setIsOpenModal(false);
      setEditingCourt(null);
      form.resetFields();
      fetchCourts(managerId);
    } catch (err) {
      console.error(err);
      message.error(editingCourt ? "Cập nhật thất bại" : "Tạo sân thất bại");
    }
  };

  const handleDelete = async (courtId: string) => {
    try {
      await api.delete(`court/delete/${courtId}`);
      message.success("Xoá sân thành công");
      fetchCourts(managerId);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Xoá sân thất bại";
      message.error(msg);
    }
  };

  const handleUpdateStatus = async (courtId: string, newStatus: string) => {
    try {
      await api.patch(`court/${courtId}/status`, { status: newStatus });
      message.success("Cập nhật trạng thái thành công");
      fetchCourts(managerId);
    } catch (err: any) {
      console.error(err);
      message.error("Cập nhật trạng thái thất bại");
    }
  };

  const handleEdit = (court: Court) => {
    setEditingCourt(court);
    form.setFieldsValue({
      ...court,
      businessLocationId: court.businessLocation?.id,
      images: court.images?.map((img) => img.imageUrl) || [],
      prices: court.prices?.map((p) => ({
        priceType: p.priceType,
        price: p.price,
      })),
    });
    setIsOpenModal(true);
  };

  const columns = [
    {
      title: "Tên sân",
      dataIndex: "courtName",
      key: "courtName",
    },
    {
      title: "Loại",
      dataIndex: "courtType",
      key: "courtType",
    },
    {
      title: "Giá",
      render: (_: any, record: Court) => formatVND(record.prices?.[0]?.price),
      key: "price",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Court) => (
        <Select
          value={status}
          onChange={(value) => handleUpdateStatus(record.id, value)}
          style={{ width: 150 }}
        >
          <Option value="AVAILABLE">Sẵn sàng</Option>
          <Option value="IN_USE">Đang sử dụng</Option>
          <Option value="MAINTENANCE">Bảo trì</Option>
          <Option value="INACTIVE">Vô hiệu hóa</Option>
        </Select>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: Court) => (
        <div className="flex gap-2">
          <Button
            icon={<EyeOutlined />}
            onClick={() => onDetail(record)}
            type="link"
          >
            Chi tiết
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="link"
          >
            Chỉnh sửa
          </Button>
          {record.status === "AVAILABLE" && (
            <Button
              icon={<DeleteOutlined />}
              danger
              type="link"
              onClick={() => handleDelete(record.id)}
            >
              Xoá
            </Button>
          )}
        </div>
      ),
    },
  ];

  const activeCourts = courts.filter(
    (c) => c.status === "AVAILABLE" || c.status === "IN_USE"
  );

  const inactiveCourts = courts.filter(
    (c) => c.status === "MAINTENANCE" || c.status === "INACTIVE"
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Quản lý sân</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsOpenModal(true);
            setEditingCourt(null);
            form.resetFields();
          }}
        >
          Thêm sân mới
        </Button>
      </div>

      <h3 className="font-semibold text-lg mb-2">Sân đang hoạt động</h3>
      <Table
        columns={columns}
        dataSource={activeCourts}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        className="rounded-md shadow mb-6"
      />

      <h3 className="font-semibold text-lg mb-2">Sân đã vô hiệu hóa</h3>
      <Table
        columns={columns}
        dataSource={inactiveCourts}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        className="rounded-md shadow"
      />

      <Modal
        title={editingCourt ? "Chỉnh sửa sân" : "Thêm sân mới"}
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
          setEditingCourt(null);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={editingCourt ? "Cập nhật" : "Tạo"}
        cancelText="Hủy"
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="courtName"
                label="Tên sân"
                rules={[{ required: true, message: "Vui lòng nhập tên sân" }]}
              >
                <Input placeholder="Nhập tên sân" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="courtType"
                label="Loại sân"
                rules={[{ required: true, message: "Vui lòng chọn loại sân" }]}
              >
                <Select placeholder="Chọn loại sân">
                  <Option value="FOOTBALL">Bóng đá</Option>
                  <Option value="TENNIS">Tennis</Option>
                  <Option value="BADMINTON">Cầu lông</Option>
                  <Option value="BASKETBALL">Bóng rổ</Option>
                  <Option value="VOLLEYBALL">Bóng chuyền</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
              >
                <Input.TextArea rows={3} placeholder="Mô tả chi tiết sân" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="length"
                label="Chiều dài (m)"
                rules={[{ required: true, message: "Vui lòng nhập chiều dài" }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="width"
                label="Chiều rộng (m)"
                rules={[
                  { required: true, message: "Vui lòng nhập chiều rộng" },
                ]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="yearBuild"
                label="Năm xây dựng"
                rules={[
                  { required: true, message: "Vui lòng nhập năm xây dựng" },
                ]}
              >
                <InputNumber
                  min={1900}
                  max={new Date().getFullYear()}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="maxPlayers"
                label="Sức chứa tối đa"
                rules={[{ required: true, message: "Vui lòng nhập sức chứa" }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                name="businessLocationId"
                label="Địa điểm"
                rules={[{ required: true, message: "Vui lòng chọn địa điểm" }]}
              >
                <Select placeholder="Chọn địa điểm">
                  {locations.map((loc) => (
                    <Option key={loc.id} value={loc.id}>
                      {loc.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24} className="mb-4">
              <Form.List name="prices">
                {(fields, { add, remove }) => {
                  const allPrices: PriceItem[] =
                    form.getFieldValue("prices") || [];
                  return (
                    <>
                      <label className="font-medium">Bảng giá</label>
                      {fields.map((field, index) => {
                        const usedPriceTypes = allPrices
                          .filter((_: PriceItem, i: number) => i !== index)
                          .map((p: PriceItem) => p?.priceType)
                          .filter(Boolean);

                        return (
                          <Row
                            key={field.key}
                            gutter={8}
                            align="top"
                            className="my-1"
                          >
                            <Col span={11}>
                              <Form.Item
                                {...field}
                                name={[field.name, "priceType"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng chọn loại giá.",
                                  },
                                ]}
                              >
                                <Select placeholder="Loại giá">
                                  <Option
                                    value="HOURLY"
                                    disabled={usedPriceTypes.includes("HOURLY")}
                                  >
                                    Giờ
                                  </Option>
                                  <Option
                                    value="DAILY"
                                    disabled={usedPriceTypes.includes("DAILY")}
                                  >
                                    Ngày
                                  </Option>
                                  <Option
                                    value="WEEKLY"
                                    disabled={usedPriceTypes.includes("WEEKLY")}
                                  >
                                    Tuần
                                  </Option>
                                  <Option
                                    value="MONTHLY"
                                    disabled={usedPriceTypes.includes(
                                      "MONTHLY"
                                    )}
                                  >
                                    Tháng
                                  </Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={11}>
                              <Form.Item
                                {...field}
                                name={[field.name, "price"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Vui lòng nhập giá.",
                                  },
                                ]}
                              >
                                <InputNumber
                                  min={0}
                                  placeholder="Giá"
                                  className="w-full"
                                  formatter={(value) =>
                                    `${value}`.replace(
                                      /\B(?=(\d{3})+(?!\d))/g,
                                      ","
                                    )
                                  }
                                  parser={(value: string | undefined): number =>
                                    Number(
                                      value?.replace(/\$\s?|(,*)/g, "") || "0"
                                    )
                                  }
                                />
                              </Form.Item>
                            </Col>
                            <Col span={2}>
                              <Button
                                danger
                                type="text"
                                icon={<DeleteOutlined />}
                                onClick={() => remove(field.name)}
                              />
                            </Col>
                          </Row>
                        );
                      })}
                      <Button type="dashed" onClick={() => add()} block>
                        + Thêm giá
                      </Button>
                    </>
                  );
                }}
              </Form.List>
            </Col>

            <Col span={24} className="mb-4">
              <Form.List name="images">
                {(fields, { add, remove }) => (
                  <>
                    <label className="font-medium">Ảnh</label>
                    {fields.map((field) => (
                      <Row
                        key={field.key}
                        gutter={8}
                        align="top"
                        className="my-1"
                      >
                        <Col span={22}>
                          <Form.Item
                            {...field}
                            name={field.name}
                            rules={[
                              {
                                required: true,
                                message: "Vui lòng nhập URL ảnh.",
                              },
                              {
                                type: "url",
                                message: "Vui lòng nhập URL hợp lệ.",
                              },
                            ]}
                          >
                            <Input placeholder="URL ảnh" />
                          </Form.Item>
                        </Col>
                        <Col span={2}>
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      + Thêm ảnh
                    </Button>
                  </>
                )}
              </Form.List>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}
