// client/src/components/common/Footer.jsx
import React from 'react';
import { HeartPulse, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight">Smart Clinic</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Modern, integrated clinical management system connecting patients, physicians, and healthcare administrators seamlessly.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>NABH & HIPAA Compliant Data Standards</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/patient/specialities" className="hover:text-teal-600 transition">Outpatient Specialities</Link></li>
              <li><Link to="/patient/book-opd" className="hover:text-teal-600 transition">OPD Slot Booking</Link></li>
              <li><Link to="/patient/ai-urgency" className="hover:text-teal-600 transition">AI Urgency Assessment</Link></li>
              <li><Link to="/patient/prescriptions" className="hover:text-teal-600 transition">Digital Prescriptions</Link></li>
            </ul>
          </div>

          {/* Clinical Timings */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">OPD Timings</h4>
            <div className="space-y-1.5 text-slate-500">
              <p><strong className="text-slate-700">Morning Session:</strong> 08:30 AM – 01:30 PM</p>
              <p><strong className="text-slate-700">Evening Session:</strong> 03:00 PM – 08:00 PM</p>
              <p><strong className="text-slate-700">Emergency Casualty:</strong> 24 / 7 Available</p>
              <p className="text-teal-600 font-medium pt-1">Sundays: Emergency & On-Call Only</p>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 text-xs uppercase tracking-wider">Contact & Location</h4>
            <ul className="space-y-2 text-slate-500">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                <span>Sector 14, Health Park Enclave, Pune, Maharashtra 411001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>+91 20 2555 0199 / +91 98765 00000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                <span>care@smartclinic.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} Smart Clinic Management System. Diploma Project Prototype.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Clinical Decision Support Prototype</span>
            <span>•</span>
            <span className="text-slate-400">Privacy & Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
