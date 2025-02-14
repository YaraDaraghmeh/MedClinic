// Dashboard.tsx
import React, { useState } from 'react';
import { Layout, Row, Col, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Sidebar from '../DoctorPage/Sidebar'
import Header from '../DoctorPage/Header';
import StatisticsCards from '../DoctorPage/StatisticsCards';
import AppointmentsTable from '../DoctorPage/AppointmentsTable';
import AppointmentFormModal from '../DoctorPage/AppointmentFormModal';
import BarChartComponent from '../DoctorPage/Charts/BarChartComponent';
import PieChartComponent from '../DoctorPage/Charts/PieChartComponent';
import LineChartComponent from '../DoctorPage/Charts/LineChartComponent';
import useAppointments from '../../hooks/useAppointments';
import { appointmentData, statusData, colors} from '../../utils/constants';
import {FormValues, Appointment} from '../../Types';
import PatientsTable from './PatientsTable';

const { Content } = Layout;



const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedSection, setSelectedSection] = useState('dashboard');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isPatientModalVisible, setIsPatientModalVisible] = useState(false);
  const { appointments, addAppointment, editAppointment, deleteAppointment} = useAppointments();
  const patientGrowthData: never[] = []; // Define patientGrowthData with appropriate data
  const [patients, setPatients] = useState([]);

  const handleFormSubmit = (values: FormValues) => {
    addAppointment(values);
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleEdit = (record: Appointment) => {
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    deleteAppointment(id);
  };

  const handleEditPatient = (record: any) => {
    // Implement the logic for editing a patient
  };

  const handleDeletePatient = (id: number) => {
    // Implement the logic for deleting a patient
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'dashboard':
        return (
          <>
            <StatisticsCards />
            <Row gutter={16} style={{ marginBottom: '24px' }}>
              <Col span={12}>
                <BarChartComponent data={appointmentData} />
              </Col>
              <Col span={12}>
                <PieChartComponent data={statusData} colors={colors} />
              </Col>
            </Row>
          </>
        );
      case 'appointments':
        return (
          <>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
              style={{ marginBottom: '16px' }}
            >
              Add Appointment
            </Button>
            <AppointmentsTable
              appointments={appointments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        );
case 'patients':
  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsPatientModalVisible(true)}
        style={{ marginBottom: '16px' }}
      >
        Add Patient
      </Button>
      <PatientsTable
        patients={patients}
        onEdit={handleEditPatient}
        onDelete={handleDeletePatient}
      />
    </>
  );
case 'reports':
  return (
    <>
      <LineChartComponent data={patientGrowthData} />
    </>
  );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar
        collapsed={collapsed}
        selectedSection={selectedSection}
        onCollapse={setCollapsed}
        onSelectSection={setSelectedSection}
      />
      <Layout>
        <Header />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 'calc(100vh - 112px)' }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
      <AppointmentFormModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSave={handleFormSubmit}
        form={form}
      />
    </Layout>
  );
};

export default Dashboard;