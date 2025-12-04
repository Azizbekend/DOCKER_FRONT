// ===РАБОТА С КАРТОЙ===
// Ссылки на блок карты
const mapContainer = useRef<HTMLDivElement | null>(null);
// Ссылка на карту 
const mapRef = useRef<mmrgl.Map | null>(null);
// Ссылка на маркер
const markerRef = useRef<mmrgl.Marker | null>(null);

// Переменная для централизации карты по координатам
const [center, setcenter] = useState<[number, number]>(modelMap.initialCenter);
// Открытие списка найденных адресов
const [show, setShow] = useState<boolean>(false);
// Хранитель найденных адресов
const [suggestions, setSuggestions] = useState<{ address: string; address_details: any }[]>([]);

// Функция записи полученных данных
const getResultMap = (data: any) => {
    changeAddress(data.address, data.pin[1], data.pin[0])
    // changeMunicipality(data.address_details.subregion)
}

// Поиск адреса по запросу
useEffect(() => {
    getAdressList(currentPlant.adress, setSuggestions)
}, [currentPlant.adress])

// Выбор адреса из списка найденных
const handleSuggestionClick = async (suggestion: { address: string; address_details: any }) => {
    try {
        // Фунция для получения данных по адресу из списка найденных
        const data = await getSuggestionClick(suggestion.address);

        mapRef.current?.setCenter([data.pin[0], data.pin[1]])
        mapRef.current?.setZoom(15)

        if (mapRef.current) markerRef.current?.setLngLat([data.pin[0], data.pin[1]]).addTo(mapRef.current).getLngLat()

        changeAddress(data.address, data.pin[1], data.pin[0])
        // changeMunicipality(data.address_details.subregion)
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
        markerRef.current?.setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map).getLngLat()

        // Функция для получение данных по координатам 
        getAdressCoordinates(e.lngLat, getResultMap)
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