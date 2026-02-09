// MEDIBOOK - DOCTOR APPOINTMENT SYSTEM
// Refactored for medical-only appointments with 10 specializations

import dermatologyImg from './components/styles/image/dermo.jpg';
import allergyImg from './components/styles/image/allegric.jpg';
import endocrinologyImg from './components/styles/image/endo.jpg';
import familyImg from './components/styles/image/fam.jpg';
import pediatricsImg from './components/styles/image/pedia.jpg';
import podiatryImg from './components/styles/image/pod.jpg';
import sleepImg from './components/styles/image/sleeep.jpg';
import cardiologyImg from './components/styles/image/cardio.jpg';
import neurologyImg from './components/styles/image/neu.jpg';
import orthopedicImg from './components/styles/image/ortho.jpg';

/**
 * SPECIALIZATION DATA
 * 10 Medical Specializations with multiple doctors each
 */
export const mockSpecializations = [
  {
    id: 1,
    name: "Dermatologists",
    description: "Specialists who diagnose and treat conditions related to skin, hair, and nails, including acne, allergies, and infections.",
    icon: "",
    image: dermatologyImg
  },
  {
    id: 2,
    name: "Allergists / Immunologists",
    description: "Doctors who treat allergies, asthma, and immune system disorders to help patients manage allergic reactions and immune health.",
    icon: "",
    image: allergyImg
  },
  {
    id: 3,
    name: "Endocrinologists",
    description: "Experts in hormone-related conditions such as diabetes, thyroid disorders, and metabolic imbalances.",
    icon: "",
    image: endocrinologyImg
  },
  {
    id: 4,
    name: "Family Physicians",
    description: "Primary care doctors who provide comprehensive healthcare for individuals and families of all ages.",
    icon: "",
    image: familyImg
  },
  {
    id: 5,
    name: "Pediatricians",
    description: "Doctors specializing in the medical care, growth, and development of infants, children, and adolescents.",
    icon: "",
    image: pediatricsImg
  },
  {
    id: 6,
    name: "Podiatrists",
    description: "Specialists who diagnose and treat foot, ankle, and lower limb conditions, including injuries and chronic pain.",
    icon: "",
    image: podiatryImg
  },
  {
    id: 7,
    name: "Sleep Medicine Specialists",
    description: "Doctors who diagnose and treat sleep disorders such as insomnia, sleep apnea, and narcolepsy.",
    icon: "",
    image: sleepImg
  },
  {
    id: 8,
    name: "Cardiologists",
    description: "Specialists who diagnose and treat heart and blood vessel diseases, ensuring overall cardiovascular health.",
    icon: "",
    image: cardiologyImg
  },
  {
    id: 9,
    name: "Neurologists",
    description: "Doctors who treat disorders of the brain, spine, and nervous system, including migraines, epilepsy, and strokes.",
    icon: "",
    image: neurologyImg
  },
  {
    id: 10,
    name: "Orthopedic Specialists",
    description: "Experts in diagnosing and treating bone, joint, muscle, and ligament conditions, including fractures and arthritis.",
    icon: "",
    image: orthopedicImg
  }
];

/**
 * DOCTOR DATA
 * Multiple doctors per specialization
 * Structure: id, name, specialization_id, qualifications, experience, consultationFee, duration
 */
