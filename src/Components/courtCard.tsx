import { Button } from "antd";
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

  // Mock amenities for demo (replace with real data if available)
  const amenities = [
    { icon: <Wifi className="w-4 h-4" />, label: "Wifi" },
    { icon: <Car className="w-4 h-4" />, label: "Bãi đậu xe" },
    { icon: <ShowerHead className="w-4 h-4" />, label: "Phòng tắm" },
    { icon: <Star className="w-4 h-4" />, label: "Cho thuê vợt" },
  ];

  // Mock distance (replace with real data if available)
  const distance = "1.5 km";

  // Rating & reviews
  const rating = court.businessLocation?.rating || 4.8;
  const reviews = court.businessLocation?.reviews || 124;

  // Price (lấy giá đầu tiên nếu có)
  const price = court.prices?.find((p) => p.priceType === "HOURLY")?.price;

  const handleBooking = () => {
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
    navigate(`/booking/${court.id}`);
  };

  return (
    <div className="rounded-2xl bg-green-50 border border-green-100 shadow-sm p-4 max-w-xs w-full mx-auto flex flex-col justify-between min-h-[420px]">
      {/* Image + icons */}
      <div className="relative rounded-xl overflow-hidden h-40 bg-gray-100 flex items-center justify-center mb-3">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          className="swiper"
        >
          {court.images?.map((image, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={image.imageUrl}
                alt={court.courtName || "placeholder"}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <img
          src={court.images?.[0]?.imageUrl || "/placeholder.svg"}
          alt={court.courtName || "placeholder"}
          className="w-full h-full object-cover"
        /> */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow">
            <Heart className="w-4 h-4 text-gray-500" />
          </button>
          <button className="bg-white/80 hover:bg-white rounded-full p-2 shadow">
            <Share2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        {/* Placeholder icon if no image */}
        {!court.images?.[0]?.imageUrl && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
            <MapPin className="w-12 h-12" />
          </div>
        )}
      </div>
      {/* Info */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="font-semibold text-lg text-gray-900 leading-tight truncate">
          {court.courtName || "Tên sân"}
        </div>
        <div className="flex items-center text-gray-500 text-sm gap-1 truncate">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="truncate">
            {court.businessLocation?.address || court.address}
          </span>
        </div>
        <div className="flex items-center justify-between mt-1 mb-1">
          <div className="flex items-center gap-1 text-yellow-500 text-base font-medium">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
            <span className="text-gray-400 text-xs font-normal">
              ({reviews})
            </span>
          </div>
          <span className="text-gray-400 text-xs">{distance}</span>
        </div>
        {/* Amenities */}
        <div className="flex flex-wrap gap-2 my-2">
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
      {/* Price & button */}
      <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100">
        <div className="text-green-600 font-bold text-lg">
          {formatVND(price || 0)}/giờ
        </div>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg px-4 py-2 flex items-center gap-2 border-none shadow-none"
          onClick={handleBooking}
        >
          <span className="text-lg">
            <Calendar className="w-4 h-4" />
          </span>{" "}
          Đặt ngay
        </Button>
      </div>
    </div>
  );
}

export default CourtCard;
