// models/dataStore.js - Live in-memory reactive data store for Smart Clinic System
import {
  specialitiesData,
  doctorsData,
  patientsData,
  demoUsers,
  appointmentsData,
  consultationsData,
  prescriptionsData,
  queueData
} from '../data/seedData.js';

class DataStore {
  constructor() {
    this.specialities = [...specialitiesData];
    this.doctors = [...doctorsData];
    this.patients = [...patientsData];
    this.users = [...demoUsers];
    this.appointments = [...appointmentsData];
    this.consultations = [...consultationsData];
    this.prescriptions = [...prescriptionsData];
    this.queue = { ...queueData, tokens: [...queueData.tokens] };
  }

  // --- Auth & Users ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  // --- Doctors ---
  getDoctors(filter = {}) {
    return this.doctors.filter(d => {
      if (filter.speciality && d.speciality !== filter.speciality) return false;
      if (filter.status && d.status !== filter.status) return false;
      return true;
    });
  }

  getDoctorById(id) {
    return this.doctors.find(d => d.id === id);
  }

  addDoctor(doctor) {
    const newDoc = {
      id: `doc-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      status: "Active",
      ...doctor
    };
    this.doctors.push(newDoc);
    return newDoc;
  }

  updateDoctor(id, updates) {
    const idx = this.doctors.findIndex(d => d.id === id);
    if (idx === -1) return null;
    this.doctors[idx] = { ...this.doctors[idx], ...updates };
    return this.doctors[idx];
  }

  // --- Patients ---
  getPatients() {
    return this.patients;
  }

  getPatientById(id) {
    return this.patients.find(p => p.id === id);
  }

  addPatient(patient) {
    const newPatient = {
      id: `pat-${Date.now()}`,
      registeredAt: new Date().toISOString().split("T")[0],
      allergies: patient.allergies || ["None reported"],
      ...patient
    };
    this.patients.push(newPatient);

    // Also register user credential for demo
    this.users.push({
      id: `usr-${newPatient.id}`,
      name: newPatient.name,
      email: newPatient.email,
      role: "patient",
      patientId: newPatient.id,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
    });

    return newPatient;
  }

  // --- Appointments ---
  getAppointments(filter = {}) {
    return this.appointments.filter(a => {
      if (filter.patientId && a.patientId !== filter.patientId) return false;
      if (filter.doctorId && a.doctorId !== filter.doctorId) return false;
      if (filter.date && a.date !== filter.date) return false;
      if (filter.status && a.status !== filter.status) return false;
      return true;
    });
  }

  getAppointmentById(id) {
    return this.appointments.find(a => a.id === id);
  }

  createAppointment(data) {
    const tokenSeq = this.appointments.length + 101;
    const tokenNumber = `T-${tokenSeq}`;
    const newApt = {
      id: `apt-${Date.now()}`,
      tokenNumber,
      status: "Waiting",
      paid: true,
      ...data
    };
    this.appointments.unshift(newApt);

    // Also push to queue tokens
    this.queue.tokens.push({
      token: tokenNumber,
      patientName: newApt.patientName,
      status: "Waiting",
      arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      docId: newApt.doctorId
    });

    return newApt;
  }

  updateAppointmentStatus(id, status) {
    const apt = this.appointments.find(a => a.id === id);
    if (!apt) return null;
    apt.status = status;

    // Update in queue tokens if present
    const qToken = this.queue.tokens.find(t => t.token === apt.tokenNumber);
    if (qToken) {
      qToken.status = status;
    }
    return apt;
  }

  // --- Consultations ---
  getConsultations(filter = {}) {
    return this.consultations.filter(c => {
      if (filter.patientId && c.patientId !== filter.patientId) return false;
      if (filter.doctorId && c.doctorId !== filter.doctorId) return false;
      return true;
    });
  }

  createConsultation(data) {
    const newCon = {
      id: `con-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      ...data
    };
    this.consultations.unshift(newCon);

    // If linked to an appointment, mark appointment as Completed
    if (newCon.appointmentId) {
      this.updateAppointmentStatus(newCon.appointmentId, "Completed");
    }

    return newCon;
  }

  // --- Prescriptions ---
  getPrescriptions(filter = {}) {
    return this.prescriptions.filter(p => {
      if (filter.patientId && p.patientId !== filter.patientId) return false;
      if (filter.doctorId && p.doctorId !== filter.doctorId) return false;
      return true;
    });
  }

  getPrescriptionById(id) {
    return this.prescriptions.find(p => p.id === id);
  }

  createPrescription(data) {
    const newRx = {
      id: `rx-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      signed: true,
      issuedAt: new Date().toISOString(),
      ...data
    };
    this.prescriptions.unshift(newRx);
    return newRx;
  }

  // --- Specialities ---
  getSpecialities() {
    return this.specialities;
  }

  addSpeciality(spec) {
    const newSpec = {
      id: `spec-${Date.now()}`,
      doctorCount: 0,
      ...spec
    };
    this.specialities.push(newSpec);
    return newSpec;
  }

  // --- Queue ---
  getQueue() {
    return this.queue;
  }

  updateQueueToken(token, status) {
    const item = this.queue.tokens.find(t => t.token === token);
    if (item) {
      item.status = status;
      if (status === "In Consultation") {
        this.queue.currentToken = token;
        this.queue.currentTokenPatient = item.patientName;
        this.queue.callingStatus = "In Consultation";
      }
    }
    return this.queue;
  }

  // --- Analytics & Stats ---
  getStats() {
    return {
      totalPatients: this.patients.length,
      totalDoctors: this.doctors.length,
      todayAppointments: this.appointments.filter(a => a.date === new Date().toISOString().split("T")[0]).length,
      completedToday: this.appointments.filter(a => a.status === "Completed").length,
      waitingQueue: this.queue.tokens.filter(t => t.status === "Waiting").length,
      specialityDistribution: this.specialities.map(s => ({
        name: s.name,
        doctors: this.doctors.filter(d => d.speciality === s.name).length,
        appointments: this.appointments.filter(a => a.speciality === s.name).length
      })),
      weeklyTrends: [
        { day: "Mon", appointments: 24, completed: 22 },
        { day: "Tue", appointments: 31, completed: 29 },
        { day: "Wed", appointments: 28, completed: 27 },
        { day: "Thu", appointments: 35, completed: 33 },
        { day: "Fri", appointments: 40, completed: 38 },
        { day: "Sat", appointments: 26, completed: 25 },
        { day: "Sun", appointments: 12, completed: 12 }
      ]
    };
  }
}

export const store = new DataStore();
