import './Scheme-1.scss';

import bigScheme from '@assets/imgs/big.jpg'
import leftScheme from '@assets/imgs/scheme-left.jpg'
import rightScheme from '@assets/imgs/scheme-right.jpg'
import { useState } from 'react';
import InfoCart from '../../../YandexMap/infoCard';

export default function Scheme() {


    const [imgSmall, setImgSmall] = useState("");
    const [fade, setFade] = useState(false);

    const handleChangeImage = (newImg) => {
        setFade(true);

        setTimeout(() => {
            setImgSmall(newImg);
            setFade(false);
        }, 300);
    };




    return (
        <>
            <div className="informations-dispatch__scheme scheme-dispatch">

                <div className="scheme-dispatch__content">
                    <div className="scheme-dispatch__images">
                        {imgSmall && (
                            <button onClick={() => handleChangeImage("")} className='scheme-dispatch__back'>Назад</button>
                        )}

                        {!imgSmall && (
                            <div className={`scheme-dispatch__big big-scheme ${fade ? "fade-out" : "fade-in"}`}>
                                <img src={bigScheme} alt="" />

                                <div className="big-scheme__container">
                                    <div className="big-scheme__left" onClick={() => handleChangeImage(leftScheme)}>
                                        <img src={leftScheme} alt="" />
                                    </div>
                                    <div className="big-scheme__right" onClick={() => handleChangeImage(rightScheme)}>
                                        <img src={rightScheme} alt="" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {imgSmall && (
                            <div className={`scheme-dispatch__small small-scheme ${fade ? "fade-out" : "fade-in"}`}>
                                <img src={imgSmall} alt="small" />
                            </div>
                        )}
                    </div>

                    <div className="scheme-dispatch__panel panel-scheme">
                        <InfoCart className={`panel-scheme__info`} />
                    </div>
                </div>
            </div >
        </>
    )
}