export interface datainptType {
    title: string,
    items: datainptTypeItem[]
}

export interface datainptTypeItem {
    name: string,
    value: string,
    type: "text" | "boolean"
}


export interface xarakterType {
    title: string,
    items: xarakterTypeItem[]
}

export interface xarakterTypeItem {
    name: string,
    value: string,
}

export const datainpt: datainptType[] = [
    {
        title: "Параметры насоса пермеата",
        items: [
            {
                name: "Нижний предел шкалы OP",
                value: "24",
                type: "text"
            },
            {
                name: "Верхний предел шкалы OP",
                value: "24",
                type: "boolean"
            },
            {
                name: "Нижняя граница ограничения OP",
                value: "24",
                type: "text"
            },
            {
                name: "Верхняя граница ограничения OP",
                value: "24",
                type: "boolean"
            },
            {
                name: "Значение OP в ручном режиме",
                value: "24",
                type: "text"
            },
            {
                name: "Зона нечувствительности",
                value: "24",
                type: "text"
            },
            {
                name: "Коэффициент пропорциональности",
                value: "24",
                type: "text"
            },
            {
                name: "Уставка процесса",
                value: "24",
                type: "text"
            },
            {
                name: "Выход ПИД регулятора в Real 24",
                value: "24",
                type: "text"
            },
            {
                name: "Нижний предел шкалы PV",
                value: "24",
                type: "text"
            },
            {
                name: "Верхний предел шкалы PV",
                value: "24",
                type: "text"
            },
            {
                name: "Единица измерения PV",
                value: "24",
                type: "text"
            },
            {
                name: "Формат PV",
                value: "24",
                type: "text"
            },
        ]
    },
    {
        title: "Параметры датчика температуры насоса пермеата",
        items: [
            {
                name: "Режим симуляции ",
                value: "24",
                type: "text"
            },
            {
                name: "Значение симуляции",
                value: "24",
                type: "text"
            },
            {
                name: "Нижний предел шкалы датчика",
                value: "24",
                type: "text"
            },
            {
                name: "Верхний предел шкалы датчика ",
                value: "24",
                type: "text"
            },
            {
                name: "Гистерезис",
                value: "24",
                type: "text"
            },
            {
                name: "Верхняя аварийная уставка",
                value: "24",
                type: "text"
            },
            {
                name: "Верхняя предупредительная уставка ",
                value: "24",
                type: "text"
            },
            {
                name: "Нижняя предупредительная уставка",
                value: "24",
                type: "text"
            },
            {
                name: "Нижняя аварийная уставка",
                value: "24",
                type: "text"
            },
        ]
    }
]


export const xarakter: xarakterType[] = [
    {
        title: "Параметры насоса пермеата ",
        items: [
            {
                name: "Время наработки",
                value: "14 ч."
            },
            {
                name: "Обратная связь в формате шкалы OP",
                value: "50 Гц. 100%"
            },
            {
                name: "Текущие показания тока",
                value: "А"
            },
        ]
    }
]