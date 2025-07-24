import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Table,
  Tag,
  Dropdown,
  message,
  Modal,
  Descriptions,
} from "antd";
import type { PaginationProps, MenuProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import api from "../../Config/api";

const { TextArea } = Input;

interface Owner {
  id: string;
  fullName: string;
}

interface BusinessLocation {
  id: string;
  name: string;
  address: string;
  openTime: string;
  closeTime: string;
  latitude: number;
  longitude: number;
  createAt: string;
  status: "ACTIVE" | "INACTIVE" | "DELETED" | "MAINTENANCE" | "REJECTED";
  images: string | null;
  description: string | null;
  courtNum: number;
  yearBuild: number;
  utilities: string[];
  businessLicense: string | null;
  owner: Owner;
}

export default function ShowBusinessLocation() {
  const [locations, setLocations] = useState<BusinessLocation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] =
    useState<BusinessLocation | null>(null);
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectModalLoading, setRejectModalLoading] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const fetchLocations = async (page: number, size: number, name: string) => {
    setLoading(true);
    try {
      const params = {
        page: page - 1,
        size: size,
        name: name || null,
        isDelete: false,
      };
      const res = await api.get("location/getAll", { params });
      const responseData = res.data.data;
      setLocations(responseData.content || []);
      setPagination((prev) => ({
        ...prev,
        current: page,
        pageSize: size,
        total: responseData.totalElements || 0,
      }));
    } catch (err) {
      message.error("Không thể tải danh sách địa điểm.");
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations(
      pagination.current || 1,
      pagination.pageSize || 10,
      searchTerm
    );
  }, [pagination.current, pagination.pageSize, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleTableChange = (newPagination: PaginationProps) => {
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    }));
  };

  const handleViewDetails = (record: BusinessLocation) => {
    setSelectedLocation(record);
    setIsDetailModalVisible(true);
  };

  const handleApprove = (id: string) => {
    modal.confirm({
      title: "Xác nhận duyệt",
      content: "Bạn có chắc chắn muốn duyệt địa điểm này không?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await api.patch(`/location/activeLocation/${id}`);
          message.success("Duyệt địa điểm thành công.");
          fetchLocations(
            pagination.current || 1,
            pagination.pageSize || 10,
            searchTerm
          );
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Duyệt địa điểm thất bại.";
          message.error(errorMessage);
        }
      },
    });
  };

  const showRejectModal = (id: string) => {
    setRejectingId(id);
    setIsRejectModalVisible(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectReason.trim()) {
      message.error("Vui lòng nhập lý do từ chối.");
      return;
    }
    setRejectModalLoading(true);
    try {
      await api.patch(`/location/rejectLocation/${rejectingId}`, {
        reason: rejectReason,
      });

      message.success("Từ chối địa điểm thành công.");
      setIsRejectModalVisible(false);
      setRejectReason("");
      setRejectingId(null);
      fetchLocations(
        pagination.current || 1,
        pagination.pageSize || 10,
        searchTerm
      );
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Từ chối địa điểm thất bại.";
      message.error(errorMessage);
    } finally {
      setRejectModalLoading(false);
    }
  };

  const handleCancelRejectModal = () => {
    setIsRejectModalVisible(false);
    setRejectReason("");
    setRejectingId(null);
  };

  const handleDisable = (id: string) => {
    modal.confirm({
      title: "Xác nhận vô hiệu hóa",
      content: "Bạn có chắc chắn muốn vô hiệu hóa địa điểm này không?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await api.delete(`/location/delete/${id}`);
          message.success("Vô hiệu hóa địa điểm thành công.");
          fetchLocations(
            pagination.current || 1,
            pagination.pageSize || 10,
            searchTerm
          );
        } catch (error: any) {
          const errorMessage =
            error.response?.data?.message || "Vô hiệu hóa địa điểm thất bại.";
          message.error(errorMessage);
        }
      },
    });
  };

  const handleCancelDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedLocation(null);
  };

  const getStatusTag = (status: BusinessLocation["status"]) => {
    switch (status) {
      case "ACTIVE":
        return <Tag color="green">Đang hoạt động</Tag>;
      case "INACTIVE":
        return <Tag color="orange">Chờ duyệt</Tag>;
      case "REJECTED":
        return <Tag color="red">Đã từ chối</Tag>;
      case "DELETED":
        return <Tag color="volcano">Đã xoá</Tag>;
      case "MAINTENANCE":
        return <Tag color="blue">Bảo trì</Tag>;
      default:
        return <Tag color="default">Không xác định</Tag>;
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
      dataIndex: "courtNum",
      key: "courtNum",
      render: (courtNum: number) => <span>{courtNum || 0}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: BusinessLocation["status"]) => getStatusTag(status),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_: any, record: BusinessLocation) => {
        const items: MenuProps["items"] = [];

        if (record.status === "INACTIVE") {
          items.push(
            {
              key: "approve",
              label: "Duyệt",
              onClick: () => handleApprove(record.id),
            },
            {
              key: "reject",
              label: "Từ chối",
              onClick: () => showRejectModal(record.id),
              danger: true,
            }
          );
        }

        if (record.status === "ACTIVE") {
          items.push({
            key: "disable",
            label: "Xoá",
            danger: true,
            onClick: () => handleDisable(record.id),
          });
        }

        if (record.status !== "DELETED") {
          items.push({
            key: "view",
            label: "Xem chi tiết",
            onClick: () => handleViewDetails(record),
          });
        }

        if (items.length === 0) {
          return null;
        }

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
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
            onSearch={handleSearch}
            onChange={(e) => {
              if (e.target.value === "") {
                handleSearch("");
              }
            }}
            style={{ width: 250 }}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={locations}
        loading={loading}
        rowKey="id"
        pagination={pagination}
        onChange={handleTableChange}
      />

      <Modal
        title="Chi tiết địa điểm kinh doanh"
        open={isDetailModalVisible}
        onCancel={handleCancelDetailModal}
        footer={[
          <Button key="close" onClick={handleCancelDetailModal}>
            Đóng
          </Button>,
        ]}
        width={800}
        destroyOnClose
      >
        {selectedLocation ? (
          <Descriptions bordered layout="vertical">
            <Descriptions.Item label="Tên địa điểm" span={2}>
              {selectedLocation.name}
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {getStatusTag(selectedLocation.status)}
            </Descriptions.Item>
            <Descriptions.Item label="Địa chỉ" span={3}>
              {selectedLocation.address}
            </Descriptions.Item>
            <Descriptions.Item label="Chủ sở hữu">
              {selectedLocation.owner.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Giờ mở cửa">
              {selectedLocation.openTime}
            </Descriptions.Item>
            <Descriptions.Item label="Giờ đóng cửa">
              {selectedLocation.closeTime}
            </Descriptions.Item>
            <Descriptions.Item label="Số sân">
              {selectedLocation.courtNum}
            </Descriptions.Item>
            <Descriptions.Item label="Năm xây dựng">
              {selectedLocation.yearBuild}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày tạo">
              {new Date(selectedLocation.createAt).toLocaleDateString("vi-VN")}
            </Descriptions.Item>
            <Descriptions.Item label="Mô tả" span={3}>
              {selectedLocation.description || "Không có mô tả"}
            </Descriptions.Item>
            <Descriptions.Item label="Tiện ích" span={3}>
              {selectedLocation.utilities?.length > 0
                ? selectedLocation.utilities.map((util) => (
                    <Tag key={util}>{util}</Tag>
                  ))
                : "Không có"}
            </Descriptions.Item>
          </Descriptions>
        ) : (
          <div>Không có dữ liệu chi tiết để hiển thị.</div>
        )}
      </Modal>

      <Modal
        title="Lý do từ chối"
        open={isRejectModalVisible}
        onCancel={handleCancelRejectModal}
        confirmLoading={rejectModalLoading}
        onOk={handleConfirmReject}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{ disabled: !rejectReason.trim() }}
        destroyOnClose
      >
        <TextArea
          rows={4}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="Nhập lý do từ chối..."
        />
      </Modal>

      {contextHolder}
    </div>
  );
}
