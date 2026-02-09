import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mockTimeSlots, mockSpecializations } from '../../mockData';
import { apiRequest } from '../../api/client';
import '../styles/BookingForm.css';



function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get selected doctor from Dashboard
  const selectedDoctor = location.state?.selectedDoctor;

  // State for form steps (1: Date/Time, 2: Medical Reason, 3: Payment, 4: Confirm)
  const [currentStep, setCurrentStep] = useState(1);

  // State for booking details
  const [bookingData, setBookingData] = useState({
    doctorId: selectedDoctor?._id || selectedDoctor?.id || null,
    date: '',
    time: '',
    medicalReason: '',
    notes: '',
    paymentMethod: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    upiId: ''
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Submission state
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If no doctor selected, show message
  if (!selectedDoctor) {
    return (
      <div className="booking-container">
        <div className="no-selection">
          <h2>No Doctor Selected</h2>
          <p>Please select a doctor from the specialization list before booking.</p>
          <button className="back-btn" onClick={() => navigate('/dashboard')}>
            ← Go Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    
    // Validation: date must be today or in future
    const today = new Date().toISOString().split('T')[0];
    if (selectedDate < today) {
      setErrors({ ...errors, date: 'Cannot book appointment in the past' });
      return;
    }

    setBookingData({ ...bookingData, date: selectedDate });
    setErrors({ ...errors, date: '' });
  };

  /**
   * Handle time slot selection
   */
  const handleTimeSelect = (time) => {
    setBookingData({ ...bookingData, time });
    setErrors({ ...errors, time: '' });
  };

  /**
   * Handle medical reason input
   */
  const handleMedicalReasonChange = (e) => {
    const reason = e.target.value;
    setBookingData({ ...bookingData, medicalReason: reason });
    
    if (reason.trim().length < 10) {
      setErrors({ ...errors, medicalReason: 'Please provide at least 10 characters' });
    } else {
      setErrors({ ...errors, medicalReason: '' });
    }
  };

  const handlePaymentMethodChange = (e) => {
    const method = e.target.value;
    setBookingData({ ...bookingData, paymentMethod: method });
    setErrors({ ...errors, paymentMethod: '' });
  };

  const handlePaymentFieldChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  /**
   * Validate current step before moving to next
   */
  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!bookingData.date) {
        newErrors.date = 'Please select a date';
      }
      if (!bookingData.time) {
        newErrors.time = 'Please select a time slot';
      }
    }

    if (currentStep === 2) {
      if (bookingData.medicalReason.trim().length < 10) {
        newErrors.medicalReason = 'Please provide a medical reason (at least 10 characters)';
      }
    }

    if (currentStep >= 3) {
      if (!bookingData.paymentMethod) {
        newErrors.paymentMethod = 'Please select a payment method';
      }

      if (bookingData.paymentMethod === 'card') {
        if (!bookingData.cardName.trim()) {
          newErrors.cardName = 'Cardholder name is required';
        }
        if (!/^[0-9]{16}$/.test(bookingData.cardNumber.replace(/\s/g, ''))) {
          newErrors.cardNumber = 'Card number must be 16 digits';
        }
        if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(bookingData.cardExpiry)) {
          newErrors.cardExpiry = 'Expiry must be MM/YY';
        }
        if (!/^[0-9]{3,4}$/.test(bookingData.cardCvv)) {
          newErrors.cardCvv = 'CVV must be 3 or 4 digits';
        }
      }

      if (bookingData.paymentMethod === 'upi') {
        if (!bookingData.upiId.trim()) {
          newErrors.upiId = 'UPI ID is required';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Move to next step
   */
  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Submit booking - Create medical appointment
   * Medical appointment includes: doctor, specialization, date, time, medical reason
   */
  const handleSubmitBooking = async () => {
    if (!validateStep()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setSubmitError('You must be logged in to book an appointment.');
      return;
    }

    // Get specialization for this doctor
    const specialization = mockSpecializations.find(
      s => s.id === selectedDoctor.specializationId
    );

    // Create medical appointment
    const newAppointment = {
      doctorName: selectedDoctor.name,
      specialization: specialization?.name || 'Unknown Specialization',
      clinic: selectedDoctor.clinic,
      date: bookingData.date,
      time: bookingData.time,
      consultationFee: selectedDoctor.consultationFee,
      reason: bookingData.medicalReason
    };

    try {
      setSubmitting(true);
      setSubmitError('');
      await apiRequest('/api/appointments', {
        method: 'POST',
        body: {
          doctorId: selectedDoctor._id || selectedDoctor.id,
          ...newAppointment
        },
        token
      });

      alert('Medical appointment booked successfully!');
      navigate('/my-appointments');
    } catch (err) {
      setSubmitError(err.message || 'Failed to book appointment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <h1>Book Doctor Appointment with {selectedDoctor.name}</h1>

      {/* Doctor Summary */}
      <div className="doctor-summary">
        <h3>{selectedDoctor.name}</h3>
        <p className="specialization">{mockSpecializations.find(s => s.id === selectedDoctor.specializationId)?.name}</p>
        <p className="qualifications">{selectedDoctor.qualifications}</p>
        <p className="clinic">{selectedDoctor.clinic}</p>
        <p className="fee">₹{selectedDoctor.consultationFee} • {selectedDoctor.duration} mins</p>
      </div>

      {/* Progress Indicator */}
      <div className="progress-bar">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1. Date & Time</div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2. Reason</div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3. Payment</div>
        <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>4. Confirm</div>
      </div>

      {/* Step 1: Date & Time Selection */}
      {currentStep === 1 && (
        <div className="form-step">
          <h2>Select Date & Time</h2>
          
          <div className="form-group">
            <label htmlFor="date">Appointment Date *</label>
            <input
              id="date"
              type="date"
              value={bookingData.date}
              onChange={handleDateChange}
              min={new Date().toISOString().split('T')[0]}
              className="date-input"
            />
            {errors.date && <p className="error-text">{errors.date}</p>}
          </div>
          
          <div className="form-group">
            <label>Available Time Slots *</label>
            <div className="time-slots">
              {mockTimeSlots.map((slot) => (
                <button
                  key={slot.id}
                  className={`time-slot ${
                    slot.available ? 'available' : 'unavailable'
                  } ${bookingData.time === slot.time ? 'selected' : ''}`}
                  onClick={() => slot.available && handleTimeSelect(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.time}
                  {!slot.available && ' (Booked)'}
                </button>
              ))}
            </div>
            {errors.time && <p className="error-text">{errors.time}</p>}
          </div>
        </div>
      )}

      {/* Step 2: Medical Reason */}
      {currentStep === 2 && (
        <div className="form-step">
          <h2>Tell Us Your Medical Reason</h2>
          <p className="step-description">
            This helps {selectedDoctor.name} prepare for your consultation.
          </p>
          
          <div className="form-group">
            <label htmlFor="reason">Reason for Visit *</label>
            <textarea
              id="reason"
              placeholder="Describe your symptoms, concerns, or reason for visiting..."
              value={bookingData.medicalReason}
              onChange={handleMedicalReasonChange}
              minLength={10}
              maxLength={500}
              rows={5}
              className="reason-textarea"
            />
            <small className="char-count">
              {bookingData.medicalReason.length}/500 characters
            </small>
            {errors.medicalReason && <p className="error-text">{errors.medicalReason}</p>}
          </div>
        </div>
      )}

      {/* Step 3: Payment Method */}
      {currentStep === 3 && (
        <div className="form-step">
          <h2>Choose Payment Method</h2>

          <div className="payment-methods">
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={bookingData.paymentMethod === 'card'}
                onChange={handlePaymentMethodChange}
              />
              Card (Credit/Debit)
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="upi"
                checked={bookingData.paymentMethod === 'upi'}
                onChange={handlePaymentMethodChange}
              />
              UPI
            </label>
            <label className="payment-option">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={bookingData.paymentMethod === 'cash'}
                onChange={handlePaymentMethodChange}
              />
              Cash at Clinic
            </label>
          </div>
          {errors.paymentMethod && <p className="error-text">{errors.paymentMethod}</p>}

          {bookingData.paymentMethod === 'card' && (
            <div className="payment-fields">
              <div className="form-group">
                <label htmlFor="cardName">Cardholder Name *</label>
                <input
                  id="cardName"
                  name="cardName"
                  type="text"
                  value={bookingData.cardName}
                  onChange={handlePaymentFieldChange}
                  placeholder="Name on card"
                />
                {errors.cardName && <p className="error-text">{errors.cardName}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number *</label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  value={bookingData.cardNumber}
                  onChange={handlePaymentFieldChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
              </div>
              <div className="payment-inline">
                <div className="form-group">
                  <label htmlFor="cardExpiry">Expiry (MM/YY) *</label>
                  <input
                    id="cardExpiry"
                    name="cardExpiry"
                    type="text"
                    value={bookingData.cardExpiry}
                    onChange={handlePaymentFieldChange}
                    placeholder="MM/YY"
                    maxLength={5}
                  />
                  {errors.cardExpiry && <p className="error-text">{errors.cardExpiry}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="cardCvv">CVV *</label>
                  <input
                    id="cardCvv"
                    name="cardCvv"
                    type="password"
                    value={bookingData.cardCvv}
                    onChange={handlePaymentFieldChange}
                    placeholder="123"
                    maxLength={4}
                  />
                  {errors.cardCvv && <p className="error-text">{errors.cardCvv}</p>}
                </div>
              </div>
            </div>
          )}

          {bookingData.paymentMethod === 'upi' && (
            <div className="payment-fields">
              <div className="form-group">
                <label htmlFor="upiId">UPI ID *</label>
                <input
                  id="upiId"
                  name="upiId"
                  type="text"
                  value={bookingData.upiId}
                  onChange={handlePaymentFieldChange}
                  placeholder="name@bank"
                />
                {errors.upiId && <p className="error-text">{errors.upiId}</p>}
              </div>
            </div>
          )}

          {bookingData.paymentMethod === 'cash' && (
            <p className="step-description">You will pay at the clinic after the visit.</p>
          )}
        </div>
      )}

      {/* Step 4: Confirmation */}
      {currentStep === 4 && (
        <div className="form-step">
          <h2>Confirm Your Medical Appointment</h2>
          
          <div className="confirmation-details">
            <div className="section">
              <h4>Doctor Information</h4>
              <div className="detail-row">
                <span className="label">Doctor:</span>
                <span className="value">{selectedDoctor.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Specialization:</span>
                <span className="value">{mockSpecializations.find(s => s.id === selectedDoctor.specializationId)?.name}</span>
              </div>
              <div className="detail-row">
                <span className="label">Qualifications:</span>
                <span className="value">{selectedDoctor.qualifications}</span>
              </div>
              <div className="detail-row">
                <span className="label">Clinic:</span>
                <span className="value">{selectedDoctor.clinic}</span>
              </div>
            </div>
            
            <div className="section">
              <h4>Appointment Details</h4>
              <div className="detail-row">
                <span className="label">Date:</span>
                <span className="value">{bookingData.date}</span>
              </div>
              <div className="detail-row">
                <span className="label">Time:</span>
                <span className="value">{bookingData.time}</span>
              </div>
              <div className="detail-row">
                <span className="label">Duration:</span>
                <span className="value">{selectedDoctor.duration} minutes</span>
              </div>
            </div>
            
            <div className="section">
              <h4>Consultation Fee</h4>
              <div className="detail-row total">
                <span className="label">Amount:</span>
                <span className="value">₹{selectedDoctor.consultationFee}</span>
              </div>
            </div>

            <div className="section">
              <h4>Payment Method</h4>
              <div className="detail-row">
                <span className="label">Method:</span>
                <span className="value">
                  {bookingData.paymentMethod === 'card' && 'Card'}
                  {bookingData.paymentMethod === 'upi' && 'UPI'}
                  {bookingData.paymentMethod === 'cash' && 'Cash at Clinic'}
                </span>
              </div>
              {bookingData.paymentMethod === 'card' && (
                <div className="detail-row">
                  <span className="label">Card:</span>
                  <span className="value">
                    {bookingData.cardName} • **** {(bookingData.cardNumber || '').slice(-4)}
                  </span>
                </div>
              )}
              {bookingData.paymentMethod === 'upi' && (
                <div className="detail-row">
                  <span className="label">UPI ID:</span>
                  <span className="value">{bookingData.upiId}</span>
                </div>
              )}
            </div>
            
            <div className="section">
              <h4>Your Medical Reason</h4>
              <div className="reason-display">
                {bookingData.medicalReason}
              </div>
            </div>
          </div>
          
          <p className="confirmation-note">
            ✓ You will receive a confirmation email with appointment details.
          </p>
          {submitError && <p className="error-text">{submitError}</p>}
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="button-group">
        {currentStep > 1 && (
          <button 
            className="btn-secondary"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            ← Back
          </button>
        )}

        {currentStep < 3 && (
          <button 
            className="btn-primary"
            onClick={handleNextStep}
          >
            Next →
          </button>
        )}

        {currentStep < 4 && currentStep >= 3 && (
          <button 
            className="btn-primary"
            onClick={handleNextStep}
          >
            Next →
          </button>
        )}

        {currentStep === 4 && (
          <button 
            className="btn-success"
            onClick={handleSubmitBooking}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : '✓ Confirm Booking'}
          </button>
        )}

        <button 
          className="btn-cancel"
          onClick={() => navigate('/dashboard')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default BookingForm;
