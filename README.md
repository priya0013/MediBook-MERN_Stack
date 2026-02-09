# Medibook – Medical Appointment Booking System

Medibook is a full-stack web application designed to simplify the process of booking medical appointments. The system allows patients to find doctors based on specialization and location, while providing administrators with tools to manage doctors, clinics, and appointments efficiently.

---

## Project Overview

The primary goal of Medibook is to create a centralized and secure platform for medical appointment scheduling. It reduces manual effort, improves accessibility to healthcare services, and enhances user experience for both patients and administrators.

---

## Features

- Secure user authentication and authorization
- Doctor selection based on medical specialization
- Online appointment booking and management
- Administrative control for doctor and clinic management
- Location-based clinic discovery using maps
- Scalable and maintainable system architecture

---

## Project Modules

### Authentication Module
- User registration and login
- JWT-based authentication and access control

### Patient Module
- Browse doctor specializations
- Select doctors and book appointments
- View appointment history
- Manage user profile details

### Admin Module
- Admin login
- Add and manage doctors
- Manage clinic information and availability

### Appointment Management Module
- Create, view, and cancel appointments
- Store and manage appointment data in MongoDB

### Location and Map Module
- Filter nearby clinics
- Display clinic locations using Google Maps

### Database Module
- Users collection
- Doctors collection
- Appointments collection

---

## System Architecture

- Frontend: React.js with React Router
- Backend: Node.js with Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens and bcrypt
- Maps Integration: Google Maps API

---

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- npm

### Backend Setup
```bash
cd backend
npm install
npm run dev
