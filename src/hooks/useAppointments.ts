// hooks/useAppointments.ts
import { useState } from 'react';
import { Appointment, FormValues } from '../Types';

const useAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', patient: 'Richard James', age: 28, date: '2024-07-24', time: '10:00 AM', status: 'Confirmed' },
    { id: '2', patient: 'Jane Smith', age: 34, date: '2024-07-25', time: '11:00 AM', status: 'Pending' },
    { id: '3', patient: 'Alice Johnson', age: 45, date: '2024-07-26', time: '02:00 PM', status: 'Completed' },
  ]);

  const addAppointment = (values: FormValues) => {
    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      ...values,
      status: 'Pending',
    };
    setAppointments([...appointments, newAppointment]);
  };

  const editAppointment = (record: Appointment) => {
    setAppointments(appointments.map((appointment) =>
      appointment.id === record.id ? record : appointment
    ));
  };

  const deleteAppointment = (id: number) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id.toString()));
  };

  return { appointments, addAppointment, editAppointment, deleteAppointment };
};

export default useAppointments;