import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Switch } from "./ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useUserRole } from "../Hooks/use-user-role"

export function SettingsTabs() {
  const { role } = useUserRole()
  const [activeTab, setActiveTab] = useState("account")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="account">Tài khoản</TabsTrigger>
        <TabsTrigger value="notifications">Thông báo</TabsTrigger>
        <TabsTrigger value="security">Bảo mật</TabsTrigger>
        {role === "court_manager" && <TabsTrigger value="payment">Thanh toán</TabsTrigger>}
        {role === "admin" && <TabsTrigger value="system">Hệ thống</TabsTrigger>}
      </TabsList>

      <TabsContent value="account" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" defaultValue="Nguyễn Văn A" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="nguyenvana@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input id="phone" defaultValue="0901234567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <Input
                  id="role"
                  defaultValue={
                    role === "admin" ? "System Admin" : role === "court_manager" ? "Court Manager" : "Court Staff"
                  }
                  disabled
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Ảnh đại diện</Label>
              <Input id="avatar" type="file" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Lưu thay đổi</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Đổi mật khẩu</CardTitle>
            <CardDescription>Cập nhật mật khẩu của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
              <Input id="current-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Mật khẩu mới</Label>
              <Input id="new-password" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Cập nhật mật khẩu</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt thông báo</CardTitle>
            <CardDescription>Quản lý các thông báo bạn nhận được</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-booking">Đặt sân mới</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo khi có đặt sân mới</p>
                </div>
                <Switch id="notify-booking" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-cancellation">Hủy đặt sân</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo khi có đặt sân bị hủy</p>
                </div>
                <Switch id="notify-cancellation" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-payment">Thanh toán</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo khi có thanh toán mới</p>
                </div>
                <Switch id="notify-payment" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notify-system">Thông báo hệ thống</Label>
                  <p className="text-sm text-muted-foreground">Nhận thông báo về cập nhật hệ thống</p>
                </div>
                <Switch id="notify-system" defaultChecked />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Lưu thay đổi</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kênh thông báo</CardTitle>
            <CardDescription>Cấu hình các kênh gửi thông báo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="channel-email">Email</Label>
                <p className="text-sm text-muted-foreground">Gửi thông báo qua email</p>
              </div>
              <Switch id="channel-email" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="channel-sms">SMS</Label>
                <p className="text-sm text-muted-foreground">Gửi thông báo qua tin nhắn SMS</p>
              </div>
              <Switch id="channel-sms" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="channel-push">Thông báo đẩy</Label>
                <p className="text-sm text-muted-foreground">Gửi thông báo đẩy qua ứng dụng di động</p>
              </div>
              <Switch id="channel-push" defaultChecked />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Lưu thay đổi</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Bảo mật tài khoản</CardTitle>
            <CardDescription>Quản lý các cài đặt bảo mật cho tài khoản của bạn</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Xác thực hai yếu tố</Label>
                <p className="text-sm text-muted-foreground">Bảo vệ tài khoản của bạn với xác thực hai yếu tố</p>
              </div>
              <Switch id="two-factor" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-history">Lịch sử đăng nhập</Label>
              <div className="rounded-md border p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Chrome trên Windows</div>
                      <div className="text-sm text-muted-foreground">Hà Nội, Việt Nam</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Hôm nay, 10:30</div>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Safari trên iPhone</div>
                      <div className="text-sm text-muted-foreground">Hà Nội, Việt Nam</div>
                    </div>
                    <div className="text-sm text-muted-foreground">Hôm qua, 15:45</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Lưu thay đổi</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      {role === "court_manager" && (
        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin thanh toán</CardTitle>
              <CardDescription>Quản lý thông tin tài khoản thanh toán của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bank-name">Tên ngân hàng</Label>
                <Input id="bank-name" defaultValue="Vietcombank" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-number">Số tài khoản</Label>
                <Input id="account-number" defaultValue="1234567890" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="account-name">Tên chủ tài khoản</Label>
                <Input id="account-name" defaultValue="NGUYEN VAN A" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Chi nhánh</Label>
                <Input id="branch" defaultValue="Hà Nội" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Lưu thay đổi</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      )}

      {role === "admin" && (
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt hệ thống</CardTitle>
              <CardDescription>Quản lý các cài đặt hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="system-name">Tên hệ thống</Label>
                <Input id="system-name" defaultValue="SportCourt" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-logo">Logo hệ thống</Label>
                <Input id="system-logo" type="file" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-description">Mô tả hệ thống</Label>
                <Textarea id="system-description" defaultValue="Nền tảng quản lý sân thể thao toàn diện" rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenance-mode">Chế độ bảo trì</Label>
                <Select defaultValue="off">
                  <SelectTrigger id="maintenance-mode">
                    <SelectValue placeholder="Chọn chế độ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="off">Tắt</SelectItem>
                    <SelectItem value="on">Bật</SelectItem>
                    <SelectItem value="scheduled">Theo lịch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Lưu thay đổi</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      )}
    </Tabs>
  )
}
