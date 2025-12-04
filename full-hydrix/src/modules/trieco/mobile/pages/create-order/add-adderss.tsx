import React, { useEffect, useRef, useState } from 'react';
import createOrderModel from './entities/create-order-model';
import { Button, Input } from '@/app/cores/core-trieco/UIKit';
import { observer } from 'mobx-react-lite';
import mobileModel from '../../kernel/model/mobile-model';
import headerStore from '../../kernel/helper/header-store';
import { useNavigate } from 'react-router-dom';
import { PageCount } from './components/page-count';

import { getAdressCoordinates, getAdressList, getAdressText, getSuggestionClick } from "@/app/cores/core-trieco/UIKit/mapVK/mapVk-functions";
import mmrgl, { Map, MapLibreGL } from 'mmr-gl';
import mapVKModel from "@/app/cores/core-trieco/UIKit/mapVK/model/mapVK-model";

const YandexMapComponent: React.FC = observer(() => {


    const { user } = mobileModel;
    const { changeAddress, model, showMap, setCoords, setPage, pageCounter, changeMunicipality } = createOrderModel;

    const [isAdress, setIsAdress] = useState<boolean>(false);
    const navigate = useNavigate();

    const { modelMap } = mapVKModel

    useEffect(() => {
        headerStore.setOnBackButtonClick(() => navigate("/"))
        return () => {
            headerStore.clear();
        }
    }, [])


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
        setCoords(data.pin[1], data.pin[0])
        changeMunicipality(data.address_details.subregion)
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

            mapRef.current?.setCenter([data.pin[1], data.pin[0]])
            mapRef.current?.setZoom(15)

            //! if (mapRef.current) markerRef.current?.setLngLat([data.pin[0], data.pin[1]]).addTo(mapRef.current).getLngLat()

            changeAddress(data.address)
            setCoords(data.pin[1], data.pin[0])
            changeMunicipality(data.address_details.subregion)
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
            zoom: modelMap.initialZoom,
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
            setcenter([e.lngLat.lng, e.lngLat.lat]);
            map.setCenter([e.lngLat.lng, e.lngLat.lat])
            //! markerRef.current?.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map).getLngLat()

            // Функция для получение данных по координатам 
            getAdressCoordinates(e.lngLat, getResultMap)
        };

        map.on('click', handleMapClick);

        // Костыльно находим по адресу и полчаем соответвующий рисунок
        if (model.address) {
            getAdressText(model.address, getResultMap)
                .then((data) => {
                    map.setCenter([data.pin[0], data.pin[1]])
                })
        }

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

    if (user?.roleId === 5 && !showMap) return <></>

    return (
        <div className='px-5 w-full relative '>

            <PageCount page={pageCounter} />

            <div className="mt-5">
                <span className="font-bold text-[22px] leading-4">Укажите точку забора сточных вод</span>
            </div>
            <div className='flex flex-grow  flex-col h-min mt-5'>
                <div className='mb-[30px] w-full relative'>
                    <Input
                        value={model.address}
                        placeholder='Адрес...'
                        isRequired={true}
                        onChange={(v) => { changeAddress(v); setShow(true) }}
                        headerText='Адрес'
                        class="text-[13px]"
                        headerTextStyle="!text-[13px]"
                        onBlur={() => model.address.length > 0 ? setIsAdress(false) : setIsAdress(true)}
                        underlineText={isAdress ? "Обязательное поле" : ""}
                        underlineTextStyle="!text-[#CB0D0D]" />

                    {(suggestions.length > 0 && model.address.length > 0 && show) && (
                        <ul className='absolute z-10 bg-white border-[#4A85F6] border-[1px] rounded-lg max-h-[400px] overflow-y-auto w-full adress'>
                            {suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => { handleSuggestionClick(suggestion) }} className='adress px-3 py-2 cursor-pointer hover:bg-[#4A85F624] hover:rounded-lg'>
                                    <div className="adress">{suggestion.address}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>


                <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />


                <Button class={`w-min px-2 py-3 font-bold text-xs rounded-lg bg-[#${model.address.length > 0 ? "4A85F6" : "DCDEE3"}] mx-auto mt-[17px] mb-5`} onClick={() => { if (model.address.length > 0) setPage(2) }}>Продолжить</Button>
            </div>
        </div>
    );
})

export default YandexMapComponent;