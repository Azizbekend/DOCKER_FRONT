import { useEffect, useRef, useState } from "react";
import editPointModel from "./model/edit-point-model";
import { observer } from "mobx-react-lite";

import { getAdressCoordinates, getAdressList, getAdressText, getSuggestionClick } from "@/shared/ui/mapVK/mapVk-functions";
import mmrgl, { Map, MapLibreGL } from 'mmr-gl';
import mapVKModel from "@/shared/ui/mapVK/model/mapVK-model";
import { Input } from "@/shared/ui/GIS";
import { Button } from "@/shared/ui/button";

export const EditPointView = observer(() => {
    const { isAddress, changeAddress, model, edit, changeWasteVolume } = editPointModel;
    const { modelMap } = mapVKModel;

    // ===РАБОТА С КАРТОЙ===
    // Ссылки на блок карты
    const mapContainer = useRef<HTMLDivElement | null>(null);
    // Ссылка на карту 
    const mapRef = useRef<mmrgl.Map | null>(null);
    //! Ссылка на маркер
    // const markerRef = useRef<mmrgl.Marker | null>(null);

    // Переменная для централизации карты по координатам
    const [center, setcenter] = useState<[number, number]>(modelMap.initialCenter);
    // Открытие списка найденных адресов
    const [show, setShow] = useState<boolean>(false);
    // Хранитель найденных адресов
    const [suggestions, setSuggestions] = useState<{ address: string; address_details: any }[]>([]);

    // Функция записи полученных данных
    const getResultMap = (data: any) => {
        changeAddress(data.address)
        model.longitude = data.pin[0]
        model.latitude = data.pin[1]
    }

    // Поиск адреса по запросу
    useEffect(() => {
        getAdressList(model.address, setSuggestions)
    }, [model.address])

    // Выбор адреса из списка найденных
    const handleSuggestionClick = async (suggestion: { address: string; address_details: any }) => {
        try {
            // Фунция для получения данных по адресу из списка найденных
            const data = await getSuggestionClick(suggestion.address);

            mapRef.current?.setCenter([data.pin[0], data.pin[1]])
            mapRef.current?.setZoom(15)

            //! if (mapRef.current) markerRef.current?.setLngLat([data.pin[0], data.pin[1]]).addTo(mapRef.current).getLngLat()

            changeAddress(data.address)
            model.longitude = data.pin[0]
            model.latitude = data.pin[1]
            setSuggestions([]);
            setShow(false)

        } catch (error) {
            console.error('Ошибка при обработке адреса:', error);
        }
    };

    // Закрытие списка рекомендованных
    const handleMouseDown = (event: any) => {
        if (!event.target.className.includes("adress")) {
            setShow(false)
        }
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        return () => { document.removeEventListener('mousedown', handleMouseDown) }
    }, []);

    // Полечение данных по координатам
    useEffect(() => {

        if (!mapContainer.current) return;

        // Инициализация карты
        mmrgl.accessToken = modelMap.token;

        const map = new mmrgl.Map({
            container: mapContainer.current,
            zoom: 16,
            center: center,
            style: 'mmr://api/styles/main_style.json',
            hash: true,
        });
        mapRef.current = map;

        //! Вставление маркера
        // var marker = new mmrgl.Marker({
        //     pitchAlignment: "map",
        // })
        // markerRef.current = marker;

        // Обработчик клика для получения координат
        const handleMapClick = async (e: mmrgl.MapMouseEvent & { lngLat: mmrgl.LngLat; }) => {
            setcenter([e.lngLat.lng, e.lngLat.lat]);
            map.setCenter([e.lngLat.lng, e.lngLat.lat])
            // markerRef.current?.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map).getLngLat()

            // Функция для получение данных по координатам 
            getAdressCoordinates(e.lngLat, getResultMap)
        };

        map.on('click', handleMapClick);

        // Костыльно находим по адресу и полчаем соответвующий рисунок
        getAdressText(model.address, getResultMap)
            .then((data) => {
                map.setCenter([data.pin[0], data.pin[1]])
            })


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
        <>
            <div className="mb-9">
                <span className="font-bold text-[34px]">Изменение точки забора сточных вод</span>
            </div>
            <div>
                <div className='mb-[30px] w-full relative'>
                    <Input
                        value={model.wasteVolume}
                        onChange={(v) => changeWasteVolume(v)}
                        placeholder=''
                        type="number"
                        isRequired={true}
                        headerText='Объем' underlineText='Обязательное поле' />
                    <Input
                        value={model.address}
                        onChange={(v) => { setShow(true); changeAddress(v) }}
                        placeholder='Адрес...'
                        isRequired={true}
                        headerText='Адрес' underlineText='Обязательное поле' />

                    {(suggestions.length > 0 && model.address.length > 0 && show) && (
                        <ul className='absolute z-10 bg-white border-[#4A85F6] border-[1px] rounded-lg max-h-[400px] overflow-y-auto w-full adress'>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => { handleSuggestionClick(suggestion) }} className='adress px-3 py-2 cursor-pointer hover:bg-[#4A85F624] hover:rounded-lg'>
                                    <div className="adress">{suggestion.address}</div>
                                    <div style={{ fontSize: '0.8em', color: '#666' }}>{suggestion.address}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />

                <Button
                    onClick={() => edit()}
                    disabled={!isAddress}
                    children="Изменить"
                    class='bg-[#4A85F6] text-white rounded-lg max-w-[242px] w-full flex items-center justify-center font-bold text-[17px] mt-8' />
            </div>
        </>
    );
})