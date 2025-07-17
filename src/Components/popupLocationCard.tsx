import { MapPin, Star } from "lucide-react";
import type { BusinessLocation } from "../Model/businessLocation";
import { useNavigate } from "react-router-dom";

export default function PopupLocationCard({
  location,
}: {
  location: BusinessLocation;
}) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow flex flex-col gap-1  items-center hover:shadow-lg transition w-full max-w-[340px]">
      <div className="w-40 h-30 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
        {location.images ? (
          <img
            src={location.images}
            alt={location.name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-400 text-xs">No Img</span>
        )}
      </div>
      <div className="flex-1  min-w-0">
        <div className="font-semibold text-base break-words whitespace-pre-wrap">{location.name}</div>
        <div className="text-xs text-gray-500 flex items-center gap-1 break-words whitespace-pre-wrap mb-1">
          <MapPin className="w-3 h-3" /> {location.address}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="flex items-center text-yellow-500 text-xs font-bold">
            <Star className="w-3 h-3 mr-1" />
            {location.rating || 4.8}
          </span>
          <span className="text-gray-400 text-xs">
            ({location.reviews || 0})
          </span>
          {location.distance ? <span className="text-gray-400 text-xs">Cách bạn: {location.distance.toFixed(1)} km</span> :""}
        </div>
        <div className="text-emerald-600 text-xs font-bold mb-1">
          Mở cửa từ : {location.openTime || "pp"} - {location.closeTime}
        </div>
        <div className="flex gap-2">
          <button
            className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-semibold hover:bg-emerald-700 transition"
            onClick={() => navigate(`/businessLocation/${location.id}`)}
          >
            Xem chi tiết
          </button>
          <button
            className="border border-emerald-600 text-emerald-600 px-2 py-1 rounded text-xs font-semibold hover:bg-emerald-50 transition"
            onClick={() => navigate(`/booking/${location.id}`)}
          >
            Đặt sân
          </button>
        </div>
      </div>
    </div>
  );
}
