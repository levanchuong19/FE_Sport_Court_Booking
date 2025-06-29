import { Calendar, Clock, MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import formatVND from "../Utils/currency";
import api from "../Config/api";
import type { Slot } from "../Model/slot";
import { useEffect, useState } from "react";

// Giả lập lấy user từ account đăng nhập
const user = {
  name: "Nguyễn Văn A",
  phone: "0901234567",
  email: "nguyenvana@gmail.com",
};

export default function ConfirmBooking() {
  // const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookingInfo, setBookingInfo] = useState<Slot | null>(null);
  // const bookingInfo = location.state;
  // console.log(bookingInfo.time);

  console.log("id", id);
  const fetchBookingInfo = async () => {
    const response = await api.get(`slot/get/${id}`);
    setBookingInfo(response.data.data);
    console.log("bookingInfo", response.data.data);
  };

  useEffect(() => {
    fetchBookingInfo();
  }, []);

  // Xử lý giá từ BE (string, có thể có dấu phẩy)
  const priceNum =
    bookingInfo?.slotType === "WEEKLY"
      ? bookingInfo.court.prices.find((price) => price.priceType === "WEEKLY")
          ?.price
      : bookingInfo?.slotType === "DAILY"
      ? bookingInfo.court.prices.find((price) => price.priceType === "DAILY")
          ?.price
      : bookingInfo?.slotType === "MONTHLY"
      ? bookingInfo.court.prices.find((price) => price.priceType === "MONTHLY")
          ?.price
      : bookingInfo?.slotType === "HOURLY"
      ? bookingInfo.court.prices.find((price) => price.priceType === "HOURLY")
          ?.price
      : "";
  const serviceFee = 0; // hoặc 200000 tuỳ chính sách
  const total = Number(priceNum) + Number(serviceFee);

  if (!bookingInfo) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <div className="text-xl mb-4">
          Không có thông tin đặt sân. Vui lòng đặt lại!
        </div>
        <button
          className="px-6 py-2 bg-black text-white rounded-lg"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </button>
      </div>
    );
  }

  const handleBooking = async () => {
    const response = await api.post(`payment/createURL/${id}`);
    console.log(response.data);
    window.location.href = response.data.data;
  };

  return (
    <div className="max-w-5xl border border-gray-200 rounded-xl shadow-lg p-8 mt-10 mx-auto py-8 mb-10">
      <button
        className="mb-6 flex items-center gap-2 text-gray-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        <span className="text-xl">&larr;</span> Quay lại
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Thông tin đặt sân */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Thông tin đặt sân</h2>
          <div className="mb-4">
            <label className="block font-medium mb-1">Họ và tên</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
              value={user.name}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Số điện thoại</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
              value={user.phone}
              disabled
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-1">Email</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-100"
              value={user.email}
              disabled
            />
          </div>
          <div className="mb-6">
            <label className="block font-medium mb-1">Ghi chú</label>
            <textarea
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              placeholder="Nhập ghi chú nếu có"
              rows={3}
            />
          </div>
          <button
            onClick={handleBooking}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
          >
            Xác nhận đặt sân
          </button>
        </div>
        {/* Chi tiết đặt sân */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Chi tiết đặt sân</h2>
          <div className="bg-white border border-gray-200 rounded-xl shadow p-6">
            <div className="flex items-center gap-2 mb-2 text-green-600">
              <Calendar /> <span className="font-semibold">Ngày đặt</span>
            </div>
            <div className="mb-4 text-gray-700">
              {/* Thursday,  */}
              {/* {bookingInfo.startDate} - {bookingInfo.endDate} */}
              {bookingInfo.startDate === bookingInfo.endDate
                ? bookingInfo.startDate
                : bookingInfo.startDate + " - " + bookingInfo.endDate}
            </div>
            <div className="flex items-center gap-2 mb-2 text-green-600">
              <Clock />{" "}
              <span className="font-semibold">
                Thời gian (
                {bookingInfo.slotType === "WEEKLY"
                  ? "Cả tuần"
                  : bookingInfo.slotType === "DAILY"
                  ? "Cả ngày"
                  : bookingInfo.slotType === "MONTHLY"
                  ? "Cả tháng"
                  : bookingInfo.slotType === "HOURLY"
                  ? "Theo giờ"
                  : ""}
                )
              </span>
            </div>
            <div className="mb-4 text-gray-700">
              {bookingInfo.startTime} - {bookingInfo.endTime}
            </div>
            <div className="flex items-center gap-2 mb-2 text-green-600">
              <MapPin /> <span className="font-semibold">Loại sân</span>
            </div>
            <div className="mb-4 text-gray-700">
              {bookingInfo.court.courtType}
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>
                  Giá thuê sân (
                  {bookingInfo.slotType === "WEEKLY"
                    ? "Cả tuần"
                    : bookingInfo.slotType === "DAILY"
                    ? "Cả ngày"
                    : bookingInfo.slotType === "MONTHLY"
                    ? "Cả tháng"
                    : bookingInfo.slotType === "HOURLY"
                    ? "Theo giờ"
                    : ""}
                  )
                </span>
                <span className="font-semibold">
                  {formatVND(Number(priceNum))}
                </span>
              </div>
              <div className="flex justify-between mb-2 text-gray-500">
                <span>Phí dịch vụ</span>
                <span>{formatVND(Number(serviceFee))}</span>
              </div>
              <div className="flex justify-between mt-4 text-lg font-bold">
                <span>Tổng cộng</span>
                <span className="text-green-600">
                  {formatVND(Number(total))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
