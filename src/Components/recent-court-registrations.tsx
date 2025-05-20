import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"

const courts = [
  {
    id: "C001",
    name: "Sân bóng đá Mini 5",
    manager: { name: "Nguyễn Văn X", avatar: "/placeholder.svg?height=32&width=32", initials: "NX" },
    location: "Quận 1, TP.HCM",
    date: "10/05/2025",
    status: "approved",
  },
  {
    id: "C002",
    name: "Sân tennis Thảo Điền",
    manager: { name: "Trần Thị Y", avatar: "/placeholder.svg?height=32&width=32", initials: "TY" },
    location: "Quận 2, TP.HCM",
    date: "12/05/2025",
    status: "pending",
  },
  {
    id: "C003",
    name: "Sân cầu lông Phú Nhuận",
    manager: { name: "Lê Văn Z", avatar: "/placeholder.svg?height=32&width=32", initials: "LZ" },
    location: "Quận Phú Nhuận, TP.HCM",
    date: "13/05/2025",
    status: "approved",
  },
  {
    id: "C004",
    name: "Sân bóng rổ Tân Bình",
    manager: { name: "Phạm Thị W", avatar: "/placeholder.svg?height=32&width=32", initials: "PW" },
    location: "Quận Tân Bình, TP.HCM",
    date: "14/05/2025",
    status: "rejected",
  },
]

export function RecentCourtRegistrations() {
  return (
    <div className="space-y-4">
      {courts.map((court) => (
        <div key={court.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={court.manager.avatar || "/placeholder.svg"} alt={court.manager.name} />
              <AvatarFallback>{court.manager.initials}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{court.name}</p>
              <p className="text-sm text-muted-foreground">{court.manager.name}</p>
              <p className="text-xs text-muted-foreground">
                {court.location} • {court.date}
              </p>
            </div>
          </div>
          <Badge
            variant={court.status === "approved" ? "default" : court.status === "pending" ? "outline" : "destructive"}
          >
            {court.status === "approved" ? "Đã duyệt" : court.status === "pending" ? "Chờ duyệt" : "Từ chối"}
          </Badge>
        </div>
      ))}
    </div>
  )
}
