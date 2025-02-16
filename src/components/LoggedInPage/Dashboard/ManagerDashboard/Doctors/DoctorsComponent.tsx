import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDoctors, isEmailTaken, addUser } from "../../../../../services/userService";
import { generatePassword } from "../../../../../functions";
import emailjs from "@emailjs/browser";

const DoctorsComponent = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDoctorModal, setShowAddDoctorModal] = useState(false);
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    password: "",
    gender: "",
    specialization: "",
  });
  const [autoGeneratePassword, setAutoGeneratePassword] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Fetch all doctors
  const fetchDoctors = async () => {
    try {
      const doctors = await getDoctors();
      setDoctors(doctors);
      console.log(doctors);
    } catch (error) {
      toast.error("Failed to fetch doctors");
    }
  };

  // Handle adding a new doctor
  const handleAddDoctor = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      // Check if email is already taken
      const emailTaken = await isEmailTaken(newDoctor.email);
      if (emailTaken) {
        toast.error("Email is already taken");
        return;
      }

      // Generate password if auto-generate is enabled
      const password = autoGeneratePassword ? generatePassword() : newDoctor.password;

      // Add the new doctor
      await addUser({
        ...newDoctor,
        role: "doctor",
        password,
      });

      toast.success("Doctor added successfully!");
      setShowAddDoctorModal(false);
      fetchDoctors();

      // Send welcome email
      await sendWelcomeEmail(newDoctor.email, password);
    } catch (error) {
      toast.error("Failed to add doctor");
    }
  };

  // Send welcome email using EmailJS
  const sendWelcomeEmail = async (email: string, password: string) => {
    try {
      const templateParams = {
        email: email,
        password: password,
      };

      await emailjs.send(
        "service_e9ciwsf", 
       "template_ub71yao", 
        templateParams,
       
       "ZDTmZBqFVNIof8wRQ" 
      );

      toast.success("Welcome email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send welcome email");
    }
  };

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(
    (doctor:any) =>
      doctor.name?.stringValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email?.stringValue.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Doctors</h1>
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setShowAddDoctorModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Doctor
        </button>
      </div>

      {/* Doctors Table */}
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left text-gray-700">Name</th>
            <th className="p-3 text-left text-gray-700">Email</th>
            <th className="p-3 text-left text-gray-700">Specialization</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor:any) => (
            <tr
              key={doctor.id}
              className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
            >
              <td className="p-3 text-gray-800">{doctor.name.stringValue}</td>
              <td className="p-3 text-gray-800">{doctor.email.stringValue}</td>
              <td className="p-3 text-gray-800">{doctor.specialization?.stringValue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Doctor Modal */}
      {showAddDoctorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Add New Doctor</h2>
              <button
                onClick={() => setShowAddDoctorModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddDoctor} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={newDoctor.name}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, name: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={newDoctor.email}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, email: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={newDoctor.dateOfBirth}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, dateOfBirth: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={autoGeneratePassword}
                  onChange={(e) => setAutoGeneratePassword(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-gray-700">Auto-generate password</label>
              </div>
              {!autoGeneratePassword && (
                <input
                  type="password"
                  placeholder="Password"
                  value={newDoctor.password}
                  onChange={(e) =>
                    setNewDoctor({ ...newDoctor, password: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
              <select
                value={newDoctor.gender}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, gender: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Specialization"
                value={newDoctor.specialization}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, specialization: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Add Doctor
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorsComponent;