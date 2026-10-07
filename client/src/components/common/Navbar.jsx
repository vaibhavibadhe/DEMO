// client/src/components/common/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HeartPulse, LogOut, Bell, User, Sparkles } from 'lucide-react';
import { Badge } from './Badge';

export const Navbar = () => {
  const { currentUser, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleColors = {
    patient: 'primary',
    doctor: 'info',
    receptionist: 'warning',
    admin: 'danger'
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 sm:top-[37px] z-40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-sm group-hover:bg-teal-700 transition">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-slate-900 tracking-tight">Smart Clinic</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-100">Care</span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium -mt-1 hidden sm:block">Intelligent Healthcare Platform</p>
          </div>
        </Link>

        {/* Right side items */}
        <div className="flex items-center gap-4">
          {/* Quick AI shortcut button for patients */}
          {role === 'patient' && (
            <Link
              to="/patient/ai-urgency"
              className="hidden md:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>AI Urgency Triage</span>
            </Link>
          )}

          {/* User Profile Badge */}
          {currentUser ? (
            <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  {currentUser.name}
                </div>
                <div className="mt-0.5">
                  <Badge variant={roleColors[role] || 'default'} size="sm">
                    {role.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <img
                src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt={currentUser.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-100"
              />

              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
