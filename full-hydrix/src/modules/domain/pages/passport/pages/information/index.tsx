import { useEffect, useState } from 'react';
import imagePassport from "./assets/passport.jpg";
import { Icon } from '@/packages/shared-ui/icon';
import { coordinates, infoContacts } from '../../../../../../packages/entities/object/data';
import { BlockContainer } from '../../../../../../packages/shared-components/container-blocks/block-container';
import { TechSpecifications } from './components/tech-specifications';
import mmrgl from 'mmr-gl';
import mapPl from '../../../registry-map/assets/map-pl.png';
import { passportModel } from '@/modules/domain/features/object/model';
import { PassportHeaderPanel } from '../../components/header-panel';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { listParticipantsModel } from '@/modules/domain/features/participants/models/list-participants-model';
import { getGoodName } from '@/packages/functions/get-good-name';

export const PassportInformation = observer(() => {

  const { objectId } = useParams();
  const { init: participantsInit, listParticipants } = listParticipantsModel


  const { model, objectData, itemObjectData } = passportModel;
  const [copied, setCopied] = useState(false);

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

    participantsInit(objectId)

    const getImage = document.createElement('img');
    getImage.src = mapPl;

    mmrgl.accessToken = 'RSb56d5332e76e56dc4edfc97969872b43ee310869573b956b8912c5746da814';

    const map = new mmrgl.Map({
      container: 'map',
      zoom: 10,
      center: [49.495274, 55.957421],
      style: 'mmr://api/styles/main_style.json',
    });

    var marker = new mmrgl.Marker({
      element: getImage,
      draggable: false,
      pitchAlignment: 'map',
    })
      .setLngLat([49.495274, 55.957421])
      .addTo(map);
  }, []);

  return <>
    <PassportHeaderPanel
      title='Паспорт объекта'
      rightBlock={
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Link
            to="/gis/company/56"
            className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 bg-white text-[#4A85F6] font-medium rounded-lg border border-[#4A85F6] hover:bg-[#4A85F6] hover:text-white transition-all duration-200 shadow-sm text-sm whitespace-nowrap"
          >
            <span>Управление ЖБО</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          <Link
            to={`/dispatcher`}
            className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2.5 bg-[#4A85F6] text-white font-medium rounded-lg hover:bg-[#3a6bc9] transition-colors duration-200 shadow-sm text-sm whitespace-nowrap"
          >
            <span>Диспетчерская</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      }
    />

    <div className="max-w-auto mx-auto">
      {/* Основной контент */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Левая панель: Изображение и карта */}
        <div className="xl:col-span-1 space-y-6">
          {/* Изображение объекта */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="relative w-full aspect-video">
              <img
                src={imagePassport}
                alt="Объект"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-3 left-3 bg-white/30 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-semibold flex items-center">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5"></div>
                Подключено
              </div>
            </div>
          </div>

          {/* Карта */}
          <BlockContainer title="Расположение">
            <div className="h-80 bg-gray-100 rounded-lg">
              <div id="map" className="w-full h-full rounded-xl shadow-sm" />
            </div>
          </BlockContainer>
        </div>

        {/* Центральная панель: Детали объекта */}
        <div className="xl:col-span-1 space-y-6">
          {/* Общая информация */}
          <BlockContainer title="Общая информация">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {objectData.adress}
              </h3>

              {itemObjectData.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                    {item.name}
                  </div>
                  <div className="text-gray-800 text-sm">
                    {item.value}
                    {item.coord && (
                      <div className="mt-1.5 flex items-center">
                        <span className={`text-xs ${copied ? 'text-[#4A85F6]' : 'text-gray-600'}`}>
                          {coordinates}
                        </span>
                        <button
                          onClick={handleCopyCoordinates}
                          className="ml-2 p-1 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
                          title="Копировать координаты"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-gray-600"
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
          </BlockContainer>

          <TechSpecifications data={model} />

          {/* Документы */}
          <BlockContainer title="Документы">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Icon systemName="docs" className="text-blue-700 w-3.5 h-3.5" />
                </div>
                <span className="text-gray-800 font-medium text-sm">Паспорт объекта</span>
              </div>
            </div>
          </BlockContainer>
        </div>

        {/* Правая панель: Финансирование и контакты */}
        <div className="xl:col-span-1 space-y-6">
          {/* Финансирование */}
          <BlockContainer title="Финансирование">
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-gray-200">
                <span className="font-medium text-gray-800 text-sm">Общая сметная стоимость объекта</span>
                <span className="font-semibold text-gray-800 text-sm">197 913 620,00 ₽</span>
              </div>
              <div className="space-y-1 pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Оплачено</span>
                  <span className="text-gray-800 text-sm">0 ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">Остаток</span>
                  <span className="text-gray-800 text-sm">0 ₽</span>
                </div>
              </div>
            </div>
          </BlockContainer>

          {/* Контактные данные */}
          <BlockContainer title="Контактные данные">
            <div className="space-y-4">
              {listParticipants.map((contact, index) => (
                <div key={index} className="space-y-2 pb-4 border-b border-gray-100 last:border-b-0">
                  <div className="bg-gray-100 px-2.5 py-1 rounded-lg inline-block">
                    <div className="text-xs font-semibold text-gray-700">
                      {contact.company.companyRole + " " + '"' + contact.company.companyName + '"'}
                    </div>
                  </div>

                  {contact.users.length > 0 ? contact.users.map((user, key) => {
                    return <div className="space-y-1.5" key={key}>
                      <div className="font-medium text-gray-800 text-sm">{getGoodName(user)}</div>
                      <a
                        href={`mailto:${user.email}`}
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {user.email}
                      </a>
                      <a
                        href={`tel:${user.phoneNumber}`}
                        className="flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors text-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.776 21 3 14.224 3 6V5z" />
                        </svg>
                        {user.phoneNumber}
                      </a>
                    </div>
                  }) : <div className="font-medium text-gray-800 text-sm">пользователей нету</div>}
                </div>
              ))}
            </div>
          </BlockContainer>
        </div>
      </div>
    </div>
  </>
})
