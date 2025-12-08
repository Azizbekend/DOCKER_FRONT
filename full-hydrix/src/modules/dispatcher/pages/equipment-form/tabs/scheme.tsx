import { observer } from "mobx-react-lite";
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Selector } from "@/shared/ui/Selector/selector";
import { useService } from "../components/service/hook";
import { ChangeEvent, useState } from "react";
import { equipmentCreateModel } from "../model/equipment-form-model";

export const Scheme = observer(() => {


    const { createScheme, schemaModel, preview, saveIMageScheme, setHardwareSchemaId, setTop, setLeft, setHieght, setWidth, setSaveIMage, } = equipmentCreateModel

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
                <div className="flex gap-3 items-center animate-fade-in">

                    <label className="w-[460px] h-[460px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
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

                    <div className="flex gap-[20px] max-w-[450px] flex-wrap ">
                        <InputContainer
                            headerText="top"
                            classNames={{ wrapper: "w-[200px]" }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="number"
                                    placeholder="top"
                                    value={schemaModel.top}
                                    onChange={(e) => setTop(e.target.value)}
                                />
                            }
                        />
                        <InputContainer
                            headerText="left"
                            classNames={{ wrapper: "w-[200px]" }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="number"
                                    placeholder="left"
                                    value={schemaModel.left}
                                    onChange={(e) => setLeft(e.target.value)}
                                />
                            }
                        />
                        <InputContainer
                            headerText="hieght"
                            classNames={{ wrapper: "w-[200px]" }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="number"
                                    placeholder="top"
                                    value={schemaModel.hieght}
                                    onChange={(e) => setHieght(e.target.value)}
                                />
                            }
                        />
                        <InputContainer
                            headerText="width"
                            classNames={{ wrapper: "w-[200px]" }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="number"
                                    placeholder="top"
                                    value={schemaModel.width}
                                    onChange={(e) => setWidth(e.target.value)}
                                />
                            }
                        />
                        <InputContainer
                            headerText="ПЛК"
                            classNames={{ wrapper: "w-[420px]" }}
                            children={
                                <Selector
                                    titleClass="border !w-full flex justify-between flex p-2 rounded-lg py-3 "
                                    classWripper="!w-full"
                                    title="ПЛК"
                                    onSelect={(item) => setHardwareSchemaId(Number(item.value))}
                                    items={[
                                        {
                                            value: 6,
                                            title: "Технологическое оборудование"
                                        },
                                    ]}
                                />
                            }
                        />
                    </div>

                </div>
            </div>

            <Button class="mt-10 rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={handleSubmit}>Сохранить</Button>
        </>
    )
});