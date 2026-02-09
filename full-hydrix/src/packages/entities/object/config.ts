export const tabLinks: {
    to: string,
    name: string,
}[] = [
        {
            to: "information",
            name: "Паспорт",
        },
        {
            to: "participants",
            name: "Участники",
        },
        {
            to: "hardwares",
            name: "Оборудование",
        },
        // {
        //     to: "incident",
        //     name: "Аварии",
        // },
        {
            to: "documentation",
            name: "Документация",
        },
    ]

export enum ObjectStages {
    Construction = "construction",
    Exploitation = "exploitation",
    Designing = "designing",
    Null = "null",
}


export const objectStagesLabels: Record<ObjectStages, string> = {
    [ObjectStages.Construction]: "Строительство",
    [ObjectStages.Exploitation]: "Эксплуатация",
    [ObjectStages.Designing]: "Проектирование",
    [ObjectStages.Null]: "",
};
