import { Icon } from '@/app/cores/core-trieco/UIKit/icon';
import { useState } from 'react';
import { Link } from 'react-router-dom';

type Props = {
    title?: string;
    isActive?: boolean;
    link: string;
    icon?: string;
    onClick?: () => any;
    hoverText?: string;
}

export const SidebarItem = (props: Props) => {

    const [visible, setVisible] = useState<boolean>(false);

    return (
        <Link to={props.link}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        >
            <div className={`flex relative flex-row justify-between items-center cursor-pointer`}>
                <div className='flex flex-row gap-4 items-center'>
                    <Icon systemName={`${props.icon}${props.isActive ? "-active" : ""}`} height={32} width={32} />
                    <span className={`text-[16px] tracking-[0.5px] ${props.isActive && "text-[#4A85F6]"}`}>{props.title}</span>
                </div>

                {props?.hoverText && (
                    <div
                        className={`absolute top-[100%] left-[70%] py-2 px-[18px] rounded-sm bg-[#848484] text-white w-max z-10
                        transform transition-opacity duration-200 ease-in-out
                        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    >
                        {props?.hoverText}
                    </div>
                )}
            </div>
        </Link>
    )
}