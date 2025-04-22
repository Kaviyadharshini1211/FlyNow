// backend/src/routes/flightRoutes.js
import express from 'express';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const router = express.Router();
const filePath = path.resolve('data', 'flights.json');
const readFile  = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// Helper to load the JSON array
async function loadFlights() {
  const json = await readFile(filePath, 'utf8');
  return JSON.parse(json);
}

// Helper to save the JSON array
async function saveFlights(flights) {
  await writeFile(filePath, JSON.stringify(flights, null, 2), 'utf8');
}

// GET /api/flights?from=XXX&to=YYY&date=YYYY-MM-DD
router.get('/', async (req, res) => {
  try {
    const { from, to, date } = req.query;
    let flights = await loadFlights();

    if (from) flights = flights.filter(f => f.departure === from);
    if (to)   flights = flights.filter(f => f.destination === to);
    if (date) flights = flights.filter(f => f.flightDate === date);

    res.json(flights);
  } catch (error) {
    console.error('Error reading flights.json:', error);
    res.status(500).json({ message: 'Error loading flights' });
  }
});

// POST /api/flights
// Expects a full flight object in req.body matching your JSON schema.
// Appends it to flights.json and returns the new entry.
router.post('/', async (req, res) => {
  try {
    const newFlight = req.body;
    const flights = await loadFlights();

    flights.push(newFlight);
    await saveFlights(flights);

    res.status(201).json(newFlight);
  } catch (error) {
    console.error('Error writing to flights.json:', error);
    res.status(500).json({ message: 'Error saving flight' });
  }
});

export default router;
