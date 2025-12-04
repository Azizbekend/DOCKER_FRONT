import image from "../assets/info-cart.png";
import arrowBlue from "../assets/arrow-blue.svg";
import { Icon } from "@/shared/ui/icon"
import { Link } from "react-router-dom";


export default function InfoCart({ className, onClick }) {

    const information = [
        { name: 'Проектная производительность очистных сооружений', description: '250 м3/сут' },
        { name: 'Фактическая производительность очистных сооружений', description: '227 м3/сут' },
        { name: 'Фактическое потребление электроэнергии', description: '40 кВт*ч' },
    ]

    return (
        <>
            <div className={`info-card-map ${className}`}>
                <div className="info-card-map__body">

                    <div className="flex items-center gap-3 mb-8">
                        <button onClick={() => onClick()}>
                            <img draggable="false"
                                src={arrowBlue}
                                alt=""
                            />
                        </button>


                        <span className="font-bold text-[25px] leading-[27px]">Очистные сооружения <br /> БОС Кайбицы</span>
                    </div>


                    <div className="info-card-map__image">
                        <img src={image} alt="Info" />
                    </div>

                    <div className="info-card-map__content">

                        <div className="info-card-map__item">
                            <div className="info-card-map__name _title">Наименование параметра</div>
                            <div className="info-card-map__description _title">Информация</div>
                        </div>

                        {information.map((info, key) => (

                            <div className="info-card-map__item" key={key}>
                                <div className="info-card-map__name">{info.name}</div>
                                <div className="info-card-map__description">{info.description}</div>
                            </div>

                        ))}

                    </div>

                    <Link to='/domain/passport' className="bg-[var(--clr-accent)] py-[9px] px-[10px] rounded-lg text-white font-bold hover:opacity-50 duration-300 mt-5 ml-auto block w-fit">Подробнее об объекте</Link>
                </div>
            </div>

        </>
    )
}