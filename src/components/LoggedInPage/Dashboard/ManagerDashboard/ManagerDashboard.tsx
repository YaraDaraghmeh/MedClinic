import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { getDoctors, getPatients } from "../../../../services/userService";
import { getAppointmentsForDoctorToday } from "../../../../services/appointmentService";

const ManagerDashboard = () => {
  const [doctors, setDoctors] = useState<number>(0);
  const [patients, setPatients] = useState<number>(0);
  const [appointmentsToday, setAppointmentsToday] = useState<number>(0);
  const [appointmentsData, setAppointmentsData] = useState<any>({}); // Initialize as an empty object

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const doctorsData = await getDoctors();
      const patientsData = await getPatients();
      const appointmentsTodayData = await getAppointmentsForDoctorToday("doctor@example.com"); // Replace with dynamic email
      setDoctors(doctorsData.length);
      setPatients(patientsData.length);
      setAppointmentsToday(appointmentsTodayData.length);

      // Example for Radial Chart - Appointments today distribution (can be customized)
      const appointmentsStatusCount = {
        pending: appointmentsTodayData.filter((a: { status: { stringValue: string; }; }) => a.status?.stringValue === "pending").length,
        confirmed: appointmentsTodayData.filter((a: { status: { stringValue: string; }; }) => a.status?.stringValue === "confirmed").length,
        completed: appointmentsTodayData.filter((a: { status: { stringValue: string; }; }) => a.status?.stringValue === "completed").length,
        canceled: appointmentsTodayData.filter((a: { status: { stringValue: string; }; }) => a.status?.stringValue === "canceled").length,
      };

      setAppointmentsData(appointmentsStatusCount);
    };

    fetchData();
  }, []);

  // ApexChart RadialBar options
  const radialChartOptions = {
    chart: {
      type: "radialBar" as "radialBar", // Type assertion here
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "16px",
            fontWeight: "bold",
          },
          value: {
            fontSize: "14px",
          },
        },
      },
    },
    series: [
      appointmentsData?.pending || 0,
      appointmentsData?.confirmed || 0,
      appointmentsData?.completed || 0,
      appointmentsData?.canceled || 0,
    ],
    labels: ["Pending", "Confirmed", "Completed", "Canceled"],
  };

  return (
    <div className="dashboard-container">
      <div className="cards-container">
        <div className="card">
          <h3>Doctors</h3>
          <p>{doctors}</p>
        </div>
        <div className="card">
          <h3>Patients</h3>
          <p>{patients}</p>
        </div>
        <div className="card">
          <h3>Today's Appointments</h3>
          <p>{appointmentsToday}</p>
        </div>
      </div>

      <div className="charts-container">
        <h4>Appointment Status Today</h4>
        {appointmentsData && Object.keys(appointmentsData).length > 0 ? (
          <ReactApexChart options={radialChartOptions} series={radialChartOptions.series} type="radialBar" height={350} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
    </div>
  );
};

export default ManagerDashboard;
