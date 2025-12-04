import { Modal } from "@/app/cores/core-trieco/UIKit";
import sewerMapModel from "../models/sewer-map-model";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import mapVKModel from "@/app/cores/core-trieco/UIKit/mapVK/model/mapVK-model";
import mmrgl, { Map, MapLibreGL } from 'mmr-gl';
import { getAdressCoordinates } from "@/app/cores/core-trieco/UIKit/mapVK/mapVk-functions";
import { useAuth } from "@/entities/user/context";

export const SewerMapModal = observer(() => {
    const { isShow, setShow, longitude, latitude, unsubscribe, handleCoordinates } = sewerMapModel
    const { modelMap } = mapVKModel

    // ===РАБОТА С КАРТОЙ===
    // Ссылки на блок карты
    const mapContainer = useRef<HTMLDivElement | null>(null);
    // Ссылка на карту 
    const mapRef = useRef<mmrgl.Map | null>(null);
    //! Маркер пока что отсутсвтует 

    const { user } = useAuth();

    // Полечение данных по координатам
    useEffect(() => {
        if (!mapContainer.current) return;

        // Инициализация карты
        mmrgl.accessToken = modelMap.token;

        const map = new mmrgl.Map({
            container: mapContainer.current,
            zoom: modelMap.initialZoom,
            center: modelMap.initialCenter,
            style: 'mmr://api/styles/main_style.json',
            hash: true,
        });
        mapRef.current = map;

        //! Вставление маркера
        // var marker = new mmrgl.Marker({
        //     pitchAlignment: "map",
        // })
        // markerRef.current = marker;

        var geolocate = new mmrgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        map.addControl(geolocate);
        map.on('load', function () {
            geolocate.trigger();
        });

        // Обработчик клика для получения координат
        const handleMapClick = async (e: mmrgl.MapMouseEvent & { lngLat: mmrgl.LngLat; }) => {
            map.setCenter([e.lngLat.lng, e.lngLat.lat])
            // markerRef.current?.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map).getLngLat()
            // Функция для получение данных по координатам 
            // getAdressCoordinates(e.lngLat, getResultMap)
        };

        map.on('click', handleMapClick);

        // Очистка при размонтировании
        return () => {
            if (mapRef.current) {
                mapRef.current.off('click', handleMapClick);
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);
    // ===КОНЕЦ===

    return (
    <Modal title="Отслеживание местоположения" show={isShow} setShow={setShow} onExit={() => { unsubscribe(user?.id || 0); }} className="w-[40%]">
            <div className="mt-1 flex flex-col gap-4">
                <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
            </div>
        </Modal>
    )
})