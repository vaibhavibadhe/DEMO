// client/src/pages/admin/StaffManagementPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Users,
  ShieldCheck,
  UserPlus,
  Mail,
  Lock,
  CheckCircle2,
  Search,
  KeyRound
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const StaffManagementPage = () => {
  const { demoAccounts } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  // Staff accounts list
  const [staffList, setStaffList] = useState([
    {
      id: 'stf-1',
      name: 'Pooja Deshmukh',
      email: 'receptionist@smartclinic.com',
      role: 'receptionist',
      title: 'Senior Frontdesk Coordinator',
      shift: 'Morning (08:00 AM - 02:00 PM)',
      status: 'Active'
    },
    {
      id: 'stf-2',
      name: 'Sunil Jadhav',
      email: 'receptionist2@smartclinic.com',
      role: 'receptionist',
      title: 'Evening OPD Coordinator',
      shift: 'Evening (02:00 PM - 08:00 PM)',
      status: 'Active'
    },
    {
      id: 'stf-3',
      name: 'Dr. K. N. Banerjee',
      email: 'admin@smartclinic.com',
      role: 'admin',
      title: 'Chief Medical Officer / Admin',
      shift: 'Full Time',
      status: 'Active'
    },
    {
      id: 'stf-4',
      name: 'Kavita Joshi',
      email: 'nurse.head@smartclinic.com',
      role: 'staff',
      title: 'Head Triage Nurse',
      shift: 'General Duty',
      status: 'Active'
    }
  ]);

  const filteredStaff = staffList.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Staff & Authorized Users</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage frontdesk receptionist accounts, role privileges, and active system credentials.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search staff by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
        </div>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          {staffList.length} Authorized Staff
        </span>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Authorized Role</th>
                <th className="py-3 px-4">Job Title</th>
                <th className="py-3 px-4">Assigned Shift</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Access Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    <div>
                      <span>{staff.name}</span>
                      <span className="text-[10px] text-slate-400 block font-normal">{staff.email}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        staff.role === 'admin'
                          ? 'danger'
                          : staff.role === 'receptionist'
                          ? 'warning'
                          : 'info'
                      }
                    >
                      {staff.role.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {staff.title}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {staff.shift}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{staff.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[11px] text-slate-500">
                    {staff.role === 'admin' ? 'FULL CLINIC ACCESS' : 'OPD DESK ACCESS'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
