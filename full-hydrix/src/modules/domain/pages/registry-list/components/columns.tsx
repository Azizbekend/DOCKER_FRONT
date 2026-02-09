import { TableColumn } from "@/packages/shared-ui/table/types";
// import imageProfile from "../assets/object-actual.jpg"
import { Icon } from "@/packages/shared-ui/icon";
import { PassportRegistryDataType } from "@/packages/entities/object/type";
import { getDate } from "@/packages/functions/get-data/get-date";
import { getObjectStageColor } from "@/packages/functions/get-data/get-object-stage";
import { ObjectStages, objectStagesLabels } from "@/packages/entities/object/config";

export const columns: TableColumn<PassportRegistryDataType>[] = [
    {
        header: "Изображение",
        key: 'img',
        width: '160px',
        cell: ({ fileId }) => {
            return (
                <div className="flex justify-center">
                    <div className="relative w-28 bg-blue-50 h-28 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-center items-center gap-3">
                        {
                            fileId ?
                                <img
                                    src={`https://triapi.ru/research/api/FileStorage/images/download?id=${fileId || ''}`}
                                    alt="Объект"
                                    className="h-full w-fit object-cover object-right"
                                    onError={(e) => { e.currentTarget.src = "https://placehold.co/80x80/e2e8f0/94a3b8?text=Нет\n изображения" }}
                                />
                                :
                                <>
                                    <Icon systemName="gallery" />
                                    <p>Нет изображения</p>
                                </>
                        }
                    </div>
                </div>
            );
        },
    },
    {
        header: "Наименование",
        key: 'name',
        width: '0.5fr',
        cell: ({ name }) => {
            return (
                <div className="px-4 py-3 text-sm font-semibold text-gray-800">{name}</div>
            )
        },
    },
    {
        header: "Этап",
        key: 'stage',
        width: '0.5fr',
        cell: ({ stage }) => {
            return (
                <div className={`px-4 py-3`}>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm text-white font-semibold ${getObjectStageColor(stage)}`}>
                        {objectStagesLabels[stage]}
                    </span>
                </div>
            )
        },
    },

    {
        header: "Дата ввода \n в эксплуатацию",
        key: 'commissioningDate',
        width: '0.5fr',
        cell: ({ commissioningDate }) => {
            return (
                <div className='px-4 py-3 text-sm font-semibold text-gray-700"'>{commissioningDate != "0001-01-01T00:00:00" ? getDate(commissioningDate, "short") : "—"}</div>
            )
        },
    },
    {
        header: "Эксплуатирующая \n организация",
        key: 'operatingOrganization',
        width: '0.5fr',
        cell: ({ operatingOrganization }) => {
            return (
                <div className='px-4 py-3 text-sm font-semibold text-gray-700"'>{operatingOrganization || '—'}</div>
            );
        },
    },
    {
        header: "Статус \n подключения \nк ПЛК",
        key: 'plcList',
        width: '0.5fr',
        cell: ({ plcList }) => {
            return (
                <div className="flex flex-col justify-center relative gap-2">

                    {plcList.map((item) => {

                        console.log(item)
                        return <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-semibold ${item.status
                            ? "bg-red-100 text-red-800 border border-red-200"
                            : "bg-green-100 text-green-800 border border-green-200"
                            }`}
                        >
                            <div className={`w-2 h-2 rounded-full mr-2 ${item.status ? "bg-red-500" : "bg-green-500"}`}></div>
                            {item.plcName}
                            {/* {item.status ? "Не подключено" : "Подключено"} */}
                        </div>
                    })}

                    {false && <div className={`text-[12px] text-gray-600 font-semibold leading-[1.3em] mt-2
                            absolute top-[100%] border border-2 rounded-xl shadow-xl p-4 bg-white
                            transition-all duration-300 ease-out
                            ${show ? 'opacity-100 -translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>

                        Трафик 0/100 гб <br />
                        Баланс 0/990 руб. <br />
                        оплатить до 01.02.2026
                    </div>}
                </div>
            );
        },
    },
    {
        header: "Проектная производительность,\n м³/сут",
        key: 'projectEfficiency',
        width: '0.5fr',
        cell: ({ projectEfficiency }) => {
            return (
                <div className='px-4 py-3 text-sm font-semibold text-gray-700 text-right'>{projectEfficiency + " м³" || '—'}</div>
            );
        },
    },
    {
        header: "Сред.суточная производительность,\n м³/сут",
        key: 'projectEfficiency',
        width: '0.5fr',
        cell: ({ projectEfficiency }) => {
            return (
                <div className='px-4 py-3 text-sm text-red-600 font-medium text-right flex items-center justify-end gap-2'>
                    <Icon systemName="trending-down" />
                    {0 + " м³" || '—'}
                </div>
            );
        },
    },
    {
        header: "Часовая производительность,\n м³/ч",
        key: 'hourEfficiency',
        width: '0.5fr',
        cell: ({ hourEfficiency }) => {
            return (
                <div className='px-4 py-3 text-sm text-[#4A85F6] font-medium text-right flex items-center justify-end gap-2'>
                    <Icon systemName="trending-up" />
                    {0 + " м³" || '—'}
                </div>
            );
        },
    },

    // {
    //     header: "Диспетчеризация",
    //     key: 'dispetcher',
    //     cell: ({ dispetcher }) => {
    //         if (dispetcher) {
    //             return (
    //                 <div className="flex justify-center">
    //                     <button
    //                         onClick={(e) => {
    //                             e.stopPropagation();
    //                             e.preventDefault();
    //                             window.location.href = "/dispatcher";
    //                         }}
    //                         className="z-4 px-4 py-2 bg-[#4A85F6] text-white font-semibold rounded-lg hover:bg-[#3a6bc9] transition-colors duration-200 shadow-sm hover:shadow-md flex items-center"
    //                     >
    //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    //                         </svg>
    //                         Перейти
    //                     </button>
    //                 </div>
    //             );
    //         } else {
    //             return (
    //                 <div className="flex justify-center">
    //                     <button
    //                         disabled
    //                         className="px-4 py-2 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed flex items-center"
    //                     >
    //                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    //                         </svg>
    //                         Недоступно
    //                     </button>
    //                 </div>
    //             );
    //         }
    //     },
    // },
];