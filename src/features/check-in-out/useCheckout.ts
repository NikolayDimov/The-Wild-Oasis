import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
    const queryClient = useQueryClient();

    const checkoutMutation = useMutation({
        mutationFn: async (bookingId: string) => {
            const data = await updateBooking(bookingId, { status: "checked-out" });
            return data;
        },

        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked out`);
            queryClient.invalidateQueries({ queryKey: ["booking"] });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const checkout = checkoutMutation.mutate;
    const isCheckingOut = checkoutMutation.status === "pending";

    return { checkout, isCheckingOut };
}
