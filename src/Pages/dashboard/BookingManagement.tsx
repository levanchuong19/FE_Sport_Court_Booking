import { useEffect, useState, useCallback } from "react";
import api from "../../Config/api"; // Giả định api đã được cấu hình với axios
import formatDate from "../../Utils/date"; // Utility để format ngày tháng
import formatVND from "../../Utils/currency"; // Utility để format tiền tệ
import {
  Button,
  Table,
  Tag,
  Pagination,
  Space,
  Select,
  Modal,
  Descriptions,
  Spin,
} from "antd";

// --- Type Definitions ---
type PriceType = "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY";
type SlotStatus =
  | "BOOKED"
  | "CHECKED_IN"
  | "CANCELED"
  | "COMPLETED"
  | "IN_USE"
  | "AVAILABLE";

interface SlotDTO {
  id: string;
  accountUsername: string | null;
  accountId: string | null;
  bookingStatus: string | null;
  ownerId: string | null;
  phone: string | null;
  courtName: string | null;
  slotType: PriceType;
  status: SlotStatus;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  price: number | null;
}

interface PaginationState {
  current: number;
  pageSize: number;
  total: number;
}

interface FilterState {
  slotStatus: string | null;
  slotType: string | null;
}

// --- Component ---
export default function BookingManagement() {
  const [bookings, setBookings] = useState<SlotDTO[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState<FilterState>({
    slotStatus: null,
    slotType: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<SlotDTO | null>(null);

  // --- Data Fetching ---
  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (pagination.current - 1).toString(),
        size: pagination.pageSize.toString(),
      });

      // **THAY ĐỔI**: Chỉ gửi slotType lên API, không gửi slotStatus nữa.
      if (filters.slotType) {
        params.append("slotType", filters.slotType);
      }

      const response = await api.get(`slot/getAll?${params.toString()}`);

      if (response.data && response.data.status) {
        const responseData = response.data.data;
        setBookings(responseData.content);
        setPagination((prev) => ({
          ...prev,
          total: responseData.totalElements,
        }));
      } else {
        console.error("Failed to fetch bookings:", response.data.message);
        setBookings([]);
        setPagination((prev) => ({ ...prev, total: 0 }));
      }
    } catch (error) {
      console.error("An error occurred while fetching bookings:", error);
    } finally {
      setLoading(false);
    }
    // **THAY ĐỔI**: Xóa `filters` khỏi dependency, chỉ giữ lại những gì thực sự trigger API call.
  }, [pagination.current, pagination.pageSize, filters.slotType]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // **THAY ĐỔI MỚI**: Tạo biến dẫn xuất để lọc dữ liệu ở phía client.
  const displayedBookings = filters.slotStatus
    ? bookings.filter((booking) => booking.status === filters.slotStatus)
    : bookings;

  // --- Handlers ---
  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ ...pagination, current: page, pageSize: pageSize });
  };

  const handleFilterChange = (
    filterName: keyof FilterState,
    value: string | null
  ) => {
    // Nếu filter là loại API-based, reset về trang 1.
    if (filterName === "slotType") {
      setPagination((prev) => ({ ...prev, current: 1 }));
    }
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const handleViewDetails = (booking: SlotDTO) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedBooking(null);
  };

  // --- Status and Rendering Logic ---

  const getStatusTag = (status: SlotStatus) => {
    switch (status) {
      case "COMPLETED":
        return <Tag color="green">Hoàn thành</Tag>;
      case "BOOKED":
        return <Tag color="blue">Đã đặt</Tag>;
      case "CANCELED":
        return <Tag color="red">Đã hủy</Tag>;
      case "CHECKED_IN":
        return <Tag color="cyan">Đã check-in</Tag>;
      case "IN_USE":
        return <Tag color="purple">Đang sử dụng</Tag>;
      case "AVAILABLE":
        return <Tag color="default">Còn trống</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getPriceTypeTag = (type: PriceType) => {
    switch (type) {
      case "HOURLY":
        return <Tag color="geekblue">Theo giờ</Tag>;
      case "DAILY":
        return <Tag color="volcano">Theo ngày</Tag>;
      case "WEEKLY":
        return <Tag color="orange">Theo tuần</Tag>;
      case "MONTHLY":
        return <Tag color="gold">Theo tháng</Tag>;
      default:
        return <Tag>{type}</Tag>;
    }
  };

  const safeFormatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    return formatDate(new Date(dateString + "T00:00:00"));
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "accountUsername",
      key: "customer",
      render: (_: any, record: SlotDTO) => (
        <div>
          <div>{record.accountUsername || "Khách vãng lai"}</div>
          <div className="text-xs text-gray-500">{record.phone}</div>
        </div>
      ),
    },
    {
      title: "Sân",
      dataIndex: "courtName",
      key: "courtName",
    },
    {
      title: "Ngày đặt",
      dataIndex: "startDate",
      key: "date",
      render: (date: string) => safeFormatDate(date),
    },
    {
      title: "Giờ",
      key: "time",
      render: (_: any, record: SlotDTO) =>
        `${record.startTime} - ${record.endTime}`,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number | null) =>
        price !== null ? formatVND(price) : "N/A",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: SlotStatus) => getStatusTag(status),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: SlotDTO) => (
        <Button onClick={() => handleViewDetails(record)}>Xem chi tiết</Button>
      ),
    },
  ];

  // --- JSX ---
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý đặt sân</h1>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-4 p-4 bg-white rounded-lg shadow-sm">
        <Space wrap>
          <Select
            placeholder="Tất cả trạng thái"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange("slotStatus", value)}
            allowClear
            value={filters.slotStatus}
          >
            <Select.Option value="BOOKED">Đã đặt</Select.Option>
            <Select.Option value="CHECKED_IN">Đã check-in</Select.Option>
            <Select.Option value="IN_USE">Đang sử dụng</Select.Option>
            <Select.Option value="COMPLETED">Hoàn thành</Select.Option>
            <Select.Option value="CANCELED">Đã hủy</Select.Option>
            <Select.Option value="AVAILABLE">Còn trống</Select.Option>
          </Select>
          <Select
            placeholder="Tất cả loại đặt"
            style={{ width: 200 }}
            onChange={(value) => handleFilterChange("slotType", value)}
            allowClear
            value={filters.slotType}
          >
            <Select.Option value="HOURLY">Theo giờ</Select.Option>
            <Select.Option value="DAILY">Theo ngày</Select.Option>
            <Select.Option value="WEEKLY">Theo tuần</Select.Option>
            <Select.Option value="MONTHLY">Theo tháng</Select.Option>
          </Select>
        </Space>
      </div>

      {/* Table and Pagination */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <Table
          columns={columns}
          // **THAY ĐỔI**: Sử dụng `displayedBookings` để hiển thị dữ liệu đã lọc.
          dataSource={displayedBookings}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={pagination.total}
          onChange={handlePageChange}
          showSizeChanger
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} của ${total} mục`
          }
        />
      </div>

      {/* Details Modal */}
      {selectedBooking && (
        <Modal
          title="Chi tiết lượt đặt sân"
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="back" onClick={handleModalClose}>
              Đóng
            </Button>,
          ]}
          width={700}
        >
          <Spin spinning={!selectedBooking}>
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Mã Đặt Sân" span={2}>
                {selectedBooking.id}
              </Descriptions.Item>
              <Descriptions.Item label="Khách hàng">
                {selectedBooking.accountUsername}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedBooking.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Sân">
                {selectedBooking.courtName}
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                {getStatusTag(selectedBooking.status)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày bắt đầu">
                {safeFormatDate(selectedBooking.startDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày kết thúc">
                {safeFormatDate(selectedBooking.endDate)}
              </Descriptions.Item>
              <Descriptions.Item label="Giờ">
                {`${selectedBooking.startTime} - ${selectedBooking.endTime}`}
              </Descriptions.Item>
              <Descriptions.Item label="Loại đặt">
                {getPriceTypeTag(selectedBooking.slotType)}
              </Descriptions.Item>
              <Descriptions.Item label="Giá tiền" span={2}>
                {selectedBooking.price
                  ? formatVND(selectedBooking.price)
                  : "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </Spin>
        </Modal>
      )}
    </div>
  );
}
