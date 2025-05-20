"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { TodaySchedule } from "../today-schedule"
import { QrCode, Clock, CalendarCheck, AlertTriangle } from "lucide-react"
import { CheckInForm } from "../check-in-form"

export function CourtStaffOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đặt sân hôm nay</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 đã check-in, 16 chưa check-in</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sân đang sử dụng</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5/8</div>
            <p className="text-xs text-muted-foreground">5 sân đang được sử dụng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp đến giờ</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Trong 30 phút tới</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sự cố</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Cần xử lý</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Check-in khách hàng</CardTitle>
            <CardDescription>Quét mã QR hoặc nhập mã đặt sân để check-in</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">
              <QrCode className="mr-2 h-4 w-4" />
              Quét mã QR
            </Button>

            <div className="text-center text-sm text-muted-foreground">hoặc</div>

            <CheckInForm />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Tình trạng sân</CardTitle>
            <CardDescription>Tình trạng hiện tại của các sân</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "F1", name: "Sân bóng đá Mini 5", status: "in_use", time: "15:00 - 17:00" },
                { id: "F2", name: "Sân bóng đá Mini 7", status: "available", time: "" },
                { id: "T1", name: "Sân tennis số 1", status: "in_use", time: "14:30 - 16:00" },
                { id: "T2", name: "Sân tennis số 2", status: "maintenance", time: "" },
                { id: "B1", name: "Sân cầu lông số 1", status: "in_use", time: "16:00 - 17:30" },
                { id: "B2", name: "Sân cầu lông số 2", status: "available", time: "" },
              ].map((court) => (
                <div key={court.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <div className="font-medium">{court.name}</div>
                    {court.time && <div className="text-sm text-muted-foreground">{court.time}</div>}
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      court.status === "in_use"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : court.status === "available"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }
                  >
                    {court.status === "in_use" ? "Đang sử dụng" : court.status === "available" ? "Sẵn sàng" : "Bảo trì"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="space-y-4">
        <TabsList>
          <TabsTrigger value="today">Lịch hôm nay</TabsTrigger>
          <TabsTrigger value="tomorrow">Lịch ngày mai</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch đặt sân hôm nay</CardTitle>
              <CardDescription>Tất cả các lịch đặt sân cho ngày hôm nay</CardDescription>
            </CardHeader>
            <CardContent>
              <TodaySchedule />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tomorrow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch đặt sân ngày mai</CardTitle>
              <CardDescription>Tất cả các lịch đặt sân cho ngày mai</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Lịch đặt sân cho ngày mai sẽ hiển thị ở đây
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
