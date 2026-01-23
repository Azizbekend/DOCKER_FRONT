export function getBetweenTimeByHour(startDate: Date, endDate: Date | null): number {



    console.log(startDate)
    console.log(endDate)

    const start = new Date(startDate);
    let end: Date;

    if (endDate == null) {
        end = new Date();
    } else {
        end = new Date(endDate);
    }

    const diffInMs = end.getTime() - start.getTime();

    if (diffInMs < 0) {
        return Math.floor(diffInMs / (1000 * 60 * 60));
    }

    const diffInHours = diffInMs / (1000 * 60 * 60);

    return Math.floor(diffInHours);
}