import { DocumentTestType } from "@/packages/entities/documents/type";

export const documents: DocumentTestType[] = [
    {
        id: 1,
        number: "1",
        name: "Фотоотчет",
        type: "Фотоотчет",
        date: "2025-06-02 00:00:00",
        changedDate: "25.06.2025, 10:28:11",
        ekn: "253755699",
        changedBy: "Сидоров Андрей",
        fileUrl: "/docs/photo-report.pdf",
        category: "EXPLOITATION"
    },
    {
        id: 2,
        number: "16-1-1-2-065197.2023",
        name: "Заключение государственной экспертизы",
        type: "Заключение экспертизы",
        date: "2023-10-27 10:56:45",
        changedDate: "29.12.2025, 01:23:16",
        ekn: "253755699",
        changedBy: "Сидоров Андрей",
        fileUrl: "/docs/expertise-conclusion.pdf",
        category: "PIR"
    },
    {
        id: 3,
        number: "2165301484323000017",
        name: "Выполнение проектно-изыскательских работ",
        type: "Договор",
        date: "2023-09-12 12:51:14",
        changedDate: "29.12.2025, 02:28:06",
        ekn: "253755699",
        changedBy: "Сидоров Андрей",
        fileUrl: "/docs/survey-works.pdf",
        category: "PIR"
    },
    {
        id: 4,
        number: "2165301484325000007",
        name: "Реконструкция водовода в г. Лениногорск",
        type: "Договор",
        date: "2025-03-21 09:00:41",
        changedDate: "29.12.2025, 01:06:24",
        ekn: "253755699",
        changedBy: "Сидоров Андрей",
        fileUrl: "/docs/water-pipe-reconstruction.pdf",
        category: "ITD"
    },
    {
        id: 5,
        number: "2165301484325000021",
        name: "Выполнение работ по реконструкции",
        type: "Договор",
        date: "2025-10-20 00:00:00",
        changedDate: "29.12.2025, 01:06:24",
        ekn: "253755699",
        changedBy: "Сидоров Андрей",
        fileUrl: "/docs/reconstruction-works.pdf",
        category: "ITD"
    },
    {
        id: 6,
        number: "КСГ",
        name: "План работ",
        type: "План работ",
        date: "2025-07-08 00:00:00",
        changedDate: "08.07.2025, 11:18:48",
        ekn: "253755699",
        changedBy: "Сидоров Андрей",
        fileUrl: "/docs/work-plan.pdf",
        category: "EXPLOITATION"
    },
    {
        id: 7,
        number: "КСГ",
        name: "План работ",
        type: "План работ",
        date: "2025-07-08 00:00:00",
        changedDate: "08.07.2025, 11:18:48",
        ekn: "253755699",
        changedBy: "Сидоров Андрей",
        fileUrl: "/docs/work-plan-2.pdf",
        category: "EXPLOITATION"
    },
    {
        id: 8,
        number: "КСГ",
        name: "План работ",
        type: "План работ",
        date: "2025-07-08 00:00:00",
        changedDate: "08.07.2025, 11:18:48",
        ekn: "253755699",
        changedBy: "Сидоров Андрей",
        fileUrl: "/docs/work-plan-3.pdf",
        category: "EXPLOITATION"
    }
];

// Категории с иконками
export const categories = [
    { key: 'all', name: 'Все документы', icon: 'folder' },
    { key: 'PIR', name: 'ПИР', icon: 'design' },
    { key: 'ITD', name: 'ИТД', icon: 'technical' },
    { key: 'EXPLOITATION', name: 'Эксплуатация', icon: 'maintenance' }
];