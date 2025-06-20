import { useEffect, useState } from "react";
import api from "../Config/api";
import LocationCard from "../Components/locationCard";
import type { BusinessLocation } from "../Model/businessLocation";

 function Home() {
  const [location, setLocation] = useState<BusinessLocation[]>([]);
  
    const fetchCourt = async () => {
      const response = await api.get("api/location/top3-BusinessLocations");
      setLocation(response.data.data);
      console.log(response.data.data);
    };
    useEffect(() => {
      fetchCourt();
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
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold">
                  Tìm sân ngay
                </button>
                <button className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-md font-semibold hover:bg-emerald-50">
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
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="text-sm font-medium">Môn thể thao</label>
                <select className="w-full h-10 mt-1 border border-gray-200 rounded-md px-3 text-sm focus:ring-2 focus:ring-emerald-500">
                  <option>Tất cả môn</option>
                  <option>Bóng đá</option>
                  <option>Bóng rổ</option>
                  <option>Tennis</option>
                  <option>Cầu lông</option>
                  <option>PickerBall</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Địa điểm</label>
                <input
                  type="text"
                  placeholder="Nhập địa điểm"
                  className="w-full h-10 mt-1 border border-gray-200 rounded-md px-3 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Ngày</label>
                <input
                  type="date"
                  className="w-full h-10 mt-1 border border-gray-200 rounded-md px-3 text-sm focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-10 rounded-md font-semibold">
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
              <h2 className="text-3xl font-bold">Sân nổi bật</h2>
              <a
                href="#"
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
              {[
                {
                  name: "Nguyễn Văn A",
                  role: "Cầu thủ bóng đá nghiệp dư",
                  comment:
                    "Tôi rất hài lòng với dịch vụ đặt sân. Giao diện dễ sử dụng và có nhiều sân chất lượng để lựa chọn.",
                  rating: 5,
                },
                {
                  name: "Trần Thị B",
                  role: "HLV Tennis",
                  comment:
                    "Đặt sân tennis chưa bao giờ dễ dàng đến thế. Tôi có thể dễ dàng tìm và đặt sân cho các buổi huấn luyện.",
                  rating: 4,
                },
                {
                  name: "Lê Văn C",
                  role: "Người chơi cầu lông",
                  comment:
                    "Ứng dụng rất tiện lợi, giúp tôi tiết kiệm thời gian tìm kiếm sân. Đặc biệt là tính năng đánh giá sân rất hữu ích.",
                  rating: 5,
                },
              ].map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow flex flex-col items-center"
                >
                  <div className="flex mb-2">
                    {Array(t.rating)
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
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;