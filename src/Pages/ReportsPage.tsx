import { ReportsView } from "../Components/reports-view";


export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Báo cáo & Thống kê</h1>
        <p className="text-muted-foreground">Xem báo cáo doanh thu và hoạt động của hệ thống</p>
      </div>
      <ReportsView />
    </div>
  )
}
