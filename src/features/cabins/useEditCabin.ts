import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CabinType, editCabin as editCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditcabin() {
    const queryClient = useQueryClient();

    const editCabinMutation = useMutation<void, Error, { updatedCabin: CabinType; id: string }>({
        mutationFn: ({ updatedCabin, id }: { updatedCabin: CabinType; id: string }) => editCabinApi(updatedCabin, id),
        onSuccess: () => {
            toast.success("Cabin successfully edited");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message),
    });

    const editCabin = editCabinMutation.mutate;
    const isEditing = editCabinMutation.status === "pending";

    return { isEditing, editCabin };
}
