"use client"

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
  LineChart,
  Line,
  Legend,
} from "recharts"
import { ArrowUpRight, CalendarDays, Clock, DollarSign, Users } from "lucide-react"
import { RecentBookings } from "../recent-bookings"
import { TodaySchedule } from "../today-schedule"

const revenueData = [
  { name: "T1", revenue: 2500 },
  { name: "T2", revenue: 2800 },
  { name: "T3", revenue: 3200 },
  { name: "T4", revenue: 3000 },
  { name: "T5", revenue: 3500 },
  { name: "T6", revenue: 3800 },
  { name: "T7", revenue: 4200 },
  { name: "T8", revenue: 4000 },
  { name: "T9", revenue: 3700 },
  { name: "T10", revenue: 4100 },
  { name: "T11", revenue: 4500 },
  { name: "T12", revenue: 5000 },
]

const bookingData = [
  { name: "T2", football: 12, tennis: 8, badminton: 10 },
  { name: "T3", football: 15, tennis: 10, badminton: 8 },
  { name: "T4", football: 18, tennis: 12, badminton: 9 },
  { name: "T5", football: 20, tennis: 15, badminton: 12 },
  { name: "T6", football: 25, tennis: 18, badminton: 15 },
  { name: "T7", football: 30, tennis: 20, badminton: 18 },
  { name: "CN", football: 22, tennis: 15, badminton: 14 },
]

export function CourtManagerOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu tháng này</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.5 triệu VNĐ</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+12.5%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lượt đặt sân</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.3%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tỷ lệ sử dụng</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78.5%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+4.2%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khách hàng mới</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">+6.8%</span> so với tháng trước
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="bookings">Đặt sân</TabsTrigger>
          <TabsTrigger value="schedule">Lịch sân hôm nay</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Doanh thu theo tháng</CardTitle>
              <CardDescription>Doanh thu của các sân thể thao trong năm 2025</CardDescription>
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
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lượt đặt sân theo ngày</CardTitle>
              <CardDescription>Số lượt đặt sân theo ngày trong tuần và loại sân</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="football"
                      name="Bóng đá"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="tennis" name="Tennis" stroke="#10b981" strokeWidth={2} />
                    <Line type="monotone" dataKey="badminton" name="Cầu lông" stroke="#f59e0b" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Đặt sân gần đây</CardTitle>
              <CardDescription>Các lượt đặt sân mới nhất</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentBookings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sân hôm nay</CardTitle>
              <CardDescription>Lịch đặt sân cho ngày hôm nay</CardDescription>
            </CardHeader>
            <CardContent>
              <TodaySchedule />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
