import { MainItem } from "./components/main-item"

export const MainView = () => {
    return (
        <div className="flex flex-wrap gap-x-8 gap-y-6 mt-7 ml-8">
            <MainItem title="ВЫЗОВ ЖБО"/>
            <MainItem title={`ТЕХНИЧЕСКИЕ\nУСЛОВИЯ`}/>
            <MainItem title="СЕРВИСЫ"/>
            <MainItem title="ZuluGIS"/>
            <MainItem title="ARM - оператор"/>
        </div>
    )
}