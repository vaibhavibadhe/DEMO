// client/src/pages/doctor/DoctorPrescriptionsPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import {
  ClipboardList,
  Search,
  Printer,
  Calendar,
  User,
  ExternalLink
} from 'lucide-react';
import { PrescriptionPrintModal } from '../../components/patient/PrescriptionPrintModal';

export const DoctorPrescriptionsPage = () => {
  const { currentUser } = useAuth();
  const { prescriptions } = useClinic();
  const [selectedRx, setSelectedRx] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const docId = currentUser?.doctorId || 'doc-1';
  const myIssued = prescriptions.filter(
    (p) => p.doctorId === docId || p.doctorName === currentUser?.name
  );

  const filtered = myIssued.filter(
    (p) =>
      p.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.date.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Prescription Archive</h1>
          <p className="text-xs text-slate-500 mt-1">
            Certified electronic prescriptions authored and signed from this cabin.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search patient, diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Ref #</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Diagnosis</th>
                <th className="py-3 px-4">Medications Prescribed</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((rx) => (
                  <tr key={rx.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-teal-700">
                      #{rx.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {rx.patientName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {rx.diagnosis}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {rx.medicines?.map((m) => m.name).join(', ') || 'Medications'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {rx.date}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedRx(rx)}
                        className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold transition inline-flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Sheet</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    No prescriptions found matching search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prescription View Modal */}
      <PrescriptionPrintModal
        isOpen={!!selectedRx}
        onClose={() => setSelectedRx(null)}
        prescription={selectedRx}
      />
    </div>
  );
};
