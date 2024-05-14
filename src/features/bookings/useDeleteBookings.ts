import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (id: string) => deleteBookingApi(id),
        onSuccess: () => {
            toast.success("Booking successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    const deleteBooking = mutation.mutate;
    const isDeleting = mutation.status === "pending";

    return { isDeleting, deleteBooking };
}
