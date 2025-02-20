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
      className={`
        group relative flex flex-col items-center justify-center 
        bg-gradient-to-br ${gradientFrom} ${gradientTo}
        rounded-2xl p-6 md:p-8 
        text-white overflow-hidden
        transform transition-all duration-500 
        hover:scale-[1.02] hover:shadow-2xl
        min-w-[280px] max-w-[420px]
        flex-1 h-52
        before:absolute before:inset-0 before:bg-white/10 before:opacity-0
        hover:before:opacity-100 before:transition-opacity before:duration-300
      `}
    >
      <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay" />
      
      <div className="absolute top-4 right-4 flex items-center justify-center
        w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm
        group-hover:bg-white/20 transition-all duration-300">
        {icon}
      </div>
      
      <div className="relative z-10 text-center">
        <h3 className="text-xl md:text-2xl font-bold mb-3 drop-shadow-md">
          {title}
        </h3>
        <p className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white/90 to-white bg-clip-text text-transparent">
          {value}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/20 transition-all duration-500 group-hover:h-3" />
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 px-4 md:px-8 max-w-7xl mx-auto">
      <StatCard
        title="Total Appointments"
        value={total}
        gradientFrom="from-blue-600"
        gradientTo="to-blue-400"
        icon={<BsFillPeopleFill className="w-6 h-6 text-white/90" />}
      />
      <StatCard
        title="Pending"
        value={pending}
        gradientFrom="from-amber-500"
        gradientTo="to-amber-300"
        icon={<BsClockHistory className="w-6 h-6 text-white/90" />}
      />
      <StatCard
        title="Confirmed"
        value={confirmed}
        gradientFrom="from-emerald-600"
        gradientTo="to-emerald-400"
        icon={<BsCheckCircleFill className="w-6 h-6 text-white/90" />}
      />
    </div>
  );
};

export default StatisticsCards;