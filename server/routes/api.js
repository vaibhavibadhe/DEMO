// routes/api.js - Central Express router
import express from 'express';
import { login, getDemoAccounts } from '../controllers/authController.js';
import { getDoctors, getDoctorById, createDoctor, updateDoctor } from '../controllers/doctorController.js';
import { getPatients, getPatientById, registerPatient, getPatientRecords } from '../controllers/patientController.js';
import { getAppointments, getAppointmentById, createAppointment, updateAppointmentStatus } from '../controllers/appointmentController.js';
import { getConsultations, createConsultation } from '../controllers/consultationController.js';
import { getPrescriptions, getPrescriptionById, createPrescription } from '../controllers/prescriptionController.js';
import { getQueue, updateQueueToken } from '../controllers/queueController.js';
import { getSpecialities, createSpeciality } from '../controllers/specialityController.js';
import { analyzeUrgency } from '../controllers/aiController.js';
import { getStats } from '../controllers/statsController.js';
import { requireRole } from '../middleware/auth.js';

const router = express.Router();

// --- Auth ---
router.post('/auth/login', login);
router.get('/auth/demo-accounts', getDemoAccounts);

// --- Doctors ---
router.get('/doctors', getDoctors);
router.get('/doctors/:id', getDoctorById);
router.post('/doctors', requireRole(['admin']), createDoctor);
router.patch('/doctors/:id', requireRole(['admin']), updateDoctor);

// --- Patients ---
router.get('/patients', requireRole(['admin', 'receptionist', 'doctor']), getPatients);
router.get('/patients/:id', getPatientById);
router.post('/patients', registerPatient);
router.get('/patients/:id/records', getPatientRecords);

// --- Appointments ---
router.get('/appointments', getAppointments);
router.get('/appointments/:id', getAppointmentById);
router.post('/appointments', createAppointment);
router.patch('/appointments/:id', updateAppointmentStatus);

// --- Consultations ---
router.get('/consultations', getConsultations);
router.post('/consultations', requireRole(['doctor', 'admin']), createConsultation);

// --- Prescriptions ---
router.get('/prescriptions', getPrescriptions);
router.get('/prescriptions/:id', getPrescriptionById);
router.post('/prescriptions', requireRole(['doctor', 'admin']), createPrescription);

// --- Queue ---
router.get('/queue', getQueue);
router.post('/queue/token', requireRole(['receptionist', 'doctor', 'admin']), updateQueueToken);

// --- Specialities ---
router.get('/specialities', getSpecialities);
router.post('/specialities', requireRole(['admin']), createSpeciality);

// --- AI Urgency Triage ---
router.post('/ai/urgency-analysis', analyzeUrgency);

// --- Clinic Analytics ---
router.get('/stats', getStats);

export default router;
