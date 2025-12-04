
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { observer } from "mobx-react-lite";


interface Props {
    onClose: () => void,
    onClickDelete: () => void,
    text: string
}


export const DeleteModal = observer(({ onClose, onClickDelete }: { onClose: () => void, onClickDelete: () => void }) => {
    return (
        <>
            <div className="fixed top-0 left-0 h-full w-full z-20 opacity-[40%] bg-[#192038]">
            </div>
            <div className="py-[16px] z-30 px-[20px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-1 rounded-lg border-[#eff4fa] ">
                <div className="pb-[17px] items-center flex justify-between border-b-[1px]">
                    <p className="mb-text-2xl font-semibold leading-none">Сообщение</p>
                    <Button onClick={onClose} class='py-0' children={<Icon systemName="close" />} />
                </div>
                <p className="mb-[22px] py-[32px] border-b-[1px] w-[480px] text-[17px] leading-none text-[#222b45]">Вы действительно хотите удалить этот водоканал?</p>
                <div className="flex w-[100%] justify-end items-center">
                    <Button onClick={() => { onClickDelete(); onClose(); }} class="bg-[#4a85f6] px-[34px] py-[5px]" children="Удалить" />
                    <Button onClick={onClose} class="!text-[#8f9bb3] px-[24px] py-[5px]" children="Отмена" />
                </div>
            </div>
        </>
    );
})