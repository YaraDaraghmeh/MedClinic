import React, { useEffect, useState } from 'react';
import { getDoctors } from '../../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './doctor.css'; 
import { useUserContext } from '../../hooks/UserContext';
import { User } from '../../Types';

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { users } = useUserContext();
  
  const fetchDoctors = async () => {
    try {
      const response = await getDoctors(users);
      setDoctors(response);
    } catch (error) {
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="doctors-container">
      <h1>Doctors</h1>
      <ToastContainer position="top-left" />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : doctors.length === 0 ? (
        <div className="no-data">There are no doctors available</div>
      ) : (
        <div className="doctors-grid">
          {doctors.map((doctor) => (
            <div key={doctor.email} className="doctor-card">
              <img 
                src={doctor.imageUrl || '/default-doctor.png'} 
                alt={doctor.name} 
                className="doctor-image"
              />
              <div className="doctor-info">
                <p className="specialization">
                  {doctor.specialization || 'General Practitioner'}
                </p>
                <h2>Dr. {doctor.name}</h2>
                <p className="email">{doctor.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsPage;