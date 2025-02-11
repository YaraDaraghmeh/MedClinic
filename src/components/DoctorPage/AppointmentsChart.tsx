import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartData } from "../../Types";

interface AppointmentsChartProps {
  data: ChartData[];
}

export default function AppointmentsChart({ data }: AppointmentsChartProps) {
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="appointments" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}