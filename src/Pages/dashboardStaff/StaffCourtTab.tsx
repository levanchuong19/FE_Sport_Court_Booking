import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popover,
  Select,
  Table,
  Tag,
} from "antd";
import api from "../../Config/api";
import type { Court } from "../../Model/court";
import type { JwtPayload, User } from "../../Model/user";
import { jwtDecode } from "jwt-decode";
import formatVND from "../../Utils/currency";
import { Option } from "antd/es/mentions";
import type { BusinessLocation } from "../../Model/businessLocation";
import { useForm } from "antd/es/form/Form";
import type { Price } from "../../Model/price";
import { customAlert } from "../../Components/customAlert";
import { Ellipsis } from "lucide-react";

interface StaffCourtTabProps {
  onDetail: (record: Court) => void;
}

export default function StaffCourtTab({ onDetail }: StaffCourtTabProps) {
  const [courts, setCourts] = useState<Court[]>([]);
  const [isSearch, setIsSearch] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = useForm();
  const [isLocation, setIsLocation] = useState<BusinessLocation[]>([]);
  const [type, setType] = useState("ALL");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportCourt, setReportCourt] = useState<Court | null>(null);
  const [reportContent, setReportContent] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  // const [reportEmail, setReportEmail] = useState("");

  const fetchCourts = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      const user = decodedToken.sub;
      const account = await api.get(`auth/account/${user}`);
      const response = await api.get(
        `court/getCourtByOwner/${account.data.data.managerId}`
      );
      const court = response.data.data.filter(
        (c: Court) =>
          c.businessLocation?.owner.id === account.data.data.managerId
      );
      setCourts(Array.isArray(court) ? court : []);
    } else {
      setCourts([]);
    }
  };

  useEffect(() => {
    fetchCourts();
  }, []);

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

  const handleSendReport = (court: Court) => {
    setReportCourt(court);
    setReportContent("");
    setIsReportModalOpen(true);
  };
  const handleReportOk = async () => {
    if (!reportCourt) return;
    try {
      const token = localStorage.getItem("token");
      let user: string = "";
      if (token) {
        const decodedToken: JwtPayload = jwtDecode(token);
        user = decodedToken.sub;
      }
      const businessLocation = reportCourt.businessLocation?.id;
      const courtId = reportCourt.id;
      const reportEmail = reportCourt.businessLocation?.owner.email;
      const data = {
        businessLocation,
        court: courtId,
        content: reportContent,
        recipientEmail: reportEmail,
      };
      await api.post(`court/sendReport/${courtId}?staffId=${user}`, data);
      customAlert("Success", "Gửi báo cáo thành công!");
      setIsReportModalOpen(false);
    } catch (err) {
      customAlert("Error", "Gửi báo cáo thất bại!");
    }
  };

  const filterFields = courts.filter((f) => {
    const matchName = (f.courtName || "")
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

  useEffect(() => {
    fetchLocations();
  }, []);

  const columns = [
    { title: "Tên sân", dataIndex: "courtName", key: "courtName" },
    { title: "Loại sân", dataIndex: "courtType", key: "courtType" },
    {
      title: "Chủ sân",
      dataIndex: "businessLocation",
      key: "businessLocation",
      render: (businessLocation: BusinessLocation) =>
        businessLocation.owner.fullName,
    },
    {
      title: "Địa điểm",
      dataIndex: "businessLocation",
      key: "businessLocation",
      render: (businessLocation: BusinessLocation) => businessLocation.address,
    },
    {
      title: "Giá",
      dataIndex: "prices",
      key: "prices",
      render: (prices: Price[]) => formatVND(prices?.[0]?.price),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "AVAILABLE" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Báo cáo",
      key: "report",
      render: (_: any, record: Court) => (
        <Button
          type="primary"
          size="small"
          onClick={() => handleSendReport(record)}
        >
          Gửi report
        </Button>
      ),
    },
    // {
    //   title: "",
    //   key: "detail",
    //   render: (_: any, record: Court) => (
    //     <Popover
    //       content={
    //         <div className="flex  gap-2">
    //           <Button> Sửa </Button>
    //           <Button danger> Xóa </Button>
    //         </div>
    //       }
    //       trigger="click"
    //       open={openId === record.id}
    //       onOpenChange={(newOpen) => setOpenId(newOpen ? record.id : null)}
    //     >
    //       <button className="px-2 py-1 rounded hover:bg-gray-100">
    //         <Ellipsis className="text-xl" />
    //       </button>
    //     </Popover>
    //   ),
    // },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quản lý sân</h2>
      </div>
      <Table
        columns={columns}
        dataSource={filterFields}
        // loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Gửi báo cáo sân"
        open={isReportModalOpen}
        onCancel={() => setIsReportModalOpen(false)}
        onOk={handleReportOk}
      >
        <Form layout="vertical">
          <Form.Item label="Nội dung báo cáo" required>
            <Input.TextArea
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              rows={4}
              placeholder="Nhập nội dung báo cáo"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
