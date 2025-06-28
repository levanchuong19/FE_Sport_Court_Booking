import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Config/api";
import type { Court } from "../Model/court";
import { ArrowLeft } from "lucide-react";

const sportMap: Record<string, string> = {
  FOOTBALL: "Bóng đá",
  TENNIS: "Tennis",
  BADMINTON: "Cầu lông",
  BASKETBALL: "Bóng rổ",
};

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | undefined;
}) => (
  <div className="flex justify-between text-sm text-gray-600">
    <span className="font-medium">{label}:</span>
    <span>{value || "—"}</span>
  </div>
);

const DetailCourt = () => {
  const { courtId } = useParams();
  const [court, setCourt] = useState<Court | null>(null);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/show-court");
  };

  useEffect(() => {
    if (!courtId) return;
    const fetchCourt = async () => {
      try {
        const res = await api.get(`api/court/get/{courtId}?courtId=${courtId}`);
        setCourt(res.data?.data);
      } catch (err) {
        console.error("Lỗi khi lấy chi tiết sân:", err);
      }
    };
    fetchCourt();
  }, [courtId]);

  if (!court) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Đang tải...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-10">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Quay lại</span>
        </button>

        {/* Ảnh chính */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-gray-200">
          <img
            src={
              court.images?.[0]?.imageUrl ||
              "https://www.hoanghagroup.vn/uploads/news/776207402_dsc05406.jpg"
            }
            alt="Main Court"
            className="w-full h-80 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">{court.courtName}</h1>
            <p className="text-sm text-white/80 mt-1">
              {sportMap[court.courtType]}
            </p>
          </div>
        </div>

        {/* Nội dung chính */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Chi tiết */}
          <div className="md:col-span-2 space-y-6">
            {/* Mô tả */}
            {court.description && (
              <p className="text-gray-700 text-lg">{court.description}</p>
            )}

            {/* Ảnh phụ */}
            {court.images && court.images.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {court.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img.imageUrl}
                    alt={`Court sub ${idx + 2}`}
                    className="h-28 sm:h-32 object-cover rounded-xl shadow hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thông tin & giá */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 space-y-4">
            <h2 className="text-xl font-semibold text-emerald-700">
              Thông tin sân
            </h2>
            <div className="space-y-3">
              <DetailRow
                label="Địa chỉ"
                value={court.businessLocation?.address}
              />
              <DetailRow label="Sức chứa" value={`${court.maxPlayers} người`} />
              <DetailRow
                label="Kích thước"
                value={`${court.length}m x ${court.width}m`}
              />
              <DetailRow label="Năm xây dựng" value={court.yearBuild} />
            </div>

            <div className="border-t pt-4">
              <div className="text-sm text-gray-500">Giá thuê</div>
              <div className="text-2xl font-bold text-red-600">
                {court.prices?.[0]?.price?.toLocaleString("vi-VN")}đ / giờ
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCourt;
