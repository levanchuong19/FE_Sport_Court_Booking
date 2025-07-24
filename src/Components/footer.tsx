import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="bg-slate-900 text-slate-200 py-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 max-w-6xl">
        {/* Cột 1 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-white">SportZone</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Nền tảng đặt sân thể thao trực tuyến hàng đầu Việt Nam
          </p>
          <div className="flex gap-4 mt-4 text-xl">
            <a
              href="https://www.facebook.com/?locale=vi_VN"
              className="text-slate-400 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.instagram.com/accounts/login/"
              className="text-slate-400 hover:text-white transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Cột 2 */}
        <div>
          <h3 className="font-semibold text-white text-base mb-4">
            Liên kết nhanh
          </h3>
          <ul className="space-y-2">
            {["Trang chủ", " Tìm sân", "Thể loại", "Đăng ký", "Đăng nhập"].map(
              (item, idx) => (
                <li key={idx}>
                  <a
                    href="/"
                    className="text-slate-400 hover:text-white text-sm transition"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h3 className="font-semibold text-white text-base mb-4">Thông tin</h3>
          <ul onClick={() => navigate("/guide")} className="space-y-2">
            {[
              "Về chúng tôi",
              "Điều khoản sử dụng",
              "Chính sách bảo mật",
              "Câu hỏi thường gặp",
              "Liên hệ",
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white text-sm transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h3 className="font-semibold text-white text-base mb-4">Liên hệ</h3>
          <ul className="space-y-2 text-sm text-slate-400 leading-relaxed">
            <li>123 Nguyễn Văn Linh, Q.7, TP.HCM</li>
            <li>1900 1234</li>
            <li>support@sportbooking.vn</li>
            <li>8:00 - 22:00, Thứ 2 - Chủ nhật</li>
          </ul>
        </div>
      </div>

      {/* Chân cuối */}
      <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} SportZone. Tất cả các quyền được bảo
        lưu.
      </div>
    </footer>
  );
}

export default Footer;
