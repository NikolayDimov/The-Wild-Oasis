import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export type BookingFilter = { field: string; value: string };
export interface BookingSortBy {
    field: string;
    direction: "asc" | "desc";
}

export function useBookings() {
    const [searchParams] = useSearchParams();

    // FILTER
    const filterValue = searchParams.get("status");
    const filter = !filterValue || filterValue === "all" ? null : { field: "status", value: filterValue };

    // SORT
    const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
    const [field, rawDirection] = sortByRaw.split("-");
    const direction: "asc" | "desc" = rawDirection === "asc" ? "asc" : "desc";
    const sortBy: BookingSortBy = { field, direction };

    const {
        isLoading,
        data: bookings,
        error,
    } = useQuery({
        queryKey: ["bookings", filter, sortBy],
        queryFn: () => getBookings({ filter, sortBy: { field, direction } }),
    });

    return { isLoading, bookings, error };
}
