import { hardwareModel } from "@/entities/hardware/model";
import { Icon } from "@/shared/ui/icon";
import { Input } from "@/shared/ui/Inputs/input-text";
import { SwitchButton } from "@/shared/ui/switch-button";
import { useState } from "react";
import { Link } from "react-router-dom";


export const EquipmentControll = () => {
    const { model, commands } = hardwareModel
    const [value, setValue] = useState("");

    return (
        <div>

            <div className="bg-white rounded-[20px] p-[45px_30px_50px_40px] mb-5 relative">
                <Link to={"/dispatcher/orders/create"} className="flex items-center gap-2 py-2 px-3 bg-[var(--clr-accent)] text-white w-fit rounded-lg hover:opacity-50 duration-300 absolute top-5 right-5">
                    <Icon systemName="file-plus" />
                    <span>Создать заявку</span>
                </Link>


                <div className="text-[34px] mb-3 font-semibold">
                    Управление
                </div>

                <div className="text-[24px] mb-4 font-semibold">{model.name}</div>
            </div>
            <div className="flex items-top gap-5">
                <div className="w-full bg-white rounded-[20px] p-[45px_30px_50px_40px]">


                    {commands.map((item, key) => {
                        return item.isValue == true
                            ?
                            <div className="flex justify-between mb-5 border-b pb-5" key={key}>
                                <span className="font-bold">{item.name}</span>

                                <div className="flex items-center gap-2">
                                    <Input type="number" value={value} onChange={setValue}
                                        className="border rounded-lg max-w-[80px] py-1 px-2" />
                                    m3
                                </div>
                            </div>
                            :
                            <div className="flex justify-between mb-5 border-b pb-5" key={key}>
                                <span className="font-bold">{item.name}</span>
                                <SwitchButton
                                    onChange={() => { console.log() }}
                                    classNames={{
                                        container: "ml-7 gap-3",
                                        button: "w-[40px] rounded-[150px] block bg-[#757575] p-[3px]",
                                        circle: "rounded-[150px] bg-white h-[18px] w-[18px]",
                                    }}
                                />
                            </div>
                    })}
                </div>
                <div className="w-full bg-white rounded-[20px] p-[45px_30px_50px_40px]">
                    <div className="info-comp__section">
                        <div className="info-comp__subtitle font-bold">Журнал событий</div>

                        <div className="info-comp__act">
                            <span className='info-comp__act-date'>18.10.2025 12.34 - </span> <span className='info-comp__act-status _red'>отключение</span>
                        </div>
                        <div className="info-comp__act">
                            <span className='info-comp__act-date'>18.10.2025 12.36 - </span> <span className='info-comp__act-status _green'>запуск</span>
                        </div>
                        <div className="info-comp__act">
                            <span className='info-comp__act-date'>20.12.2025 12.10 - </span> <span className='info-comp__act-status _orange'>ТО1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}