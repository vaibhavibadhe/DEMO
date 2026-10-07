// client/src/pages/admin/ReportsPage.jsx
import React from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Stethoscope,
  Award,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { StatsCard } from '../../components/common/StatsCard';

export const ReportsPage = () => {
  const { doctors, specialities, appointments, consultations } = useClinic();

  const dailyVolume = [
    { day: 'Monday', patients: 26, appointments: 28, height: '70%' },
    { day: 'Tuesday', patients: 30, appointments: 32, height: '80%' },
    { day: 'Wednesday', patients: 27, appointments: 29, height: '72%' },
    { day: 'Thursday', patients: 34, appointments: 36, height: '90%' },
    { day: 'Friday', patients: 38, appointments: 40, height: '100%' },
    { day: 'Saturday', patients: 24, appointments: 25, height: '62%' },
    { day: 'Sunday', patients: 11, appointments: 12, height: '30%' }
  ];

  const specialityBreakdown = specialities.map((s, index) => {
    const aptCount = appointments.filter((a) => a.speciality === s.name).length + (index * 4 + 3);
    const total = 50;
    const percentage = Math.min(100, Math.round((aptCount / total) * 100));
    return {
      name: s.name,
      count: aptCount,
      percentage
    };
  });

  const doctorWorkload = doctors.map((doc, idx) => {
    const consultationsCount =
      consultations.filter((c) => c.doctorId === doc.id || c.doctorName === doc.name).length +
      (idx * 3 + 4);
    return {
      name: doc.name,
      speciality: doc.speciality,
      consultationsCount,
      avgTime: '11 mins',
      rating: doc.rating || 4.9,
      occupancy: `${85 + (idx % 3) * 5}%`
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clinic Reports & Operational Analytics</h1>
        <p className="text-xs text-slate-500 mt-1">
          Visual insights into outpatient volume, clinician workload, department demands, and patient flow efficiency.
        </p>
      </div>

      {/* Operational Highlights */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Avg Patient Wait Time"
          value="12.4 min"
          subtitle="Target: under 15 min"
          icon={Clock}
          color="teal"
          trend="Optimal"
        />
        <StatsCard
          title="Prescription Rate"
          value="100%"
          subtitle="Digital structured format"
          icon={CheckCircle2}
          color="emerald"
        />
        <StatsCard
          title="Weekly Consultations"
          value="207"
          subtitle="Across all OPD cabins"
          icon={TrendingUp}
          color="blue"
          trend="+8.4%"
        />
        <StatsCard
          title="Patient Satisfaction"
          value="4.92 / 5"
          subtitle="Based on 490+ reviews"
          icon={Award}
          color="amber"
        />
      </div>

      {/* Daily Volume Bar Chart */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-base text-slate-900">Patients & Appointments Per Day</h3>
            <p className="text-xs text-slate-400">Daily registered outpatient turnout this current week</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-md bg-teal-600"></span> Appointments
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded-md bg-teal-200"></span> Unique Patients
            </span>
          </div>
        </div>

        {/* Clean SVG / CSS Bar Chart */}
        <div className="pt-6 flex items-end justify-between gap-3 sm:gap-6 h-56 border-b border-slate-100 pb-3">
          {dailyVolume.map((item, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
              <div className="text-[10px] font-bold text-teal-800 opacity-0 group-hover:opacity-100 transition">
                {item.appointments}
              </div>
              <div className="w-full max-w-[48px] flex items-end gap-1 h-full">
                {/* Appointments Bar */}
                <div
                  className="flex-1 bg-teal-600 group-hover:bg-teal-700 rounded-t-lg transition-all"
                  style={{ height: item.height }}
                />
                {/* Patients Bar */}
                <div
                  className="flex-1 bg-teal-200 group-hover:bg-teal-300 rounded-t-lg transition-all"
                  style={{ height: `calc(${item.height} - 10%)` }}
                />
              </div>
              <span className="text-xs font-semibold text-slate-500 truncate max-w-full">
                {item.day.slice(0, 3)}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>Weekly Peak: <strong>Friday (40 consultations scheduled)</strong></span>
          <span>Busiest OPD Hour: <strong>10:30 AM – 12:00 PM</strong></span>
        </div>
      </div>

      {/* Grid: Appointments by Speciality & Doctor Workload */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments by Speciality */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-base text-slate-900">Appointments by Speciality</h3>
            <p className="text-xs text-slate-400">Departmental consultation demand proportion</p>
          </div>

          <div className="space-y-4">
            {specialityBreakdown.map((spec, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{spec.name}</span>
                  <span className="text-teal-700">{spec.count} Bookings ({spec.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-teal-600 h-full rounded-full transition-all"
                    style={{ width: `${spec.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Doctor Workload Distribution Table */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <div>
            <h3 className="font-bold text-base text-slate-900">Doctor Workload & Efficiency</h3>
            <p className="text-xs text-slate-400">Consultations completed and turnaround metrics</p>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Physician</th>
                  <th className="py-2.5 px-3">Speciality</th>
                  <th className="py-2.5 px-3">Visits</th>
                  <th className="py-2.5 px-3">Avg Time</th>
                  <th className="py-2.5 px-3 text-right">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {doctorWorkload.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{doc.name}</td>
                    <td className="py-2.5 px-3 text-teal-700">{doc.speciality}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{doc.consultationsCount}</td>
                    <td className="py-2.5 px-3 text-slate-600">{doc.avgTime}</td>
                    <td className="py-2.5 px-3 text-right font-semibold text-amber-600">★ {doc.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
