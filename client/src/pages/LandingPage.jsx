// client/src/pages/LandingPage.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useClinic } from '../context/ClinicContext';
import {
  HeartPulse,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CalendarCheck,
  Stethoscope,
  ClipboardList,
  Clock,
  CheckCircle2,
  PhoneCall,
  UserCheck,
  Activity,
  Layers,
  Award
} from 'lucide-react';
import { Footer } from '../components/common/Footer';

export const LandingPage = () => {
  const { switchDemoRole } = useAuth();
  const { doctors, specialities } = useClinic();
  const navigate = useNavigate();

  const handleQuickDemo = (role) => {
    switchDemoRole(role);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Public Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">Smart Clinic</span>
              <span className="text-[10px] ml-1.5 uppercase font-bold tracking-widest text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">Care</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#about" className="hover:text-teal-600 transition">About System</a>
            <a href="#specialities" className="hover:text-teal-600 transition">Specialities</a>
            <a href="#doctors" className="hover:text-teal-600 transition">Specialists</a>
            <a href="#how-it-works" className="hover:text-teal-600 transition">Workflow</a>
            <a href="#ai-analysis" className="hover:text-teal-600 transition flex items-center gap-1 text-teal-600">
              <Sparkles className="w-3.5 h-3.5" /> AI Urgency
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold px-4 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 transition"
            >
              Portal Login
            </Link>
            <button
              onClick={() => handleQuickDemo('patient')}
              className="text-xs font-semibold px-4 py-2 rounded-xl bg-teal-600 text-white hover:bg-teal-700 shadow-xs transition flex items-center gap-1.5"
            >
              <span>Explore Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 bg-radial from-teal-50/50 via-slate-50 to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Diploma Prototype Demonstration • Modern Healthcare</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Intelligent, Dignified & Seamless <span className="text-teal-600">Clinic Care</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
              Smart Clinic unifies outpatient queue management, digital doctor consultations, structured electronic prescriptions, and intelligent AI-powered symptom urgency evaluation into a cohesive, minimalistic platform.
            </p>

            {/* Quick Demo Launch Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleQuickDemo('patient')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold text-sm hover:bg-teal-700 shadow-sm transition flex items-center justify-center gap-2"
              >
                <span>Launch Patient Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleQuickDemo('doctor')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-semibold text-sm hover:bg-slate-50 shadow-xs transition flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-4 h-4 text-teal-600" />
                <span>Doctor OPD Cabin</span>
              </button>
              <button
                onClick={() => handleQuickDemo('receptionist')}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-medium text-xs hover:bg-slate-200 transition"
              >
                Frontdesk Queue
              </button>
            </div>

            {/* Key Trust Badges */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> No AI Generated Prescription Images
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Real-time Live Token Caller
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Role-Based Access Control
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">About Smart Clinic</span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 leading-tight">
                Designed to eliminate OPD friction for patients, physicians, and clinic staff.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Traditional outpatient clinics suffer from unpredictable waiting lines, handwritten prescription misinterpretations, and disorganized patient records. Smart Clinic re-engineers this experience by connecting every stakeholder in real-time.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-bold text-teal-600">100%</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">Structured Electronic Rx</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-2xl font-bold text-teal-600">&lt; 15 min</div>
                  <div className="text-xs text-slate-600 font-medium mt-1">Average Waiting Time</div>
                </div>
              </div>
            </div>

            {/* Role Cards preview */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => handleQuickDemo('patient')}
                className="p-5 rounded-2xl bg-teal-50/50 border border-teal-100 hover:border-teal-300 cursor-pointer transition shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center mb-3">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition">Patient Portal</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">OPD booking, token status, clinical records & downloadable prescriptions.</p>
              </div>

              <div
                onClick={() => handleQuickDemo('doctor')}
                className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 hover:border-sky-300 cursor-pointer transition shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center mb-3">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-sky-700 transition">Doctor Cabin</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">OPD queue, patient timeline, diagnostic consultation & prescription builder.</p>
              </div>

              <div
                onClick={() => handleQuickDemo('receptionist')}
                className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 hover:border-amber-300 cursor-pointer transition shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-3">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-amber-700 transition">Frontdesk Desk</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Walk-in patient registration, token caller & OPD queue coordination.</p>
              </div>

              <div
                onClick={() => handleQuickDemo('admin')}
                className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 hover:border-rose-300 cursor-pointer transition shadow-2xs group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-rose-700 transition">Administration</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Doctor schedules, speciality departments, staff directory & clinic metrics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialities Showcase */}
      <section id="specialities" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Clinical Specialities</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Comprehensive Outpatient Departments
            </h2>
            <p className="text-sm text-slate-600">
              Browse our medical departments to find experienced clinicians and schedule convenient consultation slots.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialities.map((spec) => (
              <div
                key={spec.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-teal-300 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {spec.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    {doctors.filter(d => d.speciality === spec.name).length} Available Doctors
                  </span>
                  <Link
                    to="/patient/book-opd"
                    state={{ selectedSpeciality: spec.name }}
                    className="text-xs font-semibold text-teal-600 group-hover:text-teal-700 flex items-center gap-1"
                  >
                    <span>Book OPD</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section id="doctors" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Medical Specialists</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Certified Consultant Physicians
            </h2>
            <p className="text-sm text-slate-600">
              Our clinical faculty holds accredited postgraduate credentials with specialized outpatient clinic hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.slice(0, 6).map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-2xs"
                    />
                    <div>
                      <h3 className="font-bold text-base text-slate-900 leading-snug">{doc.name}</h3>
                      <p className="text-xs font-medium text-teal-600">{doc.speciality}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{doc.qualification}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                    {doc.about}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">OPD Hours</span>
                      <span className="font-medium text-slate-700">{doc.schedule?.timings}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Consultation Fee</span>
                      <span className="font-bold text-slate-900">₹{doc.fee}</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> {doc.experienceYears} Yrs Exp
                  </span>
                  <Link
                    to="/patient/book-opd"
                    state={{ preselectedDoctorId: doc.id }}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-2xs transition"
                  >
                    Book Slot
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Workflow */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Clinic Workflow</span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              From Appointment to Digital Prescription
            </h2>
            <p className="text-sm text-slate-600">
              Clear, step-by-step healthcare journey engineered for zero confusion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 relative">
              <span className="text-3xl font-black text-slate-200">01</span>
              <h3 className="font-bold text-sm text-slate-900">Select Speciality</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Choose the required clinical department or utilize the AI Urgency helper to guide your selection.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 relative">
              <span className="text-3xl font-black text-slate-200">02</span>
              <h3 className="font-bold text-sm text-slate-900">Choose Doctor & Slot</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                View doctor credentials, OPD timing schedules, and pick a guaranteed 15-minute consultation window.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 relative">
              <span className="text-3xl font-black text-slate-200">03</span>
              <h3 className="font-bold text-sm text-slate-900">Consultation & Token</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive live token updates. Doctor conducts clinical assessment and records vitals and diagnosis.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 relative">
              <span className="text-3xl font-black text-teal-200">04</span>
              <h3 className="font-bold text-sm text-teal-700">Structured Prescription</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instant digital prescription with verified dosage and duration. View, download, or print anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Urgency Feature Explanation */}
      <section id="ai-analysis" className="py-16 sm:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-radial from-teal-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl overflow-hidden relative">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Clinical Decision Support Engine</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                AI Urgency Triage & Symptom Evaluation
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Our AI Urgency feature analyzes symptoms, duration, and patient severity to classify urgency into <strong className="text-emerald-400 font-semibold">LOW</strong>, <strong className="text-amber-400 font-semibold">MODERATE</strong>, or <strong className="text-rose-400 font-semibold">HIGH URGENCY</strong> and recommends the appropriate medical speciality.
              </p>

              {/* Crucial Medical Safety Callout */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Strict Clinical Safety Guardrails</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Smart Clinic AI never diagnoses or claims definitive disease. It operates strictly as an informational prioritization tool. Potentially serious red flags (e.g. acute chest pain or respiratory distress) immediately trigger emergency room guidance.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/patient/ai-urgency"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Try Symptom & Urgency Checker</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};
