import emailjs from "@emailjs/browser";
import { useState } from "react";
import { toast } from "react-toastify";
import { isEmailTaken } from "../services/userService";
import { generatePassword } from "../functions";
import { User } from "../Types";
import { useUserContext } from "./UserContext";

export const useDoctorForm = (fetchDoctors: () => void) => {
  const [newDoctor, setNewDoctor] = useState<User>({
    name: "",
    email: "",
    dateOfBirth: "",
    password: "",
    role: "doctor",
    gender: "",
    specialization: "Cardiology",
  });
const {users,addUser} = useUserContext();
  const [autoGeneratePassword, setAutoGeneratePassword] =
    useState<boolean>(false);

  // Handle adding a new doctor
  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if the email is already taken
      const emailTaken =  isEmailTaken(users,newDoctor.email);
      if (emailTaken) {
        toast.error("Email is already taken");
        return;
      }

      // Generate a password if auto-generate is enabled
      const password = autoGeneratePassword
        ? generatePassword()
        : newDoctor.password;

      // Add the new doctor
      await addUser({
        name: newDoctor.name,
        email: newDoctor.email,
        dateOfBirth: newDoctor.dateOfBirth,
        password: password,
        role: newDoctor.role,
        gender: newDoctor.gender,
        ...(newDoctor.specialization && { specialization: newDoctor.specialization })
    });
    
      emailjs
        .send(
          "service_e9ciwsf",
          "template_ub71yao",
          {
            name: newDoctor.name,
            email: newDoctor.email,
            password: [password],
          }, 
          "ZDTmZBqFVNIof8wRQ"
        )
        .then((response) => {
          toast.success(
            "Welcome email sent to user " + newDoctor.email
          );
        })
        .catch((error) => {
          toast.error("Error sending email: " + error.text);
        });

      toast.success("Doctor added successfully!");

      // Reset the form state
      setNewDoctor({
        name: "",
        email: "",
        dateOfBirth:"",
        password: "",
        role: "doctor",
        gender: "",
        specialization: "Cardiology",
      });

      // Refresh the list of doctors
      fetchDoctors();
    } catch (error) {
      toast.error("Failed to add doctor");
    }
  };

  return {
    newDoctor,
    setNewDoctor,
    autoGeneratePassword,
    setAutoGeneratePassword,
    handleAddDoctor,
  };
};
