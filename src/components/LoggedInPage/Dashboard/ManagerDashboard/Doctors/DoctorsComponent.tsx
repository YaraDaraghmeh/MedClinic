import React, { useState, useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { DoctorsTable } from "./DoctorsTable";
import { DeleteDialog } from "./DeleteDialog";
import { ForwardDialog } from "./ForwardDialog";
import { useDoctors } from "../../../../../hooks/useDoctors";
import { useDoctorForm } from "../../../../../hooks/useDoctorForm";
import { AddDoctorModal } from "./AddDotorModal";
import { useUserContext } from "../../../../../hooks/UserContext";
import { User } from "../../../../../Types";
import { getDoctors } from "../../../../../services/userService";

const DoctorsComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAddDoctorModal, setShowAddDoctorModal] = useState<boolean>(false);

  // Use the useDoctors hook for managing doctors and related state
  const {
    doctorToDelete,
    setDoctorToDelete,
    setDeleteDoctorObject,
    openForwardDialog,
    setOpenForwardDialog,
    newDoctorEmail,
    setNewDoctorEmail,
    handleDeleteDoctor,
    handleForwardAppointments,
    fetchDoctors,
  } = useDoctors();

  // Use the useDoctorForm hook for managing the new doctor form
  const {
    newDoctor,
    setNewDoctor,
    autoGeneratePassword,
    setAutoGeneratePassword,
    handleAddDoctor,
  } = useDoctorForm(fetchDoctors);
const [doctors,setdoctors]= useState<User[]>([]);
  // Use the UserContext to access the users array
  const { users } = useUserContext();
useEffect(()=>{
setdoctors(getDoctors(users));
},[users])
  // Filter doctors based on the search term
  const filteredDoctors = useMemo(() => {

    const filtered = doctors.filter(
      (doctor) =>
        doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Filtered doctors:", filtered); // Debugging log
    return filtered;
  }, [doctors, searchTerm]); // Re-calculate when doctors or searchTerm changes

  return (
    <div className="p-6 bg-gray-100 min-h-full">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Doctors</h1>
      <div className="flex justify-between items-center mb-6">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Add Doctor Button */}
        <button
          onClick={() => setShowAddDoctorModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Doctor
        </button>
      </div>

      {/* Doctors Table */}
      <DoctorsTable
        doctors={filteredDoctors}
        setDoctorToDelete={setDoctorToDelete}
        setdoctorObject={setDeleteDoctorObject}
      />

      {/* Add Doctor Modal */}
      <AddDoctorModal
        showAddDoctorModal={showAddDoctorModal}
        setShowAddDoctorModal={setShowAddDoctorModal}
        newDoctor={newDoctor}
        setNewDoctor={setNewDoctor}
        autoGeneratePassword={autoGeneratePassword}
        setAutoGeneratePassword={setAutoGeneratePassword}
        handleAddDoctor={handleAddDoctor}
      />

      {/* Delete Doctor Dialog */}
      <DeleteDialog
        open={!!doctorToDelete}
        onClose={() => setDoctorToDelete(null)}
        onDelete={handleDeleteDoctor}
      />

      {/* Forward Appointments Dialog */}
      <ForwardDialog
        open={openForwardDialog}
        onClose={() => setOpenForwardDialog(false)}
        onForward={handleForwardAppointments}
        newDoctorEmail={newDoctorEmail}
        setNewDoctorEmail={setNewDoctorEmail}
        doctors={doctors}
      />
    </div>
  );
};
export default DoctorsComponent;