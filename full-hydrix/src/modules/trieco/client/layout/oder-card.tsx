import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ornament from "../kernel/static/img/Ornament.png";
import { getOrderCode } from "../pages/orders/service/order";

type Props = {
    id: number
    title: string;
    status: string;
    statusId?: number,
    date: string;
    time: string;
    code?: string
}

export const OrderCard = ({ title, status, date, time, id }: Props) => {
    const [code, setCode] = useState("")
    useEffect(() => {
        getOrderCode({ OrderId: id }).then(x => {
            setCode(x.data.code)
        })
    }, [id])

    return (
        <div className="w-[290px] h-[170px] overflow-hidden relative rounded-xl bg-[#2879E4]">
            <div className="absolute flex items-center w-full h-full pl-[19px] pr-[24px] py-[15px] top-0 left-0">
                <div className="text-white w-full">
                    <p className="font-bold text-[20px] mb-[8px]">{title}</p>
                    <div className="flex items-center justify-between w-full mb-[8px]">
                        <p className="font-regular text-[15px]">{date}</p>
                        <p className="font-regular text-[15px]">{time}</p>
                    </div>

                    <div className="font-regular text-[15px] flex flex-row items-center gap-7 mb-[15px]"><span>Код:</span> <span className="font-semibold">{code}</span></div>

                    <Link to={`order/${id}`} className="font-semibold text-[15px] text-[#4A85F6] rounded-full py-[6px] px-[15px] bg-white" >{status}</Link>
                </div>
            </div>
            <img className="object-cover h-full" src={Ornament} alt="Ornament" />
        </div>
    )
}