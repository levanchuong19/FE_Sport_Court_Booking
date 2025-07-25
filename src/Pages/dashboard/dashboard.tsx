import { useState, useEffect } from "react";
import api from "../../Config/api";
import axios from "axios";
import formatVND from "../../Utils/currency";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

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

const COLORS = ["#34d399", "#3b82f6", "#f59e42", "#a78bfa"];

type WeeklyData = { day: string; customers: number };
type MonthlyData = { month: string; customers: number };
type TopField = { name: string; count: number };
type RevenueBySport = { name: string; value: number };
type NewManagerData = { month: number; total: number };
type ApiTopCourt = { courtName: string; totalPaidBookings: number };
type CourtStatistic = {
  courtName: string;
  managerName: string;
  totalBookings: number;
  totalRevenue: number;
};
type ManagerStatistic = {
  managerId: string;
  fullName: string;
  phone: string;
  totalBookings: number;
  totalRevenue: number;
};

interface PageResponse<T> {
  content: T[];
  last: boolean;
  number: number;
  totalPages: number;
}

export default function Dashboard() {
  const [statsData, setStatsData] = useState<DashboardStats | null>(null);
  const [customerData, setCustomerData] = useState<CustomerStats | null>(null);
  const [revenueBySport, setRevenueBySport] = useState<RevenueBySport[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [topFieldsData, setTopFieldsData] = useState<TopField[]>([]);
  const [ownerRegisterData, setOwnerRegisterData] = useState<
    { month: string; count: number }[]
  >([]);
  const [courtStatistics, setCourtStatistics] = useState<CourtStatistic[]>([]);
  const [managerStatistics, setManagerStatistics] = useState<
    ManagerStatistic[]
  >([]);
  const [managerPage, setManagerPage] = useState(0);
  const [isLastManagerPage, setIsLastManagerPage] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          statsResponse,
          customerResponse,
          revenueResponse,
          weeklyBookingResponse,
          monthlyBookingResponse,
          newManagerResponse,
          topCourtsResponse,
          courtStatsResponse,
        ] = await Promise.all([
          api.get<DashboardStats>(
            "/admin/stats/booking-revenue-today-yesterday"
          ),
          api.get<CustomerStats>("/admin/stats/customer-yesterday-today"),
          api.get<Record<string, number>>(
            "/admin/stats/revenue-this-month-eachCourt"
          ),
          api.get<Record<string, number>>("/admin/stats/booking-this-week"),
          api.get<Record<string, number>>("/admin/stats/booking-this-year"),
          api.get<NewManagerData[]>("/admin/stats/new-manager-this-year"),
          api.get<ApiTopCourt[]>("/admin/stats/top5-court-bookings"),
          api.get<CourtStatistic[]>("/admin/stats/courts-statistic"),
        ]);

        setStatsData(statsResponse.data);
        setCustomerData(customerResponse.data);

        const formattedRevenueData = Object.entries(revenueResponse.data).map(
          ([name, value]) => ({
            name,
            value,
          })
        );
        setRevenueBySport(formattedRevenueData);

        const processWeeklyData = (
          apiData: Record<string, number>
        ): WeeklyData[] => {
          const days = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
          const result: WeeklyData[] = [];
          const today = new Date();
          const dayOfWeek = today.getDay();
          const startOfWeek = new Date(today);
          const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
          startOfWeek.setDate(today.getDate() + diff);

          for (let i = 0; i < 7; i++) {
            const currentDate = new Date(startOfWeek);
            currentDate.setDate(startOfWeek.getDate() + i);

            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1)
              .toString()
              .padStart(2, "0");
            const day = currentDate.getDate().toString().padStart(2, "0");
            const dateKey = `${year}-${month}-${day}`;

            result.push({
              day: days[i],
              customers: apiData[dateKey] || 0,
            });
          }
          return result;
        };
        setWeeklyData(processWeeklyData(weeklyBookingResponse.data));

        const processMonthlyData = (
          apiData: Record<string, number>
        ): MonthlyData[] => {
          const result: MonthlyData[] = [];
          for (let i = 1; i <= 12; i++) {
            const monthKey = String(i);
            result.push({
              month: monthKey,
              customers: apiData[monthKey] || 0,
            });
          }
          return result;
        };
        setMonthlyData(processMonthlyData(monthlyBookingResponse.data));

        const processNewManagerData = (
          apiData: NewManagerData[]
        ): { month: string; count: number }[] => {
          const monthlyCounts = Array(12).fill(0);
          apiData.forEach((item) => {
            if (item.month >= 1 && item.month <= 12) {
              monthlyCounts[item.month - 1] = item.total;
            }
          });
          return monthlyCounts.map((count, index) => ({
            month: String(index + 1),
            count: count,
          }));
        };
        setOwnerRegisterData(processNewManagerData(newManagerResponse.data));

        const formattedTopCourts = topCourtsResponse.data.map((court) => ({
          name: court.courtName,
          count: court.totalPaidBookings,
        }));
        setTopFieldsData(formattedTopCourts);

        setCourtStatistics(courtStatsResponse.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.response?.status);
        } else {
          console.error("Unknown error:", error);
        }
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const fetchManagerStatistics = async () => {
      try {
        const response = await api.get<PageResponse<ManagerStatistic>>(
          `/admin/stats/managers-statistic?page=${managerPage}&size=5`
        );
        setManagerStatistics(response.data.content);
        setIsLastManagerPage(response.data.last);
      } catch (error) {
        console.error("Failed to fetch manager statistics:", error);
      }
    };
    fetchManagerStatistics();
  }, [managerPage]);

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

  const totalRevenue = revenueBySport.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
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

        <h1 className="text-3xl font-bold mb-6">Thống kê tổng quan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="text-gray-500 text-sm mb-2">
              Tỷ lệ doanh thu theo bộ môn
            </div>
            {revenueBySport.length > 0 ? (
              <>
                <div className="flex justify-center w-full">
                  <ResponsiveContainer width={220} height={180}>
                    <PieChart>
                      <Pie
                        data={revenueBySport}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {revenueBySport.map((entry, idx) => (
                          <Cell
                            key={`cell-${idx}`}
                            fill={COLORS[idx % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) =>
                          value.toLocaleString() + "đ"
                        }
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 text-lg font-bold text-green-600">
                  {totalRevenue.toLocaleString()}đ
                </div>
                <div className="text-xs text-gray-400">
                  Tổng doanh thu tháng này
                </div>
              </>
            ) : (
              <div className="flex-grow flex items-center justify-center">
                <p className="text-gray-400">
                  Chưa có dữ liệu doanh thu tháng này
                </p>
              </div>
            )}
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <div className="text-gray-500 text-sm mb-2">
              Lượng khách đặt sân trong tuần
            </div>
            <div className="flex justify-center w-full">
              <ResponsiveContainer width={600} height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="customers"
                    name="Lượt đặt"
                    fill="#34d399"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <div className="text-gray-500 text-sm mb-2 ">
              Lượng khách đặt sân trong 12 tháng
            </div>
            <div className="flex justify-center w-full">
              <ResponsiveContainer width={500} height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="customers"
                    name="Lượt đặt"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
            <div className="text-gray-500 text-sm mb-2">
              Số lượng chủ sân đăng ký mới theo tháng
            </div>
            <div className="flex justify-center w-full">
              <ResponsiveContainer width={500} height={250}>
                <LineChart data={ownerRegisterData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#f59e42"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Chủ sân mới"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="text-gray-500 text-sm mb-4">
            Top sân được đặt nhiều nhất
          </div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">#</th>
                <th className="py-2 px-4 text-left">Tên sân</th>
                <th className="py-2 px-4 text-left">Số lượt đặt</th>
              </tr>
            </thead>
            <tbody>
              {topFieldsData.length > 0 ? (
                topFieldsData.map((f, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-2 px-4 font-semibold">{idx + 1}</td>
                    <td className="py-2 px-4">{f.name}</td>
                    <td className="py-2 px-4">{f.count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-4 px-4 text-center text-gray-500 italic"
                  >
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="text-gray-500 text-sm mb-4">Thống kê từng sân</div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Tên sân</th>
                <th className="py-2 px-4 text-left">Chủ sân</th>
                <th className="py-2 px-4 text-left">Số lượt đặt</th>
                <th className="py-2 px-4 text-left">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {courtStatistics.length > 0 ? (
                courtStatistics.map((stat, idx) => (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-2 px-4">{stat.courtName}</td>
                    <td className="py-2 px-4">{stat.managerName}</td>
                    <td className="py-2 px-4">{stat.totalBookings}</td>
                    <td className="py-2 px-4">
                      {stat.totalRevenue.toLocaleString()}đ
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-4 text-center text-gray-500 italic"
                  >
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="text-gray-500 text-sm mb-4">
            Thống kê từng chủ sân
          </div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">Tên chủ sân</th>
                <th className="py-2 px-4 text-left">Số điện thoại</th>
                <th className="py-2 px-4 text-left">Tổng lượt đặt</th>
                <th className="py-2 px-4 text-left">Tổng doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {managerStatistics.length > 0 ? (
                managerStatistics.map((stat) => (
                  <tr key={stat.managerId} className="border-b border-gray-200">
                    <td className="py-2 px-4">{stat.fullName}</td>
                    <td className="py-2 px-4">{stat.phone}</td>
                    <td className="py-2 px-4">{stat.totalBookings}</td>
                    <td className="py-2 px-4">
                      {stat.totalRevenue.toLocaleString()}đ
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 px-4 text-center text-gray-500 italic"
                  >
                    Chưa có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end mt-4 gap-2">
            <button
              onClick={() => setManagerPage((prev) => prev - 1)}
              disabled={managerPage === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Trang trước
            </button>
            <button
              onClick={() => setManagerPage((prev) => prev + 1)}
              disabled={isLastManagerPage}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Trang sau
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}