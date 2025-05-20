import { CourtsManagement } from "../Components/courts-management";

export default function CourtsPage() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quản lý sân thể thao</h1>
          <p className="text-muted-foreground">Quản lý thông tin và lịch hoạt động của các sân thể thao</p>
        </div>
        <CourtsManagement />
      </div>
    )
  }
  