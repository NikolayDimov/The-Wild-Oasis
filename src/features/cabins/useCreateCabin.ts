import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CabinType, createCabin as createCabinApi } from "../../services/apiCabins";

export function useCreateCabin() {
    const queryClient = useQueryClient();

    const createCabinMutation = useMutation<void, Error, { newCabinData: CabinType }>({
        mutationFn: ({ newCabinData }: { newCabinData: CabinType }) => createCabinApi(newCabinData),
        onSuccess: () => {
            toast.success("New cabin successfully created");
            queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => toast.error(err.message),
    });

    const createCabin = createCabinMutation.mutate;
    const isCreating = createCabinMutation.status === "pending";

    return { isCreating, createCabin };
}
