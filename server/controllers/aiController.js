// controllers/aiController.js - AI Symptom & Urgency Triage Controller

export const analyzeUrgency = (req, res) => {
  const { symptoms, duration, severity, age, notes } = req.body;

  if (!symptoms || !symptoms.trim()) {
    return res.status(400).json({ success: false, message: 'Symptoms description is required' });
  }

  const symptomsLower = symptoms.toLowerCase();
  const notesLower = (notes || '').toLowerCase();
  const text = `${symptomsLower} ${notesLower}`;
  const severityScore = parseInt(severity, 10) || 5;

  // Emergency red flags
  const redFlags = [
    'chest pain', 'heart attack', 'shortness of breath', 'difficulty breathing',
    'severe bleeding', 'unconscious', 'fainting', 'stroke', 'paralysis',
    'sudden vision loss', 'coughing blood', 'severe head trauma', 'anaphylaxis',
    'blue lips', 'seizure', 'worst headache'
  ];

  const matchedRedFlags = redFlags.filter(flag => text.includes(flag));

  // Determine Urgency
  let urgencyLevel = 'MODERATE URGENCY';
  let suggestedSpeciality = 'General Medicine';
  let reasoning = [];
  let actionRecommendation = '';

  if (matchedRedFlags.length > 0 || severityScore >= 9) {
    urgencyLevel = 'HIGH URGENCY';
    reasoning.push(`Identified clinical high-priority indicator: ${matchedRedFlags.join(', ') || 'Critical severity score'}.`);
    actionRecommendation = 'Immediate emergency medical attention or Emergency Room (ER) visit is recommended. Do not wait for routine OPD.';
    suggestedSpeciality = 'General Medicine';
  } else if (
    text.includes('rash') || text.includes('skin') || text.includes('itch') ||
    text.includes('acne') || text.includes('eczema') || text.includes('dermat')
  ) {
    suggestedSpeciality = 'Dermatology';
    urgencyLevel = severityScore >= 7 ? 'MODERATE URGENCY' : 'LOW URGENCY';
    reasoning.push('Symptoms align with dermatological or skin-related conditions.');
    actionRecommendation = 'Schedule a consultation with a certified dermatologist for visual examination.';
  } else if (
    text.includes('child') || text.includes('baby') || text.includes('infant') ||
    text.includes('pediatric') || (age && parseInt(age, 10) < 14)
  ) {
    suggestedSpeciality = 'Pediatrics';
    urgencyLevel = severityScore >= 7 ? 'MODERATE URGENCY' : 'LOW URGENCY';
    reasoning.push('Patient is within pediatric age demographic or signs of childhood illness reported.');
    actionRecommendation = 'Consult a pediatrician for specialized age-appropriate clinical evaluation.';
  } else if (
    text.includes('bone') || text.includes('fracture') || text.includes('joint') ||
    text.includes('knee') || text.includes('back pain') || text.includes('sprain') || text.includes('spine')
  ) {
    suggestedSpeciality = 'Orthopedics';
    urgencyLevel = severityScore >= 8 ? 'HIGH URGENCY' : (severityScore >= 6 ? 'MODERATE URGENCY' : 'LOW URGENCY');
    reasoning.push('Musculoskeletal or joint/bone strain identified.');
    actionRecommendation = 'Schedule an orthopedic consultation and avoid strenuous loading.';
  } else if (
    text.includes('ear') || text.includes('nose') || text.includes('throat') ||
    text.includes('sinus') || text.includes('hearing') || text.includes('tonsil')
  ) {
    suggestedSpeciality = 'ENT (Ear, Nose & Throat)';
    urgencyLevel = severityScore >= 7 ? 'MODERATE URGENCY' : 'LOW URGENCY';
    reasoning.push('Symptoms primarily involve upper aerodigestive tract, nasal, or auditory channels.');
    actionRecommendation = 'Consult an ENT specialist for detailed endoscopic or otoscopic review.';
  } else if (
    text.includes('period') || text.includes('pregnancy') || text.includes('gynec') ||
    text.includes('pelvic') || text.includes('pcos')
  ) {
    suggestedSpeciality = 'Gynecology & Obstetrics';
    urgencyLevel = severityScore >= 8 ? 'HIGH URGENCY' : 'MODERATE URGENCY';
    reasoning.push('Indications related to obstetrics, gynecology, or pelvic wellness.');
    actionRecommendation = 'Schedule an appointment with a gynecologist.';
  } else {
    suggestedSpeciality = 'General Medicine';
    if (severityScore <= 4) {
      urgencyLevel = 'LOW URGENCY';
      reasoning.push('Mild constitutional symptoms without acute emergency indicators.');
      actionRecommendation = 'Routine primary care consultation or rest with hydration is advisable.';
    } else if (severityScore <= 7) {
      urgencyLevel = 'MODERATE URGENCY';
      reasoning.push('Moderate constitutional symptoms requiring physician review.');
      actionRecommendation = 'Schedule a same-day or next-day OPD appointment with a physician.';
    } else {
      urgencyLevel = 'HIGH URGENCY';
      reasoning.push('High severity symptoms reported.');
      actionRecommendation = 'Seek prompt medical evaluation from an on-duty clinician or urgent care center.';
    }
  }

  return res.json({
    success: true,
    data: {
      urgencyLevel,
      severityScore,
      suggestedSpeciality,
      durationEntered: duration || 'Not specified',
      reasoning: reasoning.length ? reasoning : ['General constitutional symptom assessment.'],
      actionRecommendation,
      safetyDisclaimer: 'CLINICAL SAFETY DISCLAIMER: This evaluation is generated by an automated clinical decision-support algorithm for informational and prioritization purposes only. It DOES NOT constitute a definitive medical diagnosis, nor does it replace professional judgment. Always consult a qualified physician for evaluation. If experiencing acute chest pain, severe shortness of breath, or sudden trauma, proceed immediately to the nearest Emergency Department.',
      matchedRedFlags: matchedRedFlags.length ? matchedRedFlags : null
    }
  });
};
