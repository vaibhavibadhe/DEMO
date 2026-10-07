// mockData.js - Client-side state & fallback seed data

export const initialSpecialities = [
  {
    id: "spec-1",
    name: "General Medicine",
    icon: "Stethoscope",
    description: "Primary care, seasonal infections, chronic conditions & adult wellness.",
    doctorCount: 2
  },
  {
    id: "spec-2",
    name: "Pediatrics",
    icon: "Baby",
    description: "Infant, child and adolescent health, growth monitoring & vaccinations.",
    doctorCount: 1
  },
  {
    id: "spec-3",
    name: "Orthopedics",
    icon: "Bone",
    description: "Bone fractures, joint disorders, arthritis, spinal care & sports rehabilitation.",
    doctorCount: 1
  },
  {
    id: "spec-4",
    name: "Dermatology",
    icon: "Sparkles",
    description: "Skin disorders, clinical allergies, eczema, acne therapies & hair care.",
    doctorCount: 1
  },
  {
    id: "spec-5",
    name: "Gynecology & Obstetrics",
    icon: "HeartPulse",
    description: "Women's reproductive health, prenatal consultations & hormonal wellness.",
    doctorCount: 1
  },
  {
    id: "spec-6",
    name: "ENT (Ear, Nose & Throat)",
    icon: "Activity",
    description: "Sinusitis, audiology, throat infections, vertigo & tonsillitis.",
    doctorCount: 1
  }
];

export const initialDoctors = [
  {
    id: "doc-1",
    name: "Dr. Rajesh Mehta",
    email: "dr.rajesh@smartclinic.com",
    qualification: "MBBS, MD (Internal Medicine)",
    speciality: "General Medicine",
    specialityId: "spec-1",
    experienceYears: 14,
    roomNo: "OPD Cabin 101",
    fee: 500,
    rating: 4.9,
    reviewsCount: 142,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=80",
    about: "Dr. Rajesh Mehta is a senior consultant physician with over 14 years of clinical experience in managing metabolic disorders, hypertension, diabetes, and acute infectious illnesses.",
    schedule: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      timings: "09:00 AM - 01:00 PM",
      slots: ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM"]
    },
    status: "Active"
  },
  {
    id: "doc-2",
    name: "Dr. Priya Patel",
    email: "dr.priya@smartclinic.com",
    qualification: "MBBS, MD (Pediatrics), DNB (Pediatrics)",
    speciality: "Pediatrics",
    specialityId: "spec-2",
    experienceYears: 10,
    roomNo: "OPD Cabin 104",
    fee: 600,
    rating: 4.95,
    reviewsCount: 188,
    avatar: "https://images.unsplash.com/photo-1594824813571-638f026361a1?w=300&auto=format&fit=crop&q=80",
    about: "Dr. Priya Patel specializes in pediatric preventative healthcare, child developmental assessments, childhood asthma, and pediatric immunization schedules.",
    schedule: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      timings: "10:00 AM - 02:00 PM",
      slots: ["10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM"]
    },
    status: "Active"
  },
  {
    id: "doc-3",
    name: "Dr. Ananya Sharma",
    email: "dr.ananya@smartclinic.com",
    qualification: "MBBS, MS (Orthopedics), F.J.R.",
    speciality: "Orthopedics",
    specialityId: "spec-3",
    experienceYears: 8,
    roomNo: "OPD Cabin 108",
    fee: 700,
    rating: 4.85,
    reviewsCount: 96,
    avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop&q=80",
    about: "Dr. Ananya Sharma is a fellowship-trained orthopedic specialist focused on degenerative joint management, sports injuries, ligament tears, and post-traumatic rehabilitation.",
    schedule: {
      days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      timings: "02:00 PM - 06:00 PM",
      slots: ["02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM"]
    },
    status: "Active"
  },
  {
    id: "doc-4",
    name: "Dr. Vikram Rao",
    email: "dr.vikram@smartclinic.com",
    qualification: "MBBS, MD (Dermatology, Venereology & Leprosy)",
    speciality: "Dermatology",
    specialityId: "spec-4",
    experienceYears: 12,
    roomNo: "OPD Cabin 201",
    fee: 550,
    rating: 4.88,
    reviewsCount: 110,
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&auto=format&fit=crop&q=80",
    about: "Dr. Vikram Rao provides evidence-based dermatological therapies for chronic eczema, psoriasis, acne vulgaris, and clinical trichology.",
    schedule: {
      days: ["Monday", "Wednesday", "Friday", "Saturday"],
      timings: "11:00 AM - 04:00 PM",
      slots: ["11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"]
    },
    status: "Active"
  },
  {
    id: "doc-5",
    name: "Dr. Sunita Kulkarni",
    email: "dr.sunita@smartclinic.com",
    qualification: "MBBS, MS (OBG), DGO",
    speciality: "Gynecology & Obstetrics",
    specialityId: "spec-5",
    experienceYears: 15,
    roomNo: "OPD Cabin 205",
    fee: 650,
    rating: 4.92,
    reviewsCount: 164,
    avatar: "https://images.unsplash.com/photo-1591604021695-0c69b7c03381?w=300&auto=format&fit=crop&q=80",
    about: "Dr. Sunita Kulkarni has extensive expertise in comprehensive obstetrics, prenatal monitoring, PCOS management, and adolescent gynaecology.",
    schedule: {
      days: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday"],
      timings: "09:30 AM - 01:30 PM",
      slots: ["09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "01:00 PM"]
    },
    status: "Active"
  },
  {
    id: "doc-6",
    name: "Dr. Sameer Joshi",
    email: "dr.sameer@smartclinic.com",
    qualification: "MBBS, MS (Otorhinolaryngology - ENT)",
    speciality: "ENT (Ear, Nose & Throat)",
    specialityId: "spec-6",
    experienceYears: 9,
    roomNo: "OPD Cabin 210",
    fee: 500,
    rating: 4.8,
    reviewsCount: 78,
    avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80",
    about: "Dr. Sameer Joshi specializes in endoscopic sinus management, vertigo evaluations, hearing rehabilitation, and pediatric ENT ailments.",
    schedule: {
      days: ["Tuesday", "Thursday", "Saturday"],
      timings: "12:00 PM - 05:00 PM",
      slots: ["12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"]
    },
    status: "Active"
  }
];

