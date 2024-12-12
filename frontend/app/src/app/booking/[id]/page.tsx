import BackButton from './BackButton';

type Booking = {
  id: number;
  service: string;
  doctor_name: string;
  start_time: string;
  end_time: string;
  date: string;
};

async function getBooking(id: string) {
  const res = await fetch(`http://host.docker.internal:5000/api/bookings/${id}`, 
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error('Failed to fetch booking details');
  }
  return res.json();
}

const BookingDetails = async ({ params }: { params: { id: string } }) => {
  const booking: Booking = await getBooking(params.id);
  const formattedDate = new Date(booking.date).toLocaleDateString();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Booking Details</h1>
        <p className="text-lg text-gray-700">
          This Booking is with <span className="font-medium text-gray-900">{booking.doctor_name}</span> for{' '}
          <span className="font-medium text-gray-900">{booking.service}</span> on{' '}
          <span className="font-medium text-gray-900">{formattedDate}</span> and it ends on{' '}
          <span className="font-medium text-gray-900">{booking.end_time}</span>.
        </p>
        <div className="mt-6">
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
