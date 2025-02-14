import { FaUsers, FaSyringe } from "react-icons/fa6";
import { FaUserMd, FaMapMarkerAlt } from "react-icons/fa";
import { StatisticsCard } from "./StatisticsCard";

export const StatisticsSection = () => {
  const stats = [
    { icon: FaUsers, target: 100, suffix: "k", label: "Happy Patients" },
    { icon: FaSyringe, target: 1000, suffix: "+", label: "Surgery Completed" },
    { icon: FaUserMd, target: 50, suffix: "+", label: "Expert Doctors" },
    { icon: FaMapMarkerAlt, target: 10, suffix: "+", label: "Worldwide Branches" },
  ];

  return (
    <section className="py-16 bg-gray-50 text-center">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {stats.map((stat, index) => (
          <StatisticsCard key={index} {...stat} />
        ))}
      </div>
    </section>
  );
};