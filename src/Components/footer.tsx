function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 max-w-6xl">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-white">SportZone</span>
          </div>
          <p className="text-slate-400 text-sm">
            Nền tảng đặt sân thể thao trực tuyến hàng đầu Việt Nam
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-slate-400 hover:text-white">
              FB
            </a>
            <a href="#" className="text-slate-400 hover:text-white">
              IG
            </a>
            <a href="#" className="text-slate-400 hover:text-white">
              TW
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-white mb-4">Liên kết nhanh</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Trang chủ
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Tìm sân
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Thể loại
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Đăng ký
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Đăng nhập
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-white mb-4">Thông tin</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Về chúng tôi
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Câu hỏi thường gặp
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white text-sm">
                Liên hệ
              </a>
            </li>
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
        <p>
          &copy; {new Date().getFullYear()} SportZone. Tất cả các quyền được bảo
          lưu.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
