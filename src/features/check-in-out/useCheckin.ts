import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const checkinMutation = useMutation({
        mutationFn: (bookingId: string) => updateBooking(bookingId, { status: "checked-in", isPaid: true }),
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
