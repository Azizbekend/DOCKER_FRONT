import React, { useState } from 'react';
import InfoCart from './components/infoCard.jsx';
import { observer } from 'mobx-react-lite';
import mapPl from './assets/map-pl.png';
import { Icon } from "@/shared/ui/icon"

import mmrgl from 'mmr-gl';
import { useEffect } from 'react'
import 'mmr-gl/dist/mmr-gl.css';
import { Link } from "react-router-dom";

export const MapObjects = observer(() => {


    const getImage = document.createElement('img');
    getImage.src = mapPl;

    useEffect(() => {
        mmrgl.accessToken = 'RSb56d5332e76e56dc4edfc97969872b43ee310869573b956b8912c5746da814';

        const map = new mmrgl.Map({
            container: 'map',
            zoom: 10,
            center: [49.349157, 55.858397],
            style: 'mmr://api/styles/main_style.json',
        })

        var marker = new mmrgl.Marker({
            element: getImage,
            // color: "#FFFFFF",
            draggable: false
        })
            .setLngLat([49.497765, 55.797557])
            .addTo(map);

        marker.getElement().addEventListener('click', () => {
            handleMarkerClick(true, 1);
        });
    }, [])

    const [activeCart, setActiveCart] = useState(false);
    const [idActiveCart, setIdActiveCart] = useState(null);
    const points = [
        { id: 1, coords: [55.75, 37.61], hint: 'Объекты эксплуатации 1', description: 'Описание точки 1' },
    ];

    const handleMarkerClick = (value, id) => {
        setActiveCart(value);
        setIdActiveCart(id);
    };


    return (

        <>
            <div className="account__map map-account h-[90vh]" >
                <div className="map-account__map-container">
                    <div id="map" className='map-account__map' />
                </div>


                <div className="map-account__panel panel-map">
                    {activeCart
                        ?
                        <InfoCart className={`${activeCart ? " _active" : ""}  panel-map__info`} onClick={() => handleMarkerClick(false, null)} />
                        :
                        <div className="panel-map__container">
                            <div className="panel-map__links">

                                {points.map((point) => (

                                    <div className={`panel-map__btn  ${idActiveCart === point.id && "_active"}`} key={point.id} onClick={() => handleMarkerClick(true, point.id)}>
                                        <span>{point.hint}</span>
                                    </div>

                                ))}

                            </div>
                        </div>
                    }
                </div>
            </div>

        </>
    );
})