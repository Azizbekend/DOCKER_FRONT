
// Пример данных для таблиц (замените на реальные)
export const techSpecs = [
    { id: 1, name: "Производительность суточная", projectValue: "250", actualValue: "по расчету ноды", unit: "м³/сут", graph: "(муляж кнопки)" },
    { id: 2, name: "Производительность часовая", projectValue: "10,4", actualValue: "по расчету ноды", unit: "м³/ч", graph: "(муляж кнопки)" },
    { id: 3, name: "Электроэнергия", projectValue: "92,3", actualValue: "по расчету ноды", unit: "кВт/ч", graph: "(муляж кнопки)" },
    { id: 4, name: "Водоснабжение", projectValue: "0,6", actualValue: "по расчету ноды", unit: "м³/сут", graph: "(муляж кнопки)" },
];

export const reagentStats = [
    { id: 1, name: "Коагулянт Аквапак 30", area: "Удаление фосфатов", projectConsumption: "6,15", actualConsumption: "Поле ввода", unit: "кг/сут", economy: "формула %" },
    { id: 2, name: "Флокулянт Аквафлок 650", area: "Обезвоживание осадка", projectConsumption: "0,09", actualConsumption: "Поле ввода", unit: "кг/сут", economy: "формула %" },
    { id: 3, name: "Щавелевая кислота", area: "Промывка ламп УФО", projectConsumption: "0,1", actualConsumption: "Поле ввода", unit: "кг/мес", economy: "формула %" },
    { id: 3, name: "Щавелевая кислота", area: "Хим.промывка МБР", projectConsumption: "43,5", actualConsumption: "Поле ввода", unit: "кг/год", economy: "формула %" },
    { id: 4, name: "Гипохлорит натрия ГОСТ 11086-76 марка А", area: "Хим.промывка МБР", projectConsumption: "50", actualConsumption: "Поле ввода", unit: "кг/мес", economy: "формула %" },
];

export const sludgeStats = [
    { id: 1, name: "Избыточный активный ил (влажный)", area: "Аэробный стабилизатор", projectConsumption: "142,6", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
    { id: 2, name: "Избыточный активный ил (обезвоженный)", area: "Обезвоживатель", projectConsumption: "6,2", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
    { id: 3, name: "Отбросы", area: "Барабанное сито", projectConsumption: "0,93", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
    { id: 4, name: "Пескопульпа", area: "Песколовка", projectConsumption: "0,93", actualConsumption: "Поле ввода", unit: "м³/мес", economy: "формула %" },
];