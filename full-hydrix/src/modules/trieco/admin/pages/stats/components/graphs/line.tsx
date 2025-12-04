import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartOptions,
  ChartData,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

export const randomizeFloat = (min: number, max: number): number => {
  return min + Math.random() * (max - min);
};

const LineStatistic: React.FC<Props> = ({ dailyData, weeklyData, monthlyData, yearlyData, title }) => {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

  const getData: any = (view: 'daily' | 'weekly' | 'monthly' | 'yearly') => {
    if (!dailyData && !weeklyData && !monthlyData && !yearlyData) return {labels: [], datasets: []}
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
  const max = Math.ceil(maxDataValue * 1.1); // Увеличиваем на 10%

  const chartData: ChartData<'line'> = {
    labels: labels,
    datasets: datasets,
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        backgroundColor: '#fff',
        titleColor: '#000',
        bodyColor: '#000',
        borderWidth: 0,
        displayColors: false,
        callbacks: {
          title: () => '',
          label: (tooltipItem: any) => `${tooltipItem.parsed.y}`,
        },
        yAlign: 'bottom',
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
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
          stepSize: max / 3,
        },
        grid: {
          display: true,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-[600px]">
      <div className='flex flex-row items-center justify-between'>
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div className="flex mb-4 space-x-2 bg-[#F0F0F0] rounded-[49px] text-[10px] font-semibold py-2 px-3">
          {dailyData && <button onClick={() => setView('daily')} className={`py-1 px-2 rounded-[45px] ${view === 'daily' ? 'bg-white text-black' : 'text-[#656565] cursor-pointer'}`}>По дням</button>}
          {weeklyData && <button onClick={() => setView('weekly')} className={`py-1 px-2 rounded-[45px] ${view === 'weekly' ? 'bg-white text-black' : 'text-[#656565] cursor-pointer'}`}>По неделям</button>}
          {monthlyData && <button onClick={() => setView('monthly')} className={`py-1 px-2 rounded-[45px] ${view === 'monthly' ? 'bg-white text-black' : 'text-[#656565] cursor-pointer'}`}>По месяцам</button>}
          {yearlyData && <button onClick={() => setView('yearly')} className={`py-1 px-2 rounded-[45px] ${view === 'yearly' ? 'bg-white text-black' : 'text-[#656565] cursor-pointer'}`}>По годам</button>}
        </div>
      </div>
      <div className="relative h-48 w-full"> {/* Уменьшенная высота графика */}
        <Line data={chartData} options={options} className='' />
      </div>
    </div>
  );
};

export default LineStatistic;