import { formatDistance, parseISO, differenceInDays, isValid } from "date-fns";

export const subtractDates = (dateStr1: string | Date, dateStr2: string | Date): number => {
    const date1 = typeof dateStr1 === "string" ? parseISO(dateStr1) : dateStr1;
    const date2 = typeof dateStr2 === "string" ? parseISO(dateStr2) : dateStr2;

    if (!isValid(date1) || !isValid(date2)) {
        console.error("Invalid date value", dateStr1, dateStr2);
        return NaN; // or handle the error as you see fit
    }

    return differenceInDays(date1, date2);
};

export const formatDistanceFromNow = (dateStr: string | Date) => {
    const date = typeof dateStr === "string" ? parseISO(dateStr) : dateStr;

    if (!isValid(date)) {
        console.error("Invalid date value", dateStr);
        return "Invalid date"; // or handle the error as you see fit
    }

    return formatDistance(date, new Date(), {
        addSuffix: true,
    })
        .replace("about ", "")
        .replace("in", "In");
};

interface GetTodayOptions {
    end?: boolean;
}

export const getToday = function (options: GetTodayOptions = {}): string {
    const today = new Date();

    if (options.end) today.setUTCHours(23, 59, 59, 999);
    else today.setUTCHours(0, 0, 0, 0);
    return today.toISOString();
};

export const formatCurrency = (value: number): string => new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(value);
