import { useState } from "react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { UserPlus, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

export function UsersManagement() {
  const [currentPage, setCurrentPage] = useState(1)

  const users = [
    {
      id: "U001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@example.com",
      phone: "0901234567",
      role: "user",
      status: "active",
      joinDate: "01/01/2025",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "NA",
    },
    {
      id: "U002",
      name: "Trần Thị B",
      email: "tranthib@example.com",
      phone: "0901234568",
      role: "user",
      status: "active",
      joinDate: "15/01/2025",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TB",
    },
    {
      id: "U003",
      name: "Lê Văn C",
      email: "levanc@example.com",
      phone: "0901234569",
      role: "admin",
      status: "active",
      joinDate: "20/01/2025",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LC",
    },
    {
      id: "U004",
      name: "Phạm Thị D",
      email: "phamthid@example.com",
      phone: "0901234570",
      role: "user",
      status: "inactive",
      joinDate: "05/02/2025",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PD",
    },
    {
      id: "U005",
      name: "Hoàng Văn E",
      email: "hoangvane@example.com",
      phone: "0901234571",
      role: "user",
      status: "active",
      joinDate: "10/02/2025",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "HE",
    },
    {
      id: "U006",
      name: "Vũ Thị F",
      email: "vuthif@example.com",
      phone: "0901234572",
      role: "user",
      status: "active",
      joinDate: "15/02/2025",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "VF",
    },
    {
      id: "U007",
      name: "Đặng Văn G",
      email: "dangvang@example.com",
      phone: "0901234573",
      role: "manager",
      status: "active",
      joinDate: "01/03/2025",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DG",
    },
    {
      id: "U008",
      name: "Ngô Thị H",
      email: "ngothih@example.com",
      phone: "0901234574",
      role: "user",
      status: "inactive",
      joinDate: "10/03/2025",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "NH",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Hoạt động</Badge>
      case "inactive":
        return <Badge className="bg-red-500">Không hoạt động</Badge>
      default:
        return <Badge>Không xác định</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-500">Admin</Badge>
      case "manager":
        return <Badge className="bg-blue-500">Quản lý</Badge>
      case "user":
        return <Badge className="bg-gray-500">Người dùng</Badge>
      default:
        return <Badge>Không xác định</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="mr-2 h-4 w-4" />
          Thêm người dùng
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input type="search" placeholder="Tìm kiếm người dùng..." className="pl-8 w-full" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Lọc
            </Button>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả vai trò</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Quản lý</SelectItem>
                <SelectItem value="user">Người dùng</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="active">Hoạt động</SelectItem>
                <SelectItem value="inactive">Không hoạt động</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Người dùng</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Số điện thoại</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Xem hồ sơ</DropdownMenuItem>
                      <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                      <DropdownMenuItem>Lịch sử đặt sân</DropdownMenuItem>
                      <DropdownMenuItem>Đổi mật khẩu</DropdownMenuItem>
                      {user.status === "active" ? (
                        <DropdownMenuItem className="text-red-600">Vô hiệu hóa</DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-green-600">Kích hoạt</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">Hiển thị 1-8 của 30 kết quả</div>
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
            disabled={currentPage === 4}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
