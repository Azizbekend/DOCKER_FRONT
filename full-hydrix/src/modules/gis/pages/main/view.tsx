import { MainLayout } from "../../components/main-layout"
import { MainItem } from "./components/main-item"

export const MainView = () => {
    return (
        <MainLayout>
            <div className="max-w-[640px] rounded-xl w-auto flex flex-col bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.25)] p-10">
                <div className="flex flex-col mb-8">
                    <span className="text-[#252627] text-[30px]">Приветствуем в</span>
                    <span className="text-[#252627] text-[38px] font-extrabold">АИС «Управление ЖКХ»</span>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-6">
                    <MainItem title="ВЫЗОВ ЖБО" />
                    <MainItem title={`ТЕХНИЧЕСКИЕ\nУСЛОВИЯ`} />
                    <MainItem title="СЕРВИСЫ" />
                    <MainItem title="ZuluGIS" />
                    <MainItem title="ARM - оператор" />
                </div>

            </div>
        </MainLayout>
    )
}