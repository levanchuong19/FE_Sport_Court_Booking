import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ArrowUpRight, Building2, CalendarDays, DollarSign, Users } from "lucide-react"
import { RecentBookings } from "../recent-bookings"
import { RecentCourtRegistrations } from "../recent-court-registrations"

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

const courtTypeData = [
  { name: "Bóng đá", value: 45 },
  { name: "Tennis", value: 25 },
  { name: "Cầu lông", value: 20 },
  { name: "Bóng rổ", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5 tỷ VNĐ</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+18.2%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng lượt đặt sân</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số sân</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+5.2%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,732</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.4%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="courts">Sân thể thao</TabsTrigger>
          <TabsTrigger value="bookings">Đặt sân</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Doanh thu theo tháng</CardTitle>
                <CardDescription>Tổng doanh thu của hệ thống trong năm 2025</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
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

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Phân bổ loại sân</CardTitle>
                <CardDescription>Tỷ lệ các loại sân thể thao trên hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={courtTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
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
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sân đăng ký gần đây</CardTitle>
                <CardDescription>Các sân thể thao mới đăng ký trên hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentCourtRegistrations />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Đặt sân gần đây</CardTitle>
                <CardDescription>Các lượt đặt sân mới nhất trên hệ thống</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentBookings />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phân tích sân thể thao</CardTitle>
              <CardDescription>Thông tin chi tiết về các sân thể thao trên hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Biểu đồ phân tích sân thể thao sẽ hiển thị ở đây
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Phân tích đặt sân</CardTitle>
              <CardDescription>Thông tin chi tiết về các lượt đặt sân trên hệ thống</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Biểu đồ phân tích đặt sân sẽ hiển thị ở đây
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
