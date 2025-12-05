import { observer } from "mobx-react-lite";
import { Button } from "@/shared/ui/button";
import { Icon } from "@/shared/ui/icon";
import { InputContainer } from "@/shared/ui/Inputs/input-container";
import { Selector } from "@/shared/ui/Selector/selector";
import { useService } from "../service/hook";
import { ChangeEvent, useState } from "react";
import { equipmentCreateModel } from "../../model/equipment-create-model";

export const Scheme = observer(() => {


    const { createScheme, top, left, hieght, width, preview, saveIMageScheme, setTop, setLeft, setHieght, setWidth, setSaveIMage, } = equipmentCreateModel

    const handleSubmit = () => {
        if (saveIMageScheme) {
            createScheme({
                top: Number(top),
                left: Number(left),
                hieght: Number(hieght),
                width: Number(width),
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

                    <label className="w-[460px] h-[242px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                        <input className="hidden" type="file" onChange={(e) => setSaveIMage(e)} />
                        {
                            preview ?
                                <img src={preview} className="w-full h-full object-cover" />
                                :
                                <>
                                    <Icon systemName="file-plus-blue" />
                                    <span className="text-[var(--clr-accent)] font-semibold">Загрузить фото</span>
                                </>
                        }
                    </label>

                    <div className="grid grid-cols-[1fr_1fr] gap-5 ">
                        <InputContainer
                            headerText="top"
                            classNames={{ wrapper: "w-[200px]" }}
                            children={
                                <input
                                    className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                    type="number"
                                    placeholder="top"
                                    value={top}
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
                                    value={left}
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
                                    value={hieght}
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
                                    value={width}
                                    onChange={(e) => setWidth(e.target.value)}
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