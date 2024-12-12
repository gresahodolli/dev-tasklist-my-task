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
        <div className="space-y-4">
          <p className="text-lg text-gray-700">
            <span className="font-medium text-gray-900">Service:</span> {booking.service}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium text-gray-900">Doctor:</span> {booking.doctor_name}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium text-gray-900">Date:</span> {formattedDate}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium text-gray-900">Start Time:</span> {booking.start_time}
          </p>
          <p className="text-lg text-gray-700">
            <span className="font-medium text-gray-900">End Time:</span> {booking.end_time}
          </p>
        </div>
        <div className="mt-6">
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
