import { Button } from "@/app/cores/core-trieco/UIKit"
import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { useNavigate } from "react-router-dom"
import editPointModel from "../../viewports/edit-point/model/edit-point-model"
import mobileModel from "../../kernel/model/mobile-model"

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
    const { user } = mobileModel;
    return (
        <div className="flex flex-row items-center">
            <div className="mr-3">
                <Icon systemName="circle" width={22} height={22} />
            </div>
            <div className="flex flex-col mr-5 gap-1 w-full">
                <span className="text-[16px] font-semibold">{address}</span>
                <span className="text-[14px]">{coords.latitude}, {coords.longitude}</span>
            </div>
            <div>
                <Button onClick={() => { navigate('/pickup/edit'); editPointModel.init({ address: address, latitude: coords.latitude, longitude: coords.longitude, userId: user?.id || 0, wasteVolume: wasteVolume, id: id }) }} disabled={false} children="Изменить" class="bg-[#EEF2FF] !text-[#2953E8] !text-[16px] !font-bold rounded-2xl p-[10px]" />
            </div>
        </div>
    )
}