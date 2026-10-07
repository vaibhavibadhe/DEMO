// client/src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  HeartPulse,
  User,
  Stethoscope,
  ClipboardList,
  ShieldCheck,
  ArrowRight,
  Lock,
  Mail,
  AlertCircle
} from 'lucide-react';

export const LoginPage = () => {
  const { login, switchDemoRole, demoAccounts } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleManualLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(`/${res.user.role}`);
    } else {
      setError(res.message || 'Login failed. Please verify credentials or use 1-click demo access.');
    }
  };

  const handleDemoSelect = (account) => {
    switchDemoRole(account.role);
    navigate(`/${account.role}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-sm">
            <HeartPulse className="w-7 h-7" />
          </div>
        </Link>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
          Smart Clinic System
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Role-Based Outpatient & Clinical Management Portal
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-sm border border-slate-200 rounded-3xl space-y-8">
          {/* Quick Demo Access Header */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                1-Click Prototype Demonstration Access
              </span>
              <span className="text-[11px] text-slate-400">Click any role to enter</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoAccounts.map((account) => {
                const roleIcons = {
                  patient: User,
                  doctor: Stethoscope,
                  receptionist: ClipboardList,
                  admin: ShieldCheck
                };
                const Icon = roleIcons[account.role] || User;

                const borderColors = {
                  patient: 'hover:border-teal-400 hover:bg-teal-50/40',
                  doctor: 'hover:border-sky-400 hover:bg-sky-50/40',
                  receptionist: 'hover:border-amber-400 hover:bg-amber-50/40',
                  admin: 'hover:border-rose-400 hover:bg-rose-50/40'
                };

                return (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => handleDemoSelect(account)}
                    className={`text-left p-3.5 rounded-2xl border border-slate-200 transition group flex items-start gap-3 bg-white ${borderColors[account.role]}`}
                  >
                    <img
                      src={account.avatar}
                      alt={account.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 flex-shrink-0 mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-teal-700 truncate">
                          {account.name}
                        </span>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 ml-1">
                          {account.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{account.subtitle}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-semibold tracking-wider">Or Manual Sign In</span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleManualLogin}>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rohan@smartclinic.com or dr.rajesh@smartclinic.com"
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold tracking-wide shadow-xs transition flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Workspace'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center">
            <Link to="/" className="text-xs text-slate-500 hover:text-teal-600 transition">
              ← Return to Smart Clinic homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
