import { useEffect, useState } from "react";

import Spinner from "../../ui/Spinner";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Checkbox from "../../ui/Checkbox";

import styled from "styled-components";
// import { box } from "styles/styles";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useSettings } from "../settings/useSettings";
import BookingDataBox from "../bookings/BookingDataBox";
import { formatCurrency } from "../../utils/helpers";
import { useChecking } from "./useCheckin";

/* ${box} */
const Box = styled.div`
    padding: 3.2rem 4rem;
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);

    const { booking, isLoading } = useBooking();
    const { checkin, isCheckingIn } = useChecking();
    const moveBack = useMoveBack();
    const { isLoading: isLoadingSettings, settings } = useSettings();

    // Can't use as initial state, because booking will still be loading
    useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

    if (isLoading || isLoadingSettings) return <Spinner />;

    const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking;

    const optionalBreakfastPrice = numNights * settings.breakfastPrice * numGuests;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: optionalBreakfastPrice,
                    totalPrice: totalPrice + optionalBreakfastPrice,
                },
            });
        } else {
            checkin({ bookingId, breakfast: {} });
        }
    }

    // We return a fragment so that these elements fit into the page's layout
    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {/* LATER */}
            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((add) => !add);
                            setConfirmPaid(false);
                        }}
                        id="breakfast"
                    >
                        Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
                    </Checkbox>
                </Box>
            )}

            <Box>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    // If the guest has already paid online, we can't even undo this
                    disabled={isCheckingIn || confirmPaid}
                    id="confirm"
                >
                    I confirm that {guests.fullName} has paid the total amount of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(
                              optionalBreakfastPrice
                          )} for breakfast)`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
                    Check in booking #{bookingId}
                </Button>
                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
