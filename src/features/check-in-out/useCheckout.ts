import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Booking, UpdateBookingData, updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
    const queryClient = useQueryClient();

    const checkoutMutation = useMutation({
        mutationFn: async (bookingId: string) => {
            // Define the data object with the correct type and initial values
            const data: UpdateBookingData = {
                status: "checked-out",
                guests: { fullName: "", email: "", country: "", countryFlag: "", nationalID: "" },
                cabins: { name: "" },
            };

            // Perform the updateBooking mutation
            const updatedBooking: Booking = await updateBooking(bookingId, data);
            return updatedBooking;
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
