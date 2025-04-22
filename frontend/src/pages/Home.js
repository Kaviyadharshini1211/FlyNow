import React, { useState } from 'react';
import { createFlight } from '../services/api';

function Home({ flights }) {
  const [form, setForm] = useState({
    flightNumber: '',
    departure: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    seatsAvailable: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createFlight(form);
    window.location.reload(); // reload page to see new flight
  };

  return (
    <div>
      <h2>Available Flights</h2>
      <ul>
        {flights.length === 0 ? (
          <li>No flights available.</li>
        ) : (
          flights.map((flight) => (
            <li key={flight._id}>
              {flight.flightNumber} - {flight.departure} to {flight.destination}
            </li>
          ))
        )}
      </ul>

      <h2>Add New Flight</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="flightNumber" placeholder="Flight Number" value={form.flightNumber} onChange={handleChange} required />
        <input type="text" name="departure" placeholder="Departure" value={form.departure} onChange={handleChange} required />
        <input type="text" name="destination" placeholder="Destination" value={form.destination} onChange={handleChange} required />
        <input type="datetime-local" name="departureTime" value={form.departureTime} onChange={handleChange} required />
        <input type="datetime-local" name="arrivalTime" value={form.arrivalTime} onChange={handleChange} required />
        <input type="number" name="seatsAvailable" placeholder="Seats Available" value={form.seatsAvailable} onChange={handleChange} required />
        <button type="submit">Add Flight</button>
      </form>
    </div>
  );
}

export default Home;
