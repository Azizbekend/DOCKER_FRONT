import { Icon } from "@/shared/ui/icon";
import { Link } from "react-router-dom";

type Props = {
    title: string;
    description?: string;
    disabledDescription?: string;
    icon?: string;
    disabledIcon?: string;
    disabled?: boolean;
    onClick?: () => void;
    link?: string;
};

export const Card = ({ link, title, description, disabledDescription, icon, disabledIcon, onClick, disabled }: Props) => {
    const disabledStyles = disabled ? "bg-[#CDCDCD]" : "bg-[#4A85F6] cursor-pointer hover:opacity-50 duration-200";
    const cardStyles = disabledStyles + " rounded-[20px] py-6 px-4 md:py-10 md:px-7 flex flex-col sm:flex-row gap-4 w-full w-[46%] justify-between items-center"
    const textStyles = disabled ? "text-[#000000]" : "text-white";

    const currentIcon = disabled ? disabledIcon : icon;
    const currentDescription = disabled ? disabledDescription : description;


    const getChildren = () => {
        return (
            <div className="flex flex-col gap-2 justify-center items-start">
                <div className="flex gap-2 justify-center items-center">
                    <p className={`${textStyles} wxl:text-[22px] text-[20px] font-semibold max-w-[200px] w-full`}>
                        {title}
                    </p>
                    {currentIcon && (
                        <Icon
                            systemName={currentIcon}
                            className="max-w-[55px] max-h-[48px]"
                            height={52}
                        />
                    )}
                </div>
                {currentDescription && (
                    <p className={`${textStyles} 2xl:text-[14px] text-[12px]`}>
                        {currentDescription}
                    </p>
                )}
            </div>
        )
    }


    return (
        disabled ?
            <div
                className={cardStyles}
            >
                {getChildren()}
            </div>
            :

            <Link
                to={link || ""}
                target={"_blank"}
                className={cardStyles}
            // onClick={handleClick}
            >
                {getChildren()}
            </Link>
    )


};