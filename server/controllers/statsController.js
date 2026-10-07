// controllers/statsController.js
import { store } from '../models/dataStore.js';

export const getStats = (req, res) => {
  res.json({ success: true, data: store.getStats() });
};
