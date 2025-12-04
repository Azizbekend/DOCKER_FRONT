import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Tooltip,
    ChartOptions,
    ChartData,
    Filler,
} from 'chart.js';
import { observer } from 'mobx-react-lite';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Tooltip,
    Filler
);

interface DataSet {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    pointBackgroundColor: string;
    pointBorderColor: string;
    pointHoverBackgroundColor: string;
    pointHoverBorderColor: string;
}

interface Props {
    title?: string;
    dailyData?: { labels: string[], datasets: DataSet[] };
    weeklyData?: { labels: string[], datasets: DataSet[] };
    monthlyData?: { labels: string[], datasets: DataSet[] };
    yearlyData?: { labels: string[], datasets: DataSet[] };
}

const StatBar: React.FC<Props> = observer(({ dailyData, weeklyData, monthlyData, yearlyData, title }) => {
    const [view, setView] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

    const getData: any = (view: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
        switch (view) {
            case 'daily':
                return dailyData;
            case 'weekly':
                return weeklyData;
            case 'monthly':
                return monthlyData;
            case 'yearly':
                return yearlyData;
            default:
                return { labels: [], datasets: [] };
        }
    };

    const { labels, datasets } = getData(view);
    const maxDataValue = Math.max(...datasets.flatMap((dataset: { data: any; }) => dataset.data));
    const max = Math.ceil(maxDataValue * 1.1);
    const chartData: ChartData<'bar'> = {
        labels: labels,
        datasets: datasets,
    };

    const options: ChartOptions<'bar'> = {
        responsive: true,
        maintainAspectRatio: false,
        
        plugins: {
            legend: {
                display: true,
                title: {
                    color: 'black'
                },
                position: 'bottom',
                labels: {
                    color: "black"
                }
            },
            title: {
                display: true,
                text: "Title",
                position: "bottom"
            },
            tooltip: {
                backgroundColor: '#4A85F6',
                titleColor: 'white',
                bodyColor: 'white',
                borderWidth: 0,
                displayColors: false,
                callbacks: {
                    title: () => '',
                    label: (tooltipItem: any) => `${tooltipItem.parsed.y}`,
                },
                yAlign: 'bottom',
            },
        },
        normalized: true,
        scales: {
            x: {
                // display: true,
                ticks: {
                    autoSkip: false,
                    font: {
                        size: 12,
                    },
                    color: '#666',
                    padding: 10,
                },
                grid: {
                    display: true,
                },
            },
            y: {
                display: true,
                beginAtZero: true,
                min: 0,
                max: max * 2,
                ticks: {
                    stepSize: Math.round(max / 3),
                },
                grid: {
                    display: true,
                },
            },
        },
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-[600px]">
            <div className='flex flex-row items-center justify-between'>
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <div className="flex mb-4 space-x-2 bg-[#F0F0F0] rounded-[49px] text-[10px] font-semibold py-2 px-3">
                    {dailyData && <button onClick={() => setView('daily')} className={`py-1 px-2 rounded-[45px] ${view === 'daily' ? 'bg-white text-black' : 'text-[#656565]'}`}>По дням</button>}
                    {weeklyData && <button onClick={() => setView('weekly')} className={`py-1 px-2 rounded-[45px] ${view === 'weekly' ? 'bg-white text-black' : 'text-[#656565]'}`}>По неделям</button>}
                    {monthlyData && <button onClick={() => setView('monthly')} className={`py-1 px-2 rounded-[45px] ${view === 'monthly' ? 'bg-white text-black' : 'text-[#656565]'}`}>По месяцам</button>}
                    {yearlyData && <button onClick={() => setView('yearly')} className={`py-1 px-2 rounded-[45px] ${view === 'yearly' ? 'bg-white text-black' : 'text-[#656565]'}`}>По годам</button>}
                </div>
            </div>
            <div className="relative h-48 w-full">
                <Bar data={chartData} options={options} className=''/>
            </div>
        </div>
    );
})

export default StatBar;