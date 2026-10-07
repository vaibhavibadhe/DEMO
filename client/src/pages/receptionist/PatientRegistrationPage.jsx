// client/src/pages/receptionist/PatientRegistrationPage.jsx
import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus,
  Search,
  CheckCircle2,
  CalendarCheck,
  User,
  Phone,
  Mail,
  ShieldCheck,
  Lock
} from 'lucide-react';

export const PatientRegistrationPage = () => {
  const { patients, registerPatient } = useClinic();
  const navigate = useNavigate();

  // Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'B+',
    address: '',
    emergencyContact: '',
    allergies: ''
  });

  const [registeredSuccess, setRegisteredSuccess] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const payload = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      age: parseInt(formData.age, 10) || 30,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      allergies: formData.allergies ? [formData.allergies] : ['None reported']
    };

    const newPatient = await registerPatient(payload);
    setRegisteredSuccess(newPatient);

    // Reset form
    setFormData({
      name: '',
      phone: '',
      email: '',
      age: '',
      gender: 'Male',
      bloodGroup: 'B+',
      address: '',
      emergencyContact: '',
      allergies: ''
    });
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Patient Registration & Directory</h1>
          <p className="text-xs text-slate-500 mt-1">
            Register walk-in outpatients and look up verified demographics.
          </p>
        </div>

        {/* Privacy Note */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Receptionist Privacy Scope (Demographics Only)</span>
        </div>
      </div>

      {/* Success Notification */}
      {registeredSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl flex items-center justify-between gap-4 text-xs text-emerald-900">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-bold">Patient Registered Successfully: {registeredSuccess.name}</p>
              <p className="text-emerald-700 text-[11px]">Patient ID: {registeredSuccess.id} • Phone: {registeredSuccess.phone}</p>
            </div>
          </div>
          <button
            onClick={() =>
              navigate('/receptionist/appointments', {
                state: { prefillPatientName: registeredSuccess.name, prefillPatientId: registeredSuccess.id }
              })
            }
            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold transition flex items-center gap-1.5 flex-shrink-0"
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>Book OPD Now</span>
          </button>
        </div>
      )}

      {/* Grid: Registration Form on Left, Search on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-teal-600" />
            <span>Register Walk-in Patient</span>
          </h2>

          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Ramesh Kulkarni"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-hidden font-medium"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-hidden font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Age</label>
                <input
                  type="number"
                  placeholder="35"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-hidden font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-hidden bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Blood Group</label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-hidden bg-white"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Address / Locality</label>
              <input
                type="text"
                placeholder="Area, City"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Emergency Contact</label>
              <input
                type="text"
                placeholder="Contact Name & Number"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Known Drug Allergies</label>
              <input
                type="text"
                placeholder="e.g. Penicillin, Sulfa, None"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold tracking-wide transition shadow-xs"
            >
              Register & Save Patient Record
            </button>
          </form>
        </div>

        {/* Patient Search & Quick Lookups */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Search className="w-4 h-4 text-teal-600" />
                <span>Search Registered Patients</span>
              </h2>
              <span className="text-xs text-slate-400">{patients.length} Total</span>
            </div>

            <div className="relative mt-2">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
              />
            </div>

            <div className="space-y-3 mt-4 max-h-[480px] overflow-y-auto">
              {filteredPatients.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-100 transition"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 block">{p.name}</span>
                    <span className="text-slate-500 text-[11px] block">{p.phone}</span>
                    <span className="text-[10px] text-slate-400 block">
                      {p.age} Yrs • {p.gender} • Blood Group: <strong className="text-rose-600">{p.bloodGroup}</strong>
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate('/receptionist/appointments', {
                        state: { prefillPatientName: p.name, prefillPatientId: p.id }
                      })
                    }
                    className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-700 font-semibold border border-teal-200 transition text-[11px]"
                  >
                    Book Slot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
