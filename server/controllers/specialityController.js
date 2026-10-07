// controllers/specialityController.js
import { store } from '../models/dataStore.js';

export const getSpecialities = (req, res) => {
  res.json({ success: true, data: store.getSpecialities() });
};

export const createSpeciality = (req, res) => {
  const { name, description, icon } = req.body;
  if (!name) return res.status(400).json({ success: false, message: 'Speciality name is required' });
  const newSpec = store.addSpeciality({ name, description, icon: icon || 'Stethoscope' });
  res.status(201).json({ success: true, data: newSpec });
};
