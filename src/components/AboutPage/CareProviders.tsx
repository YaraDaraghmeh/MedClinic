import { Link } from "react-router-dom";
import doctor1 from "/src/assets/DoctorsImages/doctor1.png";
import doctor2 from "/src/assets/DoctorsImages/doctor2.png";
import doctor3 from "/src/assets/DoctorsImages/doctor3.png";
import doctor4 from "/src/assets/DoctorsImages/doctor4.png";
import doctor5 from "/src/assets/DoctorsImages/doctor5.png";
import doctor6 from "/src/assets/DoctorsImages/doctor6.png";
import doctor7 from "/src/assets/DoctorsImages/doctor7.png";
import { FaArrowRight } from "react-icons/fa6";
const CareProvider = () => {
  const doctors = [
    {
      id: 1,
      name: "Dr. John Doe",
      specialty: "Cardiologist",
      image: doctor1,
    },
    {
      id: 2,
      name: "Dr. Jane Smith",
      specialty: "Ophthalmologist",
      image: doctor2,
    },
    {
      id: 3,
      name: "Dr. Emma White",
      specialty: "Gynecologist",
      image: doctor3,
    },
    {
      id: 4,
      name: "Dr. Tom Brown",
      specialty: "Dentist",
      image: doctor4,
    },
    {
      id: 5,
      name: "Dr. Olivia Green",
      specialty: "Plastic Surgeon",
      image: doctor5,
    },
    {
      id: 6,
      name: "Dr. Ava Blue",
      specialty: "Pediatrician",
      image: doctor7,
    },
    {
      id: 7,
      name: "Dr. Jack Black",
      specialty: "Neurologist",
      image: doctor6,
    },
  ];

  return (
    <section className="py-16 bg-gray-100 text-center">
      {/* top section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Professional Care Providers
        </h2>
        <p className="text-lg md:text-xl text-gray-600">
          Our team of expert doctors and specialists are here to provide the
          best possible care for all your health needs.
        </p>
      </div>

      {/* bottom section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-14">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white p-6 shadow-md hover:shadow-lg transition duration-300"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h3 className="text-2xl font-semibold text-gray-800">
              {doctor.name}
            </h3>
            <p className="text-gray-600">{doctor.specialty}</p>
          </div>
        ))}

        <div className="bg-blue-600 p-6 shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center rounded-lg">
          <h3 className="text-2xl font-semibold text-white">See All Doctors</h3>
          <p className="text-white mt-2 mb-4">
            Meet our entire team of professionals.
          </p>
          <div className="flex items-center gap-1 bg-yellow-500 text-blue-800 py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-400">
            <Link to="/doctors" className=" ">
              View Doctors
            </Link>
            <FaArrowRight />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareProvider;
