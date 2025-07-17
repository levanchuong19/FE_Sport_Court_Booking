import { useEffect, useState } from "react";
import api from "../Config/api";
import { useNavigate } from "react-router-dom";
import type { JwtPayload, User } from "../Model/user";
import { jwtDecode } from "jwt-decode";
import type { BookingHistory } from "../Model/bookingHistory";
import formatVND from "../Utils/currency";
import formatDate from "../Utils/date";
import React from "react";
import { Calendar, Clock, MapPinned, RefreshCcw, Star } from "lucide-react";

const statusColor = {
  COMPLETED: "bg-green-100 text-green-700",
  UPCOMING: "bg-blue-100 text-blue-700",
  CANCELED: "bg-red-100 text-red-700",
  NO_SHOW: "bg-yellow-100 text-yellow-700",
};

export default function BookingHistory() {
  const [user, setUser] = useState<User>();
  const [bookings, setBookings] = useState<BookingHistory>();
  const navigate = useNavigate();
  // State cho modal đánh giá
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackBooking, setFeedbackBooking] = useState<any>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    overallRating: 5,
    courtQualityRating: 5,
    cleanlinessRating: 5,
    bookingExperienceRating: 5,
    comment: "",
    anonymous: false,
  });

  // Thống kê nhanh
  const quickStats = {
    COMPLETED:
      bookings?.bookings.filter((b) => b.status === "COMPLETED").length || 0,
    UPCOMING:
      bookings?.bookings.filter((b) => b.status === "BOOKED").length || 0,
    CANCELED:
      bookings?.bookings.filter((b) => b.status === "CANCELED").length || 0,
    TOTAL: bookings?.bookings.length || 0,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    let userId: string = "";
    if (token) {
      const decodedToken: JwtPayload = jwtDecode(token);
      userId = decodedToken.sub;
    }
    const handleGetProfile = async () => {
      const res = await api.get(`auth/account/${userId}`);
      console.log(res.data.data);
      setUser(res.data.data);
    };
    handleGetProfile();
    const handleGetBookingHistory = async () => {
      const res = await api.get(`slot/getBookingByAccount/${userId}`);
      console.log(res.data.data);
      setBookings(res.data.data);
    };
    handleGetBookingHistory();
  }, [navigate]);

  // Hàm submit feedback
  const handleSubmitFeedback = async () => {
    if (!feedbackBooking) return;
    const payload = {
      overallRating: feedbackForm.overallRating,
      comment: feedbackForm.comment,
      courtQualityRating: feedbackForm.courtQualityRating,
      cleanlinessRating: feedbackForm.cleanlinessRating,
      bookingExperienceRating: feedbackForm.bookingExperienceRating,
      playedDate: feedbackBooking.startDate,
      anonymous: feedbackForm.anonymous,
      courtId: feedbackBooking.court?.id,
    };
    try {
      await api.post("/feedback", payload);
      alert("Gửi đánh giá thành công!");
      setShowFeedback(false);
      setFeedbackBooking(null);
      setFeedbackForm({
        overallRating: 5,
        courtQualityRating: 5,
        cleanlinessRating: 5,
        bookingExperienceRating: 5,
        comment: "",
        anonymous: false,
      });
    } catch (e) {
      alert("Gửi đánh giá thất bại!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Lịch sử đặt sân</h1>
      <div className="text-gray-500 mb-6">
        Quản lý và theo dõi tất cả các lần đặt sân của bạn
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Thông tin user */}

        {/* Thống kê nhanh & Thao tác nhanh */}
        <div className="col-span-1 flex flex-col gap-6">
          <div className="col-span-1 bg-white rounded-xl shadow p-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 mb-2">
                {user?.image ? (
                  <img
                    src={user?.image}
                    alt="avatar"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <img
                    src="https://thanhtra.com.vn/images/avatar-default.png?id=420048c5169f5847774bafb5e8b641b4"
                    alt="avatar"
                    className="w-full h-full rounded-full"
                  />
                )}
              </div>
              <div className="font-bold text-lg">{user?.fullName}</div>
              <div className="text-gray-500 mb-2">
                Thành viên từ{" "}
                {user?.createAt ? formatDate(new Date(user.createAt)) : ""}
              </div>
              <div className="flex flex-col gap-1 text-sm w-full">
                <div>
                  <b>Email:</b> {user?.email}
                </div>
                <div>
                  <b>Điện thoại:</b> {user?.phone}
                </div>
                <div>
                  <b>Tổng đặt sân:</b> {bookings?.totalBookings}
                </div>
                <div>
                  <b>Tổng chi tiêu:</b>{" "}
                  {formatVND(bookings?.totalSpending || 0)}
                </div>
                <div>
                  <b>Loại sân yêu thích:</b> {bookings?.favoriteCourtType}
                </div>
              </div>
            </div>
          </div>
          {/* Thống kê nhanh */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold mb-4">Thống kê nhanh</div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-green-50 rounded-lg py-3">
                <div className="text-green-600 font-bold text-xl">
                  {quickStats.COMPLETED}
                </div>
                <div className="text-xs text-green-700">Hoàn thành</div>
              </div>
              <div className="bg-blue-50 rounded-lg py-3">
                <div className="text-blue-600 font-bold text-xl">
                  {quickStats.UPCOMING}
                </div>
                <div className="text-xs text-blue-700">Sắp tới</div>
              </div>
              <div className="bg-red-50 rounded-lg py-3">
                <div className="text-red-600 font-bold text-xl">
                  {quickStats.CANCELED}
                </div>
                <div className="text-xs text-red-700">Đã hủy</div>
              </div>
              <div className="bg-gray-50 rounded-lg py-3">
                <div className="text-gray-700 font-bold text-xl">
                  {quickStats.TOTAL}
                </div>
                <div className="text-xs text-gray-700">Tổng cộng</div>
              </div>
            </div>
          </div>
          {/* Thao tác nhanh */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold mb-4">Thao tác nhanh</div>
            <div className="flex flex-col gap-2">
              <button className="border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50">
                <span>📅</span> Đặt sân thường xuyên
              </button>
              <button className="border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50">
                <span>⭐</span> Sân yêu thích
              </button>
              <button className="border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50">
                <span>🧾</span> Hóa đơn & Thanh toán
              </button>
            </div>
          </div>
        </div>
        {/* Danh sách booking */}
        <div className="col-span-3 flex flex-col gap-4">
          {/* Thanh tìm kiếm và filter */}
          <div className="flex flex-col md:flex-row gap-2 mb-4">
            <input
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Tìm kiếm theo tên sân, địa điểm, mã đặt sân..."
            />
            <select className="border border-gray-200 rounded-lg px-3 py-2">
              <option>Tất cả trạng thái</option>
              <option>Hoàn thành</option>
              <option>Sắp tới</option>
              <option>Đã hủy</option>
              <option>Không đến</option>
            </select>
            <button className="border border-gray-200 rounded-lg px-4 py-2">
              Tất cả
            </button>
            <button
              onClick={() => navigate("/court")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Đặt sân mới
            </button>
            <button className="border border-gray-200 px-4 py-2 rounded-lg">
              Xuất báo cáo
            </button>
          </div>
          {/* Danh sách booking */}
          {bookings?.bookings.map((b, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-center"
            >
              <div className="flex flex-col md:flex-row gap-10 w-full">
                {/* Ảnh sân */}
                <div className="w-50 h-40 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                  {b.court?.images?.[0] ? (
                    <img
                      src={b.court.images[0].imageUrl}
                      alt="court"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                {/* Thông tin booking */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        statusColor[b.status as keyof typeof statusColor] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {b.status === "BOOKED" && "Đã đặt"}
                      {b.status === "CHECKED_IN" && "Đã check in"}
                      {b.status === "CANCELED" && "Đã hủy"}
                      {b.status === "COMPLETED" && "Hoàn thành"}
                      {b.status === "IN_USE" && "Đang sử dụng"}
                    </span>
                    {/* <span className="text-gray-400 text-xs">
                      Mã: {b.bookingCode || "BKxxx"}
                    </span> */}
                  </div>
                  <div className="font-bold text-lg">{b.court?.courtName}</div>
                  <div className="text-green-700">
                    {b.court?.businessLocation?.name}
                  </div>
                  <div className="text-gray-500">
                    {b.court?.businessLocation?.address || "Không có địa chỉ"}
                  </div>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-500" />{" "}
                      {b?.startDate ? formatDate(new Date(b.startDate)) : ""}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />{" "}
                      {b?.startTime?.slice(0, 5)} - {b?.endTime?.slice(0, 5)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs mt-1">
                    {
                      ("paymentMethod" in b ? (
                        <span>{(b as any).paymentMethod}</span>
                      ) : null) as React.ReactNode
                    }
                    {b.status === "PAID" && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                        Đã thanh toán
                      </span>
                    )}
                    {b.status === "CANCELED" &&
                      "cancelReason" in b &&
                      (b as any).cancelReason && (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                          Lý do: {(b as any).cancelReason}
                        </span>
                      )}
                  </div>
                  {/* Đánh giá */}
                  {
                    ("rating" in b && (b as any).rating ? (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="text-xs">Đánh giá của bạn</span>
                        {"comment" in b ? (
                          <span className="text-xs italic">
                            "{(b as any).comment}"
                          </span>
                        ) : null}
                      </div>
                    ) : null) as React.ReactNode
                  }
                  {/* Nút liên hệ, chỉ đường, chia sẻ */}
                  <div className="flex gap-3 mt-2 text-sm">
                    <button className="flex items-center gap-1 hover:underline">
                      <MapPinned className="w-4 h-4 text-gray-500" /> Chỉ đường
                    </button>
                  </div>
                </div>
                {/* Giá và thao tác */}
                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                  <div className="text-green-600 font-bold text-xl">
                    {formatVND(b?.price || 0)}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button className="px-4 py-2 border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1">
                        Chi tiết
                      </button>
                      <button
                        className="px-4 w-[100px] py-2 flex items-center justify-center border border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1"
                        onClick={() => navigate(`/booking/${b.court?.id}`)}
                      >
                        Đặt lại
                      </button>
                    </div>
                    {b.status === "COMPLETED" && "Hoàn thành" && (
                      <button
                        className="px-4 py-2 gap-3 border justify-center border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1"
                        onClick={() => {
                          setFeedbackBooking(b);
                          setShowFeedback(true);
                        }}
                      >
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span>Thêm đánh giá</span>
                      </button>
                    )}
                    {b.status === "BOOKED" && (
                      <>
                        <button className="px-4 py-2 gap-3 border justify-center border-gray-200 rounded hover:bg-gray-50 flex items-center gap-1">
                          <RefreshCcw className="w-4 h-4 text-gray-500" />
                          Đổi lịch
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal nhập đánh giá */}
      {showFeedback && feedbackBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-black"
              onClick={() => setShowFeedback(false)}
            >
              ✖
            </button>
            <h2 className="text-xl font-bold mb-4">Đánh giá sân</h2>
            <div className="mb-3">
              <label className="block mb-1 font-medium">
                Đánh giá tổng thể
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={feedbackForm.overallRating}
                onChange={(e) =>
                  setFeedbackForm((f) => ({
                    ...f,
                    overallRating: Number(e.target.value),
                  }))
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Chất lượng sân</label>
              <input
                type="number"
                min={1}
                max={5}
                value={feedbackForm.courtQualityRating}
                onChange={(e) =>
                  setFeedbackForm((f) => ({
                    ...f,
                    courtQualityRating: Number(e.target.value),
                  }))
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Độ sạch sẽ</label>
              <input
                type="number"
                min={1}
                max={5}
                value={feedbackForm.cleanlinessRating}
                onChange={(e) =>
                  setFeedbackForm((f) => ({
                    ...f,
                    cleanlinessRating: Number(e.target.value),
                  }))
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">
                Trải nghiệm đặt sân
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={feedbackForm.bookingExperienceRating}
                onChange={(e) =>
                  setFeedbackForm((f) => ({
                    ...f,
                    bookingExperienceRating: Number(e.target.value),
                  }))
                }
                className="w-full border rounded px-2 py-1"
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Bình luận</label>
              <textarea
                value={feedbackForm.comment}
                onChange={(e) =>
                  setFeedbackForm((f) => ({ ...f, comment: e.target.value }))
                }
                className="w-full border rounded px-2 py-1"
                rows={3}
              />
            </div>
            <div className="mb-3 flex items-center gap-2">
              <input
                type="checkbox"
                checked={feedbackForm.anonymous}
                onChange={(e) =>
                  setFeedbackForm((f) => ({
                    ...f,
                    anonymous: e.target.checked,
                  }))
                }
                id="anonymous"
              />
              <label htmlFor="anonymous">Ẩn danh</label>
            </div>
            <button
              className="w-full bg-green-600 text-white py-2 rounded font-semibold mt-2"
              onClick={handleSubmitFeedback}
            >
              Gửi đánh giá
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
