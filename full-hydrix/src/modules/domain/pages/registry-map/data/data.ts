




// Мок-данные
export const objects = [
    {
        id: 1,
        coords: [49.497765, 55.797557],
        name: "Очистные сооружения в с. Шапши",
        type: "Очистка стоков",
        status: "Работает",
        incidents: 3,
        lastIncident: "20.12.2025",
        capacity: "200 м³/сут",
        efficiency: 98,
        energy: 74
    },
    {
        id: 2,
        coords: [49.51, 55.82],
        name: "Насосная станция №3",
        type: "Подача воды",
        status: "Отключено",
        incidents: 1,
        lastIncident: "15.12.2025",
        capacity: "150 м³/сут",
        efficiency: 95,
        energy: 68
    }
];


export interface Incident {
    id: number,
    object: string,
    issue: string,
    status: string,
    time: string,
    duration: string,
    responsible: string,
    company: string,
}


export const incidents: Incident[] = [
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3231,
        object: "Очистные сооружения в с. Шапши",
        issue: "Авария датчика давления",
        status: "Новый",
        time: "20:34",
        duration: "42 мин",
        responsible: "Кудрявцева Вероника",
        company: "ООО \"Сервис СоцОп\""
    },
    {
        id: 3230,
        object: "Очистные сооружения в с. Шапши",
        issue: "Сбой в системе фильтрации",
        status: "В работе",
        time: "04:13",
        duration: "Сегодня 11:22",
        responsible: "Колесов Владислав А.",
        company: "ООО \"Уютная соц.сфера\""
    },
    {
        id: 3229,
        object: "Очистные сооружения в с. Шапши",
        issue: "Падение давления на выходе",
        status: "Завершён",
        time: "03:18",
        duration: "Сегодня 18:26",
        responsible: "Орлова Кристина Вик.",
        company: "ООО \"СоцПро\""
    }
];




// {/* Список объектов */ }
//   <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 p-5">
//     <h3 className="font-bold text-gray-800 mb-3">Список объектов</h3>

//     <div className="space-y-2 max-h-70 overflow-y-auto pr-1">
//       {objects.map(obj => (
//         <div
//           key={obj.id}
//           className={`p-3 rounded-lg cursor-pointer transition-colors ${selectedObjectId === obj.id
//             ? 'bg-[#4A85F6]/10 border border-[#4A85F6]'
//             : 'hover:bg-gray-100'
//             }`}
//           onClick={() => handleMarkerClick(obj.id)}
//         >
//           <div className="flex justify-between items-center">
//             <div>
//               <div className="font-medium text-gray-800">{obj.name}</div>
//               <div className="text-xs text-gray-600">{obj.type}</div>
//             </div>
//             <div className={`text-xs px-2 py-0.5 rounded-full font-medium ${obj.status === 'Работает' ? 'bg-green-100 text-green-800' :
//               obj.status === 'Отключено' ? 'bg-red-100 text-red-800' :
//                 'bg-gray-100 text-gray-800'
//               }`}>
//               {obj.status}
//             </div>
//           </div>
//           <div className="mt-2 flex justify-between text-xs text-gray-600">
//             <span>Инциденты: {obj.incidents}</span>
//             <span>Последний: {obj.lastIncident}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   </div>


// {/* Информационная карточка */}
//           {activeCart && selectedObject && false && (
//             <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 p-5">
//               <div className="flex justify-between items-center mb-3">
//                 <h3 className="font-bold text-gray-800">{selectedObject.name}</h3>
//                 <button
//                   onClick={() => setActiveCart(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <Icon systemName="x" />
//                 </button>
//               </div>

//               <div className="mb-4">
//                 <div className="text-sm text-gray-600 mb-1">Тип</div>
//                 <div className="font-medium text-gray-800">{selectedObject.type}</div>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mb-4">
//                 <div className="p-2 bg-blue-50 rounded-lg text-xs">
//                   <div className="text-blue-700 font-medium">Производительность</div>
//                   <div className="text-blue-800">{selectedObject.capacity}</div>
//                 </div>
//                 <div className="p-2 bg-green-50 rounded-lg text-xs">
//                   <div className="text-green-700 font-medium">Эффективность</div>
//                   <div className="text-green-800">{selectedObject.efficiency}%</div>
//                 </div>
//               </div>

//               {/* Список инцидентов */}
//               <div>
//                 <div className="text-sm text-gray-600 mb-2">Последние инциденты</div>
//                 <div className='h-full overflow-auto'>
//                   <div className="space-y-2 max-h-50 overflow-y-auto pr-1">
//                     {incidents.filter(i => i.object === selectedObject.name).map(incident => (
//                       <div key={incident.id} className="p-2 bg-gray-50 rounded-lg">
//                         <div className="font-medium text-gray-800 text-sm">{incident.issue}</div>
//                         <div className="text-xs text-gray-600 mt-1">{incident.time} • {incident.duration}</div>
//                         <div className="text-xs text-gray-600 mt-1">{incident.responsible} • {incident.company}</div>

//                       </div>
//                     ))}
//                     <Link
//                       to="/dispatcher"
//                       className="mt-auto flex items-center justify-center gap-2 px-4 py-3 bg-[#4A85F6] text-white rounded-lg font-medium hover:bg-[#3a6bc9] transition-colors shadow-lg"
//                     >
//                       <Icon systemName="layers" />
//                       Диспетчеризация
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}