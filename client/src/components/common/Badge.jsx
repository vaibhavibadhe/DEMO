// client/src/components/common/Badge.jsx
import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'md' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-teal-50 text-teal-700 border-teal-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    // Urgency specific
    low: 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold',
    moderate: 'bg-amber-50 text-amber-800 border-amber-300 font-semibold',
    high: 'bg-rose-50 text-rose-700 border-rose-300 font-bold animate-pulse'
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${variants[variant] || variants.default} ${sizes[size]}`}
    >
      {children}
    </span>
  );
};
