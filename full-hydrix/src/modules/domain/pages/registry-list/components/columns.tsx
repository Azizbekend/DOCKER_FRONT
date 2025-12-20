import { DespetcherTest } from "@/entities/despetcher-test/type";
import { TableColumn } from "@/shared/ui/table/types";
import imageProfile from "../assets/stations.jpg"
import { Icon } from "@/shared/ui/icon";

export const columns: TableColumn<DespetcherTest>[] = [
    {
        header: "Изображение",
        key: 'img',
        width: '160px',
        cell: ({ img }) => {
            return (
                <div className="flex justify-center">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden border-2 border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <img
                            src={imageProfile}
                            alt="Объект"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/5 hover:bg-black/10 transition-colors duration-200"></div>
                    </div>
                </div>
            );
        },
    },
    {
        header: "Краткое наименование",
        key: 'nameMinin',
        cell: ({ nameMinin }) => {
            return (
                <div className='font-semibold text-[17px] text-left'>{nameMinin}</div>
            )
        },
    },
    {
        header: "Организация",
        key: 'company',
        cell: ({ company }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-lg'>{company || '—'}</div>
            );
        },
    },
    {
        header: "статус подключения к ПЛК",
        key: 'statusСonnection',
        cell: ({ statusСonnection }) => {
            return (
                <div className="flex justify-center">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${statusСonnection
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                        }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${statusСonnection ? "bg-green-500" : "bg-red-500"
                            }`}></div>
                        {statusСonnection ? "Подключено" : "Не подключено"}
                    </div>
                </div>
            );
        },
    },
    {
        header: "Статус работы",
        key: 'statusJob',
        cell: ({ statusJob }) => {
            return (
                <div className="flex justify-center">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${statusJob
                        ? "bg-blue-100 text-blue-800 border border-blue-200"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                        }`}>
                        <div className={`w-2 h-2 rounded-full mr-2 ${statusJob ? "bg-blue-500" : "bg-gray-500"
                            }`}></div>
                        {statusJob ? "Функционирует" : "Не функционирует"}
                    </div>
                </div>
            );
        },
    },
    {
        header: "Проектная произ., м³/сут",
        key: 'volumeProjec',
        cell: ({ volumeProjec }) => {
            return (
                <div className='text-center w-full text-gray-800 font-medium text-lg'>{volumeProjec + " м³" || '—'}</div>
            );
        },
    },
    {
        header: "Производительность., м³/сут",
        key: 'volumeAverage',
        cell: ({ volumeAverage }) => {
            return (
                <div className='flex items-center justify-center gap-2 font-medium text-lg text-red-600'>
                    <Icon systemName="trending-down" />
                    {volumeAverage + " м³" || '—'}
                </div>
            );
        },
    },
    {
        header: "Реальная почасовая производительность, м³/ч",
        key: 'volumeReale',
        cell: ({ volumeReale }) => {
            return (
                <div className='flex items-center justify-center gap-2 font-medium text-lg text-[var(--clr-accent)]'>

                    <Icon systemName="trending-up" />

                    {volumeReale + " м³" || '—'}
                </div>
            );
        },
    },
    {
        header: "Диспетчеризация",
        key: 'dispetcher',
        cell: ({ dispetcher }) => {
            if (dispetcher) {
                return (
                    <div className="flex justify-center">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                window.location.href = "/dispatcher";
                            }}
                            className="z-4 px-4 py-2 bg-[#4A85F6] text-white font-semibold rounded-lg hover:bg-[#3a6bc9] transition-colors duration-200 shadow-sm hover:shadow-md flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Перейти
                        </button>
                    </div>
                );
            } else {
                return (
                    <div className="flex justify-center">
                        <button
                            disabled
                            className="px-4 py-2 bg-gray-200 text-gray-500 font-semibold rounded-lg cursor-not-allowed flex items-center"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Недоступно
                        </button>
                    </div>
                );
            }
        },
    },
];