import React, { useState, useRef, useEffect } from 'react';
import './FlightSearch.css';

const FlightSearch = ({ onSearch }) => {
  const [from, setFrom] = useState('DEL');
  const [to, setTo] = useState('MAA');
  const [date, setDate] = useState('');
  
  // passenger & class dropdown
  const [openPax, setOpenPax] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('Economy');
  const paxRef = useRef();

  // close on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (paxRef.current && !paxRef.current.contains(e.target)) {
        setOpenPax(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    onSearch({ from, to, date, adults, children, infants, travelClass });
  };

  return (
    <div className="flight-search-container">
      <h2>Search flights</h2>
      <p>Enjoy hassle free flight ticket bookings at lowest airfare</p>

      <form className="search-form" onSubmit={handleSubmit}>
        <div className="row">
          <select value={from} onChange={e => setFrom(e.target.value)}>
            <option value="DEL">DEL – New Delhi</option>
            <option value="BOM">BOM – Mumbai</option>
            <option value="BLR">BLR – Bangalore</option>
          </select>

          <span className="swap-icon">⇄</span>

          <select value={to} onChange={e => setTo(e.target.value)}>
            <option value="MAA">MAA – Chennai</option>
            <option value="HYD">HYD – Hyderabad</option>
            <option value="CCU">CCU – Kolkata</option>
          </select>
        </div>

        <div className="row">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />

          <div className="pax-wrapper" ref={paxRef}>
            <button
              type="button"
              className="pax-toggle"
              onClick={() => setOpenPax(o => !o)}
            >
              {adults} Adult{adults>1?'s':''}{children?`, ${children} Child${children>1?'ren':''}`:''}{infants?`, ${infants} Infant${infants>1?'s':''}`:''}, {travelClass} ▾
            </button>
            {openPax && (
              <div className="pax-dropdown">
                <div className="counter-row">
                  <div>
                    <div className="label">Adults</div>
                    <div className="sub">12+ Years</div>
                  </div>
                  <div className="controls">
                    <button disabled={adults<=1} onClick={() => setAdults(a=>a-1)}>-</button>
                    <span>{adults}</span>
                    <button onClick={() => setAdults(a=>a+1)}>+</button>
                  </div>
                </div>

                <div className="counter-row">
                  <div>
                    <div className="label">Children</div>
                    <div className="sub">2 – 12 yrs</div>
                  </div>
                  <div className="controls">
                    <button disabled={children<=0} onClick={() => setChildren(c=>c-1)}>-</button>
                    <span>{children}</span>
                    <button onClick={() => setChildren(c=>c+1)}>+</button>
                  </div>
                </div>

                <div className="counter-row">
                  <div>
                    <div className="label">Infants</div>
                    <div className="sub">Below 2 yrs</div>
                  </div>
                  <div className="controls">
                    <button disabled={infants<=0} onClick={() => setInfants(i=>i-1)}>-</button>
                    <span>{infants}</span>
                    <button onClick={() => setInfants(i=>i+1)}>+</button>
                  </div>
                </div>

                <div className="class-options">
                  {['Economy','Premium economy','Business class','First class'].map(cls => (
                    <button
                      key={cls}
                      type="button"
                      className={cls===travelClass?'selected':''}
                      onClick={() => setTravelClass(cls)}
                    >
                      {cls}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="row">
          <label className="work-option">
            <input type="checkbox" />
            Unlock 10% extra savings <span className="new-tag">NEW</span>
          </label>
        </div>

        <div className="row">
          <button className="search-btn" type="submit">
            Search flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;
