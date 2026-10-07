// client/src/pages/admin/DoctorManagementPage.jsx
import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Stethoscope,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Award,
  Layers,
  Power
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const DoctorManagementPage = () => {
  const { doctors, specialities, addDoctor, updateDoctor } = useClinic();

  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    qualification: '',
    speciality: 'General Medicine',
    experienceYears: 5,
    roomNo: 'OPD Cabin 105',
    fee: 500,
    about: '',
    timings: '09:00 AM - 01:00 PM',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  });

  const handleToggleStatus = (doc) => {
    const newStatus = doc.status === 'Active' ? 'Inactive' : 'Active';
    updateDoctor(doc.id, { status: newStatus });
  };

  const handleSaveDoctor = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.qualification) return;

    if (editingDoctor) {
      await updateDoctor(editingDoctor.id, {
        name: formData.name,
        qualification: formData.qualification,
        speciality: formData.speciality,
        experienceYears: parseInt(formData.experienceYears, 10),
        roomNo: formData.roomNo,
        fee: parseInt(formData.fee, 10),
        about: formData.about,
        schedule: {
          days: formData.days,
          timings: formData.timings,
          slots: ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM']
        }
      });
      setEditingDoctor(null);
    } else {
      await addDoctor({
        name: formData.name,
        email: formData.email || `${formData.name.toLowerCase().replace(/[\s.]+/g, '')}@smartclinic.com`,
        qualification: formData.qualification,
        speciality: formData.speciality,
        experienceYears: parseInt(formData.experienceYears, 10),
        roomNo: formData.roomNo,
        fee: parseInt(formData.fee, 10),
        about: formData.about || `Consultant physician in ${formData.speciality}.`,
        schedule: {
          days: formData.days,
          timings: formData.timings,
          slots: ['09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM']
        }
      });
    }

    setShowAddModal(false);
    setFormData({
      name: '',
      email: '',
      qualification: '',
      speciality: 'General Medicine',
      experienceYears: 5,
      roomNo: 'OPD Cabin 105',
      fee: 500,
      about: '',
      timings: '09:00 AM - 01:00 PM',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    });
  };

  const handleStartEdit = (doc) => {
    setEditingDoctor(doc);
    setFormData({
      name: doc.name,
      email: doc.email,
      qualification: doc.qualification,
      speciality: doc.speciality,
      experienceYears: doc.experienceYears || 5,
      roomNo: doc.roomNo || 'OPD Cabin',
      fee: doc.fee || 500,
      about: doc.about || '',
      timings: doc.schedule?.timings || '09:00 AM - 01:00 PM',
      days: doc.schedule?.days || ['Monday', 'Tuesday']
    });
    setShowAddModal(true);
  };

  const filteredDoctors = doctors.filter((d) => {
    return (
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.qualification.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Doctor Faculty Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Maintain consultant profiles, department affiliations, OPD room allocations, and active schedules.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingDoctor(null);
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Doctor</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search doctor by name, qualification, or speciality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          {doctors.length} Registered Clinicians
        </span>
      </div>

      {/* Doctor Cards / Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Speciality</th>
                <th className="py-3 px-4">Qualifications & Exp</th>
                <th className="py-3 px-4">OPD Cabin & Fee</th>
                <th className="py-3 px-4">Schedule Timings</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <span>{doc.name}</span>
                        <span className="text-[10px] text-slate-400 block font-normal">{doc.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-teal-700 font-semibold">
                    {doc.speciality}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span>{doc.qualification}</span>
                    <span className="text-[10px] text-emerald-600 block font-semibold">
                      {doc.experienceYears} Years Experience
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="font-medium block">{doc.roomNo || 'OPD Cabin'}</span>
                    <span className="text-[11px] text-slate-500">₹{doc.fee} / consult</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="block">{doc.schedule?.timings}</span>
                    <span className="text-[10px] text-slate-400">
                      {doc.schedule?.days?.slice(0, 3).join(', ')}...
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(doc)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition ${
                        doc.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                      }`}
                      title="Click to toggle status"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${doc.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      <span>{doc.status}</span>
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleStartEdit(doc)}
                      className="p-1.5 text-slate-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition"
                      title="Edit Doctor Details"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Doctor Modal */}
      {showAddModal && (
        <Modal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          title={editingDoctor ? `Edit Profile: ${editingDoctor.name}` : 'Add New Consultant Physician'}
          subtitle="Configure medical qualifications, department speciality, and OPD timings."
          maxWidth="max-w-2xl"
        >
          <form onSubmit={handleSaveDoctor} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Rajesh Mehta"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="doctor@smartclinic.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Speciality Department</label>
                <select
                  value={formData.speciality}
                  onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                >
                  {specialities.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Academic Qualifications <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. MBBS, MD (Internal Medicine)"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Experience (Years)</label>
                <input
                  type="number"
                  value={formData.experienceYears}
                  onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Cabin / Room No</label>
                <input
                  type="text"
                  value={formData.roomNo}
                  onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">OPD Fee (₹)</label>
                <input
                  type="number"
                  value={formData.fee}
                  onChange={(e) => setFormData({ ...formData, fee: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">OPD Hours / Timings</label>
              <input
                type="text"
                placeholder="e.g. 09:00 AM - 01:00 PM"
                value={formData.timings}
                onChange={(e) => setFormData({ ...formData, timings: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Physician Bio / Overview</label>
              <textarea
                rows={2}
                value={formData.about}
                onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                placeholder="Brief clinical background and areas of interest..."
                className="w-full p-2.5 rounded-xl border border-slate-300"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3">
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
                {editingDoctor ? 'Save Changes' : 'Add Doctor'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
