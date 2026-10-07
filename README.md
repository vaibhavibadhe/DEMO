# Smart Clinic System

A modern, minimalistic, and professional healthcare clinic management platform prototype designed for diploma-level project demonstration and presentation.

---

## 🌟 Key Highlights & Project Features

1. **Role-Based Access Control (RBAC)**:
   - Dedicated dashboards & workspaces for **4 distinct roles**:
     - **Patient** (`/patient`)
     - **Doctor** (`/doctor`)
     - **Receptionist** (`/receptionist`)
     - **Admin** (`/admin`)
   - 1-Click interactive **Demo Switcher Bar** for seamless transitions during viva and project demonstrations.

2. **Complete Patient Journey**:
   - **OPD Booking Flow**: Select Speciality → View Doctor Qualifications & Experience → Select OPD Timing & Slot → Confirm Appointment & Receive Token.
   - **Specialities Showcase**: Multi-speciality browsing (General Medicine, Pediatrics, Orthopedics, Dermatology, Gynecology, ENT).
   - **My Appointments**: Live token tracking, appointment statuses (`Waiting`, `In Consultation`, `Completed`, `Cancelled`), and cancellation.
   - **Medical Records**: Longitudinal consultation notes, recorded vitals (BP, Pulse, Temp, SpO2), and clinical diagnoses (read-only for patients).
   - **Structured Digital Prescriptions**: Formatted electronic prescription sheet with medical letterhead, drug dosages, frequencies, and a **Print / Save PDF** view. *No AI image generators used.*

3. **AI Urgency Analysis & Symptom Triage**:
   - Analyzes symptoms, duration, and severity score (1–10).
   - Classifies urgency level into `LOW URGENCY`, `MODERATE URGENCY`, or `HIGH URGENCY`.
   - Recommends the appropriate clinical department with a 1-click **"Book in [Speciality]"** shortcut.
   - **Strict Clinical Safeguards**: Prominent disclaimers stating the tool is non-diagnostic/decision-support only, with immediate emergency guidance for critical red-flag symptoms.

4. **Doctor OPD Cabin Experience**:
   - Live waiting queue and in-cabin patient indicators.
   - Clinical consultation interface with vitals entry, chief complaints, clinical notes, diagnosis, and advice.
   - **Structured Prescription Builder**: Add/remove drug rows with quick-fill suggestions for common medications.
   - **Review & Finalize**: Digitally seals prescription and instantly synchronizes it with the patient's portal.

5. **Receptionist Frontdesk & Token Caller**:
   - Live **Token Calling Announcement Screen** (`Now Calling Token #T-102`).
   - Walk-in patient registration form with demographic data validation.
   - Receptionist-scoped patient directory (demographics only, protecting clinical confidentiality).
   - Doctor availability tracker and fast appointment scheduling.

6. **Admin Dashboard & Analytics**:
   - Clinic KPIs, occupancy rate, and active clinician counts.
   - **Doctor Faculty Management**: Add/edit doctors, qualifications, room numbers, consultation fees, and toggle active status.
   - **Staff Management**: Receptionist accounts and authorization levels.
   - **Speciality Management**: Add and manage clinical departments.
   - **Interactive Visual Reports**: Patients per day bar visual, department distribution, and doctor workload efficiency metrics.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**:
  - React 19 + Vite
  - Tailwind CSS v4 (Clean, minimalistic medical color palette)
  - React Router DOM v7
  - Lucide React Icons
- **Backend**:
  - Node.js + Express REST API
  - MongoDB / Mongoose with persistent in-memory data store fallback
  - CORS, JSON body parser
- **Architecture**:
  - `client/`: Component-based React UI, Context-driven state management, services abstraction (`aiService.js`, `api.js`).
  - `server/`: RESTful routes, controllers, Mongoose schemas, and rich medical seed data.

---

## 👥 Demo Accounts (1-Click Login Available)

| Role | Demo User | Email | Password |
|---|---|---|---|
| **Patient** | Rohan Verma | `rohan@smartclinic.com` | `demo123` |
| **Doctor** | Dr. Rajesh Mehta | `dr.rajesh@smartclinic.com` | `demo123` |
| **Doctor** | Dr. Priya Patel | `dr.priya@smartclinic.com` | `demo123` |
| **Receptionist**| Pooja Deshmukh | `receptionist@smartclinic.com`| `demo123` |
| **Admin** | Dr. K. N. Banerjee | `admin@smartclinic.com` | `demo123` |

*Tip: You can use the Quick Demo Switcher bar pinned at the top of the screen to switch between any role instantly during your presentation.*

---

## 🚀 Running the Project

### 1. Start the Backend API (Port 5000)
```bash
cd server
npm start
```

### 2. Start the Frontend Client (Port 5173)
```bash
cd client
npm run dev
```

Visit **http://localhost:5173** in your browser.
The backend API is accessible at **http://localhost:5000/api**.
