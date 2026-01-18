export function formatToTwoDecimalsSafe(value: string | number | null | undefined): number | null | string {
    if (value === null || value === undefined) return "—";

    let num: number;

    if (typeof value === 'string') {
        const normalized = value.replace(',', '.');
        num = Number(normalized);
    } else {
        num = value;
    }

    if (Number.isNaN(num) || !Number.isFinite(num)) {
        return "—";
    }

    return roundToTwoDecimals(num);
}

function roundToTwoDecimals(num: number): number {
    return Math.round(num * 100) / 100;
}
