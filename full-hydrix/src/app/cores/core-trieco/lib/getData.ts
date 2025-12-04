export const getData = (data: any[], field: string) => {
    const labelsSet = new Set<string>();
    const datasets: any[] = [];

    data.forEach((item, index) => {
        const timeData = item[field];
        const datasetData: number[] = [];

        timeData && Object.keys(timeData).forEach(key => {
            labelsSet.add(key);
            datasetData.push(timeData[key]);
        });

        timeData && datasets.push({
            label: `Sewer ${item.sewerId}`,
            data: datasetData,
            borderColor: '#4b74ff',
            backgroundColor: colors[index % colors.length],
            pointBackgroundColor: '#fff',
            pointBorderColor: '#4b74ff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#4b74ff',
            fill: false,

            pointHoverRadius: 5,
        });
    });

    const labels = Array.from(labelsSet);

    return { labels, datasets };
};

export const getLineData = (data: any, field: string) => {
    const labels: string[] = [];
    const datasetData: number[] = [];

    if (!data) return;

    data.length != 0 && Object.keys(data[field]).forEach(key => {
        labels.push(key);
        datasetData.push(data[field][key]); // значения
    });

    const datasets: any[] = [];

    datasets.push({
        label: `Sewer`,
        data: datasetData || [],
        borderColor: '#4b74ff',
        backgroundColor: colors[1],
        pointBackgroundColor: '#fff',
        pointBorderColor: '#4b74ff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#4b74ff',
        fill: false,
    })

    return { labels, datasets };
};

const colors = ['rgba(75, 116, 255, 0.2)', 'rgba(255, 75, 75, 0.2)', 'rgba(255, 187, 0, 0.2)']
