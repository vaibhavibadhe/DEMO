// controllers/authController.js
import { store } from '../models/dataStore.js';
import { demoUsers } from '../data/seedData.js';

export const login = (req, res) => {
  const { email, role } = req.body;

  if (!email && !role) {
    return res.status(400).json({ success: false, message: 'Email or role is required' });
  }

  let user = null;
  if (email) {
    user = store.findUserByEmail(email);
  } else if (role) {
    user = store.users.find(u => u.role === role);
  }

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials or user not found' });
  }

  return res.json({
    success: true,
    token: `demo-token-${user.id}-${Date.now()}`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      patientId: user.patientId,
      doctorId: user.doctorId,
      speciality: user.speciality,
      avatar: user.avatar
    }
  });
};

export const getDemoAccounts = (req, res) => {
  res.json({ success: true, accounts: demoUsers });
};
