// client/src/pages/patient/SpecialitiesPage.jsx
import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Link } from 'react-router-dom';
import {
  Layers,
  ArrowRight,
  Stethoscope,
  Award,
  Calendar,
  Sparkles,
  Search,
  Filter
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const SpecialitiesPage = () => {
  const { specialities, doctors } = useClinic();
  const [activeSpeciality, setActiveSpeciality] = useState(null);
  const [selectedDoctorModal, setSelectedDoctorModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSpecialities = specialities.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clinical Specialities</h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse multi-speciality departments, consultant doctors, and outpatient clinical schedules.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search speciality or symptom..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
        </div>
      </div>

      {/* Specialities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialities.map((spec) => {
          const specDoctors = doctors.filter((d) => d.speciality === spec.name && d.status === 'Active');
          const isSelected = activeSpeciality === spec.name;

          return (
            <div
              key={spec.id}
              className={`bg-white rounded-3xl border transition shadow-2xs hover:shadow-sm flex flex-col justify-between overflow-hidden ${
                isSelected ? 'border-teal-500 ring-2 ring-teal-100' : 'border-slate-200'
              }`}
            >
              <div className="p-6">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{spec.name}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{spec.description}</p>

                {/* Associated Doctors Avatars */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                    Consultant Specialists ({specDoctors.length})
                  </span>
                  <div className="space-y-2">
                    {specDoctors.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => setSelectedDoctorModal(doc)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer border border-transparent hover:border-slate-200"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={doc.avatar}
                            alt={doc.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-xs font-semibold text-slate-800 block">{doc.name}</span>
                            <span className="text-[10px] text-slate-400">{doc.qualification}</span>
                          </div>
                        </div>
                        <span className="text-[11px] font-semibold text-teal-600">Info →</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">₹500 - ₹700 OPD Fee</span>
                <Link
                  to="/patient/book-opd"
                  state={{ selectedSpeciality: spec.name }}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-2xs transition flex items-center gap-1"
                >
                  <span>Book in {spec.name.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Doctor Info Modal */}
      {selectedDoctorModal && (
        <Modal
          isOpen={!!selectedDoctorModal}
          onClose={() => setSelectedDoctorModal(null)}
          title={selectedDoctorModal.name}
          subtitle={selectedDoctorModal.speciality}
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <img
                src={selectedDoctorModal.avatar}
                alt={selectedDoctorModal.name}
                className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100"
              />
              <div>
                <h3 className="font-bold text-base text-slate-900">{selectedDoctorModal.name}</h3>
                <p className="text-xs text-teal-600 font-semibold">{selectedDoctorModal.speciality}</p>
                <p className="text-xs text-slate-500">{selectedDoctorModal.qualification}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> {selectedDoctorModal.experienceYears} Years Clinical Experience
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">About Physician</h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {selectedDoctorModal.about}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-medium">OPD Location</span>
                <span className="font-semibold text-slate-800">{selectedDoctorModal.roomNo}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-400 block font-medium">Consultation Fee</span>
                <span className="font-bold text-slate-900">₹{selectedDoctorModal.fee}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50/50 border border-teal-100 text-xs">
              <span className="font-bold text-teal-800 block mb-1">OPD Schedule & Available Days</span>
              <p className="text-slate-700">Days: {selectedDoctorModal.schedule?.days?.join(', ')}</p>
              <p className="text-slate-700 font-semibold mt-0.5">Hours: {selectedDoctorModal.schedule?.timings}</p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedDoctorModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <Link
                to="/patient/book-opd"
                state={{ preselectedDoctorId: selectedDoctorModal.id }}
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition"
              >
                Book Appointment Slot
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
