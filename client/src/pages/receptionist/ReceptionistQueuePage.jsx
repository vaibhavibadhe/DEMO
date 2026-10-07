// client/src/pages/receptionist/ReceptionistQueuePage.jsx
import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import {
  Clock,
  Volume2,
  CheckCircle2,
  XCircle,
  Play,
  RotateCcw,
  User,
  Stethoscope,
  Filter
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const ReceptionistQueuePage = () => {
  const { queue, updateQueueToken, appointments } = useClinic();
  const [filter, setFilter] = useState('all');

  const handleSetStatus = (token, status) => {
    updateQueueToken(token, status);
  };

  const filteredTokens = queue.tokens.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Consultation':
        return <Badge variant="warning">In Consultation</Badge>;
      case 'Waiting':
        return <Badge variant="info">Waiting in Lounge</Badge>;
      case 'Scheduled':
        return <Badge variant="default">Scheduled</Badge>;
      case 'Completed':
        return <Badge variant="success">Completed</Badge>;
      case 'No Show':
        return <Badge variant="danger">No Show</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Live Outpatient Queue & Token Manager</h1>
        <p className="text-xs text-slate-500 mt-1">
          Control clinic public announcements, coordinate patient entry, and maintain queue discipline.
        </p>
      </div>

      {/* Large Live Announcement Screen */}
      <div className="bg-radial from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Public Lounge Calling Broadcast</span>
          </div>
          <div className="flex items-baseline justify-center md:justify-start gap-4">
            <span className="text-5xl sm:text-6xl font-black font-mono text-teal-300 tracking-tight">
              {queue.currentToken || 'T-102'}
            </span>
            <div className="text-left">
              <span className="text-xl sm:text-2xl font-bold text-white block">
                {queue.currentTokenPatient || 'Rohan Verma'}
              </span>
              <span className="text-xs text-slate-400 block">Please Proceed to OPD Cabin 101</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {queue.tokens
            .filter((t) => t.status === 'Waiting')
            .slice(0, 1)
            .map((nextT) => (
              <button
                key={nextT.token}
                onClick={() => handleSetStatus(nextT.token, 'In Consultation')}
                className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Call Next: {nextT.token} ({nextT.patientName})</span>
              </button>
            ))}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 text-xs font-semibold">
        {[
          { id: 'all', label: `All Tokens (${queue.tokens.length})` },
          { id: 'Waiting', label: `Waiting (${queue.tokens.filter((t) => t.status === 'Waiting').length})` },
          { id: 'In Consultation', label: `In Cabin (${queue.tokens.filter((t) => t.status === 'In Consultation').length})` },
          { id: 'Completed', label: `Completed (${queue.tokens.filter((t) => t.status === 'Completed').length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl transition ${
              filter === tab.id
                ? 'bg-teal-600 text-white font-bold shadow-2xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tokens Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">Token #</th>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Arrival Time</th>
                <th className="py-3 px-4">Assigned Doctor</th>
                <th className="py-3 px-4">Queue Status</th>
                <th className="py-3 px-4 text-right">Queue Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTokens.length > 0 ? (
                filteredTokens.map((item) => (
                  <tr key={item.token} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-mono font-black text-sm text-teal-800">
                      {item.token}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {item.patientName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {item.arrivalTime || '09:30 AM'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {item.docId === 'doc-2' ? 'Dr. Priya Patel (Cabin 104)' : 'Dr. Rajesh Mehta (Cabin 101)'}
                    </td>
                    <td className="py-3.5 px-4">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status !== 'In Consultation' && (
                          <button
                            onClick={() => handleSetStatus(item.token, 'In Consultation')}
                            className="px-2.5 py-1 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition text-[11px]"
                            title="Call to Cabin"
                          >
                            Call
                          </button>
                        )}
                        {item.status !== 'Completed' && (
                          <button
                            onClick={() => handleSetStatus(item.token, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold transition text-[11px] border border-emerald-200"
                            title="Mark Completed"
                          >
                            Complete
                          </button>
                        )}
                        {item.status !== 'No Show' && item.status !== 'Completed' && (
                          <button
                            onClick={() => handleSetStatus(item.token, 'No Show')}
                            className="px-2 py-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 text-[11px]"
                            title="Mark No Show"
                          >
                            No Show
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    No tokens match the selected queue filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
