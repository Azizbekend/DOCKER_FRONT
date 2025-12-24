import { useEffect } from "react"
import { PickupPoint } from "./point"
import { observer } from "mobx-react-lite"
import pointsModel from "./model/point-model"
import { Link } from "react-router-dom"
import { useAuth } from "@/entities/user/context"

export const Points = observer(() => {
    const { init, model } = pointsModel;
    const { user } = useAuth();

    useEffect(() => {
        init(user?.id || 0)
    }, [])
    return (
        <div className={`rounded-[20px] h-fit max-w-[600px] min-w-[500px]  bg-white shadow-lg border`}>
            <div className={`p-6 bg-[#fefefe]  flex fledx-row w-full justify-between ${model.length > 0 && "shadow-md"}`}>
                <span className="text-[20px] font-bold">Точки сбора ЖБО</span>
                <Link to="pickup/create" className="text-white hover:bg-[var(--clr-accent)] bg-[#2953E8] rounded-[18px] py-1.5 px-5 duration-300" >
                    + Добавить
                </Link>
            </div>

            {model.length > 0 &&
                <div className="px-3 flex flex-col gap-6 overflow-y-auto max-h-[300px] pt-7 pb-7 px-5">
                    {model.map(x =>
                        <PickupPoint wasteVolume={x.wasteVolume} address={x.address} id={x.pointId} coords={{ latitude: x.latitude, longitude: x.longitude }} />
                    )}
                </div>
            }
        </div >
    )
})