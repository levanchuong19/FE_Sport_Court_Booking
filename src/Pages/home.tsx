

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full bg-white shadow sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-emerald-600">SportZone</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#" className="hover:text-emerald-600 font-medium">Trang chủ</a>
            <a href="#" className="hover:text-emerald-600 font-medium">Tìm sân</a>
            <a href="#" className="hover:text-emerald-600 font-medium">Thể loại</a>
            <a href="#" className="hover:text-emerald-600 font-medium">Hướng dẫn</a>
            <a href="#" className="hover:text-emerald-600 font-medium">Liên hệ</a>
          </nav>
          <div className="flex gap-2">
            <button className="hidden sm:inline-block px-4 py-2 text-sm font-medium hover:text-emerald-600">Đăng nhập</button>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-medium">Đăng ký</button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-emerald-50 to-white py-16 md:py-24">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-4">
            <div className="space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Đặt sân thể thao <span className="text-emerald-600">dễ dàng & nhanh chóng</span>
              </h1>
              <p className="text-lg text-gray-600">
                Tìm và đặt sân cho các môn thể thao yêu thích chỉ với vài cú nhấp chuột. Hàng nghìn sân thể thao đang chờ bạn khám phá.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-semibold">Tìm sân ngay</button>
                <button className="border border-emerald-600 text-emerald-600 px-6 py-3 rounded-md font-semibold hover:bg-emerald-50">Tìm hiểu thêm</button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img src="https://media.vneconomy.vn/images/upload/2024/08/05/sports-gear.jpg?height=400&width=400" alt="Sports venue" className="object-contain rounded-xl shadow-lg w-full max-w-xs md:max-w-md" />
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="container mx-auto -mt-12 z-10 relative px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 border max-w-4xl mx-auto">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <label className="text-sm font-medium">Môn thể thao</label>
                <select className="w-full h-10 mt-1 border rounded-md px-3 text-sm focus:ring-2 focus:ring-emerald-500">
                  <option>Tất cả môn</option>
                  <option>Bóng đá</option>
                  <option>Bóng rổ</option>
                  <option>Tennis</option>
                  <option>Cầu lông</option>
                  <option>Bơi lội</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Địa điểm</label>
                <input type="text" placeholder="Nhập địa điểm" className="w-full h-10 mt-1 border rounded-md px-3 text-sm focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div>
                <label className="text-sm font-medium">Ngày</label>
                <input type="date" className="w-full h-10 mt-1 border rounded-md px-3 text-sm focus:ring-2 focus:ring-emerald-500" />
              </div>
              <div className="flex items-end">
                <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-10 rounded-md font-semibold">Tìm kiếm</button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Sports Categories */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">Các môn thể thao phổ biến</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-2">Khám phá và đặt sân cho các môn thể thao yêu thích của bạn</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Bóng đá", icon: "⚽", color: "bg-green-100" },
              { name: "Bóng rổ", icon: "🏀", color: "bg-orange-100" },
              { name: "Tennis", icon: "🎾", color: "bg-yellow-100" },
              { name: "Cầu lông", icon: "🏸", color: "bg-blue-100" },
              { name: "Bơi lội", icon: "🏊", color: "bg-cyan-100" },
              { name: "Bóng chuyền", icon: "🏐", color: "bg-purple-100" },
              { name: "Golf", icon: "⛳", color: "bg-emerald-100" },
              { name: "Bóng bàn", icon: "🏓", color: "bg-pink-100" },
            ].map((sport, idx) => (
              <div key={idx} className={`rounded-xl p-6 text-center ${sport.color} shadow hover:shadow-md transition`}>
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
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">Xem tất cả <span className="ml-2">→</span></a>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: "Sân bóng đá Mini Thống Nhất",
                  location: "Quận 1, TP.HCM",
                  rating: 4.8,
                  image: "/placeholder.svg?height=200&width=300",
                  price: "300.000đ/giờ",
                },
                {
                  name: "Sân Tennis Phú Nhuận",
                  location: "Quận Phú Nhuận, TP.HCM",
                  rating: 4.6,
                  image: "/placeholder.svg?height=200&width=300",
                  price: "250.000đ/giờ",
                },
                {
                  name: "Sân cầu lông Tân Bình",
                  location: "Quận Tân Bình, TP.HCM",
                  rating: 4.7,
                  image: "/placeholder.svg?height=200&width=300",
                  price: "150.000đ/giờ",
                },
              ].map((venue, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow hover:shadow-md flex flex-col">
                  <img src={venue.image} alt={venue.name} className="object-cover w-full h-48 rounded-t-xl" />
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-lg">{venue.name}</h3>
                        <span className="text-yellow-500 font-semibold">★ {venue.rating}</span>
                      </div>
                      <div className="text-gray-500 text-sm mb-4">{venue.location}</div>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="font-medium text-emerald-600">{venue.price}</span>
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md text-sm font-semibold">Đặt ngay</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Cách thức hoạt động</h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto mt-2">Đặt sân thể thao chưa bao giờ dễ dàng đến thế</p>
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
              <div key={idx} className="bg-white border rounded-xl p-8 text-center shadow">
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
              <h2 className="text-3xl md:text-4xl font-bold">Khách hàng nói gì về chúng tôi</h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto mt-2">Hàng nghìn người dùng đã tin tưởng và sử dụng dịch vụ của chúng tôi</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  name: "Nguyễn Văn A",
                  role: "Cầu thủ bóng đá nghiệp dư",
                  comment: "Tôi rất hài lòng với dịch vụ đặt sân. Giao diện dễ sử dụng và có nhiều sân chất lượng để lựa chọn.",
                  rating: 5,
                },
                {
                  name: "Trần Thị B",
                  role: "HLV Tennis",
                  comment: "Đặt sân tennis chưa bao giờ dễ dàng đến thế. Tôi có thể dễ dàng tìm và đặt sân cho các buổi huấn luyện.",
                  rating: 4,
                },
                {
                  name: "Lê Văn C",
                  role: "Người chơi cầu lông",
                  comment: "Ứng dụng rất tiện lợi, giúp tôi tiết kiệm thời gian tìm kiếm sân. Đặc biệt là tính năng đánh giá sân rất hữu ích.",
                  rating: 5,
                },
              ].map((t, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
                  <div className="flex mb-2">
                    {Array(t.rating).fill(0).map((_, i) => (
                      <span key={i} className="text-yellow-500 text-xl">★</span>
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

        {/* App Download */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center px-4 max-w-5xl">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Tải ứng dụng SportZone</h2>
              <p className="text-lg text-gray-600">Đặt sân thể thao mọi lúc, mọi nơi với ứng dụng di động của chúng tôi. Dễ dàng tìm kiếm, đặt lịch và quản lý các đặt chỗ của bạn.</p>
              <div className="flex gap-4">
                <button className="border border-gray-300 px-5 py-3 rounded-md flex items-center gap-2 font-semibold hover:bg-gray-100">
                  <span></span> App Store
                </button>
                <button className="border border-gray-300 px-5 py-3 rounded-md flex items-center gap-2 font-semibold hover:bg-gray-100">
                  <span>▶</span> Google Play
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <img src="/placeholder.svg?height=500&width=400" alt="Mobile app" className="object-contain w-full max-w-xs md:max-w-sm" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-200 py-12 mt-8">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 max-w-6xl">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold text-white">SportZone</span>
            </div>
            <p className="text-slate-400 text-sm">Nền tảng đặt sân thể thao trực tuyến hàng đầu Việt Nam</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-slate-400 hover:text-white">FB</a>
              <a href="#" className="text-slate-400 hover:text-white">IG</a>
              <a href="#" className="text-slate-400 hover:text-white">TW</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Trang chủ</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Tìm sân</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Thể loại</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Đăng ký</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Đăng nhập</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Thông tin</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Về chúng tôi</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm">Liên hệ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>123 Đường ABC, Quận 1, TP.HCM</li>
              <li>0123 456 789</li>
              <li>info@sportzone.vn</li>
              <li>8:00 - 22:00, Thứ 2 - Chủ nhật</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} SportZone. Tất cả các quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
}