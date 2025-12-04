import { observer } from "mobx-react-lite";
import { Roles } from "./utils/getRoles"
import { Icon } from "@/shared/ui/icon";
import { useAuth } from "@/entities/user/context";

export const Navbar = observer(() => {

    const { user } = useAuth()

    return (
        <div className="flex relative max-w-full">
            <div className="flex flex-row gap-6 w-full justify-end items-center">
                <div className="flex items-center justify-center">
                    <Icon systemName="bell" />
                </div>
                <div className="h-full w-[2px] bg-[#C2C2C2]" />
                <div className="flex flex-row gap-4">
                    <div className="bg-[#C2C2C2] rounded-full w-[45px] h-[45px]" />
                    <div className="flex h-full flex-col justify-center items-start">
                        <span className="font-semibold text-[16px]">{user?.lastName} {user?.firstName[0]}</span>
                        <span className="text-[12px]">{Roles[user?.roleId]}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})