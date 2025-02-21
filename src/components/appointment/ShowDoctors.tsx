import React, { useEffect, useState } from 'react';
import { getDoctors } from '../../services/userService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './doctor.css';
import { useUserContext } from '../../hooks/UserContext';
import { User } from '../../Types';
import Modal from 'react-modal';
import { getCompletedAppointmentsForDoctor } from '../../services/appointmentService';
import { useAppointmentsContext } from '../../hooks/AppointmentContext';

const specializations = [
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Radiology",
  "Surgery",
  "Oncology",
  "Orthopedics",
  "Psychiatry",
  "Urology"
];

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const { users } = useUserContext();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(6); // Number of doctors per page

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

  const handleDoctorClick = (doctor: User) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleSpecializationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialization(e.target.value);
    setCurrentPage(1); // Reset to the first page when filtering
  };

  const filteredDoctors = selectedSpecialization
    ? doctors.filter(doctor => doctor.specialization === selectedSpecialization)
    : doctors;

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const { appointments } = useAppointmentsContext();

  return (
    <div className="doctors-container">
      <h1>Doctors</h1>
      <ToastContainer position="top-left" />

      {/* Specialization Filter */}
      <div className="filter-container">
        <select
          value={selectedSpecialization}
          onChange={handleSpecializationChange}
          className="specialization-filter"
        >
          <option value="">All Specializations</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>

        {/* Book Now Button */}
        <a
          href={`/book-appointment?specialization=${selectedSpecialization}`}
          className="book-now-btn"
        >
          Book Now
        </a>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="no-data">There are no doctors available</div>
      ) : (
        <>
          <div className="doctors-grid">
            {currentDoctors.map((doctor) => (
              <div
                key={doctor.email}
                className="doctor-card"
                onClick={() => handleDoctorClick(doctor)}
              >
                <img
                  src={doctor.imageUrl || '/default-doctor.png'}
                  alt={doctor.name}
                  className="doctor-image"
                />
                <div className="doctor-info">
                  <p className="specialization">{doctor.specialization || 'General Practitioner'}</p>
                  <h2>Dr. {doctor.name}</h2>
                  <p className="email">{doctor.email}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            {Array.from({ length: Math.ceil(filteredDoctors.length / doctorsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => paginate(i + 1)}
                className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Modal to show doctor's details */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Doctor Information"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedDoctor && (
          <div className="modal-container">
            <div className="doctor-modal-header">
              <img
                src={selectedDoctor.imageUrl || '/default-doctor.png'}
                alt={selectedDoctor.name}
                className="doctor-modal-image"
              />
              <div className="doctor-info">
                <h2>Dr. {selectedDoctor.name}</h2>
                <p><strong>Specialization:</strong> {selectedDoctor.specialization || 'General Practitioner'}</p>
                <p><strong>Email:</strong> {selectedDoctor.email}</p>
                <p><strong>Gender:</strong> {selectedDoctor.gender}</p>
                <p><strong>Date of Birth:</strong> {selectedDoctor.dateOfBirth}</p>
              </div>
            </div>
            <div className="completed-appointments">
              <p><strong>Completed Appointments:</strong> {getCompletedAppointmentsForDoctor(appointments, selectedDoctor.email).length || 0}</p>
            </div>

            <a
              href={`/book-appointment?email=${selectedDoctor.email}&specialization=${selectedDoctor.specialization}`}
              className="book-now-btn"
            >
              Book Now
            </a>
            <button onClick={handleCloseModal} className="close-modal-btn">Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DoctorsPage;