import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Label } from "./ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Switch } from "./ui/switch";

export function Settings() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Cài đặt hệ thống</h2>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Thông tin chung</TabsTrigger>
          <TabsTrigger value="booking">Đặt sân</TabsTrigger>
          <TabsTrigger value="notifications">Thông báo</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin nền tảng</CardTitle>
              <CardDescription>Cập nhật thông tin cơ bản của nền tảng đặt sân thể thao</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="platform-name">Tên nền tảng</Label>
                  <Input id="platform-name" defaultValue="SportField Booking" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email liên hệ</Label>
                  <Input id="contact-email" type="email" defaultValue="contact@sportfield.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Số điện thoại liên hệ</Label>
                  <Input id="contact-phone" defaultValue="1900 1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Múi giờ</Label>
                  <Select defaultValue="Asia/Ho_Chi_Minh">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Chọn múi giờ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Ho_Chi_Minh">Việt Nam (GMT+7)</SelectItem>
                      <SelectItem value="Asia/Bangkok">Thái Lan (GMT+7)</SelectItem>
                      <SelectItem value="Asia/Singapore">Singapore (GMT+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input id="address" defaultValue="123 Đường ABC, Quận 1, TP.HCM" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  id="description"
                  rows={4}
                  defaultValue="Nền tảng đặt sân thể thao hàng đầu Việt Nam, cung cấp dịch vụ đặt sân bóng đá, tennis, cầu lông, bóng rổ và nhiều môn thể thao khác."
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Lưu thay đổi</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cài đặt giao diện</CardTitle>
              <CardDescription>Tùy chỉnh giao diện người dùng của nền tảng</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Màu chủ đạo</Label>
                  <div className="flex gap-2">
                    <Input id="primary-color" defaultValue="#22c55e" />
                    <Input type="color" className="w-12 p-1 h-10" defaultValue="#22c55e" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <Input id="logo" type="file" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" defaultChecked />
                <Label htmlFor="dark-mode">Cho phép chế độ tối</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Lưu thay đổi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="booking" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt đặt sân</CardTitle>
              <CardDescription>Quản lý các cài đặt liên quan đến việc đặt sân</CardDescription>
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

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="require-approval" />
                  <Label htmlFor="require-approval">Yêu cầu phê duyệt đặt sân</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="allow-recurring" defaultChecked />
                  <Label htmlFor="allow-recurring">Cho phép đặt sân định kỳ</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="require-payment" defaultChecked />
                  <Label htmlFor="require-payment">Yêu cầu thanh toán trước</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Lưu thay đổi</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phương thức thanh toán</CardTitle>
              <CardDescription>Quản lý các phương thức thanh toán được chấp nhận</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="payment-cash" defaultChecked />
                  <Label htmlFor="payment-cash">Tiền mặt</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="payment-bank-transfer" defaultChecked />
                  <Label htmlFor="payment-bank-transfer">Chuyển khoản ngân hàng</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="payment-momo" defaultChecked />
                  <Label htmlFor="payment-momo">Ví điện tử MoMo</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="payment-vnpay" defaultChecked />
                  <Label htmlFor="payment-vnpay">VNPay</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="payment-credit-card" />
                  <Label htmlFor="payment-credit-card">Thẻ tín dụng/ghi nợ</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Lưu thay đổi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt thông báo</CardTitle>
              <CardDescription>Quản lý các thông báo được gửi đến người dùng và quản trị viên</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Thông báo cho người dùng</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-booking-confirmation">Xác nhận đặt sân</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gửi thông báo khi đặt sân được xác nhận</p>
                  </div>
                  <Switch id="notify-booking-confirmation" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-booking-reminder">Nhắc nhở đặt sân</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Gửi thông báo nhắc nhở trước khi đến giờ đặt sân
                    </p>
                  </div>
                  <Switch id="notify-booking-reminder" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-booking-cancelled">Hủy đặt sân</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Gửi thông báo khi đặt sân bị hủy</p>
                  </div>
                  <Switch id="notify-booking-cancelled" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-payment">Thanh toán</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Gửi thông báo khi thanh toán thành công hoặc thất bại
                    </p>
                  </div>
                  <Switch id="notify-payment" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify-promotions">Khuyến mãi</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Gửi thông báo về các chương trình khuyến mãi
                    </p>
                  </div>
                  <Switch id="notify-promotions" />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Thông báo cho quản trị viên</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="admin-notify-new-booking">Đặt sân mới</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Gửi thông báo khi có đặt sân mới</p>
                    </div>
                    <Switch id="admin-notify-new-booking" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="admin-notify-cancellation">Hủy đặt sân</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Gửi thông báo khi có đặt sân bị hủy</p>
                    </div>
                    <Switch id="admin-notify-cancellation" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="admin-notify-new-user">Người dùng mới</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Gửi thông báo khi có người dùng mới đăng ký
                      </p>
                    </div>
                    <Switch id="admin-notify-new-user" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="admin-notify-payment-issue">Vấn đề thanh toán</Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Gửi thông báo khi có vấn đề về thanh toán
                      </p>
                    </div>
                    <Switch id="admin-notify-payment-issue" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Lưu thay đổi</Button>
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
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gửi thông báo qua email</p>
                </div>
                <Switch id="channel-email" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="channel-sms">SMS</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gửi thông báo qua tin nhắn SMS</p>
                </div>
                <Switch id="channel-sms" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="channel-push">Thông báo đẩy</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gửi thông báo đẩy qua ứng dụng di động</p>
                </div>
                <Switch id="channel-push" defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Lưu thay đổi</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt bảo mật</CardTitle>
              <CardDescription>Quản lý các cài đặt bảo mật cho hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor-auth">Xác thực hai yếu tố</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Yêu cầu xác thực hai yếu tố cho tài khoản quản trị viên
                    </p>
                  </div>
                  <Switch id="two-factor-auth" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="password-expiry">Hết hạn mật khẩu</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Yêu cầu đổi mật khẩu định kỳ</p>
                  </div>
                  <Switch id="password-expiry" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="login-attempts">Giới hạn đăng nhập thất bại</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Khóa tài khoản sau nhiều lần đăng nhập thất bại
                    </p>
                  </div>
                  <Switch id="login-attempts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="session-timeout">Thời gian hết phiên</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Tự động đăng xuất sau thời gian không hoạt động
                    </p>
                  </div>
                  <Switch id="session-timeout" defaultChecked />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="password-min-length">Độ dài mật khẩu tối thiểu</Label>
                  <Input id="password-min-length" type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-timeout-minutes">Thời gian hết phiên (phút)</Label>
                  <Input id="session-timeout-minutes" type="number" defaultValue="30" />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="allowed-ips">IP được phép truy cập (để trống cho tất cả)</Label>
                <Textarea id="allowed-ips" placeholder="Nhập các địa chỉ IP, mỗi IP một dòng" rows={3} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Lưu thay đổi</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nhật ký hoạt động</CardTitle>
              <CardDescription>Quản lý nhật ký hoạt động của hệ thống</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="log-admin-actions">Ghi lại hành động quản trị viên</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ghi lại tất cả các hành động của quản trị viên
                  </p>
                </div>
                <Switch id="log-admin-actions" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="log-user-actions">Ghi lại hành động người dùng</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ghi lại các hành động quan trọng của người dùng
                  </p>
                </div>
                <Switch id="log-user-actions" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="log-login-attempts">Ghi lại đăng nhập</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ghi lại tất cả các lần đăng nhập thành công và thất bại
                  </p>
                </div>
                <Switch id="log-login-attempts" defaultChecked />
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="log-retention">Thời gian lưu trữ nhật ký (ngày)</Label>
                <Input id="log-retention" type="number" defaultValue="90" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="bg-green-600 hover:bg-green-700">Lưu thay đổi</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
