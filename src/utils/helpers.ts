import { formatDistance, parseISO, differenceInDays } from "date-fns";

export const subtractDates = (dateStr1: string | Date, dateStr2: string | Date): number =>
    differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr: string | Date) =>
    formatDistance(parseISO(String(dateStr)), new Date(), {
        addSuffix: true,
    })
        .replace("about ", "")
        .replace("in", "In");

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
