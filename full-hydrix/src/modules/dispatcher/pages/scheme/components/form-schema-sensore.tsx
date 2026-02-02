import { Icon } from "@/packages/shared-ui/icon"
import { useEffect, useState } from 'react';
import { observer } from "mobx-react-lite";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Selector } from "@/packages/shared-ui/Selector/selector";
import { Button } from "@/packages/shared-ui/button/button";
import { schemeModel } from "../model/scheme-model";
import Loader from "@/packages/shared-ui/loader/loader";
import { schemeSensoreModel } from "../model/scheme-sensore-model";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { SelectorSearch } from "@/packages/shared-ui/Selector/selector-search";



export const FormSchemaSensore = observer(({ className, onClick, id }: { className: string, onClick: (id: number) => void, id: number }) => {
    const { init, isLoading, model, update, deleteSensore, setTop, setLeft } = schemeSensoreModel

    useEffect(() => {
        init(id)
    }, [])

    return (
        <div className={`info-comp ${className}`}>

            {isLoading ?
                <div className="h-full flex items-center justify-center">
                    <Loader />
                </div>
                :
                <div className="info-comp__body">
                    <button className="info-comp__close" onClick={() => onClick(0)}>
                        <Icon systemName="arrow-back-blue" />
                        <span>назад</span>
                    </button>

                    <div className="my-10 flex flex-col  gap-x-[20px] gap-y-[10px]">
                        <p className="w-full font-bold mb-5">Данные датчика</p>

                        <div className="flex items-center justify-between w-full border-b border-gray-500 font-semibold pb-2 mb-2 text-sm">
                            <p>Название</p>
                            <p>{model.nodeName}</p>
                        </div>

                        <div className="flex items-center justify-between w-full border-b border-gray-500 font-semibold pb-2 mb-5 text-sm">
                            <p>Ед. измерения</p>
                            <p>{model.measurementName}</p>
                        </div>

                        <div className="flex items-center gap-[20px]">
                            <InputContainer
                                classNames={{
                                    wrapper: "w-[calc(50%_-_10px)]"
                                }}
                                children={
                                    <div className="border-[1.5px] pr-3 rounded-lg flex items-center">
                                        <p className="border-r px-3 py-3 mr-3">Top</p>
                                        <Input
                                            className=""
                                            type="number"
                                            placeholder="Top"
                                            value={model.top}
                                            onChange={setTop}
                                        />
                                    </div>
                                }
                            />

                            <InputContainer
                                classNames={{
                                    wrapper: "w-[calc(50%_-_10px)]"
                                }}
                                children={
                                    <div className="border-[1.5px] pr-3 rounded-lg flex items-center">
                                        <p className="border-r px-3 py-3 mr-3">Left</p>
                                        <Input
                                            className=""
                                            type="number"
                                            placeholder="Left"
                                            value={model.left}
                                            onChange={setLeft}
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <Button class="mt-10 rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={update}>Сохранить</Button>
                        <Button class="mt-10 rounded-lg px-10 bg-red-500 text-white hover:opacity-50" onClick={deleteSensore}>Удалить</Button>
                    </div>
                </div>
            }
        </div >
    )
})