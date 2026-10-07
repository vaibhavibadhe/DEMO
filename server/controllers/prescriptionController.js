// controllers/prescriptionController.js
import { store } from '../models/dataStore.js';

export const getPrescriptions = (req, res) => {
  const { patientId, doctorId } = req.query;
  const list = store.getPrescriptions({ patientId, doctorId });
  res.json({ success: true, data: list });
};

export const getPrescriptionById = (req, res) => {
  const rx = store.getPrescriptionById(req.params.id);
  if (!rx) return res.status(404).json({ success: false, message: 'Prescription not found' });
  res.json({ success: true, data: rx });
};

export const createPrescription = (req, res) => {
  const { patientId, doctorId, medicines, diagnosis } = req.body;
  if (!patientId || !doctorId || !medicines || !medicines.length) {
    return res.status(400).json({ success: false, message: 'Patient, doctor, and structured medicines are required' });
  }

  const patient = store.getPatientById(patientId);
  const doctor = store.getDoctorById(doctorId);

  const payload = {
    patientId,
    patientName: patient ? patient.name : 'Patient',
    patientAge: patient ? patient.age : 30,
    patientGender: patient ? patient.gender : 'Unknown',
    doctorId,
    doctorName: doctor ? doctor.name : 'Doctor',
    doctorQualification: doctor ? doctor.qualification : 'MBBS',
    doctorSpeciality: doctor ? doctor.speciality : 'General Medicine',
    doctorRoom: doctor ? doctor.roomNo : 'OPD Cabin',
    diagnosis,
    medicines,
    generalAdvice: req.body.generalAdvice || '',
    followUpDate: req.body.followUpDate || '',
    consultationId: req.body.consultationId || `con-${Date.now()}`,
    appointmentId: req.body.appointmentId || ''
  };

  const newRx = store.createPrescription(payload);
  res.status(201).json({ success: true, data: newRx });
};
