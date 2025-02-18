import React from 'react';
import { BsFillPeopleFill, BsClockHistory, BsCheckCircleFill } from 'react-icons/bs';

interface StatCardProps {
  title: string;
  value: number;
  gradientFrom: string;
  gradientTo: string;
  icon: JSX.Element;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, gradientFrom, gradientTo, icon }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-xl shadow-lg p-6 text-white relative hover:shadow-xl transition-shadow duration-300`}
    >
      <div className="absolute top-4 right-4 text-white opacity-80 hover:opacity-100 transition-opacity duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
};

interface StatisticsCardsProps {
  total: number;
  pending: number;
  confirmed: number;
}

const StatisticsCards: React.FC<StatisticsCardsProps> = ({ total, pending, confirmed }) => {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      <StatCard
        title="Total Appointments"
        value={total}
        gradientFrom="from-blue-500"
        gradientTo="to-blue-600"
        icon={<BsFillPeopleFill size={32} />}
      />
      <StatCard
        title="Pending Appointments"
        value={pending}
        gradientFrom="from-yellow-400"
        gradientTo="to-yellow-500"
        icon={<BsClockHistory size={32} />}
      />
      <StatCard
        title="Confirmed Appointments"
        value={confirmed}
        gradientFrom="from-green-400"
        gradientTo="to-green-500"
        icon={<BsCheckCircleFill size={32} />}
      />
    </div>
  );
};

export default StatisticsCards;