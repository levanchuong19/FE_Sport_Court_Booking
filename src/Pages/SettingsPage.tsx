import { SettingsTabs } from "../Components/settings-tabs";


export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
        <p className="text-muted-foreground">Quản lý cài đặt hệ thống và tài khoản</p>
      </div>
      <SettingsTabs />
    </div>
  )
}