export const mockDoctors = [
  // Dermatologists
  {
    id: 1,
    name: "Dr. Anjali Verma",
    specializationId: 1,
    specialization: "Dermatologists",
    qualifications: "MD Dermatology, FAAD",
    experience: "12 years",
    consultationFee: 800,
    duration: 30,
    image: "",
    clinic: "Medibook Derma Clinic"
  },
  {
    id: 2,
    name: "Dr. Vikram Singh",
    specializationId: 1,
    specialization: "Dermatologists",
    qualifications: "MBBS, MD Dermatology",
    experience: "8 years",
    consultationFee: 600,
    duration: 30,
    image: "",
    clinic: "Medibook Derma Clinic"
  },

  // Allergists / Immunologists
  {
    id: 3,
    name: "Dr. Priya Kapoor",
    specializationId: 2,
    specialization: "Allergists / Immunologists",
    qualifications: "MD Internal Medicine, Allergy Specialist",
    experience: "10 years",
    consultationFee: 750,
    duration: 45,
    image: "",
    clinic: "Medibook Allergy Center"
  },
  {
    id: 4,
    name: "Dr. Rohit Sharma",
    specializationId: 2,
    specialization: "Allergists / Immunologists",
    qualifications: "MBBS, MD Immunology",
    experience: "6 years",
    consultationFee: 600,
    duration: 45,
    image: "",
    clinic: "Medibook Allergy Center"
  },

  // Endocrinologists
  {
    id: 5,
    name: "Dr. Neha Gupta",
    specializationId: 3,
    specialization: "Endocrinologists",
    qualifications: "MD Endocrinology, Diabetes Specialist",
    experience: "14 years",
    consultationFee: 1000,
    duration: 45,
    image: "",
    clinic: "Medibook Endocrine Center"
  },
  {
    id: 6,
    name: "Dr. Arjun Reddy",
    specializationId: 3,
    specialization: "Endocrinologists",
    qualifications: "MBBS, MD Endocrinology",
    experience: "9 years",
    consultationFee: 800,
    duration: 45,
    image: "",
    clinic: "Medibook Endocrine Center"
  },

  // Family Physicians
  {
    id: 7,
    name: "Dr. Meera Patel",
    specializationId: 4,
    specialization: "Family Physicians",
    qualifications: "MBBS, MD Family Medicine",
    experience: "11 years",
    consultationFee: 600,
    duration: 30,
    image: "",
    clinic: "Medibook Family Care"
  },
  {
    id: 8,
    name: "Dr. Suresh Kumar",
    specializationId: 4,
    specialization: "Family Physicians",
    qualifications: "MBBS, Preventive Medicine",
    experience: "15 years",
    consultationFee: 700,
    duration: 30,
    image: "",
    clinic: "Medibook Family Care"
  },

  // Pediatricians
  {
    id: 9,
    name: "Dr. Pooja Singh",
    specializationId: 5,
    specialization: "Pediatricians",
    qualifications: "MBBS, MD Pediatrics",
    experience: "9 years",
    consultationFee: 700,
    duration: 30,
    image: "",
    clinic: "Medibook Pediatric Clinic"
  },
  {
    id: 10,
    name: "Dr. Aditya Nair",
    specializationId: 5,
    specialization: "Pediatricians",
    qualifications: "MBBS, MD Pediatrics, Child Health Specialist",
    experience: "7 years",
    consultationFee: 650,
    duration: 30,
    image: "",
    clinic: "Medibook Pediatric Clinic"
  },

  // Podiatrists
  {
    id: 11,
    name: "Dr. Kavya Menon",
    specializationId: 6,
    specialization: "Podiatrists",
    qualifications: "DPM, Foot & Ankle Surgery",
    experience: "8 years",
    consultationFee: 600,
    duration: 30,
    image: "",
    clinic: "Medibook Podiatry Center"
  },
  {
    id: 12,
    name: "Dr. Rakesh Iyer",
    specializationId: 6,
    specialization: "Podiatrists",
    qualifications: "MBBS, Podiatry Specialist",
    experience: "6 years",
    consultationFee: 550,
    duration: 30,
    image: "",
    clinic: "Medibook Podiatry Center"
  },

  // Sleep Medicine Specialists
  {
    id: 13,
    name: "Dr. Divya Saxena",
    specializationId: 7,
    specialization: "Sleep Medicine Specialists",
    qualifications: "MD Sleep Medicine, Board Certified",
    experience: "10 years",
    consultationFee: 900,
    duration: 45,
    image: "",
    clinic: "Medibook Sleep Center"
  },
  {
    id: 14,
    name: "Dr. Manoj Rao",
    specializationId: 7,
    specialization: "Sleep Medicine Specialists",
    qualifications: "MBBS, MD Sleep Medicine",
    experience: "7 years",
    consultationFee: 750,
    duration: 45,
    image: "",
    clinic: "Medibook Sleep Center"
  },

  // Cardiologists
  {
    id: 15,
    name: "Dr. Priya Singh",
    specializationId: 8,
    specialization: "Cardiologists",
    qualifications: "MD Cardiology, DM Cardiac Surgery",
    experience: "16 years",
    consultationFee: 1200,
    duration: 45,
    image: "",
    clinic: "Medibook Cardiac Center"
  },
  {
    id: 16,
    name: "Dr. Rajesh Kumar",
    specializationId: 8,
    specialization: "Cardiologists",
    qualifications: "MBBS, MD Cardiology",
    experience: "11 years",
    consultationFee: 1000,
    duration: 45,
    image: "",
    clinic: "Medibook Cardiac Center"
  },

  // Neurologists
  {
    id: 17,
    name: "Dr. Seema Gupta",
    specializationId: 9,
    specialization: "Neurologists",
    qualifications: "MD Neurology, Neurosurgery Fellowship",
    experience: "13 years",
    consultationFee: 1000,
    duration: 45,
    image: "",
    clinic: "Medibook Neuro Center"
  },
  {
    id: 18,
    name: "Dr. Arun Mishra",
    specializationId: 9,
    specialization: "Neurologists",
    qualifications: "MBBS, MD Neurology",
    experience: "8 years",
    consultationFee: 800,
    duration: 45,
    image: "",
    clinic: "Medibook Neuro Center"
  },

  // Orthopedic Specialists
  {
    id: 19,
    name: "Dr. Anjali Chopra",
    specializationId: 10,
    specialization: "Orthopedic Specialists",
    qualifications: "MD Orthopedics, Sports Medicine Specialist",
    experience: "12 years",
    consultationFee: 900,
    duration: 30,
    image: "",
    clinic: "Medibook Orthopedic Center"
  },
  {
    id: 20,
    name: "Dr. Vikram Rao",
    specializationId: 10,
    specialization: "Orthopedic Specialists",
    qualifications: "MBBS, MD Orthopedic Surgery",
    experience: "9 years",
    consultationFee: 750,
    duration: 30,
    image: "",
    clinic: "Medibook Orthopedic Center"
  }
];

