export const styleColorEnum = {
    blue: 'bg-blue-500 text-white hover:bg-blue-600',
    red: 'bg-red-500 text-white hover:bg-red-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
    gray: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
    yellow: 'bg-yellow-300 text-yellow-700 hover:bg-yellow-400',

    greenOutline: 'border border-green-500 text-green-500 hover:bg-green-50',
    blueOutline: 'border border-blue-500 text-blue-500 hover:bg-blue-50',
    redOutline: 'border border-red-500 text-red-500 hover:bg-red-50',
    grayOutline: 'border border-gray-500 text-gray-500 hover:bg-gray-50',
} as const;

export type StyleColor = keyof typeof styleColorEnum;



export const panelTabs = ['Обзор', 'Управление', 'Сервис']