export const initialPatients = [
  {
    id: "pat-1",
    name: "Rohan Verma",
    email: "rohan@smartclinic.com",
    phone: "+91 98765 43210",
    gender: "Male",
    age: 28,
    bloodGroup: "B+",
    address: "Flat 402, Green Valley Enclave, Model Colony, Pune",
    emergencyContact: "Anand Verma (+91 98765 43211)",
    allergies: ["Penicillin (mild rash)"],
    registeredAt: "2026-08-15"
  },
  {
    id: "pat-2",
    name: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 98112 23344",
    gender: "Female",
    age: 34,
    bloodGroup: "O+",
    address: "B-12 Lake View Apartments, Baner, Pune",
    emergencyContact: "Girish Nair (+91 98112 23345)",
    allergies: ["None"],
    registeredAt: "2026-09-02"
  },
  {
    id: "pat-3",
    name: "Amit Shah",
    email: "amit.shah@example.com",
    phone: "+91 98223 34455",
    gender: "Male",
    age: 46,
    bloodGroup: "A+",
    address: "74 Hill Crest Residences, Kothrud, Pune",
    emergencyContact: "Neeta Shah (+91 98223 34456)",
    allergies: ["Sulfa drugs"],
    registeredAt: "2026-09-20"
  },
  {
    id: "pat-4",
    name: "Kavita Sen",
    email: "kavita.sen@example.com",
    phone: "+91 98334 45566",
    gender: "Female",
    age: 7,
    bloodGroup: "AB+",
    address: "15 Sunrise Meadows, Kalyani Nagar, Pune",
    emergencyContact: "Sangeeta Sen (Mother: +91 98334 45567)",
    allergies: ["None"],
    registeredAt: "2026-10-01"
  }
];

export const demoAccounts = [
  {
    id: "usr-patient",
    name: "Rohan Verma",
    email: "rohan@smartclinic.com",
    role: "patient",
    patientId: "pat-1",
    subtitle: "Registered Patient",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-doctor",
    name: "Dr. Rajesh Mehta",
    email: "dr.rajesh@smartclinic.com",
    role: "doctor",
    doctorId: "doc-1",
    subtitle: "Consultant Physician (General Medicine)",
    speciality: "General Medicine",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-receptionist",
    name: "Pooja Deshmukh",
    email: "receptionist@smartclinic.com",
    role: "receptionist",
    subtitle: "Front Desk & OPD Coordinator",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "usr-admin",
    name: "Dr. K. N. Banerjee",
    email: "admin@smartclinic.com",
    role: "admin",
    subtitle: "Chief Medical Officer & Administrator",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  }
];

const todayStr = new Date().toISOString().split("T")[0];

