type Props = {
    title: string;
    value: string;
}

export const CashAccountBlock = ({title, value}: Props) => {
    return (
        <div className="py-[34px] px-[23px] bg-[#4A85F6] rounded-[20px]">
            <div className="flex flex-col gap-[12px] items-start w-[235px]">
                <span className="text-[#fff] text-[15px] font-[600]">{title}</span>
                <span className="text-[#fff] text-[20px] font-[600]">{value} ₽</span>
            </div>
        </div>
    )
}
