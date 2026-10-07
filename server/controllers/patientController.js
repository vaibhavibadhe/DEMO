// controllers/patientController.js
import { store } from '../models/dataStore.js';

export const getPatients = (req, res) => {
  const patients = store.getPatients();
  res.json({ success: true, data: patients });
};

export const getPatientById = (req, res) => {
  const patient = store.getPatientById(req.params.id);
  if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
  res.json({ success: true, data: patient });
};

export const registerPatient = (req, res) => {
  const { name, email, phone, gender, age, bloodGroup, address } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ success: false, message: 'Name and phone are required' });
  }
  const newPatient = store.addPatient(req.body);
  res.status(201).json({ success: true, data: newPatient });
};

export const getPatientRecords = (req, res) => {
  const { id } = req.params;
  const patient = store.getPatientById(id);
  if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });

  const appointments = store.getAppointments({ patientId: id });
  const consultations = store.getConsultations({ patientId: id });
  const prescriptions = store.getPrescriptions({ patientId: id });

  res.json({
    success: true,
    data: {
      patient,
      appointments,
      consultations,
      prescriptions
    }
  });
};
