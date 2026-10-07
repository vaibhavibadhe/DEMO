// client/src/pages/admin/AdminPatientsPage.jsx
import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Users,
  Search,
  Phone,
  Mail,
  Calendar,
  Heart,
  FileText
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const AdminPatientsPage = () => {
  const { patients, consultations, appointments } = useClinic();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Registry & Longitudinal Records</h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete clinic patient directory, demographics, and clinical visit tallies.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Demographics</th>
                <th className="py-3 px-4">Blood Group & Allergies</th>
                <th className="py-3 px-4">Registration Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((p) => {
                const visitCount = appointments.filter(
                  (a) => a.patientId === p.id || a.patientName === p.name
                ).length;

                return (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div>
                        <span>{p.name}</span>
                        <span className="text-[10px] text-slate-400 block font-mono font-normal">ID: {p.id}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="block font-medium">{p.phone}</span>
                      <span className="text-[11px] text-slate-400">{p.email}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <span>{p.age} Yrs • {p.gender}</span>
                      <span className="text-[10px] text-teal-600 block font-medium">
                        {visitCount} OPD Visits
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      <span className="font-bold text-rose-600 block">{p.bloodGroup}</span>
                      <span className="text-[10px] text-slate-400">
                        {p.allergies?.join(', ') || 'No allergies'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {p.registeredAt || '2026-08-15'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedPatient(p)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 text-slate-700 font-semibold transition text-[11px]"
                      >
                        Inspect Record
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <Modal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          title={`Patient Record: ${selectedPatient.name}`}
          subtitle={`Registered Profile ID: #${selectedPatient.id}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Phone Number</span>
                <span className="font-semibold text-slate-800">{selectedPatient.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Email</span>
                <span className="font-semibold text-slate-800">{selectedPatient.email}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Age & Gender</span>
                <span className="font-semibold text-slate-800">{selectedPatient.age} Yrs • {selectedPatient.gender}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Blood Group</span>
                <span className="font-bold text-rose-600">{selectedPatient.bloodGroup}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Address</span>
                <span className="text-slate-700">{selectedPatient.address}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-slate-400 block font-bold uppercase">Emergency Contact</span>
                <span className="text-slate-700">{selectedPatient.emergencyContact || 'None provided'}</span>
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
