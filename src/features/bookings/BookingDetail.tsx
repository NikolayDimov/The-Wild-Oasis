import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useMoveBack } from "../../hooks/useMoveBack";
import BookingDataBox from "./BookingDataBox";
import { useCheckout } from "../check-in-out/useCheckout";
import { HiArrowUpOnSquare } from "react-icons/hi2";

const HeadingGroup = styled.div`
    display: flex;
    gap: 2.4rem;
    align-items: center;
`;

function BookingDetail() {
    const { booking, isLoading } = useBooking();
    // const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
    const { checkout, isCheckingOut } = useCheckout();

    const moveBack = useMoveBack();
    const navigate = useNavigate();

    if (isLoading) return <Spinner />;
    if (!booking) return <Empty resource="booking" />;

    interface StatusToTagName {
        [key: string]: string;
        unconfirmed: string;
        "checked-in": string;
        "checked-out": string;
    }

    const statusToTagName: StatusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    const { id: bookingId, status } = booking;

    return (
        <>
            <Row type="horizontal">
                <HeadingGroup>
                    <Heading as="h1">Booking #{bookingId}</Heading>
                    <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
                </HeadingGroup>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            <ButtonGroup>
                {status === "unconfirmed" && <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}

                {status === "checked-in" && (
                    <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut} icon={<HiArrowUpOnSquare />}>
                        Check out
                    </Button>
                )}

                {/* <Modal>
                    <Modal.Toggle opens="delete">
                        <Button variation="danger">Delete booking</Button>
                    </Modal.Toggle>
                    <Modal.Window name="delete">
                        <ConfirmDelete
                            resource="booking"
                            // These options will be passed wherever the function gets called, and they determine what happens next
                            onConfirm={(options) => deleteBooking(bookingId, options)}
                            disabled={isDeleting}
                        />
                    </Modal.Window>
                </Modal> */}

                <Button variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default BookingDetail;
