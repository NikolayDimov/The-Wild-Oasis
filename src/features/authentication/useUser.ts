import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export interface UserMetadata {
    fullName: string;
    avatar: string;
}

export interface User {
    id: string;
    username: string;
    email?: string;
    role: "authenticated" | "unauthenticated";
    user_metadata?: UserMetadata;
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
