import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            queryClient.removeQueries();
            navigate("/login", { replace: true });
        },
        onError: (err) => toast.error(err.message),
    });

    const logout = loginMutation.mutate;
    const isLoading = loginMutation.status === "pending";

    return { logout, isLoading };
}