export const initialAppointments = [
  {
    id: "apt-101",
    tokenNumber: "T-101",
    patientId: "pat-2",
    patientName: "Meera Nair",
    doctorId: "doc-1",
    doctorName: "Dr. Rajesh Mehta",
    speciality: "General Medicine",
    date: todayStr,
    timeSlot: "09:30 AM",
    status: "Waiting", // Scheduled, Waiting, In Consultation, Completed, Cancelled
    type: "Regular OPD",
    symptoms: "Mild fever and persistent sore throat for 3 days",
    fee: 500,
    paid: true
  },
  {
    id: "apt-102",
    tokenNumber: "T-102",
    patientId: "pat-1",
    patientName: "Rohan Verma",
    doctorId: "doc-1",
    doctorName: "Dr. Rajesh Mehta",
    speciality: "General Medicine",
    date: todayStr,
    timeSlot: "10:00 AM",
    status: "In Consultation",
    type: "Follow-up",
    symptoms: "Persistent dry cough, nasal congestion",
    fee: 500,
    paid: true
  },
  {
    id: "apt-103",
    tokenNumber: "T-103",
    patientId: "pat-3",
    patientName: "Amit Shah",
    doctorId: "doc-1",
    doctorName: "Dr. Rajesh Mehta",
    speciality: "General Medicine",
    date: todayStr,
    timeSlot: "10:30 AM",
    status: "Scheduled",
    type: "Routine Check",
    symptoms: "Blood pressure review and regular lipid profile check",
    fee: 500,
    paid: true
  },
  {
    id: "apt-104",
    tokenNumber: "T-104",
    patientId: "pat-4",
    patientName: "Kavita Sen",
    doctorId: "doc-2",
    doctorName: "Dr. Priya Patel",
    speciality: "Pediatrics",
    date: todayStr,
    timeSlot: "11:00 AM",
    status: "Waiting",
    type: "Pediatric OPD",
    symptoms: "Seasonal allergic rhinitis and ear discomfort",
    fee: 600,
    paid: true
  },
  {
    id: "apt-100-past",
    tokenNumber: "T-089",
    patientId: "pat-1",
    patientName: "Rohan Verma",
    doctorId: "doc-1",
    doctorName: "Dr. Rajesh Mehta",
    speciality: "General Medicine",
    date: "2026-09-15",
    timeSlot: "11:00 AM",
    status: "Completed",
    type: "Initial Consult",
    symptoms: "Acute viral nasopharyngitis",
    fee: 500,
    paid: true
  }
];

export const initialConsultations = [
  {
    id: "con-100",
    appointmentId: "apt-100-past",
    patientId: "pat-1",
    patientName: "Rohan Verma",
    doctorId: "doc-1",
    doctorName: "Dr. Rajesh Mehta",
    speciality: "General Medicine",
    date: "2026-09-15",
    chiefComplaints: "Low-grade fever (99.8°F), runny nose, throat irritation, fatigue for 2 days.",
    vitals: {
      bloodPressure: "122/80 mmHg",
      pulseRate: "78 bpm",
      temperature: "99.8 °F",
      spO2: "99%"
    },
    diagnosis: "Acute Viral Upper Respiratory Infection",
    clinicalNotes: "Pharynx mildly hyperemic. Chest clear bilaterally, no crepitations or rhonchi. Heart sounds normal. Advised adequate hydration and warm saline gargles.",
    advice: "Drink plenty of warm fluids. Rest for 2 days. Avoid cold beverages and air conditioning.",
    followUpDate: "2026-09-22"
  }
];

export const initialPrescriptions = [
  {
    id: "rx-100",
    consultationId: "con-100",
    appointmentId: "apt-100-past",
    patientId: "pat-1",
    patientName: "Rohan Verma",
    patientAge: 28,
    patientGender: "Male",
    doctorId: "doc-1",
    doctorName: "Dr. Rajesh Mehta",
    doctorQualification: "MBBS, MD (Internal Medicine)",
    doctorSpeciality: "General Medicine",
    doctorRoom: "OPD Cabin 101",
    date: "2026-09-15",
    diagnosis: "Acute Viral Upper Respiratory Infection",
    medicines: [
      {
        id: "med-1",
        name: "Tab. Paracetamol (Dolo 650)",
        dosage: "650 mg",
        frequency: "1-0-1 (Morning & Night)",
        duration: "3 Days",
        instructions: "Take orally after meals when temperature > 99.5°F"
      },
      {
        id: "med-2",
        name: "Tab. Cetirizine (Cetzine 10)",
        dosage: "10 mg",
        frequency: "0-0-1 (Night only)",
        duration: "5 Days",
        instructions: "Take before bedtime. May cause mild drowsiness."
      },
      {
        id: "med-3",
        name: "Syp. Ascoril-D",
        dosage: "10 ml",
        frequency: "1-1-1 (Thrice daily)",
        duration: "5 Days",
        instructions: "Take with warm water after food for cough suppression."
      }
    ],
    generalAdvice: "Warm saline gargle twice daily. Steam inhalation at bedtime. Keep well hydrated with soups and warm water.",
    followUpDate: "2026-09-22",
    signed: true,
    issuedAt: "2026-09-15T11:25:00.000Z"
  }
];
