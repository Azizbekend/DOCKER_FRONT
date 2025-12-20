import { observer } from 'mobx-react-lite';
import { useState, useEffect, ReactNode } from 'react';
import imagePassport from "../assets/passport.jpg";
import { Link } from 'react-router-dom';
import { passportObject } from '@/entities/hardware/api';
import { Icon } from '@/shared/ui/icon';
import { coordinates, infoContacts, itemsInfo1, itemsInfo2 } from '../data/data';
import { BlockContainer } from '../components/block-container';
import DocumentViewer from '../components/document-viewer';
import docs from "../../../../../../public/docs/functionGuide.pdf"

export const PassportInformation = observer(() => {


    const [copied, setCopied] = useState(false);
    const [isOpen, setShow] = useState(false);

    const handleCopyCoordinates = async () => {
        try {
            await navigator.clipboard.writeText(coordinates);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Ошибка при копировании: ', err);
        }
    };

    return (

        <div className="grid grid-cols-2 lg:grid-cols-2 gap-3">
            <DocumentViewer isOpen={isOpen} setShow={setShow} docs={docs} />

            <div className='space-y-3'>
                <BlockContainer title='Общая информация'>
                    <div className="grid grid-cols-[350px_1fr] gap-5">
                        <div className="flex justify-center">
                            <div className="relative w-full ">
                                <img
                                    src={imagePassport}
                                    alt="Объект"
                                    className="w-full h-70 object-cover rounded-xl shadow-md border border-gray-200"
                                />
                                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                    Подключено
                                </div>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    Очистные сооружения в с. Шапши, Высокогорского муниципального района
                                </h3>
                            </div>

                            {itemsInfo1.map((item, index) => (
                                <div key={index} className="space-y-1">
                                    <div className="text-sm font-semibold  uppercase tracking-wide">
                                        {item.name}
                                    </div>
                                    <div className="text-gray-800">
                                        {item.value}
                                        {item.coord && (
                                            <div className="mt-2 flex items-center">
                                                <span className={`text-sm ${copied ? 'text-[#4A85F6]' : 'text-gray-600'}`}>
                                                    {coordinates}
                                                </span>
                                                <button
                                                    onClick={handleCopyCoordinates}
                                                    className="ml-2 p-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                                                    title="Копировать координаты"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-gray-600"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </BlockContainer>

                <BlockContainer title='Документы'>
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors duration-150 cursor-pointer" onClick={() => setShow(true)}>
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Icon systemName="docs" className="text-blue-700" />
                            </div>
                            <span className="text-gray-800 font-medium">Тестовая документация</span>
                        </div>
                    </div>
                </BlockContainer>

                <BlockContainer title='Технические характеристики'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {itemsInfo2.map((item, index) => (
                            <div key={index} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                <div className="text-sm font-semibold text-gray-600 mb-1">
                                    {item.name}
                                </div>
                                <div className="text-xl font-bold text-gray-800">
                                    {item.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </BlockContainer>
            </div>

            <BlockContainer title='Контактные данные'>
                <div className="space-y-6">
                    {infoContacts.map((contact, index) => (
                        <div key={index} className="space-y-3 pb-6 border-b border-gray-100 last:border-b-0">
                            <div className="bg-gray-100 px-3 py-1 rounded-lg inline-block">
                                <div className="text-sm font-semibold text-gray-700">
                                    {contact.type}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="font-semibold text-gray-800">{contact.name}</div>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    {contact.email}
                                </a>
                                <a
                                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                                    className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.776 21 3 14.224 3 6V5z" />
                                    </svg>
                                    {contact.phone}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </BlockContainer>
        </div>
    );
});