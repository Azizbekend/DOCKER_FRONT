    import { ServiceStageType } from "../entities/service-requests/type";
import { getDate } from "../hook/get-date";

export const StageCard = ({ stage, footerBlock }: { stage: ServiceStageType; footerBlock?: React.ReactNode }) => {
  return (
    <div 
      className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow "
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Заголовок */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-bold text-gray-800">Этап {stage.id}</h3> 
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="p-4">
        {/* Описание */}
        {stage.discription && (
          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Описание</div>
            <p className="text-gray-800">{stage.discription}</p>
          </div>
        )}

        {/* Даты */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Создано</div>
            <p className="text-gray-800 font-medium">{getDate(stage.createdAt)}</p>
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Завершено</div>
            <p className="text-gray-800 font-medium">
              {stage.closedAt ? getDate(stage.closedAt) : '—'}
            </p>
          </div>
        </div>

        {/* Идентификаторы */}
        <div className="space-y-3">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Создатель</div>
              <p className="text-gray-800 font-mono text-sm">{stage.creatorId}</p>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Исполнитель</div>
              <p className="text-gray-800 font-mono text-sm">{stage.implementerId}</p>
            </div>
          </div>
        </div>

        
      </div>

      {/* Футер */}
      {footerBlock && (
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {footerBlock}
        </div>
      )}
    </div>
  );
};



// export const StageCard = ({ stage, footerBlock }: { stage: ServiceStageType, footerBlock?: React.ReactNode }) => {
//     return (
//         <div key={stage.id} className="border border-gray-200 rounded-lg p-4 mb-4">
//             <p className="text-sm font-medium text-gray-800 mb-2">Этап {stage.id}</p>
//             <p className="text-sm font-medium text-gray-800 mb-2"><b>id:</b> {stage.id}</p>
//             <p className="text-sm font-medium text-gray-800 mb-2"><b>discription:</b> {stage.discription}</p>
//             <p className="text-sm font-medium text-gray-800 mb-2"><b>stageType:</b> {stage.stageType}</p>
//             <p className="text-sm font-medium text-gray-800 mb-2"><b>cancelDiscription:</b> {stage.cancelDiscription}</p>
//             <p className="text-sm font-medium text-gray-800 mb-2"><b>serviceId:</b> {stage.serviceId}</p>

//             <p className="text-sm font-medium text-gray-800 mb-2"><b>creatorId:</b> {stage.creatorId}</p>
//             <p className="text-sm font-medium text-gray-800 mb-2"><b>implementerId:</b> {stage.implementerId}</p>
//             <p className="text-sm font-medium text-gray-800 mb-2"><b>currentStatus:</b> {stage.currentStatus}</p>
//             <p className="text-sm font-medium text-gray-800 mb-2"><b>closedAt:</b> {getDate(stage.closedAt)}</p>
//             <p className="text-sm font-medium text-gray-800 mb-2"><b>createdAt:</b> {getDate(stage.createdAt)}</p>

//             {footerBlock}
//         </div>
//     );
// }