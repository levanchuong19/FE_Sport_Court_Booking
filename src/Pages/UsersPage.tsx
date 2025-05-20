import { UsersManagement } from "../Components/users-management"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý người dùng</h1>
        <p className="text-muted-foreground">Quản lý tài khoản người dùng trên hệ thống</p>
      </div>
      <UsersManagement />
    </div>
  )
}