import { useState } from "react";
import OwnerSidebar from "./OwnerSidebar";
import OwnerLocationTab from "./OwnerLocationTab";
import OwnerCourtTab from "./OwnerCourtTab";
import OwnerBookingTab from "./OwnerBookingTab";
import OwnerStaffTab from "./OwnerStaffTab";
import { useNavigate } from "react-router-dom";
import type { BusinessLocation } from "../../Model/businessLocation";
import type { Court } from "../../Model/court";
import type { Slot } from "../../Model/slot";
import { Button, Card, Tooltip } from "antd";
import { MailOutlined, PhoneOutlined, InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

type TabKey = "overview" | "location" | "court" | "booking" | "staff";

export default function DashboardOwner() {
  const [tab, setTab] = useState<TabKey>("overview");
  const navigate = useNavigate();

  const handleContact = () => {
    window.location.href = "mailto:support@sportzone.com?subject=Hỗ trợ chủ sân";
  };

  const handleHotline = () => {
    window.open("tel:19001234");
  };

  const handleGuide = () => {
    window.open("http://localhost:5173/guide", "_blank");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <OwnerSidebar tab={tab} setTab={setTab} />
      <main className="flex-1 ml-64 p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Dashboard Chủ Sân</h1>
        {tab === "overview" && (
          <Card
            className="shadow-lg"
            title={
              <span>
                <InfoCircleOutlined style={{ color: "#1890ff", marginRight: 8 }} />
                Chào mừng bạn đến với <b>SportZone</b>
              </span>
            }
          >
            <div className="mb-4 text-base text-gray-700">
              <b>SportZone</b> là nền tảng quản lý và đặt sân thể thao hiện đại, giúp chủ sân:
              <ul className="list-disc ml-6 mt-2">
                <li>Quản lý địa điểm, sân bóng, lịch đặt sân và nhân viên dễ dàng</li>
                <li>Kiểm soát doanh thu, trạng thái đặt sân, lịch sử giao dịch</li>
                <li>Nhận thông báo đặt sân, nhắc nhở và hỗ trợ khách hàng nhanh chóng</li>
                <li>Bảo mật thông tin, giao diện thân thiện, hỗ trợ đa thiết bị</li>
                <li>Thống kê số lượt đặt sân, doanh thu từng tháng, hiệu suất hoạt động</li>
                <li>Quản lý nhân viên, phân quyền, theo dõi lịch làm việc</li>
                <li>Hỗ trợ nhiều hình thức thanh toán: tiền mặt, chuyển khoản, ví điện tử</li>
                <li>Hỗ trợ chủ sân quảng bá địa điểm, thu hút khách hàng mới</li>
              </ul>
              <div className="mt-4">
                <b>Hỗ trợ chủ sân:</b>
                <ul className="list-disc ml-6 mt-2">
                  <li>Liên hệ qua email: <a href="mailto:support@sportzone.com" className="text-blue-600 underline">support@sportzone.com</a></li>
                  <li>Hotline: <b className="text-blue-700">1900 1234</b></li>
                  <li>Hướng dẫn sử dụng: <a href="http://localhost:5173/guide" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Xem tại đây</a></li>
                  <li>Fanpage: <a href="https://facebook.com/sportzone" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">facebook.com/sportzone</a></li>
                </ul>
              </div>
              <div className="mt-4">
                <b>Tiện ích nhanh:</b>
                <ul className="list-disc ml-6 mt-2">
                  <li>Tạo sân mới, thêm địa điểm, quản lý nhân viên chỉ với vài thao tác</li>
                  <li>Nhận thông báo khi có khách đặt sân hoặc yêu cầu hỗ trợ</li>
                  <li>Truy cập mọi lúc mọi nơi trên máy tính, điện thoại</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4 mt-6 justify-center">
              <Tooltip title="Gửi email hỗ trợ">
                <Button
                  type="primary"
                  icon={<MailOutlined />}
                  onClick={handleContact}
                  size="large"
                >
                  Gửi hỗ trợ
                </Button>
              </Tooltip>
              <Tooltip title="Gọi hotline">
                <Button
                  type="default"
                  icon={<PhoneOutlined />}
                  onClick={handleHotline}
                  size="large"
                >
                  Gọi hotline
                </Button>
              </Tooltip>
              <Tooltip title="Xem hướng dẫn sử dụng">
                <Button
                  type="dashed"
                  icon={<QuestionCircleOutlined />}
                  onClick={handleGuide}
                  size="large"
                >
                  Hướng dẫn sử dụng
                </Button>
              </Tooltip>
              <Tooltip title="Đến Fanpage">
                <Button
                  type="default"
                  icon={<InfoCircleOutlined />}
                  onClick={() => window.open("https://facebook.com/sportzone", "_blank")}
                  size="large"
                >
                  Fanpage
                </Button>
              </Tooltip>
            </div>
          </Card>
        )}
        {tab === "location" && (
          <OwnerLocationTab
            onDetail={(record: BusinessLocation) =>
              navigate(`/businessLocation/${record.id}`)
            }
          />
        )}
        {tab === "court" && (
          <OwnerCourtTab
            onDetail={(record: Court) => {
              /* TODO: điều hướng sang trang chi tiết sân nếu có */
            }}
          />
        )}
        {tab === "booking" && (
          <OwnerBookingTab
            onDetail={(record: Slot) => {
              /* TODO: điều hướng sang trang chi tiết booking nếu có */
            }}
          />
        )}
        {tab === "staff" && <OwnerStaffTab />}
      </main>
    </div>
  );
}