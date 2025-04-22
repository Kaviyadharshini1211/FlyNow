import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Navbar from './components/Navbar';
import FlightSearch from './pages/FlightSearch';
import SearchResults from './pages/SearchResults';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { getFlights } from './services/api';

const AppRoutes = () => {
  const [flights, setFlights] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // whenever we hit '/', reset to the search form
    if (location.pathname === '/') {
      setShowResults(false);
    }
  }, [location]);

  const handleSearch = async (searchParams) => {
    const data = await getFlights(searchParams);
    setFlights(data);
    setShowResults(true);
  };

  return (
    <>
      <Navbar />
      <Routes>
      <Route
  path="/"
  element={
    !showResults
      ? <FlightSearch onSearch={handleSearch} />
      : <SearchResults flights={flights} />
  }
/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
