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

    // PAGINATION
    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const { isLoading, data, error } = useQuery({
        queryKey: ["bookings", filter, sortBy, page],
        queryFn: () => getBookings({ filter, sortBy, page }),
    });

    // return { isLoading, bookings, error, count };
    return { isLoading, bookings: data?.data, error, count: data?.count, page };
}
