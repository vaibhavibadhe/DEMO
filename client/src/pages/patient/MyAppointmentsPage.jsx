// client/src/pages/patient/MyAppointmentsPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import { Link } from 'react-router-dom';
import {
  CalendarCheck,
  CalendarPlus,
  Clock,
  User,
  Stethoscope,
  XCircle,
  AlertCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const MyAppointmentsPage = () => {
  const { currentUser } = useAuth();
  const { appointments, updateAppointmentStatus } = useClinic();

  const [activeTab, setActiveTab] = useState('all'); // all, upcoming, completed, cancelled
  const [cancelModalApt, setCancelModalApt] = useState(null);

  // Filter appointments for current patient
  const myAppointments = appointments.filter(
    (a) => a.patientId === currentUser?.patientId || a.patientName === currentUser?.name
  );

  const filteredAppointments = myAppointments.filter((a) => {
    if (activeTab === 'upcoming') {
      return a.status === 'Waiting' || a.status === 'Scheduled' || a.status === 'In Consultation';
    }
    if (activeTab === 'completed') return a.status === 'Completed';
    if (activeTab === 'cancelled') return a.status === 'Cancelled';
    return true;
  });

  const handleConfirmCancel = () => {
    if (cancelModalApt) {
      updateAppointmentStatus(cancelModalApt.id, 'Cancelled');
      setCancelModalApt(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Consultation':
        return <Badge variant="warning">In Consultation</Badge>;
      case 'Waiting':
        return <Badge variant="info">Waiting in Lounge</Badge>;
      case 'Scheduled':
        return <Badge variant="default">Scheduled</Badge>;
      case 'Completed':
        return <Badge variant="success">Consultation Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My OPD Appointments</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track consultation schedule, real-time token calling status, and history.
          </p>
        </div>

        <Link
          to="/patient/book-opd"
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2 self-start sm:self-auto"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Book New OPD Slot</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
        {[
          { id: 'all', label: 'All Appointments' },
          { id: 'upcoming', label: 'Upcoming / Active' },
          { id: 'completed', label: 'Completed' },
          { id: 'cancelled', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-xl transition ${
              activeTab === tab.id
                ? 'bg-teal-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Appointment Cards List */}
      <div className="space-y-4">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((apt) => {
            const isCancellable =
              apt.status === 'Waiting' || apt.status === 'Scheduled';

            return (
              <div
                key={apt.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{apt.doctorName}</h3>
                      <p className="text-xs text-teal-600 font-medium">{apt.speciality}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Token</span>
                      <span className="font-mono font-black text-lg text-teal-700">{apt.tokenNumber}</span>
                    </div>
                    {getStatusBadge(apt.status)}
                  </div>
                </div>

                {/* Details row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Date</span>
                    <span className="font-semibold text-slate-800">{apt.date}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Time Slot</span>
                    <span className="font-semibold text-slate-800">{apt.timeSlot}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">Consultation Type</span>
                    <span className="font-semibold text-slate-800">{apt.type || 'Regular OPD'}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-medium">OPD Fee</span>
                    <span className="font-semibold text-slate-800">₹{apt.fee} (Paid)</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 bg-slate-50/50 p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                  <span className="truncate">
                    <strong className="text-slate-700">Reported Symptoms:</strong> {apt.symptoms || 'General health review'}
                  </span>

                  {isCancellable && (
                    <button
                      onClick={() => setCancelModalApt(apt)}
                      className="ml-3 text-rose-600 hover:text-rose-800 font-semibold text-xs transition flex-shrink-0"
                    >
                      Cancel Slot
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <CalendarCheck className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm text-slate-700">No appointments found</h3>
            <p className="text-xs text-slate-400">
              You don't have any appointments matching this tab filter.
            </p>
            <Link
              to="/patient/book-opd"
              className="inline-block mt-2 px-4 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 transition"
            >
              Book an Appointment
            </Link>
          </div>
        )}
      </div>

      {/* Cancel Confirmation Modal */}
      {cancelModalApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 border border-slate-200 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <XCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-base text-slate-900">Cancel Appointment?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to cancel token <strong className="text-slate-700">{cancelModalApt.tokenNumber}</strong> with {cancelModalApt.doctorName}?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setCancelModalApt(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Keep Slot
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-xs"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
