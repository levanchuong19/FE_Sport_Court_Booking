import { Award, Clock, Handshake, Mail, MessageCircle, Phone, Send, Shield, TrendingUp, Users } from "lucide-react";
import React from "react";

const RegisterPartner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center py-16 text-white text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 w-full">Trở thành đối tác của chúng tôi</h1>
        <p className="text-lg mb-8  mx-auto w-full">
          Đăng ký sân thể thao của bạn lên nền tảng, giúp bạn tăng doanh thu và tiếp cận hàng nghìn khách hàng mỗi ngày
        </p>
        <div className="flex flex-wrap justify-center gap-30 mb-10">
          {/* Features */}
          <div className="flex flex-col items-center w-52">
            <div className="bg-gray-400 bg-opacity-20 rounded-full p-4 mb-2">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="font-bold text-lg">Tăng doanh thu</div>
            <div className="text-sm">Tăng 300% lượng khách đặt sân</div>
          </div>
          <div className="flex flex-col items-center w-48">
            <div className="bg-gray-400 bg-opacity-20 rounded-full p-4 mb-2">
            <Users className="w-8 h-8" />
            </div>
            <div className="font-bold text-lg">Khách hàng rộng</div>
            <div className="text-sm">Tiếp cận 500K+ người dùng</div>
          </div>
          <div className="flex flex-col items-center w-48">
            <div className="bg-gray-400 bg-opacity-20 rounded-full p-4 mb-2">
            <Shield className="w-8 h-8" />
            </div>
            <div className="font-bold text-lg">Thanh toán an toàn</div>
            <div className="text-sm">Đảm bảo thanh toán 100%</div>
          </div>
          <div className="flex flex-col items-center w-48">
            <div className="bg-gray-400 bg-opacity-20 rounded-full p-4 mb-2">
            <Award className="w-8 h-8" />
            </div>
            <div className="font-bold text-lg">Hỗ trợ 24/7</div>
            <div className="text-sm">Đội ngũ hỗ trợ chuyên nghiệp</div>
          </div>
        </div>
        <button className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow flex items-center gap-2 mx-auto">
        <Handshake className="w-5 h-5 mr-2" /> Đăng ký ngay
        </button>
      </section>

      {/* Registration Form Section */}
      <section className="bg-white py-12 px-2 md:px-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form */}
          <form className="bg-white rounded-xl border border-gray-200 shadow-lg p-8 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
            <Handshake className="w-6 h-6 text-blue-600" /> Đăng ký đối tác
            </h2>
            <p className="text-gray-500 mb-4">Điền thông tin để trở thành đối tác và đăng sân của bạn lên nền tảng</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Họ tên chủ sân *</label>
                <input className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" placeholder="Nguyễn Văn A" required />
              </div>
              <div>
                <label className="block text-sm font-medium">Số điện thoại *</label>
                <input className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" placeholder="0901 234 567" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Email liên hệ *</label>
              <input className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" placeholder="owner@example.com" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Tên sân thể thao *</label>
              <input className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" placeholder="Sân bóng ABC" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Loại sân *</label>
              <select className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" required>
                <option>Chọn loại sân</option>
                <option>Bóng đá</option>
                <option>Bóng rổ</option>
                <option>Tennis</option>
                <option>Cầu lông</option>
                <option>Khác</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Địa chỉ sân *</label>
              <textarea className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Số lượng sân</label>
                <input className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" type="number" min="1" defaultValue={1} />
              </div>
              <div>
                <label className="block text-sm font-medium">Giá thuê (VNĐ/giờ)</label>
                <input className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" placeholder="100,000 - 200,000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Tiện ích có sẵn</label>
              <textarea className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" placeholder="Ví dụ: Bãi đậu xe, phòng thay đồ, căn tin, wifi..." />
            </div>
            <div>
              <label className="block text-sm font-medium">Giấy phép kinh doanh</label>
              <input className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" placeholder="Số giấy phép kinh doanh (nếu có)" />
            </div>
            <div>
              <label className="block text-sm font-medium">Ghi chú thêm</label>
              <textarea className="w-full border border-gray-200 rounded-md px-3 py-2 mt-1" placeholder="Thông tin bổ sung về sân hoặc yêu cầu đặc biệt..." />
            </div>
            <button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2">
              <Send className="w-5 h-5 mr-2" /> Gửi đăng ký
            </button>
          </form>

          {/* Info Side Panel */}
          <div className="flex flex-col gap-6">
            {/* Lợi ích đối tác */}
            <div className="bg-white rounded-xl shadow p-6 mb-2">
              <h3 className="text-xl font-bold mb-2 text-green-700 flex items-center gap-2">
              <Award className="w-5 h-5 text-green-600" /> Lợi ích đối tác
              </h3>
              <div className="space-y-4">
              <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Tăng doanh thu đến 300%</p>
                      <p className="text-sm text-gray-600">Tiếp cận hàng nghìn khách hàng tiềm năng mỗi ngày</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Quản lý đặt sân tự động</p>
                      <p className="text-sm text-gray-600">Hệ thống quản lý lịch đặt sân thông minh</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Thanh toán đảm bảo</p>
                      <p className="text-sm text-gray-600">Nhận tiền ngay sau khi khách hàng sử dụng dịch vụ</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Marketing miễn phí</p>
                      <p className="text-sm text-gray-600">Quảng bá sân trên các kênh digital của chúng tôi</p>
                    </div>
                  </div>
              </div>
            </div>
            {/* Quy trình đăng ký */}
            <div className="bg-white rounded-xl shadow p-6 mb-2">
              <h3 className="text-xl font-bold mb-2 text-blue-700 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" /> Quy trình đăng ký
              </h3>
              <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Điền form đăng ký</p>
                      <p className="text-sm text-gray-600">Cung cấp thông tin cơ bản về sân</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Xác minh thông tin</p>
                      <p className="text-sm text-gray-600">Đội ngũ sẽ liên hệ xác minh trong 24h</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Khảo sát thực tế</p>
                      <p className="text-sm text-gray-600">Nhân viên đến khảo sát và chụp ảnh sân</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                      4
                    </div>
                    <div>
                      <p className="font-medium">Đăng sân lên hệ thống</p>
                      <p className="text-sm text-gray-600">Được phép đăng sân và bắt đầu nhận đặt chỗ</p>
                    </div>
                  </div>
                </div>
            </div>
            {/* Chính sách hoa hồng */}
            <div className="bg-orange-50 rounded-xl shadow p-6 mb-2">
              <h3 className="text-xl font-bold mb-2 text-orange-700 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />Chính sách hoa hồng
              </h3>
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg ">Hoa hồng nền tảng</div>
                <div className="bg-white rounded px-2 py-1 text-orange-700 font-semibold">10%</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg ">Phí thanh toán</div>
                <div className="bg-white rounded px-2 py-1 text-orange-700 font-semibold">0%</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-lg ">Bạn nhận được</div>
                <div className="bg-green-500 rounded px-2 py-1 text-white font-semibold">90%</div>
              </div>
              <div className="text-xs text-orange-600 mt-2 border-t border-orange-400 pt-2">* Không có phí đăng ký, phí hàng tháng hay phí ẩn nào khác</div>
            </div>
            {/* Yêu cầu đối tác */}
            <div className="bg-white rounded-xl shadow p-6 mb-2">
              <h3 className="text-xl font-bold mb-2 text-purple-700 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" /> Yêu cầu đối tác
              </h3>
              <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Sân có địa chỉ cố định, rõ ràng</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Chất lượng sân đạt tiêu chuẩn</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Có nhân viên quản lý tại chỗ</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Tuân thủ giờ hoạt động đã đăng ký</span>
                  </div>
                </div>
            </div>
            {/* Hỗ trợ đối tác */}
            <div className="bg-green-50 rounded-xl shadow p-6">
              <h3 className="text-xl font-bold mb-2 text-green-700 flex items-center gap-2">
              <Phone className="w-5 h-5" /> Hỗ trợ đối tác
              </h3>
              <div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">Hotline đối tác</p>
                        <p className="text-sm text-green-600">1900 5678</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">Email đối tác</p>
                        <p className="text-sm text-green-600">partner@sportbooking.vn</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="font-medium text-sm">Zalo</p>
                        <p className="text-sm text-green-600">0987654321</p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPartner; 