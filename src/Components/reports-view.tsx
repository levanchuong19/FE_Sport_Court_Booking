import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
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
} from "recharts"
import { Download, Filter } from "lucide-react"
import { useUserRole } from "../Hooks/use-user-role"

const revenueData = [
  { name: "T1", revenue: 4000 },
  { name: "T2", revenue: 4500 },
  { name: "T3", revenue: 5000 },
  { name: "T4", revenue: 4800 },
  { name: "T5", revenue: 5500 },
  { name: "T6", revenue: 6000 },
  { name: "T7", revenue: 6500 },
  { name: "T8", revenue: 6300 },
  { name: "T9", revenue: 5800 },
  { name: "T10", revenue: 6200 },
  { name: "T11", revenue: 6800 },
  { name: "T12", revenue: 7500 },
]

const bookingData = [
  { name: "T1", bookings: 120 },
  { name: "T2", bookings: 140 },
  { name: "T3", bookings: 160 },
  { name: "T4", bookings: 150 },
  { name: "T5", bookings: 180 },
  { name: "T6", bookings: 200 },
  { name: "T7", bookings: 220 },
  { name: "T8", bookings: 210 },
  { name: "T9", bookings: 190 },
  { name: "T10", bookings: 200 },
  { name: "T11", bookings: 230 },
  { name: "T12", bookings: 250 },
]

const courtTypeData = [
  { name: "Bóng đá", value: 45 },
  { name: "Tennis", value: 25 },
  { name: "Cầu lông", value: 20 },
  { name: "Bóng rổ", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function ReportsView() {
  const { role } = useUserRole()
  const [activeTab, setActiveTab] = useState("revenue")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Select defaultValue="year">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Năm 2025</SelectItem>
              <SelectItem value="quarter">Quý 2/2025</SelectItem>
              <SelectItem value="month">Tháng 5/2025</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="custom">Tùy chỉnh</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex gap-2">
            <Filter className="h-4 w-4" />
            Lọc
          </Button>
        </div>

        <Button>
          <Download className="mr-2 h-4 w-4" />
          Xuất báo cáo
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="bookings">Đặt sân</TabsTrigger>
          <TabsTrigger value="courts">Sân thể thao</TabsTrigger>
          <TabsTrigger value="users">Người dùng</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo tháng</CardTitle>
              <CardDescription>Tổng doanh thu trong năm 2025</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => (value === 0 ? "0" : `${value / 1000}k`)} />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} VNĐ`, "Doanh thu"]} />
                    <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lượt đặt sân theo tháng</CardTitle>
              <CardDescription>Tổng số lượt đặt sân trong năm 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} lượt`, "Đặt sân"]} />
                    <Line type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phân bổ loại sân</CardTitle>
              <CardDescription>Tỷ lệ các loại sân thể thao trên hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={courtTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {courtTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => [`${value}%`, "Tỷ lệ"]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thống kê người dùng</CardTitle>
              <CardDescription>Phân tích người dùng trên hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Biểu đồ thống kê người dùng sẽ hiển thị ở đây
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
