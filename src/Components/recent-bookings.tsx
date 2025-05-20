import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

export function RecentBookings() {
  const bookings = [
    {
      id: "B001",
      user: { name: "Nguyễn Văn A", avatar: "/placeholder.svg?height=32&width=32", initials: "NA" },
      field: "Sân bóng đá Mini 5v5",
      time: "15:00 - 17:00",
      date: "15/05/2025",
      status: "confirmed",
    },
    {
      id: "B002",
      user: { name: "Trần Thị B", avatar: "/placeholder.svg?height=32&width=32", initials: "TB" },
      field: "Sân tennis số 3",
      time: "08:00 - 10:00",
      date: "15/05/2025",
      status: "pending",
    },
    {
      id: "B003",
      user: { name: "Lê Văn C", avatar: "/placeholder.svg?height=32&width=32", initials: "LC" },
      field: "Sân bóng rổ ngoài trời",
      time: "19:00 - 21:00",
      date: "15/05/2025",
      status: "confirmed",
    },
    {
      id: "B004",
      user: { name: "Phạm Thị D", avatar: "/placeholder.svg?height=32&width=32", initials: "PD" },
      field: "Sân cầu lông số 2",
      time: "17:00 - 19:00",
      date: "15/05/2025",
      status: "cancelled",
    },
    {
      id: "B005",
      user: { name: "Hoàng Văn E", avatar: "/placeholder.svg?height=32&width=32", initials: "HE" },
      field: "Sân bóng đá Mini 7v7",
      time: "20:00 - 22:00",
      date: "15/05/2025",
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
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3"
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={booking.user.avatar || "/placeholder.svg"} alt={booking.user.name} />
              <AvatarFallback>{booking.user.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{booking.user.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{booking.field}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {booking.date}, {booking.time}
            </div>
            {getStatusBadge(booking.status)}
          </div>
        </div>
      ))}
    </div>
  )
}
