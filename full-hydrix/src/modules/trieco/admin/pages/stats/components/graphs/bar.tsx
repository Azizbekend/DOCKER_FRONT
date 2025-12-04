import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

type Props = {
    title?: string,
    data?: {
        labels: string[];
        datasets: {
            data: number[];
        }[];
    };

}

export const BarChart = (props: Props) => {
    // const data = {
    //     labels: ['Янв', 'Февр', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг'],
    //     datasets: [
    //         {
    //             label: props.title,
    //             data: [45, 90, 100, 40, 70, 85, 50, 60],
    //             backgroundColor: '#435EBE',
    //         },
    //     ],
    // };

    if (!props.data) return <></>
    return (
        <Bar className='bg-white px-5 rounded-md py-7'
            height={500} width={750} data={props.data}
            options={{
                responsive: true,
                devicePixelRatio: 2,
                backgroundColor: "white",
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        color: "#25396F",
                        font: {
                            weight: 'bold',
                            size: 14,
                        },
                        align: "start",
                        padding: {
                            bottom: 32
                        },
                        text: props.title,
                    },

                    colors: {
                        forceOverride: false
                    },
                    tooltip: {
                        enabled: false
                    },
                },
                datasets: {
                    bar: {
                        barThickness: 50,
                        borderRadius: 5,
                        normalized: true,

                        categoryPercentage: .1,
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false,
                        },
                        border: {
                            display: false
                        },

                        ticks: {
                            color: "#7C8DB5",
                            stepSize: 34,
                            padding: 10,
                            font: {
                                size: 14,
                                weight: 'normal'
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false,
                        },
                        ticks: {
                            color: "#7C8DB5",
                            stepSize: 20,
                            font: {
                                size: 14,
                                weight: 'normal'
                            },

                        }
                    }
                }
            }} />
    );
};
