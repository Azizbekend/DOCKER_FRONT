import { Plant } from "@/entities/plants/types";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MoreBtn } from "./components/more-btns";
import Tooltip from "@/shared/ui/tooltip";
import { plantsListModel } from "../model/drain-stations-model";


interface Props {
    title: string,
    plant: Plant,
}
export const Station = observer(({ plant, title }: Props) => {
    const { setShowModalInfo, setTypeModal, setShowPlantDelete, setSelectPlantForDelete } = plantsListModel;
    const [copied, setCopied] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(plant.latitude + "" + plant.longitude)
            .then(() => {
                setCopied(true);
            })
            .catch(err => console.error("Не удалось скопировать: ", err));
    };

    const changeEdit = () => {
        setShowModalInfo(true)
        setTypeModal("edit")
        setIsMenuOpen(false);
    }

    const changeDelete = () => {
        setSelectPlantForDelete(plant.id);
        setShowPlantDelete(true);
        setIsMenuOpen(false);
    }


    return (
        <>
            <div>



                <div className="flex mt-[29px] justify-between items-center">
                    <p className="text-[15px] leading-normal">{title}</p>
                    <div className="">
                        {plant && (
                            <MoreBtn
                                isMenuOpen={isMenuOpen}
                                setIsMenuOpen={setIsMenuOpen}
                                setShowEditSidebar={changeEdit}
                                setShowDeleteModal={changeDelete}
                            />
                        )}
                    </div>
                </div>
                <p className="mt-[11px] text-[17px] font-semibold leading-normal">{plant.name}</p>
                <div className="flex gap-[208px] mt-[20px]">
                    <h2 className="text-[13px] font-semibold leading-none">Адрес</h2>
                    <div className="flex flex-col">
                        <p className='text-xs leading-[15px] max-w-[356px]'>{plant.adress}</p>
                        <div className="flex gap-[6px]">
                            <p className="max-w-[316px] text-xs leading-[15px]">{plant.latitude + ", " + plant.longitude}</p>
                            <div id="tooltip" className="group-hover:visible relative flex justify-center items-center cursor-pointer whitespace-nowrap">
                                <Tooltip text={copied ? "Координаты скопированы" : "Скопировать координаты"} onCopy={handleCopy} onMouseLeave={() => setCopied(false)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-[76px] mt-[20px]">
                    <h2 className="text-[13px] font-semibold leading-none">Суточный лимит станции</h2>
                    <p className='text-xs leading-[15px] max-w-[316px]'>{plant.dailyLimit}м³</p>
                </div>
                {plant.municipalities && <div className="flex gap-[58px] mt-[22px]">
                    <h2 className="text-[13px] font-semibold leading-none">Обслуживаемая территория</h2>
                    <p className='text-xs leading-[15px] max-w-[316px]'>{plant.municipalities.map(m => m.name).join(", ") || ""}</p>
                </div>}
            </div>
        </>
    )
})