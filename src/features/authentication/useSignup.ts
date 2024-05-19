import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup() {
    const signUpMutation = useMutation({
        mutationFn: signupApi,
        onSuccess: (user) => {
            console.log("user->", user);
            toast.success("Account successfully created! Please verufy the new account from the user's email address.");
        },
        onError: (err) => {
            console.log("ERROR", err);
            toast.error("Error in sighup");
        },
    });

    const signup = signUpMutation.mutate;
    const isLoading = signUpMutation.status === "pending";

    return { signup, isLoading };
}
