// controllers/doctorController.js
import { store } from '../models/dataStore.js';

export const getDoctors = (req, res) => {
  const { speciality, status } = req.query;
  const docs = store.getDoctors({ speciality, status });
  res.json({ success: true, data: docs });
};

export const getDoctorById = (req, res) => {
  const doc = store.getDoctorById(req.params.id);
  if (!doc) return res.status(404).json({ success: false, message: 'Doctor not found' });
  res.json({ success: true, data: doc });
};

export const createDoctor = (req, res) => {
  const newDoc = store.addDoctor(req.body);
  res.status(201).json({ success: true, data: newDoc });
};

export const updateDoctor = (req, res) => {
  const updated = store.updateDoctor(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, message: 'Doctor not found' });
  res.json({ success: true, data: updated });
};
