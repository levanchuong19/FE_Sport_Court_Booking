import {
  Calendar,
  Car,
  Heart,
  MapPin,
  Share2,
  ShowerHead,
  Star,
  Wifi,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Court } from "../Model/court";
import formatVND from "../Utils/currency";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { customAlert } from "./customAlert";

function CourtCard({ court }: { court: Court }) {
  const navigate = useNavigate();

  const amenities = [
    { icon: <Wifi className="w-4 h-4" />, label: "Wifi" },
    { icon: <Car className="w-4 h-4" />, label: "Bãi đậu xe" },
    { icon: <ShowerHead className="w-4 h-4" />, label: "Phòng tắm" },
    { icon: <Star className="w-4 h-4" />, label: "Cho thuê vợt" },
  ];

  const rating = court.businessLocation?.rating || 4.8;
  const reviews = court.businessLocation?.reviews || 124;
  const price = court.prices?.find((p) => p.priceType === "HOURLY")?.price;

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      customAlert(
        "Lỗi",
        "Vui lòng đăng nhập trước khi thực hiện!",
        "destructive"
      );
      navigate("/login");
      return;
    }
    navigate(`/booking/${court.id}`);
  };

  const handleDetail = () => {
    navigate(`/detail-court/${court.id}`);
  };

  return (
    <div className="h-full flex flex-col justify-between rounded-2xl bg-emerald-50 border border-gray-200 shadow hover:shadow-lg transition p-4">
      {/* Image Slider */}
      <div className="relative h-40 rounded-xl overflow-hidden mb-3 bg-gray-100">
        <Swiper
          spaceBetween={30}
          centeredSlides
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
        >
          {court.images?.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={image.imageUrl}
                alt={court.courtName || "placeholder"}
                className="w-full h-40 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow">
            <Heart className="w-4 h-4 text-gray-500" />
          </button>
          <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow">
            <Share2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {!court.images?.[0]?.imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <MapPin className="w-12 h-12" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-900 leading-tight line-clamp-2">
          {court.courtName || "Tên sân"}
        </h3>
        <div className="flex items-center text-gray-500 text-sm truncate">
          <MapPin className="w-4 h-4 mr-1 shrink-0" />
          <span className="truncate">
            {court.businessLocation?.address || court.address}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
            <Star className="w-4 h-4 fill-yellow-400" />
            <span>{rating}</span>
            <span className="text-gray-400 text-xs">({reviews})</span>
          </div>
          <div className="text-emerald-600 font-bold text-lg">
            {formatVND(price || 0)}/giờ
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-2">
          {amenities.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1 bg-gray-100 text-gray-700 rounded-md px-2 py-1 text-xs font-medium"
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 pt-3 border-t border-gray-200 flex gap-2 justify-center">
        <button
          onClick={handleBooking}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg px-4 py-1.5 flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Đặt ngay
        </button>
        <button
          onClick={handleDetail}
          className="border border-gray-300 text-gray-700 font-medium rounded-lg px-4 py-1.5 flex items-center gap-2 bg-white hover:bg-gray-50"
        >
          <Calendar className="w-4 h-4" />
          Chi tiết
        </button>
      </div>
    </div>
  );
}

export default CourtCard;
