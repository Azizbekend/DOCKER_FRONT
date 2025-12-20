import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/entities/user/context"
import { Role } from "@/entities/user/role"

type Props = {
    roles: Role[]
}

export const RoleGuard = ({ roles }: Props) => {
    const { user, isLoading } = useAuth()

    if (isLoading) {
        return null
    }

    if (!user) {
        return <Navigate to="/" replace />
    }

    if (!roles.includes(user.roleId)) {
        return <Navigate to="/error/403" replace />
    }

    return <Outlet />
}
