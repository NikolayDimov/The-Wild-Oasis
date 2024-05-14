import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export interface User {
    id: string;
    username: string;
    role: "authenticated" | "unauthenticated";
}

export interface UserState {
    isLoading: boolean;
    user: User | null;
    isAuthenticated: boolean;
}

export function useUser(): UserState {
    const { isLoading, data: userData } = useQuery({
        queryKey: ["user"],
        queryFn: getCurrentUser,
    });

    const user: User | null = userData as User | null;

    const isAuthenticated = user?.role === "authenticated";

    return { isLoading, user, isAuthenticated };
}
