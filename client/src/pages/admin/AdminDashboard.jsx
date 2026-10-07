// client/src/pages/admin/AdminDashboard.jsx
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useClinic } from '../../context/ClinicContext';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  Stethoscope,
  CalendarCheck,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Layers,
  ArrowRight,
  Activity
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { doctors, patients, appointments, specialities } = useClinic();

  const totalPatients = patients.length;
  const totalDoctors = doctors.length;
  const todayAppointments = appointments.length;
  const completedCount = appointments.filter((a) => a.status === 'Completed').length;

  // Mock weekly trends
  const weeklyTrends = [
    { day: 'Mon', count: 24, height: '60%' },
    { day: 'Tue', count: 32, height: '80%' },
    { day: 'Wed', count: 28, height: '70%' },
    { day: 'Thu', count: 36, height: '90%' },
    { day: 'Fri', count: 40, height: '100%' },
    { day: 'Sat', count: 22, height: '55%' },
    { day: 'Sun', count: 12, height: '30%' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 text-rose-800 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-600" />
            <span>Clinic Executive Administration</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {currentUser?.name || 'Dr. K. N. Banerjee'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Clinic Medical Director • Manage clinical faculty, department specialities, and healthcare performance metrics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/doctors"
            className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center gap-2"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Manage Doctors</span>
          </Link>
          <Link
            to="/admin/reports"
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition flex items-center gap-1.5"
          >
            <BarChart3 className="w-4 h-4 text-teal-600" />
            <span>Analytics & Reports</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Registered Patients"
          value={totalPatients}
          subtitle="Longitudinal records"
          icon={Users}
          color="teal"
          trend="+12% this mo"
        />
        <StatsCard
          title="Consultant Doctors"
          value={totalDoctors}
          subtitle="Active clinical faculty"
          icon={Stethoscope}
          color="blue"
        />
        <StatsCard
          title="Today's OPD Bookings"
          value={todayAppointments}
          subtitle="Tokens scheduled"
          icon={CalendarCheck}
          color="amber"
          trend="85% capacity"
        />
        <StatsCard
          title="Completed Consults"
          value={completedCount}
          subtitle="Electronic Rx issued"
          icon={CheckCircle2}
          color="emerald"
        />
      </div>

      {/* Visual Analytics Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Appointments Bar Visual */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Weekly Outpatient Volume</h3>
              <p className="text-xs text-slate-400">Total consultations per day this week</p>
            </div>
            <Link to="/admin/reports" className="text-xs font-semibold text-teal-600 hover:text-teal-700">
              Detailed Trends →
            </Link>
          </div>

          <div className="pt-4 flex items-end justify-between gap-3 h-48 border-b border-slate-100 pb-2">
            {weeklyTrends.map((t, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition">
                  {t.count}
                </span>
                <div
                  className="w-full bg-teal-100 group-hover:bg-teal-600 rounded-t-xl transition-all"
                  style={{ height: t.height }}
                />
                <span className="text-xs font-semibold text-slate-500">{t.day}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Peak Consultation Day: <strong>Friday (40 Patients)</strong></span>
            <span className="text-teal-700 font-semibold">Avg: 28 OPD/Day</span>
          </div>
        </div>

        {/* Specialities Distribution */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Speciality Workload Distribution</h3>
              <p className="text-xs text-slate-400">Active clinicians by department</p>
            </div>
            <Link to="/admin/specialities" className="text-xs font-semibold text-teal-600 hover:text-teal-700">
              Manage Specialities →
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {specialities.map((spec) => {
              const docCount = doctors.filter((d) => d.speciality === spec.name).length;
              const percent = Math.min(100, Math.round((docCount / (doctors.length || 1)) * 100));

              return (
                <div key={spec.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{spec.name}</span>
                    <span className="text-slate-500">{docCount} Doctors ({percent}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-600 h-full rounded-full transition-all"
                      style={{ width: `${percent || 15}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Administration Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/admin/doctors"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xs transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3 group-hover:bg-teal-600 group-hover:text-white transition">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Doctor Management</h4>
          <p className="text-xs text-slate-500 mt-1">Add physicians, modify qualifications, adjust OPD fees.</p>
        </Link>

        <Link
          to="/admin/staff"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xs transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:bg-sky-600 group-hover:text-white transition">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Staff & Roles</h4>
          <p className="text-xs text-slate-500 mt-1">Manage frontdesk receptionists and security credentials.</p>
        </Link>

        <Link
          to="/admin/reports"
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-300 shadow-2xs hover:shadow-xs transition group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">Operational Analytics</h4>
          <p className="text-xs text-slate-500 mt-1">Doctor workload, OPD turnaround time & clinic revenue.</p>
        </Link>
      </div>
    </div>
  );
};
