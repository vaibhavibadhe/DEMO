// client/src/pages/receptionist/ReceptionistDashboard.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import { Link } from 'react-router-dom';
import {
  ClipboardList,
  Clock,
  UserPlus,
  CalendarCheck,
  CheckCircle2,
  Users,
  Volume2,
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';
import { Badge } from '../../components/common/Badge';

export const ReceptionistDashboard = () => {
  const { currentUser } = useAuth();
  const { appointments, queue, updateQueueToken, doctors, patients } = useClinic();

  const waitingCount = queue.tokens.filter((t) => t.status === 'Waiting').length;
  const inConsultCount = queue.tokens.filter((t) => t.status === 'In Consultation').length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

  const handleCallToken = (token) => {
    updateQueueToken(token, 'In Consultation');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold mb-2">
            <ClipboardList className="w-3.5 h-3.5 text-amber-600" />
            <span>OPD Frontdesk Reception & Patient Coordination</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Frontdesk Desk • {currentUser?.name || 'Pooja Deshmukh'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage live outpatient queue, call waiting tokens, and register walk-in patient admissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/receptionist/registration"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Register Walk-in</span>
          </Link>
          <Link
            to="/receptionist/queue"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4 text-teal-600" />
            <span>Live Queue Screen</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Active Calling Token"
          value={queue.currentToken || 'T-102'}
          subtitle={queue.currentTokenPatient || 'Patient In Cabin'}
          icon={Volume2}
          color="teal"
        />
        <StatsCard
          title="Waiting in Lounge"
          value={waitingCount}
          subtitle="Tokens awaiting call"
          icon={Clock}
          color="amber"
        />
        <StatsCard
          title="In Consultations"
          value={inConsultCount}
          subtitle="Currently inside cabins"
          icon={Stethoscope}
          color="blue"
        />
        <StatsCard
          title="Completed Today"
          value={completedCount}
          subtitle="Consults completed"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Live Token Caller Banner */}
      <div className="bg-radial from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[11px] font-bold uppercase tracking-widest text-teal-400">
            Digital Token Public Announcement Display
          </span>
          <div className="flex items-baseline justify-center md:justify-start gap-3">
            <span className="text-4xl sm:text-5xl font-black font-mono text-teal-300">
              {queue.currentToken || 'T-102'}
            </span>
            <span className="text-lg text-slate-300 font-semibold">
              — {queue.currentTokenPatient || 'Rohan Verma'}
            </span>
          </div>
          <p className="text-xs text-slate-400">Status: <strong className="text-emerald-400">Cabin 101 • In Consultation</strong></p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/receptionist/queue"
            className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
          >
            <span>Manage Live Caller</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Grid: Quick Queue Table & Fast Registration Shortcut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Waiting tokens */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">Waiting Patients Queue ({waitingCount})</h3>
            <Link to="/receptionist/queue" className="text-xs font-semibold text-teal-600 hover:text-teal-700">
              Full Queue Table →
            </Link>
          </div>

          <div className="space-y-2">
            {queue.tokens.filter((t) => t.status === 'Waiting').length > 0 ? (
              queue.tokens
                .filter((t) => t.status === 'Waiting')
                .map((tokenItem) => (
                  <div
                    key={tokenItem.token}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-black text-sm text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                        {tokenItem.token}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 block">{tokenItem.patientName}</span>
                        <span className="text-[11px] text-slate-500">Arrived: {tokenItem.arrivalTime || '09:30 AM'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCallToken(tokenItem.token)}
                        className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition"
                      >
                        Call to Cabin
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="py-8 text-center text-xs text-slate-400">
                No patients currently waiting in the lounge.
              </div>
            )}
          </div>
        </div>

        {/* Doctors on Duty Overview */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900">Doctors on Duty</h3>
          <div className="space-y-3">
            {doctors.slice(0, 4).map((doc) => (
              <div key={doc.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3 text-xs">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-slate-900 truncate block">{doc.name}</span>
                  <span className="text-[11px] text-teal-600 font-medium block truncate">{doc.speciality}</span>
                  <span className="text-[10px] text-slate-400 block">{doc.roomNo}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/receptionist/appointments"
              className="text-xs text-teal-600 font-semibold hover:text-teal-700 flex items-center justify-between"
            >
              <span>Book Appointment for Patient</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
