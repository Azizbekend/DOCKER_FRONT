import { observer } from 'mobx-react-lite';
import { stageJobModel } from '../../features/service-stage/models/task-model';
import Loader from '@/packages/shared-ui/loader/loader';
import { useEffect, useState } from 'react';
import { useAuth } from '@/packages/entities/user/context';
import { StageTaskCard } from '@/packages/shared-components/stage/stage-task-card';
import { isStageSupplyTypes } from '@/packages/functions/is-value/is-stage-types';
import { StageTaskSupplyCard } from '@/packages/shared-components/stage/stage-task-supply-card';
import { FileViewer } from '@/packages/shared-ui/file-viewer';

export const Stages = observer(() => {

  const { model, isLoaded, init, completeCommon, setTypeAction, typeAction, supplyRequestAction, completePlanetServiceCommon } = stageJobModel;
  const { user } = useAuth();

  useEffect(() => {
    init(user!.id);
  }, [])

  const [showFilePanel, setShowFilePanel] = useState<boolean>(false);
  const [showFileId, setShowFileId] = useState<number>(0);
  const [showFileType, setShowFileType] = useState<"image" | "object">("object");

  const switchShowFile = (id: number, value: boolean, type: string) => {
    console.log(type)
    setShowFileId(id);
    setShowFilePanel(value);
    setShowFileType(type == "Photo" ? "image" : "object")
  }


  return (
    <div className="informations-dispatch__requestregistry">

      {showFilePanel && <FileViewer fileId={showFileId} isOpen={showFilePanel} onClose={() => switchShowFile(0, false, "object")} type={showFileType} />}


      <div className="bg-white rounded-2xl p-7">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800 xl:text-3xl">Задачи</h1>
          <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
        </div>

        {isLoaded && <div className="flex items-center justify-center py-12"><Loader /></div>}

        {!isLoaded && model.length > 0 ? (
          <div className='space-y-4'>
            {model.map((stage) => isStageSupplyTypes(stage.stageType) ?
              <StageTaskSupplyCard
                key={stage.id}
                stage={stage}
                hardwareId={0} // ============ TODO: hardwareId 
                setTypeAction={setTypeAction}
                supplyRequestAction={supplyRequestAction}
                typeAction={typeAction}
              />
              :
              <>
                <StageTaskCard
                  key={stage.id}
                  stage={stage}
                  completeCommon={stage.stageType == "Тех. Обслуживание" ? completePlanetServiceCommon : completeCommon}
                  switchShowFile={switchShowFile}
                />
              </>
            )
            }
          </div>

        ) : (

          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-1">Нет задач</h3>
            <p className="text-gray-600">В настоящий момент нет активных задач для отображения</p>
          </div>

        )}
      </div>

    </div>
  )
})