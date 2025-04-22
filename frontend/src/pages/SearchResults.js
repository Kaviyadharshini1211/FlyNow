import React from 'react';
import './SearchResults.css';

const SearchResults = ({ flights }) => {
  if (!flights) return <p>Loading flights…</p>;
  if (flights.length === 0) return <p>No flights found.</p>;

  // Sort flights by price (lowest to highest)
  const sortedFlights = [...flights].sort((a, b) => a.price - b.price);

  return (
    <div className="search-results-container">
      <h2>Available Flights</h2>
      {sortedFlights.map((flight) => (
        <div key={flight.flightNumber + flight.departureTime} className="flight-row">
          <div className="flight-left">
            <img src={flight.logo} alt={`${flight.airline} logo`} className="airline-logo" />
            <div>
              <strong>{flight.airline} {flight.flightNumber}</strong>
              <div className="flight-details-link">Flight Details</div>
            </div>
          </div>

          <div className="flight-middle">
            <div className="flight-time">{flight.departureTime}</div>
            <div className="flight-duration">{flight.duration} • {flight.stops}</div>
            <div className="flight-time">{flight.arrivalTime}</div>
          </div>

          <div className="flight-right">
            <div className="price">₹{flight.price.toLocaleString()}</div>
            {flight.discount > 0 && (
              <div className="discount" title="Use code CTDOM at checkout">
                Save ₹{flight.discount}
              </div>
            )}
            <button
              className="book-button"
              disabled={flight.seatsAvailable === 0}
              title={flight.seatsAvailable === 0 ? 'No seats available' : 'Book this flight'}
            >
              {flight.seatsAvailable === 0 ? 'Sold Out' : 'Book'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
