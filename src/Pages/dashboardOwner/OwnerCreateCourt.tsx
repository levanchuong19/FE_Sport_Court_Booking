import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Config/api";
import { Input, Select, Button, Form, InputNumber, message } from "antd";
import jwt_decode from "jwt-decode";

const { TextArea } = Input;
const { Option } = Select;

interface BusinessLocation {
  id: string;
  locationName: string;
}

interface CourtFormValues {
  courtName: string;
  description: string;
  courtType: string;
  length: number;
  width: number;
  yearBuild: number;
  maxPlayers: number;
  businessLocationId: string;
}

const courtTypes = [
  { value: "FOOTBALL", label: "Bóng đá" },
  { value: "TENNIS", label: "Tennis" },
  { value: "BADMINTON", label: "Cầu lông" },
  { value: "BASKETBALL", label: "Bóng rổ" },
  { value: "VOLLEYBALL", label: "Bóng chuyền" },
];

export default function OwnerCreateCourt() {
  const navigate = useNavigate();
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/api/location/getAll");
        setLocations(res.data);
      } catch (err) {
        message.error("Lỗi khi tải danh sách địa điểm");
      }
    };
    fetchLocations();
  }, []);

  const getUserIdFromToken = (): string => {
    const token = localStorage.getItem("accessToken");
    if (!token) return "";
    try {
      const decoded: any = jwt_decode(token);
      return decoded?.sub || "";
    } catch (e) {
      return "";
    }
  };

  const onFinish = async (values: CourtFormValues) => {
    setLoading(true);
    try {
      const payload = {
        courtName: values.courtName,
        description: values.description,
        courtType: values.courtType,
        length: values.length,
        width: values.width,
        yearBuild: values.yearBuild,
        maxPlayers: values.maxPlayers,
        businessLocationId: values.businessLocationId,
        status: "ACTIVE",
        courtManagerId: getUserIdFromToken(),
      };

      await api.post("/api/court/create", payload);
      message.success("Tạo sân thành công");
      navigate("/owner");
    } catch (error: any) {
      console.error("Error submitting form:", error);
      if (error?.response?.data?.message) {
        message.error(`Lỗi: ${error.response.data.message}`);
      } else {
        message.error("Tạo sân thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-emerald-600 mb-4">Tạo sân mới</h2>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item name="courtName" label="Tên sân" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
          <TextArea rows={3} />
        </Form.Item>

        <Form.Item name="courtType" label="Loại sân" rules={[{ required: true }]}>
          <Select placeholder="Chọn loại sân">
            {courtTypes.map((ct) => (
              <Option key={ct.value} value={ct.value}>
                {ct.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="length" label="Chiều dài (m)" rules={[{ required: true }]}>
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item name="width" label="Chiều rộng (m)" rules={[{ required: true }]}>
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item name="yearBuild" label="Năm xây dựng" rules={[{ required: true }]}>
          <InputNumber min={1900} max={new Date().getFullYear()} className="w-full" />
        </Form.Item>

        <Form.Item name="maxPlayers" label="Sức chứa tối đa" rules={[{ required: true }]}>
          <InputNumber min={1} className="w-full" />
        </Form.Item>

        <Form.Item name="businessLocationId" label="Địa điểm" rules={[{ required: true }]}>
          <Select placeholder="Chọn địa điểm">
            {locations.map((loc) => (
              <Option key={loc.id} value={loc.id}>
                {loc.locationName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Tạo sân
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
