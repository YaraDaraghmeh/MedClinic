import React, { useEffect, useState, useMemo } from 'react';
import { Input, Row, Col, Card, Typography, Button, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import PatientReports from '../DoctorsDashboard/PatientReport';
import { useLoggedInUser } from '../../../../hooks/LoggedinUserContext';
import { useAppointmentsContext } from '../../../../hooks/AppointmentContext';
import { Appointment } from '../../../../Types';

const Reports: React.FC = () => {
  const { loggedInUser } = useLoggedInUser();
  const { appointments } = useAppointmentsContext();
  const [patients, setPatients] = useState<Appointment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique patients with latest appointment
  useEffect(() => {
    if (loggedInUser?.email) {
      const doctorAppointments = appointments
        .filter(appt => appt.doctorEmail === loggedInUser.email)
        .sort((a, b) => moment(b.appointmentDate).diff(moment(a.appointmentDate)));

      const uniquePatients = Array.from(new Set(doctorAppointments.map(a => a.patientEmail)))
        .map(email => doctorAppointments.find(a => a.patientEmail === email))
        .filter((a): a is Appointment => a !== undefined);

      setPatients(uniquePatients);
    }
  }, [loggedInUser, appointments]);

  // Filter patients by search term
  const filteredPatients = useMemo(() => {
    return patients.filter(patient =>
      patient.patientEmail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [patients, searchTerm]);

  return (
    <div className="reports-page min-h-full">
      <div className="search-header">
        <Input
          placeholder="Search patients..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />
      </div>

      <Row gutter={[16, 16]} className="patient-grid">
        {filteredPatients.map(patient => (
          <Col key={patient.id} xs={24} sm={12} md={8} lg={6}>
           <Card className="patient-card bg-gradient-to-b from-blue-50 to-white shadow-lg hover:shadow-2xl transition-all rounded-lg p-6 min-w-90">
  <Typography.Title level={4} className="patient-name text-blue-700 text-xl font-semibold mb-3 truncate">
    {patient.patientEmail}
  </Typography.Title>
  
  <Typography.Text type="secondary" className="text-gray-600 text-sm mb-4">
    {moment(patient.appointmentDate, "DD-MM-YYYY").format("DD-MM-YYYY")}
  </Typography.Text>
  
  <div className="quick-info flex justify-between gap-4 mb-4">
    <Typography.Text className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
      Notes: {patient.note ? '✅ Available' : '❌ None'}
    </Typography.Text>
    <Typography.Text className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
      Documents: {patient.documents?.length || 0}
    </Typography.Text>
  </div>

  <Button
    type="primary"
    block
    onClick={() => setSelectedPatient(patient)}
    className="view-reports-btn mt-4 bg-blue-600 text-white hover:bg-blue-700 border-none rounded-lg py-2 transition-all"
  >
    View Full Report
  </Button>
</Card>

          </Col>
        ))}
      </Row>

      <Modal
        title={`Patient Report - ${selectedPatient?.patientEmail}`}
        visible={!!selectedPatient}
        onCancel={() => setSelectedPatient(null)}
        footer={null}
        width={800}
      >
        {selectedPatient && (
          <PatientReports
            patientName={selectedPatient.patientEmail}
            notes={selectedPatient.note || ''}
            documents={selectedPatient.documents || []}
            appointmentDate={selectedPatient.appointmentDate}
          />
        )}
      </Modal>

   <style>{`
  .patient-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;

}

.patient-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Default: 1 column on very small screens */
  grid-gap: 16px;
}

.patient-grid > .patient-card {
  width: 100%;
  box-sizing: border-box;
}

@media (min-width: 576px) {
  .patient-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on small screens */
  }
}

@media (min-width: 768px) {
  .patient-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns on medium screens */
  }
}

@media (min-width: 1024px) {
  .patient-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columns on larger screens */
  }
}

@media (min-width: 1280px) {
  .patient-grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columns on extra large screens */
  }
}

.patient-grid > .patient-card {
  width: 100%;
  max-width: calc(25% - 16px);
  box-sizing: border-box;
}

@media (min-width: 768px) {
 .patient-grid {
 grid-template-columns: repeat(4, 1fr);
  
 }
}

@media (min-width: 1024px) {
  .patient-grid > .patient-card {
    width: calc(33.33% - 16px);
  }
}

@media (min-width: 1280px) {
  .patient-grid > .patient-card {
    width: calc(25% - 16px);
  }
}

  .reports-page {
    padding: 24px;
   min-width:100%;
    margin: 0 auto;
    background-color: #f9fafb; /* Slight background color for better contrast */
    border-radius: 8px; /* Add subtle rounded corners */
  }

  .search-header {
    margin-bottom: 24px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .search-header .ant-input {
    width: 100%;
    max-width: 400px; /* Ensures a maximum width to prevent stretching */
    padding: 8px 16px;
    border-radius: 8px; /* Rounded corners for input */
    border: 1px solid #d1d5db; /* Subtle border color */
    transition: border-color 0.3s ease-in-out;
  }

  .search-header .ant-input:hover,
  .search-header .ant-input:focus {
    border-color: #3b82f6; /* Highlight border on hover/focus */
  }

  .patient-card {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #e5e7eb; /* Border to separate cards */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }

  .patient-card:hover {
    transform: translateY(-4px); /* Slight hover effect */
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15); /* Deepens shadow on hover */
  }

  .patient-name {
    margin-bottom: 8px;
    font-size: 1.125rem; /* Slightly larger font size for better readability */
    font-weight: 600;
    color: #1f2937; /* Darker color for contrast */
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .quick-info {
    margin: 16px 0;
    display: flex;
    justify-content: space-between;
    gap: 12px; /* Add space between quick info items */
  }

  .quick-info .ant-typography {
    padding: 6px 12px;
    border-radius: 12px;
    font-size: 0.875rem;
  }

  .quick-info .notes {
    background-color: #ebf8ff; /* Lighter background for "Notes" */
    color: #2b6cb0; /* Darker text color for contrast */
  }

  .quick-info .documents {
    background-color: #f0fdf4; /* Light green background for "Documents" */
    color: #2f855a; /* Dark green text color */
  }

  .view-reports-btn {
    margin-top: 16px;
    padding: 10px 16px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }

  .view-reports-btn:hover {
    background-color: #2563eb; /* Darker blue on hover */
    transform: translateY(-2px); /* Slight hover effect */
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .search-header {
      justify-content: center;
    }

    .search-header .ant-input {
      width: 100%;
      max-width: 320px; /* Limit input width on smaller screens */
    }

    .patient-card {
      width: 100%;
      margin-bottom: 16px; /* Add space between cards */
    }

    .quick-info {
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .view-reports-btn {
      width: 100%;
      padding: 12px;
    }
  }
`}</style>

    </div>
    
  );
};

export default Reports;