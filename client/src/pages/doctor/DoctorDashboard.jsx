// client/src/pages/doctor/DoctorDashboard.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Users,
  Clock,
  CheckCircle2,
  CalendarCheck,
  ArrowRight,
  ClipboardList,
  AlertCircle,
  Play
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';

export const DoctorDashboard = () => {
  const { currentUser } = useAuth();
  const { appointments, queue, updateAppointmentStatus } = useClinic();
  const navigate = useNavigate();

  const docId = currentUser?.doctorId || 'doc-1';

  // Filter doctor's appointments
  const docAppointments = appointments.filter(
    (a) => a.doctorId === docId || a.doctorName === currentUser?.name
  );

  const waitingCount = docAppointments.filter((a) => a.status === 'Waiting').length;
  const inConsultCount = docAppointments.filter((a) => a.status === 'In Consultation').length;
  const completedCount = docAppointments.filter((a) => a.status === 'Completed').length;
  const totalToday = docAppointments.length;

  const currentPatient = docAppointments.find((a) => a.status === 'In Consultation');
  const nextWaiting = docAppointments.find((a) => a.status === 'Waiting');

  const handleStartConsultation = (apt) => {
    updateAppointmentStatus(apt.id, 'In Consultation');
    navigate(`/doctor/consultation/${apt.id}`);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-semibold mb-2">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctor OPD Cabin • {currentUser?.speciality || 'General Medicine'}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentUser?.name || 'Dr. Rajesh Mehta'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Active OPD Session: Cabin 101 • Manage waiting queue, clinical diagnoses & electronic prescriptions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/doctor/opd"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>Manage OPD Queue</span>
          </Link>
          <Link
            to="/doctor/patients"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-teal-600" />
            <span>Patient Roster</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's OPD Bookings"
          value={totalToday}
          subtitle="Total patients registered"
          icon={CalendarCheck}
          color="teal"
        />
        <StatsCard
          title="Waiting in Lounge"
          value={waitingCount}
          subtitle="Patients in queue"
          icon={Clock}
          color="amber"
        />
        <StatsCard
          title="In Cabin Now"
          value={inConsultCount}
          subtitle="Under clinical review"
          icon={Stethoscope}
          color="blue"
        />
        <StatsCard
          title="Completed Consults"
          value={completedCount}
          subtitle="Prescriptions finalized"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Active Consultation Prompt / Next Patient */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Currently in Cabin */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
              Currently in Consultation Cabin
            </span>

            {currentPatient ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-teal-800 block">
                      Token #{currentPatient.tokenNumber}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 mt-0.5">{currentPatient.patientName}</h3>
                    <p className="text-xs text-slate-600 mt-1">
                      <strong>Complaints:</strong> {currentPatient.symptoms}
                    </p>
                  </div>
                  <Badge variant="warning" size="sm">In Cabin</Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Slot Time</span>
                    <span className="font-semibold text-slate-800">{currentPatient.timeSlot}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Type</span>
                    <span className="font-semibold text-slate-800">{currentPatient.type || 'Regular OPD'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center space-y-2">
                <Stethoscope className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-xs font-medium text-slate-600">No patient currently in cabin.</p>
                <p className="text-[11px] text-slate-400">Call the next waiting patient from the queue below.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            {currentPatient ? (
              <button
                onClick={() => navigate(`/doctor/consultation/${currentPatient.id}`)}
                className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
              >
                <span>Continue Clinical Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              nextWaiting && (
                <button
                  onClick={() => handleStartConsultation(nextWaiting)}
                  className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Call Next Token: {nextWaiting.tokenNumber} ({nextWaiting.patientName})</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Next in Waiting Queue */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Next in Waiting Lounge ({waitingCount})
              </span>
              <Link to="/doctor/opd" className="text-xs font-semibold text-teal-600 hover:text-teal-700">
                View All Queue →
              </Link>
            </div>

            <div className="space-y-2.5">
              {docAppointments
                .filter((a) => a.status === 'Waiting')
                .slice(0, 3)
                .map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded border border-teal-200">
                        {apt.tokenNumber}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 block">{apt.patientName}</span>
                        <span className="text-slate-500 text-[11px] truncate block max-w-xs">{apt.symptoms}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleStartConsultation(apt)}
                      className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold transition"
                    >
                      Call Cabin
                    </button>
                  </div>
                ))}

              {waitingCount === 0 && (
                <div className="py-8 text-center text-xs text-slate-400">
                  All waiting patients have been attended to.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
            <span>Average consultation duration: 12 mins</span>
            <Link to="/doctor/prescriptions" className="text-teal-600 font-semibold hover:text-teal-700">
              Prescription history
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
