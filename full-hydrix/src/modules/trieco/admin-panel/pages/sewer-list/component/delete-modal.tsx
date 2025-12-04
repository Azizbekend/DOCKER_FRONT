import { Button } from "@/app/cores/core-trieco/UIKit";
import { Icon } from "@/app/cores/core-trieco/UIKit/icon";
import { observer } from "mobx-react-lite";

export const DeleteModal = observer(({ sewer, onClose, onClickDelete }: { sewer: any, onClose: () => void, onClickDelete: (sewer: any) => void }) => {
    return (
        <>
            <div className="fixed top-0 left-0 h-full w-full bg-[#192038] opacity-[70%] z-20"></div>

            <div className="py-[16px] px-[20px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border-1 rounded-lg border-[#eff4fa] z-20">
                <div className="pb-[17px] items-center flex justify-between border-b-[1px]">
                    <p className="mb-text-2xl font-semibold leading-none">Сообщение</p>
                    <Button onClick={onClose} class='py-0' children={<Icon systemName="close" />} />
                </div>
                <p className="mb-[22px] py-[32px] border-b-[1px] w-[480px] text-[17px] leading-none text-[#222b45]">
                    Вы действительно хотите удалить ассенизатора {sewer?.name}?
                </p>
                <div className="flex w-[100%] justify-end items-center">
                    <Button onClick={() => { onClickDelete(sewer); onClose(); }} class="bg-[#4a85f6] px-[34px] py-[5px]" children="Да" />
                    <Button onClick={onClose} class="!text-[#8f9bb3] px-[24px] py-[5px]" children="Отмена" />
                </div>
            </div>
        </>
    );
});
