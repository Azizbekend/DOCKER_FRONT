import { Tab, TabList, TabPanel, Tabs } from "react-tabs"
import { Requisites } from "./tabs/requisites"
import { Contract } from "./tabs/contract"
import { Profile } from "./tabs/profile"
import { MunicipalityPanel } from "./tabs/municipality"

import { Icon } from "@/app/cores/core-trieco/UIKit/icon"
import { observer } from "mobx-react-lite"
import { useState } from "react"

export const SettingsView = observer(() => {
    const [selectedIndex, setIndex] = useState(0)
    return (
        <div className="mt-8 h-[90%] flex ">
            <div className="flex flex-col bg-white py-7 px-10 rounded-md w-full h-full">
                <div className="flex flex-col gap-6 mb-6">
                    <span className="text-[34px] font-semibold text-[#222B45]">Настройки</span>
                </div>
                <Tabs className={"h-full flex flex-col w-full"} onSelect={(index) => setIndex(index)}>
                    <TabList className={"flex flex-row mb-8"}>
                        <Tab selectedClassName="!text-[#4A85F6] font-semibold !border-[#4A85F6] border-b-2" className={"px-3 py-2 text-[#616161] outline-none cursor-pointer flex flex-row gap-4 items-center justify-center border-b-2 border-[#D9D9D9] pb-4"}>
                            <Icon systemName={`wallet${selectedIndex === 0 ? '-active' : ''}`} />
                            <span className="text-[16px]">Реквизиты</span>
                        </Tab>
                        <Tab selectedClassName="!text-[#4A85F6] font-semibold !border-[#4A85F6] border-b-2" className={"px-3 py-2 text-[#616161] outline-none cursor-pointer flex flex-row gap-4 items-center justify-center border-b-2 border-[#D9D9D9] pb-4"}>
                            <Icon systemName={`contract${selectedIndex === 1 ? '-active' : ''}`} />
                            <span className="text-[16px]">Договор</span>
                        </Tab>
                        <Tab selectedClassName="!text-[#4A85F6] font-semibold !border-[#4A85F6] border-b-2" className={"px-3 py-2 text-[#616161] outline-none cursor-pointer flex flex-row gap-4 items-center justify-center border-b-2 border-[#D9D9D9] pb-4"}>
                            <Icon systemName={`map-pin${selectedIndex === 2 ? '-active' : ''}`} />
                            <span className="text-[16px]">Районы</span>
                        </Tab>
                        <Tab selectedClassName="!text-[#4A85F6] font-semibold !border-[#4A85F6] border-b-2" className={"px-3 py-2 text-[#616161] outline-none cursor-pointer flex flex-row gap-4 items-center justify-center border-b-2 border-[#D9D9D9] pb-4"}>
                            <Icon systemName={`profile${selectedIndex === 3 ? '-active' : ''}`} />
                            <span className="text-[16px]">Профиль</span>
                        </Tab>

                    </TabList>
                    <TabPanel>
                        <Requisites />
                    </TabPanel>
                    <TabPanel selectedClassName={"h-full"}>
                        <Contract />
                    </TabPanel>
                    <TabPanel>
                        <MunicipalityPanel />
                    </TabPanel>
                    <TabPanel>
                        <Profile />
                    </TabPanel>

                </Tabs>
            </div>
        </div>
    )
})