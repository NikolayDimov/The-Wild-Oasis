import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiPencil, HiTrash, HiEye, HiArrowUpOnSquare, HiArrowDownOnSquare } from "react-icons/hi2";

import { format, isToday } from "date-fns";
import Tag from "../../ui/Tag";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { formatCurrency, formatDistanceFromNow } from "../../utils/helpers";
interface Booking {
    id: string;
    created_at: Date;
    startDate: Date;
    endDate: Date;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    status: string;
    guests: {
        fullName: string;
        email: string;
    };
    cabins: {
        name: string;
    };
}

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-grey-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

const BookingRow: React.FC<{ booking: Booking }> = ({ booking }) => {
    const {
        id: bookingId,
        created_at,
        startDate,
        endDate,
        numNights,
        numGuests,
        totalPrice,
        status,
        guests: { fullName: guestName, email },
        cabins: { name: cabinName },
    } = booking;
    // const { mutate: deleteBooking, isLoading: isDeleting } = useDeleteBooking();
    // const { mutate: checkout, isLoading: isCheckingOut } = useCheckout();

    const navigate = useNavigate();

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

    return (
        <Table.Row role="row">
            <Cabin>{cabinName}</Cabin>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate)) ? "Today" : formatDistanceFromNow(startDate)} &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy")} &mdash; {format(new Date(endDate), "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>

            {/* VIDEO we could export this into own component... */}
            <Modal>
                <Menus.Menu>
                    <Menus.Toggle id={bookingId} />
                    <Menus.List id={bookingId}>
                        <Menus.Button onClick={() => navigate(`/bookings/${bookingId}`)} icon={<HiEye />}>
                            See details
                        </Menus.Button>

                        {status === "unconfirmed" && (
                            <Menus.Button onClick={() => navigate(`/checkin/${bookingId}`)} icon={<HiArrowDownOnSquare />}>
                                Check in
                            </Menus.Button>
                        )}

                        {/* {status === "checked-in" && (
                            <Menus.Button onClick={() => checkout(bookingId)} disabled={isCheckingOut} icon={<HiArrowUpOnSquare />}>
                                Check out
                            </Menus.Button>
                        )} */}

                        <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>
                        {/* <Menus.Button>Delete</Menus.Button> */}

                        {/* Now it gets a bit confusing... */}
                        {/* <Modal.Toggle opens="delete">
                            <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
                        </Modal.Toggle> */}
                    </Menus.List>
                </Menus.Menu>

                {/* This needs to be OUTSIDE of the menu, which in no problem. The compound component gives us this flexibility */}
                {/* <Modal.Window name="delete">
                    <ConfirmDelete
                        resource="booking"
                        // These options will be passed wherever the function gets called, and they determine what happens next
                        onConfirm={(options) => deleteBooking(bookingId, options)}
                        disabled={isDeleting}
                    />
                </Modal.Window> */}
            </Modal>

            {/* <div>
        <ButtonWithConfirm
          title='Delete booking'
          description='Are you sure you want to delete this booking? This action can NOT be undone.'
          confirmBtnLabel='Delete'
          onConfirm={() => deleteBooking(bookingId)}
          disabled={isDeleting}
        >
          Delete
        </ButtonWithConfirm>

        <Link to={`/bookings/${bookingId}`}>Details &rarr;</Link>
      </div> */}
        </Table.Row>
    );
};

export default BookingRow;
