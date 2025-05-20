import { useState } from "react"
import { Calendar, Filter, Search, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export function BookingsManagement() {
  const [currentPage, setCurrentPage] = useState(1)

  const bookings = [
    {
      id: "B001",
      user: "Nguyễn Văn A",
      phone: "0901234567",
      field: "Sân bóng đá Mini 5v5",
      time: "15:00 - 17:00",
      date: "15/05/2025",
      price: "500,000đ",
      status: "confirmed",
    },
    {
      id: "B002",
      user: "Trần Thị B",
      phone: "0901234568",
      field: "Sân tennis số 3",
      time: "08:00 - 10:00",
      date: "15/05/2025",
      price: "350,000đ",
      status: "pending",
    },
    {
      id: "B003",
      user: "Lê Văn C",
      phone: "0901234569",
      field: "Sân bóng rổ ngoài trời",
      time: "19:00 - 21:00",
      date: "15/05/2025",
      price: "400,000đ",
      status: "confirmed",
    },
    {
      id: "B004",
      user: "Phạm Thị D",
      phone: "0901234570",
      field: "Sân cầu lông số 2",
      time: "17:00 - 19:00",
      date: "15/05/2025",
      price: "250,000đ",
      status: "cancelled",
    },
    {
      id: "B005",
      user: "Hoàng Văn E",
      phone: "0901234571",
      field: "Sân bóng đá Mini 7v7",
      time: "20:00 - 22:00",
      date: "15/05/2025",
      price: "600,000đ",
      status: "confirmed",
    },
    {
      id: "B006",
      user: "Vũ Thị F",
      phone: "0901234572",
      field: "Sân tennis số 1",
      time: "06:00 - 08:00",
      date: "16/05/2025",
      price: "350,000đ",
      status: "pending",
    },
    {
      id: "B007",
      user: "Đặng Văn G",
      phone: "0901234573",
      field: "Sân bóng đá Mini 5v5",
      time: "18:00 - 20:00",
      date: "16/05/2025",
      price: "500,000đ",
      status: "confirmed",
    },
    {
      id: "B008",
      user: "Ngô Thị H",
      phone: "0901234574",
      field: "Sân cầu lông số 1",
      time: "09:00 - 11:00",
      date: "16/05/2025",
      price: "250,000đ",
      status: "confirmed",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Đã xác nhận</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Chờ xác nhận</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Đã hủy</Badge>
      default:
        return <Badge>Không xác định</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý đặt sân</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <Calendar className="mr-2 h-4 w-4" />
          Tạo đặt sân mới
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input type="search" placeholder="Tìm kiếm đặt sân..." className="pl-8 w-full" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Lọc
            </Button>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="pending">Chờ xác nhận</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Hôm nay</SelectItem>
              <SelectItem value="yesterday">Hôm qua</SelectItem>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="custom">Tùy chỉnh</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Mã đặt sân</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Sân</TableHead>
              <TableHead>Ngày</TableHead>
              <TableHead>Giờ</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{booking.user}</div>
                    <div className="text-sm text-gray-500">{booking.phone}</div>
                  </div>
                </TableCell>
                <TableCell>{booking.field}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{booking.price}</TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Xem chi tiết</DropdownMenuItem>
                      <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                      <DropdownMenuItem>Xác nhận</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Hủy đặt sân</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">Hiển thị 1-8 của 50 kết quả</div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="font-medium">
            {currentPage}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === 7}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
