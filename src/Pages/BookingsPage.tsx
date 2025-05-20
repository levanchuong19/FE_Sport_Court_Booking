import { BookingsManagement } from "../Components/bookings-management";


export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý đặt sân</h1>
        <p className="text-muted-foreground">Quản lý tất cả các lịch đặt sân trên hệ thống</p>
      </div>
      <BookingsManagement />
    </div>
  )
}