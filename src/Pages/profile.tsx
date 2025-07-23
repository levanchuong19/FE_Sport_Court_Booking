import { useEffect, useState } from "react";
import api from "../Config/api";
import { useNavigate } from "react-router-dom";
import type { JwtPayload, User } from "../Model/user";
import { jwtDecode } from "jwt-decode";
import type { BookingHistory } from "../Model/bookingHistory";
import formatVND from "../Utils/currency";
import formatDate from "../Utils/date";
import React from "react";
import {
  Calendar,
  Clock,
  MapPinned,
  RefreshCcw,
  Star,
  LogOut,
  KeyRound,
  Pencil,
  Settings,
} from "lucide-react";

const statusColor = {
  COMPLETED: "bg-green-100 text-green-700",
  UPCOMING: "bg-blue-100 text-blue-700",
  CANCELED: "bg-red-100 text-red-700",
  NO_SHOW: "bg-yellow-100 text-yellow-700",
};

export default function Profile() {
  const [user, setUser] = useState<User>();
  const [bookings, setBookings] = useState<BookingHistory>();
  const navigate = useNavigate();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackBooking, setFeedbackBooking] = useState<any>(null);
  const [feedbackForm, setFeedbackForm] = useState({
    overallRating: 5,
    courtQualityRating: 5,
    cleanlinessRating: 5,
    bookingExperienceRating: 5,
    comment: "",
  });
  const [tab, setTab] = useState<
    "overview" | "history" | "favorite" | "settings"
  >("overview");
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  // Filtered bookings for history tab
  const filteredBookings = bookings?.bookings.filter((b) => {
    // Filter by status
    if (statusFilter !== "all") {
      if (statusFilter === "completed" && b.status !== "COMPLETED")
        return false;
      if (statusFilter === "upcoming" && b.status !== "BOOKED") return false;
      if (statusFilter === "canceled" && b.status !== "CANCELED") return false;
      if (statusFilter === "no_show" && b.status !== "NO_SHOW") return false;
    }
    // Search by text
    if (searchText.trim()) {
      const text = searchText.toLowerCase();
      const courtName = b.court?.courtName?.toLowerCase() || "";
      const location = b.court?.businessLocation?.name?.toLowerCase() || "";
      const bookingCode =
        typeof b === "object" &&
        "bookingCode" in b &&
        typeof (b as any).bookingCode === "string"
          ? (b as any).bookingCode.toLowerCase()
          : "";
      return (
        courtName.includes(text) ||
        location.includes(text) ||
        bookingCode.includes(text)
      );
    }
    return true;
  });

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

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackBooking) return;

    // Lấy token và decode để lấy accountId
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn chưa đăng nhập!");
      return;
    }

    let accountId = "";
    try {
      const decodedToken: JwtPayload = jwtDecode(token);
      accountId = decodedToken.sub;
    } catch (err) {
      console.error("Lỗi giải mã token", err);
      alert("Token không hợp lệ!");
      return;
    }

    const payload = {
      overallRating: feedbackForm.overallRating,
      comment: feedbackForm.comment,
      courtQualityRating: feedbackForm.courtQualityRating,
      cleanlinessRating: feedbackForm.cleanlinessRating,
      bookingExperienceRating: feedbackForm.bookingExperienceRating,
      playedDate: feedbackBooking.startDate,
      courtId: feedbackBooking.court?.id,
      accountId: accountId, // ✅ dùng trực tiếp từ token
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
      });
    } catch (e) {
      alert("Gửi đánh giá thất bại!");
      console.error(e);
    }
  };
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header profile card */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-6 flex-1">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden relative">
            {user?.image ? (
              <img
                src={user.image}
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
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-2xl font-bold truncate">
                {user?.fullName}
              </span>
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">
                Đã xác thực
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-semibold">
                Premium
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm mb-2">
              <span>{user?.email}</span>
              <span>•</span>
              <span>{user?.phone}</span>
              <span>•</span>
              <span>
                Tham gia từ{" "}
                {user?.createAt ? formatDate(new Date(user.createAt)) : ""}
              </span>
            </div>
            <div className="text-gray-700 mb-2 text-base truncate">
              Yêu thích thể thao, đặc biệt là bóng đá và tennis. Thường xuyên
              tham gia các hoạt động thể thao cuối tuần.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50">
            <Pencil className="w-4 h-4" />
            Chỉnh sửa
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg font-semibold hover:bg-gray-50"
            onClick={() => setTab("settings")}
          >
            <Settings className="w-4 h-4" />
            Cài đặt
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex mb-6 bg-gray-100 rounded-xl overflow-hidden">
        <button
          onClick={() => setTab("overview")}
          className={`flex-1 px-6 py-3 font-semibold text-base ${
            tab === "overview"
              ? " border-b-2 border-emerald-600 text-emerald-600"
              : "text-gray-600"
          }`}
        >
          Tổng quan
        </button>
        <button
          onClick={() => setTab("history")}
          className={`flex-1 px-6 py-3 font-semibold text-base ${
            tab === "history"
              ? " border-b-2 border-emerald-600 text-emerald-600"
              : "text-gray-600"
          }`}
        >
          Lịch sử đặt sân
        </button>
        <button
          onClick={() => setTab("settings")}
          className={`flex-1 px-6 py-3 font-semibold text-base ${
            tab === "settings"
              ? "border-b-2 border-emerald-600 text-emerald-600"
              : "text-gray-600"
          }`}
        >
          Cài đặt
        </button>
      </div>
      {/* Tab content */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Thông tin cá nhân + thống kê */}
          <div className="col-span-1 bg-white rounded-xl shadow p-6 flex flex-col items-center">
            {/* Thông tin cá nhân */}
            <div className="w-full bg-gray-50 rounded-xl p-4">
              <div className="font-bold mb-2">Thông tin cá nhân</div>
              <div className="text-sm text-gray-700 flex flex-col gap-4">
                <div>
                  <b>Email:</b> {user?.email}
                </div>
                <div>
                  <b>Điện thoại:</b> {user?.phone}
                </div>
                <div>
                  <b>Địa chỉ:</b> 123 Đường Nguyễn Huệ, Quận 1, TP.HCM
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
          {/* Hoạt động gần đây */}
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <div className="font-bold text-lg mb-4">Hoạt động gần đây</div>
            <div className="flex flex-col gap-4">
              {bookings?.bookings.slice(0, 3).map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between border-b pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <div className="font-semibold">{b.court?.courtName}</div>
                    <div className="text-gray-500 text-sm">
                      {b.court?.businessLocation?.name} |{" "}
                      {b.court?.businessLocation?.address}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {b?.startDate ? formatDate(new Date(b.startDate)) : ""} |{" "}
                      {b?.startTime?.slice(0, 5)} - {b?.endTime?.slice(0, 5)}
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs mb-1">
                      Hoàn thành
                    </span>
                    <span className="text-green-600 font-bold">
                      {formatVND(b?.price || 0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === "history" && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Thông tin user */}
          {/* Thống kê nhanh & Thao tác nhanh */}
          <div className="col-span-1 flex flex-col gap-6">
            <div className="col-span-1 bg-white rounded-xl shadow p-6">
              <div className="font-bold mb-2">Thông tin cá nhân</div>
              <div className="text-sm text-gray-700 flex flex-col gap-4">
                <div>
                  <b>Email:</b> {user?.email}
                </div>
                <div>
                  <b>Điện thoại:</b> {user?.phone}
                </div>
                <div>
                  <b>Địa chỉ:</b> 123 Đường Nguyễn Huệ, Quận 1, TP.HCM
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
          </div>
          {/* Danh sách booking */}
          <div className="col-span-3 flex flex-col gap-4">
            {/* Thanh tìm kiếm và filter */}
            <div className="flex flex-col md:flex-row gap-2 mb-4">
              <input
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Tìm kiếm theo tên sân..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select
                className="border border-gray-200 rounded-lg px-3 py-2"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="completed">Hoàn thành</option>
                <option value="upcoming">Sắp tới</option>
                <option value="canceled">Đã hủy</option>
                <option value="no_show">Không đến</option>
              </select>
              <button
                onClick={() => navigate("/court")}
                className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Đặt sân mới
              </button>
            </div>
            {/* Danh sách booking */}
            {filteredBookings?.map((b, idx) => (
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
                    <div className="font-bold text-lg">
                      {b.court?.courtName}
                    </div>
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
                    <button
                      className="flex items-center gap-1 hover:underline"
                      onClick={() => {
                        const address =
                          b.court?.businessLocation?.address || "";
                        if (address) {
                          window.open(
                            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                              address
                            )}`,
                            "_blank"
                          );
                        }
                      }}
                    >
                      <MapPinned className="w-4 h-4 text-gray-500" /> Chỉ đường
                    </button>
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
      )}
      {tab === "settings" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 bg-white rounded-xl shadow p-6">
            <div className="font-bold mb-2">Thông tin cá nhân</div>
            <div className="text-sm text-gray-700 flex flex-col gap-4">
              <div>
                <b>Email:</b> {user?.email}
              </div>
              <div>
                <b>Điện thoại:</b> {user?.phone}
              </div>
              <div>
                <b>Địa chỉ:</b> 123 Đường Nguyễn Huệ, Quận 1, TP.HCM
              </div>
              <div>
                <b>Tổng đặt sân:</b> {bookings?.totalBookings}
              </div>
              <div>
                <b>Tổng chi tiêu:</b> {formatVND(bookings?.totalSpending || 0)}
              </div>
              <div>
                <b>Loại sân yêu thích:</b> {bookings?.favoriteCourtType}
              </div>
            </div>
          </div>
          {/* Tài khoản */}
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <div className="font-bold text-xl mb-4 flex items-center gap-2 text-red-600">
              <LogOut className="w-6 h-6" /> Tài khoản
            </div>
            <div className="flex flex-col gap-3">
              <button
                className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-base"
                onClick={handleChangePassword}
              >
                <KeyRound className="w-5 h-5" /> Đổi mật khẩu
              </button>
              <button
                className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-base"
                onClick={handleEditProfile}
              >
                <Pencil className="w-5 h-5" /> Chỉnh sửa trang cá nhân
              </button>
              <button
                className="flex items-center gap-3 px-4 py-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 text-base"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" /> Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}
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
