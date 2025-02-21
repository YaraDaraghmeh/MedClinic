import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Filters from "./Filters/Filters";
import DoctorCard from "./DoctorCard/DoctorCard";
import DoctorModal from "./DoctorModal/DoctorModal";
import Pagination from "./Pagination/Pagination";
import "./DoctorsPage.css";
import { useAppointmentsContext } from "../../../../../hooks/AppointmentContext";
import { useUserContext } from "../../../../../hooks/UserContext";
import { getCompletedAppointmentsForDoctor } from "../../../../../services/appointmentService";
import { getDoctors } from "../../../../../services/userService";
import { User } from "../../../../../Types";

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
  "Urology",
];

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("");
  const { users } = useUserContext();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(6);

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors(users);
      setDoctors(response);
    } catch (error) {
      toast.error("Failed to load doctors");
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
    setCurrentPage(1);
  };

  const filteredDoctors = selectedSpecialization
    ? doctors.filter((doctor) => doctor.specialization === selectedSpecialization)
    : doctors;

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const { appointments } = useAppointmentsContext();

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="doctors-container">
      <h1>Doctors</h1>
      <ToastContainer position="top-left" />

      <Filters
        selectedSpecialization={selectedSpecialization}
        onSpecializationChange={handleSpecializationChange}
        specializations={specializations}
      />

      {loading ? (
        <div className="loading">Loading...</div>
      ) : filteredDoctors.length === 0 ? (
        <div className="no-data">There are no doctors available</div>
      ) : (
        <>
          <div className="doctors-grid">
            {currentDoctors.map((doctor) => (
              <DoctorCard
                key={doctor.email}
                doctor={doctor}
                onClick={() => handleDoctorClick(doctor)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredDoctors.length / doctorsPerPage)}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      <DoctorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        doctor={selectedDoctor}
        completedAppointments={
          selectedDoctor ? getCompletedAppointmentsForDoctor(appointments, selectedDoctor.email).length : 0
        }
      />
    </div>
  );
};

export default DoctorsPage;