
import { passportModel } from '@/modules/domain/features/object/model';
import { PassportHeaderPanel } from '../../components/header-panel';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { listParticipantsModel } from '@/modules/domain/features/participants/models/list-participants-model';
import { TechSpecsBlock } from '@/modules/domain/widgets/object-passport/tech-specs-block';
import { ListParticipantsBlock } from '@/modules/domain/widgets/object-passport/list-participants-block';
import { ObjectDataBlock } from '@/modules/domain/widgets/object-passport/object-data-block';
import { DocumentListBlock } from '@/modules/domain/widgets/object-passport/document-list-block';
import { ReagentStatsBlock } from '@/modules/domain/widgets/object-passport/reagent-stats-block';
import { SludgeStatsBlock } from '@/modules/domain/widgets/object-passport/sludge-stats-block';
import { ImageBlock } from '@/modules/domain/widgets/object-passport/image-block';
import imagePassport from '@/modules/domain/pages/passport/pages/information/assets/object-actual.jpg';
import { useEffect } from 'react';
import { InformationBlock } from '@/modules/domain/widgets/object-passport/information-block';

export const PassportInformation = observer(() => {

  const { objectId } = useParams();
  const { init: participantsInit, listParticipants } = listParticipantsModel;
  const { model, objectData, itemObjectData } = passportModel;

  useEffect(() => {
    if (objectId) {
      participantsInit(Number(objectId))
    }
  }, [])

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
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1 space-y-6">
            <ImageBlock imagePassport={imagePassport} />
            <ObjectDataBlock data={objectData} items={itemObjectData} />
            <InformationBlock />
          </div>

          <div className="xl:col-span-1 space-y-6">
            <TechSpecsBlock cards={model} />
            <SludgeStatsBlock />
            <DocumentListBlock />
          </div>

          <div className="xl:col-span-1 space-y-6">
            <ReagentStatsBlock />
            <ListParticipantsBlock list={listParticipants} />
          </div>
        </div>
      </div>
    </>
  );
});