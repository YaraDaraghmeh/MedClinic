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
    className={`  !flex !flex-col !items-center !justify-center !bg-gradient-to-r ${gradientFrom} ${gradientTo} !rounded-2xl !p-6 text-white relative hover:shadow-2xl transition-all duration-300`}
    >
  <div className="absolute top-2 right-2 text-white opacity-95 hover:opacity-100 transition-opacity duration-300 !text-4xl">
  {icon}
</div>

      <h3 className="!text-2xl !font-bold !mt-4">{title}</h3>
      <p className="!text-4xl
      
       !font-extrabold !mt-3 ">{value}</p>
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
    <div className="flex flex-wrap gap-4 justify-center">
      <StatCard
        title="Total Appointments"
        value={total}
        gradientFrom="from-blue-500"
        gradientTo="to-blue-600"
        icon={<BsFillPeopleFill size={24} />}
      />
      <StatCard
        title="Pending Appointments"
        value={pending}
        gradientFrom="from-yellow-400"
        gradientTo="to-yellow-500"
        icon={<BsClockHistory size={24} />}
      />
      <StatCard
        title="Confirmed Appointments"
        value={confirmed}
        gradientFrom="from-green-400"
        gradientTo="to-green-500"
        icon={<BsCheckCircleFill size={24} />}
      />
    </div>
  );
};

export default StatisticsCards;
