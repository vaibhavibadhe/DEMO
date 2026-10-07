// controllers/queueController.js
import { store } from '../models/dataStore.js';

export const getQueue = (req, res) => {
  res.json({ success: true, data: store.getQueue() });
};

export const updateQueueToken = (req, res) => {
  const { token, status } = req.body;
  if (!token || !status) {
    return res.status(400).json({ success: false, message: 'Token and status are required' });
  }
  const updated = store.updateQueueToken(token, status);
  res.json({ success: true, data: updated });
};
