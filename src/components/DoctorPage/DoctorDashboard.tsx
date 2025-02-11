import { useEffect, useState } from "react";
import { getAppointmentsForDoctorToday } from "../../services/appointmentService";
import { Appointment, ChartData } from "../../Types";
import StatsCard from "./StatsCard";
import AppointmentsChart from "./AppointmentsChart";

interface DoctorDashboardProps {
  doctorEmail: string;
}

export default function DoctorDashboard({ doctorEmail }: DoctorDashboardProps) {
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getAppointmentsForDoctorToday(doctorEmail);
        setTodayAppointments(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load dashboard data");
        setLoading(false);
      }
    };
    loadData();
  }, [doctorEmail]);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const pendingCount = todayAppointments.filter(
    (appt) => appt.status.stringValue === "pending"
  ).length;

  const confirmedCount = todayAppointments.filter(
    (appt) => appt.status.stringValue === "confirmed"
  ).length;

  const chartData: ChartData[] = Object.entries(
    todayAppointments.reduce((acc: { [key: string]: number }, appt) => {
      const day = new Date(
        appt.appointmentDate.stringValue.split("-").reverse().join("-")
      ).toLocaleDateString("en-US", { weekday: "short" });
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {})
  ).map(([day, appointments]) => ({ day, appointments }));

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Today's Appointments"
          value={todayAppointments.length}
          bgColor="bg-blue-50"
        />
        <StatsCard
          title="Pending Appointments"
          value={pendingCount}
          bgColor="bg-yellow-50"
        />
        <StatsCard
          title="Confirmed Appointments"
          value={confirmedCount}
          bgColor="bg-green-50"
        />
      </div>
      <AppointmentsChart data={chartData} />
    </div>
  );
}