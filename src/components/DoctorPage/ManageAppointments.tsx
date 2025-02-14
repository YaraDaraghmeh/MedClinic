import { useState } from "react";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patient: "John Doe", date: "2023-10-10", status: "Pending", notes: "" },
    { id: 2, patient: "Jane Smith", date: "2023-10-11", status: "Confirmed", notes: "" },
  ]);

  const handleStatusChange = (id: number, status: string) => {
    setAppointments(
      appointments.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  };

  return (
    <div>
      <h1>Manage Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Date</th>
            <th>Status</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((app) => (
            <tr key={app.id}>
              <td>{app.patient}</td>
              <td>{app.date}</td>
              <td>
                <select
                  value={app.status}
                  onChange={(e) => handleStatusChange(app.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  value={app.notes}
                  onChange={(e) =>
                    setAppointments(
                      appointments.map((a) =>
                        a.id === app.id ? { ...a, notes: e.target.value } : a
                      )
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointments;