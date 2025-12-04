
import { observer } from "mobx-react-lite"
import statsModel from "../models/stats-model"
import { useEffect, useState } from "react"

type Props = {
    title: string,
    meaning: string | number,
    specChar?: string
}



export const InfoCards = observer(() => {
    const { municipalitiesResult, ordersResult, pageName } = statsModel
    const [infoCardData, setInfoCardData] = useState<Props[]>([])

    useEffect(() => {
        if (pageName === "municipalities") {
            setInfoCardData(
                [{
                    title: 'Всего количество заявок',
                    meaning: municipalitiesResult.totalCount,
                },
                {
                    title: 'Общий объем вывозимого ЖБО',
                    meaning: municipalitiesResult.recycleVolume,
                    specChar: 'м³'
                },
                {
                    title: 'Общий объем утилизированного ЖБО',
                    meaning: municipalitiesResult.extractVolume,
                    specChar: 'м³'
                },
                    // {
                    //     title: 'Общая стоимость вывозимого',
                    //     meaning: 'string',
                    //     specChar: '₽'
                    // },
                    // {
                    //     title: 'Общая стоимость утилизированного',
                    //     meaning: 'string',
                    //     specChar: '₽'
                    // }
                ]
            )
        }

        if (pageName === "orders") {
            setInfoCardData(
                [
                    {
                        title: 'Общее кол-во завершенных заявок',
                        meaning: ordersResult.countOrders,
                    },
                    {
                        title: 'Общий объем вывозимого ЖБО',
                        meaning: ordersResult.totalVolumeExported,
                        specChar: 'м³'
                    },
                    {
                        title: 'Общая стоимость вывозимого',
                        meaning: ordersResult.costExported,
                        specChar: '₽'
                    },
                    {
                        title: 'Общая стоимость утилизированного',
                        meaning: ordersResult.costDisposed,
                        specChar: '₽'
                    },
                ]
            )
        }
    }, [municipalitiesResult, ordersResult, pageName])

    return (
        <div className="w-full">
            <div className="w-fit overflow-auto flex items-stretch gap-[18px]">

                {infoCardData.map((prop, key) =>
                    <div className="bg-[#4A85F6] w-[247.54px] h-[128px] font-semibold rounded-[20px] max-w-[240px] text-white p-[23px_22px_35px_22px] flex flex-col justify-between" key={`${key}`}>
                        <h3 className="text-[15px]">{prop.title}</h3>
                        <div className="flex gap-1 text-[20px]">
                            <span>{prop.meaning}</span>
                            {prop.specChar && <span>{prop.specChar}</span>}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
})