import { Search } from "lucide-react";
import api from "../../Config/api";
import { useEffect, useState } from "react";
import formatVND from "../../Utils/currency";
import type { Court } from "../../Model/court";
import { Button, Modal, Popconfirm, Popover, Pagination } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";

interface Manager {
  id: string;
  fullName: string;
}

function CourtManagement() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [managers, setManagers] = useState<Manager[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterManager, setFilterManager] = useState("ALL");
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  const [totalElements, setTotalElements] = useState(0);

  const fetchManagers = async () => {
    try {
      const response = await api.get<Manager[]>("account/managers");
      setManagers(response.data);
    } catch (error) {
      console.error("Failed to fetch managers:", error);
    }
  };

  const fetchCourts = async () => {
    try {
      const params = {
        page: currentPage - 1,
        size: pageSize,
        courtName: searchQuery || null,
        courtType: filterType === "ALL" ? null : filterType,
        status: filterStatus === "ALL" ? null : filterStatus,
        ownerId: filterManager === "ALL" ? null : filterManager,
      };
      const response = await api.get("court/getAll", { params });
      setCourts(response.data.data.content);
      setTotalElements(response.data.data.totalElements);
    } catch (error) {
      console.error("Failed to fetch courts:", error);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  useEffect(() => {
    fetchCourts();
  }, [
    currentPage,
    pageSize,
    searchQuery,
    filterType,
    filterStatus,
    filterManager,
  ]);

  const handleDelete = async (courtId: string) => {
    try {
      await api.delete(`court/delete/${courtId}`);
      fetchCourts();
      console.log("Court deleted successfully");
    } catch (error) {
      console.error("Error deleting court:", error);
    }
  };

  const handleViewDetails = (court: Court) => {
    setSelectedCourt(court);
    setIsDetailModalVisible(true);
    setOpenPopoverId(null);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedCourt(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleManagerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterManager(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý sân thể thao</h1>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <div className="relative">
          <input
            className="border border-gray-300 rounded-lg pl-3 pr-10 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Tìm kiếm theo tên sân..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filterType}
          onChange={handleFilterChange}
        >
          <option value="ALL">Tất cả loại sân</option>
          <option value="FOOTBALL">Bóng đá</option>
          <option value="TENNIS">Tennis</option>
          <option value="BASKETBALL">Bóng rổ</option>
          <option value="BADMINTON">Cầu lông</option>
          <option value="VOLLEYBALL">Bóng chuyền</option>
        </select>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filterStatus}
          onChange={handleStatusChange}
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="AVAILABLE">Sẵn sàng</option>
          <option value="IN_USE">Đang sử dụng</option>
          <option value="MAINTENANCE">Bảo trì</option>
          <option value="INACTIVE">Ngừng hoạt động</option>
        </select>
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={filterManager}
          onChange={handleManagerChange}
        >
          <option value="ALL">Tất cả quản lý</option>
          {managers.map((manager) => (
            <option key={manager.id} value={manager.id}>
              {manager.fullName}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Tên sân</th>
              <th className="py-3 px-4 text-left font-semibold">Loại</th>
              <th className="py-3 px-4 text-left font-semibold">Quản lí</th>
              <th className="py-3 px-4 text-left font-semibold">Địa điểm</th>
              <th className="py-3 px-4 text-left font-semibold">Giá cơ bản</th>
              <th className="py-3 px-4 text-left font-semibold">Trạng thái</th>
              <th className="py-3 px-4 text-left font-semibold">Tình trạng</th>
              <th className="py-3 px-4 text-center font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(courts) &&
              courts.map((court) => (
                <tr
                  key={court.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{court.courtName}</td>
                  <td className="py-3 px-4">{court.courtType}</td>
                  <td className="py-3 px-4">
                    {court.businessLocation?.owner?.fullName ?? "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {court.businessLocation?.address ?? "N/A"}
                  </td>
                  <td className="py-3 px-4">
                    {court.prices?.[0]?.price
                      ? formatVND(court.prices[0].price)
                      : "Chưa có"}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        court.status === "AVAILABLE"
                          ? "bg-green-500"
                          : court.status === "IN_USE"
                          ? "bg-yellow-500"
                          : court.status === "MAINTENANCE"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    >
                      {(() => {
                        switch (court.status) {
                          case "AVAILABLE":
                            return "Sẵn sàng";
                          case "IN_USE":
                            return "Đang sử dụng";
                          case "MAINTENANCE":
                            return "Bảo trì";
                          case "INACTIVE":
                            return "Ngừng hoạt động";
                          default:
                            return "Không xác định";
                        }
                      })()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                        !court.isDelete ? "bg-blue-500" : "bg-gray-500"
                      }`}
                    >
                      {!court.isDelete ? "Đang hoạt động" : "Đã xóa"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Popover
                      content={
                        <div className="flex flex-col gap-2">
                          <Button onClick={() => handleViewDetails(court)}>
                            Xem chi tiết
                          </Button>
                          <Popconfirm
                            title="Bạn có chắc chắn muốn xóa sân này?"
                            onConfirm={() => handleDelete(court.id)}
                            onCancel={() => setOpenPopoverId(null)}
                            okText="Có"
                            cancelText="Không"
                          >
                            <Button danger>Xóa</Button>
                          </Popconfirm>
                        </div>
                      }
                      trigger="click"
                      open={openPopoverId === court.id}
                      onOpenChange={(newOpen) =>
                        setOpenPopoverId(newOpen ? court.id : null)
                      }
                    >
                      <button className="px-2 py-1 rounded hover:bg-gray-200">
                        <EllipsisOutlined className="text-xl" />
                      </button>
                    </Popover>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalElements}
          onChange={handlePageChange}
        />
      </div>

      {selectedCourt && (
        <Modal
          title={
            <span className="font-bold text-xl text-gray-800">
              Chi tiết sân: {selectedCourt.courtName}
            </span>
          }
          open={isDetailModalVisible}
          onCancel={handleCloseDetailModal}
          footer={[
            <Button key="close" onClick={handleCloseDetailModal}>
              Đóng
            </Button>,
          ]}
          width={900}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-base mb-3 border-b pb-2 text-gray-700">
                  Thông số sân
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">Loại sân</p>
                    <p className="font-semibold">{selectedCourt.courtType}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Năm xây dựng</p>
                    <p className="font-semibold">{selectedCourt.yearBuild}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Chiều dài</p>
                    <p className="font-semibold">{selectedCourt.length} m</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Chiều rộng</p>
                    <p className="font-semibold">{selectedCourt.width} m</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Sức chứa</p>
                    <p className="font-semibold">
                      {selectedCourt.maxPlayers} người
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-500">Trạng thái</p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${
                        selectedCourt.status === "AVAILABLE"
                          ? "bg-green-500"
                          : selectedCourt.status === "IN_USE"
                          ? "bg-yellow-500"
                          : selectedCourt.status === "MAINTENANCE"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    >
                      {(() => {
                        switch (selectedCourt.status) {
                          case "AVAILABLE":
                            return "Sẵn sàng";
                          case "IN_USE":
                            return "Đang sử dụng";
                          case "MAINTENANCE":
                            return "Bảo trì";
                          case "INACTIVE":
                            return "Ngừng hoạt động";
                          default:
                            return "Không xác định";
                        }
                      })()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-base mb-2 text-gray-700">
                  Mô tả
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedCourt.description || "Không có mô tả chi tiết."}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-base mb-3 text-gray-700">
                  Bảng giá
                </h4>
                {selectedCourt.prices?.length > 0 ? (
                  <ul className="list-none space-y-2 text-sm">
                    {selectedCourt.prices.map((p, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-600">
                          {p.priceType}
                        </span>
                        <span className="text-green-600 font-semibold">
                          {formatVND(p.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    Chưa có thông tin giá.
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-base mb-3 text-gray-700">
                  Vị trí & Quản lý
                </h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="font-medium text-gray-500">Quản lý</p>
                    <p className="font-semibold">
                      {selectedCourt.businessLocation.owner.fullName}
                    </p>
                  </div>
                  <div className="mt-2">
                    <p className="font-medium text-gray-500">Địa chỉ</p>
                    <p className="font-semibold">
                      {selectedCourt.businessLocation.address}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-base mb-3 text-gray-700">
                  Hình ảnh
                </h4>
                {selectedCourt.images?.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {selectedCourt.images.map((img, index) => (
                      <img
                        key={index}
                        src={img.imageUrl}
                        alt={`Hình ảnh sân ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md border border-gray-200"
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-24 bg-gray-100 rounded-lg">
                    <p className="text-sm text-gray-500">Không có hình ảnh.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default CourtManagement;
