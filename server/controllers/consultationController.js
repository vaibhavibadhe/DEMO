// controllers/consultationController.js
import { store } from '../models/dataStore.js';

export const getConsultations = (req, res) => {
  const { patientId, doctorId } = req.query;
  const list = store.getConsultations({ patientId, doctorId });
  res.json({ success: true, data: list });
};

export const createConsultation = (req, res) => {
  const { patientId, doctorId, diagnosis } = req.body;
  if (!patientId || !doctorId || !diagnosis) {
    return res.status(400).json({ success: false, message: 'Patient, doctor, and diagnosis are required' });
  }

  const patient = store.getPatientById(patientId);
  const doctor = store.getDoctorById(doctorId);

  const newCon = store.createConsultation({
    patientName: patient ? patient.name : 'Patient',
    doctorName: doctor ? doctor.name : 'Doctor',
    speciality: doctor ? doctor.speciality : 'General Medicine',
    ...req.body
  });

  res.status(201).json({ success: true, data: newCon });
};
