// backend/src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';

import flightRoutes from './routes/flightRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'flightSecret123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // use true in production with HTTPS
}));

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
