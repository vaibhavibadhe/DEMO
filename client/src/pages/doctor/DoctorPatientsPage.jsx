// client/src/pages/doctor/DoctorPatientsPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import {
  Users,
  Search,
  Calendar,
  FileText,
  ClipboardList,
  AlertCircle,
  Stethoscope,
  Activity,
  Heart
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';
import { PrescriptionPrintModal } from '../../components/patient/PrescriptionPrintModal';

export const DoctorPatientsPage = () => {
  const { patients, consultations, prescriptions, appointments } = useClinic();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientModal, setSelectedPatientModal] = useState(null);
  const [selectedRx, setSelectedRx] = useState(null);

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      (p.bloodGroup && p.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleOpenPatientHistory = (patient) => {
    setSelectedPatientModal(patient);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Directory & Clinical History</h1>
          <p className="text-xs text-slate-500 mt-1">
            Access longitudinal patient records, past consultation notes, and historical prescriptions.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, phone, or blood group..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => {
          const patientConsultations = consultations.filter(
            (c) => c.patientId === patient.id || c.patientName === patient.name
          );
          const patientApts = appointments.filter(
            (a) => a.patientId === patient.id || a.patientName === patient.name
          );
          const lastVisit = patientApts[0]?.date || 'None';

          return (
            <div
              key={patient.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-bold text-base text-slate-900">{patient.name}</h3>
                    <p className="text-xs text-slate-500">{patient.phone}</p>
                  </div>
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                    {patient.bloodGroup}
                  </span>
                </div>

                <div className="space-y-2 mt-3 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Age & Gender:</span>
                    <span className="font-semibold text-slate-800">{patient.age} Yrs • {patient.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Clinic Visit:</span>
                    <span className="font-semibold text-slate-800">{lastVisit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Consultations:</span>
                    <span className="font-semibold text-teal-700">{patientConsultations.length}</span>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Documented Allergies:</span>
                    <span className="text-[11px] font-semibold text-rose-700">
                      {patient.allergies?.join(', ') || 'None reported'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleOpenPatientHistory(patient)}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200 border border-transparent rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Open Longitudinal History</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Patient History Modal */}
      {selectedPatientModal && (
        <Modal
          isOpen={!!selectedPatientModal}
          onClose={() => setSelectedPatientModal(null)}
          title={`Clinical History: ${selectedPatientModal.name}`}
          subtitle={`Age: ${selectedPatientModal.age} • Blood Group: ${selectedPatientModal.bloodGroup} • Phone: ${selectedPatientModal.phone}`}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            {/* Allergies & Vitals banner */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Documented Allergies</span>
                <span className="font-bold text-rose-700">{selectedPatientModal.allergies?.join(', ') || 'None'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Emergency Contact</span>
                <span className="font-semibold text-slate-800">{selectedPatientModal.emergencyContact || 'Not recorded'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Registered On</span>
                <span className="font-semibold text-slate-800">{selectedPatientModal.registeredAt || '2026-08-15'}</span>
              </div>
            </div>

            {/* Past Consultations Timeline */}
            <div>
              <h4 className="font-bold text-sm text-slate-900 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-teal-600" />
                <span>Historical Consultations & Assessments</span>
              </h4>

              {consultations.filter(
                (c) => c.patientId === selectedPatientModal.id || c.patientName === selectedPatientModal.name
              ).length > 0 ? (
                <div className="space-y-4">
                  {consultations
                    .filter(
                      (c) => c.patientId === selectedPatientModal.id || c.patientName === selectedPatientModal.name
                    )
                    .map((con) => (
                      <div key={con.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 text-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                          <span className="font-bold text-slate-900">{con.doctorName} ({con.speciality})</span>
                          <span className="text-slate-500 font-mono">{con.date}</span>
                        </div>

                        <div>
                          <strong className="text-teal-800">Confirmed Diagnosis:</strong> {con.diagnosis}
                        </div>

                        {con.clinicalNotes && (
                          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-slate-600">
                            <strong>Notes:</strong> {con.clinicalNotes}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-slate-500">
                            Follow-up: <strong className="text-slate-700">{con.followUpDate || 'None'}</strong>
                          </span>
                          <button
                            onClick={() => {
                              const rx = prescriptions.find((p) => p.consultationId === con.id);
                              if (rx) setSelectedRx(rx);
                            }}
                            className="text-teal-600 hover:text-teal-800 font-semibold flex items-center gap-1 text-[11px]"
                          >
                            <ClipboardList className="w-3.5 h-3.5" />
                            <span>View Associated Rx</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-400 bg-slate-50 rounded-2xl border border-slate-200">
                  No previous consultation records logged for this patient.
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedPatientModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
              >
                Close Record
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Prescription View Modal */}
      <PrescriptionPrintModal
        isOpen={!!selectedRx}
        onClose={() => setSelectedRx(null)}
        prescription={selectedRx}
      />
    </div>
  );
};
