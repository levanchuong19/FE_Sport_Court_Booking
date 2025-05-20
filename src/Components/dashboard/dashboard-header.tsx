import { Bell, Menu, Search, User } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { ModeToggle } from "../mode-toggle"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { DashboardSidebar } from "./dashboard-sidebar"
import { useState } from "react"
import { Badge } from "../ui/badge"

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <DashboardSidebar isMobile={true} onNavigate={() => setIsMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="hidden md:block text-xl font-bold">SportCourt</div>

      <div className="flex-1 md:ml-auto md:flex-none md:w-80">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Tìm kiếm..." className="w-full bg-background pl-8" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
              <span className="sr-only">Thông báo</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Thông báo</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <div className="font-medium">Đặt sân mới</div>
                <div className="text-sm text-muted-foreground">Nguyễn Văn A đã đặt Sân bóng đá Mini 5</div>
                <div className="text-xs text-muted-foreground mt-1">5 phút trước</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <div className="font-medium">Hủy đặt sân</div>
                <div className="text-sm text-muted-foreground">Trần Thị B đã hủy đặt Sân tennis số 3</div>
                <div className="text-xs text-muted-foreground mt-1">30 phút trước</div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start py-2">
                <div className="font-medium">Thanh toán thành công</div>
                <div className="text-sm text-muted-foreground">Lê Văn C đã thanh toán 500,000đ</div>
                <div className="text-xs text-muted-foreground mt-1">1 giờ trước</div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-primary">Xem tất cả thông báo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="sr-only">Tài khoản</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Hồ sơ cá nhân
            </DropdownMenuItem>
            <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
