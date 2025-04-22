import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/profile`, { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <p style={{ padding: '2rem' }}>Not logged in</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
