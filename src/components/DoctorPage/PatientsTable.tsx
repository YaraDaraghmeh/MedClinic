// components/Dashboard/PatientsTable.tsx
import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { User } from '../../Types';  

interface PatientsTableProps {
  patients: User[];
  onEdit: (record: User) => void;
  onDelete: (id: number) => void;
}
const getAge = (birthdate: string): number => {
    const birthDateObj = new Date(birthdate); // Convert string to Date object
    const today = new Date();
  
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
  
    // Check if birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
  
    return age;
  };

const PatientsTable: React.FC<PatientsTableProps> = ({ patients, onEdit, onDelete }) => {
interface ColumnType {
    title: string;
    dataIndex?: string;
    key: string;
    sorter?: (a: User, b: User) => number;
    render?: (_: any, record: User) => JSX.Element;
}

const columns: ColumnType[] = [
    { title: 'Name', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.stringValue.localeCompare(b.name.stringValue) },
    { title: 'Age', dataIndex: 'age', key: 'age', sorter: (a, b) => getAge(a.dateOfBirth.stringValue) - getAge(b.dateOfBirth.stringValue) },
    { title: 'Gender', dataIndex: 'gender', key: 'gender' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Phone', dataIndex: 'phone', key: 'phone' },
    { title: 'Address', dataIndex: 'address', key: 'address' },
    {
        title: 'Actions',
        key: 'actions',
        render: (_: any, record: User) => (
            <Space>
                <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
                
            </Space>
        ),
    },
];

  return (
    <Table
      dataSource={patients}
      columns={columns}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      scroll={{ x: true }}
    />
  );
};

export default PatientsTable;