/**
 * APPOINTMENT TIME SLOTS
 * Medical appointment slots in 30-minute intervals
 * These slots are available for doctor consultations
 */
export const mockTimeSlots = [
  { id: 1, time: "09:00 AM", available: true },
  { id: 2, time: "09:30 AM", available: false }, // Already booked
  { id: 3, time: "10:00 AM", available: true },
  { id: 4, time: "10:30 AM", available: true },
  { id: 5, time: "11:00 AM", available: false },
  { id: 6, time: "02:00 PM", available: true },
  { id: 7, time: "02:30 PM", available: true },
  { id: 8, time: "03:00 PM", available: false },
  { id: 9, time: "03:30 PM", available: true },
  { id: 10, time: "04:00 PM", available: true },
];

/**
 * PATIENT APPOINTMENTS
 * Sample appointments booked by the user
 * Structure: id, doctorName, specialization, date, time, consultationFee, status
 */
export const mockAppointments = [
  {
    id: 1,
    doctorName: "Dr. Anjali Verma",
    specialization: "Dermatologists",
    clinic: "Medibook Derma Clinic",
    date: "2026-02-15",
    time: "10:00 AM",
    consultationFee: 800,
    status: "Confirmed",
    bookedAt: "2026-02-05",
    reason: "Acne Treatment Consultation"
  },
  {
    id: 2,
    doctorName: "Dr. Priya Kapoor",
    specialization: "Allergists / Immunologists",
    clinic: "Medibook Allergy Center",
    date: "2026-02-10",
    time: "02:00 PM",
    consultationFee: 750,
    status: "Confirmed",
    bookedAt: "2026-02-03",
    reason: "Allergy Testing and Assessment"
  }
];

/**
 * PATIENT PROFILE
 * Logged-in user information
 */
export const mockUser = {
  id: 1,
  name: "Raj Patel",
  email: "raj@example.com",
  phone: "9876543210",
  role: "user", // "user" or "admin"
  medicalHistory: "No significant allergies",
  preferredLanguage: "English"
};
