// client/src/pages/doctor/DoctorOPDPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Play,
  CheckCircle2,
  AlertCircle,
  Search,
  User,
  Stethoscope,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const DoctorOPDPage = () => {
  const { currentUser } = useAuth();
  const { appointments, updateAppointmentStatus } = useClinic();
  const navigate = useNavigate();

  const docId = currentUser?.doctorId || 'doc-1';
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const docAppointments = appointments.filter(
    (a) => a.doctorId === docId || a.doctorName === currentUser?.name
  );

  const filtered = docAppointments.filter((a) => {
    if (filterStatus !== 'all' && a.status !== filterStatus) return false;
    if (
      searchQuery &&
      !a.patientName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !a.tokenNumber.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleStartConsultation = (apt) => {
    updateAppointmentStatus(apt.id, 'In Consultation');
    navigate(`/doctor/consultation/${apt.id}`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Consultation':
        return <Badge variant="warning">In Consultation</Badge>;
      case 'Waiting':
        return <Badge variant="info">Waiting</Badge>;
      case 'Scheduled':
        return <Badge variant="default">Scheduled</Badge>;
      case 'Completed':
        return <Badge variant="success">Completed</Badge>;
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
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Today's OPD Queue</h1>
          <p className="text-xs text-slate-500 mt-1">
            Review outpatient line, call waiting tokens into cabin, and conduct clinical assessments.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search patient or token..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
        {[
          { id: 'all', label: `All OPD (${docAppointments.length})` },
          { id: 'Waiting', label: `Waiting (${docAppointments.filter((a) => a.status === 'Waiting').length})` },
          { id: 'In Consultation', label: `In Cabin (${docAppointments.filter((a) => a.status === 'In Consultation').length})` },
          { id: 'Completed', label: `Completed (${docAppointments.filter((a) => a.status === 'Completed').length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterStatus(tab.id)}
            className={`px-3 py-1.5 rounded-xl transition ${
              filterStatus === tab.id
                ? 'bg-teal-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Token</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Slot Time</th>
                <th className="py-3 px-4">Complaints</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                      {apt.tokenNumber}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {apt.patientName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {apt.timeSlot}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                      {apt.symptoms || 'General consultation'}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(apt.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {apt.status === 'Completed' ? (
                        <button
                          onClick={() => navigate(`/doctor/consultation/${apt.id}`)}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
                        >
                          View Assessment
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStartConsultation(apt)}
                          className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold transition inline-flex items-center gap-1.5 shadow-2xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>{apt.status === 'In Consultation' ? 'Resume Consult' : 'Start Consult'}</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    No OPD appointments match the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
