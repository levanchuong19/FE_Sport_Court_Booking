"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Badge } from "./ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Calendar, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash } from "lucide-react"
import { useUserRole } from "../Hooks/use-user-role"
import { CourtRegistrationForm } from "./court-registration-form"

export function CourtsManagement() {
  const { role } = useUserRole()
  const [activeTab, setActiveTab] = useState("all-courts")
  const [showAddCourtForm, setShowAddCourtForm] = useState(false)

  const courts = [
    {
      id: "C001",
      name: "Sân bóng đá Mini 5",
      type: "football",
      location: "Quận 1, TP.HCM",
      status: "active",
      manager: "Nguyễn Văn X",
      price: "250,000đ/giờ",
    },
    {
      id: "C002",
      name: "Sân tennis Thảo Điền",
      type: "tennis",
      location: "Quận 2, TP.HCM",
      status: "active",
      manager: "Trần Thị Y",
      price: "175,000đ/giờ",
    },
    {
      id: "C003",
      name: "Sân cầu lông Phú Nhuận",
      type: "badminton",
      location: "Quận Phú Nhuận, TP.HCM",
      status: "maintenance",
      manager: "Lê Văn Z",
      price: "125,000đ/giờ",
    },
    {
      id: "C004",
      name: "Sân bóng rổ Tân Bình",
      type: "basketball",
      location: "Quận Tân Bình, TP.HCM",
      status: "active",
      manager: "Phạm Thị W",
      price: "200,000đ/giờ",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Hoạt động</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Bảo trì</Badge>
      case "inactive":
        return <Badge className="bg-red-500 hover:bg-red-600">Không hoạt động</Badge>
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
      {!showAddCourtForm ? (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Tìm kiếm sân..." className="pl-8 w-full sm:w-[300px]" />
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

            {role === "court_manager" || role === "admin" ? (
              <Button onClick={() => setShowAddCourtForm(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Thêm sân mới
              </Button>
            ) : null}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="all-courts">Tất cả sân</TabsTrigger>
              <TabsTrigger value="active">Đang hoạt động</TabsTrigger>
              <TabsTrigger value="maintenance">Đang bảo trì</TabsTrigger>
              {role === "admin" && <TabsTrigger value="pending">Chờ duyệt</TabsTrigger>}
            </TabsList>

            <TabsContent value="all-courts" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Danh sách sân thể thao</CardTitle>
                  <CardDescription>Quản lý tất cả các sân thể thao trên hệ thống</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên sân</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead>Địa điểm</TableHead>
                        <TableHead>Giá</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courts.map((court) => (
                        <TableRow key={court.id}>
                          <TableCell className="font-medium">{court.id}</TableCell>
                          <TableCell>{court.name}</TableCell>
                          <TableCell>{getTypeLabel(court.type)}</TableCell>
                          <TableCell>{court.location}</TableCell>
                          <TableCell>{court.price}</TableCell>
                          <TableCell>{getStatusBadge(court.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  Xem chi tiết
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Chỉnh sửa
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Quản lý lịch
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash className="mr-2 h-4 w-4" />
                                  Xóa
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sân đang hoạt động</CardTitle>
                  <CardDescription>Danh sách các sân đang hoạt động</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    Danh sách sân đang hoạt động sẽ hiển thị ở đây
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Sân đang bảo trì</CardTitle>
                  <CardDescription>Danh sách các sân đang trong thời gian bảo trì</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    Danh sách sân đang bảo trì sẽ hiển thị ở đây
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {role === "admin" && (
              <TabsContent value="pending" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sân chờ duyệt</CardTitle>
                    <CardDescription>Danh sách các sân đang chờ duyệt</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                      Danh sách sân chờ duyệt sẽ hiển thị ở đây
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Đăng ký sân thể thao mới</CardTitle>
            <CardDescription>Nhập thông tin chi tiết về sân thể thao mới</CardDescription>
          </CardHeader>
          <CardContent>
            <CourtRegistrationForm onCancel={() => setShowAddCourtForm(false)} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
