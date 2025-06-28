import React, { useEffect, useState } from "react";
import type { Court } from "../Model/court";
import api from "../Config/api";
import { useNavigate } from "react-router-dom";

const sportMap: Record<string, string> = {
  FOOTBALL: "Bóng đá",
  TENNIS: "Tennis",
  BADMINTON: "Cầu lông",
  BASKETBALL: "Bóng rổ",
};

const getSportColor = (sport: string) => {
  const colors: Record<string, string> = {
    "Cầu lông": "bg-blue-500",
    "Bóng rổ": "bg-orange-500",
    Tennis: "bg-green-500",
    "Bóng đá": "bg-red-500",
  };
  return colors[sport] || "bg-gray-400";
};

const DollarIcon = () => <span className="mr-1">💸</span>;
const UserIcon = () => <span className="mr-1">👥</span>;
const HomeIcon = () => <span className="mr-1">🏠</span>;
const ExpandIcon = () => <span className="mr-1">📏</span>;
const InfoIcon = () => <span className="mr-1">ℹ️</span>;

const ShowCourt: React.FC = () => {
  const [courts, setCourts] = useState<Court[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleDetailCourt = (id: string) => {
    navigate(`/detail-court/${id}`);
  };

  const handleSearch = async () => {
    try {
      const res = await api.get("api/court/getAll");
      setCourts(res.data?.data?.content || []);
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setCourts([]);
    } finally {
      setHasSearched(true);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const groupCourtsByType = (list: Court[]) => {
    return list.reduce((acc, court) => {
      const key = court.courtType;
      if (!acc[key]) acc[key] = [];
      acc[key].push(court);
      return acc;
    }, {} as Record<string, Court[]>);
  };

  const groupedCourts = groupCourtsByType(courts);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#00D084] to-transparent py-6">
      <div className="animate__animated animate__fadeInUp max-w-[1100px] mx-auto mb-12 rounded-3xl overflow-hidden bg-gradient-to-br from-[#F0FFF0] to-[#90EE90] flex shadow-lg">
        <div className="flex-1 px-8 py-10 flex flex-col justify-center">
          <h1 className="text-[2.4rem] text-[#006e51] mb-3 font-bold">
            🏟️ Tìm Sân Thể Thao
          </h1>
          <p className="text-base text-[#333]">
            Đặt sân thể thao tiện lợi, nhanh chóng và hiện đại tại TP.HCM với
            SportZone.
          </p>
        </div>
        <div className="flex-[1.2] flex justify-center items-center p-6">
          <img
            src="https://png.pngtree.com/png-vector/20240708/ourmid/pngtree-athlete-running-logo-png-image_7216956.png"
            alt="sports illustration"
            className="w-full max-w-[400px] h-auto object-contain mx-auto"
          />
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6">
        {hasSearched && courts.length === 0 ? (
          <div className="text-center p-12 rounded-2xl bg-white shadow">
            <div className="flex flex-col items-center">
              <span className="text-5xl mb-2">😢</span>
              <p className="text-lg font-semibold">
                Không tìm thấy sân thể thao phù hợp
              </p>
            </div>
          </div>
        ) : (
          Object.entries(groupedCourts).map(([type, list]) => (
            <div key={type} className="mb-12">
              <h2 className="font-bold mb-6 text-2xl text-emerald-700">
                Sân {sportMap[type]} ({list.length} sân)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.slice(0, 3).map((court, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between rounded-2xl shadow-lg w-full border border-emerald-100 hover:shadow-2xl transition-shadow duration-200 bg-white"
                  >
                    <div className="relative h-[200px]">
                      <img
                        alt={court.courtName}
                        src={
                          court.images?.[0]?.imageUrl ||
                          "https://dungcutheduc.vn/images/San-bong-da-Futsal.jpg"
                        }
                        className="w-full h-full object-cover rounded-t-2xl"
                      />
                      <div className="absolute top-3 right-3 z-10">
                        <span
                          className={`font-semibold text-base px-4 py-1 rounded-lg shadow text-white ${getSportColor(
                            sportMap[court.courtType]
                          )}`}
                        >
                          {sportMap[court.courtType]}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 px-2 py-1">
                      <h3 className="m-0 text-emerald-700 font-bold text-lg">
                        {court.courtName}
                      </h3>
                      <div>
                        <InfoIcon />
                        <span className="italic text-gray-600">
                          {court.description}
                        </span>
                      </div>
                      <div>
                        <UserIcon />
                        <span className="text-gray-600">
                          {court.maxPlayers} người
                        </span>
                      </div>
                      <div>
                        <ExpandIcon />
                        <span className="text-gray-600">
                          {court.length}m x {court.width}m
                        </span>
                      </div>

                      <div>
                        <HomeIcon />
                        <span className="text-gray-600">
                          Xây dựng năm {court.yearBuild}
                        </span>
                      </div>
                      <div>
                        <DollarIcon />
                        <span className="font-bold text-lg text-red-500 ">
                          {court.prices?.[0]?.price?.toLocaleString("vi-VN")}
                          đ/giờ
                        </span>
                      </div>
                      <div className="my-4 border-t border-gray-200"></div>
                      <div className="flex gap-3">
                        <button
                          className="flex-1 bg-emerald-500 hover:bg-emerald-600 border-none font-bold text-white py-2 rounded-lg transition-colors duration-200 shadow"
                          type="button"
                        >
                          Đặt sân ngay
                        </button>
                        <button
                          onClick={() => handleDetailCourt(court.id)}
                          className="flex-1 font-bold border border-[#006E51] text-[#006E51] bg-white rounded-lg py-2 transition-colors duration-200 hover:bg-emerald-50 shadow"
                          type="button"
                        >
                          Chi Tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {list.length > 3 && (
                <div className="text-center mt-4">
                  <button
                    className="text-emerald-700 underline font-semibold hover:text-emerald-900 transition"
                    type="button"
                  >
                    Xem tất cả sân {sportMap[type]}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ShowCourt;
