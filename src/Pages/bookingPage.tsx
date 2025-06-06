import { useState } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const fieldTypes = [
  { key: "soccer", label: "Sân bóng đá", icon: <svg width="40" height="40" fill="none"><circle cx="20" cy="20" r="16" stroke="#22c55e" strokeWidth="2"/><circle cx="20" cy="20" r="8" stroke="#22c55e" strokeWidth="2"/></svg> },
  { key: "tennis", label: "Sân tennis", icon: <svg width="40" height="40" fill="none"><rect x="8" y="8" width="24" height="24" rx="6" stroke="#22c55e" strokeWidth="2"/><rect x="16" y="16" width="8" height="8" rx="2" stroke="#22c55e" strokeWidth="2"/></svg> },
  { key: "badminton", label: "Sân cầu lông", icon: <svg width="40" height="40" fill="none"><circle cx="20" cy="20" r="16" stroke="#22c55e" strokeWidth="2"/><line x1="12" y1="28" x2="28" y2="12" stroke="#22c55e" strokeWidth="2"/></svg> },
];

const weekDays = [
  { label: "Thứ 5", date: "05", month: "thg 6" },
  { label: "Thứ 6", date: "06", month: "thg 6" },
  { label: "Thứ 7", date: "07", month: "thg 6" },
  { label: "CN", date: "08", month: "thg 6" },
  { label: "Thứ 2", date: "09", month: "thg 6" },
  { label: "Thứ 3", date: "10", month: "thg 6" },
  { label: "Thứ 4", date: "11", month: "thg 6" },
];

const timeSlots = [
  { label: "Buổi sáng", slots: ["07:00", "08:00", "09:00", "10:00", "11:00"] },
  { label: "Buổi chiều", slots: ["13:00", "14:00", "15:00", "16:00", "17:00"] },
  { label: "Buổi tối", slots: ["18:00", "19:00", "20:00", "21:00", "22:00"] },
];

const bookedSlots = ["09:00", "14:00", "19:00"];

const bookingTypes = [
  {
    key: "hour",
    label: "Theo giờ",
    desc: "Đặt sân theo từng giờ",
    price: "200.000đ/giờ",
    icon: <svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="14" stroke="#22c55e" strokeWidth="2"/><path d="M16 8v8l6 3" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/></svg>
  },
  {
    key: "day",
    label: "Theo ngày",
    desc: "Đặt sân cả ngày (8h-22h)",
    price: "2.000.000đ/ngày",
    icon: <svg width="32" height="32" fill="none"><rect x="4" y="6" width="24" height="20" rx="4" stroke="#22c55e" strokeWidth="2"/><rect x="10" y="12" width="8" height="8" rx="2" stroke="#22c55e" strokeWidth="2"/></svg>
  },
  {
    key: "week",
    label: "Theo tuần",
    desc: "Đặt sân cả tuần (7 ngày)",
    price: "12.000.000đ/tuần",
    icon: <svg width="32" height="32" fill="none"><rect x="4" y="6" width="24" height="20" rx="4" stroke="#22c55e" strokeWidth="2"/><rect x="8" y="10" width="16" height="12" rx="2" stroke="#22c55e" strokeWidth="2"/></svg>
  },
  {
    key: "month",
    label: "Theo tháng",
    desc: "Đặt sân cả tháng (30 ngày)",
    price: "45.000.000đ/tháng",
    icon: <svg width="32" height="32" fill="none"><rect x="4" y="6" width="24" height="20" rx="4" stroke="#22c55e" strokeWidth="2"/><rect x="12" y="12" width="8" height="8" rx="2" stroke="#22c55e" strokeWidth="2"/></svg>
  },
];

