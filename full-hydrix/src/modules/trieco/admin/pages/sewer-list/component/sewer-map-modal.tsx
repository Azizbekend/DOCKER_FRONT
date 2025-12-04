import sewerMapModel from "../models/sewer-map-model";
import { observer } from "mobx-react-lite";
import { useLayoutEffect, useRef } from "react";
import mmrgl from 'mmr-gl';
import mapVKModel from "@/shared/ui/mapVK/model/mapVK-model";
import { Modal } from "@/app/cores/core-trieco/UIKit";
import { useAuth } from "@/entities/user/context";

export const SewerMapModal = observer(() => {
    const { isShow, setShow, unsubscribe } = sewerMapModel;
    const { modelMap } = mapVKModel;

    const { user } = useAuth();

    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mmrgl.Map | null>(null);
    useLayoutEffect(() => {
        const timeoutId = setTimeout(() => {
            if (!isShow || !mapContainer.current) return;

            mmrgl.accessToken = modelMap.token;

            const map = new mmrgl.Map({
                container: mapContainer.current,
                zoom: modelMap.initialZoom,
                center: modelMap.initialCenter,
                style: 'mmr://api/styles/main_style.json',
                hash: true,
            });

            mapRef.current = map;
            return () => {
                map.remove();
                mapRef.current = null;
            };
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [isShow, modelMap.initialCenter, modelMap.initialZoom, modelMap.token]);

    return (
        <Modal title="Отслеживание местоположения" show={isShow} setShow={setShow} onExit={() => { unsubscribe(user?.id || 0); }} className="w-[40%]">
            <div className="mt-1 flex flex-col gap-4">
                <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
            </div>
        </Modal>
    );
});
