
export function sortHardwareEventsLogs(data: any){
    return data.sort((a, b) => new Date(b.timeStamp) - new Date(a.timeStamp));
}

