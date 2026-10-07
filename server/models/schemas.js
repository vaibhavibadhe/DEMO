// models/schemas.js - Mongoose models for Smart Clinic System
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['patient', 'doctor', 'receptionist', 'admin'], required: true },
  patientId: String,
  doctorId: String,
  avatar: String,
  createdAt: { type: Date, default: Date.now }
});

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  qualification: { type: String, required: true },
  speciality: { type: String, required: true },
  specialityId: String,
  experienceYears: Number,
  roomNo: String,
  fee: Number,
  rating: Number,
  reviewsCount: Number,
  avatar: String,
  about: String,
  schedule: {
    days: [String],
    timings: String,
    slots: [String]
  },
  status: { type: String, default: 'Active' }
});

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: String,
  age: Number,
  bloodGroup: String,
  address: String,
  emergencyContact: String,
  allergies: [String],
  registeredAt: { type: Date, default: Date.now }
});

const AppointmentSchema = new mongoose.Schema({
  tokenNumber: String,
  patientId: { type: String, required: true },
  patientName: { type: String, required: true },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  speciality: String,
  date: String,
  timeSlot: String,
  status: { type: String, enum: ['Scheduled', 'Waiting', 'In Consultation', 'Completed', 'Cancelled'], default: 'Waiting' },
  type: String,
  symptoms: String,
  fee: Number,
  paid: { type: Boolean, default: true }
});

const ConsultationSchema = new mongoose.Schema({
  appointmentId: String,
  patientId: { type: String, required: true },
  doctorId: { type: String, required: true },
  doctorName: String,
  speciality: String,
  date: String,
  chiefComplaints: String,
  vitals: {
    bloodPressure: String,
    pulseRate: String,
    temperature: String,
    spO2: String
  },
  diagnosis: String,
  clinicalNotes: String,
  advice: String,
  followUpDate: String
});

const PrescriptionSchema = new mongoose.Schema({
  consultationId: String,
  appointmentId: String,
  patientId: { type: String, required: true },
  patientName: String,
  patientAge: Number,
  patientGender: String,
  doctorId: { type: String, required: true },
  doctorName: String,
  doctorQualification: String,
  doctorSpeciality: String,
  doctorRoom: String,
  date: String,
  diagnosis: String,
  medicines: [
    {
      name: String,
      dosage: String,
      frequency: String,
      duration: String,
      instructions: String
    }
  ],
  generalAdvice: String,
  followUpDate: String,
  signed: { type: Boolean, default: true },
  issuedAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
export const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema);
export const Patient = mongoose.models.Patient || mongoose.model('Patient', PatientSchema);
export const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
export const Consultation = mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);
export const Prescription = mongoose.models.Prescription || mongoose.model('Prescription', PrescriptionSchema);
