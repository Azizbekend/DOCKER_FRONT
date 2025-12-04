import { Button } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { observer } from "mobx-react-lite"
import mobileModel from "../kernel/model/mobile-model"
import { useLocation, useNavigate } from "react-router-dom"
import createOrderModel from "../viewports/create-order/entities/create-order-model"

export const Sidebar = observer(() => {
    const { logout } = mobileModel;
    const navigate = useNavigate();
    const { pageCounter, setPage } = createOrderModel;
    const location = useLocation()
    return (
        <div className="h-screen overflow-hidden w-1/3 p-[50px] bg-[#4A85F6] flex flex-col justify-between">
            <div className="flex flex-col gap-[100px]">
                <div className="flex flex-row gap-[25px] items-center">
                    <Icon systemName="client-logo" width={55} height={55} />
                    <span className="font-bold text-[27px] text-white">TRIECO</span>
                </div>
                {
                    location.pathname === "/order/create" &&
                    <div className="font-semibold text-[17px] text-white relative">
                        <div className="absolute transform -translate-x-1/2 h-full border-l-2 border-dotted border-gray-300 left-[18px] z-10" />

                        <div className="flex flex-row items-center gap-5 z-20 mb-10 relative cursor-pointer" onClick={() => setPage(1)}>

                            <div className={`w-9 h-9 flex items-center justify-center rounded-[50%] border-2 ${pageCounter === 1 ? "border-[#0A36A7]" : "border-[#DCDCDC]"} bg-white text-[#202020]`}>
                                {
                                    pageCounter > 1 ? <Icon systemName="check" /> : 1
                                }
                            </div>
                            <span>Местоположение</span>
                        </div>
                        <div className="flex flex-row items-center gap-5 mb-10 z-20 relative cursor-pointer" onClick={() => setPage(2)}>
                            <div className={`w-9 h-9 flex items-center justify-center rounded-[50%] border-2 ${pageCounter === 2 ? "border-[#0A36A7]" : "border-[#DCDCDC]"} bg-white text-[#202020]`}>
                                {
                                    pageCounter > 2 ? <Icon systemName="check" /> : 2
                                }
                            </div>
                            <span>Детали заявки</span>
                        </div>

                        <div className="flex flex-row items-center gap-5 z-20 relative cursor-pointer">
                            <div className={`w-9 h-9 flex items-center justify-center rounded-[50%] border-2 ${pageCounter === 3 ? "border-[#0A36A7]" : "border-[#DCDCDC]"} bg-white text-[#202020]`}>
                                {
                                    pageCounter === 3 ? <Icon systemName="check" /> : 3
                                }
                            </div>
                            <span>Оформление заявки</span>
                        </div>
                    </div>
                }

            </div>
            <div className="flex flex-col gap-7">
                <span className="text-[36px] font-semibold text-white">Повысьте комфорт<br /> с TRIECO</span>
                <Button class="flex flex-row items-center gap-4" onClick={() => { logout(); navigate('/auth') }}>
                    <Icon systemName="exit" />
                    <span className="font-semibold text-[20px]">Выйти</span>
                </Button>
            </div>
        </div>
    )
})