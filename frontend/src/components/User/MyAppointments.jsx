import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from '../../api/client';
import '../styles/MyAppointments.css';



function MyAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAppointments = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view appointments.');
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest('/api/appointments', { token });
        setAppointments(data);
      } catch (err) {
        setError(err.message || 'Failed to load appointments');
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, []);

  /**
   * Handle appointment cancellation
   */
  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this medical appointment?')) {
      const token = localStorage.getItem('token');
      try {
        await apiRequest(`/api/appointments/${appointmentId}`, {
          method: 'DELETE',
          token
        });

        setAppointments((prev) =>
          prev.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status: 'Cancelled' }
              : appointment
          )
        );

        alert(' Medical appointment cancelled successfully');
      } catch (err) {
        alert(err.message || 'Failed to cancel appointment');
      }
    }
  };

  /**
   * Handle appointment rescheduling
   * Navigate back to dashboard to select new doctor/date/time
   */
  const handleReschedule = (appointment) => {
    navigate('/dashboard', { 
      state: { rescheduleId: appointment.id }
    });
  };

  // Status badge styling
  const getStatusClass = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'status-confirmed';
      case 'Cancelled':
        return 'status-cancelled';
      case 'Completed':
        return 'status-completed';
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="appointments-container">
      <h1>My Medical Appointments</h1>

      {loading && <p>Loading appointments...</p>}
      {error && <p className="error-text"> {error}</p>}

      {/* Empty State */}
      {!loading && !error && appointments.length === 0 && (
        <div className="empty-state">
          <p>📭 No appointments booked yet</p>
          <button 
            className="book-btn"
            onClick={() => navigate('/dashboard')}
          >
            Book Your First Doctor Appointment
          </button>
        </div>
      )}

      {!loading && !error && appointments.length > 0 && (
        <div className="appointments-list">
          {/* Upcoming Medical Appointments */}
          <h2>Upcoming Appointments</h2>
          <div className="appointments-grid">
            {appointments
              .filter(apt => new Date(apt.date) >= new Date() && apt.status !== 'Cancelled')
              .map((appointment) => (
                <div key={appointment._id} className="appointment-card medical">
                  {/* Appointment Header */}
                  <div className="appointment-header">
                    <h3>{appointment.doctorName}</h3>
                    <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>

                  {/* Medical Information */}
                  <div className="appointment-details">
                    <p><strong>Doctor:</strong> {appointment.doctorName}</p>
                    <p><strong> Specialization:</strong> {appointment.specialization}</p>
                    <p><strong> Clinic:</strong> {appointment.clinic}</p>
                    <p><strong> Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                    <p><strong> Time:</strong> {appointment.time}</p>
                    <p><strong> Consultation Fee:</strong> ₹{appointment.consultationFee}</p>
                    <div className="reason-box">
                      <p><strong> Reason for Visit:</strong></p>
                      <p className="reason-text">{appointment.reason}</p>
                    </div>
                    <p><strong> Booked on:</strong> {appointment.bookedAt}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="appointment-actions">
                    <button 
                      className="btn-reschedule"
                      onClick={() => handleReschedule(appointment)}
                    >
                       Reschedule
                    </button>
                    <button 
                      className="btn-cancel"
                      onClick={() => handleCancel(appointment._id)}
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Past Appointments */}
          {appointments.some(apt => new Date(apt.date) < new Date()) && (
            <>
              <h2>Completed Appointments</h2>
              <div className="appointments-grid">
                {appointments
                  .filter(apt => new Date(apt.date) < new Date())
                  .map((appointment) => (
                    <div key={appointment._id} className="appointment-card medical past">
                      <div className="appointment-header">
                        <h3>{appointment.doctorName}</h3>
                        <span className="status-badge status-completed">Completed</span>
                      </div>

                      <div className="appointment-details">
                        <p><strong> Doctor:</strong> {appointment.doctorName}</p>
                        <p><strong> Specialization:</strong> {appointment.specialization}</p>
                        <p><strong> Clinic:</strong> {appointment.clinic}</p>
                        <p><strong> Date:</strong> {new Date(appointment.date).toLocaleDateString()}</p>
                        <p><strong> Time:</strong> {appointment.time}</p>
                        <p><strong> Consultation Fee:</strong> ₹{appointment.consultationFee}</p>
                        <div className="reason-box">
                          <p><strong> Reason for Visit:</strong></p>
                          <p className="reason-text">{appointment.reason}</p>
                        </div>
                      </div>

                      <div className="appointment-actions">
                        <button className="btn-rebook">
                           Book Again
                        </button>
                        <button className="btn-download">
                           Download Receipt
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Back Button */}
      <button 
        className="back-btn"
        onClick={() => navigate('/dashboard')}
      >
        ← Back to Dashboard
      </button>
    </div>
  );
}

export default MyAppointments;
