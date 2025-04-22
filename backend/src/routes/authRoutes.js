import express from 'express';
import { loginUser, getProfile } from '../controllers/authController.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// ✅ Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// ✅ Use controller for login
router.post('/login', loginUser);

// ✅ Use controller for profile
router.get('/profile', getProfile);

export default router;
