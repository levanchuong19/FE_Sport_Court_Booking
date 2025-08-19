import { useEffect, useState } from "react";
import api from "../../Config/api";
import {
  Table,
  Input,
  Select,
  Button,
  Modal,
  Descriptions,
  Tag,
  Space,
} from "antd";

type SupportContent =
  | "BOOKING_ISSUE"
  | "PAYMENT_PROBLEM"
  | "CANCEL_RESCHEDULE"
  | "COURT_CONDITION"
  | "APP_TECHNICAL"
  | "REFUND_REQUEST"
  | "SUGGESTION_FEEDBACK"
  | "CUSTOMER_SERVICE"
  | "OTHER";

interface SupportTicket {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  content: SupportContent;
  description: string;
}

const translateContent = (content: SupportContent): string => {
  const contentMap: Record<SupportContent, string> = {
    BOOKING_ISSUE: "Lỗi đặt sân",
    PAYMENT_PROBLEM: "Vấn đề thanh toán",
    CANCEL_RESCHEDULE: "Hủy / Đổi lịch",
    COURT_CONDITION: "Phản ánh chất lượng sân",
    APP_TECHNICAL: "Lỗi kỹ thuật",
    REFUND_REQUEST: "Yêu cầu hoàn tiền",
    SUGGESTION_FEEDBACK: "Góp ý & Phản hồi",
    CUSTOMER_SERVICE: "Liên hệ CSKH",
    OTHER: "Khác",
  };
  return contentMap[content] || "Không xác định";
};

const contentOptions = [
  { value: "BOOKING_ISSUE", label: "Lỗi đặt sân" },
  { value: "PAYMENT_PROBLEM", label: "Vấn đề thanh toán" },
  { value: "CANCEL_RESCHEDULE", label: "Hủy / Đổi lịch" },
  { value: "COURT_CONDITION", label: "Phản ánh chất lượng sân" },
  { value: "APP_TECHNICAL", label: "Lỗi kỹ thuật" },
  { value: "REFUND_REQUEST", label: "Yêu cầu hoàn tiền" },
  { value: "SUGGESTION_FEEDBACK", label: "Góp ý & Phản hồi" },
  { value: "CUSTOMER_SERVICE", label: "Liên hệ CSKH" },
  { value: "OTHER", label: "Khác" },
];

function SupportManagement() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterContent, setFilterContent] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null
  );

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const response = await api.get("support/getAll");
        if (response.data && response.data.status) {
          setTickets(response.data.data);
          console.log("Check data: ", response.data.data);
        } else {
          setTickets([]);
        }
      } catch (error) {
        console.error("Lỗi khi tải yêu cầu hỗ trợ:", error);
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handleViewDetails = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedTicket(null);
  };

  const displayedTickets = tickets
    .filter((ticket) => {
      const query = searchQuery.toLowerCase();
      return (
        ticket.fullName.toLowerCase().includes(query) ||
        ticket.email.toLowerCase().includes(query) ||
        ticket.phoneNumber.includes(query)
      );
    })
    .filter((ticket) => {
      return !filterContent || ticket.content === filterContent;
    });

  const columns = [
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      key: "fullName",
      sorter: (a: SupportTicket, b: SupportTicket) =>
        a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Chủ đề",
      dataIndex: "content",
      key: "content",
      render: (content: SupportContent) => (
        <Tag color="blue">{translateContent(content)}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render: (_: any, record: SupportTicket) => (
        <Button onClick={() => handleViewDetails(record)}>Xem chi tiết</Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Quản lý Yêu cầu Hỗ trợ</h1>

      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-white rounded-lg shadow-sm">
        <Space wrap>
          <Input.Search
            placeholder="Tìm theo tên, email, SĐT..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Select
            placeholder="Lọc theo chủ đề"
            style={{ width: 220 }}
            onChange={(value) => setFilterContent(value)}
            allowClear
            value={filterContent}
            options={contentOptions}
          />
        </Space>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <Table
          columns={columns}
          dataSource={displayedTickets}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} của ${total} mục`,
          }}
        />
      </div>

      {selectedTicket && (
        <Modal
          title="Chi tiết Yêu cầu Hỗ trợ"
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Đóng
            </Button>,
          ]}
          width={700}
        >
          <Descriptions bordered column={1} className="mt-4">
            <Descriptions.Item label="Họ và Tên">
              {selectedTicket.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {selectedTicket.email}
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại">
              {selectedTicket.phoneNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Chủ đề">
              <Tag color="blue">{translateContent(selectedTicket.content)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Nội dung chi tiết">
              {selectedTicket.description || "Không có mô tả chi tiết."}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      )}
    </div>
  );
}

export default SupportManagement;
