import { useEffect } from "react"
import { PickupPoint } from "./point"
import { observer } from "mobx-react-lite"
import pointsModel from "./model/point-model"
import clientModel from "../../kernel/model/client-model"
import { Link, useNavigate } from "react-router-dom"

export const Points = observer(() => {
    const { init, model } = pointsModel;
    const { user } = clientModel;
    const navigate = useNavigate();
    useEffect(() => {
        init(user?.id || 0)
    }, [])
    return (
        <div className={`rounded-[20px] h-fit max-w-[600px] min-w-[500px] ${model.length > 0 && "shadow-[0px_3px_4px_0px_#0000000A]"}`}>
            <div className="p-6 bg-[#fefefe] shadow-[0px_12px_23px_0px_#3E49540A] mb-7 flex fledx-row w-full justify-between">
                <span className="text-[20px] font-bold">Точки сбора ЖБО</span>
                <Link to="pickup/create" className="text-white hover:bg-[var(--clr-accent)] bg-[#2953E8] rounded-[18px] py-1.5 px-5 duration-300" >
                    + Добавить
                </Link>
            </div>


            <div className="px-3 flex flex-col gap-6 overflow-y-auto max-h-[300px]">
                {model.map(x =>
                    <PickupPoint wasteVolume={x.wasteVolume} address={x.address} id={x.pointId} coords={{ latitude: x.latitude, longitude: x.longitude }} />
                )}
            </div>
        </div>
    )
})