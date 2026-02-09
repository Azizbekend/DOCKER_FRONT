import { TableColumn } from "@/packages/shared-ui/table/types";
// import imageProfile from "../assets/object-actual.jpg"
import { Icon } from "@/packages/shared-ui/icon";
import { PassportDataType } from "@/packages/entities/object/type";
import { getDate } from "@/packages/functions/get-data/get-date";
import { getObjectStageColor } from "@/packages/functions/get-data/get-object-stage";
import { ObjectStages, objectStagesLabels } from "@/packages/entities/object/config";

export const columns: TableColumn<PassportDataType>[] = [
    {
        header: "Изображение",
        key: 'img',
        width: '160px',
        cell: ({ fileId }) => {
            return (
                <div className="flex justify-center">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200 flex justify-items-end">
                        <div>
                            <img
                                src={`https://triapi.ru/research/api/FileStorage/images/download?id=${fileId || ''}`}
                                alt="Объект"
                                className="h-full w-fit object-cover object-right"
                            />
                        </div>
                    </div>
                </div>
            );
        },
    },
    {
        header: "Наименование",
        key: 'name',
        cell: ({ name }) => {
            return (
                <div className='font-semibold text-[17px] text-left'>{name}</div>
            )
        },
    },
    {
        header: "Дата ввода в эксплуатацию",
        key: 'dateCommissioning',
        width: '0.5fr',
        cell: ({ dateCommissioning }) => {
            return (
                <div className='font-semibold text-[17px] text-left'>{getDate(dateCommissioning)}</div>
            )
        },
    },
    {
        header: "Эксплуатирующая организация",
        key: 'operatingOrganization',
        cell: ({ operatingOrganization }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-lg'>{operatingOrganization || '—'}</div>
            );
        },
    },
    {
        header: "статус подключения к ПЛК",
        key: 'true',
        width: '1.2fr',
        cell: () => {
            // statusСonnection = false;

            // const [show, setShow] = useState(false);

            return (
                <div className="flex justify-center relative">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${true
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                        onMouseEnter={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                    >
                        <div className={`w-2 h-2 rounded-full mr-2 ${true ? "bg-green-500" : "bg-red-500"
                            }`}></div>
                        {true ? "Подключено" : "Не подключено"}
                    </div>
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
        cell: ({ projectEfficiency }) => {
            console.log(projectEfficiency)
            return (
                <div className='text-center w-full text-gray-800 font-medium text-lg'>{projectEfficiency + " м³" || '—'}</div>
            );
        },
    },
    {
        header: "Сред.суточная производительность,\n м³/сут",
        key: 'projectEfficiency',
        width: '0.8fr',
        cell: ({ projectEfficiency }) => {
            return (
                <div className='flex items-center justify-center gap-2 font-medium text-lg text-red-600'>
                    <Icon systemName="trending-down" />
                    {projectEfficiency + " м³" || '—'}
                </div>
            );
        },
    },
    {
        header: "Часовая производительность, м³/ч",
        key: 'hourEfficiency',
        cell: ({ hourEfficiency }) => {
            return (
                <div className='flex items-center justify-center gap-2 font-medium text-lg text-[var(--clr-accent)]'>
                    <Icon systemName="trending-up" />
                    {hourEfficiency + " м³" || '—'}
                </div>
            );
        },
    },
    {
        header: "Этап",
        key: 'stage',
        width: '0.5fr',
        cell: ({ stage }) => {
            return (
                <div className={`font-semibold text-[17px] text-left text-white p-2 rounded-2xl text-[14px] ${getObjectStageColor(ObjectStages.Designing)}`}>{objectStagesLabels[ObjectStages.Designing]}</div>
            )
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