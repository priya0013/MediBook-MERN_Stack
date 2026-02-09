import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../api/client';
import '../styles/Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your profile.');
        setLoading(false);
        return;
      }

      try {
        const data = await apiRequest('/api/auth/me', { token });
        setProfile(data.user);
      } catch (err) {
        const fallback = {
          name: localStorage.getItem('userName'),
          email: localStorage.getItem('userEmail'),
          role: localStorage.getItem('role')
        };
        if (fallback.name || fallback.email) {
          setProfile(fallback);
        } else {
          setError(err.message || 'Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <div className="profile-container">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-container error"> {error}</div>;
  }

  return (
    <div className="profile-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <div className="profile-row">
          <span className="label">Name</span>
          <span className="value">{profile?.name || '—'}</span>
        </div>
        <div className="profile-row">
          <span className="label">Email</span>
          <span className="value">{profile?.email || '—'}</span>
        </div>
        <div className="profile-row">
          <span className="label">Phone</span>
          <span className="value">{profile?.phone || '—'}</span>
        </div>
        <div className="profile-row">
          <span className="label">Role</span>
          <span className="value">{profile?.role || 'user'}</span>
        </div>
      </div>
    </div>
  );
}

export default Profile;
