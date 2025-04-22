import User from '../models/User.js';
import bcrypt from 'bcrypt';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    req.session.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    res.json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

export const getProfile = (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
};
