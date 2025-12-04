import { useEffect, useState } from "react";
import { getOrderCode } from "../viewports/orders/service/order";
import { OrderStatus, StatusColor } from "@/app/cores/core-trieco/lib/order";
import { Link } from "react-router-dom";
import Ornament from "../kernel/static/img/Ornament.png";

type Props = {
    id: number
    title: string;
    status: string;
    statusId?: number,
    date: string;
    time: string;
    code?: string
}

export const OrderCard = ({ title, status, date, time, id, statusId }: Props) => {
    const [code, setCode] = useState("")
    useEffect(() => {
        getOrderCode({ OrderId: id }).then(x => {
            setCode(x.data.code)
        })
    }, [])

    let el = statusId as OrderStatus
    const bgColor = StatusColor(el)

    return (
        <div className="w-[197px] h-[125px] overflow-hidden relative rounded-xl bg-[#2879E4]">
            <div className="absolute flex items-end w-full h-full pl-[15px] pr-[24px] py-[15px] py-3 top-0 left-0">
                <div className="text-white w-full">
                    <p className="font-bold text-[14px] mb-[5px]">{title}</p>
                    <div className="flex items-center justify-between w-full mb-[5px]">
                        <p className="font-regular text-[10px]">{date}</p>
                        <p className="font-regular text-[10px]">{time}</p>
                    </div>

                    <div className="font-regular text-[12px] flex flex-row items-center gap-7 mb-1.5"><span>Код:</span> <span className="font-semibold">{code}</span></div>

                    <Link to={`order/${id}`} className="font-regular text-[12px] rounded-full py-[3px] px-[7px] bg-[rgba(255,_255,_255,_0.10)]">{status}</Link>
                </div>
            </div>
            <img className="object-cover h-full" src={Ornament} alt="Ornament" />
        </div>
    )
}