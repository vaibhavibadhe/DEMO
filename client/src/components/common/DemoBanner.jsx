// client/src/components/common/DemoBanner.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserCheck, ShieldAlert, Stethoscope, ClipboardList, User } from 'lucide-react';

export const DemoBanner = () => {
  const { currentUser, role, switchDemoRole } = useAuth();
  const navigate = useNavigate();

  const handleSwitch = (newRole) => {
    switchDemoRole(newRole);
    navigate(`/${newRole}`);
  };

  return (
    <aside aria-label="Demo switcher banner" className="demo-bar bg-slate-900 text-slate-200 text-xs px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 font-semibold text-teal-400 uppercase tracking-wider text-[11px]">
          <ShieldAlert className="w-3.5 h-3.5" /> Demo Switcher:
        </span>
        <span className="text-slate-300">
          Currently logged in as <strong className="text-white capitalize">{currentUser?.name || role}</strong> (<span className="text-teal-300 capitalize">{role}</span>)
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-slate-400 mr-1 hidden sm:inline">Quick Switch:</span>

        <button
          onClick={() => handleSwitch('patient')}
          className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
            role === 'patient'
              ? 'bg-teal-600 text-white font-semibold ring-1 ring-teal-400'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          title="Switch to Patient role"
        >
          <User className="w-3 h-3" /> Patient
        </button>

        <button
          onClick={() => handleSwitch('doctor')}
          className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
            role === 'doctor'
              ? 'bg-teal-600 text-white font-semibold ring-1 ring-teal-400'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          title="Switch to Doctor role"
        >
          <Stethoscope className="w-3 h-3" /> Doctor
        </button>

        <button
          onClick={() => handleSwitch('receptionist')}
          className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
            role === 'receptionist'
              ? 'bg-teal-600 text-white font-semibold ring-1 ring-teal-400'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          title="Switch to Receptionist role"
        >
          <ClipboardList className="w-3 h-3" /> Receptionist
        </button>

        <button
          onClick={() => handleSwitch('admin')}
          className={`px-2.5 py-1 rounded text-xs font-medium transition flex items-center gap-1 ${
            role === 'admin'
              ? 'bg-teal-600 text-white font-semibold ring-1 ring-teal-400'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          title="Switch to Admin role"
        >
          <UserCheck className="w-3 h-3" /> Admin
        </button>
      </div>
    </aside>
  );
};
