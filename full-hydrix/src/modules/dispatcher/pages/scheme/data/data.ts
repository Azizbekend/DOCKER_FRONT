
import infoCom1 from "../assets/info-com-1.jpg";
import infoCom2 from "../assets/info-com-2.jpg";
import infoCom3 from "../assets/info-com-3.jpg";
import infoCom4 from "../assets/info-com-4.jpg";
import infoCom5 from "../assets/5278676053201194684.jpg";

import { CountersType, InformationsComponentsType, SchemeViewerPointType } from "../types/type";

export const InformationsComponents: InformationsComponentsType[] = [
    {
        title: "Насос Н4.1 рецикла",
        img: infoCom1,
        items: [
            {
                title: "Модель",
                value: "EspaDrainex 201"
            },
            {
                title: "Производительность",
                value: "4-20 м3/ч"
            },
            {
                title: "Напор",
                value: "3-10 м"
            },
            {
                title: "Поставщик",
                value: "ООО «Эспа»"
            },
            {
                title: "Производитель",
                value: "ООО «Гидрикс»"
            }
        ]
    },
    {
        title: "Барабанное сито №1",
        img: infoCom2,
        items: [
            {
                title: "Модель",
                value: "TORO TR 40/75"
            },
            {
                title: "Производительность",
                value: "10 м3/ч"
            },
            {
                title: "Поставщик",
                value: "ООО «Гидрикс»"
            },
            {
                title: "Производитель",
                value: "ООО «Гидрикс»"
            }
        ]
    },
    {
        title: "Барабанное сито №2",
        img: infoCom2,
        items: [
            {
                title: "Модель",
                value: "TORO TR 40/75"
            },
            {
                title: "Производительность",
                value: "10 м3/ч"
            },
            {
                title: "Поставщик",
                value: "ООО «Гидрикс»"
            },
            {
                title: "Производитель",
                value: "ООО «Гидрикс»"
            }
        ]
    },
    {
        title: "Песколовка №1",
        img: infoCom3,
        items: [
            {
                title: "Модель",
                value: "SPU-10"
            },
            {
                title: "Производительность",
                value: "10 м3/ч"
            },
            {
                title: "Поставщик",
                value: "ООО «Гидрикс»"
            },
            {
                title: "Производитель",
                value: "ООО «Гидрикс»"
            }
        ]
    },
    {
        title: "Песколовка №2",
        img: infoCom3,
        items: [
            {
                title: "Модель",
                value: "TORO TR 40/75"
            },
            {
                title: "Производительность",
                value: "10 м3/ч"
            },
            {
                title: "Поставщик",
                value: "ООО «Гидрикс»"
            },
            {
                title: "Производитель",
                value: "ООО «Гидрикс»"
            }
        ]
    },
    {
        title: "Мешалка усреднителя №1",
        img: infoCom4,
        items: [
            {

                title: "Модель",
                value: "Иртыш ПМ2 230-1,1/8-116"
            },
            {
                title: "Производительность",
                value: "10 м3/ч"
            },
            {
                title: "Поставщик",
                value: 'ООО "ВСМК"'
            },
            {
                title: "Производитель",
                value: 'ООО "ПЭК"'
            }
        ]
    },
    {
        title: "Мешалка усреднителя №2",
        img: infoCom4,
        items: [
            {

                title: "Модель",
                value: "Иртыш ПМ2 230-1,1/8-116"
            },
            {
                title: "Производительность",
                value: "10 м3/ч"
            },
            {
                title: "Поставщик",
                value: 'ООО "ВСМК"'
            },
            {
                title: "Производитель",
                value: 'ООО "ПЭК"'
            }
        ]
    },
    {
        title: "Мешалка усреднителя №3",
        img: infoCom5,
        items: [
            {

                title: "Модель",
                value: "Иртыш ПМ2 230-1,1/8-116"
            },
            {
                title: "Производительность",
                value: "10 м3/ч"
            },
            {
                title: "Поставщик",
                value: 'ООО "ВСМК"'
            },
            {
                title: "Производитель",
                value: 'ООО "ПЭК"'
            }
        ]
    },
];


