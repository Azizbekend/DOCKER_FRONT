import { useEffect } from "react";
import { PickupPoint } from "./point";
import { observer } from "mobx-react-lite";
import pointsModel from "./model/point-model";
import { Link } from "react-router-dom";
import { useAuth } from "@/packages/entities/user/context";

export const Points = observer(() => {
  const { init, model } = pointsModel;
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      init(user.id);
    }
  }, [user]);

  return (
    <div 
      className="rounded-xl bg-white shadow-lg border border-gray-200 overflow-hidden"
      style={{ fontFamily: "'Open Sans', sans-serif" }}
    >
      {/* Заголовок */}
      <div className="p-5 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-xl font-bold text-gray-800">Точки сбора ЖБО</h3>
        <Link 
          to="pickup/create" 
          className="flex items-center gap-2 bg-[#4A85F6] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#3a6bc9] transition-colors shadow-sm"
        >
          <span>+ Добавить</span>
        </Link>
      </div>

      {/* Список точек */}
      {model.length > 0 ? (
        <div className="p-5 max-h-80 overflow-y-auto">
          <div className="space-y-4">
            {model.map(x => (
              <PickupPoint 
                key={x.pointId}
                wasteVolume={x.wasteVolume} 
                address={x.address} 
                id={x.pointId} 
                coords={{ latitude: x.latitude, longitude: x.longitude }} 
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          Нет добавленных точек сбора
        </div>
      )}
    </div>
  );
});