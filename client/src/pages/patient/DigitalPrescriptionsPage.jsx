// client/src/pages/patient/DigitalPrescriptionsPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import {
  ClipboardList,
  Printer,
  Calendar,
  Stethoscope,
  User,
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { PrescriptionPrintModal } from '../../components/patient/PrescriptionPrintModal';

export const DigitalPrescriptionsPage = () => {
  const { currentUser } = useAuth();
  const { prescriptions } = useClinic();
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter prescriptions for this patient
  const myPrescriptions = prescriptions.filter(
    (p) => p.patientId === currentUser?.patientId || p.patientName === currentUser?.name
  );

  const filteredPrescriptions = myPrescriptions.filter(
    (p) =>
      p.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.date.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Digital Prescriptions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Certified electronic prescriptions with structured dosage schedules and printable letterhead view.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search diagnosis or doctor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.length > 0 ? (
          filteredPrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition space-y-4"
            >
              {/* Rx Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-serif italic text-2xl font-bold flex-shrink-0">
                    ℞
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{rx.doctorName}</h3>
                      <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-100">
                        {rx.doctorSpeciality}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{rx.doctorQualification} • {rx.doctorRoom || 'Cabin 101'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="text-right text-xs">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Issued On</span>
                    <span className="font-semibold text-slate-800">{rx.date}</span>
                  </div>

                  <button
                    onClick={() => setSelectedPrescription(rx)}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / View Sheet</span>
                  </button>
                </div>
              </div>

              {/* Diagnosis Banner */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Diagnosis / Assessment
                </span>
                <p className="font-semibold text-slate-900 mt-0.5">{rx.diagnosis}</p>
              </div>

              {/* Structured Medication Table */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Prescribed Medicines ({rx.medicines?.length || 0})
                </span>

                <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="py-2 px-3">Medicine</th>
                        <th className="py-2 px-3">Dosage</th>
                        <th className="py-2 px-3">Frequency</th>
                        <th className="py-2 px-3">Duration</th>
                        <th className="py-2 px-3">Special Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rx.medicines?.map((med, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50">
                          <td className="py-2.5 px-3 font-semibold text-slate-900">{med.name}</td>
                          <td className="py-2.5 px-3 text-slate-700">{med.dosage}</td>
                          <td className="py-2.5 px-3">
                            <span className="bg-teal-50 text-teal-800 border border-teal-100 px-2 py-0.5 rounded font-mono text-[11px]">
                              {med.frequency}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">{med.duration}</td>
                          <td className="py-2.5 px-3 text-slate-500">{med.instructions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Advice & Follow-up */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                <div>
                  <strong className="text-slate-700">General Advice:</strong> {rx.generalAdvice || 'Take with warm water after meals.'}
                </div>
                <div className="flex items-center gap-1.5 font-semibold text-teal-700">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Follow-up: {rx.followUpDate || 'SOS (As needed)'}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-2">
            <ClipboardList className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm text-slate-700">No digital prescriptions found</h3>
            <p className="text-xs text-slate-400">
              When a physician completes an OPD consultation, the verified prescription will be displayed here immediately.
            </p>
          </div>
        )}
      </div>

      {/* Prescription Print Modal */}
      <PrescriptionPrintModal
        isOpen={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
        prescription={selectedPrescription}
      />
    </div>
  );
};
