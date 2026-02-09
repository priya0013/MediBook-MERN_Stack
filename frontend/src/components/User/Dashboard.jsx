import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockSpecializations, mockUser } from '../../mockData';
import { apiRequest } from '../../api/client';
import '../styles/Dashboard.css';


function Dashboard() {
  const navigate = useNavigate();
  
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  
  const [searchTerm, setSearchTerm] = useState('');

  const [doctors, setDoctors] = useState([]);
  const [doctorsError, setDoctorsError] = useState('');
  const [appointmentsCount, setAppointmentsCount] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [maxDistanceKm, setMaxDistanceKm] = useState('');
  const [nearbyOnly, setNearbyOnly] = useState(false);
  const [mapOnly, setMapOnly] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [mapError, setMapError] = useState('');

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const mapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const displayName = localStorage.getItem('userName') || mockUser.name || 'User';

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await apiRequest('/api/doctors');
        setDoctors(data);
      } catch (err) {
        setDoctorsError(err.message || 'Failed to load doctors');
      }
    };

    const loadAppointmentCount = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const data = await apiRequest('/api/appointments', { token });
        setAppointmentsCount(data.length);
      } catch (err) {
        setAppointmentsCount(0);
      }
    };

    loadDoctors();
    loadAppointmentCount();
  }, []);

  useEffect(() => {
    if (!mapsApiKey) {
      setMapError('Google Maps API key is missing.');
      return;
    }

    if (window.google?.maps) {
      setMapReady(true);
      return;
    }

    const existingScript = document.querySelector('script[data-google-maps]');
    if (existingScript) {
      existingScript.addEventListener('load', () => setMapReady(true));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}`;
    script.async = true;
    script.defer = true;
    script.dataset.googleMaps = 'true';
    script.onload = () => setMapReady(true);
    script.onerror = () => setMapError('Failed to load Google Maps.');
    document.body.appendChild(script);
  }, [mapsApiKey]);


  const filteredDoctors = useMemo(() => {
    if (!selectedSpecialization) return [];

    const toRadians = (value) => (value * Math.PI) / 180;
    const distanceKm = (lat1, lng1, lat2, lng2) => {
      const earthRadiusKm = 6371;
      const dLat = toRadians(lat2 - lat1);
      const dLng = toRadians(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return earthRadiusKm * c;
    };

    let list = doctors
      .filter(doctor => doctor.specializationId === selectedSpecialization.id)
      .filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.qualifications.toLowerCase().includes(searchTerm.toLowerCase())
      );

    if (userLocation) {
      list = list
        .map((doctor) => {
          if (Number.isFinite(doctor.clinicLat) && Number.isFinite(doctor.clinicLng)) {
            const distance = distanceKm(
              userLocation.lat,
              userLocation.lng,
              doctor.clinicLat,
              doctor.clinicLng
            );
            return { ...doctor, distanceKm: distance };
          }
          return { ...doctor, distanceKm: null };
        })
        .sort((a, b) => {
          if (a.distanceKm === null && b.distanceKm === null) return 0;
          if (a.distanceKm === null) return 1;
          if (b.distanceKm === null) return -1;
          return a.distanceKm - b.distanceKm;
        });

      if (nearbyOnly) {
        list = list.filter((doctor) => doctor.distanceKm !== null);
      }

      const maxValue = Number(maxDistanceKm);
      if (Number.isFinite(maxValue) && maxValue > 0) {
        list = list.filter((doctor) => doctor.distanceKm !== null && doctor.distanceKm <= maxValue);
      }
    } else if (nearbyOnly) {
      list = [];
    }

    return list;
  }, [selectedSpecialization, searchTerm, doctors, userLocation, maxDistanceKm, nearbyOnly]);

  useEffect(() => {
    if (!mapReady || !mapRef.current) return;

    const mapDoctors = filteredDoctors.filter((doctor) =>
      Number.isFinite(doctor.clinicLat) && Number.isFinite(doctor.clinicLng)
    );

    if (mapDoctors.length === 0) return;

    const center = userLocation
      ? { lat: userLocation.lat, lng: userLocation.lng }
      : { lat: mapDoctors[0].clinicLat, lng: mapDoctors[0].clinicLng };

    if (!mapInstanceRef.current) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: userLocation ? 12 : 11
      });
    } else {
      mapInstanceRef.current.setCenter(center);
    }

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    mapDoctors.forEach((doctor) => {
      const marker = new window.google.maps.Marker({
        position: { lat: doctor.clinicLat, lng: doctor.clinicLng },
        map: mapInstanceRef.current,
        title: doctor.name
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="font-size:12px;"><strong>${doctor.name}</strong><br/>${doctor.clinic}</div>`
      });

      marker.addListener('click', () => {
        infoWindow.open({ anchor: marker, map: mapInstanceRef.current });
      });

      markersRef.current.push(marker);
    });

    if (userLocation) {
      const userMarker = new window.google.maps.Marker({
        position: center,
        map: mapInstanceRef.current,
        title: 'Your location',
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#1E88E5',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff'
        }
      });
      markersRef.current.push(userMarker);
    }
  }, [filteredDoctors, mapReady, userLocation]);

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Location is not supported by your browser.');
      return;
    }

    setLocationError('');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {
        setLocationError('Unable to access your location.');
      }
    );
  };

  const handleNearbyToggle = (e) => {
    const nextValue = e.target.checked;
    setNearbyOnly(nextValue);
    if (nextValue && !userLocation) {
      handleUseLocation();
    }
  };

  const handleMapOnlyToggle = (e) => {
    setMapOnly(e.target.checked);
  };


  const handleBookDoctor = (doctor) => {
    navigate('/booking', { state: { selectedDoctor: doctor } });
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1> Welcome, {displayName}!</h1>
        <p>Book your medical appointment with top doctors</p>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <input
          type="text"
          placeholder="Search for doctors, services..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-btn" onClick={() => navigate('/my-appointments')}>
          My Appointments ({appointmentsCount})
        </button>
        <button className="action-btn" onClick={() => navigate('/profile')}>
           My Profile
        </button>
      </div>

      {/* Step 1: Specialization Selection */}
      <div className="specializations-section">
        <h2>Medical Specializations</h2>
        
        <div className="specializations-grid">
          {mockSpecializations.map((spec) => (
            <div
              key={spec.id}
              className={`specialization-card ${
                selectedSpecialization?.id === spec.id ? 'selected' : ''
              }`}
              onClick={() => {
                setSelectedSpecialization(spec);
                setSearchTerm(''); // Clear search when changing specialization
              }}
            >
              {spec.image ? (
                <img
                  src={spec.image}
                  alt={spec.name}
                  className="spec-image"
                />
              ) : (
                <div className="spec-icon">{spec.icon}</div>
              )}
              <h3>{spec.name}</h3>
              <p className="spec-description">{spec.description}</p>
              <small className="doctor-count">
                {doctors.filter(d => d.specializationId === spec.id).length} Doctors
              </small>
            </div>
          ))}
        </div>
      </div>

      {/* Step 2: Doctor Selection (filtered by specialization) */}
      {selectedSpecialization && (
        <div className="doctors-section">
          <div className="section-header">
            <h2>Select a Doctor - {selectedSpecialization.name}</h2>
            <button 
              className="clear-btn"
              onClick={() => setSelectedSpecialization(null)}
            >
              ← Change Specialization
            </button>
          </div>

          {/* Search within selected specialization */}
          <div className="search-section">
            <input
              type="text"
              placeholder="Search by doctor name or qualifications..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="search-section">
            <button className="clear-btn" onClick={handleUseLocation}>
              Use my location
            </button>
            <div className="nearby-controls">
              <label className="nearby-toggle">
                <input
                  type="checkbox"
                  checked={nearbyOnly}
                  onChange={handleNearbyToggle}
                />
                Nearby only
              </label>
              <label className="nearby-toggle">
                <input
                  type="checkbox"
                  checked={mapOnly}
                  onChange={handleMapOnlyToggle}
                />
                Map only
              </label>
              <input
                type="number"
                min="1"
                placeholder="Max distance (km)"
                className="search-input"
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(e.target.value)}
              />
            </div>
            {locationError && <p className="no-results">{locationError}</p>}
          </div>

          <div className="map-section">
            {mapError && <p className="no-results">{mapError}</p>}
            {!mapError && !mapReady && (
              <p className="no-results">Loading map...</p>
            )}
            {!mapError && mapReady && (
              <div className="map-frame" ref={mapRef} />
            )}
          </div>

          {/* Display filtered doctors */}
          {doctorsError && <p className="no-results">{doctorsError}</p>}
          {!doctorsError && filteredDoctors.length === 0 ? (
            <p className="no-results">
              {searchTerm 
                ? "No doctors found matching your search." 
                : "No doctors available in this specialization."}
            </p>
          ) : (
            <>
              {mapOnly && (
                <p className="no-results">Map-only view enabled. Toggle off to see the list.</p>
              )}
              {!mapOnly && (
                <div className="doctors-grid">
                  {filteredDoctors.map((doctor) => (
                    <div key={doctor._id || doctor.id} className="doctor-card">
                      {/* Doctor Image/Icon */}
                      <div className="doctor-icon">{doctor.image}</div>
                      
                      {/* Doctor Info */}
                      <h3>{doctor.name}</h3>
                      <p className="qualifications">{doctor.qualifications}</p>
                      <p className="experience"> {doctor.experience}</p>
                      <p className="clinic"> {doctor.clinic}</p>
                      {doctor.clinicAddress && (
                        <p className="clinic">{doctor.clinicAddress}</p>
                      )}
                      {Number.isFinite(doctor.distanceKm) && (
                        <p className="clinic">{doctor.distanceKm.toFixed(1)} km away</p>
                      )}
                      
                      {/* Consultation Details */}
                      <div className="consultation-info">
                        <span className="fee">₹{doctor.consultationFee}</span>
                        <span className="duration">{doctor.duration} mins</span>
                      </div>
                      
                      {/* Book Button */}
                      <button 
                        className="book-btn"
                        onClick={() => handleBookDoctor(doctor)}
                      >
                        Book Appointment →
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Info Section */}
      <div className="info-section">
        <h3>How Medibook Works</h3>
        <ol>
          <li><strong>Select Specialization:</strong> Choose your medical need (Dermatology, Cardiology, etc.)</li>
          <li><strong>Pick a Doctor:</strong> View doctors in that specialty with credentials</li>
          <li><strong>Choose Date & Time:</strong> Pick convenient appointment slots</li>
          <li><strong>Provide Reason:</strong> Tell us your medical concern</li>
          <li><strong>Confirm:</strong> Complete your booking and get confirmation</li>
        </ol>
      </div>
    </div>
  );
}

export default Dashboard;
