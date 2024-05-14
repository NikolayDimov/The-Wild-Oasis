import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export type BreakfastType =
    | {
          hasBreakfast: boolean;
          extrasPrice: number;
          totalPrice: number;
      }
    | Record<string, never>;

export function useChecking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const checkinMutation = useMutation({
        mutationFn: async ({ bookingId, breakfast }: { bookingId: string; breakfast: BreakfastType }) => {
            const updatedData = { status: "checked-in", isPaid: true, ...(breakfast || {}) };
            const data = await updateBooking(bookingId, updatedData);
            return data;
        },

        onSuccess: (data) => {
            toast.success(`Booking #${data.id} successfully checked in`);
            queryClient.invalidateQueries({ queryKey: ["booking"] });
            navigate("/");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    const checkin = checkinMutation.mutate;
    const isCheckingIn = checkinMutation.status === "pending";

    return { checkin, isCheckingIn };
}
