// client/src/pages/patient/PatientDashboard.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import { Link } from 'react-router-dom';
import {
  CalendarPlus,
  Clock,
  ClipboardList,
  Sparkles,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Stethoscope,
  HeartPulse,
  Activity,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { PrescriptionPrintModal } from '../../components/patient/PrescriptionPrintModal';

export const PatientDashboard = () => {
  const { currentUser } = useAuth();
  const { appointments, prescriptions } = useClinic();

  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Filter patient's appointments
  const myAppointments = appointments.filter(
    (a) => a.patientId === currentUser?.patientId || a.patientName === currentUser?.name
  );

  const upcomingApt = myAppointments.find(
    (a) => a.status === 'Waiting' || a.status === 'In Consultation' || a.status === 'Scheduled'
  );

  // Patient's latest prescription
  const myPrescriptions = prescriptions.filter(
    (p) => p.patientId === currentUser?.patientId || p.patientName === currentUser?.name
  );
  const latestPrescription = myPrescriptions[0];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Consultation':
        return <Badge variant="warning" size="sm">In Consultation Cabin</Badge>;
      case 'Waiting':
        return <Badge variant="info" size="sm">Waiting in OPD Lounge</Badge>;
      case 'Scheduled':
        return <Badge variant="default" size="sm">Slot Confirmed</Badge>;
      case 'Completed':
        return <Badge variant="success" size="sm">Completed</Badge>;
      default:
        return <Badge variant="default" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Patient Portal</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, {currentUser?.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your outpatient consultations, live queue tokens, and certified electronic prescriptions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/patient/book-opd"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Book New OPD</span>
          </Link>
          <Link
            to="/patient/ai-urgency"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Check Symptoms</span>
          </Link>
        </div>
      </div>

      {/* AI Urgency Shortcut Banner */}
      <div className="bg-radial from-teal-800 to-slate-900 text-white p-6 rounded-3xl border border-teal-700/50 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <div className="flex items-center gap-2 text-teal-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Smart Decision Support</span>
          </div>
          <h3 className="text-lg font-bold">Unsure which doctor or speciality to consult?</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our AI Urgency analysis tool assesses your symptoms, classifies urgency level, and suggests the appropriate department for booking.
          </p>
        </div>
        <Link
          to="/patient/ai-urgency"
          className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition flex-shrink-0 flex items-center gap-1.5"
        >
          <span>Run Symptom Triage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Grid: Upcoming Appointment & Recent Prescription */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Appointment Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CalendarCheck className="w-4 h-4 text-teal-600" /> Upcoming Appointment
              </span>
              {upcomingApt && getStatusBadge(upcomingApt.status)}
            </div>

            {upcomingApt ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{upcomingApt.doctorName}</h4>
                      <p className="text-xs text-teal-600 font-medium">{upcomingApt.speciality}</p>
                      <p className="text-[11px] text-slate-500 mt-1">Reason: {upcomingApt.symptoms}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Token No</span>
                    <span className="text-lg font-black text-teal-700 font-mono">{upcomingApt.tokenNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Scheduled Date</span>
                    <span className="font-semibold text-slate-800">{upcomingApt.date}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">OPD Time Window</span>
                    <span className="font-semibold text-slate-800">{upcomingApt.timeSlot}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <CalendarCheck className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs font-medium text-slate-600">No active appointment today.</p>
                <p className="text-[11px] text-slate-400">Book an OPD slot with any of our certified physicians.</p>
              </div>
            )}
          </div>

          <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
            <Link to="/patient/appointments" className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-1">
              <span>View all appointments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {upcomingApt && (
              <span className="text-[11px] text-slate-400">Please arrive 10 min before time slot</span>
            )}
          </div>
        </div>

        {/* Latest Prescription Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <ClipboardList className="w-4 h-4 text-teal-600" /> Recent Digital Prescription
              </span>
              {latestPrescription && (
                <Badge variant="primary" size="sm">Issued {latestPrescription.date}</Badge>
              )}
            </div>

            {latestPrescription ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-teal-800 tracking-wider">Diagnosis</span>
                      <h4 className="font-bold text-sm text-slate-900 mt-0.5">{latestPrescription.diagnosis}</h4>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Ref: #{latestPrescription.id}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Prescribed by <strong className="text-slate-800">{latestPrescription.doctorName}</strong> ({latestPrescription.doctorSpeciality})
                  </p>
                </div>

                {/* Structured Medicine preview */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Medications</span>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
                    {latestPrescription.medicines.slice(0, 2).map((med, idx) => (
                      <div key={idx} className="p-2.5 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-slate-900">{med.name}</span>
                          <span className="text-slate-500 text-[11px] ml-1.5">({med.dosage})</span>
                        </div>
                        <span className="text-slate-600 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                          {med.frequency}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <ClipboardList className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs font-medium text-slate-600">No prescriptions issued yet.</p>
                <p className="text-[11px] text-slate-400">Prescriptions issued by your doctor will show here instantly.</p>
              </div>
            )}
          </div>

          <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
            {latestPrescription ? (
              <button
                onClick={() => setSelectedPrescription(latestPrescription)}
                className="text-teal-600 font-semibold hover:text-teal-700 flex items-center gap-1"
              >
                <span>View Full Prescription / Print</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link to="/patient/records" className="text-teal-600 font-semibold hover:text-teal-700">
                Browse medical records
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/patient/specialities"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xs transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition">
            <Activity className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Explore Specialities</h4>
          <p className="text-xs text-slate-500 mt-1">General Medicine, Pediatrics, Ortho, Derm & more.</p>
        </Link>

        <Link
          to="/patient/records"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xs transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:bg-sky-600 group-hover:text-white transition">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Medical Records</h4>
          <p className="text-xs text-slate-500 mt-1">Consultation notes, clinical vitals & past advice.</p>
        </Link>

        <Link
          to="/patient/prescriptions"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xs transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Digital Prescriptions</h4>
          <p className="text-xs text-slate-500 mt-1">Verified dosages, schedule & printable sheets.</p>
        </Link>
      </div>

      {/* Prescription View Modal */}
      <PrescriptionPrintModal
        isOpen={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
        prescription={selectedPrescription}
      />
    </div>
  );
};
