import { Button } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { useNavigate } from "react-router-dom"

type Props = {
    isActive: boolean,
    link: string,
    title: string,
    icon?: string
}

export const NavbarItem = ({ isActive, link, title, icon }: Props) => {
    const navigate = useNavigate();
    return (
        <div>
            <Button class="flex flex-col items-center" onClick={() => { navigate(link) }}>
                <Icon systemName={`${icon}${isActive ? "-active" : ""}`} width={24} height={24} />
                <span className={`font-bold text-[10px] ${isActive ? "text-[#4A85F6]" : "text-[#999999]"}`}>{title}</span>
            </Button>
        </div>
    )
}