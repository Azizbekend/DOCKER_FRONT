
import { useEffect, useState } from 'react';
import imagePassport from "./assets/passport.jpg";
import { Icon } from '@/packages/shared-ui/icon';
import { coordinates } from '../../../../../../packages/entities/object/data';
import mmrgl from 'mmr-gl';
import mapPl from '../../../registry-map/assets/map-pl.png';
import { passportModel } from '@/modules/domain/features/object/model';
import { PassportHeaderPanel } from '../../components/header-panel';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { listParticipantsModel } from '@/modules/domain/features/participants/models/list-participants-model';
import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { getGoodName } from '@/packages/functions/get-good-name';

// Типы
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

interface Participant {
  company: {
    companyRole: string;
    companyName: string;
  };
  users: User[];
}

export const PassportInformation = observer(() => {
  const { objectId } = useParams();
  const { init: participantsInit, listParticipants } = listParticipantsModel;
  const { model, objectData, itemObjectData } = passportModel;
  const [copied, setCopied] = useState(false);

  const handleCopyCoordinates = async () =>

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

  // Пример данных для таблиц (замените на реальные)
  const techSpecs = [
    { id: 1, name: "Производительность суточная", projectValue: "250", actualValue: "по расчету ноды", unit: "м³/сут", graph: "(муляж кнопки)" },
    { id: 2, name: "Производительность часовая", projectValue: "10,4", actualValue: "по расчету ноды", unit: "м³/ч", graph: "(муляж кнопки)" },
    { id: 3, name: "Электроэнергия", projectValue: "92,3", actualValue: "по расчету ноды", unit: "кВт/ч", graph: "(муляж кнопки)" },
    { id: 4, name: "Водоснабжение", projectValue: "0,6", actualValue: "по расчету ноды", unit: "м³/сут", graph: "(муляж кнопки)" },
  ];

  const reagentStats = [
    { id: 1, name: "Коагулянт Аквапак 30", area: "Удаление фосфатов", projectConsumption: "6,15", actualConsumption: "Поле ввода", unit: "кг/сут", economy: "формула %" },
    { id: 2, name: "Флокулянт Аквафлок 650", area: "Обезвоживание осадка", projectConsumption: "0,09", actualConsumption: "Поле ввода", unit: "кг/сут", economy: "формула %" },
    { id: 3, name: "Щавелевая кислота", area: "Промывка ламп УФО", projectConsumption: "0,1", actualConsumption: "Поле ввода", unit: "кг/мес", economy: "формула %" },
    { id: 3, name: "Щавелевая кислота", area: "Хим.промывка МБР", projectConsumption: "43,5", actualConsumption: "Поле ввода", unit: "кг/год", economy: "формула %" },
    { id: 4, name: "Гипохлорит натрия ГОСТ 11086-76 марка А", area: "Хим.промывка МБР", projectConsumption: "50", actualConsumption: "Поле ввода", unit: "кг/мес", economy: "формула %" },
  ];

  const sludgeStats = [
    { id: 1, name: "Избыточный активный ил (влажный)", area: "Аэробный стабилизатор", projectConsumption: "142,6", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
    { id: 2, name: "Избыточный активный ил (обезвоженный)", area: "Обезвоживатель", projectConsumption: "6,2", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
    { id: 3, name: "Отбросы", area: "Барабанное сито", projectConsumption: "0,93", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
    { id: 4, name: "Пескопульпа", area: "Песколовка", projectConsumption: "0,93", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
  ];

  const personnel = [
    { id: 1, position: "Начальник очистных сооружений", fio: "(брать из участников)", phone: "(брать из участников)", schedule: "(муляж кнопки)" },
    { id: 2, position: "Оператор очистных сооружений", fio: "(брать из участников)", phone: "(брать из участников)", schedule: "(муляж кнопки)" },
    { id: 3, position: "Оператор очистных сооружений", fio: "(брать из участников)", phone: "(брать из участников)", schedule: "(муляж кнопки)" },
    { id: 4, position: "Оператор очистных сооружений", fio: "(брать из участников)", phone: "(брать из участников)", schedule: "(муляж кнопки)" },
  ];

  return (
    <>
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
          {/* Левая панель: Изображение */}
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

            {/* Карта (убрана, но оставлена для будущего использования) */}
            {/* <BlockContainer title="Расположение">
              <div className="h-80 bg-gray-100 rounded-lg">
                <div id="map" className="w-full h-full rounded-xl shadow-sm" />
              </div>
            </BlockContainer> */}


            {/* Технические характеристики */}
            <BlockContainer title="Технические характеристики">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {techSpecs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow"
                  >
                    {/* Иконка и заголовок */}
                    <div className="flex items-start gap-3 mb-3">

                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{spec.name}</h4>
                        <p className="text-xs text-gray-600">{spec.unit}</p>
                      </div>
                    </div>

                    {/* Основные показатели */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Проект</span>
                        <span className="text-sm font-medium text-gray-800">{spec.projectValue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Факт</span>
                        <span className="text-sm font-bold text-[#4A85F6]">{spec.actualValue}</span>
                      </div>
                    </div>

                    {/* График */}

                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <button
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-xs transition-colors"
                        title="Показать график"
                      >

                        Показать график
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </BlockContainer>

            {/* Обслуживающий персонал НУЖНО ПОСМОТРЕТЬ*/}
            <BlockContainer title="Обслуживающий персонал">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">№</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Должность</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ФИО</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Телефон</th>
                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">График</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listParticipants.flatMap((contact, idx) =>
                      contact.users.length > 0
                        ? contact.users.map((user, userIdx) => (
                          <tr key={`${idx}-${userIdx}`} className="hover:bg-purple-50 transition-colors">
                            <td className="px-3 py-2 text-sm text-gray-800 font-medium">{idx + 1}</td>
                            <td className="px-3 py-2 text-sm text-gray-800">{contact.company.companyRole}</td>
                            <td className="px-3 py-2 text-sm text-gray-800">{getGoodName(user)}</td>
                            <td className="px-3 py-2 text-sm text-gray-800">{user.phoneNumber}</td>
                            <td className="px-3 py-2 text-sm text-gray-800 text-center">
                              <button
                                className="p-1.5 rounded-full hover:bg-purple-100 transition-colors"
                                title="Просмотреть график работы"
                              >
                                <Icon systemName="calendar" className="text-purple-600 w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                        : [{
                          id: `empty-${idx}`, jsx: (
                            <tr key={`empty-${idx}`}>
                              <td className="px-3 py-2 text-sm text-gray-800" colSpan={5}>Нет назначенного персонала</td>
                            </tr>
                          )
                        }]
                    ).flatMap(item => item.jsx || item)}
                  </tbody>
                </table>
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

          {/* Правая панель: Новые блоки */}
          <div className="xl:col-span-1 space-y-6">
            {/* Статистика по реагентам */}
            <BlockContainer title="Статистика по реагентам">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reagentStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow"
                  >
                    {/* Иконка и заголовок */}
                    <div className="flex items-start gap-3 mb-3">

                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.area}</p>
                      </div>
                    </div>

                    {/* Основные показатели */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Проект</span>
                        <span className="text-sm font-medium text-gray-800">{item.projectConsumption} {item.unit}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Факт</span>
                        <span className="text-sm font-medium text-blue-600">{item.actualConsumption} {item.unit}</span>
                      </div>
                    </div>

                    {/* Экономия */}
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-600">Экономия</span>
                      <span className="text-sm font-medium text-blue-600">{item.economy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </BlockContainer>

            {/* Статистика по осадкам */}
            <BlockContainer title="Статистика по осадкам">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sludgeStats.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-sm transition-shadow"
                  >
                    {/* Иконка и заголовок */}
                    <div className="flex items-start gap-3 mb-3">

                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.area}</p>
                      </div>
                    </div>

                    {/* Основные показатели */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Проект</span>
                        <span className="text-sm font-medium text-gray-800">{item.projectConsumption} {item.unit}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Факт</span>
                        <span className="text-sm font-medium text-blue-600">{item.actualConsumption} {item.unit}</span>
                      </div>
                    </div>

                    {/* Экономия */}
                    <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-600">Экономия</span>
                      <span className="text-sm font-medium text-blue-600">{item.economy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </BlockContainer>


          </div>
        </div>
      </div>
    </>
  );
});