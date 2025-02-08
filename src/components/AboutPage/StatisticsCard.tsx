import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';

interface StatisticsCardProps {
  icon: React.ElementType;
  target: number;
  label: string;
  suffix: string;
}

export const StatisticsCard = ({
  icon: Icon,
  target,
  label,
  suffix,
}: StatisticsCardProps) => {
  const animatedNumber = useAnimatedNumber(target);

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 transform transition duration-300 hover:scale-105 hover:shadow-md">
      <div className="flex justify-center items-center mb-4">
        <Icon className="text-4xl text-gray-600" />
      </div>
      <h3 className="text-4xl font-semibold text-gray-800">
        {animatedNumber}
        {suffix}
      </h3>
      <p className="text-xl !text-gray-500">{label}</p>
    </div>
  );
};