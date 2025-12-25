import React, { useEffect, useRef, useState } from 'react';
import clientModel from '../../kernel/model/client-model';
import { observer } from 'mobx-react-lite';
import mmrgl from 'mmr-gl';
import mapVKModel from '@/shared/ui/mapVK/model/mapVK-model';
import { createOrderModel } from './entities/create-order-model';
import { getAdressCoordinates, getAdressList, getAdressText, getSuggestionClick } from '@/shared/ui/mapVK/mapVk-functions';
import { Input } from '@/shared/ui/Inputs/input-text';
import { InputContainer } from '@/shared/ui/Inputs/input-container';
import { Button } from '@/shared/ui/button';

const YandexMapComponent = observer(({ getPage }: { getPage: () => void }) => {
  const { user } = clientModel;
  const { isAddress, changeAddress, model, getPoints, pickupPoints, showMap, setCoords, changeMunicipality } = createOrderModel;
  const { modelMap } = mapVKModel;

  const [showPoints, setShowPoints] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<{ address: string; address_details: any }[]>([]);
  
  // === КАРТА ===
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mmrgl.Map | null>(null);
  const markerRef = useRef<mmrgl.Marker | null>(null);
  const [center, setCenter] = useState<[number, number]>(modelMap.initialCenter);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    getPoints(user?.id);
  }, [user?.id]);

  const getResultMap = (data: any) => {
    changeAddress(data.address);
    setCoords(data.pin[1], data.pin[0]);
    changeMunicipality(data.address_details.subregion);
  };

  useEffect(() => {
    if (model.address.trim()) {
      getAdressList(model.address, setSuggestions);
      setShowDropdown(true);
      setShowPoints(false);
    } else {
      setShowDropdown(false);
      setShowPoints(true);
    }
  }, [model.address]);

  const handleSuggestionClick = async (suggestion: { address: string; address_details: any }) => {
    try {
      const data = await getSuggestionClick(suggestion.address);
      
      if (mapRef.current) {
        mapRef.current.setCenter([data.pin[0], data.pin[1]]);
        mapRef.current.setZoom(15);
        
        if (!markerRef.current) {
          markerRef.current = new mmrgl.Marker({ pitchAlignment: "map" });
        }
        markerRef.current.setLngLat([data.pin[0], data.pin[1]]).addTo(mapRef.current);
      }

      getResultMap(data);
      setShowDropdown(false);
      setShowPoints(false);
    } catch (error) {
      console.error('Ошибка при обработке адреса:', error);
    }
  };

  const handleMapClick = async (e: mmrgl.MapMouseEvent & { lngLat: mmrgl.LngLat }) => {
    const { lng, lat } = e.lngLat;
    setCenter([lng, lat]);
    
    if (mapRef.current) {
      mapRef.current.setCenter([lng, lat]);
      
      if (!markerRef.current) {
        markerRef.current = new mmrgl.Marker({ pitchAlignment: "map" });
      }
      markerRef.current.setLngLat([lng, lat]).addTo(mapRef.current);
    }

    getAdressCoordinates(e.lngLat, getResultMap);
  };

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    mmrgl.accessToken = modelMap.token;

    const map = new mmrgl.Map({
      container: mapContainer.current,
      zoom: modelMap.initialZoom,
      center: center,
      style: 'mmr://api/styles/main_style.json',
      hash: true,
    });

    mapRef.current = map;
    map.on('click', handleMapClick);

    // Геолокация или центрирование по адресу
    if (!model.address) {
      const geolocate = new mmrgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      });
      map.addControl(geolocate);
      map.on('load', () => geolocate.trigger());
    } else {
      getAdressText(model.address, getResultMap)
        .then(data => {
          map.setCenter([data.pin[0], data.pin[1]]);
          if (!markerRef.current) {
            markerRef.current = new mmrgl.Marker({ pitchAlignment: "map" });
          }
          markerRef.current.setLngLat([data.pin[0], data.pin[1]]).addTo(map);
        });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleMapClick);
        mapRef.current.remove();
        mapRef.current = null;
        markerRef.current = null;
      }
    };
  }, []);

  // Управление выпадающим списком
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.address-input-container')) {
        setShowDropdown(false);
        setShowPoints(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (user?.roleId === 5 && !showMap) return null;

  const handleAddressChange = (value: string) => {
    changeAddress(value);
  };

  return (
    <div className="mx-5 mt-10" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* Заголовок */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Выберите точку забора сточных вод</h1>
        <div className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1"></div>
      </div>

      {/* Адресная строка */}
      <div className="mb-8 relative address-input-container">
        <InputContainer
          isRequired
          headerText="Адрес"
          underlineText="Обязательное поле"
          classNames={{
            wrapper: "relative",
            children: "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 focus-within:border-[#4A85F6] focus-within:ring-1 focus-within:ring-[#4A85F6] transition-colors"
          }}
        >
          <Input
            type="text"
            value={model.address}
            onChange={handleAddressChange}
            placeholder="Начните вводить адрес..."
            className="w-full outline-none"
            onFocus={() => {
              if (model.address.trim()) {
                setShowDropdown(true);
                setShowPoints(false);
              } else {
                setShowPoints(true);
                setShowDropdown(false);
              }
            }}
          />
        </InputContainer>

        {/* Выпадающий список */}
        {(showDropdown || showPoints) && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-[#4A85F6] rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {showPoints && pickupPoints.length > 0 && (
              <>
                <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
                  Ваши точки
                </div>
                {pickupPoints.map((point, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick({ address: point.address, address_details: "" })}
                    className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    {point.address}
                  </div>
                ))}
              </>
            )}

            {showDropdown && suggestions.length > 0 && (
              <>
                {showPoints && pickupPoints.length > 0 && (
                  <div className="px-4 py-2 bg-gray-50 border-y border-gray-200 font-semibold text-gray-700">
                    Рекомендации
                  </div>
                )}
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors"
                  >
                    {suggestion.address}
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Карта */}
      <div 
        ref={mapContainer} 
        className="w-full h-[400px] rounded-xl border border-gray-200 shadow-sm mb-6"
      />

      {/* Кнопка продолжения */}
      <Button
        disabled={!isAddress()}
        onClick={getPage}
        class={` max-w-xs py-3 px-6 rounded-lg font-bold text-white transition-colors ${
          isAddress() 
            ? 'bg-[#4A85F6] hover:bg-[#3a6bc9] shadow-md hover:shadow-lg' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Продолжить
      </Button>
    </div>
  );
});

export default YandexMapComponent;
