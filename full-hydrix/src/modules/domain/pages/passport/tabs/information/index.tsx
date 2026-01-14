import { useEffect, useState } from 'react';
import imagePassport from "../../assets/passport.jpg";
import { Icon } from '@/shared/ui/icon';
import { coordinates, infoContacts, itemsInfo1 } from '../../data/data';
import { BlockContainer } from '../../components/block-container';
import { IPassportModel } from '../../type/types';
import { TechSpecifications } from './components/tech-specifications';
import mmrgl from 'mmr-gl';
import mapPl from '../../../registry-map/assets/map-pl.png';

import mapPin from "./assets/map-pin.png"

interface PassportInformationProps {
  techData: IPassportModel
}

export const PassportInformation = ({ techData }: PassportInformationProps) => {
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

  useEffect(() => {

    const getImage = document.createElement('img');
    getImage.src = mapPl;

    mmrgl.accessToken = 'RSb56d5332e76e56dc4edfc97969872b43ee310869573b956b8912c5746da814';


    const map = new mmrgl.Map({
      container: 'map',
      zoom: 10,
      center: [49.495274, 55.957421],
      style: 'mmr://api/styles/main_style.json',
    })

    var marker = new mmrgl.Marker({
      element: getImage,
      draggable: false,
      pitchAlignment: 'map',
    })
      .setLngLat([49.495274, 55.957421])
      .addTo(map);
  }, [])


  return (
    <div className=" mx-auto" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая панель: Изображение и ход строительства */}
        <div className="lg:col-span-1 space-y-6">
          {/* Изображение объекта */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="relative w-full aspect-video">
              <img
                src={imagePassport}
                alt="Объект"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Подключено
              </div>
            </div>
          </div>

          {/* Ход строительства */}
          <BlockContainer title="Ход строительства">
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">IV квартал 2025 г.</span>
                  <span className="text-green-600 font-semibold">100%</span>
                </div>
                <div className="mt-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { stage: "Оформление ЗПО", date: "01.03.2023 – 01.03.2023", progress: "0 / 0" },
                  { stage: "ИРД", date: "01.03.2023 – 01.03.2023", progress: "0 / 0" },
                  { stage: "ПИР", date: "01.03.2023 – 01.10.2023", progress: "1 / 1" },
                  { stage: "СМР", date: "21.03.2025 – 01.11.2025", progress: "0 / 1" },
                  { stage: "Оформление прав на ОКС", date: "01.11.2025 – 01.03.2026", progress: "0 / 1" }
                ].map((item, index) => (
                  <div key={index} className={`p-3 rounded-lg ${index === 3 ? 'bg-blue-100' : 'bg-white'} border border-gray-200`}>
                    <div className="flex justify-between">
                      <div>
                        <div className="font-medium text-gray-800">{item.stage}</div>
                        <div className="text-xs text-gray-500">{item.date}</div>
                      </div>
                      <div className="text-gray-600 font-medium">{item.progress}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BlockContainer>

          {/* Карта */}
          <BlockContainer title="Расположение">
            <div className="h-[360px] bg-gray-100 rounded-lg flex items-center justify-center">
              <div id="map" className="w-full h-full rounded-xl shadow-sm" />
            </div>
          </BlockContainer>
        </div>

        {/* Центральная панель: Детали объекта */}
        <div className="lg:col-span-1 space-y-6">
          {/* Общая информация */}
          <BlockContainer title="Общая информация">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    Очистные сооружения в с. Шапши, Высокогорского муниципального района
                  </h3>
                </div>

                {itemsInfo1.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="text-sm font-semibold uppercase tracking-wide text-gray-600">
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

          <TechSpecifications data={techData} />

          {/* Документы */}
          <BlockContainer title="Документы">
            <div className="space-y-2">
              <div
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                onClick={() => setShow(true)}
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon systemName="docs" className="text-blue-700" />
                </div>
                <span className="text-gray-800 font-medium">Паспорт объекта</span>
              </div>
            </div>
          </BlockContainer>
        </div>

        {/* Правая панель: Финансирование и проблемы */}
        <div className="lg:col-span-1 space-y-6">
          {/* Финансирование */}
          <BlockContainer title="Финансирование">
            <div className="space-y-4">
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="font-semibold text-gray-800">Начальная цена контракта</span>
                <span className="font-bold text-gray-800">129 601 110,00 ₽</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="font-semibold text-gray-800">Профинансировано по объекту</span>
                <span className="font-bold text-gray-800">253 755 699 ₽</span>
              </div>

              <div className="flex justify-between pt-2 border-gray-200">
                <span className="font-semibold text-gray-800">Законтрактовано</span>
                <span className="font-bold text-gray-800">123 820 142 ₽</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Оплачено</span>
                  <span className="text-gray-800">0 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Остаток</span>
                  <span className="text-gray-800">0 ₽</span>
                </div>
              </div>
            </div>
          </BlockContainer>


          {/* Контактные данные */}
          <BlockContainer title="Контактные данные">
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
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {contact.email}
                    </a>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
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
      </div>
    </div>
  );
};
