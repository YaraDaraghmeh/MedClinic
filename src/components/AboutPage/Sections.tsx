import React from "react";
import { BsHeartPulse } from "react-icons/bs";
import { FaRegEye, FaUserMd } from "react-icons/fa";
import { FaTooth } from "react-icons/fa6";
import { GiLoveInjection, GiStomach } from "react-icons/gi";
import { PiBrain } from "react-icons/pi";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
}

const CategoriesGrid = () => {
  const services: ServiceItem[] = [
    { icon: <BsHeartPulse />, title: "Cardiology", bgColor: "!bg-blue-500" },
    { icon: <FaRegEye />, title: "Ophthalmology", bgColor: "!bg-green-500" },
    { icon: <FaUserMd />, title: "Gynecology", bgColor: "!bg-purple-500" },
    { icon: <FaTooth />, title: "Dental Care", bgColor: "!bg-yellow-500" },
    { icon: <GiLoveInjection />, title: "Plastic Surgery", bgColor: "!bg-red-500" },
    { icon: <GiStomach />, title: "Pediatrics", bgColor: "!bg-teal-500" },
    { icon: <PiBrain />, title: "Gastrology", bgColor: "!bg-orange-500" },
    { icon: <PiBrain />, title: "Neurology", bgColor: "!bg-indigo-500" },
  ];

  return (
    <div className="!bg-gray-200 !py-16">
      {/* Header Section */}
      <section className="!text-center !mb-10 !px-6">
        <h2 className="!text-4xl !font-bold !text-gray-800 !mb-3">Our Services</h2>
        <p className="!text-lg !text-gray-600 !max-w-3xl !mx-auto">
          We offer a wide range of expert medical services to cater to all your health needs, ensuring the best care for every patient.
        </p>
      </section>

      {/* Services Grid */}
      <section className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 !gap-6 !px-6 md:!px-12">
        {services.map((service, index) => (
          <div key={index} className="!flex !flex-col !items-center !text-center !transition-transform !duration-300 hover:!scale-105">
            {/* Icon Container */}
            <div className={`!flex !items-center !justify-center !w-20 !h-20 ${service.bgColor} !rounded-2xl !shadow-lg`}>
              <span className="!text-white !text-4xl">{service.icon}</span>
            </div>
            {/* Title */}
            <h3 className="!mt-4 !text-xl !font-semibold !text-gray-800">{service.title}</h3>
          </div>
        ))}
      </section>
    </div>
  );
};

export default CategoriesGrid;
