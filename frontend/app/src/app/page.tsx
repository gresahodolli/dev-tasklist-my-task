import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store', mode: 'no-cors' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const Home = async () => {
  const bookings = await getBookings();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Bookings</h1>
        <div className="flex justify-end mb-4">
          <Link href="/new-booking">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              Create New Booking
            </button>
          </Link>
        </div>
        <ul className="space-y-4">
          {bookings.map((booking: any) => {
            const formattedDate = new Date(booking.date).toLocaleDateString();
            return (
              <li
                key={booking.id}
                className="border border-gray-200 rounded-md p-4 hover:shadow-lg transition"
              >
                <Link href={`/booking/${booking.id}`}>
                  A Booking on {formattedDate} starting at {booking.start_time}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
