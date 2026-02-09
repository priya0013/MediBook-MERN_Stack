import React, { useEffect, useMemo, useState } from 'react';
import { mockSpecializations } from '../../mockData';
import { apiRequest } from '../../api/client';
import '../styles/Admin.css';

function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    specializationId: '',
    qualifications: '',
    experience: '',
    consultationFee: '',
    duration: '',
    clinic: '',
    clinicAddress: '',
    clinicLat: '',
    clinicLng: '',
    image: '👨‍⚕️',
    available: true
  });

  const specializationMap = useMemo(() => {
    const map = new Map();
    mockSpecializations.forEach((spec) => map.set(String(spec.id), spec));
    return map;
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await apiRequest('/api/doctors');
      setDoctors(data);
    } catch (err) {
      setError(err.message || 'Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      'name',
      'specializationId',
      'qualifications',
      'experience',
      'consultationFee',
      'duration',
      'clinic',
      'clinicAddress',
      'clinicLat',
      'clinicLng'
    ];
    const missing = requiredFields.find((field) => !formData[field]);
    if (missing) {
      setFormError('Please fill all required fields.');
      return;
    }

    const spec = specializationMap.get(String(formData.specializationId));
    if (!spec) {
      setFormError('Please choose a valid specialization.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setFormError('Please log in as admin to add doctors.');
      return;
    }

    const payload = {
      ...formData,
      specializationId: Number(formData.specializationId),
      consultationFee: Number(formData.consultationFee),
      duration: Number(formData.duration),
      clinicLat: Number(formData.clinicLat),
      clinicLng: Number(formData.clinicLng),
      specialization: spec.name
    };

    try {
      setSaving(true);
      const doctor = await apiRequest('/api/doctors', {
        method: 'POST',
        body: payload,
        token
      });
      setDoctors((prev) => [doctor, ...prev]);
      setFormData({
        name: '',
        specializationId: '',
        qualifications: '',
        experience: '',
        consultationFee: '',
        duration: '',
        clinic: '',
        clinicAddress: '',
        clinicLat: '',
        clinicLng: '',
        image: '👨‍⚕️',
        available: true
      });
    } catch (err) {
      setFormError(err.message || 'Failed to add doctor');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (doctorId) => {
    if (!window.confirm('Delete this doctor?')) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in as admin to delete doctors.');
      return;
    }

    try {
      await apiRequest(`/api/doctors/${doctorId}`, {
        method: 'DELETE',
        token
      });
      setDoctors((prev) => prev.filter((doctor) => doctor._id !== doctorId));
    } catch (err) {
      setError(err.message || 'Failed to delete doctor');
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <div className="admin-section">
        <h2>Add Doctor</h2>
        {formError && <p className="error-text">⚠️ {formError}</p>}
        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="name">Doctor Name *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. John Doe"
            />
          </div>

          <div className="form-row">
            <label htmlFor="specializationId">Specialization *</label>
            <select
              id="specializationId"
              name="specializationId"
              value={formData.specializationId}
              onChange={handleChange}
            >
              <option value="">Select specialization</option>
              {mockSpecializations.map((spec) => (
                <option key={spec.id} value={spec.id}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <label htmlFor="qualifications">Qualifications *</label>
            <input
              id="qualifications"
              name="qualifications"
              type="text"
              value={formData.qualifications}
              onChange={handleChange}
              placeholder="MD, MBBS"
            />
          </div>

          <div className="form-row">
            <label htmlFor="experience">Experience *</label>
            <input
              id="experience"
              name="experience"
              type="text"
              value={formData.experience}
              onChange={handleChange}
              placeholder="10 years"
            />
          </div>

          <div className="form-row">
            <label htmlFor="consultationFee">Consultation Fee *</label>
            <input
              id="consultationFee"
              name="consultationFee"
              type="number"
              value={formData.consultationFee}
              onChange={handleChange}
              placeholder="800"
              min="0"
            />
          </div>

          <div className="form-row">
            <label htmlFor="duration">Duration (mins) *</label>
            <input
              id="duration"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              placeholder="30"
              min="5"
            />
          </div>

          <div className="form-row">
            <label htmlFor="clinic">Clinic *</label>
            <input
              id="clinic"
              name="clinic"
              type="text"
              value={formData.clinic}
              onChange={handleChange}
              placeholder="Medibook Clinic"
            />
          </div>

          <div className="form-row">
            <label htmlFor="clinicAddress">Clinic Address *</label>
            <input
              id="clinicAddress"
              name="clinicAddress"
              type="text"
              value={formData.clinicAddress}
              onChange={handleChange}
              placeholder="123 Main St, City"
            />
          </div>

          <div className="form-row">
            <label htmlFor="clinicLat">Clinic Latitude *</label>
            <input
              id="clinicLat"
              name="clinicLat"
              type="number"
              value={formData.clinicLat}
              onChange={handleChange}
              placeholder="12.9716"
              step="0.000001"
            />
          </div>

          <div className="form-row">
            <label htmlFor="clinicLng">Clinic Longitude *</label>
            <input
              id="clinicLng"
              name="clinicLng"
              type="number"
              value={formData.clinicLng}
              onChange={handleChange}
              placeholder="77.5946"
              step="0.000001"
            />
          </div>

          <div className="form-row">
            <label htmlFor="image">Icon</label>
            <input
              id="image"
              name="image"
              type="text"
              value={formData.image}
              onChange={handleChange}
              placeholder="👨‍⚕️"
            />
          </div>

          <div className="form-row checkbox-row">
            <label htmlFor="available">Available</label>
            <input
              id="available"
              name="available"
              type="checkbox"
              checked={formData.available}
              onChange={handleChange}
            />
          </div>

          <button className="admin-primary" type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Add Doctor'}
          </button>
        </form>
      </div>

      <div className="admin-section">
        <h2>Doctors</h2>
        {loading && <p>Loading doctors...</p>}
        {error && <p className="error-text">⚠️ {error}</p>}
        {!loading && !error && doctors.length === 0 && (
          <p>No doctors added yet.</p>
        )}
        {!loading && !error && doctors.length > 0 && (
          <div className="doctor-list">
            {doctors.map((doctor) => (
              <div key={doctor._id} className="doctor-item">
                <div>
                  <div className="doctor-name">{doctor.image} {doctor.name}</div>
                  <div className="doctor-meta">
                    {doctor.specialization} • {doctor.experience} • ₹{doctor.consultationFee}
                  </div>
                  <div className="doctor-meta">{doctor.qualifications} • {doctor.clinic}</div>
                  <div className="doctor-meta">{doctor.clinicAddress}</div>
                </div>
                <button className="admin-danger" onClick={() => handleDelete(doctor._id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
