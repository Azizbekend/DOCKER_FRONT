
import infoCom1 from "../assets/info-com-1.jpg";
import infoCom2 from "../assets/info-com-2.jpg";
import infoCom3 from "../assets/info-com-3.jpg";
import infoCom4 from "../assets/info-com-4.jpg";
import infoCom5 from "../assets/5278676053201194684.jpg";

import { CountersType, HardWareStatus, InformationsComponentsType, SchemeViewerPointType } from "../types/type";

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
    { top: "48%", left: "5%", size: [18, 18], label: "Насос Н4.1 рецикла", id: 1, accident: true, },
    { top: "7%", left: "17%", size: [47, 47], label: "Барабанное сито №1", id: 2, accident: true, },
    { top: "25%", left: "17%", size: [47, 47], label: "Барабанное сито №2", id: 3, accident: true, },
    { top: "25%", left: "23%", size: [117, 68], label: "Песколовка №1", id: 5, accident: true, },
    { top: "8%", left: "23%", size: [117, 68], label: "Песколовка №2", id: 4, accident: true, },
    { top: "30.5%", left: "36%", size: [25, 25], label: "Мешалка усреднителя №1", id: 6, accident: true, },
    { top: "30.5%", left: "40.5%", size: [25, 25], label: "Мешалка усреднителя №2", id: 7, accident: true, },
    { top: "30.5%", left: "45.5%", size: [25, 25], label: "Мешалка усреднителя №3", id: 8, accident: true, },
    {
        top: "25.5%",
        left: "77.8%",
        size: [41, 10],
        label: "Тестовый мен",
        id: 8,
        accident: true,
        control: {
            type: "auto",
            top: "-65%",
            left: "70%"
        },
        status: HardWareStatus.OK,
        image: "permeate-pump"
    },
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