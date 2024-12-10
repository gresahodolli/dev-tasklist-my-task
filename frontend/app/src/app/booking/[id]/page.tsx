import BackButton from './BackButton'

type Booking = {
    id: number;
    service: string;
    doctor_name: string;
    start_time: string;
    end_time: string;
    date: string;
};

async function getBooking(id: string) {
    const res = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch booking details');
    }
    return res.json();
}

const BookingDetails = async ({ params }: { params: { id: string } }) => {
    const booking: Booking = await getBooking(params.id);

    return (
        <div>
            <h1>Booking Details</h1>
            <p>
                This Booking is with {booking.doctor_name} for {booking.service} and it ends on {booking.end_time}.
            </p>
            <BackButton />
        </div>
    );
};

export default BookingDetails;
