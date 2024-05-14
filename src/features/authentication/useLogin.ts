import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { LoginProps } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: LoginProps) => loginApi({ email, password }),
        onSuccess: () => {
            navigate("/dashboard");
        },
        onError: (err) => toast.error(err.message),
    });

    const login = loginMutation.mutate;
    const isLoading = loginMutation.status === "pending";

    return { login, isLoading };
}
