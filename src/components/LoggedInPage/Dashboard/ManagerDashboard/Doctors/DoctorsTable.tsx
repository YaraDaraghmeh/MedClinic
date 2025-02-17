import React, { useState } from "react";
import { User } from "../../../../../Types";

interface DoctorsTableProps {
  doctors: User[];
  setDoctorToDelete: (doctor: { email: string; name: string }) => void;
  setdoctorObject : (doctor: { email: string; name: string }) => void;
}


export const DoctorsTable: React.FC<DoctorsTableProps> = ({ doctors, setDoctorToDelete,setdoctorObject }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  // Calculate the index of the first and last doctor to display
  const indexOfLastDoctor = currentPage * rowsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - rowsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Handle pagination buttons
  const totalPages = Math.ceil(doctors.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      {/* Doctors Table */}
      <table className="w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left text-gray-700">Name</th>
            <th className="p-3 text-left text-gray-700">Email</th>
            <th className="p-3 text-left text-gray-700">Specialization</th>
            <th className="p-3 text-left text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentDoctors.map((doctor) => (
            <tr
              key={doctor.email.stringValue} // Ensure key is unique
              className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
            >
              {/* Doctor Name */}
              <td className="p-3 flex items-center gap-3 text-gray-800">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                  <img
                    src={doctor.imageUrl?.stringValue || "/default-avatar.png"}
                    alt={doctor.name.stringValue}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                {doctor.name.stringValue}
              </td>

              {/* Doctor Email */}
              <td className="p-3 text-gray-800">{doctor.email.stringValue}</td>

              {/* Doctor Specialization */}
              <td className="p-3 text-gray-800">{doctor.specialization?.stringValue}</td>

              {/* Actions (Delete Button) */}
              <td className="p-3">
                <button
                  onClick={() => {
                    setDoctorToDelete({
                      email: doctor.email.stringValue,
                      name: doctor.name.stringValue,
                    });
                    setdoctorObject({
                      email: doctor.email.stringValue,
                      name: doctor.name.stringValue, 
                    })
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-100"
        >
          Prev
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
};