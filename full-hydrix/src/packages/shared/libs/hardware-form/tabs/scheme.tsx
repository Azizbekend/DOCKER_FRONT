import { observer } from "mobx-react-lite";
import { Button } from "@/packages/shared-ui/button/button";
import { Icon } from "@/packages/shared-ui/icon";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Selector } from "@/packages/shared-ui/Selector/selector";
import { useService } from "../components/service/hook";
import { ChangeEvent, useState } from "react";
import { equipmentCreateModel } from "../model/hardware-form-model";

export const Scheme = observer(() => {


    const { createScheme, schemaModel, preview, previewRed, previewGreen, saveIMageScheme, setHardwareSchemaId,
        setTop, setLeft, setHieght, setWidth, setSaveIMage, setSaveIMageRed, setSaveIMageGreen, listSchemes } = equipmentCreateModel

    const handleSubmit = () => {
        if (saveIMageScheme) {
            createScheme({
                top: Number(schemaModel.top),
                left: Number(schemaModel.left),
                hieght: Number(schemaModel.hieght),
                width: Number(schemaModel.width),
                saveIMage: saveIMageScheme,
            })
        }
    }

    return (
        <>
            <div className="font-semibold text-[28px] mb-[12px]">
                Данные для схемы
            </div>

            <div className="my-10 flex flex-col gap-5">
                <div className="flex gap-3 w-full">
                    <div>
                        <label className="w-[350px] h-[350px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                            <input className="hidden" type="file" onChange={(e) => setSaveIMage(e)} />
                            {
                                preview ?
                                    <img src={preview} className="max-w-full max-h-full object-container" />
                                    :
                                    <>
                                        <Icon systemName="file-plus-blue" />
                                        <span className="text-[var(--clr-accent)] font-semibold">Загрузить фото</span>
                                    </>
                            }
                        </label>

                        <p className="font-semibold text-[16px] text-center mt-2">Обычное состояние</p>
                    </div>

                    <div>
                        <label className="w-[350px] h-[350px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                            <input className="hidden" type="file" onChange={(e) => setSaveIMageRed(e)} />
                            {
                                previewRed ?
                                    <img src={previewRed} className="max-w-full max-h-full object-container" />
                                    :
                                    <>
                                        <Icon systemName="file-plus-blue" />
                                        <span className="text-[var(--clr-accent)] font-semibold">Загрузить фото</span>
                                    </>
                            }
                        </label>
                        <p className="font-semibold text-[16px] text-center mt-2">Состояние аварии</p>
                    </div>


                    <div>
                        <label className="w-[350px] h-[350px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                            <input className="hidden" type="file" onChange={(e) => setSaveIMageGreen(e)} />
                            {
                                previewGreen ?
                                    <img src={previewGreen} className="max-w-full max-h-full object-container" />
                                    :
                                    <>
                                        <Icon systemName="file-plus-blue" />
                                        <span className="text-[var(--clr-accent)] font-semibold">Загрузить фото</span>
                                    </>
                            }
                        </label>

                        <p className="font-semibold text-[16px] text-center mt-2">Состояние рабочее </p>
                    </div>
                    <div className="flex items-end gap-[20px] max-w-[940px] flex-wrap content-end ml-4 mb-[28px]">
                        <InputContainer
                            classNames={{ wrapper: "w-[45%]" }}
                            children={
                                <div className="flex border-[1.5px] overflow-hidden rounded-lg w-full">
                                    <div className="px-3 py-3 border-r mr-4 w-[80px]">top</div>
                                    <input
                                        className=" w-full outline-none"
                                        type="number"
                                        placeholder="top"
                                        value={schemaModel.top}
                                        onChange={(e) => setTop(e.target.value)}
                                    />
                                </div>
                            }
                        />
                        <InputContainer
                            classNames={{ wrapper: "w-[45%]" }}
                            children={
                                <div className="flex border-[1.5px] overflow-hidden rounded-lg w-full">
                                    <div className="px-3 py-3 border-r mr-4 w-[80px]">left</div>
                                    <input
                                        className=" w-full outline-none"
                                        type="number"
                                        placeholder="left"
                                        value={schemaModel.left}
                                        onChange={(e) => setLeft(e.target.value)}
                                    />
                                </div>
                            }
                        />
                        <InputContainer
                            classNames={{ wrapper: "w-[45%]" }}
                            children={
                                <div className="flex border-[1.5px] overflow-hidden rounded-lg w-full">
                                    <div className="px-3 py-3 border-r mr-4 w-[80px]">hieght</div>
                                    <input
                                        className=" w-full outline-none"
                                        type="number"
                                        placeholder="top"
                                        value={schemaModel.hieght}
                                        onChange={(e) => setHieght(e.target.value)}
                                    />
                                </div>
                            }
                        />
                        <InputContainer
                            classNames={{ wrapper: "w-[45%]" }}
                            children={
                                <div className="flex border-[1.5px] overflow-hidden rounded-lg w-full">
                                    <div className="px-3 py-3 border-r mr-4 w-[80px]">width</div>
                                    <input
                                        className=" w-full outline-none"
                                        type="number"
                                        placeholder="top"
                                        value={schemaModel.width}
                                        onChange={(e) => setWidth(e.target.value)}
                                    />
                                </div>
                            }
                        />
                        <InputContainer
                            classNames={{ wrapper: "w-[calc(90%+20px)]" }}
                            children={
                                <Selector
                                    titleClass="border !w-full flex justify-between flex p-2 rounded-lg py-3 "
                                    classWripper="!w-full"
                                    title="ПЛК"
                                    onSelect={(item) => setHardwareSchemaId(Number(item.value))}
                                    items={listSchemes}
                                />
                            }
                        />
                    </div>
                </div>
            </div>

            <Button class="mt-10 rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50 py-2" onClick={handleSubmit}>Сохранить</Button>
        </>
    )
});