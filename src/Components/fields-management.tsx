import { useState } from "react"
import { MapPin, Search, Filter, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Card, CardContent } from "./ui/card"

export function FieldsManagement() {
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  const fields = [
    {
      id: "F001",
      name: "Sân bóng đá Mini 5v5",
      type: "football",
      location: "Quận 1, TP.HCM",
      price: "250,000đ/giờ",
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "F002",
      name: "Sân tennis số 3",
      type: "tennis",
      location: "Quận 3, TP.HCM",
      price: "175,000đ/giờ",
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "F003",
      name: "Sân bóng rổ ngoài trời",
      type: "basketball",
      location: "Quận 7, TP.HCM",
      price: "200,000đ/giờ",
      status: "maintenance",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "F004",
      name: "Sân cầu lông số 2",
      type: "badminton",
      location: "Quận 5, TP.HCM",
      price: "125,000đ/giờ",
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "F005",
      name: "Sân bóng đá Mini 7v7",
      type: "football",
      location: "Quận 10, TP.HCM",
      price: "300,000đ/giờ",
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "F006",
      name: "Sân tennis số 1",
      type: "tennis",
      location: "Quận 3, TP.HCM",
      price: "175,000đ/giờ",
      status: "active",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">Hoạt động</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500">Bảo trì</Badge>
      case "inactive":
        return <Badge className="bg-red-500">Không hoạt động</Badge>
      default:
        return <Badge>Không xác định</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "football":
        return "Bóng đá"
      case "tennis":
        return "Tennis"
      case "basketball":
        return "Bóng rổ"
      case "badminton":
        return "Cầu lông"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Quản lý sân thể thao</h2>
        <Button className="bg-green-600 hover:bg-green-700">
          <MapPin className="mr-2 h-4 w-4" />
          Thêm sân mới
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input type="search" placeholder="Tìm kiếm sân..." className="pl-8 w-full" />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              Lọc
            </Button>

            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Loại sân" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả loại sân</SelectItem>
                <SelectItem value="football">Bóng đá</SelectItem>
                <SelectItem value="tennis">Tennis</SelectItem>
                <SelectItem value="basketball">Bóng rổ</SelectItem>
                <SelectItem value="badminton">Cầu lông</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Danh sách
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-green-600 hover:bg-green-700" : ""}
          >
            Lưới
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Mã sân</TableHead>
                <TableHead>Tên sân</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Địa điểm</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field) => (
                <TableRow key={field.id}>
                  <TableCell className="font-medium">{field.id}</TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>{getTypeLabel(field.type)}</TableCell>
                  <TableCell>{field.location}</TableCell>
                  <TableCell>{field.price}</TableCell>
                  <TableCell>{getStatusBadge(field.status)}</TableCell>
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
                        <DropdownMenuItem>Lịch đặt sân</DropdownMenuItem>
                        <DropdownMenuItem>Đánh giá</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Vô hiệu hóa</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map((field) => (
            <Card key={field.id} className="overflow-hidden">
              <img src={field.image || "/placeholder.svg"} alt={field.name} className="w-full h-40 object-cover" />
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{field.name}</h3>
                  {getStatusBadge(field.status)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">{getTypeLabel(field.type)}</div>
                <div className="text-sm mb-2">{field.location}</div>
                <div className="font-medium mb-4">{field.price}</div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Xem chi tiết
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                  >
                    Chỉnh sửa
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">Hiển thị 1-6 của 20 kết quả</div>
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
