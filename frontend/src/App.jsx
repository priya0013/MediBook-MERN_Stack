import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// User Components
import Dashboard from './components/User/Dashboard';
import BookingForm from './components/User/BookingForm';
import MyAppointments from './components/User/MyAppointments';
import Profile from './components/User/Profile';

// Admin Components
import AdminDashboard from './components/Admin/AdminDashboard';

// Pages
import Home from './pages/Home';

import './App.css';



function App() {

  const ProtectedRoute = ({ children, requiredRole = null }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    // If no token, redirect to login
    if (!token) {
      return <Navigate to="/login" />;
    }

    // If role required doesn't match, redirect
    if (requiredRole && role !== requiredRole) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <Router>
      <div className="app">
        {/* Navbar visible on all pages */}
        <Navbar />

        {/* Main Content */}
        <main className="app-main">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected User Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredRole="user">
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <ProtectedRoute requiredRole="user">
                  <BookingForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-appointments"
              element={
                <ProtectedRoute requiredRole="user">
                  <MyAppointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute requiredRole="user">
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* 404 - Not Found */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Footer visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
