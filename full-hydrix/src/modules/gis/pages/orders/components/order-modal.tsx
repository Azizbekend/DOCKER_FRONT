import { OrderStatus } from "@/entities/order/order-status";
import { Order } from "@/entities/order/type";
import useOrderStatus from "@/entities/order/useOrderStatus";
import { Icon } from "@/shared/ui/icon";
import { Modal } from "@/shared/ui/modal/modal";
// import { format } from "date-fns";
import { observer } from "mobx-react-lite";


type Props = {
    show: boolean;
    setShow: (value: boolean) => void;
    info: Order | null;
}

export const OrderModal = observer(({ show, setShow, info }: Props) => {

    let el = Number(info?.orderStatusId) as OrderStatus
    const bgColor = `${useOrderStatus().StatusText(el)}`

    return (
        <Modal
            wrapperId='sewerInfoModal'
            type="center"
            show={show}
            setShow={setShow}
            title="Подробная информация о заявке"
            classNames={{
                panel: "max-w-[640px] w-full",
                body: "px-8 py-5"
            }}

            children={
                <>
                    <div className="flex mb-[14px]">
                        {info?.selfCreated && (
                            <div className="mr-4">
                                <Icon systemName="ambulance"></Icon>
                            </div>
                        )}
                        <div className="flex flex-col">
                            <p className="font-bold text-base leading-[120%]">Заявка на вывоз ЖБО</p>
                            <span className="font-normal">{info?.adress}</span>
                        </div>
                    </div>

                    <div className="flex gap-[48px] mb-[14px]">
                        <p className="font-normal w-[165px]">Статус</p>
                        <p className={`rounded-full py-[6px] px-[8px] text-[10px] font-normal text-xs flex items-center justify-center leading-normal text-center text-white`} style={{ backgroundColor: bgColor }}>{useOrderStatus().StatusText(el)}</p>
                    </div>
                    <div className="flex flex-col font-[400] gap-[17px] leading-[120%] mb-[29px]">
                        <div className="flex gap-[48px]">
                            <p className="text-[#4e4e4e] w-[165px]">№ заявки</p>
                            <p className="text-[#353535] font-[600]">{info?.id}</p>
                        </div>
                        <div className="flex gap-[48px]">
                            <p className="text-[#4e4e4e] w-[165px]">Объем</p>
                            <p className="text-[#353535] font-[600]">{info?.wasteVolume} куб. метра</p>
                        </div>
                        <div className="flex gap-[48px]">
                            <p className="text-[#4e4e4e] w-[165px]">Адрес</p>
                            <p className="text-[#353535] w-[350px] font-[600]">{info?.adress}</p>
                        </div>
                        <div className="flex gap-[48px]">
                            <p className="text-[#4e4e4e] w-[165px]">Имя Фамилия</p>
                            <p className="text-[#353535] font-[600]">{info?.userLastName} {info?.userFirstName} {info?.userPatronymic}</p>
                        </div>
                        <div className="flex gap-[48px]">
                            <p className="text-[#4e4e4e] w-[165px]">Контактный телефон</p>
                            <p className="text-[#353535] font-[600]">{info?.userPhone}</p>
                        </div>
                        <div className="flex gap-[48px]">
                            <p className="text-[#4e4e4e] w-[165px]">Дата</p>
                            <p className="text-[#353535] font-[600]">{info?.arrivalStartDate}</p>
                            {/* <p className="text-[#353535] font-[600]">{format(info?.arrivalStartDate || "", 'dd.MM.yyyy')}</p> */}
                        </div>
                        <div className="flex gap-[48px]">
                            <p className="text-[#4e4e4e] w-[165px]">Время вывоза</p>
                            <p className="text-[#353535] font-[600]"> {info?.arrivalStartDate}-{info?.arrivalEndDate}</p>
                            {/* <p className="text-[#353535] font-[600]"> {format(info?.arrivalStartDate || "", 'HH:mm')}-{format(info?.arrivalEndDate || "", 'HH:mm')}</p> */}
                        </div>
                    </div>
                </>
            }
        />
    )
});
