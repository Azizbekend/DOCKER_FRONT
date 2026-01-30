import { BlockContainer } from '@/packages/shared-components/container-blocks/block-container';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import mmrgl from 'mmr-gl';
import mapPl from '../../pages/registry-map/assets/map-pl.png';

{/* Карта (убрана, но оставлена для будущего использования) */ }

export const MapBlock = observer(() => {

    useEffect(() => {
        const getImage = document.createElement('img');
        getImage.src = mapPl;

        mmrgl.accessToken = 'RSb56d5332e76e56dc4edfc97969872b43ee310869573b956b8912c5746da814';

        const map = new mmrgl.Map({
            container: 'map',
            zoom: 10,
            center: [49.495274, 55.957421],
            style: 'mmr://api/styles/main_style.json',
        });

        var marker = new mmrgl.Marker({
            element: getImage,
            draggable: false,
            pitchAlignment: 'map',
        })
            .setLngLat([49.495274, 55.957421])
            .addTo(map);
    }, []);


    return (

        <BlockContainer title="Расположение">
            <div className="h-80 bg-gray-100 rounded-lg">
                <div id="map" className="w-full h-full rounded-xl shadow-sm" />
            </div>
        </BlockContainer>
    );
});