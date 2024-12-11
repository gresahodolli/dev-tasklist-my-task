import Link from 'next/link';

async function getBookings() {
  const res = await fetch('http://host.docker.internal:5000/api/bookings', { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

const Home = async () => {
  const bookings = await getBookings();

  return (
    <div>
      <h1>Bookings</h1>
      <Link href="/new-booking">
        <button>Create New Booking</button>
      </Link>
      <ul>
        {bookings.map((booking: any) => {
          const formattedDate = new Date(booking.date).toLocaleDateString(); // Përpunimi i datës
          return (
            <li key={booking.id}>
              <Link href={`/booking/${booking.id}`}>
                A Booking on {formattedDate} starting at {booking.start_time}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
