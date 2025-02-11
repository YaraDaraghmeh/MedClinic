interface StatsCardProps {
    title: string;
    value: number;
    bgColor: string;
  }
  
  export default function StatsCard({ title, value, bgColor }: StatsCardProps) {
    return (
      <div className={`p-6 ${bgColor} rounded-lg`}>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    );
  }