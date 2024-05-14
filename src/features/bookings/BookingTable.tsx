import Spinner from "../../ui/Spinner";

import Menus from "../../ui/Menus";

import Empty from "../../ui/Empty";
import { useBookings } from "./useBookings";
import BookingRow from "./BookingRow";
import Table from "./TableBooking";
import Pagination from "../../ui/Pagination";
import { Booking } from "../../services/apiBookings";

function BookingTable() {
    const { bookings, isLoading, count } = useBookings();
    // console.log("bookings", bookings);

    if (isLoading) return <Spinner />;
    if (!bookings?.length) return <Empty resource={"bookings"} />;

    return (
        <Menus>
            <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
                <Table.Header>
                    <div>Cabin</div>
                    <div>Guest</div>
                    <div>Dates</div>
                    <div>Status</div>
                    <div>Amount</div>
                    <div></div>
                </Table.Header>

                {/* {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))} */}

                {/* Render props! */}
                {bookings && (
                    <Table.BodyBooking data={bookings} render={(booking: Booking) => <BookingRow key={booking.id} booking={booking} />} />
                )}

                <Table.Footer>
                    <Pagination count={count} />
                </Table.Footer>
            </Table>
        </Menus>
    );
}

export default BookingTable;
