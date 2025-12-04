import { Icon } from '@/shared/ui/icon';
import { Link, useNavigate } from 'react-router-dom';

type Props = {
    title?: string;
    isActive?: boolean;
    link: string;
    icon?: string;
    className?: string;
    onClick?: () => any;
}

export const SidebarItem = (props: Props) => {

    const navigate = useNavigate()

    if (props.link == "/exit") {
        return (
            <div onClick={props.onClick}>
                <div className={`flex relative rounded-md items-center cursor-pointer ${props.isActive && "bg-[#4A85F6]"}`} >
                    <div className='flex flex-row gap-4 w-full py-2 px-3 2xl:py-3 2xl:px-5 items-center'>
                        <Icon systemName={`${props.icon}${props.isActive ? "-active" : ""}`} width={24} height={24} />
                        <span className={`text-[13px] w-fit 2xl:text-[16px] tracking-[0.5px] text-[#757575] ${props.isActive && "!text-[#fff]"}`}>{props.title}</span>
                    </div>
                </div>
            </div>
        )
    } else {

        return (
            <Link to={props.link} >
                <div className={`flex relative rounded-md items-center cursor-pointer ${props.isActive && "bg-[#4A85F6]"} ${props.className}`} >
                    <div className='flex flex-row gap-4 w-full py-2 px-3 2xl:py-3 2xl:px-5 items-center'>
                        {props.icon &&
                            <Icon systemName={`${props.icon}${props.isActive ? "-active" : ""}`} width={24} height={24} />
                        }
                        <span className={`text-[13px] w-fit 2xl:text-[16px] tracking-[0.5px] text-[#757575] ${props.isActive && "!text-[#fff]"}`}>{props.title}</span>
                    </div>
                </div>
            </Link >
        )
    }
}