import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { NewSetting, updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
    const queryClient = useQueryClient();

    const updateSettingMutation = useMutation<void, Error, { updatedSetting: NewSetting }>({
        mutationFn: ({ updatedSetting }: { updatedSetting: NewSetting }) => updateSettingApi(updatedSetting),
        onSuccess: () => {
            toast.success("Setting successfully edited");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => toast.error(err.message),
    });

    const updateSetting = updateSettingMutation.mutate;
    const isUpdating = updateSettingMutation.status === "pending";

    return { isUpdating, updateSetting };
}
