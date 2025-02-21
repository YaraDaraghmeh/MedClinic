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
    <div className="reports-page">
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
            <Card className="patient-card">
              <Typography.Title level={4} className="patient-name">
                {patient.patientEmail}
              </Typography.Title>
              <Typography.Text type="secondary">
  {moment(patient.appointmentDate, "DD-MM-YYYY").format("DD-MM-YYYY")}
</Typography.Text>
              
              <div className="quick-info">
                <Typography.Text>
                  Notes: {patient.note ? 'Available' : 'None'}
                </Typography.Text>
                <Typography.Text>
                  Documents: {patient.documents?.length || 0}
                </Typography.Text>
              </div>

              <Button
                type="primary"
                block
                onClick={() => setSelectedPatient(patient)}
                className="view-reports-btn"
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
        .reports-page {
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .search-header {
          margin-bottom: 24px;
          display: flex;
          justify-content: flex-end;
        }

        .patient-card {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .patient-name {
          margin-bottom: 8px !important;
        }

        .quick-info {
          margin: 16px 0;
          display: flex;
          justify-content: space-between;
        }

        .view-reports-btn {
          margin-top: 16px;
        }

        @media (max-width: 768px) {
          .search-header {
            justify-content: center;
          }
          
          .search-header .ant-input {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
    
  );
};

export default Reports;