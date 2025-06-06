import { Calendar, CheckCircle, CreditCard, Mail, MapPin, Phone, Search, User, Clock } from "lucide-react";

export default function GuidePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header gradient */}
      <div className="w-full py-16 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Hướng dẫn & Liên hệ</h1>
        <div className="text-xl opacity-90">Tìm hiểu cách sử dụng nền tảng và liên hệ với chúng tôi khi cần hỗ trợ</div>
      </div>
      {/* Hướng dẫn sử dụng */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-2">Hướng dẫn sử dụng</h2>
        <div className="text-center text-gray-500 mb-10">Làm theo các bước đơn giản để đặt sân thể thao yêu thích của bạn</div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-200">
            <div className="bg-green-100 rounded-full p-4 mb-4"><Search className="text-green-500 w-8 h-8" /></div>
            <div className="font-bold text-lg mb-2">Bước 1: Tìm kiếm</div>
            <div className="text-gray-500 text-center">Tìm kiếm sân thể thao theo địa điểm, loại sân và thời gian mong muốn</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-200">
            <div className="bg-blue-100 rounded-full p-4 mb-4"><Calendar className="text-blue-500 w-8 h-8" /></div>
            <div className="font-bold text-lg mb-2">Bước 2: Chọn lịch</div>
            <div className="text-gray-500 text-center">Chọn ngày giờ phù hợp và xem tình trạng sân còn trống</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-200">
            <div className="bg-yellow-100 rounded-full p-4 mb-4"><CreditCard className="text-yellow-500 w-8 h-8" /></div>
            <div className="font-bold text-lg mb-2">Bước 3: Thanh toán</div>
            <div className="text-gray-500 text-center">Thanh toán an toàn qua ví điện tử VNPAY</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-200">
            <div className="bg-purple-100 rounded-full p-4 mb-4"><CheckCircle className="text-purple-500 w-8 h-8" /></div>
            <div className="font-bold text-lg mb-2">Bước 4: Xác nhận</div>
            <div className="text-gray-500 text-center">Nhận xác nhận đặt sân qua email và đến sân đúng giờ</div>
          </div>
        </div>
        {/* FAQ & Policy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4"><Search className="text-green-500" /><span className="font-bold text-lg">Câu hỏi thường gặp</span></div>
            <div className="mb-3">
              <div className="font-semibold">Làm thế nào để hủy đặt sân?</div>
              <div className="text-gray-500">Hiện tại nền tảng chưa hỗ trợ hủy lịch hoàn tiền nên bạn hãy kiểm tra thật kỹ trước khi đặt sân.</div>
            </div>
            <div className="mb-3">
              <div className="font-semibold">Có thể đặt sân cho nhiều ngày không?</div>
              <div className="text-gray-500">Có, bạn có thể đặt sân định kỳ hàng ngày, hàng tuần hoặc hàng tháng với giá ưu đãi.</div>
            </div>
            <div>
              <div className="font-semibold">Phương thức thanh toán nào được hỗ trợ?</div>
              <div className="text-gray-500">Chúng tôi hỗ trợ thanh toán qua ví điện từ VNPAY.</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4"><Clock className="text-blue-500" /><span className="font-bold text-lg">Chính sách & Quy định</span></div>
            <div className="mb-2"><span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 text-xs">Thời gian</span> Sân mở cửa từ 5:00 - 23:00 hàng ngày. Đặt sân tối thiểu 1 giờ.</div>
            <div className="mb-2"><span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 text-xs">Hủy sân</span> Không thể hủy sân, chỉ có thể linh động đổi lịch.</div>
            <div><span className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 text-xs">Thiết bị</span> Khách hàng tự chuẩn bị dụng cụ thể thao. Một số sân có cho thuê.</div>
          </div>
        </div>
        {/* Liên hệ */}
        <h2 className="text-3xl font-bold text-center mb-2">Liên hệ với chúng tôi</h2>
        <div className="text-center text-gray-500 mb-10">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Hãy liên hệ qua các kênh dưới đây</div>
        <div className="max-w-6xl mx-auto px-2 py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-200">
            <div className="bg-green-100 rounded-full p-4 mb-4"><Phone className="text-green-500 w-8 h-8" /></div>
            <div className="font-bold text-lg mb-2">Gọi điện ngay</div>
            <div className="text-gray-500 text-center mb-4">Hỗ trợ trực tiếp 24/7</div>
            <div className="w-full"><div className="border border-gray-200 rounded-lg py-2 text-center font-semibold">1900 1234</div></div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-200">
            <div className="bg-yellow-100 rounded-full p-4 mb-4"><Mail className="text-yellow-500 w-8 h-8" /></div>
            <div className="font-bold text-lg mb-2">Gửi Email</div>
            <div className="text-gray-500 text-center mb-4">Phản hồi trong 2 giờ</div>
            <div className="w-full"><div className="border border-gray-200 rounded-lg py-2 text-center font-semibold">Gửi email</div></div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border border-gray-200">
            <div className="bg-purple-100 rounded-full p-4 mb-4"><MapPin className="text-purple-500 w-8 h-8" /></div>
            <div className="font-bold text-lg mb-2">Đến trực tiếp</div>
            <div className="text-gray-500 text-center mb-4">Văn phòng tại TP.HCM</div>
            <div className="w-full"><div className="border border-gray-200 rounded-lg py-2 text-center font-semibold">Xem bản đồ</div></div>
          </div>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Thông tin liên hệ */}
          <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="font-bold text-xl mb-4">Thông tin liên hệ</div>
            <div className="flex items-center gap-3 mb-3"><Phone className="text-green-500" /> <span className="font-semibold">Hotline</span> 1900 1234</div>
            <div className="flex items-center gap-3 mb-3"><Mail className="text-blue-500" /> <span className="font-semibold">Email</span> support@sportbooking.vn</div>
            <div className="flex items-center gap-3 mb-3"><MapPin className="text-orange-500" /> <span className="font-semibold">Địa chỉ</span> 123 Nguyễn Văn Linh, Q.7, TP.HCM</div>
            <div className="flex items-center gap-3 mb-3"><Clock className="text-purple-500" /> <span className="font-semibold">Giờ làm việc</span> 24/7 - Hỗ trợ trực tuyến</div>
          {/* Social */}
        <div className=" max-w-2xl mx-auto mb-12 pt-6">
          <div className="font-bold text-xl mb-4">Theo dõi chúng tôi</div>
          <div className="flex gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png" alt="Facebook" className="w-10 h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png" alt="Zalo" className="w-10 h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png" alt="Instagram" className="w-10 h-10" />
          </div>
        </div>
          </div>
          {/* Form liên hệ */}
          <form className="bg-white rounded-xl shadow p-6 border border-gray-200">
            <div className="font-bold text-xl mb-4">Gửi tin nhắn cho chúng tôi</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-1 font-medium">Họ và tên *</label>
                <input className="w-full border rounded-lg px-3 py-2 border-gray-200" placeholder="Nhập họ và tên" required />
              </div>
              <div>
                <label className="block mb-1 font-medium">Số điện thoại *</label>
                <input className="w-full border rounded-lg px-3 py-2 border-gray-200" placeholder="Nhập số điện thoại" required />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email *</label>
                <input className="w-full border rounded-lg px-3 py-2 border-gray-200" placeholder="Nhập địa chỉ email" required />
              </div>
              <div>
                <label className="block mb-1 font-medium">Chủ đề</label>
                <input className="w-full border rounded-lg px-3 py-2 border-gray-200" placeholder="Chủ đề tin nhắn" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-medium">Nội dung *</label>
              <textarea className="w-full border rounded-lg px-3 py-2 border-gray-200" rows={4} placeholder="Nhập nội dung tin nhắn của bạn..." required />
            </div>
            <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">Gửi tin nhắn</button>
          </form>
        </div>
        
      </div>
    </div>
  );
} 