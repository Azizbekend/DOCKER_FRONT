import { Icon } from "@/packages/shared-ui/icon"
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container"
import { Input } from "@/packages/shared-ui/Inputs/input-text"
import { equipmentCreateModel } from "./model/hardware-form-model"
import { observer } from "mobx-react-lite"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/packages/shared-ui/button/button"
import { useEffect, useState } from "react"
import { Review } from "./tabs/review"
import { Control } from "./tabs/control"
import { Scheme } from "./tabs/scheme"
import { Selector } from "@/packages/shared-ui/Selector/selector"
import Loader from "@/packages/shared-ui/loader/loader"
import { Documents } from "./tabs/documents"


export const HardwareCreate = observer(({ toBack }: { toBack: string }) => {

    const navigate = useNavigate();
    const { id } = useParams();

    const { init, clear, model, updateInfo, imgPreview, isLoading, deleteHardware, setName, setImg, setCategory, setModel, setSupplier, setManufacturer, setPosition, create, setOpcName, setIdBlockController } = equipmentCreateModel
    const [tab, setTab] = useState<"review" | "control" | "scheme" | "docs">("review")

    useEffect(() => {
        clear();
        if (id != null || id != undefined) {
            init(Number(id));
        }
    }, [])

    const handleDelete = () => {
        deleteHardware({
            id: Number(id),
            navigate: () => navigate(-1)
        });
    }

    const handleSubmit = () => {
        console.log('asd')
        if (id) {
            updateInfo();
        } else {
            create();
        }
    }

    return isLoading ? <Loader fullscreen size={64} color="#222" /> : (
        <div className="bg-white rounded-[20px] p-[45px_30px_50px_40px] mb-5 relative">
            <div>
                <div className="mb-[32px] flex items-center gap-[28px]">
                    <Link to={toBack} className='bg-[var(--clr-accent)] rounded px-3 py-2 hover:opacity-50 cursor-pointer duration-300'>
                        <Icon systemName="arrow-left" />
                    </Link>
                    <span className="font-bold text-[34px] mb-2">{id ? "Редактирование оборудования" : "Добавление оборудования"}</span>
                </div>
                <div className="flex gap-[60px]">
                    <label className="w-[460px] h-[242px] rounded-lg bg-[#E6E9EF] gap-1 flex flex-col items-center justify-center hover:opacity-50 duration-300 cursor-pointer">
                        <input className="hidden" type="file" onChange={(e) => setImg(e)} />
                        {
                            imgPreview || id ?
                                <img src={imgPreview ? imgPreview : "https://triapi.ru/research/api/FileStorage/images/download?id=" + model.fileId} className="p-5 max-w-full max-h-full object-container" />
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
                                        value={model.supplierName}
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
                                        value={model.developerName}
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
                            <InputContainer
                                headerText="Наименованиe OPC"
                                classNames={{
                                    wrapper: "w-[calc(50%_-_20px)]"
                                }}
                                children={
                                    <Input
                                        className="border-[1.5px] px-3 py-3 rounded-lg"
                                        type="text"
                                        placeholder="Расположение"
                                        value={model.opcDescription}
                                        onChange={setOpcName}
                                    />
                                }
                            />
                            <InputContainer
                                headerText="Выбрать ПЛК (Шкаф)"
                                classNames={{
                                    wrapper: "w-[calc(50%_-_20px)]"
                                }}
                                children={
                                    <Selector
                                        titleClass="border !w-full flex justify-between flex p-2 rounded-lg py-3 "
                                        classWripper="!w-full"
                                        title="ПЛК"
                                        defaultValue={model.controlBlockId}
                                        onSelect={(item) => setIdBlockController(Number(item.value))}
                                        items={[
                                            {
                                                value: 5,
                                                title: "Наш ПЛК"
                                            },
                                            {
                                                value: 6,
                                                title: "ПЛК Технологики"
                                            },
                                        ]}
                                    />
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-5 justify-between items-end">
                    <div>
                        {id && <Button class="h-fit rounded-lg px-10 bg-red-500 text-white hover:opacity-50" onClick={handleDelete}>Удалить</Button>}
                    </div>

                    <div className="flex gap-4">
                        <Button class="h-fit rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={handleSubmit}>{id ? "Обновить" : "Сохранить"}</Button>
                        <Button class="h-fit rounded-lg px-10 border border-[var(--clr-accent)] text-[var(--clr-accent)] hover:opacity-50" onClick={() => navigate("/dispatcher/hardware")}>Отменить</Button>
                    </div>
                </div>

                {model.id != null && <>

                    <div className="flex mt-20 ">
                        <div onClick={() => setTab("review")} className={`cursor-pointer !rounded-none w-[50%] rounded pb-2 border-b text-center ${tab == "review" ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[#757575] text-[#757575]"}`}>
                            Обзор
                        </div>
                        <div onClick={() => setTab("control")} className={`cursor-pointer !rounded-none w-[50%] rounded pb-2 border-b text-center ${tab == "control" ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[#757575] text-[#757575]"}`}>
                            Управления
                        </div>
                        <div onClick={() => setTab("docs")} className={`cursor-pointer !rounded-none w-[50%] rounded pb-2 border-b text-center ${tab == "docs" ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[#757575] text-[#757575]"}`}>
                            Документы
                        </div>

                        <div onClick={() => setTab("scheme")} className={`cursor-pointer !rounded-none w-[33%] rounded pb-2 border-b text-center ${tab == "scheme" ? "border-[var(--clr-accent)] text-[var(--clr-accent)]" : "border-[#757575] text-[#757575]"}`}>
                            Схема
                        </div>

                    </div>

                    <div className="mt-10 pb-[100px] min-h-[50vh]">
                        {tab == "review" && <Review />}
                        {tab == "docs" && <Documents />}
                        {tab == "control" && <Control />}
                        {tab == "scheme" && <Scheme />}
                    </div>
                </>}
            </div>
        </div>
    )
})