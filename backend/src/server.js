// backend/src/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';

import flightRoutes from './routes/flightRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
const app = express();

// ✅ Explicitly define allowed origins
const allowedOrigins = [
  'http://localhost:3000',
  'https://flynow-eta.vercel.app/'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET || 'flightSecret123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true only if using HTTPS in production
}));

// Routes
app.use('/api/flights', flightRoutes);
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
