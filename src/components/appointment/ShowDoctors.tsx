
import React, { useEffect, useState } from 'react';
import { getDoctors } from '../../services/userService'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './doctor.css'; 

interface Doctor {
  id: string;
  name: string;
  email: string;
  specialization?: string;
  imageUrl: string;
}

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  
  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();
      const formattedDoctors: Doctor[] = response.map((doc: any) => ({
        id: doc.id,
        name: doc.name.stringValue,
        email: doc.email.stringValue,
        specialization: doc.specialization?.stringValue,
        imageUrl: doc.imageUrl.stringValue
      }));
      setDoctors(formattedDoctors);
    } catch (error) {
      toast.error('failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (

    <div className="doctors-container">
      <h1> Doctors</h1>
       
      <ToastContainer position="top-left" />

      {loading ? (
        <div className="loading">loading</div>
      ) : doctors.length === 0 ? (
        <div className="no-data">there is no doctors</div>
      ) : (
        <div className="doctors-grid">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <img 
                src={doctor.imageUrl} 
                alt={doctor.name} 
                className="doctor-image"
              />
              <div className="doctor-info">
                <p className="specialization">
                  * {doctor.specialization || 'general'}
                </p>
                <h2>Dr.{doctor.name}</h2>
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
