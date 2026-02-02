import { Icon } from "@/packages/shared-ui/icon"
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container"
import { Input } from "@/packages/shared-ui/Inputs/input-text"
import { observer } from "mobx-react-lite"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from "@/packages/shared-ui/button/button"
import { useEffect } from "react"
import { Selector } from "@/packages/shared-ui/Selector/selector"
import Loader from "@/packages/shared-ui/loader/loader"
import { sensoreModel } from "./model/form-sensor"
import { SelectorSearch } from "@/packages/shared-ui/Selector/selector-search"


export const SensorForm = observer(() => {

    const navigate = useNavigate();
    const { id } = useParams();

    const { initFormData, setTop, setLeft, isLoading, isNodeLoading, listNodes, model, listHardwares, listSchemesTest, setNodeInfoId, setHardware, setSchemeId, create, schemaName, hardwareName, nodeName } = sensoreModel

    useEffect(() => {
        initFormData()
    }, [])

    return isLoading ? <Loader fullscreen size={64} color="#222" /> : (
        <div className="bg-white rounded-[20px] p-[45px_30px_50px_40px] mb-5 relative">
            <div className="mb-[32px] flex items-center gap-[28px]">
                <Link to={"/dispatcher/hardware"} className='bg-[var(--clr-accent)] rounded px-3 py-2 hover:opacity-50 cursor-pointer duration-300'>
                    <Icon systemName="arrow-left" />
                </Link>
                <span className="font-bold text-[34px] mb-2">Добавление датчика</span>
            </div>



            <div className="grid grid-cols-[50%_40%] justify-between">

                <div className="flex flex-wrap  gap-x-[20px] gap-y-[10px]">
                    <InputContainer
                        headerText="Top"
                        classNames={{
                            wrapper: "w-[calc(50%_-_20px)]"
                        }}
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Top"
                                value={model.top}
                                onChange={setTop}
                            />
                        }
                    />

                    <InputContainer
                        headerText="Left"
                        classNames={{
                            wrapper: "w-[calc(50%_-_20px)]"
                        }}
                        children={
                            <Input
                                className="border-[1.5px] px-3 py-3 rounded-lg"
                                type="text"
                                placeholder="Left"
                                value={model.left}
                                onChange={setLeft}
                            />
                        }
                    />

                    <InputContainer
                        headerText="Выбор схемы"
                        classNames={{
                            wrapper: "w-[calc(50%_-_20px)]"
                        }}
                        children={
                            <Selector
                                titleClass="border !w-full flex justify-between flex p-2 rounded-lg py-3 "
                                classWripper="!w-full"
                                title="Поиск"
                                defaultValue={model.schemeId}
                                onSelect={(item) => setSchemeId(item)}
                                items={listSchemesTest}
                            />
                        }
                    />

                    <InputContainer
                        headerText="Оборудование"
                        classNames={{
                            wrapper: "w-[calc(50%_-_20px)]"
                        }}
                        children={
                            <SelectorSearch
                                placeholder="Поиск"
                                titleClass="border !w-full flex justify-between flex p-2 rounded-lg py-3"
                                classWripper="!w-full"
                                onSelect={(item) => setHardware(item)}
                                items={listHardwares}
                            />
                        }
                    />

                    {!isNodeLoading &&
                        <InputContainer
                            headerText="Выбор ноды"
                            classNames={{
                                wrapper: "w-[calc(100%_-_20px)]"
                            }}
                            children={
                                <SelectorSearch
                                    placeholder="Поиск"
                                    titleClass="border !w-full flex justify-between flex p-2 rounded-lg py-3"
                                    classWripper="!w-full"
                                    onSelect={(item) => setNodeInfoId(item)}
                                    items={listNodes}
                                />
                            }
                        />
                    }

                </div>

                <div>
                    <div className={`info-comp__item border-b border-gray-300 pb-4 `}>
                        <div className="info-comp__title">Схема</div>
                        <div className="info-comp__description">{schemaName || "—"}</div>
                    </div>
                    <div className={`info-comp__item border-b border-gray-300 pb-4 `}>
                        <div className="info-comp__title">Оборудование</div>
                        <div className="info-comp__description">{hardwareName || "—"}</div>
                    </div>
                    <div className={`info-comp__item border-b border-gray-300 pb-4 `}>
                        <div className="info-comp__title">Нода</div>
                        <div className="info-comp__description">{nodeName || "—"}</div>
                    </div>

                </div>
            </div>
            <div className="flex gap-4 mt-5 justify-end items-end">
                <div className="flex gap-4">
                    <Button class="h-fit rounded-lg px-10 bg-[var(--clr-accent)] text-white hover:opacity-50" onClick={create}>Сохранить</Button>
                    <Button class="h-fit rounded-lg px-10 border border-[var(--clr-accent)] text-[var(--clr-accent)] hover:opacity-50" onClick={() => navigate("/dispatcher/hardware")}>Отменить</Button>
                </div>
            </div>
        </div>
    )
})