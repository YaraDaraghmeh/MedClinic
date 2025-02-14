
import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { Appointment } from '../../Types';

interface AppointmentsTableProps {
  appointments: Appointment[];
  onEdit: (record: Appointment) => void;
  onDelete: (id: number) => void;
}

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({ appointments, onEdit, onDelete }) => {
interface Column {
    title: string;
    dataIndex?: string;
    key: string;
    sorter?: (a: any, b: any) => number;
    render?: (text: any, record: Appointment) => JSX.Element;
}

const columns: Column[] = [
    { title: '#', dataIndex: 'id', key: 'id', sorter: (a, b) => a.id - b.id },
    { title: 'Patient', dataIndex: 'patient', key: 'patient', sorter: (a, b) => a.patient.localeCompare(b.patient) },
    { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a, b) => a.age - b.age },
    { title: 'Date', dataIndex: 'date', key: 'date', sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() },
    { title: 'Time', dataIndex: 'time', key: 'time' },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: string) => (
            <Tag color={status === 'Confirmed' ? 'green' : status === 'Pending' ? 'gold' : 'gray'}>
                {status}
            </Tag>
        ),
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_: any, record: Appointment) => (
            <Space>
                <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
                <Button type="link" danger onClick={() => onDelete(parseInt(record.id, 10))}>Delete</Button>
            </Space>
        ),
    },
];

  return (
    <Table
      dataSource={appointments}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      scroll={{ x: true }}
    />
  );
};

export default AppointmentsTable;