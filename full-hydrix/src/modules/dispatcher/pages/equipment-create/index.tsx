import { Icon } from "@/shared/ui/icon"
import { InputContainer } from "@/shared/ui/Inputs/input-container"
import { Input } from "@/shared/ui/Inputs/input-text"
import { equipmentCreateModel } from "./model/equipment-create-model"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { Button } from "@/shared/ui/button"
import { useState } from "react"
import { Review } from "./components/tabs/review"
import { Control } from "./components/tabs/control"
import { Service } from "./components/tabs/service"



export const EquipmentCreate = observer(() => {

    const navigate = useNavigate();
    const { model, imgPreview, setName, setImg, setCategory, setModel, setSupplier, setManufacturer, setPosition, create } = equipmentCreateModel

    const [tab, setTab] = useState<"review" | "control" | "service">("review")

    return (
        <div className="bg-white rounded-[20px] p-[45px_30px_50px_40px] mb-5 relative">
            <div>
                <div className="font-bold text-[34px] mb-[32px]">
                    Добавление оборудования
                </div>
                <div className="flex gap-[60px]">
                    <label className="w-[460px] h-[242px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                        <input className="hidden" type="file" onChange={(e) => setImg(e)} />
                        {
                            imgPreview ?
                                <img src={imgPreview} className="w-full h-full object-cover" />
                                :
                                <>
                                    <Icon systemName="file-plus-blue" />
                                    <span className="text-[var(--clr-accent)] font-semibold">Загрузить фото</span>
                                </>
                        }
                    </label>

                    <div>
                        <div className="font-semibold text-[28px] mb-[32px]">
                            Общая информация
                        </div>

                        <div className="flex flex-wrap  gap-x-[20px] gap-y-[10px]">
                            <InputContainer
                                headerText="Название оборудования"
                                classNames={{
                                    wrapper: "w-[calc(50%_-_20px)]"
                                }}
                                children={
                                    <Input
                                        className="border-[1.5px] px-3 py-3 rounded-lg"
                                        type="text"
                                        placeholder="Название оборудования"
                                        value={model.name}
                                        onChange={setName}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="Модель"
                                classNames={{
                                    wrapper: "w-[calc(50%_-_20px)]"
                                }}
                                children={
                                    <Input
                                        className="border-[1.5px] px-3 py-3 rounded-lg"
                                        type="text"
                                        placeholder="Модель"
                                        value={model.model}
                                        onChange={setModel}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="Категория"
                                classNames={{
                                    wrapper: "w-[calc(50%_-_20px)]"
                                }}
                                children={
                                    <Input
                                        className="border-[1.5px] px-3 py-3 rounded-lg"
                                        type="text"
                                        placeholder="Категория"
                                        value={model.category}
                                        onChange={setCategory}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="Поставщик"
                                classNames={{
                                    wrapper: "w-[calc(50%_-_20px)]"
                                }}
                                children={
                                    <Input
                                        className="border-[1.5px] px-3 py-3 rounded-lg"
                                        type="text"
                                        placeholder="Поставщик"
                                        value={model.supplier}
                                        onChange={setSupplier}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="Производитель"
                                classNames={{
                                    wrapper: "w-[calc(50%_-_20px)]"
                                }}
                                children={
                                    <Input
                                        className="border-[1.5px] px-3 py-3 rounded-lg"
                                        type="text"
                                        placeholder="Производитель"
                                        value={model.manufacturer}
                                        onChange={setManufacturer}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="Расположение"
                                classNames={{
                                    wrapper: "w-[calc(50%_-_20px)]"
                                }}
                                children={
                                    <Input
                                        className="border-[1.5px] px-3 py-3 rounded-lg"
                                        type="text"
                                        placeholder="Расположение"
                                        value={model.position}
                                        onChange={setPosition}
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-5 justify-end">
                    <Button class="rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={create}>Сохранить</Button>
                    <Button class="rounded-lg px-10 border border-[var(--clr-accent)] text-[var(--clr-accent)] hover:opacity-50" onClick={() => navigate("/dispatcher/equipment")}>Отменить</Button>
                </div>

                {model.id != null && <>

                    <div className="flex mt-20 ">
                        <div onClick={() => setTab("review")} className={`cursor-pointer !rounded-none w-[50%] rounded pb-2 border-b text-center ${tab == "review" ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[#757575] text-[#757575]"}`}>
                            Обзор
                        </div>
                        <div onClick={() => setTab("control")} className={`cursor-pointer !rounded-none w-[50%] rounded pb-2 border-b text-center ${tab == "control" ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[#757575] text-[#757575]"}`}>
                            Управления
                        </div>
                        {/* <div onClick={() => setTab("service")} className={`cursor-pointer !rounded-none w-[33%] rounded pb-2 border-b text-center ${tab == "service" ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[#757575] text-[#757575]"}`}>
                            Сервис
                        </div> */}
                    </div>

                    <div className="mt-10">
                        {tab == "review" && <Review />}
                        {tab == "control" && <Control />}
                        {/* {tab == "service" && <Service />} */}
                    </div>
                </>}
            </div>
        </div>
    )
})