import { useEffect, useState, useRef } from "react";
import api from "../Config/api";
import LocationCard from "../Components/locationCard";
import type { BusinessLocation } from "../Model/businessLocation";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { CheckCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import type { Feedback } from "../Model/feedback";
import { customAlert } from "../Components/customAlert";

function Home() {
  const [location, setLocation] = useState<BusinessLocation[]>([]);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [paymentBookingCode, setPaymentBookingCode] = useState<string | null>(
    null
  );

  // Search states
  const [searchLocation, setSearchLocation] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Administrative divisions states
  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<any>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);
  const [selectedWard, setSelectedWard] = useState<any>(null);
  const [rating, setRating] = useState<Feedback[]>([]);
  const [currentStep, setCurrentStep] = useState<
    "province" | "district" | "ward"
  >("province");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    console.log("params:", params);
    const code = params.get("bookingID");
    const responseCode = params.get("vnp_ResponseCode");
    console.log("code:", code);
    console.log("responseCode:", responseCode);
    if (code && responseCode === "00") {
      setPaymentBookingCode(code);
      setShowPaymentSuccessModal(true);
    } else if (code && responseCode !== null && responseCode !== "00") {
      customAlert("error", "Thanh toán thất bại");
    }
  }, [location]);

  const updatePaymentStatus = async (code: string) => {
    console.log("code:", code);
    try {
      const response = await api.post(`payment/transaction/${code}`);
      console.log("Payment status updated:", response.data);
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const handlePaymentSuccessModalClose = () => {
    setShowPaymentSuccessModal(false);
    if (paymentBookingCode) {
      updatePaymentStatus(paymentBookingCode);
    }
  };
  const navigate = useNavigate();

  // Fetch provinces from Provinces Open API
  const fetchProvinces = async () => {
    try {
      const response = await fetch("https://provinces.open-api.vn/api/p/");
      const data = await response.json();
      setProvinces(data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  // Fetch districts by province code
  const fetchDistricts = async (provinceCode: string) => {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`
      );
      const data = await response.json();
      setDistricts(data.districts || []);
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  const fetchWards = async (districtCode: string) => {
    try {
      const response = await fetch(
        `https://provinces.open-api.vn/api/d/${districtCode}?depth=2`
      );
      const data = await response.json();
      setWards(data.wards || []);
    } catch (error) {
      console.error("Error fetching wards:", error);
    }
  };

  const handleProvinceSelect = (province: any) => {
    setSelectedProvince(province);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setDistricts([]);
    setWards([]);
    setCurrentStep("district");
    fetchDistricts(province.code);
  };

  // Handle district selection
  const handleDistrictSelect = (district: any) => {
    setSelectedDistrict(district);
    setSelectedWard(null);
    setWards([]);
    setCurrentStep("ward");
    fetchWards(district.code);
  };

  // Handle ward selection
  const handleWardSelect = (ward: any) => {
    setSelectedWard(ward);
    const fullAddress = `${ward.name}, ${selectedDistrict?.name}, ${selectedProvince?.name}`;
    setSearchLocation(fullAddress);
    setShowSuggestions(false);
  };

  // Get current location
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setSearchLocation("Vị trí hiện tại của bạn");
          setShowSuggestions(false);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          alert("Không thể lấy vị trí hiện tại. Vui lòng thử lại.");
        }
      );
    } else {
      setIsLoadingLocation(false);
      alert("Trình duyệt của bạn không hỗ trợ định vị.");
    }
  };

  // Search location with Nominatim
  const searchLocationWithNominatim = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&countrycodes=vn&limit=5`
      );
      const data = await response.json();
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error searching location:", error);
    }
  };

  // Handle location input change
  const handleLocationChange = (value: string) => {
    setSearchLocation(value);
    setCurrentLocation(null);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchLocationWithNominatim(value);
    }, 500);
  };

  // Handle location input focus - show suggestions immediately
  const handleLocationFocus = () => {
    // Clear current selection and show suggestions
    setSearchLocation("");
    setCurrentLocation(null);
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setCurrentStep("province");
    setShowSuggestions(true);
    if (provinces.length === 0) {
      fetchProvinces();
    }
  };

  // Handle search
  const handleSearch = async () => {
    let center = undefined;
    let latitude = 0;
    let longitude = 0;

    if (currentLocation) {
      center = { lat: currentLocation.lat, lng: currentLocation.lng };
      latitude = currentLocation.lat;
      longitude = currentLocation.lng;
    } else if (searchLocation) {
      // Gọi Nominatim để lấy lat/lng từ searchLocation
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchLocation
          )}&countrycodes=vn&limit=1`
        );
        const data = await res.json();
        if (data && data.length > 0) {
          center = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          };
          latitude = parseFloat(data[0].lat);
          longitude = parseFloat(data[0].lon);
        }
      } catch (e) {
        // Nếu lỗi thì bỏ qua, center sẽ undefined
      }
    }

    const searchData = {
      location: currentLocation ? "" : searchLocation,
      latitude,
      longitude,
    };

    try {
      const response = await api.post("/search", searchData);
      navigate("/search", {
        state: {
          searchResults: response.data.data.filter(
            (location: BusinessLocation) => location.status === "ACTIVE"
          ),
          searchData: searchData,
          center, // luôn truyền center nếu có
        },
      });
    } catch (error) {
      alert("Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.");
    }
  };

  const fetchCourt = async () => {
    const response = await api.get("location/top3-BusinessLocations");
    const data = response.data.data.filter(
      (location: BusinessLocation) => location.status === "ACTIVE"
    );
    setLocation(data);
    console.log(response.data.data);
  };
  useEffect(() => {
    fetchCourt();
  }, []);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".location-search-container")) {
        setShowSuggestions(false);
        // Reset to province step when closing
        setCurrentStep("province");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchRating = async () => {
    const response = await api.get("feedback/random");
    console.log("response", response.data.data);
    setRating(response.data.data);
  };

  useEffect(() => {
    fetchRating();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-emerald-50 to-white pt-8 md:pt-12 pb-16 md:pb-24">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-4">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Đặt sân thể thao{" "}
                <span className="text-emerald-600">dễ dàng & nhanh chóng</span>
              </h1>
              <p className="text-lg text-gray-600">
                Tìm và đặt sân cho các môn thể thao yêu thích chỉ với vài cú
                nhấp chuột. Hàng nghìn sân thể thao đang chờ bạn khám phá.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={() => navigate("/court")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold"
                >
                  Tìm sân ngay
                </button>
                <button
                  onClick={() => navigate("/guide")}
                  className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-md font-semibold hover:bg-emerald-50"
                >
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="https://media.vneconomy.vn/images/upload/2024/08/05/sports-gear.jpg?height=400&width=400"
                alt="Sports venue"
                className="object-contain rounded-xl shadow-lg w-full max-w-xs md:max-w-md"
              />
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="container mx-auto -mt-12 z-10 relative px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 max-w-4xl mx-auto">
            <div className="grid gap-2 md:grid-cols-3">
              {/* <div>
                <label className="text-sm font-medium">Môn thể thao</label>
                <select 
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full h-10 mt-1 border border-gray-200 rounded-md px-3 text-sm focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Tất cả môn</option>
                  <option>Bóng đá</option>
                  <option>Bóng rổ</option>
                  <option>Tennis</option>
                  <option>Cầu lông</option>
                  <option>PickerBall</option>
                </select>
              </div> */}
              <div className=" col-span-2 relative location-search-container">
                <label className="text-sm font-medium">
                  Tìm các sân có địa điểm gần bạn
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchLocation}
                    onChange={(e) => handleLocationChange(e.target.value)}
                    onFocus={handleLocationFocus}
                    placeholder="Chọn địa điểm"
                    className="w-full h-10 mt-1 border border-gray-200 rounded-md px-3 text-sm focus:ring-2 focus:ring-emerald-500 pr-10 cursor-pointer"
                    readOnly={true}
                  />
                  <button
                    onClick={getCurrentLocation}
                    disabled={isLoadingLocation}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
                    title="Lấy vị trí hiện tại"
                  >
                    <EnvironmentOutlined
                      className={isLoadingLocation ? "animate-spin" : ""}
                    />
                  </button>
                </div>
                {/* Location suggestions */}
                {showSuggestions && (
                  <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {/* Header with breadcrumb */}
                    <div className="p-3 border-b border-gray-100 bg-gray-50">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-600">Chọn địa điểm:</span>
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() => {
                              setCurrentStep("province");
                              setSelectedProvince(null);
                              setSelectedDistrict(null);
                              setSelectedWard(null);
                            }}
                            className={`px-2 py-1 rounded text-xs ${
                              currentStep === "province"
                                ? "bg-emerald-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                          >
                            Tỉnh/TP
                          </button>
                          {selectedProvince && (
                            <>
                              <span className="text-gray-400">→</span>
                              <button
                                onClick={() => {
                                  setCurrentStep("district");
                                  setSelectedDistrict(null);
                                  setSelectedWard(null);
                                }}
                                className={`px-2 py-1 rounded text-xs ${
                                  currentStep === "district"
                                    ? "bg-emerald-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                              >
                                {selectedProvince.name}
                              </button>
                            </>
                          )}
                          {selectedDistrict && (
                            <>
                              <span className="text-gray-400">→</span>
                              <button
                                onClick={() => {
                                  setCurrentStep("ward");
                                  setSelectedWard(null);
                                }}
                                className={`px-2 py-1 rounded text-xs ${
                                  currentStep === "ward"
                                    ? "bg-emerald-600 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                              >
                                {selectedDistrict.name}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content based on current step */}
                    <div className="max-h-48 overflow-y-auto">
                      {currentStep === "province" && (
                        <div>
                          {provinces.length > 0 ? (
                            provinces.map((province) => (
                              <div
                                key={province.code}
                                onClick={() => handleProvinceSelect(province)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                              >
                                {province.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              Đang tải danh sách tỉnh/thành phố...
                            </div>
                          )}
                        </div>
                      )}

                      {currentStep === "district" && (
                        <div>
                          {districts.length > 0 ? (
                            districts.map((district) => (
                              <div
                                key={district.code}
                                onClick={() => handleDistrictSelect(district)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                              >
                                {district.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              Đang tải danh sách quận/huyện...
                            </div>
                          )}
                        </div>
                      )}

                      {currentStep === "ward" && (
                        <div>
                          {wards.length > 0 ? (
                            wards.map((ward) => (
                              <div
                                key={ward.code}
                                onClick={() => handleWardSelect(ward)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                              >
                                {ward.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-3 py-2 text-sm text-gray-500">
                              Đang tải danh sách phường/xã...
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* <div>
                <label className="text-sm font-medium">Ngày</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full h-10 mt-1 border border-gray-200 rounded-md px-3 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div> */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-10 rounded-md font-semibold"
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Sports Categories */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Các môn thể thao phổ biến
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">
              Khám phá và đặt sân cho các môn thể thao yêu thích của bạn
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Bóng đá", icon: "⚽", color: "bg-green-100" },
              { name: "Bóng rổ", icon: "🏀", color: "bg-orange-100" },
              { name: "Tennis", icon: "🎾", color: "bg-yellow-100" },
              { name: "Cầu lông", icon: "🏸", color: "bg-blue-100" },
              { name: "PickerBall", icon: "🥎", color: "bg-cyan-100" },
              { name: "Bóng chuyền", icon: "🏐", color: "bg-purple-100" },
              { name: "Golf", icon: "⛳", color: "bg-emerald-100" },
              { name: "Bóng bàn", icon: "🏓", color: "bg-pink-100" },
            ].map((sport, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 text-center ${sport.color} shadow hover:shadow-md transition`}
              >
                <div className="text-4xl mb-2">{sport.icon}</div>
                <div className="font-medium">{sport.name}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Venues */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
              <h2 className="text-3xl font-bold">Địa điểm nổi bật</h2>
              <a
                href="/search"
                className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
              >
                Xem tất cả <span className="ml-2">→</span>
              </a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Cách thức hoạt động
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mt-2">
              Đặt sân thể thao chưa bao giờ dễ dàng đến thế
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: "🔍",
                title: "Tìm kiếm",
                desc: "Tìm sân phù hợp với nhu cầu dựa trên vị trí, loại sân và thời gian.",
              },
              {
                icon: "📅",
                title: "Đặt lịch",
                desc: "Chọn ngày và giờ phù hợp, đặt sân trực tuyến chỉ với vài bước đơn giản.",
              },
              {
                icon: "🏅",
                title: "Tận hưởng",
                desc: "Đến sân theo lịch đã đặt và tận hưởng thời gian chơi thể thao cùng bạn bè.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-8 text-center shadow"
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-emerald-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Khách hàng nói gì về chúng tôi
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto mt-2">
                Hàng nghìn người dùng đã tin tưởng và sử dụng dịch vụ của chúng
                tôi
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {rating.map((t, idx) => (
                <div
                  key={t.id}
                  className="bg-white p-6 rounded-xl shadow flex flex-col items-center"
                >
                  <div className="flex mb-2">
                    {Array(Math.round(t.overallRating))
                      .fill(0)
                      .map((_, i) => (
                        <span key={i} className="text-yellow-500 text-xl">
                          ★
                        </span>
                      ))}
                  </div>
                  <p className="italic mb-4 text-center">"{t.comment}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
                      {t.account?.fullName.charAt(0) ?? "?"}
                    </div>
                    <div>
                      <div className="font-medium">
                        {t.account?.fullName ?? "Ẩn danh"}
                      </div>
                      <div className="text-sm text-gray-500">
                        Đã chơi ngày{" "}
                        {new Date(t.playedDate).toLocaleDateString("vi-VN")}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Modal
        open={showPaymentSuccessModal}
        onOk={handlePaymentSuccessModalClose}
        onCancel={handlePaymentSuccessModalClose}
        title="Thanh toán thành công"
      >
        <div className="flex flex-col items-center justify-center">
          <CheckCircleOutlined className="text-green-500 text-4xl" />
          {/* <p>Thanh toán thành công!</p> */}
          <p>Vui lòng đến sân đúng thời gian đã đặt để tận hưởng trải nghiệm</p>
        </div>
      </Modal>
    </div>
  );
}

export default Home;
