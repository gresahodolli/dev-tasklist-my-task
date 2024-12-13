const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Using promise-based API
const cors = require('cors');

const app = express();
const port = 5000;

const pool = mysql.createPool({
  host: 'mysql',
  user: 'my_user',
  password: 'my_password',
  database: 'my_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const corsOpts= {
  origin: "*",
  methods: [
    'GET', 'POST'
  ],
  allowedHeaders:[
    'Content-Type'
  ]
};

app.use(bodyParser.json());
app.use(cors(corsOpts));

// API endpoint to fetch bookings 
app.get('/api/bookings', async (req, res) => {
  const selectQuery = `
    SELECT 
      id, 
      service, 
      doctor_name, 
      TIME_FORMAT(start_time, '%h:%i %p') AS start_time,
      TIME_FORMAT(end_time, '%h:%i %p') AS end_time,
      date 
    FROM bookings
  `;

  try {
    const [rows] = await pool.query(selectQuery);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to fetch a single booking by ID (with time formatted as 12-hour with AM/PM)
app.get('/api/bookings/:id', async (req, res) => {
  const bookingId = req.params.id;
  const selectQuery = `
    SELECT 
      id, 
      service, 
      doctor_name, 
      TIME_FORMAT(start_time, '%h:%i %p') AS start_time,
      TIME_FORMAT(end_time, '%h:%i %p') AS end_time,
      date 
    FROM bookings
    WHERE id = ?
  `;

  try {
    const [rows] = await pool.query(selectQuery, [bookingId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoint to insert a booking
app.post('/api/bookings', async (req, res) => {
  const { service, doctor_name, start_time, end_time, date } = req.body;

  // Optional: Validate time format if necessary
  const insertQuery = `
    INSERT INTO bookings (service, doctor_name, start_time, end_time, date)
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    await pool.query(insertQuery, [service, doctor_name, start_time, end_time, date]);
    res.status(201).send('Booking inserted successfully');
  } catch (error) {
    console.error('Error inserting booking:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
