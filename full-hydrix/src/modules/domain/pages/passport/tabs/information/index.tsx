import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react';
import imagePassport from "../../assets/passport.jpg";
import { Link } from 'react-router-dom';
import { passportObject } from '@/entities/hardware/api';

export const PassportInformation = observer(() => {
    const itemsInfo1 = [
        {
            name: "Адрес",
            value: "с. Шапши, Высокогорский район, Республика Татарстан",
            coord: true,
        },
        {
            name: "Заказчик",
            value: 'ГБУ "СЭТИК"',
        },
        {
            name: "Эксплуатирующая организация",
            value: 'АО "ВКС"',
        },
        {
            name: "Ген.подрядчик",
            value: 'АО "УКС"',
        },
    ];

    const itemsInfo2 = [
        {
            name: "Проектная производительность",
            value: "200 м³/сут",
        },
        {
            name: "Среднесуточная производительность",
            value: "158 м³/сут",
        },
        {
            name: "Часовая производительность",
            value: "10,5 м³/ч",
        },
        {
            name: "Расход электроэнергии",
            value: "74 кВт·ч",
        },
        {
            name: "Водоснабжение",
            value: "20 м³/сут",
        },
    ];

    const infoContacts = [
        {
            type: 'Заказчик ГБУ "СЭТИК"',
            name: "Сидоров Андрей",
            email: "fondgaz@yandex.ru",
            phone: "+7 (843) 221-51-89",
        },
        {
            type: 'Эксплуатирующая организация АО "ВКС"',
            name: "Иванов Иван",
            email: "mppjkx1@mail.ru",
            phone: "+7 (843) 653-28-72",
        },
        {
            type: 'Ген.подрядчик АО "УКС"',
            name: "Петров Иван",
            email: "uksr.kzn@tatar.ru",
            phone: "+7 (843) 223-19-19",
        },
    ];

    const [copied, setCopied] = useState(false);
    const coordinates = "55.775450, 48.762559";

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
        <div className="min-h-screen bg-gray-50 p-6" style={{ fontFamily: "'Open Sans', sans-serif" }}>
            <div className="max-w-8xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Паспорт объекта</h1>
                    <div className="w-24 h-1 bg-[#4A85F6] rounded-full mt-2"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Section - Image and Technical Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Общая информация</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Image */}
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

                                {/* Address and Organization Info */}
                                <div className="space-y-5">
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                            Очистные сооружения в с. Шапши, Высокогорского муниципального района
                                        </h3>
                                    </div>

                                    {itemsInfo1.map((item, index) => (
                                        <div key={index} className="space-y-1">
                                            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
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
                        </div>

                        {/* Technical Specifications */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Технические характеристики</h2>

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
                        </div>

                        {/* Navigation Links */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-end">
                            <Link
                                to="/gis/company/56"
                                className="flex items-center gap-2 px-6 py-3 bg-white text-[#4A85F6] font-semibold rounded-lg border border-[#4A85F6] hover:bg-[#4A85F6] hover:text-white transition-all duration-200 shadow-sm"
                            >
                                <span>Перейти в Управление ЖБО</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            <Link
                                to="/dispatcher"
                                className="flex items-center gap-2 px-6 py-3 bg-[#4A85F6] text-white font-semibold rounded-lg hover:bg-[#3a6bc9] transition-colors duration-200 shadow-sm"
                            >
                                <span>Перейти в Диспетчерскую</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Right Section - Contact Information */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Контактные данные</h2>

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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});