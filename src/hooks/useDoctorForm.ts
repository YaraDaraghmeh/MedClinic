import emailjs from "@emailjs/browser";
import { useState } from "react";
import { toast } from "react-toastify";
import { addUser, isEmailTaken } from "../services/userService";
import { generatePassword } from "../functions";
import { User } from "../Types";

export const useDoctorForm = (fetchDoctors: () => void) => {
  const [newDoctor, setNewDoctor] = useState<User>({
    name: { stringValue: "" },
    email: { stringValue: "" },
    dateOfBirth: { stringValue: "" },
    password: { stringValue: "" },
    role: { stringValue: "doctor" },
    gender: { stringValue: "" },
    specialization: { stringValue: "" },
  });

  const [autoGeneratePassword, setAutoGeneratePassword] =
    useState<boolean>(false);

  // Handle adding a new doctor
  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if the email is already taken
      const emailTaken = await isEmailTaken(newDoctor.email.stringValue);
      if (emailTaken) {
        toast.error("Email is already taken");
        return;
      }

      // Generate a password if auto-generate is enabled
      const password = autoGeneratePassword
        ? generatePassword()
        : newDoctor.password.stringValue;

      // Add the new doctor
      await addUser({
        name: newDoctor.name.stringValue,
        email: newDoctor.email.stringValue,
        dateOfBirth: newDoctor.dateOfBirth.stringValue,
        password: password,
        role: newDoctor.role.stringValue,
        gender: newDoctor.gender.stringValue,
        specialization: newDoctor.specialization?.stringValue,
      });
      emailjs
        .send(
          "service_e9ciwsf",
          "template_ub71yao",
          {
            name: newDoctor.name.stringValue,
            email: newDoctor.email.stringValue,
            password: [password],
          }, 
          "ZDTmZBqFVNIof8wRQ"
        )
        .then((response) => {
          toast.success(
            "Welcome email sent to user " + newDoctor.email.stringValue
          );
        })
        .catch((error) => {
          toast.error("Error sending email: " + error.text);
        });

      toast.success("Doctor added successfully!");

      // Reset the form state
      setNewDoctor({
        name: { stringValue: "" },
        email: { stringValue: "" },
        dateOfBirth: { stringValue: "" },
        password: { stringValue: "" },
        role: { stringValue: "doctor" },
        gender: { stringValue: "" },
        specialization: { stringValue: "" },
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
