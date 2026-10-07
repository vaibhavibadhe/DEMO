// client/src/pages/patient/BookOPDPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const BookOPDPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { doctors, specialities, bookAppointment } = useClinic();

  // Booking Step State: 1 = Speciality, 2 = Doctor, 3 = Date & Slot, 4 = Review & Confirm
  const [step, setStep] = useState(1);

  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedSlot, setSelectedSlot] = useState('');
  const [symptomsInput, setSymptomsInput] = useState('');
  const [appointmentType, setAppointmentType] = useState('Regular OPD');
  const [bookedResult, setBookedResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prepopulate from navigation state if present
  useEffect(() => {
    if (location.state?.selectedSpeciality) {
      setSelectedSpeciality(location.state.selectedSpeciality);
      setStep(2);
    }
    if (location.state?.preselectedDoctorId) {
      const doc = doctors.find((d) => d.id === location.state.preselectedDoctorId);
      if (doc) {
        setSelectedDoctor(doc);
        setSelectedSpeciality(doc.speciality);
        setStep(3);
      }
    }
  }, [location.state, doctors]);

  // Filter doctors by selected speciality
  const filteredDoctors = selectedSpeciality
    ? doctors.filter((d) => d.speciality === selectedSpeciality && d.status === 'Active')
    : doctors.filter((d) => d.status === 'Active');

  const handleSelectSpeciality = (specName) => {
    setSelectedSpeciality(specName);
    setSelectedDoctor(null);
    setStep(2);
  };

  const handleSelectDoctor = (doc) => {
    setSelectedDoctor(doc);
    setSelectedSlot(doc.schedule?.slots?.[0] || '10:00 AM');
    setStep(3);
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !selectedSlot) return;

    setIsSubmitting(true);

    const bookingPayload = {
      patientId: currentUser?.patientId || 'pat-1',
      patientName: currentUser?.name || 'Rohan Verma',
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      speciality: selectedDoctor.speciality,
      date: selectedDate,
      timeSlot: selectedSlot,
      symptoms: symptomsInput.trim() || 'General OPD Consultation',
      type: appointmentType,
      fee: selectedDoctor.fee || 500
    };

    const newApt = await bookAppointment(bookingPayload);
    setIsSubmitting(false);
    setBookedResult(newApt);
    setStep(4);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Outpatient (OPD) Booking</h1>
        <p className="text-xs text-slate-500 mt-1">
          Select clinical speciality, consultant physician, and reserve your consultation token slot.
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between text-xs font-semibold">
        <div
          className={`flex items-center gap-2 cursor-pointer ${
            step >= 1 ? 'text-teal-700' : 'text-slate-400'
          }`}
          onClick={() => step > 1 && setStep(1)}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            1
          </span>
          <span>Speciality</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300" />

        <div
          className={`flex items-center gap-2 cursor-pointer ${
            step >= 2 ? 'text-teal-700' : 'text-slate-400'
          }`}
          onClick={() => step > 2 && setStep(2)}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            2
          </span>
          <span>Doctor</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300" />

        <div
          className={`flex items-center gap-2 cursor-pointer ${
            step >= 3 ? 'text-teal-700' : 'text-slate-400'
          }`}
          onClick={() => step > 3 && setStep(3)}
        >
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              step >= 3 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            3
          </span>
          <span>Date & Slot</span>
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300" />

        <div className={`flex items-center gap-2 ${step >= 4 ? 'text-teal-700' : 'text-slate-400'}`}>
          <span
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
              step >= 4 ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'
            }`}
          >
            4
          </span>
          <span>Confirmation</span>
        </div>
      </div>

      {/* STEP 1: Select Speciality */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Step 1: Choose Clinical Department</h2>
            <Link
              to="/patient/ai-urgency"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Not sure? Use AI triage</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {specialities.map((spec) => {
              const count = doctors.filter((d) => d.speciality === spec.name).length;
              return (
                <div
                  key={spec.id}
                  onClick={() => handleSelectSpeciality(spec.name)}
                  className={`bg-white p-5 rounded-2xl border cursor-pointer transition shadow-2xs hover:shadow-xs group ${
                    selectedSpeciality === spec.name
                      ? 'border-teal-500 ring-2 ring-teal-100 bg-teal-50/20'
                      : 'border-slate-200 hover:border-teal-300'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{spec.description}</p>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{count} Doctors</span>
                    <span className="text-teal-600 font-semibold group-hover:translate-x-0.5 transition flex items-center gap-0.5">
                      Select <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 2: View and Select Doctor */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Step 2: Select Specialist for {selectedSpeciality || 'All Specialities'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Review clinical qualifications, experience, and OPD availability.
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              ← Change Speciality
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => handleSelectDoctor(doc)}
                className={`bg-white p-5 rounded-2xl border cursor-pointer transition shadow-2xs hover:shadow-xs group flex flex-col justify-between ${
                  selectedDoctor?.id === doc.id
                    ? 'border-teal-500 ring-2 ring-teal-100 bg-teal-50/20'
                    : 'border-slate-200 hover:border-teal-300'
                }`}
              >
                <div>
                  <div className="flex items-start gap-3.5">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-slate-100 shadow-2xs flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition">
                        {doc.name}
                      </h3>
                      <p className="text-xs text-teal-600 font-medium">{doc.speciality}</p>
                      <p className="text-[11px] text-slate-500 truncate">{doc.qualification}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                          <Award className="w-3 h-3" /> {doc.experienceYears} Yrs Exp
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-500">{doc.roomNo}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-3 line-clamp-2">{doc.about}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">OPD Hours</span>
                    <span className="font-semibold text-slate-700">{doc.schedule?.timings}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">Fee</span>
                    <span className="font-bold text-slate-900">₹{doc.fee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STEP 3: Select Date, Time Slot, Symptoms */}
      {step === 3 && selectedDoctor && (
        <form onSubmit={handleConfirmBooking} className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDoctor.avatar}
                  alt={selectedDoctor.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
                />
                <div>
                  <h3 className="font-bold text-base text-slate-900">{selectedDoctor.name}</h3>
                  <p className="text-xs text-teal-600 font-medium">
                    {selectedDoctor.speciality} • {selectedDoctor.qualification}
                  </p>
                  <p className="text-[11px] text-slate-500">{selectedDoctor.roomNo} • Consultation Fee: ₹{selectedDoctor.fee}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Change Doctor
              </button>
            </div>

            {/* Date Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Select Consultation Date</label>
              <input
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full sm:w-64 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden font-medium"
                required
              />
            </div>

            {/* Available OPD Slots */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Select Available 15-Minute Slot ({selectedDoctor.schedule?.timings})
                </label>
                <span className="text-[11px] text-slate-400">Guaranteed Token Generation</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {selectedDoctor.schedule?.slots?.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition text-center ${
                      selectedSlot === slot
                        ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Symptoms / Chief Complaints */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Symptoms / Reason for Visit
              </label>
              <textarea
                rows={3}
                value={symptomsInput}
                onChange={(e) => setSymptomsInput(e.target.value)}
                placeholder="e.g. Mild fever, dry cough, sore throat for 3 days..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>

            {/* Consultation Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">Consultation Type</label>
              <div className="flex gap-3">
                {['Regular OPD', 'Follow-up', 'Preventative Review'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setAppointmentType(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
                      appointmentType === type
                        ? 'bg-teal-50 border-teal-400 text-teal-800 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              ← Back to Doctor List
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !selectedSlot}
              className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2"
            >
              <span>{isSubmitting ? 'Reserving OPD Slot...' : 'Confirm & Generate OPD Token'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 4: Confirmation Screen */}
      {step === 4 && bookedResult && (
        <div className="bg-white p-8 rounded-3xl border border-emerald-200 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Appointment Successfully Booked
            </span>
            <h2 className="text-2xl font-bold text-slate-900">Your OPD Token is Ready</h2>
            <p className="text-xs text-slate-500">
              Present your token number at the OPD frontdesk or check in directly on arrival.
            </p>
          </div>

          {/* Token Pass Card */}
          <div className="max-w-md mx-auto bg-slate-50 p-6 rounded-2xl border border-slate-200 text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Patient Name</span>
                <p className="font-bold text-sm text-slate-900">{bookedResult.patientName}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">OPD Token</span>
                <p className="font-black text-2xl text-teal-700 font-mono">{bookedResult.tokenNumber}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Physician</span>
                <span className="font-semibold text-slate-800">{bookedResult.doctorName}</span>
                <span className="text-[11px] text-teal-600 block">{bookedResult.speciality}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Date & Time</span>
                <span className="font-semibold text-slate-800">{bookedResult.date}</span>
                <span className="text-[11px] text-slate-600 block">{bookedResult.timeSlot}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-500">Status: <strong className="text-teal-700">Waiting / Confirmed</strong></span>
              <span className="font-semibold text-slate-800">Fee: ₹{bookedResult.fee} (Paid)</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Link
              to="/patient/appointments"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition"
            >
              View in My Appointments
            </Link>
            <button
              onClick={() => {
                setStep(1);
                setBookedResult(null);
                setSelectedDoctor(null);
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition"
            >
              Book Another OPD Slot
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
