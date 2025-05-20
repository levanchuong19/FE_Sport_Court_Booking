"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { TimeSlotConfiguration } from "./time-slot-configuration"

interface CourtRegistrationFormProps {
  onCancel: () => void
}

export function CourtRegistrationForm({ onCancel }: CourtRegistrationFormProps) {
  const [activeTab, setActiveTab] = useState("basic-info")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic-info">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="facilities">Tiện ích & Hình ảnh</TabsTrigger>
          <TabsTrigger value="time-slots">Khung giờ & Giá</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="court-name">
                Tên sân <span className="text-destructive">*</span>
              </Label>
              <Input id="court-name" placeholder="Nhập tên sân" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="court-type">
                Loại sân <span className="text-destructive">*</span>
              </Label>
              <Select required>
                <SelectTrigger id="court-type">
                  <SelectValue placeholder="Chọn loại sân" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="football">Bóng đá</SelectItem>
                  <SelectItem value="tennis">Tennis</SelectItem>
                  <SelectItem value="basketball">Bóng rổ</SelectItem>
                  <SelectItem value="badminton">Cầu lông</SelectItem>
                  <SelectItem value="volleyball">Bóng chuyền</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="court-address">
              Địa chỉ <span className="text-destructive">*</span>
            </Label>
            <Input id="court-address" placeholder="Nhập địa chỉ đầy đủ" required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="court-city">
                Thành phố/Tỉnh <span className="text-destructive">*</span>
              </Label>
              <Input id="court-city" placeholder="Thành phố/Tỉnh" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="court-district">
                Quận/Huyện <span className="text-destructive">*</span>
              </Label>
              <Input id="court-district" placeholder="Quận/Huyện" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="court-ward">
                Phường/Xã <span className="text-destructive">*</span>
              </Label>
              <Input id="court-ward" placeholder="Phường/Xã" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="court-description">Mô tả</Label>
            <Textarea id="court-description" placeholder="Mô tả chi tiết về sân thể thao" rows={4} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact-name">
                Tên người liên hệ <span className="text-destructive">*</span>
              </Label>
              <Input id="contact-name" placeholder="Tên người liên hệ" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-phone">
                Số điện thoại <span className="text-destructive">*</span>
              </Label>
              <Input id="contact-phone" placeholder="Số điện thoại" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input id="contact-email" type="email" placeholder="Email liên hệ" />
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
            <Button type="button" onClick={() => setActiveTab("facilities")}>
              Tiếp theo
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="court-facilities">Tiện ích</Label>
            <Textarea
              id="court-facilities"
              placeholder="Mô tả các tiện ích của sân (phòng thay đồ, nhà vệ sinh, chỗ để xe, căn tin...)"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="court-images">Hình ảnh sân</Label>
            <Input id="court-images" type="file" multiple accept="image/*" />
            <p className="text-sm text-muted-foreground">
              Tải lên tối đa 5 hình ảnh (JPG, PNG). Kích thước tối đa 5MB mỗi ảnh.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="court-rules">Quy định sử dụng sân</Label>
            <Textarea id="court-rules" placeholder="Các quy định khi sử dụng sân" rows={4} />
          </div>

          <div className="flex justify-between pt-4">
            <Button type="button" onClick={() => setActiveTab("basic-info")}>
              Quay lại
            </Button>
            <Button type="button" onClick={() => setActiveTab("time-slots")}>
              Tiếp theo
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="time-slots" className="space-y-4">
          <TimeSlotConfiguration />

          <div className="flex justify-between pt-4">
            <Button type="button" onClick={() => setActiveTab("facilities")}>
              Quay lại
            </Button>
            <Button type="submit">Hoàn tất đăng ký</Button>
          </div>
        </TabsContent>
      </Tabs>
    </form>
  )
}
