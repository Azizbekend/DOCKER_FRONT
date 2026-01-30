import { toJS } from 'mobx';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export const SumChart = ({ data, type }: { data: any, type: string }) => {

    const chartData = toJS(data);
    const ticks = type == "water" ? [0, 0.2, 0.4, 0.6, 0.8, 1] : [20, 22, 24, 26, 28, 30];

    return (
        <div className='w-full overflow-x-auto flex justify-center -ml-6'>
            <ResponsiveContainer className="w-min" width="100%" height={300} >
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="date" />

                    <YAxis
                        ticks={ticks}
                    />

                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="sum"
                        stroke="var(--clr-accent)"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};