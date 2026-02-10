import "./index.scss";
import { useEffect, useState } from 'react';
import { HardwareCard } from "./components/info-hardware/index.js";
import { schemeModel } from "./model/scheme-model.js";
import { observer } from "mobx-react-lite";
import { FormSchemaObject } from "./components/form-schema-object.js";
import { tabs } from "./data/data.js";
import { SchemeViewer } from "./components/scheme-viewer/ViewScheme.js";
import { FormSchemaSensore } from "./components/form-schema-sensore.js";

export const Scheme = observer(() => {
  const { focusHardwareStatus, init, list, focusHardware, listSensore, focusSchemeObject, switchColo, focusSchemeSensore, setFocusHardware, setSchemeObjectData, setSchemeSensoreData, timesFunctions, model } = schemeModel;
  const [tabScheme, setTabScheme] = useState<number>(6);


  useEffect(() => {
    const ids = tabs.map((tab) => tab.schemeId)
    init(ids);
  }, []);

  return (
    <div className="informations-dispatch__scheme scheme-dispatch relative mt-8">
      <div className="absolute top-[-40px]  max-w-full flex gap-2  overflow-x-auto px-[10px] ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTabScheme(tab.schemeId)}
            className={`xl:px-5 xl:py-2.5 rounded-t-xl font-semibold min-w-max xl:text-sm px-2 py-3 text-[14px] transition-all duration-200 ${tabScheme === tab.schemeId ? 'bg-[#4A85F6] text-white shadow-md' : 'bg-gray-100 text-gray-700 bg-gray-200'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid relative grid-cols-[1fr] xl:grid-cols-[1fr_auto] gap-6 xl:pb-8 max-h-[90vh] h-[90vh] xl:max-h-screen xl:h-[100vh] mb-0 xl:mb-10  rounded-2xl">
        <SchemeViewer
          listSensore={listSensore}
          points={list}
          tabScheme={tabScheme}
          setInfo={setFocusHardware}
          setSchemeObjectData={setSchemeObjectData}
          setSchemeSensoreData={setSchemeSensoreData}
          switchColo={switchColo}
          timesFunctions={timesFunctions}
          model={model}
        />
        {focusHardware !== 0 && (
          <HardwareCard
            id={focusHardware}
            key={focusHardware}
            className={`bg-white rounded-lg p-[30px]`}
            onClick={setFocusHardware}
            focusHardwareStatus={focusHardwareStatus}
          />
        )}
        {focusSchemeObject !== 0 && (
          <FormSchemaObject
            key={focusSchemeObject}
            onClick={setSchemeObjectData}
            className={`bg-white rounded-lg p-[30px]`} />
        )}
        {focusSchemeSensore !== 0 && (
          <FormSchemaSensore
            key={focusSchemeSensore}
            id={focusSchemeSensore}
            onClick={setSchemeSensoreData}
            className={`bg-white rounded-lg p-[30px]`}
          />
        )}
      </div>
    </div>
  );
});
