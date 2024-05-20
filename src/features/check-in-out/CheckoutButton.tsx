import React from "react";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

interface CheckoutButtonProps {
    bookingId: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ bookingId }) => {
    const { checkout, isCheckingOut } = useCheckout();

    return (
        <Button variation="primary" size="small" onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
        </Button>
    );
};

export default CheckoutButton;
