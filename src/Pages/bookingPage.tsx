import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { Court } from "../Model/court";
import api from "../Config/api";
import formatVND from "../Utils/currency";
import { Radio } from "antd";
import { customAlert } from "../Components/customAlert";
import { jwtDecode } from "jwt-decode";
import type { JwtPayload } from "../Model/user";

const fieldTypes = [
  {
    key: "soccer",
    label: "Sân bóng đá",
    icon: (
      <svg width="40" height="40" fill="none">
        <circle cx="20" cy="20" r="16" stroke="#22c55e" strokeWidth="2" />
        <circle cx="20" cy="20" r="8" stroke="#22c55e" strokeWidth="2" />
      </svg>
    ),
  },
  {
    key: "tennis",
    label: "Sân tennis",
    icon: (
      <svg width="40" height="40" fill="none">
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          rx="6"
          stroke="#22c55e"
          strokeWidth="2"
        />
        <rect
          x="16"
          y="16"
          width="8"
          height="8"
          rx="2"
          stroke="#22c55e"
          strokeWidth="2"
        />
      </svg>
    ),
  },
  {
    key: "badminton",
    label: "Sân cầu lông",
    icon: (
      <svg width="40" height="40" fill="none">
        <circle cx="20" cy="20" r="16" stroke="#22c55e" strokeWidth="2" />
        <line
          x1="12"
          y1="28"
          x2="28"
          y2="12"
          stroke="#22c55e"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

const getNext7Days = (offset = 0) => {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekDayLabels = [
    "CN",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset + i);
    days.push({
      label: weekDayLabels[d.getDay()],
      date: d.getDate().toString().padStart(2, "0"),
      month: `thg ${d.getMonth() + 1}`,
      fullDate: d,
    });
  }
  return days;
};

const timeSlots = [
  { label: "Buổi sáng", slots: ["07:00", "08:00", "09:00", "10:00", "11:00"] },
  { label: "Buổi chiều", slots: ["13:00", "14:00", "15:00", "16:00", "17:00"] },
  { label: "Buổi tối", slots: ["18:00", "19:00", "20:00", "21:00", "22:00"] },
];

// Hàm lấy ngày local dạng YYYY-MM-DD
const getLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Hàm chuẩn hóa ngày về YYYY-MM-DD
const normalizeDate = (dateStr: string) => {
  if (!dateStr) return "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  return getLocalDateString(d);
};

export default function BookingPage() {
  const [tab, setTab] = useState("date");
  const [selectedDay, setSelectedDay] = useState(0);
  // const [selectedField, setSelectedField] = useState("soccer");
  // const [selectedSlot, setSelectedSlot] = useState("");
  const [bookingType, setBookingType] = useState("HOURLY");
  const [court, setCourt] = useState<Court>();
  const navigate = useNavigate();
  const { id } = useParams();

  const [startDayOffset, setStartDayOffset] = useState(0);
  const [weekDays, setWeekDays] = useState(getNext7Days(0));
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [fullDay, setFullDay] = useState(true);
  const [selectedFixedSlot, setSelectedFixedSlot] = useState<string>("");

  const bookingTypes = [
    {
      key: "HOURLY",
      label: "Theo giờ",
      desc: "Đặt sân theo từng giờ",
      price:
        formatVND(
          court?.prices?.find((p) => p.priceType === "HOURLY")?.price || 0
        ) + "/giờ" || "N/A",
      icon: (
        <svg width="32" height="32" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#22c55e" strokeWidth="2" />
          <path
            d="M16 8v8l6 3"
            stroke="#22c55e"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      key: "DAILY",
      label: "Theo ngày",
      desc: "Đặt sân cả ngày (8h-22h)",
      price:
        formatVND(
          court?.prices?.find((p) => p.priceType === "DAILY")?.price || 0
        ) + "/ngày" || "N/A",
      icon: (
        <svg width="32" height="32" fill="none">
          <rect
            x="4"
            y="6"
            width="24"
            height="20"
            rx="4"
            stroke="#22c55e"
            strokeWidth="2"
          />
          <rect
            x="10"
            y="12"
            width="8"
            height="8"
            rx="2"
            stroke="#22c55e"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      key: "WEEKLY",
      label: "Theo tuần",
      desc: "Đặt sân cả tuần (7 ngày)",
      price:
        formatVND(
          court?.prices?.find((p) => p.priceType === "WEEKLY")?.price || 0
        ) + "/giờ/tuần" || "N/A",
      icon: (
        <svg width="32" height="32" fill="none">
          <rect
            x="4"
            y="6"
            width="24"
            height="20"
            rx="4"
            stroke="#22c55e"
            strokeWidth="2"
          />
          <rect
            x="8"
            y="10"
            width="16"
            height="12"
            rx="2"
            stroke="#22c55e"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    {
      key: "MONTHLY",
      label: "Theo tháng",
      desc: "Đặt sân cả tháng (30 ngày)",
      price:
        formatVND(
          court?.prices?.find((p) => p.priceType === "MONTHLY")?.price || 0
        ) + "/giờ/tháng" || "N/A",
      icon: (
        <svg width="32" height="32" fill="none">
          <rect
            x="4"
            y="6"
            width="24"
            height="20"
            rx="4"
            stroke="#22c55e"
            strokeWidth="2"
          />
          <rect
            x="12"
            y="12"
            width="8"
            height="8"
            rx="2"
            stroke="#22c55e"
            strokeWidth="2"
          />
        </svg>
      ),
    },
  ];

  const selectedDateStr = getLocalDateString(weekDays[selectedDay]?.fullDate);
  const todayStr = getLocalDateString(new Date());
  const isToday = selectedDateStr === todayStr;

  // Lọc các slot đã đặt cho ngày này (bao gồm cả booking theo giờ và theo tuần/tháng)
  const bookedSlots = (() => {
    const slots =
      court?.slots?.filter((s) => s.bookingStatus !== "OVERDUE") || [];
    const bookedTimes: string[] = [];

    slots.forEach((slot: any) => {
      const slotStartDate =
        typeof slot.startDate === "string" ? slot.startDate : "";
      const slotEndDate = typeof slot.endDate === "string" ? slot.endDate : "";
      const slotStartTime =
        typeof slot.startTime === "string" ? slot.startTime.slice(0, 5) : "";

      // Kiểm tra xem ngày được chọn có nằm trong khoảng thời gian của booking này không
      const isDateInRange =
        slotStartDate <= selectedDateStr && selectedDateStr <= slotEndDate;

      if (isDateInRange && slotStartTime) {
        bookedTimes.push(slotStartTime);
      }
    });

    return bookedTimes;
  })();

  const token = localStorage.getItem("token");
  let user: string;
  if (token) {
    const decodedToken: JwtPayload = jwtDecode(token);
    user = decodedToken.sub;
  }

  const fetchCourt = async () => {
    const response = await api.get(`court/get/{courtId}?courtId=${id}`);
    setCourt(response.data.data);
  };

  useEffect(() => {
    fetchCourt();
  }, [id]);

  const handleNextWeek = () => {
    if (startDayOffset + 7 < 30) {
      setStartDayOffset(startDayOffset + 7);
      setWeekDays(getNext7Days(startDayOffset + 7));
      setSelectedDay(0);
      setSelectedSlots([]);
    }
  };
  const handlePrevWeek = () => {
    if (startDayOffset - 7 >= 0) {
      setStartDayOffset(startDayOffset - 7);
      setWeekDays(getNext7Days(startDayOffset - 7));
      setSelectedDay(0);
      setSelectedSlots([]);
    }
  };

  const handleSlotClick = (slot: string) => {
    if (bookedSlots.includes(slot)) return;
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      if (selectedSlots.length === 0) {
        setSelectedSlots([slot]);
      } else {
        const toMinutes = (t: string) => {
          const [h, m] = t.split(":");
          return parseInt(h) * 60 + parseInt(m);
        };
        const slotMinutes = toMinutes(slot);
        const selectedMinutes = selectedSlots
          .map(toMinutes)
          .sort((a, b) => a - b);
        const min = selectedMinutes[0];
        const max = selectedMinutes[selectedMinutes.length - 1];
        if (slotMinutes === min - 60 || slotMinutes === max + 60) {
          setSelectedSlots(
            slotMinutes === min - 60
              ? [slot, ...selectedSlots]
              : [...selectedSlots, slot]
          );
        }
      }
    }
  };

  useEffect(() => {
    setSelectedSlots([]);
  }, [selectedDay, weekDays]);

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      customAlert(
        "Lỗi",
        "Vui lòng đăng nhập trước khi thực hiện !",
        "destructive"
      );
      navigate("/login");
      return;
    }
    if (!user) {
      customAlert("Lỗi", "Không tìm thấy thông tin người dùng.", "destructive");
      return;
    }
    if (!court || typeof court !== "object" || !("id" in court) || !court.id) {
      customAlert("Lỗi", "Không tìm thấy thông tin sân.", "destructive");
      return;
    }
    // Kiểm tra hợp lệ cho từng chế độ
    if (bookingType === "HOURLY" && selectedSlots.length === 0) {
      customAlert(
        "Lỗi đặt sân",
        "Vui lòng chọn ít nhất một khung giờ để đặt sân",
        "destructive"
      );
      return;
    }
    if (
      (bookingType === "WEEKLY" || bookingType === "MONTHLY") &&
      selectedSlots.length === 0
    ) {
      customAlert(
        "Lỗi đặt sân",
        "Vui lòng chọn ít nhất một khung giờ để đặt sân",
        "destructive"
      );
      return;
    }
    // Tính toán các trường cho payload
    let startDate = getLocalDateString(weekDays[selectedDay].fullDate);
    let endDate = startDate;
    let startTime = "";
    let endTime = "";
    let slotType = bookingType;
    if (bookingType === "HOURLY") {
      const sorted = [...selectedSlots].sort();
      startTime = sorted[0];
      const [endH, endM] = sorted[sorted.length - 1].split(":");
      endTime = (parseInt(endH) + 1).toString().padStart(2, "0") + ":" + endM;
    } else if (bookingType === "DAILY") {
      startTime = "08:00";
      endTime = "22:00";
    } else if (bookingType === "WEEKLY" || bookingType === "MONTHLY") {
      const sorted = [...selectedSlots].sort();
      startTime = sorted[0];
      const [endH, endM] = sorted[sorted.length - 1].split(":");
      endTime = (parseInt(endH) + 1).toString().padStart(2, "0") + ":" + endM;
      const days = bookingType === "WEEKLY" ? 7 : 30;
      const start = weekDays[selectedDay].fullDate;
      const end = new Date(start);
      end.setDate(end.getDate() + days - 1);
      startDate = getLocalDateString(start);
      endDate = getLocalDateString(end);
    }
    const payload = {
      slotType,
      account: user,
      court: court.id,
      startDate,
      endDate,
      startTime,
      endTime,
      paymentMethod: "VNPAY",
    };
    try {
      const response = await api.post("slot/create", payload);
      customAlert("Thành công", "Đặt sân thành công", "default");
      navigate(`/confirm-booking/${response.data.data.id}`);
    } catch (error: any) {
      customAlert(
        "Lỗi",
        error?.response?.data?.message || "Đặt sân thất bại",
        "destructive"
      );
    }
  };

  // Thêm hàm dùng chung kiểm tra slot đã bị đặt:
  const toHHmm = (t: string): string =>
    t && t.length >= 5 ? t.slice(0, 5) : t;
  const isSlotBooked = (slot: string, dateStr: string) => {
    return (court?.slots || []).some((s) => {
      const slotStartDate = typeof s.startDate === "string" ? s.startDate : "";
      const slotEndDate = typeof s.endDate === "string" ? s.endDate : "";
      const slotStartTime =
        typeof s.startTime === "string" ? toHHmm(s.startTime) : "";
      const slotEndTime =
        typeof s.endTime === "string" ? toHHmm(s.endTime) : "";
      if (slotStartDate <= dateStr && dateStr <= slotEndDate) {
        return slot >= slotStartTime && slot < slotEndTime;
      }
      return false;
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-6">
        Đặt Lịch Sân Thể Thao
      </h1>
      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`flex-1 py-3 rounded-t-lg text-lg font-semibold ${
            tab === "date"
              ? "bg-white text-black shadow"
              : "bg-gray-100 text-gray-400"
          }`}
          onClick={() => setTab("date")}
        >
          Chọn ngày
        </button>
        <button
          className={`flex-1 py-3 rounded-t-lg text-lg font-semibold ${
            tab === "list"
              ? "bg-white text-black shadow"
              : "bg-gray-100 text-gray-400"
          }`}
          onClick={() => setTab("list")}
        >
          Danh sách sân
        </button>
        <button
          className={`flex-1 py-3 rounded-t-lg text-lg font-semibold ${
            tab === "map"
              ? "bg-white text-black shadow"
              : "bg-gray-100 text-gray-400"
          }`}
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
              <button
                onClick={handlePrevWeek}
                className="w-10 h-10 rounded-lg border flex items-center justify-center text-xl text-gray-400 hover:bg-gray-100"
              >
                &lt;
              </button>
              <button
                onClick={handleNextWeek}
                className="w-10 h-10 rounded-lg border flex items-center justify-center text-xl text-gray-400 hover:bg-gray-100"
              >
                &gt;
              </button>
            </div>
          </div>
          {/* Dãy ngày: */}
          <div className="grid grid-cols-7 gap-2 w-full mb-6">
            {weekDays.map((d, idx) => (
              <button
                key={idx}
                className={`flex flex-col items-center px-4 py-2 rounded-lg border transition-all w-full
                  ${
                    selectedDay === idx
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
        {/* <div>
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
        </div> */}
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
                  ${
                    bookingType === type.key
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-gray-200 text-black bg-white hover:bg-gray-50"
                  }`}
                onClick={() => setBookingType(type.key)}
              >
                <div className="mb-2">{type.icon}</div>
                <span className="font-semibold">{type.label}</span>
                <span className="text-sm text-gray-500">{type.desc}</span>
                <span className="mt-2 text-green-600 font-bold">
                  {type.price}
                </span>
              </button>
            ))}
          </div>
        </div>
        {/* Chọn giờ hoặc xác nhận đặt */}
        {bookingType === "HOURLY" && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-green-600" />
              <span className="font-semibold text-lg">Chọn giờ</span>
            </div>
            <div className="mb-2 text-gray-500 text-sm">
              {/* Ngày: {weekDays[selectedDay].date}/06/2025 - Loại sân: {fieldTypes.find(f => f.key === selectedField)?.label} */}
              Ngày: {weekDays[selectedDay].date}/
              {weekDays[selectedDay].month.split(" ")[1]}/
              {weekDays[selectedDay].fullDate.getFullYear()} - Loại sân:{" "}
              {court?.courtType}
            </div>
            {timeSlots.map((group, idx) => (
              <div key={idx} className="mb-4">
                <div className="font-semibold mb-2">{group.label}</div>
                <div className="mb-6 w-full grid grid-cols-5 gap-2">
                  {group.slots.map((slot) => {
                    const dateStr = getLocalDateString(
                      weekDays[selectedDay].fullDate
                    );
                    const isBooked = isSlotBooked(slot, dateStr);
                    let isPast = false;
                    if (isToday) {
                      const [h, m] = slot.split(":");
                      const now = new Date();
                      const currentHour = now.getHours();
                      const currentMinute = now.getMinutes();
                      isPast =
                        parseInt(h) < currentHour ||
                        (parseInt(h) === currentHour &&
                          parseInt(m) <= currentMinute);
                    }
                    const isDisabled = isBooked || isPast;
                    return (
                      <button
                        key={slot}
                        className={`px-6 py-2 rounded-lg border text-lg font-semibold transition-all
                          ${
                            isBooked
                              ? "bg-gray-50 text-red-400 border-gray-200 cursor-not-allowed"
                              : isPast
                              ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                              : selectedSlots.includes(slot)
                              ? "bg-green-500 text-white border-green-500"
                              : "bg-white text-black border-gray-200 hover:bg-green-50"
                          }
                        `}
                        disabled={isDisabled}
                        onClick={() => handleSlotClick(slot)}
                      >
                        {slot}{" "}
                        {isBooked && (
                          <span className="text-xs ml-1">Đã đặt</span>
                        )}
                        {isPast && !isBooked && (
                          <span className="text-xs ml-1">Quá giờ</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition mt-4"
              onClick={handleConfirm}
            >
              Xác nhận đặt giờ
            </button>
          </div>
        )}
        {bookingType === "DAILY" && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-green-600" />
              <span className="font-semibold text-lg">
                Xác nhận đặt cả ngày
              </span>
            </div>
            <div className="bg-white border rounded-xl shadow p-6 max-w-lg mx-auto">
              <div className="text-xl font-semibold mb-2">Đặt sân cả ngày</div>
              <div className="text-gray-600 mb-1">
                Ngày: {weekDays[selectedDay].date}/
                {weekDays[selectedDay].month.split(" ")[1]}/
                {weekDays[selectedDay].fullDate.getFullYear()}
              </div>
              <div className="text-gray-600 mb-1">
                Loại sân: {court?.courtType}
              </div>
              <div className="text-gray-600 mb-1">Thời gian: 08:00 - 22:00</div>
              <div className="text-gray-900 font-bold mb-4">
                Giá: {bookingTypes.find((t) => t.key === "DAILY")?.price}
              </div>
              {(() => {
                const today = new Date();
                const selectedDate = weekDays[selectedDay].fullDate;
                const isToday =
                  getLocalDateString(selectedDate) ===
                  getLocalDateString(today);
                const nowHour = today.getHours();
                const isPast5PM = isToday && nowHour >= 17;
                // Kiểm tra đã có slot nào được đặt trong ngày này chưa
                const dateStr = getLocalDateString(selectedDate);
                const hasAnyBooking = (court?.slots || []).some((s) => {
                  const slotStartDate =
                    typeof s.startDate === "string" ? s.startDate : "";
                  const slotEndDate =
                    typeof s.endDate === "string" ? s.endDate : "";
                  return (
                    slotStartDate <= dateStr &&
                    dateStr <= slotEndDate &&
                    s.bookingStatus !== "OVERDUE"
                  );
                });
                if (isPast5PM) {
                  return (
                    <>
                      <button
                        className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed mt-2"
                        disabled
                      >
                        Không thể đặt nguyên ngày (đã qua 17:00)
                      </button>
                      <div className="text-red-500 text-center mt-2 text-sm">
                        Bạn chỉ có thể đặt nguyên ngày trước 17:00.
                      </div>
                    </>
                  );
                }
                if (hasAnyBooking) {
                  return (
                    <>
                      <button
                        className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed mt-2"
                        disabled
                      >
                        Không thể đặt nguyên ngày (đã có slot được đặt)
                      </button>
                      <div className="text-red-500 text-center mt-2 text-sm">
                        Vui lòng chọn ngày kế tiếp hoặc đặt sân theo giờ.
                      </div>
                    </>
                  );
                }
                return (
                  <button
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
                    onClick={handleConfirm}
                  >
                    Xác nhận đặt cả ngày
                  </button>
                );
              })()}
            </div>
          </div>
        )}
        {(bookingType === "WEEKLY" || bookingType === "MONTHLY") && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="text-green-600" />
              <span className="font-semibold text-lg">
                Chọn khung giờ cho tất cả các ngày trong{" "}
                {bookingType === "WEEKLY" ? "tuần" : "tháng"}
              </span>
            </div>
            <div>
              {timeSlots.map((group, idx) => (
                <div key={idx} className="mb-4">
                  <div className="font-semibold mb-2">{group.label}</div>
                  <div className="mb-6 w-full grid grid-cols-5 gap-2">
                    {group.slots.map((slot) => {
                      const dateStr = getLocalDateString(
                        weekDays[selectedDay].fullDate
                      );
                      let isPast = false;
                      if (dateStr === todayStr) {
                        const [h, m] = slot.split(":");
                        const now = new Date();
                        const currentHour = now.getHours();
                        const currentMinute = now.getMinutes();
                        if (
                          parseInt(h) < currentHour ||
                          (parseInt(h) === currentHour &&
                            parseInt(m) <= currentMinute)
                        ) {
                          isPast = true;
                        }
                      }
                      const isBooked = isSlotBooked(slot, dateStr);
                      const isSelected = selectedSlots.includes(slot);
                      const isDisabled = isBooked || isPast;
                      return (
                        <button
                          key={slot}
                          className={`px-6 py-2 rounded-lg border text-lg font-semibold transition-all
                            ${
                              isBooked
                                ? "bg-gray-50 text-red-400 border-gray-200 cursor-not-allowed"
                                : isPast
                                ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                                : isSelected
                                ? "bg-green-500 text-white border-green-500"
                                : "bg-white text-black border-gray-200 hover:bg-green-50"
                            }
                          `}
                          disabled={isDisabled}
                          onClick={() => {
                            if (isDisabled) return;
                            if (isSelected) {
                              setSelectedSlots(
                                selectedSlots.filter((s) => s !== slot)
                              );
                            } else {
                              // Chỉ cho phép chọn liên tục và tối đa 5 slot
                              let next = [...selectedSlots, slot];
                              const toMinutes = (t: string) => {
                                const [h, m] = t.split(":");
                                return parseInt(h) * 60 + parseInt(m);
                              };
                              const sorted = next
                                .map(toMinutes)
                                .sort((a, b) => a - b);
                              if (next.length > 5) return;
                              for (let i = 1; i < sorted.length; i++) {
                                if (sorted[i] - sorted[i - 1] !== 60) return;
                              }
                              setSelectedSlots(next);
                            }
                          }}
                          type="button"
                        >
                          {slot}
                          {isBooked && (
                            <span className="text-xs ml-1">Đã đặt</span>
                          )}
                          {isPast && !isBooked && (
                            <span className="text-xs ml-1">Quá giờ</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition mt-4"
              onClick={handleConfirm}
            >
              Xác nhận đặt {bookingType === "WEEKLY" ? "cả tuần" : "cả tháng"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
