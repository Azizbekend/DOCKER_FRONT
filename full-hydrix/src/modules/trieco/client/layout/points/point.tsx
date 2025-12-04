import { Link, useNavigate } from "react-router-dom"
import clientModel from "../../kernel/model/client-model"
import { Icon } from "@/shared/ui/icon"
import { Button } from "@/shared/ui/button"
import editPointModel from "../../pages/edit-point/model/edit-point-model"

type Props = {
    id: number,
    address: string,
    coords: {
        latitude: number,
        longitude: number
    }
    wasteVolume: number,
    onChange?: () => void
}

export const PickupPoint = ({ id, address, coords, wasteVolume }: Props) => {
    const navigate = useNavigate();
    const { user } = clientModel;



    return (
        <div className="flex flex-row items-center">
            <div className="mr-3">
                <Icon systemName="circle" width={22} height={22} />
            </div>
            <div className="flex flex-col mr-5 gap-1 w-full">
                <Link to={`order/create?adress=${address}&latitude=${coords.latitude}&longitude=${coords.longitude}`} className="text-[16px] font-semibold">{address}</Link>
                <span className="text-[14px]">{coords.latitude}, {coords.longitude}</span>
            </div>
            <div>
                <Button onClick={() => { navigate('/pickup/edit'); editPointModel.init({ address: address, latitude: coords.latitude, longitude: coords.longitude, userId: user?.id || 0, wasteVolume: wasteVolume, id: id }) }} disabled={false} children="Изменить" class="bg-[#EEF2FF] !text-[#2953E8] !text-[16px] !font-bold rounded-2xl p-[10px]" />
            </div>
        </div>
    )
}