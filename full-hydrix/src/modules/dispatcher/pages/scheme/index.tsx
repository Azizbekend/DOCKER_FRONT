import "./index.scss";
import { useEffect, useState } from 'react';
import { HardwareCard } from "./components/info-hardware/index.js";
import { schemeModel } from "./model/scheme-model.js";
import { observer } from "mobx-react-lite";
import { FormSchemaObject } from "./components/form-schema-object.js";
import { tabs } from "./data/data.js";
import { SchemeViewer } from "./components/scheme-viewer/ViewScheme.js";

export const Scheme = observer(() => {
  const { init, list, focusHardware, listSensore, setFocusHardware, focusSchemeObject, setSchemeObjectData, switchColo } = schemeModel;
  const [tabScheme, setTabScheme] = useState<number>(6);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    init();
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


  const handleTabClick = (tab: { id: number; schemeId: number }) => {
    setActiveTab(tab.id);
    setTabScheme(tab.schemeId);
  };

  return (
    <div className="informations-dispatch__scheme scheme-dispatch relative mt-8" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      <div className="absolute top-[-40px] px-[30px] max-w-full flex gap-2  overflow-x-auto">
        {/* <button
          key={555}
          onClick={() => test()}
          className={`lg:px-5 lg:py-2.5 rounded-t-lg font-semibold min-w-max lg:text-sm px-3 py-3 text-[12px] transition-all duration-200 bg-gray-100 text-gray-700 bg-gray-200`}
        >
          Кликл
        </button> */}

        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab)}
            className={`lg:px-5 lg:py-2.5 rounded-t-lg font-semibold min-w-max lg:text-sm px-3 py-3 text-[12px] transition-all duration-200 ${activeTab === tab.id ? 'bg-[#4A85F6] text-white shadow-md' : 'bg-gray-100 text-gray-700 bg-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[1fr] lg:grid-cols-[1fr_auto] gap-6 pb-8 max-h-[90vh] h-[90vh] lg:mb-0 mb-10">

        <SchemeViewer
          listSensore={listSensore}
          setInfo={handleChangeImage}
          points={list}
          tabScheme={tabScheme}
          setSchemeObjectData={setSchemeObjectData}
          switchColo={switchColo}
        />
        {focusHardware !== 0 && focusSchemeObject === 0 && (
          <HardwareCard
            key={focusHardware}
            className={`panel-scheme__info  ${fade ? "fade-out" : "fade-in"}`}
            id={focusHardware}
            onClick={handleChangeImage}
          />
        )}
        {focusSchemeObject !== 0 && (
          <FormSchemaObject
            key={focusSchemeObject}
            onClick={handleChangeImage}
            className={`panel-scheme__info ${fade ? "fade-out" : "fade-in"}`} />
        )}
      </div>
    </div>
  );
});
