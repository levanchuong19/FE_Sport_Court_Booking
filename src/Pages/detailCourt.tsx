import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Config/api";
import type { Court } from "../Model/court";
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Users2,
  Calendar,
  MapPinned,
  Quote,
} from "lucide-react";
import { motion } from "framer-motion";

const sportMap: Record<string, string> = {
  FOOTBALL: "Bóng đá",
  TENNIS: "Tennis",
  BADMINTON: "Cầu lông",
  BASKETBALL: "Bóng rổ",
  VOLLEYBALL: "Bóng chuyền",
};

const fallbackImage =
  "https://www.hoanghagroup.vn/uploads/news/776207402_dsc05406.jpg";

const DetailRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number | undefined;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 text-sm text-gray-700">
    <span className="text-emerald-600">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span className="ml-auto">{value || "—"}</span>
  </div>
);

const DetailCourt = () => {
  const { id } = useParams();
  const [court, setCourt] = useState<Court | null>(null);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    const fetchCourt = async () => {
      try {
        const res = await api.get(`court/get/{courtId}?courtId=${id}`);
        setCourt(res.data?.data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết sân:", err);
      }
    };
    fetchCourt();
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get(`/feedback/court/${id}`);
        setFeedbacks(res.data?.data || []);
      } catch (err) {
        console.error("Lỗi khi lấy feedback:", err);
      }
    };
    fetchFeedbacks();
  }, [id]);

  const totalRating = feedbacks.reduce((sum, fb) => sum + fb.overallRating, 0);
  const averageRating =
    feedbacks.length > 0 ? (totalRating / feedbacks.length).toFixed(1) : null;

  if (!court) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Đang tải...
      </div>
    );
  }

  return (
    <>
      {/* Modal ảnh lớn */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Ảnh phóng to"
            className="max-w-full max-h-[90vh] rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Nội dung chính */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-white py-10 px-4"
      >
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Quay lại */}
          <button
            onClick={() => navigate("/court")}
            className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>

          {/* Giao diện 2 cột */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cột trái */}
            <div className="md:col-span-2 space-y-6">
              {/* Ảnh lớn */}
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img
                  src={court.images?.[0]?.imageUrl || fallbackImage}
                  alt="Ảnh sân"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h1 className="text-2xl font-bold text-white">
                    {court.courtName}
                  </h1>
                  <p className="text-sm text-white/80 italic">
                    {sportMap[court.courtType]}
                  </p>
                </div>
              </div>

              {/* Mô tả */}
              {court.description && (
                <p className="text-gray-700 text-base">{court.description}</p>
              )}

              {/* Ảnh phụ */}
              {court.images && court.images.length > 1 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {court.images.slice(1).map((img, idx) => (
                    <motion.img
                      key={idx}
                      src={img.imageUrl}
                      alt={`Ảnh phụ ${idx + 1}`}
                      className="h-24 sm:h-28 object-cover rounded-lg shadow-md hover:scale-105 transition-all cursor-pointer"
                      onClick={() => setSelectedImage(img.imageUrl)}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                    />
                  ))}
                </div>
              )}

              {/* Feedback */}
              {feedbacks.length > 0 && (
                <div className="space-y-4 pt-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold text-emerald-700">
                      Đánh giá của khách hàng
                    </h2>
                    {averageRating && (
                      <p className="text-sm text-gray-700 flex items-center gap-1">
                        <span className="text-yellow-500">
                          ⭐ {averageRating}
                        </span>
                        <span className="text-gray-500">
                          ({feedbacks.length} đánh giá)
                        </span>
                      </p>
                    )}
                  </div>

                  {feedbacks.map((fb, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start gap-3 p-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {fb.account?.image ? (
                        <img
                          src={fb.account.image}
                          alt={fb.account.fullName || "Avatar"}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold">
                          {fb.account?.fullName
                            ? fb.account.fullName.charAt(0).toUpperCase()
                            : "Ẩn"}
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-800">
                            {fb.account?.fullName || "Người dùng ẩn danh"}
                          </p>
                          <p className="text-yellow-500 text-sm">
                            {Array.from(
                              { length: Math.round(fb.overallRating) },
                              (_, i) => (
                                <span key={i}>⭐</span>
                              )
                            )}
                          </p>
                        </div>
                        <div className="flex items-start gap-2 mt-1 text-sm text-gray-600">
                          <Quote className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="italic">"{fb.comment}"</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Cột phải */}
            <div className="space-y-6">
              {/* Thông tin sân */}
              <div className="bg-white border border-gray-100 rounded-xl shadow p-5 space-y-3">
                <h2 className="text-lg font-semibold text-emerald-700">
                  Thông tin sân
                </h2>
                <DetailRow
                  label="Địa chỉ"
                  value={court.businessLocation?.address}
                  icon={<MapPin size={16} />}
                />
                <DetailRow
                  label="Sức chứa"
                  value={`${court.maxPlayers} người`}
                  icon={<Users2 size={16} />}
                />
                <DetailRow
                  label="Kích thước"
                  value={`${court.length}m x ${court.width}m`}
                  icon={<Ruler size={16} />}
                />
                <DetailRow
                  label="Năm xây dựng"
                  value={court.yearBuild}
                  icon={<Calendar size={16} />}
                />
                <div className="pt-3 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Giá thuê</p>
                  <p className="text-xl font-bold text-red-500">
                    {court.prices?.[0]?.price?.toLocaleString("vi-VN")}đ / giờ
                  </p>
                </div>
              </div>

              {/* Liên hệ nhanh */}
              <div className="bg-white border border-gray-100 rounded-xl shadow p-5 space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  Liên hệ nhanh
                </h3>
                <button
                  className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 flex items-center justify-center gap-2"
                  onClick={() => {
                    navigate(`/booking/${id}`);
                  }}
                >
                  Đặt ngay
                </button>
                <button
                  className="w-full mt-4 border border-gray-300 text-gray-700 py-2 rounded font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  onClick={() => {
                    const address = court.businessLocation?.address || "";
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
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default DetailCourt;
