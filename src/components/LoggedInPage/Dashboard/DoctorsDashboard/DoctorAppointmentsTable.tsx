import React, { useEffect, useState, useMemo } from 'react';
import { Table, Tag, Space, Button, Typography, Modal, Form, Input, DatePicker, TimePicker, Select, Row, Col } from 'antd';
import moment from 'moment';
import { getAppointmentsByDoctor } from '../../../../services/appointmentService';
import { Appointment, User } from '../../../../Types';
import { useAppointmentsContext } from '../../../../hooks/AppointmentContext';

interface DoctorAppointmentsTableProps {
  user: User;
}

const DoctorAppointmentsTable: React.FC<DoctorAppointmentsTableProps> = ({ user }) => {
  const {appointments,addAppointment,deleteAppointment}= useAppointmentsContext();
  const [appointmentsbydoc, setAppointmentsbydoc] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  // Editing states
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [form] = Form.useForm();

  const doctorEmail = user?.email;

  useEffect(() => {
    const loadAppointments = async () => {
      if (!doctorEmail) return; 
      try {
        const data =  getAppointmentsByDoctor(appointments,doctorEmail);
        setAppointmentsbydoc(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [doctorEmail]);

  const handleDelete = async (appointmentId: string) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointmentsbydoc(prev => prev.filter(appt => appt.id !== appointmentId));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  // Filtering logic
  const filteredAppointments = useMemo(() => {
    let filtered = appointmentsbydoc;

    if (searchTerm) {
      filtered = filtered.filter(appt => {
        const patientEmail = appt.patientEmail.toLowerCase();
        const date = appt.appointmentDate.toLowerCase();
        const time = appt.appointmentTime.toLowerCase();
        return (
          patientEmail.includes(searchTerm.toLowerCase()) ||
          date.includes(searchTerm.toLowerCase()) ||
          time.includes(searchTerm.toLowerCase())
        );
      });
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(appt => appt.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const dateA = a.appointmentDate;
      const dateB = b.appointmentDate;
      return sortOrder === 'asc'
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });

    return filtered;
  }, [appointmentsbydoc, searchTerm, statusFilter, sortOrder]);

  const openEditModal = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    form.setFieldsValue({
      appointmentDate: moment(appointment.appointmentDate, 'DD-MM-YYYY'),
      appointmentTime: moment(appointment.appointmentTime, 'HH:mm'),
      status: appointment.status,
    });
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Delete the old appointment
      await deleteAppointment(editingAppointment!.id);

      // Create a new appointment with updated data
      
      const newAppointmentData = {
        doctorEmail: doctorEmail,
        patientEmail: editingAppointment!.patientEmail,
        appointmentDate: values.appointmentDate.toDate(),
        appointmentTime: values.appointmentTime.format("HH:mm"),
        reason: editingAppointment!.reason,
        status: values.status,
      };

      await addAppointment(newAppointmentData);
      
      // Refresh the appointments list
      const updatedAppointments = await getAppointmentsByDoctor(appointments,doctorEmail);
      setAppointmentsbydoc(updatedAppointments);

      setEditingAppointment(null);
      form.resetFields();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    form.resetFields();
  };

  const columns = [
    { title: 'Patient', dataIndex: ['patientEmail', 'stringValue'], key: 'patient' },
    { title: 'Date', dataIndex: ['appointmentDate', 'stringValue'], key: 'date' },
    { title: 'Time', dataIndex: ['appointmentTime', 'stringValue'], key: 'time' },
    {
      title: 'Status',
      dataIndex: ['status', 'stringValue'],
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'confirmed' ? 'green' : status === 'pending' ? 'gold' : 'red'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Appointment) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={4} style={{ marginBottom: 16 }}>
        My Appointments
      </Typography.Title>

      {/* Filters */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} md={8}>
          <Input 
            placeholder="Search by patient, date, or time" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select 
            value={statusFilter} 
            onChange={value => setStatusFilter(value)}
            style={{ width: '100%' }}
          >
            <Select.Option value="all">All Statuses</Select.Option>
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="confirmed">Confirmed</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="canceled">Canceled</Select.Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select 
            value={sortOrder} 
            onChange={value => setSortOrder(value)} 
            style={{ width: '100%' }}
          >
            <Select.Option value="asc">Ascending</Select.Option>
            <Select.Option value="desc">Descending</Select.Option>
          </Select>
        </Col>
      </Row>

      {/* Appointments Table */}
      <Table
        columns={columns}
        dataSource={filteredAppointments}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
      />

      {/* Edit Appointment Modal */}
      <Modal
        title="Edit Appointment"
        visible={!!editingAppointment}
        onOk={handleEditSubmit}
        onCancel={handleCancelEdit}
        okText="Update"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="appointmentDate"
            label="Date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
          </Form.Item>
          <Form.Item
            name="appointmentTime"
            label="Time"
            rules={[{ required: true, message: 'Please select a time' }]}
          >
            <TimePicker style={{ width: '100%' }} format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select style={{ width: '100%' }}>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="confirmed">Confirmed</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
              <Select.Option value="canceled">Canceled</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DoctorAppointmentsTable;
