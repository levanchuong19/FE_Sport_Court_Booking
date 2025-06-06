import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell
} from "recharts";

// Màu cho từng bộ môn
const COLORS = ["#34d399", "#3b82f6", "#f59e42", "#a78bfa"];

type WeeklyData = { day: string; customers: number };
type MonthlyData = { month: string; customers: number };
type TopField = { name: string; count: number };
type RevenueBySport = { name: string; value: number };

const revenue = 42000000;
const weeklyCustomers = [12, 18, 22, 30, 25, 28, 35]; // Số khách mỗi ngày trong tuần
const monthlyCustomers = [120, 150, 180, 200, 170, 210, 250, 230, 220, 240, 260, 300]; // Số khách mỗi tháng
const topFields = [
  { name: "Sân bóng đá Mini 5v5", count: 32 },
  { name: "Sân tennis số 3", count: 27 },
  { name: "Sân bóng rổ ngoài trời", count: 21 },
  { name: "Sân cầu lông số 2", count: 18 },
];

// Dữ liệu chủ sân
const owners = [
  { id: "O001", name: "Nguyễn Văn Chủ", phone: "0901111111" },
  { id: "O002", name: "Trần Thị Chủ", phone: "0902222222" },
];

// Dữ liệu sân (mỗi sân gắn với 1 chủ)
const fields = [
  { id: "F001", name: "Sân bóng đá Mini 5v5", ownerId: "O001", bookingCount: 32, revenue: 12000000 },
  { id: "F002", name: "Sân tennis số 3", ownerId: "O001", bookingCount: 27, revenue: 9000000 },
  { id: "F003", name: "Sân bóng rổ ngoài trời", ownerId: "O002", bookingCount: 21, revenue: 8000000 },
  { id: "F004", name: "Sân cầu lông số 2", ownerId: "O002", bookingCount: 18, revenue: 6000000 },
];

const ownerStats = owners.map(owner => {
  const ownerFields = fields.filter(f => f.ownerId === owner.id);
  const totalBooking = ownerFields.reduce((sum, f) => sum + f.bookingCount, 0);
  const totalRevenue = ownerFields.reduce((sum, f) => sum + f.revenue, 0);
  return {
    ...owner,
    totalBooking,
    totalRevenue,
    fields: ownerFields
  };
});

