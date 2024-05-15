import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { LoginProps } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: LoginProps) => loginApi({ email, password }),
        onSuccess: (user) => {
            queryClient.setQueryData(["user"], user); // manually set data into React Query cache
            navigate("/dashboard", { replace: true });
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("Provided email or password are incorrect");
        },
    });

    const login = loginMutation.mutate;
    const isLoading = loginMutation.status === "pending";

    return { login, isLoading };
}
