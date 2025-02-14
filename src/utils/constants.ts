
interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  address: string;
}

export const appointmentData = [
    { day: 'Mon', appointments: 10 },
    { day: 'Tue', appointments: 15 },
    { day: 'Wed', appointments: 8 },
    { day: 'Thu', appointments: 12 },
    { day: 'Fri', appointments: 20 },
  ];
  
  export const statusData = [
    { name: 'Confirmed', value: 12 },
    { name: 'Pending', value: 5 },
    { name: 'Completed', value: 8 },
  ];
  
  export const colors = ['#52c41a', '#faad14', '#f5222d'];

  export const patientsData: Patient[] = [
    { id: 1, name: 'John Doe', age: 30, gender: 'Male', email: 'john.doe@example.com', phone: '123-456-7890', address: '123 Main St' },
    { id: 2, name: 'Jane Smith', age: 25, gender: 'Female', email: 'jane.smith@example.com', phone: '987-654-3210', address: '456 Elm St' },
    { id: 3, name: 'Alice Johnson', age: 40, gender: 'Female', email: 'alice.johnson@example.com', phone: '555-123-4567', address: '789 Oak St' },
  ];
  export const patientGrowthData = [
    { month: 'Jan', patients: 10 },
    { month: 'Feb', patients: 20 },
    { month: 'Mar', patients: 30 },
    { month: 'Apr', patients: 40 },
    { month: 'May', patients: 50 },
  ];