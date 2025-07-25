import { useState, useEffect } from "react";
import api from "../../Config/api";
import axios from "axios";
import formatVND from "../../Utils/currency";

interface DashboardStats {
  todayTotalPaidBookings: number;
  todayTotalPaidIncome: number;
  yesterdayTotalPaidBookings: number;
  yesterdayTotalPaidIncome: number;
}

interface CustomerStats {
  todayCustomerAccounts: number;
  yesterdayCustomerAccounts: number;
}

export default function Dashboard() {
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);
  const [customerData, setCustomerData] = useState<CustomerStats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsResponse, customerResponse] = await Promise.all([
          api.get<DashboardStats>(
            "/admin/stats/booking-revenue-today-yesterday"
          ),
          api.get<CustomerStats>("/admin/stats/customer-yesterday-today"),
        ]);
        setStatsData(statsResponse.data);
        setCustomerData(customerResponse.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.status);
          console.error("Response data:", error.response?.data);
          console.error("Request config:", error.config);
        } else {
          console.error("Unknown error:", error);
        }
      }
    };
    fetchData();
  }, []);

  const calculatePercentageChange = (today: number, yesterday: number) => {
    if (yesterday === 0) {
      return today > 0 ? 100 : 0;
    }
    return ((today - yesterday) / yesterday) * 100;
  };

  const bookingChange = statsData
    ? calculatePercentageChange(
        statsData.todayTotalPaidBookings,
        statsData.yesterdayTotalPaidBookings
      )
    : 0;
  const revenueChange = statsData
    ? calculatePercentageChange(
        statsData.todayTotalPaidIncome,
        statsData.yesterdayTotalPaidIncome
      )
    : 0;
  const customerChange = customerData
    ? customerData.todayCustomerAccounts -
      customerData.yesterdayCustomerAccounts
    : 0;

  const stats = [
    {
      label: "Tổng đặt sân hôm nay",
      icon: "📅",
      value: statsData ? statsData.todayTotalPaidBookings : "...",
      change: `${bookingChange >= 0 ? "+" : ""}${bookingChange.toFixed(
        0
      )}% so với hôm qua`,
      changeColor: bookingChange >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      label: "Doanh thu hôm nay",
      icon: "💰",
      value: statsData ? formatVND(statsData.todayTotalPaidIncome) : "...",
      change: `${revenueChange >= 0 ? "+" : ""}${revenueChange.toFixed(
        0
      )}% so với hôm qua`,
      changeColor: revenueChange >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      label: "Khách hàng mới",
      icon: "👤",
      value: customerData ? customerData.todayCustomerAccounts : "...",
      change: `${
        customerChange >= 0 ? "+" : ""
      }${customerChange} so với hôm qua`,
      changeColor: customerChange >= 0 ? "text-green-600" : "text-red-600",
    },
  ];

  const [bookings] = useState([
    {
      customer: "Nguyễn Văn A",
      field: "Sân bóng đá 1",
      time: "14:00 - 16:00",
      status: "Đã xác nhận",
      statusColor: "bg-black text-white",
      price: "300,000 VNĐ",
    },
    {
      customer: "Trần Thị B",
      field: "Sân tennis 2",
      time: "16:00 - 17:00",
      status: "Chờ xác nhận",
      statusColor: "bg-yellow-200 text-yellow-800",
      price: "120,000 VNĐ",
    },
  ]);

  const [fields] = useState([
    {
      name: "Sân bóng đá 1",
      type: "Bóng đá",
      price: "150,000 VNĐ/giờ",
      status: "Trống",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      name: "Sân tennis 2",
      type: "Tennis",
      price: "120,000 VNĐ",
      status: "Đang sử dụng",
      statusColor: "bg-red-100 text-red-700",
    },
  ]);

  const [checkins, setCheckins] = useState([
    {
      id: 1,
      customer: "Nguyễn Văn A",
      field: "Sân bóng đá 1",
      time: "14:00 - 16:00",
      checkedIn: false,
    },
    {
      id: 2,
      customer: "Trần Thị B",
      field: "Sân tennis 2",
      time: "16:00 - 17:00",
      checkedIn: true,
    },
  ]);

  const [pendingFields, setPendingFields] = useState([
    {
      id: 1,
      name: "Sân bóng đá 7 người",
      owner: "Lê Văn Chủ",
      location: "Quận 9, TP.HCM",
      status: "pending",
    },
    {
      id: 2,
      name: "Sân tennis số 5",
      owner: "Nguyễn Thị Chủ",
      location: "Quận 2, TP.HCM",
      status: "pending",
    },
  ]);

  const handleCheckIn = (id: number) => {
    setCheckins((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checkedIn: true } : item))
    );
  };

  const handleApprove = (id: number) => {
    setPendingFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "approved" } : f))
    );
  };
  const handleReject = (id: number) => {
    setPendingFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "rejected" } : f))
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50 bg">
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6">
              <div className="text-gray-500 text-sm mb-2 flex items-center gap-2">
                {item.label} <span>{item.icon}</span>
              </div>
              <div className="text-3xl font-bold mb-1">{item.value}</div>
              <div className={`${item.changeColor} text-xs`}>{item.change}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold">Check-in</h2>
                <p className="text-gray-500 text-sm">
                  Danh sách các sân đã đặt, thực hiện check-in khi đến sân
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th className="py-2 px-4 text-left">Khách hàng</th>
                    <th className="py-2 px-4 text-left">Sân</th>
                    <th className="py-2 px-4 text-left">Thời gian</th>
                    <th className="py-2 px-4 text-left">Trạng thái</th>
                    <th className="py-2 px-4 text-left">Check-in</th>
                  </tr>
                </thead>
                <tbody>
                  {checkins.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="py-2 px-4 font-semibold">
                        {item.customer}
                      </td>
                      <td className="py-2 px-4">{item.field}</td>
                      <td className="py-2 px-4">{item.time}</td>
                      <td className="py-2 px-4">
                        {item.checkedIn ? (
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                            Đã check-in
                          </span>
                        ) : (
                          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                            Chưa check-in
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-4">
                        {item.checkedIn ? (
                          <button
                            className="px-3 py-1 rounded-lg bg-green-500 text-white text-xs font-semibold cursor-default"
                            disabled
                          >
                            Đã check-in
                          </button>
                        ) : (
                          <button
                            className="px-3 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold"
                            onClick={() => handleCheckIn(item.id)}
                          >
                            Check-in
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Trạng thái sân</h2>
            <p className="text-gray-500 text-sm mb-4">
              Tình trạng hiện tại của các sân
            </p>
            <div className="space-y-4">
              {fields.map((f, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="font-semibold">{f.name}</div>
                  <div className="text-gray-500 text-xs mb-1">{f.type}</div>
                  <div className="text-blue-600 text-xs mb-1">{f.price}</div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${f.statusColor}`}
                  >
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 mt-10">
          <h2 className="text-2xl font-bold mb-4">Duyệt sân mới</h2>
          <p className="text-gray-500 text-sm mb-4">
            Danh sách sân vừa được chủ sân up lên, cần duyệt để hiển thị trên hệ
            thống
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-800">
                  <th className="py-2 px-4 text-left">Tên sân</th>
                  <th className="py-2 px-4 text-left">Chủ sân</th>
                  <th className="py-2 px-4 text-left">Địa điểm</th>
                  <th className="py-2 px-4 text-left">Trạng thái</th>
                  <th className="py-2 px-4 text-left">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {pendingFields.map((f) => (
                  <tr
                    key={f.id}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-2 px-4 font-semibold">{f.name}</td>
                    <td className="py-2 px-4">{f.owner}</td>
                    <td className="py-2 px-4">{f.location}</td>
                    <td className="py-2 px-4">
                      {f.status === "pending" && (
                        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs">
                          Chờ duyệt
                        </span>
                      )}
                      {f.status === "approved" && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                          Đã duyệt
                        </span>
                      )}
                      {f.status === "rejected" && (
                        <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs">
                          Đã từ chối
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-4 flex gap-2">
                      {f.status === "pending" && (
                        <>
                          <button
                            className="px-3 py-1 rounded-lg bg-green-500 hover:bg-green-600 text-white text-xs font-semibold"
                            onClick={() => handleApprove(f.id)}
                          >
                            Duyệt
                          </button>
                          <button
                            className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-semibold"
                            onClick={() => handleReject(f.id)}
                          >
                            Từ chối
                          </button>
                        </>
                      )}
                      {f.status !== "pending" && (
                        <button
                          className="px-3 py-1 rounded-lg bg-gray-300 text-gray-600 text-xs font-semibold cursor-default"
                          disabled
                        >
                          Đã xử lý
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
