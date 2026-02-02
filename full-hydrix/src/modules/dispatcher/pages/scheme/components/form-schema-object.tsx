import { Icon } from "@/packages/shared-ui/icon"
import { useEffect } from 'react';
import { observer } from "mobx-react-lite";
import { schemeObjectModel } from "../model/scheme-object-model";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Selector } from "@/packages/shared-ui/Selector/selector";
import { Button } from "@/packages/shared-ui/button/button";
import { schemeModel } from "../model/scheme-model";
import Loader from "@/packages/shared-ui/loader/loader";



export const FormSchemaObject = observer(({ className, onClick }: { className: string, onClick: (id: number) => void }) => {
    const { init, updateScheme, index, preview, deleteSchemeObject, setTop, setLeft, setHardwareSchemaId, setHeight, setWidth, setSaveIMage, isLoading } = schemeObjectModel

    useEffect(() => {
        init()
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

                    <div className="my-10 flex flex-col gap-5">
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <p className="text-sm text-center mb-2">Обычное</p>
                                <label className="h-[160px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                                    <input className="hidden" type="file" onChange={(e) => setSaveIMage(e, "default")} />
                                    <img src={preview.default ? preview.default : "https://triapi.ru/research/api/FileStorage/images/download?id=" + schemeModel.focusSchemeObjectData?.fileId} className="max-w-[90%] max-h-[150px] object-container" />
                                </label>
                            </div>

                            <div>
                                <p className="text-sm text-center mb-2">Аварии</p>
                                <label className="h-[160px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                                    <input className="hidden" type="file" onChange={(e) => setSaveIMage(e, "red")} />
                                    <img src={preview.red ? preview.red : "https://triapi.ru/research/api/FileStorage/images/download?id=" + schemeModel.focusSchemeObjectData?.redFileId} className="max-w-[90%] max-h-[150px] object-container" />
                                </label>
                            </div>

                            <div>
                                <p className="text-sm text-center mb-2">Рабочее</p>
                                <label className="h-[160px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                                    <input className="hidden" type="file" onChange={(e) => setSaveIMage(e, "green")} />
                                    <img src={preview.green ? preview.green : "https://triapi.ru/research/api/FileStorage/images/download?id=" + schemeModel.focusSchemeObjectData?.greenFileId} className="max-w-[90%] max-h-[150px] object-container" />
                                </label>
                            </div>

                        </div>

                        <div className="flex gap-[20px] max-w-[450px] flex-wrap ">
                            <InputContainer
                                headerText="top"
                                classNames={{ wrapper: "w-[calc(50%-10px)]" }}
                                children={
                                    <input
                                        className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                        type="number"
                                        placeholder="top"
                                        value={schemeModel.model[index].top}
                                        onChange={(e) => setTop(e.target.value)}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="left"
                                classNames={{ wrapper: "w-[calc(50%-10px)]" }}
                                children={
                                    <input
                                        className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                        type="number"
                                        placeholder="left"
                                        value={schemeModel.model[index].left}
                                        onChange={(e) => setLeft(e.target.value)}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="hieght"
                                classNames={{ wrapper: "w-[calc(50%-10px)]" }}
                                children={
                                    <input
                                        className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                        type="number"
                                        placeholder="top"
                                        value={schemeModel.model[index].height}
                                        onChange={(e) => setHeight(e.target.value)}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="width"
                                classNames={{ wrapper: "w-[calc(50%-10px)]" }}
                                children={
                                    <input
                                        className="border-[1.5px] px-3 py-3 rounded-lg w-full outline-none focus:border-[var(--clr-accent)] transition-colors duration-200"
                                        type="number"
                                        placeholder="top"
                                        value={schemeModel.model[index].width}
                                        onChange={(e) => setWidth(e.target.value)}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="Схема"
                                classNames={{ wrapper: "w-[420px]" }}
                                children={
                                    <Selector
                                        titleClass="border !w-full flex justify-between flex p-2 rounded-lg py-3 "
                                        classWripper="!w-full"
                                        title="Схема"
                                        defaultValue={schemeModel.model[index].hardwareSchemaId}
                                        onSelect={(item) => setHardwareSchemaId(Number(item.value))}
                                        items={[
                                            {
                                                value: 6,
                                                title: "Механическая очистка"
                                            },
                                            {
                                                value: 8,
                                                title: "Биологическая очистка"
                                            },
                                            {
                                                value: 9,
                                                title: "Доочистка"
                                            },
                                        ]}
                                    />
                                }
                            />

                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Button class="mt-10 rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={updateScheme}>Сохранить</Button>
                        <Button class="mt-10 rounded-lg px-10 bg-red-500 text-white hover:opacity-50" onClick={deleteSchemeObject}>Удалить</Button>
                    </div>
                </div>
            }
        </div >
    )
})