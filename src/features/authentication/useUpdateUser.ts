import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: updateCurrentUser,
        onSuccess: ({ user }) => {
            toast.success("User account successfully updated");
            queryClient.setQueryData(["user"], user);
            // setQueryData -> manually update data in the cache
        },
        onError: (err) => toast.error(err.message),
    });

    const updateUser = updateMutation.mutate;
    const isUpdating = updateMutation.status === "pending";

    return { updateUser, isUpdating };
}
