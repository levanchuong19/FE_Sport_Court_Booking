import { useUserRole } from "../../Hooks/use-user-role"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function RoleSelector() {
  const { role, setRole } = useUserRole()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Xem với vai trò:</span>
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Chọn vai trò" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">System Admin</SelectItem>
          <SelectItem value="court_manager">Court Manager</SelectItem>
          <SelectItem value="court_staff">Court Staff</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
