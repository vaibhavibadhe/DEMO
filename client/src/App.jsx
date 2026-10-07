// client/src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ClinicProvider } from './context/ClinicContext';

// Common Layout & Guards
import { DashboardLayout } from './components/common/DashboardLayout';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';

// Patient Pages
import { PatientDashboard } from './pages/patient/PatientDashboard';
import { BookOPDPage } from './pages/patient/BookOPDPage';
import { SpecialitiesPage } from './pages/patient/SpecialitiesPage';
import { MyAppointmentsPage } from './pages/patient/MyAppointmentsPage';
import { MedicalRecordsPage } from './pages/patient/MedicalRecordsPage';
import { DigitalPrescriptionsPage } from './pages/patient/DigitalPrescriptionsPage';
import { AIUrgencyPage } from './pages/patient/AIUrgencyPage';

// Doctor Pages
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { DoctorOPDPage } from './pages/doctor/DoctorOPDPage';
import { DoctorPatientsPage } from './pages/doctor/DoctorPatientsPage';
import { DoctorConsultationPage } from './pages/doctor/DoctorConsultationPage';
import { DoctorPrescriptionsPage } from './pages/doctor/DoctorPrescriptionsPage';

// Receptionist Pages
import { ReceptionistDashboard } from './pages/receptionist/ReceptionistDashboard';
import { ReceptionistQueuePage } from './pages/receptionist/ReceptionistQueuePage';
import { PatientRegistrationPage } from './pages/receptionist/PatientRegistrationPage';
import { ReceptionistAppointmentsPage } from './pages/receptionist/ReceptionistAppointmentsPage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { DoctorManagementPage } from './pages/admin/DoctorManagementPage';
import { StaffManagementPage } from './pages/admin/StaffManagementPage';
import { AdminPatientsPage } from './pages/admin/AdminPatientsPage';
import { SpecialityManagementPage } from './pages/admin/SpecialityManagementPage';
import { ReportsPage } from './pages/admin/ReportsPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ClinicProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Authenticated Role Dashboards inside DashboardLayout */}
            <Route element={<DashboardLayout />}>
              {/* Patient Experience */}
              <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
                <Route path="/patient" element={<PatientDashboard />} />
                <Route path="/patient/book-opd" element={<BookOPDPage />} />
                <Route path="/patient/specialities" element={<SpecialitiesPage />} />
                <Route path="/patient/appointments" element={<MyAppointmentsPage />} />
                <Route path="/patient/records" element={<MedicalRecordsPage />} />
                <Route path="/patient/prescriptions" element={<DigitalPrescriptionsPage />} />
                <Route path="/patient/ai-urgency" element={<AIUrgencyPage />} />
              </Route>

              {/* Doctor Experience */}
              <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
                <Route path="/doctor" element={<DoctorDashboard />} />
                <Route path="/doctor/opd" element={<DoctorOPDPage />} />
                <Route path="/doctor/patients" element={<DoctorPatientsPage />} />
                <Route path="/doctor/consultation/:appointmentId" element={<DoctorConsultationPage />} />
                <Route path="/doctor/prescriptions" element={<DoctorPrescriptionsPage />} />
              </Route>

              {/* Receptionist Experience */}
              <Route element={<ProtectedRoute allowedRoles={['receptionist']} />}>
                <Route path="/receptionist" element={<ReceptionistDashboard />} />
                <Route path="/receptionist/queue" element={<ReceptionistQueuePage />} />
                <Route path="/receptionist/registration" element={<PatientRegistrationPage />} />
                <Route path="/receptionist/appointments" element={<ReceptionistAppointmentsPage />} />
              </Route>

              {/* Admin Experience */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/doctors" element={<DoctorManagementPage />} />
                <Route path="/admin/staff" element={<StaffManagementPage />} />
                <Route path="/admin/patients" element={<AdminPatientsPage />} />
                <Route path="/admin/specialities" element={<SpecialityManagementPage />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
              </Route>
            </Route>

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ClinicProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
