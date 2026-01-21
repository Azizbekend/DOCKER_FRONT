import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/packages/entities/user/context"
import { Role } from "@/packages/entities/user/enums"

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

    if (!roles.includes(user.baseRoleId)) {
        return <Navigate to="/error/403" replace />
    }

    return <Outlet />
}
