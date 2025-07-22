import { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Modal, Select, Table } from "antd";
import api from "../../Config/api";
import type { Court } from "../../Model/court";
import type { JwtPayload } from "../../Model/user";
import { jwtDecode } from "jwt-decode";
import formatVND from "../../Utils/currency";
import { Option } from "antd/es/mentions";
import type { BusinessLocation } from "../../Model/businessLocation";
import { useForm } from "antd/es/form/Form";

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

  const [isFields, setIsFields] = useState<Court[]>([]);
  const [isSearch, setIsSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = useForm();
  const [isLocation, setIsLocation] = useState<BusinessLocation[]>([]);
  const [type, setType] = useState("ALL");

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOK = () => {
    form.submit();
  };

  const handleSubmit = async (values: Court) => {
    try {
      const response = await api.post("court/create", values);
      console.log(response.data.data);
      setIsOpenModal(false);
      form.resetFields();
      // fetchCourts();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const filterFields = isFields.filter((f) => {
    const matchName = f.courtName
      .toLowerCase()
      .includes(isSearch.toLowerCase());
    const matchType = type === "ALL" || f.courtType === type;
    return matchName && matchType;
  });

  const fetchLocations = async () => {
    const response = await api.get("location/getAll");
    console.log(response.data.data.content);
    setIsLocation(response.data.data.content);
  };

  // const fetchCourts = async () => {
  //   const response = await api.get("court/getAll");
  //   console.log(response.data.data.content);
  //   setIsFields(response.data.data.content);
  // };

  // useEffect(() => {
  //   fetchCourts();
  // }, []);

  useEffect(() => {
    fetchLocations();
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
      {/* <Table
        columns={columns}
        dataSource={courts}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      /> */}

<div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Tên sân</th>
              <th className="py-2 px-4 text-left">Loại</th>
              <th className="py-2 px-4 text-left">Quản lí sân</th>
              <th className="py-2 px-4 text-left">Địa điểm</th>
              <th className="py-2 px-4 text-left">Giá</th>
              <th className="py-2 px-4 text-left">Trạng thái</th>
              <th className="py-2 px-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filterFields) &&
              filterFields.map((f, idx) => (
                <tr key={idx} className="border-b border-gray-200">
                  <td className="py-2 px-4">{f.courtName}</td>
                  <td className="py-2 px-4">{f.courtType}</td>
                  <td className="py-2 px-4">
                    {f.businessLocation.owner.fullName}
                  </td>
                  <td className="py-2 px-4">{f.businessLocation.address}</td>
                  <td className="py-2 px-4">
                    {formatVND(f.prices?.[0].price)}
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        f.status === "AVAILABLE" ? "bg-green-500" : ""
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <button className="px-2 py-1 rounded hover:bg-gray-100">
                      ...
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Modal
          title="Thêm sân mới"
          open={isOpenModal}
          onCancel={handleCloseModal}
          onOk={handleOK}
        >
          <Form form={form} onFinish={handleSubmit}>
            <Form.Item
              name="courtName"
              label="Tên sân"
              rules={[{ required: true, message: "Vui lòng nhập tên sân!" }]}
            >
              <Input placeholder="Nhập tên sân" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ của sân!" },
              ]}
            >
              <Input placeholder="Nhập địa chỉ của sân" />
            </Form.Item>
            <Form.Item label="Bảng giá">
              <Form.List name="prices">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field) => (
                      <div key={field.key}>
                        <Form.Item
                          {...field}
                          name={[field.name, "priceType"]}
                          label="Giá"
                          rules={[
                            { required: true, message: "Vui lòng nhập giá!" },
                          ]}
                        >
                          <Select placeholder="Chọn loại giá">
                            <Option value="HOURLY">Giờ</Option>
                            <Option value="DAILY">Ngày</Option>
                            <Option value="WEEKLY">Tuần</Option>
                            <Option value="MONTHLY">Tháng</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...field}
                          name={[field.name, "price"]}
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập giá trị!",
                            },
                          ]}
                        >
                          <InputNumber min={0} placeholder="Nhập giá trị" />
                        </Form.Item>
                        {fields.length > 1 && (
                          <Button
                            type="link"
                            onClick={() => remove(field.name)}
                          >
                            Xóa
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="dashed" onClick={() => add()}>
                      Thêm Giá
                    </Button>
                  </>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item
              name="courtType"
              label="Loại sân"
              rules={[
                { required: true, message: "Vui lòng nhập tên loại sân!" },
              ]}
            >
              <Select>
                <Select.Option value="FOOTBALL">Bóng đá</Select.Option>
                <Select.Option value="TENNIS">Tennis</Select.Option>
                <Select.Option value="BASKETBALL">Bóng rổ</Select.Option>
                <Select.Option value="BADMINTON">Cầu lông</Select.Option>
                <Select.Option value="VOLLEYBALL">Bóng chuyền</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name="businessLocationId" label="Địa điểm kinh doanh">
              <Select placeholder="Chọn địa điểm kinh doanh">
                {isLocation.map((location: BusinessLocation) => (
                  <Option key={location.id} value={location.id}>
                    {location.address}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="manager_id" label="Quản lý sân">
              <Select placeholder="Chọn quản lý sân">
                {isLocation.map((location: BusinessLocation) => (
                  <Option key={location.owner.id} value={location.owner.id}>
                    {location.owner.fullName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="width"
              label="Chiều rộng của sân"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập chiều rộng của sân!",
                },
              ]}
            >
              <Input placeholder="Nhập chiều rộng của sân" />
            </Form.Item>
            <Form.Item
              name="length"
              label="Chiều dài của sân"
              rules={[
                { required: true, message: "Vui lòng nhập chiều dài của sân!" },
              ]}
            >
              <Input placeholder="Nhập chiều dài của sân" />
            </Form.Item>
            <Form.Item
              name="yearBuild"
              label="Năm xây dựng"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập năm xây dựng của sân!",
                },
              ]}
            >
              <Input placeholder="Nhập năm xây dựng của sân" />
            </Form.Item>
            <Form.Item
              name="maxPlayers"
              label="Số người tối đa"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số người tối đa của sân!",
                },
              ]}
            >
              <Input placeholder="Nhập số người tối đa của sân" />
            </Form.Item>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả của sân!",
                },
              ]}
            >
              <Input placeholder="Nhập mô tả của sân" />
            </Form.Item>
            <Form.List
              name="images"
              // rules={[{ required: true, message: "Thêm ít nhất một ảnh!" }]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Form.Item
                      {...restField}
                      key={key}
                      label={`Ảnh ${key + 1}`}
                      name={name}
                      rules={[
                        { required: true, message: "Vui lòng nhập URL ảnh!" },
                      ]}
                    >
                      <Input
                        placeholder="Nhập URL ảnh"
                        addonAfter={
                          <Button danger onClick={() => remove(name)}>
                            X
                          </Button>
                        }
                      />
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      Thêm ảnh
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </Modal>
      </div>
    </div>
  );
} 