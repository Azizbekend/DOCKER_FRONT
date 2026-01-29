
// Пример данных для таблиц (замените на реальные)
export const techSpecs = [
    { id: 1, name: "Производительность суточная", projectValue: "250", actualValue: "по расчету ноды", unit: "м³/сут", graph: "(муляж кнопки)" },
    { id: 2, name: "Производительность часовая", projectValue: "10,4", actualValue: "по расчету ноды", unit: "м³/ч", graph: "(муляж кнопки)" },
    { id: 3, name: "Электроэнергия", projectValue: "92,3", actualValue: "по расчету ноды", unit: "кВт/ч", graph: "(муляж кнопки)" },
    { id: 4, name: "Водоснабжение", projectValue: "0,6", actualValue: "по расчету ноды", unit: "м³/сут", graph: "(муляж кнопки)" },
];

export const sludgeStats = [
    { id: 11, name: "Избыточный активный ил (влажный)", area: "Аэробный стабилизатор", projectConsumption: "142,6", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
    { id: 12, name: "Избыточный активный ил (обезвоженный)", area: "Обезвоживатель", projectConsumption: "6,2", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
    { id: 13, name: "Отбросы", area: "Барабанное сито", projectConsumption: "0,93", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
    { id: 14, name: "Пескопульпа", area: "Песколовка", projectConsumption: "0,93", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
];

export const staticData = [
    {
        "id": 0,
        "indicates": "180",
        "plcNodeId": "PLC01_TANK_LEVEL",
        "timeStamp": "2026-01-29T10:15:22.450Z"
    },
    {
        "id": 1,
        "indicates": "160",
        "plcNodeId": "PLC02_PRESSURE",
        "timeStamp": "2026-01-29T10:15:23.120Z"
    },
    {
        "id": 2,
        "indicates": "140",
        "plcNodeId": "PLC01_REACTOR_TEMP",
        "timeStamp": "2026-01-28T10:15:24.850Z"
    },
    {
        "id": 3,
        "indicates": "120",
        "plcNodeId": "PLC03_MOTOR_STATUS",
        "timeStamp": "2026-01-28T10:15:25.560Z"
    },
    {
        "id": 4,
        "indicates": "100",
        "plcNodeId": "PLC02_FLOW_RATE",
        "timeStamp": "2026-01-27T10:15:26.990Z"
    },
    {
        "id": 5,
        "indicates": "90",
        "plcNodeId": "PLC01_VALVE_POS",
        "timeStamp": "2026-01-27T10:15:27.340Z"
    },
    {
        "id": 6,
        "indicates": "80",
        "plcNodeId": "MAIN_PLC_ALARM",
        "timeStamp": "2026-01-27T10:15:28.770Z"
    },
    {
        "id": 7,
        "indicates": "70",
        "plcNodeId": "PLC03_PH_VALUE",
        "timeStamp": "2026-01-26T10:15:30.210Z"
    },
    {
        "id": 8,
        "indicates": "60",
        "plcNodeId": "SCADA_THROUGHPUT",
        "timeStamp": "2026-01-26T10:15:31.005Z"
    },
    {
        "id": 9,
        "indicates": "50",
        "plcNodeId": "PLC02_PRODUCT_COUNT",
        "timeStamp": "2026-01-26T10:15:32.880Z"
    }
]