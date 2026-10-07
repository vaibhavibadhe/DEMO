// client/src/pages/patient/MedicalRecordsPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import {
  FileText,
  Activity,
  Heart,
  Calendar,
  Lock,
  Stethoscope,
  ClipboardList,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { PrescriptionPrintModal } from '../../components/patient/PrescriptionPrintModal';

export const MedicalRecordsPage = () => {
  const { currentUser } = useAuth();
  const { consultations, prescriptions, patients } = useClinic();
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Find patient record
  const patientProfile =
    patients.find((p) => p.id === currentUser?.patientId || p.name === currentUser?.name) || {
      name: currentUser?.name || 'Rohan Verma',
      age: 28,
      bloodGroup: 'B+',
      allergies: ['Penicillin (mild rash)'],
      phone: '+91 98765 43210',
      emergencyContact: 'Anand Verma (+91 98765 43211)'
    };

  // Consultations for this patient
  const myConsultations = consultations.filter(
    (c) => c.patientId === currentUser?.patientId || c.patientName === currentUser?.name
  );

  const handleOpenPrescription = (consultationId) => {
    const rx = prescriptions.find((p) => p.consultationId === consultationId);
    if (rx) {
      setSelectedPrescription(rx);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Personal Medical Records</h1>
          <p className="text-xs text-slate-500 mt-1">
            Historical clinical assessments, doctor findings, and electronic records timeline.
          </p>
        </div>

        {/* Read-Only Safeguard Notice */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Finalized Clinical Records (Read-Only)</span>
        </div>
      </div>

      {/* Patient Health Summary Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Patient Health Profile
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Full Name</span>
            <span className="font-bold text-slate-900">{patientProfile.name}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Age & Blood Group</span>
            <span className="font-bold text-slate-900">
              {patientProfile.age} Yrs • <strong className="text-rose-600 font-bold">{patientProfile.bloodGroup}</strong>
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] text-slate-400 block font-medium">Emergency Contact</span>
            <span className="font-medium text-slate-800">{patientProfile.emergencyContact}</span>
          </div>

          <div className="p-3 bg-rose-50/50 rounded-2xl border border-rose-100">
            <span className="text-[10px] text-rose-500 block font-bold">Documented Allergies</span>
            <span className="font-semibold text-rose-700">
              {patientProfile.allergies?.join(', ') || 'None reported'}
            </span>
          </div>
        </div>
      </div>

      {/* Clinical Timeline Section */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Activity className="w-4 h-4 text-teal-600" />
          <span>Consultation Timeline & Doctor Assessments</span>
        </h2>

        {myConsultations.length > 0 ? (
          <div className="space-y-6">
            {myConsultations.map((con, idx) => (
              <div
                key={con.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-5"
              >
                {/* Doctor and Date header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{con.doctorName}</h3>
                      <p className="text-xs text-teal-600 font-medium">{con.speciality}</p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right text-xs">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                      Consultation Date
                    </span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {con.date}
                    </span>
                  </div>
                </div>

                {/* Vitals Signs Card */}
                {con.vitals && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Clinical Vitals Recorded
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Blood Pressure</span>
                        <span className="font-semibold text-slate-800">{con.vitals.bloodPressure || '120/80 mmHg'}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Pulse Rate</span>
                        <span className="font-semibold text-slate-800">{con.vitals.pulseRate || '76 bpm'}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Temperature</span>
                        <span className="font-semibold text-slate-800">{con.vitals.temperature || '98.6 °F'}</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block">Oxygen Saturation</span>
                        <span className="font-semibold text-slate-800">{con.vitals.spO2 || '99%'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Chief Complaints & Clinical Findings */}
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                      Chief Complaints:
                    </span>
                    <p className="text-slate-600 mt-0.5">{con.chiefComplaints}</p>
                  </div>

                  <div className="p-3.5 bg-teal-50/50 rounded-2xl border border-teal-100">
                    <span className="font-bold text-teal-800 uppercase tracking-wider text-[10px] block">
                      Confirmed Assessment / Diagnosis:
                    </span>
                    <p className="font-bold text-sm text-slate-900 mt-1">{con.diagnosis}</p>
                  </div>

                  {con.clinicalNotes && (
                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                        Doctor's Clinical Notes:
                      </span>
                      <p className="text-slate-600 mt-0.5 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                        {con.clinicalNotes}
                      </p>
                    </div>
                  )}

                  {con.advice && (
                    <div>
                      <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                        General Advice:
                      </span>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">{con.advice}</p>
                    </div>
                  )}
                </div>

                {/* Follow-up & Action bar */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="text-slate-600 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>
                      Follow-up recommended: <strong className="text-slate-900">{con.followUpDate || 'SOS / As required'}</strong>
                    </span>
                  </div>

                  <button
                    onClick={() => handleOpenPrescription(con.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 text-xs font-semibold transition flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <ClipboardList className="w-3.5 h-3.5" />
                    <span>View Prescribed Medication</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-2">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-sm text-slate-700">No past clinical consultations</h3>
            <p className="text-xs text-slate-400">
              When a doctor finalizes your consultation, your complete clinical assessment will be recorded here.
            </p>
          </div>
        )}
      </div>

      {/* Prescription Modal */}
      <PrescriptionPrintModal
        isOpen={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
        prescription={selectedPrescription}
      />
    </div>
  );
};
