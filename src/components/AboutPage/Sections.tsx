import React from 'react';
import { BsHeartPulse } from "react-icons/bs";
import { FaRegEye } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { FaTooth } from "react-icons/fa6";
import { GiLoveInjection } from "react-icons/gi";
import { GiStomach } from "react-icons/gi";
import { PiBrain } from "react-icons/pi";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
}

const CategoriesGrid = () => {
  const services: ServiceItem[] = [
    {
      icon: <BsHeartPulse className="text-white text-3xl" />,
      title: "Cardiology",
      bgColor: "bg-blue-500"
    },
    {
      icon: <FaRegEye className="text-white text-3xl" />,
      title: "Ophthalmology",
      bgColor: "bg-green-500"
    },
    {
      icon: <FaUserMd className="text-white text-3xl" />,
      title: "Gynecology",
      bgColor: "bg-purple-500"
    },
    {
      icon: <FaTooth className="text-white text-3xl" />,
      title: "Dental Care",
      bgColor: "bg-yellow-500"
    },
    {
      icon: <GiLoveInjection className="text-white text-3xl" />,
      title: "Plastic Surgery",
      bgColor: "bg-red-500"
    },
    {
      icon: <GiStomach className="text-white text-3xl" />,
      title: "Pediatrics",
      bgColor: "bg-teal-500"
    },
    {
      icon: <PiBrain className="text-white text-3xl" />,
      title: "Gastrology",
      bgColor: "bg-orange-500"
    },
    {
      icon: <PiBrain className="text-white text-3xl" />,
      title: "Neurology",
      bgColor: "bg-indigo-500"
    }
  ];

  return (
    <div>
      <section className="text-center py-16 bg-gray-100">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our All Services
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          We offer a wide range of expert medical services to cater to all your
          health needs, ensuring the best care for every patient.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 sm:gap-2 md:grid-cols-4 md:gap-6 py-8 px-4">
        {services.map((service, index) => (
          <div key={index} className="text-center">
            <div className={`flex items-center justify-center w-20 h-20 ${service.bgColor} rounded-full mx-auto mb-4`}>
              <div className="text-white">
                {service.icon}
              </div>
            </div>
            <h3 className="font-semibold text-lg text-gray-800">{service.title}</h3>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoriesGrid;

