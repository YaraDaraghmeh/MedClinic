import emailjs from "@emailjs/browser";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getDoctors } from "../services/userService";
import { User } from "../Types";
import { getAppointmentsByDoctor } from "../services/appointmentService";
import { useUserContext } from "./UserContext";
import { useAppointmentsContext } from "./AppointmentContext";

export const useDoctors = () => {
  const { cancelAllAppointments, forwardAppointments, appointments } = useAppointmentsContext();
  const { users, deleteUser } = useUserContext();
  const [doctors, setDoctors] = useState<User[]>([]);
  const [doctorToDelete, setDoctorToDelete] = useState<{
    email: string;
    name: string;
  } | null>(null);
  const [openForwardDialog, setOpenForwardDialog] = useState<boolean>(false);
  const [newDoctorEmail, setNewDoctorEmail] = useState<string>("");
  const [deleteDoctorObject, setDeleteDoctorObject] = useState<{
    email: string;
    name: string;
  } | null>(null);

  // Fetch doctors on component mount and when users change
  useEffect(() => {
    fetchDoctors();
  }, [users]); // Add users as a dependency

  // Fetch doctors from the API
  const fetchDoctors = async () => {
    try {
      const doctors = await getDoctors(users);
      console.log("Fetched doctors:", doctors); // Debugging log
      setDoctors(doctors);
    } catch (error) {
      toast.error("Failed to fetch doctors");
      setDoctors([]);
    }
  };

  // Handle deleting a doctor
  const handleDeleteDoctor = async () => {
    if (!doctorToDelete) {
      toast.error("No doctor selected for deletion");
      return;
    }

    try {
      // Delete the doctor
      await deleteUser(doctorToDelete.email);

      // Check if the doctor has appointments
      const appointments1 = await getAppointmentsByDoctor(appointments, doctorToDelete.email);
      if (appointments1.length > 0) {
        // Open the forward dialog if there are appointments
        setOpenForwardDialog(true);
      } else {
        // Cancel appointments if there are no appointments to forward
        await cancelAllAppointments(doctorToDelete.email);
        emailjs
          .send(
            "service_3v825nj",
            "template_kf6xmhq",
            { email: doctorToDelete.email, name: doctorToDelete.name },
            "t69Tpft32TJC_aYyK"
          )
          .then((response) => {
            toast.success("Goodbye email sent to user " + doctorToDelete.email);
          })
          .catch((error) => {
            toast.error("Error sending email: " + error.text);
          });

        toast.success("Doctor deleted successfully!");
        setDoctorToDelete(null); // Reset doctorToDelete only after deletion is complete
        fetchDoctors(); // Refresh the list of doctors
      }
    } catch (error) {
      toast.error("Failed to delete doctor");
    }
  };

  // Handle forwarding appointments to another doctor
  const handleForwardAppointments = async () => {
    if (!newDoctorEmail || !deleteDoctorObject) {
      toast.error("Please select a doctor to forward appointments to.");
      return;
    }

    try {
      // Forward appointments to the new doctor
      await forwardAppointments(deleteDoctorObject.email, newDoctorEmail);
      toast.success("Appointments forwarded successfully!");
    } catch (error) {
      toast.error("Failed to forward appointments");
    } finally {
      setOpenForwardDialog(false); // Close the dialog
      setNewDoctorEmail(""); // Reset the new doctor email
      setDeleteDoctorObject(null); // Reset doctorToDelete after forwarding is complete
      setDoctorToDelete(null);
      fetchDoctors(); // Refresh the list of doctors
    }
  };

  return {
    doctors,
    doctorToDelete,
    setDoctorToDelete,
    deleteDoctorObject,
    setDeleteDoctorObject,
    openForwardDialog,
    setOpenForwardDialog,
    newDoctorEmail,
    setNewDoctorEmail,
    handleDeleteDoctor,
    handleForwardAppointments,
    fetchDoctors,
  };
};