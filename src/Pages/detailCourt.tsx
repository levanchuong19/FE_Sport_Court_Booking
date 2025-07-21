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
  Phone,
  MessageCircle,
  Navigation,
} from "lucide-react";
import { motion } from "framer-motion";

const sportMap: Record<string, string> = {
  FOOTBALL: "Bóng đá",
  TENNIS: "Tennis",
  BADMINTON: "Cầu lông",
  BASKETBALL: "Bóng rổ",
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

  if (!court) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Đang tải...
      </div>
    );
  }

  return (
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

        {/* Giao diện 2 cột: ảnh & mô tả trái | thông tin + quick contact phải */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cột trái: ảnh và mô tả */}
          <div className="md:col-span-2 space-y-4">
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
                    className="h-24 sm:h-28 object-cover rounded-lg shadow-md hover:scale-105 transition-all"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Cột phải: thông tin sân + quick contact */}
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

            {/* Quick Contact */}
            <div className="bg-white border border-gray-100 rounded-xl shadow p-5 space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Liên hệ nhanh
              </h3>
              <button className="w-full bg-emerald-600 text-white py-2 rounded-lg font-medium hover:bg-emerald-700 flex items-center justify-center gap-2">
                Đặt ngay
              </button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2">
                <Navigation size={18} />
                Chỉ đường
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailCourt;