export const points: SchemeViewerPointType[] = [
    { top: "54%", left: "54%", size: [180, 80], label: "Барабанное сито", id: 1, accident: true, image: "Барабанное сито (в работе).png", },
    { top: "48%", left: "60%", size: [180, 80], label: "Барабанное сито", id: 1, accident: true, image: "Барабанное сито (в ожидании).png", },

    { top: "33%", left: "75%", size: [180, 160], label: "Песколовка", id: 1, accident: true, image: "Песколовка (в ожидании).png", },
    { top: "41%", left: "67%", size: [180, 160], label: "Песколовка", id: 1, accident: true, image: "Песколовка (в ожидании).png", },

    { top: "7%", left: "69%", size: [180, 350], label: "Транспортер", id: 1, accident: true, image: "Транспортер (в работе).png", },

    { top: "9%", left: "57%", size: [180, 110], label: "Обезвоживатель", id: 1, accident: true, image: "Обезвоживатель (в ожидании).png", },
    { top: "18%", left: "65%", size: [180, 110], label: "Обезвоживатель", id: 1, accident: true, image: "Обезвоживатель (в работе).png", },

    { top: "40%", left: "42%", size: [180, 90], label: "Воздуходувка", id: 1, accident: true, image: "Воздуходувка (в работе).png", },
    { top: "33%", left: "35%", size: [180, 90], label: "Воздуходувка", id: 1, accident: true, image: "Воздуходувка (в ожидании).png", },
    { top: "26%", left: "28%", size: [180, 90], label: "Воздуходувка", id: 1, accident: true, image: "Воздуходувка (в ожидании).png", },

    { top: "25.6%", left: "52.5%", size: [180, 20], label: "Насос дозатор", id: 1, accident: true, image: "Насос дозатор (в ожидании).png", },
    { top: "27%", left: "50.9%", size: [180, 20], label: "Насос дозатор", id: 1, accident: true, image: "Насос дозатор (в работе).png", },

    { top: "19%", left: "36%", size: [180, 19], label: "КНС осадка", id: 1, accident: true, image: "Насос в КНС2 (в ожидании).png", },
    { top: "21%", left: "34%", size: [180, 19], label: "Насос дозатор", id: 1, accident: true, image: "Насос в КНС2 (в ожидании).png", },

    { top: "11%", left: "33%", size: [180, 10], label: "Насос дозатор", id: 1, accident: true, image: "Поплавок (низ).png", },
    { top: "15%", left: "33%", size: [180, 10], label: "Насос дозатор", id: 1, accident: true, image: "Поплавок (низ).png", },
    { top: "18%", left: "33%", size: [180, 15], label: "Насос дозатор", id: 1, accident: true, image: "Поплавок (верх).png", },
    { top: "21%", left: "33%", size: [180, 15], label: "Насос дозатор", id: 1, accident: true, image: "Поплавок (верх).png", },

    { top: "89%", left: "36%", size: [180, 21], label: "КНС основная", id: 1, accident: true, image: "Насос КНС 1 (в ожидании).png", },
    { top: "91%", left: "38%", size: [180, 21], label: "Насос дозатор", id: 1, accident: true, image: "Насос КНС 1 (в ожидании).png", },

    { top: "85%", left: "34.5%", size: [180, 10], label: "Насос дозатор", id: 1, accident: true, image: "Поплавок (низ).png", },
    { top: "88%", left: "34.5%", size: [180, 10], label: "Насос дозатор", id: 1, accident: true, image: "Поплавок (низ).png", },
    { top: "91%", left: "34.5%", size: [180, 15], label: "Насос дозатор", id: 1, accident: true, image: "Поплавок (верх).png", },
    { top: "94%", left: "34.5%", size: [180, 15], label: "Насос дозатор", id: 1, accident: true, image: "Поплавок (верх).png", },

    { top: "35%", left: "24.4%", size: [180, 20], label: "Воздуходувка", id: 1, accident: true, image: "Датчик давления.png", },
    { top: "36%", left: "23.1%", size: [180, 20], label: "Воздуходувка", id: 1, accident: true, image: "Датчик давления.png", },
];



export const CountersData: CountersType[] = [
    { id: 1, name: "Расход QF1", value: 0, unit: "м³/ч", top: "8.4%", left: "41.7%", min: 4, max: 9 },
    { id: 2, name: "Концентрация О2", value: 0, unit: "г/л", top: "8.4%", left: "51%", min: 5, max: 10 },
    { id: 3, name: "Расход QF2", value: 0, unit: "м³/ч", top: "8.4%", left: "54.7%", min: 5, max: 10 },
    { id: 4, name: "Расход QF3", value: 0, unit: "м³/ч", top: "8.4%", left: "67%", min: 5, max: 10 },
    { id: 5, name: "Уровень воды", value: 0, unit: "м", top: "8.4%", left: "70.4%", min: 5, max: 10 },
    { id: 6, name: "Давление", value: 0, unit: " кПа", top: "8.4%", left: "73.8%", min: 5, max: 10 },
    // Внизу
    { id: 7, name: "Расход QF1", value: 0, unit: "м³/ч", top: "54%", left: "41.7%", min: 4, max: 9 },
    { id: 8, name: "Концентрация О2", value: 0, unit: "г/л", top: "54%", left: "51%", min: 5, max: 10 },
    { id: 9, name: "Расход QF2", value: 0, unit: "м³/ч", top: "54%", left: "54.7%", min: 5, max: 10 },
    { id: 10, name: "Расход QF3", value: 0, unit: "м³/ч", top: "54%", left: "67%", min: 5, max: 10 },
    { id: 11, name: "Уровень воды", value: 0, unit: "м", top: "54%", left: "70.4%", min: 5, max: 10 },
    { id: 12, name: "Давление", value: 0, unit: "кПа", top: "54%", left: "73.8%", min: 5, max: 10 },

    //     top: 53%;
    // left: 25.7%;
    { id: 13, name: "Давление аэрация", value: 0, unit: "бар", top: "48%", left: "25.7%", min: 5, max: 50 },
    { id: 14, name: "ㅤДавление МБРㅤ", value: 0, unit: "бар", top: "53%", left: "25.7%", min: 5, max: 50 },
    { id: 15, name: "Расход QF4", value: 0, unit: "м³/ч", top: "24.4%", left: "94.1%", min: 4, max: 9 },
]


export const tabs = [
    { id: 0, label: "Механическая очистка", schemeId: 6 },
    { id: 1, label: "Биологическая очистка", schemeId: 8 },
    { id: 2, label: "Доочистка", schemeId: 9 },
];