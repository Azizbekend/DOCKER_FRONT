import { getRequestTypeColor, getStatusColor } from '@/modules/dispatcher/widgets/service-request/functions';
import { getDate } from '@/packages/functions/get-data/get-date';
import { Button } from '@/packages/shared-ui/button/button';
import { Link } from 'react-router-dom';
import { useEffect } from "react"

type RequestCardProps = {
    request: any,
    onClick?: () => void,
}


export const RequestCard = ({ request, onClick }: RequestCardProps) => {
    return (
        <div onClick={onClick}
            className="cursor-pointer border border-gray-200 rounded-xl p-5 bg-white hover:bg-blue-50 transition-colors duration-200 hover:shadow-md">

            <div className="flex items-start justify-between gap-4 mb-4">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-800 text-lg truncate">{request.title}</h3>
                        {request.type === 'Аварийная' && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full flex items-center gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Аварийная
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex-shrink-0 flex gap-3">
                    {getStatusColor(request.status)}
                    {getRequestTypeColor(request.type)}
                </div>
            </div>

            {/* Основная информация */}
            <div className="flex items-start justify-between gap-4 mb-4">

                <div className="grid grid-cols-[1fr_2fr_40px] items-start min-w-[300px]">

                    {/* Оборудование и стоимость */}
                    <div className="space-y-2">
                        {request.hardware && (
                            <Link to={`/dispatcher/hardware-about/${request.hardware.id}/passport/`} onClick={(e) => e.stopPropagation()}>
                                <div className="flex items-center gap-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div className="text-xs text-gray-500 font-medium">Оборудование</div>
                                </div>
                                <div>{request.hardware.name}</div>
                            </Link>
                        )}

                    </div>
                </div>

                {/* Дата создания */}
                <div className="flex items-center justify-end md:justify-start text-right ">
                    <div className="text-xs text-gray-500">
                        <div className="font-medium">Создано</div>
                        <div>{getDate(request.createdAt)}</div>
                    </div>
                </div>
            </div>

            {/* Участники заявки */}
            <div className="pt-4 border-t border-gray-100 flex justify-between">
                <div className="flex flex-col gap-4">
                    {/* Создатель */}

                    {request.status == "New" ?
                        <div className="flex item-start gap-8">
                            <div className="flex items-center gap-3 ">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="">
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Создатель</div>
                                    <div className="font-medium text-gray-800 truncate">{request.creator}</div>
                                </div>
                            </div>
                            {request.creatorsCompany &&
                                <div className="flex items-center gap-3 ">
                                    <div className="">
                                        <div className="text-xs text-gray-500 uppercase">Компания</div>
                                        <div className="font-medium text-gray-800 truncate">{request.creatorsCompany.companyName}</div>
                                    </div>
                                </div>
                            }
                        </div>
                        :
                        <div className="flex item-start gap-8">
                            <div className="flex items-center gap-3 ">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="">
                                    <div className="text-xs text-gray-500 uppercase tracking-wide">Исполнитель</div>
                                    <div className="font-medium text-gray-800 truncate">{request.implementer}</div>
                                </div>
                            </div>

                            {request.implementersCompany &&
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="min-w-0">
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Компания</div>
                                        <div className="font-medium text-gray-800 truncate">{request.implementersCompany.companyName}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};