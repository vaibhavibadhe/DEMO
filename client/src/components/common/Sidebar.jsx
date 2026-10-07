// client/src/components/common/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  CalendarCheck,
  Stethoscope,
  CalendarPlus,
  FileText,
  Sparkles,
  Users,
  Activity,
  ClipboardList,
  UserPlus,
  Settings,
  BarChart3,
  ShieldCheck,
  Clock,
  Layers
} from 'lucide-react';

export const Sidebar = () => {
  const { role } = useAuth();

  const navConfigs = {
    patient: [
      { to: '/patient', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/patient/book-opd', label: 'Book OPD Slot', icon: CalendarPlus },
      { to: '/patient/specialities', label: 'Specialities', icon: Layers },
      { to: '/patient/appointments', label: 'My Appointments', icon: CalendarCheck },
      { to: '/patient/records', label: 'Medical Records', icon: FileText },
      { to: '/patient/prescriptions', label: 'Digital Prescriptions', icon: ClipboardList },
      { to: '/patient/ai-urgency', label: 'AI Urgency Triage', icon: Sparkles, badge: 'Smart' },
    ],
    doctor: [
      { to: '/doctor', label: 'Doctor Overview', icon: LayoutDashboard },
      { to: '/doctor/opd', label: "Today's OPD Queue", icon: Clock },
      { to: '/doctor/patients', label: 'My Patients', icon: Users },
      { to: '/doctor/prescriptions', label: 'Issued Prescriptions', icon: ClipboardList },
    ],
    receptionist: [
      { to: '/receptionist', label: 'Frontdesk Overview', icon: LayoutDashboard },
      { to: '/receptionist/queue', label: 'Live Queue & Tokens', icon: Clock },
      { to: '/receptionist/registration', label: 'Patient Registration', icon: UserPlus },
      { to: '/receptionist/appointments', label: 'Manage Appointments', icon: CalendarCheck },
    ],
    admin: [
      { to: '/admin', label: 'Admin Overview', icon: LayoutDashboard },
      { to: '/admin/doctors', label: 'Doctor Management', icon: Stethoscope },
      { to: '/admin/staff', label: 'Staff Management', icon: Users },
      { to: '/admin/patients', label: 'Patient Directory', icon: Activity },
      { to: '/admin/specialities', label: 'Specialities', icon: Layers },
      { to: '/admin/reports', label: 'Reports & Analytics', icon: BarChart3 },
    ]
  };

  const items = navConfigs[role] || [];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col flex-shrink-0 min-h-[calc(100vh-64px)]">
      <div className="p-4 flex-1">
        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          {role} Workspace
        </div>
        <nav className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === `/${role}`}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-slate-500 group-hover:text-teal-600" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-100 text-teal-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Clinic Emergency helpline box */}
      <div className="p-4 border-t border-slate-100">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            OPD Hours: 8 AM - 8 PM
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Emergency Trauma Desk: 108 / +91 20 2555 0100</p>
        </div>
      </div>
    </aside>
  );
};
