import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { Link, useNavigate } from "react-router-dom"

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
            <Link to={link} className="flex flex-row items-center gap-4">
                <Icon width={36} height={36} systemName={`${icon}${isActive ? "-active" : ""}`} />
                <span className={`font-semibold text-[16px] ${isActive ? "text-[#4A85F6]" : "text-[#999999]"}`}>{title}</span>
            </Link>
        </div>
    )
}