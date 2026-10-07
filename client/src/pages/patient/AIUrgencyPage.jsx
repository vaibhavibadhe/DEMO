// client/src/pages/patient/AIUrgencyPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { aiService } from '../../services/aiService';
import {
  Sparkles,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
  Clock,
  Activity,
  HeartPulse,
  Info,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const AIUrgencyPage = () => {
  const navigate = useNavigate();

  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('2-3 days');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [triageResult, setTriageResult] = useState(null);

  const quickSymptomChips = [
    'Mild fever & sore throat',
    'Sudden chest tightness & breathlessness',
    'Red itchy skin rash & swelling',
    'Severe knee joint pain after twist',
    'Persistent dry cough & fatigue',
    'Earache & blocked nasal passage'
  ];

  const handleQuickChip = (chip) => {
    setSymptoms(chip);
    if (chip.includes('chest') || chip.includes('breathless')) {
      setSeverity(9);
    } else if (chip.includes('knee') || chip.includes('Severe')) {
      setSeverity(7);
    } else {
      setSeverity(4);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);
    setTriageResult(null);

    // Call AI urgency service
    const result = await aiService.evaluateUrgency({
      symptoms,
      duration,
      severity,
      notes
    });

    setIsAnalyzing(false);
    setTriageResult(result);
  };

  const getUrgencyBadge = (level) => {
    if (level === 'HIGH URGENCY') {
      return <Badge variant="high" size="lg">HIGH URGENCY</Badge>;
    }
    if (level === 'MODERATE URGENCY') {
      return <Badge variant="moderate" size="lg">MODERATE URGENCY</Badge>;
    }
    return <Badge variant="low" size="lg">LOW URGENCY</Badge>;
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Clinical Triage Decision Support</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">AI Urgency & Symptom Assessment</h1>
        <p className="text-xs text-slate-500 mt-1">
          Evaluate symptom severity and receive department recommendations before scheduling an OPD slot.
        </p>
      </div>

      {/* Strict Medical Disclaimer Notice */}
      <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Informational Triage Tool Only • Not a Medical Diagnosis</p>
          <p className="text-amber-800/90 leading-relaxed text-[11px]">
            This tool provides clinical prioritization guidance and DOES NOT replace an examination by a qualified physician. Never ignore severe chest pain, sudden numbness, or shortness of breath.
          </p>
        </div>
      </div>

      {/* Input Form Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        <form onSubmit={handleAnalyze} className="space-y-6">
          {/* Quick Symptoms Chips */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Common Examples (Click to Autofill):
            </label>
            <div className="flex flex-wrap gap-2">
              {quickSymptomChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickChip(chip)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-[11px] font-medium hover:bg-teal-50 hover:border-teal-200 hover:text-teal-800 transition"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Describe Your Symptoms <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. Dry cough, headache, body aches, sore throat, or skin rashes..."
              className="w-full p-3.5 rounded-2xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-hidden"
              required
            />
          </div>

          {/* Duration & Severity Slider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Duration of Symptoms
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden font-medium bg-white"
              >
                <option value="Less than 24 hours">Less than 24 hours</option>
                <option value="2-3 days">2 - 3 days</option>
                <option value="1 week">About 1 week</option>
                <option value="More than 2 weeks">Chronic (More than 2 weeks)</option>
              </select>
            </div>

            {/* Severity Slider */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Perceived Severity Scale (1 - 10)
                </label>
                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                  severity >= 8 ? 'bg-rose-100 text-rose-700' : (severity >= 5 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800')
                }`}>
                  {severity} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full accent-teal-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-medium">
                <span>1 Mild</span>
                <span>5 Moderate</span>
                <span>8 Severe</span>
                <span>10 Emergency</span>
              </div>
            </div>
          </div>

          {/* Additional Health Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Relevant Pre-existing Conditions / History (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Hypertension, diabetes, allergy to medications, pregnant..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing || !symptoms.trim()}
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold tracking-wide shadow-xs transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isAnalyzing ? 'Evaluating Clinical Indicators...' : 'Analyze Symptoms & Urgency'}</span>
          </button>
        </form>
      </div>

      {/* Triage Result Display */}
      {triageResult && (
        <div className="space-y-6">
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
            triageResult.urgencyLevel === 'HIGH URGENCY'
              ? 'bg-rose-50/50 border-rose-300 ring-2 ring-rose-100'
              : (triageResult.urgencyLevel === 'MODERATE URGENCY'
                  ? 'bg-amber-50/40 border-amber-300 ring-2 ring-amber-100'
                  : 'bg-emerald-50/40 border-emerald-300 ring-2 ring-emerald-100')
          }`}>
            {/* Urgency Badge & Speciality recommendation */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Triage Classification
                </span>
                <div className="mt-1">
                  {getUrgencyBadge(triageResult.urgencyLevel)}
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Recommended Speciality
                </span>
                <span className="text-base font-bold text-slate-900 block mt-0.5">
                  {triageResult.suggestedSpeciality}
                </span>
              </div>
            </div>

            {/* Critical Emergency Red Flag Banner if High Urgency */}
            {triageResult.urgencyLevel === 'HIGH URGENCY' && (
              <div className="bg-rose-600 text-white p-4 rounded-2xl flex items-start gap-3 shadow-xs">
                <ShieldAlert className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <h4 className="font-bold text-sm">Urgent Medical Evaluation Required</h4>
                  <p className="leading-relaxed opacity-95">
                    Your symptoms indicate potential red-flag medical signs. Please seek emergency medical care at an Emergency Room or call 108 immediately. Do not delay waiting for a routine OPD appointment.
                  </p>
                  <p className="font-semibold text-rose-100 pt-1">
                    Emergency Trauma Desk: 108 / +91 20 2555 0100
                  </p>
                </div>
              </div>
            )}

            {/* Clinical Reasoning */}
            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                Algorithm Assessment Insights:
              </span>
              <ul className="space-y-1.5 list-disc pl-4 text-slate-700">
                {triageResult.reasoning?.map((reason, idx) => (
                  <li key={idx} className="leading-relaxed">{reason}</li>
                ))}
              </ul>
            </div>

            {/* Action Recommendation */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-teal-800 uppercase tracking-wider text-[10px]">
                Recommended Next Step:
              </span>
              <p className="text-slate-800 font-semibold">{triageResult.actionRecommendation}</p>
            </div>

            {/* Safety Disclaimer */}
            <div className="p-3.5 bg-slate-100 rounded-xl text-[11px] text-slate-500 leading-relaxed border border-slate-200">
              {triageResult.safetyDisclaimer}
            </div>

            {/* Direct Action Link to Book with Suggested Speciality */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-500">
                Ready to consult a physician in {triageResult.suggestedSpeciality}?
              </span>
              <Link
                to="/patient/book-opd"
                state={{ selectedSpeciality: triageResult.suggestedSpeciality }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition flex items-center justify-center gap-2"
              >
                <span>Book OPD in {triageResult.suggestedSpeciality}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
