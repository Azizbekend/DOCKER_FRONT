import "./index.scss";
import { useEffect, useState } from 'react';
import { SchemeViewer } from "./scheme-viewer/ViewScheme.js";
import { HardwareCard } from "./components/info-hardware/index.js";
import { schemeModel } from "./model/scheme-model.js";
import { observer } from "mobx-react-lite";
import { FormSchemaObject } from "./components/form-schema-object.js";

export const Scheme = observer(() => {
  const { init, list, focusHardware, setFocusHardware, focusSchemeObject } = schemeModel;
  const [tabScheme, setTabScheme] = useState<number>(6);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    init(6);
  }, []);

  const handleChangeImage = (id: number) => {
    setFade(true);
    if (focusHardware === id) {
      setFocusHardware(0);
    } else {
      setFocusHardware(id);
    }
    setFade(false);
  };

  // Только две активные вкладки, как в макете
  const tabs = [
    { id: 0, label: "Механическая очистка", schemeId: 6 },
    { id: 1, label: "Биологическая очистка", schemeId: 7 },
    { id: 2, label: "Вентиляция", schemeId: 8 },
    { id: 3, label: "СКУД", schemeId: 9 },
    { id: 4, label: "Охрано-пожарная сигнализация", schemeId: 10 },
  ];

  const handleTabClick = (tab: { id: number; schemeId: number }) => {
    setActiveTab(tab.id);
    setTabScheme(tab.schemeId);
  };

  return (
    <div 
      className="informations-dispatch__scheme scheme-dispatch h-[90vh] relative mt-8"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Красивые табы */}
      <div className="absolute top-[-42px] left-[30px] flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`px-5 py-2.5 rounded-t-lg font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-[#4A85F6] text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-[1fr_auto] gap-6 h-full pb-8">
        <SchemeViewer 
          setInfo={handleChangeImage} 
          points={list} 
          tabScheme={tabScheme} 
        />

        {/* Панели информации */}
        {focusHardware !== 0 && focusSchemeObject === 0 && (
          <HardwareCard 
            key={focusHardware} 
            className={`panel-scheme__info ${fade ? "fade-out" : "fade-in"}`} 
            id={focusHardware} 
            onClick={handleChangeImage} 
          />
        )}
        {focusSchemeObject !== 0 && (
          <FormSchemaObject 
            key={focusSchemeObject} 
            className={`panel-scheme__info ${fade ? "fade-out" : "fade-in"}`} 
            onClick={handleChangeImage} 
          />
        )}
      </div>
    </div>
  );
});
