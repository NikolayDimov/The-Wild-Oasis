import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
    const queryClient = useQueryClient();

    const deleteBookingMtation = useMutation({
        mutationFn: (id: string) => deleteBookingApi(id),
        onSuccess: () => {
            toast.success("Booking successfully deleted");
            queryClient.invalidateQueries({
                queryKey: ["bookings"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    const deleteBooking = deleteBookingMtation.mutate;
    const isDeleting = deleteBookingMtation.status === "pending";

    return { isDeleting, deleteBooking };
}
