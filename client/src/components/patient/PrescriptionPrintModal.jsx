// client/src/components/patient/PrescriptionPrintModal.jsx
import React from 'react';
import { Modal } from '../common/Modal';
import { Printer, HeartPulse, CheckCircle2, Calendar, User, Stethoscope, ShieldCheck } from 'lucide-react';

export const PrescriptionPrintModal = ({ isOpen, onClose, prescription }) => {
  if (!prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Digital Prescription Record"
      subtitle={`Rx Reference: #${prescription.id}`}
      maxWidth="max-w-3xl"
    >
      <div className="space-y-6">
        {/* Actions bar */}
        <div className="flex items-center justify-between no-print bg-slate-50 p-3 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Digitally verified clinical prescription</span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        {/* Printable Official Prescription Sheet */}
        <div className="printable-card bg-white border border-slate-300 rounded-2xl p-6 sm:p-8 text-slate-800 shadow-xs">
          {/* Clinic Letterhead Header */}
          <div className="border-b-2 border-teal-600 pb-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                  <HeartPulse className="w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">SMART CLINIC HEALTHCARE</h2>
                  <p className="text-xs text-slate-500">Multi-Speciality Outpatient Center & Diagnostic Services</p>
                  <p className="text-[11px] text-slate-400">Reg No: MH-PUN-2024-9842 | NABH Accredited</p>
                </div>
              </div>
              <div className="text-left sm:text-right text-xs text-slate-500">
                <p className="font-semibold text-slate-700">Helpline: +91 20 2555 0199</p>
                <p>care@smartclinic.org</p>
                <p>Sector 14, Health Park, Pune</p>
              </div>
            </div>
          </div>

          {/* Doctor & Patient Info Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
            {/* Doctor Info */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Consultant Physician</span>
              <p className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                {prescription.doctorName}
              </p>
              <p className="text-slate-600">{prescription.doctorQualification}</p>
              <p className="text-teal-700 font-medium">{prescription.doctorSpeciality} • {prescription.doctorRoom || 'Cabin 101'}</p>
            </div>

            {/* Patient Info */}
            <div className="space-y-1 sm:text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Patient Details</span>
              <p className="font-bold text-slate-900 text-sm flex items-center sm:justify-end gap-1.5">
                <User className="w-3.5 h-3.5 text-teal-600" />
                {prescription.patientName}
              </p>
              <p className="text-slate-600">
                Age: {prescription.patientAge || '28'} Yrs • Gender: {prescription.patientGender || 'Male'}
              </p>
              <p className="text-slate-500 flex items-center sm:justify-end gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Date: {prescription.date}
              </p>
            </div>
          </div>

          {/* Clinical Assessment / Diagnosis */}
          <div className="my-5 bg-teal-50/50 p-3.5 rounded-xl border border-teal-100">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800">Primary Clinical Diagnosis:</span>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">{prescription.diagnosis}</p>
          </div>

          {/* Prescribed Medications Section */}
          <div className="space-y-3 my-6">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-lg">
              <span className="italic font-serif text-2xl font-black">℞</span>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Prescribed Medications</span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">#</th>
                    <th className="py-2.5 px-3 font-semibold">Medicine Name</th>
                    <th className="py-2.5 px-3 font-semibold">Dosage</th>
                    <th className="py-2.5 px-3 font-semibold">Frequency</th>
                    <th className="py-2.5 px-3 font-semibold">Duration</th>
                    <th className="py-2.5 px-3 font-semibold">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {prescription.medicines?.map((med, index) => (
                    <tr key={index} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 text-slate-400 font-mono">{index + 1}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{med.name}</td>
                      <td className="py-2.5 px-3 font-medium text-slate-700">{med.dosage}</td>
                      <td className="py-2.5 px-3 text-slate-700">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[11px] font-medium">
                          {med.frequency}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700">{med.duration}</td>
                      <td className="py-2.5 px-3 text-slate-600">{med.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Advice & Follow-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">General Clinical Advice:</span>
              <p className="text-slate-600 mt-1 leading-relaxed">
                {prescription.generalAdvice || 'Take plenty of fluids and rest. Avoid self-medication.'}
              </p>
            </div>
            <div>
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px]">Review / Follow-up:</span>
              <p className="text-slate-900 font-semibold mt-1 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600" />
                {prescription.followUpDate ? `Follow-up on: ${prescription.followUpDate}` : 'SOS (As needed or if symptoms persist)'}
              </p>
            </div>
          </div>

          {/* Footer Signature */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="text-[11px] text-slate-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Electronically signed & certified via Smart Clinic System</span>
            </div>
            <div className="text-right">
              <div className="font-serif italic text-teal-800 text-sm font-bold">
                {prescription.doctorName}
              </div>
              <div className="border-t border-slate-400 pt-1 mt-1 text-[11px] text-slate-500">
                Authorized Signature & Seal
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
