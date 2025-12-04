import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import AdminPanelModel from "../kernel/model/admin-panel-model";
import { observer } from "mobx-react-lite";


export const Navbar = observer(() => {
    const { user } = AdminPanelModel;
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
                        <span className="text-[12px]">{user?.roleId}</span>
                    </div>
                </div>
            </div>
        </div>
    )
})