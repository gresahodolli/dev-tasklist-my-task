import { useRouter } from 'next/router';

async function getBooking(id: string) {
  const res = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch booking details');
  }
  return res.json();
}

const BookingDetails: React.FC = async () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return <p>Loading...</p>;

  const booking = await getBooking(id as string);

  return (
    <div>
      <h1>Booking Details</h1>
      <p>
        This Booking is with {booking.doctor_name} for {booking.service} and it ends on {booking.end_time}.
      </p>
      <button onClick={() => router.back()}>Back</button>
    </div>
  );
};

export default BookingDetails;
