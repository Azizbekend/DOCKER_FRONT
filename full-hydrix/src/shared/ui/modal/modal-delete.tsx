
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { observer } from "mobx-react-lite";
import { ModalDeleteProps } from "./setting/type";
import { MouseEvent, useCallback, useEffect } from "react";
import PortalModal from "./portal";

export const ModalDelete = observer((props: ModalDeleteProps) => {
    const handleClose = useCallback(() => {
        props.setShow(false)
    }, [props.setShow])

    const handleKeyPress = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") handleClose()
        }, [handleClose])

    useEffect(() => {
        if (!props.show) return undefined
        document.addEventListener("keydown", handleKeyPress)
        return () => {
            document.removeEventListener("keydown", handleKeyPress)
        }
    }, [handleKeyPress, props.show])

    if (!props.show) return null

    const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }


    return (
        <PortalModal wrapperId={props.wrapperId}>
            <div className={`fixed inset-0 z-[60] bg-[#192038]/40 backdrop-blur-[1px] flex items-center justify-center ${props.classNames?.overlay}`} onClick={stopPropagation}>
                <div className={`hidrex-modal-fade-in py-[16px] z-30 fixed border-1 rounded-lg bg-white border-[#eff4fa] ${props.classNames?.container}`}>
                    <div className={`pb-[17px] items-center flex justify-between px-[20px] border-b-[1px] ${props.classNames?.header}`}>
                        <p className="mb-text-2xl font-semibold leading-none">Сообщение</p>
                        <Button onClick={handleClose} class='py-0 hover:opacity-50 duration-300' children={<Icon systemName="close" />} />
                    </div>

                    {props.children ? props.children : <p className={`px-[20px] py-[32px] w-[480px] text-[17px] leading-none text-[#222b45] ${props.classNames?.text}`}>{props.text}</p>}

                    <div className={`flex w-[100%] justify-end items-center pt-[22px] px-[20px] border-t-[1px] ${props.classNames?.footer}`}>
                        <Button onClick={() => { props.onClickDelete(); handleClose(); }} class="bg-[var(--clr-error)] px-[34px] py-[5px] text-white hover:opacity-50 duration-300" children="Удалить" />
                        <Button onClick={handleClose} class="text-[#8F9BB3] px-[24px] py-[5px] ml-3 border border-[#8F9BB3] hover:bg-[#8F9BB3] hover:text-white duration-300" children="Отмена" />
                    </div>
                </div>
            </div>
        </PortalModal>
    )
})