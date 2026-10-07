// client/src/context/ClinicContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialDoctors,
  initialSpecialities,
  initialPatients,
  initialAppointments,
  initialConsultations,
  initialPrescriptions
} from '../services/mockData';
import { apiClient } from '../services/api';

const ClinicContext = createContext(null);

export const ClinicProvider = ({ children }) => {
  // Load state from localStorage or initial mock data
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('sc_doctors');
    return saved ? JSON.parse(saved) : initialDoctors;
  });

  const [specialities, setSpecialities] = useState(() => {
    const saved = localStorage.getItem('sc_specialities');
    return saved ? JSON.parse(saved) : initialSpecialities;
  });

  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('sc_patients');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('sc_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [consultations, setConsultations] = useState(() => {
    const saved = localStorage.getItem('sc_consultations');
    return saved ? JSON.parse(saved) : initialConsultations;
  });

  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('sc_prescriptions');
    return saved ? JSON.parse(saved) : initialPrescriptions;
  });

  const [queue, setQueue] = useState({
    currentToken: 'T-102',
    currentTokenPatient: 'Rohan Verma',
    callingStatus: 'In Consultation',
    tokens: [
      { token: 'T-101', patientName: 'Meera Nair', status: 'Waiting', arrivalTime: '09:15 AM', docId: 'doc-1' },
      { token: 'T-102', patientName: 'Rohan Verma', status: 'In Consultation', arrivalTime: '09:45 AM', docId: 'doc-1' },
      { token: 'T-103', patientName: 'Amit Shah', status: 'Scheduled', arrivalTime: '10:15 AM', docId: 'doc-1' },
      { token: 'T-104', patientName: 'Kavita Sen', status: 'Waiting', arrivalTime: '10:45 AM', docId: 'doc-2' }
    ]
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sc_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('sc_specialities', JSON.stringify(specialities));
  }, [specialities]);

  useEffect(() => {
    localStorage.setItem('sc_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('sc_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('sc_consultations', JSON.stringify(consultations));
  }, [consultations]);

  useEffect(() => {
    localStorage.setItem('sc_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  // Initial load from backend if available
  useEffect(() => {
    const fetchRemoteData = async () => {
      const docsRes = await apiClient.get('/doctors');
      if (docsRes && docsRes.success && docsRes.data?.length) {
        setDoctors(docsRes.data);
      }
      const specsRes = await apiClient.get('/specialities');
      if (specsRes && specsRes.success && specsRes.data?.length) {
        setSpecialities(specsRes.data);
      }
      const aptsRes = await apiClient.get('/appointments');
      if (aptsRes && aptsRes.success && aptsRes.data?.length) {
        setAppointments(aptsRes.data);
      }
      const qRes = await apiClient.get('/queue');
      if (qRes && qRes.success && qRes.data) {
        setQueue(qRes.data);
      }
    };
    fetchRemoteData();
  }, []);

  // --- ACTIONS ---

  const bookAppointment = async (bookingData) => {
    const tokenSeq = appointments.length + 101;
    const tokenNumber = `T-${tokenSeq}`;
    const newAppointment = {
      id: `apt-${Date.now()}`,
      tokenNumber,
      status: 'Waiting',
      paid: true,
      ...bookingData
    };

    setAppointments(prev => [newAppointment, ...prev]);

    // Also update queue tokens
    const newQToken = {
      token: tokenNumber,
      patientName: newAppointment.patientName,
      status: 'Waiting',
      arrivalTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      docId: newAppointment.doctorId
    };
    setQueue(prev => ({
      ...prev,
      tokens: [...prev.tokens, newQToken]
    }));

    // Post to backend asynchronously
    apiClient.post('/appointments', newAppointment);

    return newAppointment;
  };

  const updateAppointmentStatus = async (id, newStatus) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status: newStatus } : a))
    );

    const targetApt = appointments.find(a => a.id === id);
    if (targetApt) {
      setQueue(prev => ({
        ...prev,
        tokens: prev.tokens.map(t =>
          t.token === targetApt.tokenNumber ? { ...t, status: newStatus } : t
        )
      }));
    }

    apiClient.patch(`/appointments/${id}`, { status: newStatus });
  };

  const createConsultation = async (consultationData) => {
    const newCon = {
      id: `con-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      ...consultationData
    };

    setConsultations(prev => [newCon, ...prev]);

    if (consultationData.appointmentId) {
      updateAppointmentStatus(consultationData.appointmentId, 'Completed');
    }

    apiClient.post('/consultations', newCon, 'doctor');
    return newCon;
  };

  const createPrescription = async (rxData) => {
    const newRx = {
      id: `rx-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      signed: true,
      issuedAt: new Date().toISOString(),
      ...rxData
    };

    setPrescriptions(prev => [newRx, ...prev]);
    apiClient.post('/prescriptions', newRx, 'doctor');
    return newRx;
  };

  const updateQueueToken = (token, newStatus) => {
    setQueue(prev => {
      const updatedTokens = prev.tokens.map(t =>
        t.token === token ? { ...t, status: newStatus } : t
      );
      const activeTokenItem = updatedTokens.find(t => t.token === token);
      return {
        ...prev,
        currentToken: newStatus === 'In Consultation' ? token : prev.currentToken,
        currentTokenPatient:
          newStatus === 'In Consultation' && activeTokenItem ? activeTokenItem.patientName : prev.currentTokenPatient,
        callingStatus: newStatus === 'In Consultation' ? 'In Consultation' : prev.callingStatus,
        tokens: updatedTokens
      };
    });

    // Also update associated appointment status
    const matchedApt = appointments.find(a => a.tokenNumber === token);
    if (matchedApt) {
      setAppointments(prev =>
        prev.map(a => (a.id === matchedApt.id ? { ...a, status: newStatus } : a))
      );
    }

    apiClient.post('/queue/token', { token, status: newStatus }, 'receptionist');
  };

  const registerPatient = async (patientData) => {
    const newPatient = {
      id: `pat-${Date.now()}`,
      registeredAt: new Date().toISOString().split('T')[0],
      allergies: patientData.allergies || ['None reported'],
      ...patientData
    };

    setPatients(prev => [newPatient, ...prev]);
    apiClient.post('/patients', newPatient);
    return newPatient;
  };

  const addDoctor = async (doctorData) => {
    const newDoctor = {
      id: `doc-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80',
      ...doctorData
    };

    setDoctors(prev => [newDoctor, ...prev]);
    apiClient.post('/doctors', newDoctor, 'admin');
    return newDoctor;
  };

  const updateDoctor = async (id, updates) => {
    setDoctors(prev =>
      prev.map(d => (d.id === id ? { ...d, ...updates } : d))
    );
    apiClient.patch(`/doctors/${id}`, updates, 'admin');
  };

  const addSpeciality = async (specData) => {
    const newSpec = {
      id: `spec-${Date.now()}`,
      doctorCount: 0,
      icon: 'Stethoscope',
      ...specData
    };
    setSpecialities(prev => [...prev, newSpec]);
    apiClient.post('/specialities', newSpec, 'admin');
    return newSpec;
  };

  return (
    <ClinicContext.Provider
      value={{
        doctors,
        specialities,
        patients,
        appointments,
        consultations,
        prescriptions,
        queue,
        bookAppointment,
        updateAppointmentStatus,
        createConsultation,
        createPrescription,
        updateQueueToken,
        registerPatient,
        addDoctor,
        updateDoctor,
        addSpeciality
      }}
    >
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) throw new Error('useClinic must be used within a ClinicProvider');
  return context;
};
