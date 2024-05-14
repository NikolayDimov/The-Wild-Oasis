import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const deleteCabinMtation = useMutation({
        mutationFn: (id: string) => deleteCabinApi(id),
        onSuccess: () => {
            toast.success("Cabin successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    const deleteCabin = deleteCabinMtation.mutate;
    const isDeleting = deleteCabinMtation.status === "pending";

    return { isDeleting, deleteCabin };
}
