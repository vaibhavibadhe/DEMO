// client/src/pages/admin/SpecialityManagementPage.jsx
import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Layers,
  Plus,
  Stethoscope,
  Trash2,
  CheckCircle2
} from 'lucide-react';
import { Modal } from '../../components/common/Modal';

export const SpecialityManagementPage = () => {
  const { specialities, doctors, addSpeciality } = useClinic();
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addSpeciality({
      name: name.trim(),
      description: description.trim() || 'Clinical outpatient department providing specialized care.'
    });

    setName('');
    setDescription('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clinical Specialities & Departments</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure clinical outpatient departments, consultant quotas, and descriptions.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Speciality</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialities.map((spec) => {
          const specDoctors = doctors.filter((d) => d.speciality === spec.name);

          return (
            <div
              key={spec.id}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-slate-900">{spec.name}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{spec.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-teal-700 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span>{specDoctors.length} Assigned Doctors</span>
                </span>
                <span className="text-[11px] text-slate-400">Department Active</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Speciality Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title="Add Clinical Speciality"
          subtitle="Register a new outpatient medical discipline."
        >
          <form onSubmit={handleAdd} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Speciality Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Cardiology, Ophthalmology, Neurology"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Department Description</label>
              <textarea
                rows={3}
                placeholder="Scope of clinical consultations provided..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold"
              >
                Create Speciality
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
