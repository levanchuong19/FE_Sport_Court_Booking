import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { CheckCircle2, XCircle } from "lucide-react"

const schedules = [
  {
    id: "S001",
    court: "Sân bóng đá Mini 5",
    customer: "Nguyễn Văn A",
    time: "08:00 - 10:00",
    status: "checked_in",
    phone: "0901234567",
  },
  {
    id: "S002",
    court: "Sân tennis số 3",
    customer: "Trần Thị B",
    time: "09:00 - 11:00",
    status: "confirmed",
    phone: "0901234568",
  },
  {
    id: "S003",
    court: "Sân cầu lông số 2",
    customer: "Lê Văn C",
    time: "10:00 - 12:00",
    status: "checked_in",
    phone: "0901234569",
  },
  {
    id: "S004",
    court: "Sân bóng đá Mini 7",
    customer: "Phạm Thị D",
    time: "14:00 - 16:00",
    status: "confirmed",
    phone: "0901234570",
  },
  {
    id: "S005",
    court: "Sân tennis số 1",
    customer: "Hoàng Văn E",
    time: "15:00 - 17:00",
    status: "confirmed",
    phone: "0901234571",
  },
  {
    id: "S006",
    court: "Sân cầu lông số 1",
    customer: "Vũ Thị F",
    time: "18:00 - 20:00",
    status: "confirmed",
    phone: "0901234572",
  },
]

export function TodaySchedule() {
  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0 gap-2"
        >
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">{schedule.court}</p>
              <Badge variant={schedule.status === "checked_in" ? "default" : "outline"}>
                {schedule.status === "checked_in" ? "Đã check-in" : "Chưa check-in"}
              </Badge>
            </div>
            <p className="text-sm">
              {schedule.customer} • {schedule.phone}
            </p>
            <p className="text-sm font-medium text-muted-foreground">{schedule.time}</p>
          </div>

          {schedule.status !== "checked_in" && (
            <div className="flex gap-2 self-end sm:self-auto">
              <Button size="sm" className="h-8">
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Check-in
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                <XCircle className="mr-1 h-4 w-4" />
                Hủy
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
