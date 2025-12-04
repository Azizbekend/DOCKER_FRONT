// import { Modal } from "@/app/cores/core-trieco/UIKit";
// import sewerMapModel from "../models/sewer-map-model";
// import { observer } from "mobx-react-lite";
// import { useLayoutEffect, useRef } from "react";
// import mapVKModel from "@/app/cores/core-trieco/UIKit/mapVK/model/mapVK-model";
// import mmrgl from 'mmr-gl';

// export const SewerMapModal = observer(() => {
//     const { isShow, setShow, unsubscribe } = sewerMapModel;
//     const { modelMap } = mapVKModel;

//     const mapContainer = useRef<HTMLDivElement | null>(null);
//     const mapRef = useRef<mmrgl.Map | null>(null);

//     useLayoutEffect(() => {
//         const timeoutId = setTimeout(() => {
//             if (!isShow || !mapContainer.current) return;

//             mmrgl.accessToken = modelMap.token;

//             const map = new mmrgl.Map({
//                 container: mapContainer.current,
//                 zoom: modelMap.initialZoom,
//                 center: modelMap.initialCenter,
//                 style: 'mmr://api/styles/main_style.json',
//                 hash: true,
//             });

//             mapRef.current = map;
//             return () => {
//                 map.remove();
//                 mapRef.current = null;
//             };
//         }, 300);

//         return () => clearTimeout(timeoutId);
//     }, [isShow, modelMap.initialCenter, modelMap.initialZoom, modelMap.token]);

//     return (
//         <Modal title="Отслеживание местоположения" show={isShow} setShow={setShow} onExit={() => { unsubscribe(adminModel.user?.id || 0); }} className="w-[40%]">
//             <div className="mt-1 flex flex-col gap-4">
//                 <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
//             </div>
//         </Modal>
//     );
// });