export default function BookingPage() {
  const [tab, setTab] = useState("date");
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedField, setSelectedField] = useState("soccer");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingType, setBookingType] = useState("hour");
  const navigate = useNavigate();

  const handleConfirm = () => {
    const priceNum = bookingType === "day" ? 2000000 : bookingType === "week" ? 12000000 : bookingType === "month" ? 45000000 : 200000;
    const bookingInfo = {
      date: `${weekDays[selectedDay].date}/06/2025`,
      type: fieldTypes.find(f => f.key === selectedField)?.label,
      time:
        bookingType === "day"
          ? "08:00 - 22:00 (14 giờ)"
          : bookingType === "week"
          ? "02/06-08/06"
          : bookingType === "month"
          ? "30 ngày liên tiếp"
          : selectedSlot,
      price: priceNum,
      serviceFee: 200000,
      total: priceNum + 200000,
      bookingType,
    };
    navigate("/confirm-booking", { state: bookingInfo });
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-6">Đặt Lịch Sân Thể Thao</h1>
      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`flex-1 py-3 rounded-t-lg text-lg font-semibold ${tab === "date" ? "bg-white text-black shadow" : "bg-gray-100 text-gray-400"}`}
          onClick={() => setTab("date")}
        >
          Chọn ngày
        </button>
        <button
          className={`flex-1 py-3 rounded-t-lg text-lg font-semibold ${tab === "list" ? "bg-white text-black shadow" : "bg-gray-100 text-gray-400"}`}
          onClick={() => setTab("list")}
        >
          Danh sách sân
        </button>
        <button
          className={`flex-1 py-3 rounded-t-lg text-lg font-semibold ${tab === "map" ? "bg-white text-black shadow" : "bg-gray-100 text-gray-400"}`}
          onClick={() => setTab("map")}
        >
          Bản đồ
        </button>
      </div>
      {/* Main card */}
      <div className="bg-white rounded-2xl shadow p-8">
        {/* Chọn ngày */}
        <div>
          {/* Hàng trên: Tiêu đề + mũi tên */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Calendar className="text-green-600" />
              <span className="font-semibold text-lg">Chọn ngày</span>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg border flex items-center justify-center text-xl text-gray-400 hover:bg-gray-100">&lt;</button>
              <button className="w-10 h-10 rounded-lg border flex items-center justify-center text-xl text-gray-400 hover:bg-gray-100">&gt;</button>
            </div>
          </div>
          {/* Dãy ngày: */}
          <div className="grid grid-cols-7 gap-2 w-full mb-6">
            {weekDays.map((d, idx) => (
              <button
                key={idx}
                className={`flex flex-col items-center px-4 py-2 rounded-lg border transition-all w-full
                  ${selectedDay === idx
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-black border-gray-200 hover:bg-gray-100"
                  }`}
                onClick={() => setSelectedDay(idx)}
              >
                <span className="text-sm">{d.label}</span>
                <span className="text-2xl font-bold">{d.date}</span>
                <span className="text-xs">{d.month}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Chọn loại sân */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="text-green-600" />
            <span className="font-semibold text-lg">Chọn loại sân</span>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {fieldTypes.map((f) => (
              <button
                key={f.key}
                className={`flex flex-col items-center justify-center border-2 rounded-xl py-6 transition-all ${
                  selectedField === f.key
                    ? "border-green-500 text-green-600 bg-green-50"
                    : "border-gray-200 text-black bg-white hover:bg-gray-50"
                }`}
                onClick={() => setSelectedField(f.key)}
              >
                <div className="mb-2">{f.icon}</div>
                <span className="font-semibold">{f.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Loại đặt sân */}
        <div>
          <div className="flex items-center gap-2 mb-4 mt-8">
            <Clock className="text-green-600" />
            <span className="font-semibold text-lg">Loại đặt sân</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {bookingTypes.map((type) => (
              <button
                key={type.key}
                className={`flex flex-col items-center justify-center border-2 rounded-xl py-6 transition-all w-full
                  ${bookingType === type.key
                    ? "border-green-500 text-green-600 bg-green-50"
                    : "border-gray-200 text-black bg-white hover:bg-gray-50"
                  }`}
                onClick={() => setBookingType(type.key)}
              >
                <div className="mb-2">{type.icon}</div>
                <span className="font-semibold">{type.label}</span>
                <span className="text-sm text-gray-500">{type.desc}</span>
                <span className="mt-2 text-green-600 font-bold">{type.price}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Chọn giờ hoặc xác nhận đặt */}
        {bookingType === "hour" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-green-600" />
              <span className="font-semibold text-lg">Chọn giờ</span>
            </div>
            <div className="mb-2 text-gray-500 text-sm">
              Ngày: {weekDays[selectedDay].date}/06/2025 - Loại sân: {fieldTypes.find(f => f.key === selectedField)?.label}
            </div>
            {timeSlots.map((group, idx) => (
              <div key={idx} className="mb-4">
                <div className="font-semibold mb-2">{group.label}</div>
                <div className="mb-6 w-full grid grid-cols-5 gap-2">
                  {group.slots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        className={`px-6 py-2 rounded-lg border text-lg font-semibold transition-all
                          ${isBooked
                            ? "bg-gray-50 text-red-400 border-gray-200 cursor-not-allowed"
                            : selectedSlot === slot
                            ? "bg-green-500 text-white border-green-500"
                            : "bg-white text-black border-gray-200 hover:bg-green-50"}
                        `}
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        {slot} {isBooked && <span className="text-xs ml-1">Đã đặt</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition mt-4"
              onClick={handleConfirm}
              disabled={!selectedSlot}
            >
              Xác nhận đặt giờ
            </button>
          </div>
        )}
        {bookingType !== "hour" && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-green-600" />
              <span className="font-semibold text-lg">
                Xác nhận đặt {bookingType === "day" ? "cả ngày" : bookingType === "week" ? "cả tuần" : "cả tháng"}
              </span>
            </div>
            <div className="bg-white border rounded-xl shadow p-6 max-w-lg mx-auto">
              <div className="text-xl font-semibold mb-2">
                Đặt sân {bookingType === "day" ? "cả ngày" : bookingType === "week" ? "cả tuần" : "cả tháng"}
              </div>
              <div className="text-gray-600 mb-1">
                Ngày: {weekDays[selectedDay].date}/06/2025
              </div>
              <div className="text-gray-600 mb-1">
                Loại sân: {fieldTypes.find(f => f.key === selectedField)?.label}
              </div>
              <div className="text-gray-600 mb-1">
                Thời gian: {bookingType === "day" && "08:00 - 22:00 (14 giờ)"}
                {bookingType === "week" && "7 ngày liên tiếp"}
                {bookingType === "month" && "30 ngày liên tiếp"}
              </div>
              <div className="text-gray-900 font-bold mb-4">
                Giá: {bookingTypes.find(t => t.key === bookingType)?.price}
              </div>
              <button
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
                onClick={handleConfirm}
              >
                Xác nhận đặt {bookingType === "day" ? "cả ngày" : bookingType === "week" ? "cả tuần" : "cả tháng"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
