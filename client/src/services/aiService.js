// client/src/services/aiService.js - AI Urgency & Symptom Analysis Service
import { apiClient } from './api';

export const aiService = {
  /**
   * Evaluates patient symptoms and calculates urgency level with medical safeguards.
   * @param {Object} input - { symptoms, duration, severity, age, notes }
   * @returns {Promise<Object>} Triage evaluation results
   */
  async evaluateUrgency(input) {
    const { symptoms = '', duration = '', severity = 5, age = null, notes = '' } = input;

    // First attempt to call the backend AI triage API
    const response = await apiClient.post('/ai/urgency-analysis', {
      symptoms,
      duration,
      severity,
      age,
      notes
    });

    if (response && response.success && response.data) {
      return response.data;
    }

    // Resilient local clinical triage heuristics fallback
    return this.fallbackLocalTriage({ symptoms, duration, severity, age, notes });
  },

  /**
   * Resilient offline rule-based triage assessment
   */
  fallbackLocalTriage({ symptoms, duration, severity, age, notes }) {
    const text = `${symptoms.toLowerCase()} ${(notes || '').toLowerCase()}`;
    const severityScore = parseInt(severity, 10) || 5;

    const redFlags = [
      'chest pain', 'heart attack', 'shortness of breath', 'difficulty breathing',
      'severe bleeding', 'unconscious', 'fainting', 'stroke', 'paralysis',
      'sudden vision loss', 'coughing blood', 'severe head trauma', 'anaphylaxis',
      'blue lips', 'seizure', 'worst headache'
    ];

    const matchedRedFlags = redFlags.filter(flag => text.includes(flag));

    let urgencyLevel = 'MODERATE URGENCY';
    let suggestedSpeciality = 'General Medicine';
    const reasoning = [];
    let actionRecommendation = '';

    if (matchedRedFlags.length > 0 || severityScore >= 9) {
      urgencyLevel = 'HIGH URGENCY';
      reasoning.push(`Identified clinical high-priority indicator: ${matchedRedFlags.join(', ') || 'Critical severity score'}.`);
      actionRecommendation = 'Immediate emergency medical attention or Emergency Department visit is recommended. Do not delay.';
      suggestedSpeciality = 'General Medicine';
    } else if (text.includes('rash') || text.includes('skin') || text.includes('itch') || text.includes('acne') || text.includes('eczema')) {
      suggestedSpeciality = 'Dermatology';
      urgencyLevel = severityScore >= 7 ? 'MODERATE URGENCY' : 'LOW URGENCY';
      reasoning.push('Symptoms indicate dermatological or allergic skin manifestations.');
      actionRecommendation = 'Schedule a consultation with a certified dermatologist for clinical examination.';
    } else if (text.includes('child') || text.includes('baby') || text.includes('infant') || (age && parseInt(age, 10) < 14)) {
      suggestedSpeciality = 'Pediatrics';
      urgencyLevel = severityScore >= 7 ? 'MODERATE URGENCY' : 'LOW URGENCY';
      reasoning.push('Patient is within pediatric age demographic or pediatric symptoms described.');
      actionRecommendation = 'Consult a pediatrician for specialized age-appropriate clinical evaluation.';
    } else if (text.includes('bone') || text.includes('fracture') || text.includes('joint') || text.includes('knee') || text.includes('sprain') || text.includes('back pain')) {
      suggestedSpeciality = 'Orthopedics';
      urgencyLevel = severityScore >= 8 ? 'HIGH URGENCY' : (severityScore >= 6 ? 'MODERATE URGENCY' : 'LOW URGENCY');
      reasoning.push('Musculoskeletal strain or joint stress symptoms.');
      actionRecommendation = 'Schedule an orthopedic consultation and avoid strenuous load-bearing.';
    } else if (text.includes('ear') || text.includes('nose') || text.includes('throat') || text.includes('sinus') || text.includes('tonsil')) {
      suggestedSpeciality = 'ENT (Ear, Nose & Throat)';
      urgencyLevel = severityScore >= 7 ? 'MODERATE URGENCY' : 'LOW URGENCY';
      reasoning.push('Symptoms primarily involve ENT or upper aerodigestive tract.');
      actionRecommendation = 'Consult an ENT specialist for detailed otoscopic or throat review.';
    } else if (text.includes('period') || text.includes('pregnancy') || text.includes('gynec') || text.includes('pelvic') || text.includes('pcos')) {
      suggestedSpeciality = 'Gynecology & Obstetrics';
      urgencyLevel = severityScore >= 8 ? 'HIGH URGENCY' : 'MODERATE URGENCY';
      reasoning.push('Indications related to obstetrics, gynecology, or pelvic health.');
      actionRecommendation = 'Schedule an appointment with a gynecologist.';
    } else {
      suggestedSpeciality = 'General Medicine';
      if (severityScore <= 4) {
        urgencyLevel = 'LOW URGENCY';
        reasoning.push('Mild constitutional symptoms without acute emergency indicators.');
        actionRecommendation = 'Routine primary care consultation or home rest with proper hydration.';
      } else if (severityScore <= 7) {
        urgencyLevel = 'MODERATE URGENCY';
        reasoning.push('Moderate constitutional symptoms requiring clinical examination.');
        actionRecommendation = 'Schedule a standard OPD appointment with a physician.';
      } else {
        urgencyLevel = 'HIGH URGENCY';
        reasoning.push('High severity symptoms reported.');
        actionRecommendation = 'Seek prompt medical evaluation from an on-duty clinician or urgent care center.';
      }
    }

    return {
      urgencyLevel,
      severityScore,
      suggestedSpeciality,
      durationEntered: duration || 'Not specified',
      reasoning: reasoning.length ? reasoning : ['General constitutional symptom assessment.'],
      actionRecommendation,
      safetyDisclaimer: 'CLINICAL SAFETY DISCLAIMER: This evaluation is generated by an automated clinical decision-support algorithm for informational and prioritization purposes only. It DOES NOT constitute a definitive medical diagnosis, nor does it replace professional judgment. Always consult a qualified physician for evaluation. If experiencing acute chest pain, severe shortness of breath, or sudden trauma, proceed immediately to the nearest Emergency Department.',
      matchedRedFlags: matchedRedFlags.length ? matchedRedFlags : null
    };
  }
};
