import { Plus, Search } from "lucide-react";
import api from "../../Config/api";
import { useEffect, useState } from "react";
import formatVND from "../../Utils/currency";
import type { Court } from "../../Model/court";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Popover,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import type { BusinessLocation } from "../../Model/businessLocation";
import { EllipsisOutlined } from "@ant-design/icons";

function CourtManagement() {
  const [isFields, setIsFields] = useState<Court[]>([]);
  const [isSearch, setIsSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = useForm();
  const [isLocation, setIsLocation] = useState<BusinessLocation[]>([]);
  const [type, setType] = useState("ALL");
  const [openId, setOpenId] = useState<string | null>(null);
  const [edittingCourt, setEditingCourt] = useState<Court | null>(null);

  const handleOpenModal = () => {
    setIsOpenModal(true);
    form.setFieldsValue({
      prices: [{ priceType: undefined, price: undefined }],
    });
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOK = () => {
    form.submit();
  };

  const handleSubmit = async (values: Court) => {
    try {
      if (edittingCourt) {
        await api.put(`court/update/${edittingCourt.id}`, values);
      } else {
        await api.post("court/create", values);
      }
      setIsOpenModal(false);
      form.resetFields();
      fetchCourts();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (court: Court) => {
    setEditingCourt(court);
    form.setFieldsValue({
      ...court,
      businessLocationId: court.businessLocation.id,
      manager_id: court.businessLocation.owner.id,
    });
    setIsOpenModal(true);
  };

  const handleDelete = async (courtId: string) => {
    try {
      await api.delete(`court/delete/${courtId}`);
      fetchCourts();
      console.log("Court deleted successfully");
    } catch (error) {
      console.error("Error deleting court:", error);
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

  const fetchCourts = async () => {
    const response = await api.get("court/getAll");
    console.log(response.data.data.content);
    setIsFields(response.data.data.content);
  };

  useEffect(() => {
    fetchCourts();
  }, []);

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý sân thể thao</h1>
        <button
          onClick={handleOpenModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-green-700"
        >
          <span>
            <Plus />
          </span>{" "}
          Thêm sân mới
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          className="border border-gray-200 rounded-lg px-3 py-2 w-64"
          placeholder="Tìm kiếm sân..."
          value={isSearch}
          onChange={(e) => setIsSearch(e.target.value)}
        />
        <button className="border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center gap-1">
          <span>
            <Search />
          </span>{" "}
          Lọc
        </button>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="ALL">Tất cả loại sân</option>
          <option value="FOOTBALL">Bóng đá</option>
          <option value="TENNIS">Tennis</option>
          <option value="BASKETBALL">Bóng rổ</option>
          <option value="BADMINTON">Cầu lông</option>
          <option value="VOLLEYBALL">Bóng chuyền</option>
        </select>
        {/* <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">
          Danh sách
        </button>
        <button className="bg-white border border-green-500 text-green-500 px-4 py-2 rounded-lg font-semibold">
          Lưới
        </button> */}
      </div>
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
              <th className="py-2 px-4 text-left">Tình trạng </th>
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
                        f.status === "AVAILABLE" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {f.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        f.isDelete === false ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {f.isDelete === false ? "Đang hoạt động" : "Đã xóa"}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <Popover
                      content={
                        <div className="flex  gap-2">
                          <Button onClick={() => handleEdit(f)}> Sửa </Button>
                          <Popconfirm
                            title="Bạn có chắc chắn muốn xóa sân này?"
                            onConfirm={() => handleDelete(f.id)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button danger> Xóa </Button>
                          </Popconfirm>
                        </div>
                      }
                      trigger="click"
                      open={openId === f.id}
                      onOpenChange={(newOpen) => {
                        setOpenId(newOpen ? f.id : null);
                      }}
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
              name="businessLocation.address"
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
                          fieldKey={[field.key, "priceType"]}
                          name={[field.name, "priceType"]}
                          label="Giá"
                          rules={[
                            { required: true, message: "Vui lòng nhập giá!" },
                          ]}
                        >
                          <Select placeholder="Chọn loại giá">
                            <Select.Option value="HOURLY">Giờ</Select.Option>
                            <Select.Option value="DAILY">Ngày</Select.Option>
                            <Select.Option value="WEEKLY">Tuần</Select.Option>
                            <Select.Option value="MONTHLY">Tháng</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          fieldKey={[field.key, "price"]}
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
                  <Select.Option key={location.id} value={location.id}>
                    {location.address}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="manager_id" label="Quản lý sân">
              <Select placeholder="Chọn quản lý sân">
                {[
                  ...new Map(
                    isLocation
                      .filter((location) => location.owner) // Lọc location có owner
                      .map((location) => [location.owner.id, location.owner])
                  ).values(),
                ].map((owner) => (
                  <Select.Option key={owner.id} value={owner.id}>
                    {owner.fullName}
                  </Select.Option>
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
                      // rules={[
                      //   { required: true, message: "Vui lòng nhập URL ảnh!" },
                      // ]}
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

export default CourtManagement;