export default function Statistic() {
  // Dữ liệu động (giả lập fetch)
  const [revenueBySport, setRevenueBySport] = useState<RevenueBySport[]>([]);
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [topFields, setTopFields] = useState<TopField[]>([]);
  // Dữ liệu mẫu số lượng chủ sân đăng ký mới theo tháng
  const [ownerRegisterData, setOwnerRegisterData] = useState<{ month: string; count: number }[]>([]);

  useEffect(() => {
    // Giả lập fetch API
    setTimeout(() => {
      setRevenueBySport([
        { name: "Bóng đá", value: 22000000 },
        { name: "Tennis", value: 9000000 },
        { name: "Cầu lông", value: 6000000 },
        { name: "Bóng rổ", value: 5000000 },
        { name: "PickerBall", value: 4000000 },
      ]);
      setWeeklyData([
        { day: "T2", customers: 12 },
        { day: "T3", customers: 18 },
        { day: "T4", customers: 22 },
        { day: "T5", customers: 30 },
        { day: "T6", customers: 25 },
        { day: "T7", customers: 28 },
        { day: "CN", customers: 35 },
      ]);
      setMonthlyData([
        { month: "1", customers: 120 },
        { month: "2", customers: 150 },
        { month: "3", customers: 180 },
        { month: "4", customers: 200 },
        { month: "5", customers: 170 },
        { month: "6", customers: 210 },
        { month: "7", customers: 250 },
        { month: "8", customers: 230 },
        { month: "9", customers: 220 },
        { month: "10", customers: 240 },
        { month: "11", customers: 260 },
        { month: "12", customers: 300 },
      ]);
      setTopFields([
        { name: "Sân bóng đá Mini 5v5", count: 32 },
        { name: "Sân tennis số 3", count: 27 },
        { name: "Sân bóng rổ ngoài trời", count: 21 },
        { name: "Sân cầu lông số 2", count: 18 },
      ]);
      setOwnerRegisterData([
        { month: "1", count: 2 },
        { month: "2", count: 3 },
        { month: "3", count: 4 },
        { month: "4", count: 5 },
        { month: "5", count: 3 },
        { month: "6", count: 6 },
        { month: "7", count: 7 },
        { month: "8", count: 5 },
        { month: "9", count: 4 },
        { month: "10", count: 6 },
        { month: "11", count: 8 },
        { month: "12", count: 10 },
      ]);
    }, 500);
  }, []);

  // Tổng doanh thu
  const totalRevenue = revenueBySport.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Thống kê tổng quan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Doanh thu theo bộ môn (Pie Chart) */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <div className="text-gray-500 text-sm mb-2">Tỷ lệ doanh thu theo bộ môn</div>
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
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => value.toLocaleString() + "đ"}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-lg font-bold text-green-600">
            {totalRevenue.toLocaleString()}đ
          </div>
          <div className="text-xs text-gray-400">Tổng doanh thu tháng này</div>
        </div>
        {/* Lượng khách trong tuần */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <div className="text-gray-500 text-sm mb-2">Lượng khách đặt sân trong tuần</div>
          <div className="flex justify-center w-full">
            <ResponsiveContainer width={600} height={250}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="customers" fill="#34d399" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Lượng khách trong tháng */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <div className="text-gray-500 text-sm mb-2 ">Lượng khách đặt sân trong 12 tháng</div>
          <div className="flex justify-center w-full">
            <ResponsiveContainer width={500} height={250}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
         {/* Biểu đồ số lượng chủ sân đăng ký mới theo tháng */}
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
        <div className="text-gray-500 text-sm mb-2">Số lượng chủ sân đăng ký mới theo tháng</div>
        <div className="flex justify-center w-full">
          <ResponsiveContainer width={500} height={250}>
            <LineChart data={ownerRegisterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#f59e42" strokeWidth={3} dot={{ r: 4 }} name="Chủ sân mới" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      </div>
      {/* Top sân được đặt nhiều nhất */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="text-gray-500 text-sm mb-4">Top sân được đặt nhiều nhất</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Tên sân</th>
              <th className="py-2 px-4 text-left">Số lượt đặt</th>
            </tr>
          </thead>
          <tbody>
            {topFields.map((f, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-2 px-4 font-semibold">{idx + 1}</td>
                <td className="py-2 px-4">{f.name}</td>
                <td className="py-2 px-4">{f.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Thống kê từng sân */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="text-gray-500 text-sm mb-4">Thống kê từng sân</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Mã sân</th>
              <th className="py-2 px-4 text-left">Tên sân</th>
              <th className="py-2 px-4 text-left">Chủ sân</th>
              <th className="py-2 px-4 text-left">Số lượt đặt</th>
              <th className="py-2 px-4 text-left">Doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-2 px-4">{f.id}</td>
                <td className="py-2 px-4">{f.name}</td>
                <td className="py-2 px-4">{owners.find(o => o.id === f.ownerId)?.name}</td>
                <td className="py-2 px-4">{f.bookingCount}</td>
                <td className="py-2 px-4">{f.revenue.toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Thống kê từng chủ sân */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="text-gray-500 text-sm mb-4">Thống kê từng chủ sân</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Mã chủ sân</th>
              <th className="py-2 px-4 text-left">Tên chủ sân</th>
              <th className="py-2 px-4 text-left">Số điện thoại</th>
              <th className="py-2 px-4 text-left">Tổng lượt đặt</th>
              <th className="py-2 px-4 text-left">Tổng doanh thu</th>
            </tr>
          </thead>
          <tbody>
            {ownerStats.map((o, idx) => (
              <tr key={idx} className="border-b border-gray-200">
                <td className="py-2 px-4">{o.id}</td>
                <td className="py-2 px-4">{o.name}</td>
                <td className="py-2 px-4">{o.phone}</td>
                <td className="py-2 px-4">{o.totalBooking}</td>
                <td className="py-2 px-4">{o.totalRevenue.toLocaleString()}đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
} 