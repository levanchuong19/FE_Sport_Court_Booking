import { Bell, Moon, SunMoon } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function DashboardHeader() {
  const [dark, setDark] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [dark]);

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur flex items-center justify-between px-6 py-2.5 border-b border-gray-200 dark:border-gray-800 ">
      {/* Search bar hoặc logo */}
      <div className="flex items-center gap-2">
        <input
          className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-green-200 bg-gray-50 dark:bg-gray-800 dark:text-white"
          placeholder="Tìm kiếm..."
        />
      </div>
      <div className="flex items-center gap-4">
        {/* Nút chuyển sáng/tối */}
        <button
          onClick={() => setDark((d) => !d)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-xl"
          title="Chuyển giao diện sáng/tối"
        >
          {dark ? (
            <span role="img" aria-label="light"><SunMoon /></span>
          ) : (
            <span role="img" aria-label="dark"><Moon /></span>
          )}
        </button>
        {/* Nút thông báo */}
        <div className="relative">
          <button
            onClick={() => setShowNotif((s) => !s)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-xl relative"
            title="Thông báo"
          >
            <span role="img" aria-label="bell"><Bell /></span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          {showNotif && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4 z-20">
              <div className="font-semibold mb-2">Thông báo</div>
              <div className="text-sm text-gray-500 dark:text-gray-300">Chưa có thông báo mới.</div>
            </div>
          )}
        </div>
        {/* Nút profile/avatar */}
        <button className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <img
            src="https://ui-avatars.com/api/?name=User&background=eee&color=888&size=32"
            alt="avatar"
            className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
          />
        </button>
      </div>
    </header>
  );
} 