import { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import mapPl from './assets/map-pl.png';
import mmrgl from 'mmr-gl';
import 'mmr-gl/dist/mmr-gl.css';
import { useNavigate } from "react-router-dom";
import { Table } from '@/packages/shared-ui/table/index';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { columnsIncidents, columnsService } from './components/columns';
import { servicesMapModel } from '../../features/service-request/services-map-model';
import { ServiceStagesPanel } from '@/packages/shared-components/stage/stages-panel';
import { toJS } from 'mobx';



export const MapObjects = observer(() => {

  const { init, services, incidents, setIsPanel, isPanel, isService, completeService, cancelService, serviceStatusCounter, chartData, serviceTypeCounter } = servicesMapModel

  useEffect(() => {
    init();

    const getImage = document.createElement('img');
    getImage.src = mapPl;
    getImage.onclick = () => { navigate("/domain/passport/information/information") }

    mmrgl.accessToken = 'RSb56d5332e76e56dc4edfc97969872b43ee310869573b956b8912c5746da814';

    const map = new mmrgl.Map({
      container: 'map',
      zoom: 10,
      center: [49.349157, 55.858397],
      style: 'mmr://api/styles/main_style.json',
    })

    var marker = new mmrgl.Marker({
      element: getImage,
      draggable: false
    })
      .setLngLat([49.495274, 55.957421])
      .addTo(map);
  }, [])



  const navigate = useNavigate();

  const [typeTable, setTypeTable] = useState<"services" | "incident">("services");
  const [filterBtn, setFilterBtn] = useState<"all" | "critical" | "important" | "planned">("all");



  return (
    <div className="w-full gap-6 relative">
      <ServiceStagesPanel
        completeService={completeService}
        cancelService={cancelService}
        show={isPanel}
        onClose={() => setIsPanel(false, 0, null)}
        isService={isService}
      />


      <div className='min-h-[50vh] flex gap-5 mb-10'>
        <div className="w-[75%] col-start-1 col-end-4">
          <div id="map" className="w-full h-full rounded-xl shadow-sm" />
        </div>

        <div className=" bg-white/90 backdrop-blur-lg rounded-xl shadow-sm p-5 flex-1">

          <div className="text-gray-900 text-sm font-semibold border-b-2 border-gray-200 mb-6 pb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div>Объектов онлайн <span className="text-gray-600 font-normal">1 из 1</span></div>
          </div>

          <div className={`bg-red-50 p-2 rounded-xl text-[14px] font-medium mb-2 border-b-red-100 flex items-center justify-between`}>
            <div className="mb-1">Инцидентов</div>
            <div className={`font-semibold text-red-600`}>{incidents.length}</div>
          </div>
          <div className={`bg-blue-50 p-2 rounded-xl text-[14px] font-medium mb-2 border-b-red-100 flex items-center justify-between`}>
            <div className="mb-1">Заявок</div>
            <div className={`font-semibold text-blue-600`}>{services.length}</div>
          </div>

          {/* serviceStatusCounter serviceTypeCounter */}

          <div className=" p-2 rounded-xl text-[14px] font-medium mb-4 flex items-center justify-between">
            <div className="mb-1"></div>
            <div className='text-blue-600'></div>
          </div>


          <div className='flex items-center justify-between pb-2 border-b-[1.5px] mb-3'>
            <span>Ожидают обработки</span>
            {/* <div className='flex flex-col'> */}
            <span className='font-bold text-sm'>{serviceStatusCounter.new}</span>
            {/* <span className='font-medium text-sm'>1 объект</span> */}
            {/* </div> */}
          </div>
          <div className='flex items-center justify-between pb-2 border-b-[1.5px] mb-3'>
            <span>Успешно закрыты</span>
            {/* <div className='flex flex-col'> */}
            <span className='font-bold text-sm'>{serviceStatusCounter.complete}</span>
            {/* <span className='font-medium text-sm'>1 объект</span> */}
            {/* </div> */}
          </div>
          <div className='flex items-center justify-between pb-2 border-b-[1.5px] mb-3'>
            <span>Отменённы заявок</span>
            <span className='font-bold text-sm'>{serviceStatusCounter.cancle}</span>
          </div>

          {chartData.length > 0 &&
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={toJS(chartData)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          }

        </div>
      </div>

      <div className='flex items-center justify-between mb-7 bg-white p-5 rounded-lg'>
        <div className='flex gap-3'>
          <FilterButton name='Все' isActive={filterBtn == "all"} onClick={() => setFilterBtn("all")} />
          <FilterButton name='Критичные' isActive={filterBtn == "critical"} onClick={() => setFilterBtn("critical")} />
          <FilterButton name='Важные' isActive={filterBtn == "important"} onClick={() => setFilterBtn("important")} />
          <FilterButton name='Плановые' isActive={filterBtn == "planned"} onClick={() => setFilterBtn("planned")} />
        </div>


        <div className='flex items-center gap-3'>
          <TypeButton name='Заявки' isActive={typeTable == "services"} onClick={() => setTypeTable("services")} />
          <TypeButton name='Аварии' isActive={typeTable == "incident"} onClick={() => setTypeTable("incident")} />
        </div>
      </div>

      <Table
        classNames={{ thead: "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200" }}
        onRowClick={(row) => setIsPanel(true, row.id, row.status)}
        columns={typeTable == "services" ? columnsService : columnsIncidents}
        countActive
        data={typeTable == "services" ? services : incidents}
      />


    </div>
  );
});


const TypeButton = ({ name, isActive, onClick }: { name: string, isActive: boolean, onClick: () => void }) => {
  return <button onClick={onClick} className={`py-1 px-4 rounded-lg duration-300 font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : " hover:bg-gray-300 bg-gray-200 text-gray-600"}`}>{name}</button>
}


const FilterButton = ({ name, isActive, onClick }: { name: string, isActive: boolean, onClick: () => void }) => {
  return <button onClick={onClick} className={`py-1 px-4 rounded-lg duration-300 font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : " hover:bg-gray-300 bg-gray-200 text-gray-600"}`}>{name}</button>
}
