import React, { useState, useEffect, useRef } from 'react';
import InfoCart from './components/infoCard';
import { observer } from 'mobx-react-lite';
import mapPl from './assets/map-pl.png';
import { Icon } from "@/shared/ui/icon";
import mmrgl from 'mmr-gl';
import 'mmr-gl/dist/mmr-gl.css';
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { incidents, objects } from './data/data';
import { Table } from '@/shared/ui/table/index';
import { columns } from './components/table-columns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';



export const MapObjects = observer(() => {

  const getImage = document.createElement('img');
  getImage.src = mapPl;

  useEffect(() => {
    mmrgl.accessToken = 'RSb56d5332e76e56dc4edfc97969872b43ee310869573b956b8912c5746da814';

    const map = new mmrgl.Map({
      container: 'map',
      zoom: 10,
      center: [49.349157, 55.858397],
      style: 'mmr://api/styles/main_style.json',
    })

    var marker = new mmrgl.Marker({
      element: getImage,
      // color: "#FFFFFF",
      draggable: false
    })
      .setLngLat([49.497765, 55.797557])
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      handleMarkerClick(1);
    });
  }, [])

  const chartData = [
    { name: 'Критичные', value: 30, color: '#EF4444' },
    { name: 'Важные', value: 50, color: '#F59E0B' },
    { name: 'Плановые', value: 20, color: '#10B981' },
  ];

  const chartDataInic = [
    { name: 'Инцидентов', value: 9, color: 'red' },
    { name: 'На исправлении', value: 3, color: 'blue' },
  ];


  const navigate = useNavigate();

  const [filterBtn, setFilterBtn] = useState<"all" | "critical" | "important" | "planned">("all");


  const handleRow = () => {
    navigate("/domain/passport")
  }

  return (
    <div
      className="w-full gap-6 relative"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      <div className='min-h-[50vh] flex gap-5 mb-10'>
        <div className="w-[75%] col-start-1 col-end-4">
          <div id="map" className="w-full h-full rounded-xl shadow-sm" />
        </div>

        <div className=" bg-white/90 backdrop-blur-lg rounded-xl shadow-sm p-5 flex-1">

          <div className="text-gray-900 text-sm font-semibold border-b-2 border-gray-200 mb-6 pb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Объектов онлайн <span className="text-gray-600 font-normal">1 из 1</span>
          </div>

          {chartDataInic.map((item, index) => (
            <div className={`${item.color == "red" ? "bg-red-50" : "bg-blue-50"} p-2 rounded-xl text-[14px] font-medium mb-2 border-b-red-100 flex items-center justify-between`}>
              <div className="mb-1">{item.name}</div>
              <div className={`font-semibold ${item.color == "red" ? 'text-red-600' : 'text-blue-600'}`}>{item.value}</div>
            </div>
          ))}

          <div className=" p-2 rounded-xl text-[14px] font-medium mb-4 flex items-center justify-between">
            <div className="mb-1"></div>
            <div className='text-blue-600'></div>
          </div>

          {chartData.map((item, index) => (
            <div className='flex items-center justify-between pb-2 border-b-[1.5px] mb-3'>
              <span>{item.name}</span>
              <div className='flex flex-col'>
                <span className='font-bold text-sm'>{item.value + "%"}</span>
                <span className='font-medium text-sm'>1 объект</span>
              </div>
            </div>
          ))}


          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData}
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

        </div>
      </div>

      <div>

        <div className='ml-4 flex gap-3'>
          <FilterButton name='Все' isActive={filterBtn == "all"} onClick={() => setFilterBtn("all")} />
          <FilterButton name='Критичные' isActive={filterBtn == "critical"} onClick={() => setFilterBtn("critical")} />
          <FilterButton name='Важные' isActive={filterBtn == "important"} onClick={() => setFilterBtn("important")} />
          <FilterButton name='Плановые' isActive={filterBtn == "planned"} onClick={() => setFilterBtn("planned")} />
        </div>

        <Table
          classNames={{
            body: "",
            thead: "bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200",
          }}
          onRowClick={handleRow}
          columns={columns}
          countActive
          data={incidents}
        />
      </div>
    </div>
  );
});


const FilterButton = ({ name, isActive, onClick }: { name: string, isActive: boolean, onClick: () => void }) => {
  return <button onClick={onClick} className={`py-1 px-4 rounded-tl-lg rounded-tr-lg duration-300 font-semibold ${isActive ? "bg-[var(--clr-accent)] text-white" : " hover:bg-gray-300 bg-gray-200 text-gray-600"}`}>{name}</button>
}
