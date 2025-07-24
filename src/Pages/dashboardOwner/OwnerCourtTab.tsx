import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Tag,
  message,
  Row,
  Col,
} from "antd";
import { PlusOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
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

export default function OwnerCourtTab({ onDetail }: OwnerCourtTabProps) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = useForm();
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [managerId, setManagerId] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded: JwtPayload = jwtDecode(token);
    setManagerId(decoded.sub);

    api.get(`court/getCourtByOwner/${decoded.sub}`)
      .then(res => setCourts(Array.isArray(res.data.data) ? res.data.data : []))
      .catch(console.error);

    api.get("location/getAll")
      .then(res => {
        const locs: BusinessLocation[] = res.data.data.content;
        setLocations(locs.filter(loc => loc.owner?.id === decoded.sub));
      })
      .catch(console.error);
  }, []);

  const handleSubmit = async (values: any) => {
    try {
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
        images: values.images || [],
      };

      const res = await api.post("court/create", payload);
      message.success("Tạo sân thành công");
      setIsOpenModal(false);
      form.resetFields();
      setCourts(prev => [res.data.data, ...prev]);
    } catch (err: any) {
      console.error(err);
      message.error("Tạo sân thất bại");
    }
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
      render: (_unused: any, record: Court)=> formatVND(record.prices?.[0]?.price),
      key: "price",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (_: any, record: Court) => (
        <Button type="link" icon={<EyeOutlined />} onClick={() => onDetail(record)}>
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Quản lý sân</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpenModal(true)}>
          Thêm sân mới
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={courts}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        className="rounded-md shadow"
      />

      <Modal
        title="Thêm sân mới"
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        onOk={() => form.submit()}
        okText="Tạo"
        cancelText="Hủy"
        width={800}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="courtName" label="Tên sân" rules={[{ required: true }]}>
                <Input placeholder="Nhập tên sân" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="courtType" label="Loại sân" rules={[{ required: true }]}>
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
              <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
                <Input.TextArea rows={3} placeholder="Mô tả chi tiết sân" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="length" label="Chiều dài (m)" rules={[{ required: true }]}>
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="width" label="Chiều rộng (m)" rules={[{ required: true }]}>
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="yearBuild" label="Năm xây dựng" rules={[{ required: true }]}>
                <InputNumber
                  min={1900}
                  max={new Date().getFullYear()}
                  className="w-full"
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="maxPlayers" label="Sức chứa tối đa" rules={[{ required: true }]}>
                <InputNumber min={1} className="w-full" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="businessLocationId" label="Địa điểm" rules={[{ required: true }]}>
                <Select placeholder="Chọn địa điểm">
                  {locations.map(loc => (
                    <Option key={loc.id} value={loc.id}>
                      {loc.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.List name="prices">
                {(fields, { add, remove }) => (
                  <>
                    <label className="font-medium">Bảng giá</label>
                    {fields.map(field => (
                      <Row key={field.key} gutter={8} align="middle" className="my-1">
                        <Col span={8}>
                          <Form.Item
                            {...field}
                            name={[field.name, "priceType"]}
                            rules={[{ required: true }]}
                          >
                            <Select placeholder="Loại giá">
                              <Option value="HOURLY">Giờ</Option>
                              <Option value="DAILY">Ngày</Option>
                              <Option value="WEEKLY">Tuần</Option>
                              <Option value="MONTHLY">Tháng</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...field}
                            name={[field.name, "price"]}
                            rules={[{ required: true }]}
                          >
                            <InputNumber min={0} placeholder="Giá" className="w-full" />
                          </Form.Item>
                        </Col>
                        <Col>
                          <Button
                            danger
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={() => remove(field.name)}
                          />
                        </Col>
                      </Row>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      + Thêm giá
                    </Button>
                  </>
                )}
              </Form.List>
            </Col>

            <Col span={24}>
              <Form.List name="images">
                {(fields, { add, remove }) => (
                  <>
                    <label className="font-medium">Ảnh</label>
                    {fields.map(field => (
                      <Row key={field.key} gutter={8} align="middle" className="my-1">
                        <Col span={22}>
                          <Form.Item {...field} name={field.name} rules={[{ required: true }]}>
                            <Input placeholder="URL ảnh" />
                          </Form.Item>
                        </Col>
                        <Col>
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
