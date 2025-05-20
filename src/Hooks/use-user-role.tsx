
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

type UserRole = "admin" | "court_manager" | "court_staff"

interface UserRoleContextType {
    role: UserRole
    setRole: (role: UserRole) => void
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined)

export function UserRoleProvider({ children }: { children: ReactNode }) {
    const [role, setRole] = useState<UserRole>("admin")

    // Load saved role from localStorage on component mount
    useEffect(() => {
        const savedRole = localStorage.getItem("userRole") as UserRole | null
        if (savedRole) {
            setRole(savedRole)
        }
    }, [])

    // Save role to localStorage when it changes
    useEffect(() => {
        localStorage.setItem("userRole", role)
    }, [role])

    return <UserRoleContext.Provider value={ { role, setRole } }> { children } </UserRoleContext.Provider>
}

export function useUserRole() {
    const context = useContext(UserRoleContext)
    if (context === undefined) {
        throw new Error("useUserRole must be used within a UserRoleProvider")
    }
    return context
}
