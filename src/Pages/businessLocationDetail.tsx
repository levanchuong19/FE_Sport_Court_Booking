import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../Config/api";
import { MapPin, Phone, MessageCircle, Info } from "lucide-react";
import type { BusinessLocation } from "../Model/businessLocation";
import type { Court } from "../Model/court";


// Helper function để xác định trạng thái hoạt động
function isOpenNow(openTime: string, closeTime: string): boolean {
  if (!openTime || !closeTime) return false;
  if (openTime.slice(0,5) === closeTime.slice(0,5)) return true; // 24/24

  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const [openH, openM] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);

  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  console.log(nowMinutes, openMinutes, closeMinutes);

  return nowMinutes >= openMinutes && nowMinutes < closeMinutes;
}

export default function BusinessLocationDetail() {
  const { id } = useParams();
  const [businessLocation, setBusinessLocation] = useState<BusinessLocation | null>(null);
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("courts");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Lấy thông tin địa điểm
        const resLocation = await api.get(`location/getById/${id}`);
        setBusinessLocation(resLocation.data.data);
        // Lấy danh sách sân
        const resCourts = await api.get(`court/getByBusinessLocation/${id}`);
        console.log(resCourts.data.data.content);
        setCourts(Array.isArray(resCourts.data.data.content) ? resCourts.data.data.content : []);
      } catch (err) {
        setBusinessLocation(null);
        setCourts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!businessLocation) {
    return (
      <div className="text-center py-12 text-gray-500">Không tìm thấy địa điểm này.</div>
    );
  }

  const open = isOpenNow(businessLocation.openTime, businessLocation.closeTime);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Ảnh + Info + Tab */}
        <div className="lg:col-span-2 space-y-6">
          {/* Box Ảnh */}
          <div className="bg-white rounded-xl shadow p-4 min-h-[320px] mb-2 flex items-center justify-center">
            {/* Hiển thị slider ảnh nếu có */}
            {businessLocation.images ? (
              <img src={businessLocation.images} alt={businessLocation.name} className="object-cover w-full h-72 rounded-lg" />
            ) : (
              <span className="text-gray-400">Chưa có ảnh</span>
            )}
          </div>
          {/* Box Info */}
          <div className="bg-white rounded-xl shadow p-6 mb-2">
            <div className="flex items-center mb-2">
              <h1 className="text-2xl font-bold mr-2">{businessLocation.name}</h1>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">Đã xác minh</span>
            </div>
            <div className="flex items-center text-yellow-500 mb-1">
              <span className="font-bold mr-1">★ {businessLocation.rating || 4.8}</span>
              <span className="text-gray-600">({businessLocation.reviews || 1247} đánh giá)</span>
            </div>
            <div className="flex items-center text-gray-600 mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{businessLocation.address}</span>
            </div>
            <div className="text-gray-700 mb-2">{businessLocation.description || "Trung tâm thể thao hiện đại với đầy đủ các loại sân và dịch vụ chất lượng cao"}</div>
          </div>
          {/* Tabs */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex space-x-6 border-b mb-4">
              <button className={`pb-2 font-semibold ${tab === "courts" ? "border-b-2 border-emerald-600 text-emerald-700" : "text-gray-500"}`} onClick={() => setTab("courts")}>Danh sách sân</button>
              <button className={`pb-2 font-semibold ${tab === "utilities" ? "border-b-2 border-emerald-600 text-emerald-700" : "text-gray-500"}`} onClick={() => setTab("utilities")}>Tiện ích</button>
              <button className={`pb-2 font-semibold ${tab === "reviews" ? "border-b-2 border-emerald-600 text-emerald-700" : "text-gray-500"}`} onClick={() => setTab("reviews")}>Đánh giá</button>
              <button className={`pb-2 font-semibold ${tab === "info" ? "border-b-2 border-emerald-600 text-emerald-700" : "text-gray-500"}`} onClick={() => setTab("info")}>Thông tin</button>
            </div>
            <div>
              {tab === "courts" && (
                <div className="space-y-6">
                  {(!Array.isArray(courts) || courts.length === 0) ? (
                    <div className="text-gray-500 text-center py-8">Chưa có sân nào cho địa điểm này.</div>
                  ) : (
                    courts.map((court) => (
                      <div key={court.id} className="flex flex-col md:flex-row bg-gray-50 rounded-lg shadow p-4 items-center md:items-stretch">
                        <div className="w-full md:w-1/3 flex items-center justify-center mb-4 md:mb-0">
                          {/* Ảnh sân */}
                          <div className={`w-full h-45 bg-gray-200 rounded-lg flex items-center justify-center`}>
                            {court.images && court.images.length > 0 ? (
                              <img src={court.images[0].imageUrl} alt={court.courtName} className="object-cover w-full h-full rounded-lg" />
                            ) : (
                              <span className="text-gray-400">Không có ảnh</span>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 px-4 flex flex-col justify-between">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold mb-1">{court.courtName}</h3>
                              <div className="text-gray-600 text-sm mb-1">{court.courtType}</div>
                              <div className="text-gray-500 text-xs mb-2">Kích thước: <span className="font-semibold">{court.length}m x {court.width}m</span></div>
                              <div className="text-gray-500 text-xs">Năm xây dựng: <span className="font-semibold">{court.yearBuild}</span></div>
                            </div>
                            <div className="text-emerald-600 text-xl font-bold">
                              {court.prices && court.prices.length > 0 ? `${court.prices[0].price.toLocaleString()} VNĐ/giờ` : "Liên hệ"}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {/* Đặc điểm */}
                            {/* Đã loại bỏ court.features vì không có trong model */}
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button className="bg-emerald-600 text-white px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-emerald-700 transition" onClick={() => {
                              navigate(`/booking/${court.id}`);
                            }}>
                              <span>Đặt sân</span>
                            </button>
                            <button className="border border-emerald-600 text-emerald-600 px-4 py-2 rounded font-semibold flex items-center gap-2 hover:bg-emerald-50 transition" onClick={() => {
                              navigate(`/detail-court/${court.id}`);
                            }}>
                              <Info className="w-4 h-4" /> Chi tiết sân
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
              {tab === "utilities" && (
                <div className="text-gray-500 text-center py-8">Chức năng tiện ích đang phát triển...</div>
              )}
              {tab === "reviews" && (
                <div className="text-gray-500 text-center py-8">Chức năng đánh giá đang phát triển...</div>
              )}
              {tab === "info" && (
                <div className="text-gray-500 text-center py-8">Thông tin chi tiết về địa điểm...</div>
              )}
            </div>
          </div>
        </div>
        {/* Right: Liên hệ, trạng thái, vị trí, sân phổ biến */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-lg mb-4">Liên hệ nhanh</div>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold flex items-center justify-center gap-2 mb-2">
              <Phone className="w-4 h-4" /> Gọi ngay
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded font-semibold flex items-center justify-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4" /> Nhắn tin
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-2 rounded font-semibold flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" /> Chỉ đường
            </button>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-lg mb-4">Trạng thái hoạt động</div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-3 h-3 rounded-full ${open ? "bg-green-500" : "bg-gray-400"} inline-block`}></span>
              <span className={`${open ? "text-green-600" : "text-gray-500"} font-semibold`}>
                {open ? "Đang mở cửa" : "Đang đóng cửa"}
              </span>
            </div>
            <div className="text-gray-600 text-sm flex items-center gap-2">
              <span>Đóng cửa lúc {(businessLocation.closeTime || "23:00").slice(0, 5)}</span>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-lg mb-4">Vị trí</div>
            <div className="text-gray-600 text-sm mb-2 flex items-center">
              <MapPin className="w-4 h-4 mr-1" />
              {businessLocation.address}
            </div>
            <div className="bg-gray-200 rounded h-32 flex items-center justify-center text-gray-400">Bản đồ Google Maps</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <div className="font-bold text-lg mb-4">Sân phổ biến</div>
            {Array.isArray(courts) && courts.slice(0, 2).map((court) => (
              <div key={court.id} className="flex items-center gap-3 mb-3 last:mb-0">
                <div className="w-14 h-14 bg-gray-200 rounded flex items-center justify-center">
                  {court.images && court.images.length > 0 ? (
                    <img src={court.images[0].imageUrl} alt={court.courtName} className="object-cover w-full h-full rounded" />
                  ) : (
                    <span className="text-gray-400 text-xs">No Img</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{court.courtName}</div>
                  <div className="text-emerald-600 text-xs font-bold">{court.prices && court.prices.length > 0 ? `${court.prices[0].price.toLocaleString()} VNĐ/giờ` : "Liên hệ"}</div>
                </div>
                <button onClick={() => {
                  navigate(`/booking/${court.id}`);
                }} className="bg-emerald-600 text-white px-3 py-1 rounded font-semibold text-xs">Đặt</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 