// client/src/pages/doctor/DoctorConsultationPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import {
  Stethoscope,
  User,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  HeartPulse,
  Activity,
  Printer,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  ArrowRight
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const DoctorConsultationPage = () => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    appointments,
    patients,
    createConsultation,
    createPrescription,
    updateAppointmentStatus
  } = useClinic();

  // Find target appointment
  const currentApt = appointments.find((a) => a.id === appointmentId) || appointments[0];
  const patient = patients.find((p) => p.id === currentApt?.patientId || p.name === currentApt?.patientName) || {
    name: currentApt?.patientName || 'Patient',
    age: 28,
    gender: 'Male',
    bloodGroup: 'B+',
    allergies: ['Penicillin (mild rash)']
  };

  // Vitals State
  const [vitals, setVitals] = useState({
    bloodPressure: '120/80 mmHg',
    pulseRate: '78 bpm',
    temperature: '98.6 °F',
    spO2: '99%'
  });

  // Clinical Notes & Diagnosis State
  const [chiefComplaints, setChiefComplaints] = useState(currentApt?.symptoms || '');
  const [diagnosis, setDiagnosis] = useState('');
  const [clinicalNotes, setClinicalNotes] = useState('');
  const [advice, setAdvice] = useState('Maintain good hydration, avoid cold drinks, and take adequate rest.');
  const [followUpDate, setFollowUpDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });

  // Structured Medicines State
  const [medicines, setMedicines] = useState([
    {
      name: 'Tab. Paracetamol (Dolo 650)',
      dosage: '650 mg',
      frequency: '1-0-1 (Morning & Night)',
      duration: '3 Days',
      instructions: 'Take after food'
    }
  ]);

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [finalRx, setFinalRx] = useState(null);

  const quickCommonMedicines = [
    { name: 'Tab. Paracetamol', dosage: '650 mg', frequency: '1-0-1 (Morning & Night)', duration: '3 Days', instructions: 'After meals' },
    { name: 'Tab. Amoxicillin + Clav', dosage: '625 mg', frequency: '1-0-1 (Morning & Night)', duration: '5 Days', instructions: 'After food' },
    { name: 'Tab. Cetirizine (10mg)', dosage: '10 mg', frequency: '0-0-1 (Night only)', duration: '5 Days', instructions: 'Bedtime' },
    { name: 'Cap. Pantoprazole', dosage: '40 mg', frequency: '1-0-0 (Morning only)', duration: '5 Days', instructions: 'Before breakfast' },
    { name: 'Tab. Azithromycin', dosage: '500 mg', frequency: '1-0-0 (Once daily)', duration: '3 Days', instructions: '1 hr before meal' },
    { name: 'Syp. Ascoril-D Cough', dosage: '10 ml', frequency: '1-1-1 (Thrice daily)', duration: '5 Days', instructions: 'With warm water' }
  ];

  const handleAddMedicineRow = () => {
    setMedicines((prev) => [
      ...prev,
      {
        name: '',
        dosage: '1 Tab',
        frequency: '1-0-1 (Morning & Night)',
        duration: '5 Days',
        instructions: 'Take after meals'
      }
    ]);
  };

  const handleQuickAdd = (med) => {
    setMedicines((prev) => [...prev, { ...med }]);
  };

  const handleUpdateMedicine = (index, field, value) => {
    setMedicines((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: value } : item))
    );
  };

  const handleRemoveMedicine = (index) => {
    if (medicines.length === 1) return;
    setMedicines((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleFinalizeAndSign = async () => {
    if (!diagnosis.trim()) {
      alert('Please enter a clinical diagnosis before finalizing the prescription.');
      return;
    }

    // 1. Create Consultation Record
    const conData = {
      appointmentId: currentApt?.id,
      patientId: patient.id || 'pat-1',
      patientName: patient.name,
      doctorId: currentUser?.doctorId || 'doc-1',
      doctorName: currentUser?.name || 'Dr. Rajesh Mehta',
      speciality: currentUser?.speciality || 'General Medicine',
      chiefComplaints,
      vitals,
      diagnosis,
      clinicalNotes,
      advice,
      followUpDate
    };
    const createdCon = await createConsultation(conData);

    // 2. Create Structured Prescription
    const rxPayload = {
      consultationId: createdCon.id,
      appointmentId: currentApt?.id,
      patientId: patient.id || 'pat-1',
      patientName: patient.name,
      patientAge: patient.age || 28,
      patientGender: patient.gender || 'Male',
      doctorId: currentUser?.doctorId || 'doc-1',
      doctorName: currentUser?.name || 'Dr. Rajesh Mehta',
      doctorQualification: currentUser?.qualification || 'MBBS, MD (Internal Medicine)',
      doctorSpeciality: currentUser?.speciality || 'General Medicine',
      doctorRoom: 'OPD Cabin 101',
      diagnosis,
      medicines,
      generalAdvice: advice,
      followUpDate
    };
    const createdRx = await createPrescription(rxPayload);

    // 3. Mark appointment Completed
    if (currentApt?.id) {
      updateAppointmentStatus(currentApt.id, 'Completed');
    }

    setFinalRx(createdRx);
    setIsReviewOpen(false);
    setIsFinalized(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              Token #{currentApt?.tokenNumber || 'T-102'}
            </span>
            <span className="text-xs text-slate-400">• Slot: {currentApt?.timeSlot}</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Clinical Consultation & Digital Prescription
          </h1>
        </div>

        <Link
          to="/doctor/opd"
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 self-start sm:self-auto"
        >
          ← Return to OPD Queue
        </Link>
      </div>

      {/* Success Notification if finalized */}
      {isFinalized && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 text-emerald-900 space-y-4 shadow-xs">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-base">Prescription Finalized & Authenticated</h3>
              <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                The consultation record and structured prescription for <strong>{patient.name}</strong> have been digitally signed, archived, and immediately published to the patient portal.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4" />
              <span>Print Letterhead</span>
            </button>
            <Link
              to="/doctor/opd"
              className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 rounded-xl text-xs font-semibold transition"
            >
              Call Next Patient
            </Link>
          </div>
        </div>
      )}

      {/* Patient Information & Vitals Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">{patient.name}</h3>
              <p className="text-xs text-slate-500">
                {patient.age} Yrs • {patient.gender} • Blood Group: <strong className="text-rose-600 font-bold">{patient.bloodGroup}</strong>
              </p>
            </div>
          </div>
          <div className="text-right text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Documented Allergies</span>
            <span className="font-semibold text-rose-700">{patient.allergies?.join(', ') || 'None reported'}</span>
          </div>
        </div>

        {/* Clinical Vitals Entry Inputs */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Patient Vitals (Record / Edit)
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[10px] text-slate-500 font-medium mb-1">Blood Pressure</label>
              <input
                type="text"
                value={vitals.bloodPressure}
                onChange={(e) => setVitals({ ...vitals, bloodPressure: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 font-medium mb-1">Pulse Rate</label>
              <input
                type="text"
                value={vitals.pulseRate}
                onChange={(e) => setVitals({ ...vitals, pulseRate: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 font-medium mb-1">Temperature</label>
              <input
                type="text"
                value={vitals.temperature}
                onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 font-medium mb-1">SpO2 Level</label>
              <input
                type="text"
                value={vitals.spO2}
                onChange={(e) => setVitals({ ...vitals, spO2: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clinical Notes & Diagnosis Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Stethoscope className="w-4 h-4 text-teal-600" />
          <span>Clinical Assessment & Findings</span>
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Chief Complaints & Symptoms
            </label>
            <input
              type="text"
              value={chiefComplaints}
              onChange={(e) => setChiefComplaints(e.target.value)}
              placeholder="e.g. Fever with chills, persistent dry cough for 3 days"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-teal-900 mb-1">
              Primary Clinical Diagnosis <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Acute Viral Nasopharyngitis / Bronchitis / Essential Hypertension"
              className="w-full px-3 py-2 rounded-xl border-2 border-teal-200 focus:border-teal-500 bg-teal-50/20 text-xs font-semibold text-slate-900 outline-hidden"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Examination & Clinical Notes
            </label>
            <textarea
              rows={2}
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="Chest examination, throat hyperemia, heart sounds, abdomen soft..."
              className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Advice & Dietary Guidelines
              </label>
              <input
                type="text"
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Next Follow-Up Date
              </label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Structured Prescription Builder */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif italic font-bold text-teal-700 text-xl">℞</span>
            <h3 className="font-bold text-sm text-slate-900">Structured Digital Prescription</h3>
          </div>
          <button
            type="button"
            onClick={handleAddMedicineRow}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 border border-teal-200 rounded-xl text-xs font-semibold transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Medication</span>
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
            Quick Add Frequent Formulations:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickCommonMedicines.map((m, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickAdd(m)}
                className="text-[11px] px-2.5 py-1 bg-slate-50 hover:bg-teal-50 border border-slate-200 text-slate-700 rounded-lg transition"
              >
                + {m.name} ({m.dosage})
              </button>
            ))}
          </div>
        </div>

        {/* Medicine Rows */}
        <div className="space-y-3">
          {medicines.map((med, index) => (
            <div
              key={index}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center text-xs"
            >
              <div className="sm:col-span-4">
                <label className="block text-[10px] text-slate-400 font-medium mb-0.5">Medicine Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tab. Paracetamol"
                  value={med.name}
                  onChange={(e) => handleUpdateMedicine(index, 'name', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium focus:ring-1 focus:ring-teal-500 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] text-slate-400 font-medium mb-0.5">Dosage</label>
                <input
                  type="text"
                  placeholder="e.g. 650 mg"
                  value={med.dosage}
                  onChange={(e) => handleUpdateMedicine(index, 'dosage', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs focus:ring-1 focus:ring-teal-500 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] text-slate-400 font-medium mb-0.5">Frequency</label>
                <select
                  value={med.frequency}
                  onChange={(e) => handleUpdateMedicine(index, 'frequency', e.target.value)}
                  className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-xs focus:ring-1 focus:ring-teal-500 outline-hidden"
                >
                  <option value="1-0-1 (Morning & Night)">1-0-1 (Bid)</option>
                  <option value="1-1-1 (Thrice daily)">1-1-1 (Tid)</option>
                  <option value="1-0-0 (Morning only)">1-0-0 (Od)</option>
                  <option value="0-0-1 (Night only)">0-0-1 (Hs)</option>
                  <option value="SOS (When required)">SOS (Prn)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] text-slate-400 font-medium mb-0.5">Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Days"
                  value={med.duration}
                  onChange={(e) => handleUpdateMedicine(index, 'duration', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs focus:ring-1 focus:ring-teal-500 outline-hidden"
                />
              </div>

              <div className="sm:col-span-2 flex items-center gap-1">
                <div className="flex-1">
                  <label className="block text-[10px] text-slate-400 font-medium mb-0.5">Instructions</label>
                  <input
                    type="text"
                    placeholder="After meals"
                    value={med.instructions}
                    onChange={(e) => handleUpdateMedicine(index, 'instructions', e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg border border-slate-300 bg-white text-xs focus:ring-1 focus:ring-teal-500 outline-hidden"
                  />
                </div>
                {medicines.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMedicine(index)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg mt-3"
                    title="Remove medicine"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review & Finalize Footer Bar */}
      <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="text-xs text-slate-500">
          Status: <strong className="text-teal-700">{isFinalized ? 'Finalized' : 'Draft In Progress'}</strong>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsReviewOpen(true)}
            disabled={!diagnosis.trim()}
            className="px-5 py-2.5 rounded-xl border border-teal-600 text-teal-700 hover:bg-teal-50 font-bold text-xs transition"
          >
            Review Prescription Sheet
          </button>
          <button
            type="button"
            onClick={handleFinalizeAndSign}
            disabled={!diagnosis.trim() || isFinalized}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Finalize & Sign Rx</span>
          </button>
        </div>
      </div>

      {/* Review Prescription Modal */}
      {isReviewOpen && (
        <Modal
          isOpen={isReviewOpen}
          onClose={() => setIsReviewOpen(false)}
          title="Review Prescription Before Finalizing"
          subtitle="Carefully inspect medications, dosages, and diagnostic notes."
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <div className="flex justify-between">
                <span><strong>Patient:</strong> {patient.name} ({patient.age} Yrs)</span>
                <span><strong>Date:</strong> {new Date().toLocaleDateString()}</span>
              </div>
              <div><strong>Diagnosis:</strong> {diagnosis}</div>
              <div><strong>Advice:</strong> {advice}</div>
              <div><strong>Follow-up:</strong> {followUpDate}</div>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-100 font-semibold text-slate-700">
                  <tr>
                    <th className="py-2 px-3">Medicine</th>
                    <th className="py-2 px-3">Dosage</th>
                    <th className="py-2 px-3">Frequency</th>
                    <th className="py-2 px-3">Duration</th>
                    <th className="py-2 px-3">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {medicines.map((m, i) => (
                    <tr key={i}>
                      <td className="py-2 px-3 font-semibold">{m.name}</td>
                      <td className="py-2 px-3">{m.dosage}</td>
                      <td className="py-2 px-3">{m.frequency}</td>
                      <td className="py-2 px-3">{m.duration}</td>
                      <td className="py-2 px-3">{m.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-800 text-[11px]">
              Note: Once finalized, this prescription is sealed electronically and published instantly to the patient's record. Patients cannot alter finalized medical notes.
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsReviewOpen(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 font-semibold"
              >
                Continue Editing
              </button>
              <button
                onClick={handleFinalizeAndSign}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Finalize Record</span>
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
