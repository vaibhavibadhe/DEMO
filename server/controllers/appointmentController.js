// controllers/appointmentController.js
import { store } from '../models/dataStore.js';

export const getAppointments = (req, res) => {
  const { patientId, doctorId, date, status } = req.query;
  const list = store.getAppointments({ patientId, doctorId, date, status });
  res.json({ success: true, data: list });
};

export const getAppointmentById = (req, res) => {
  const apt = store.getAppointmentById(req.params.id);
  if (!apt) return res.status(404).json({ success: false, message: 'Appointment not found' });
  res.json({ success: true, data: apt });
};

export const createAppointment = (req, res) => {
  const { patientId, doctorId, date, timeSlot } = req.body;
  if (!patientId || !doctorId || !date || !timeSlot) {
    return res.status(400).json({ success: false, message: 'Missing required appointment fields' });
  }

  const patient = store.getPatientById(patientId);
  const doctor = store.getDoctorById(doctorId);

  const payload = {
    patientId,
    patientName: patient ? patient.name : req.body.patientName || 'Guest Patient',
    doctorId,
    doctorName: doctor ? doctor.name : req.body.doctorName || 'Doctor',
    speciality: doctor ? doctor.speciality : req.body.speciality || 'General Medicine',
    date,
    timeSlot,
    status: 'Waiting',
    type: req.body.type || 'Regular OPD',
    symptoms: req.body.symptoms || 'General consultation',
    fee: doctor ? doctor.fee : 500
  };

  const newApt = store.createAppointment(payload);
  res.status(201).json({ success: true, data: newApt });
};

export const updateAppointmentStatus = (req, res) => {
  const { status } = req.body;
  const updated = store.updateAppointmentStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ success: false, message: 'Appointment not found' });
  res.json({ success: true, data: updated });
};
