"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Switch } from "./ui/switch"
import { Plus, Trash } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

export function TimeSlotConfiguration() {
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, startTime: "08:00", endTime: "10:00", price: "250000", isWeekend: false },
    { id: 2, startTime: "10:00", endTime: "12:00", price: "250000", isWeekend: false },
    { id: 3, startTime: "14:00", endTime: "16:00", price: "300000", isWeekend: false },
    { id: 4, startTime: "16:00", endTime: "18:00", price: "350000", isWeekend: false },
    { id: 5, startTime: "18:00", endTime: "20:00", price: "400000", isWeekend: false },
    { id: 6, startTime: "20:00", endTime: "22:00", price: "350000", isWeekend: false },
  ])

  const addTimeSlot = () => {
    const newId = timeSlots.length > 0 ? Math.max(...timeSlots.map((slot) => slot.id)) + 1 : 1
    setTimeSlots([...timeSlots, { id: newId, startTime: "", endTime: "", price: "", isWeekend: false }])
  }

  const removeTimeSlot = (id: number) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id))
  }

  const updateTimeSlot = (id: number, field: string, value: string | boolean) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, [field]: value } : slot)))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Giờ hoạt động</CardTitle>
          <CardDescription>Thiết lập giờ hoạt động của sân</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="opening-time">Giờ mở cửa</Label>
              <Input id="opening-time" type="time" defaultValue="06:00" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="closing-time">Giờ đóng cửa</Label>
              <Input id="closing-time" type="time" defaultValue="22:00" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="weekend-different" />
              <Label htmlFor="weekend-different">Giờ cuối tuần khác với ngày thường</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Khung giờ & Giá</CardTitle>
          <CardDescription>Thiết lập các khung giờ và giá cho từng khung giờ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Giờ bắt đầu</TableHead>
                <TableHead>Giờ kết thúc</TableHead>
                <TableHead>Giá (VNĐ)</TableHead>
                <TableHead>Cuối tuần</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {timeSlots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell>
                    <Input
                      type="time"
                      value={slot.startTime}
                      onChange={(e) => updateTimeSlot(slot.id, "startTime", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="time"
                      value={slot.endTime}
                      onChange={(e) => updateTimeSlot(slot.id, "endTime", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={slot.price}
                      onChange={(e) => updateTimeSlot(slot.id, "price", e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={slot.isWeekend}
                      onCheckedChange={(checked) => updateTimeSlot(slot.id, "isWeekend", checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => removeTimeSlot(slot.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Button variant="outline" onClick={addTimeSlot}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm khung giờ
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt đặt sân</CardTitle>
          <CardDescription>Thiết lập các quy định về đặt sân</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min-booking-time">Thời gian đặt sân tối thiểu (phút)</Label>
              <Input id="min-booking-time" type="number" defaultValue="60" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-booking-time">Thời gian đặt sân tối đa (phút)</Label>
              <Input id="max-booking-time" type="number" defaultValue="180" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="advance-booking-days">Số ngày được đặt trước</Label>
              <Input id="advance-booking-days" type="number" defaultValue="14" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cancel-policy">Chính sách hủy</Label>
              <Select defaultValue="24h">
                <SelectTrigger id="cancel-policy">
                  <SelectValue placeholder="Chọn chính sách hủy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Hủy trước 24 giờ (hoàn 100%)</SelectItem>
                  <SelectItem value="12h">Hủy trước 12 giờ (hoàn 50%)</SelectItem>
                  <SelectItem value="6h">Hủy trước 6 giờ (hoàn 25%)</SelectItem>
                  <SelectItem value="no-refund">Không hoàn tiền</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="require-approval" defaultChecked />
              <Label htmlFor="require-approval">Yêu cầu phê duyệt đặt sân</Label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch id="allow-recurring" defaultChecked />
              <Label htmlFor="allow-recurring">Cho phép đặt sân định kỳ</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
