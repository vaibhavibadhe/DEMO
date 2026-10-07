// client/src/pages/receptionist/ReceptionistAppointmentsPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useClinic } from '../../context/ClinicContext';
import {
  CalendarCheck,
  CalendarPlus,
  Clock,
  User,
  Stethoscope,
  Search,
  CheckCircle2,
  XCircle,
  Filter
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const ReceptionistAppointmentsPage = () => {
  const location = useLocation();
  const {
    appointments,
    doctors,
    patients,
    bookAppointment,
    updateAppointmentStatus
  } = useClinic();

  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Appointment Form
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM');
  const [symptoms, setSymptoms] = useState('');

  useEffect(() => {
    if (location.state?.prefillPatientId) {
      setSelectedPatientId(location.state.prefillPatientId);
      setShowCreateModal(true);
    }
  }, [location.state]);

  const handleBook = async (e) => {
    e.preventDefault();
    const doc = doctors.find((d) => d.id === selectedDoctorId);
    const pat = patients.find((p) => p.id === selectedPatientId);

    if (!doc || !pat) return;

    await bookAppointment({
      patientId: pat.id,
      patientName: pat.name,
      doctorId: doc.id,
      doctorName: doc.name,
      speciality: doc.speciality,
      date: selectedDate,
      timeSlot: selectedSlot,
      symptoms: symptoms || 'Frontdesk booked OPD',
      fee: doc.fee || 500
    });

    setShowCreateModal(false);
    setSymptoms('');
  };

  const filteredAppointments = appointments.filter((a) => {
    return (
      a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Appointment Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Schedule walk-in slots, inspect doctor schedules, and modify patient consultation statuses.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2 self-start sm:self-auto"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Book New OPD Slot</span>
        </button>
      </div>

      {/* Search & Doctor Availability Quick Row */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search patient, doctor, or token..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto w-full md:w-auto">
          <span className="font-semibold text-slate-700 whitespace-nowrap">Active OPD Cabins:</span>
          {doctors.slice(0, 3).map((d) => (
            <span key={d.id} className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] whitespace-nowrap">
              {d.name.split(' ')[1]}: <strong className="text-teal-700">{d.schedule?.timings}</strong>
            </span>
          ))}
        </div>
      </div>

      {/* Appointments Master Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Token</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Assigned Doctor</th>
                <th className="py-3 px-4">Date & Slot</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-teal-800">
                    {apt.tokenNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {apt.patientName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {apt.doctorName}
                    <span className="text-[10px] text-slate-400 block">{apt.speciality}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="block font-medium">{apt.date}</span>
                    <span className="text-[11px] text-slate-400">{apt.timeSlot}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        apt.status === 'Completed'
                          ? 'success'
                          : apt.status === 'In Consultation'
                          ? 'warning'
                          : apt.status === 'Cancelled'
                          ? 'danger'
                          : 'info'
                      }
                    >
                      {apt.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {apt.status === 'Waiting' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'In Consultation')}
                          className="px-2.5 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[11px] font-semibold"
                        >
                          Send to Cabin
                        </button>
                      )}
                      {apt.status !== 'Cancelled' && apt.status !== 'Completed' && (
                        <button
                          onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                          className="px-2 py-1 text-slate-400 hover:text-rose-600 text-[11px]"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Appointment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 border border-slate-200 shadow-xl text-xs">
            <h3 className="font-bold text-base text-slate-900">Schedule Patient Appointment</h3>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Select Patient</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
                  required
                >
                  <option value="">-- Choose Registered Patient --</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Select Doctor & Department</label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 bg-white"
                  required
                >
                  <option value="">-- Choose Doctor --</option>
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.speciality} - {d.roomNo})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Time Slot</label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Symptoms / Purpose</label>
                <input
                  type="text"
                  placeholder="e.g. Follow-up consultation"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
                >
                  Confirm & Generate Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
