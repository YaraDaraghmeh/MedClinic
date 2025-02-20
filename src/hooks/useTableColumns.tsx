import { Button, Space, Tag } from "antd";
import moment from 'moment';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Appointment } from "../Types";
import StatusTag from "../components/LoggedInPage/Dashboard/DoctorsDashboard/StatusTag";

const useTableColumns = (props: any) => {
  const columns: ColumnsType<Appointment> = [
    {
      title: 'Patient',
      dataIndex: 'patientEmail',
      key: 'patient',
      render: (email: string) => <span className="font-medium">{email}</span>
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (record: Appointment) => {
        const appointmentDate = moment(record.appointmentDate, 'YYYY-MM-DD');
        const appointmentTime = moment(record.appointmentTime, 'HH:mm');
        
        return (
          <div className="flex flex-col">
            <span className="font-semibold text-blue-600">
              {appointmentDate.isValid() 
                ? appointmentDate.format('DD MMM YYYY')
                : 'Invalid Date'}
            </span>
            <span className="text-sm text-blue-600">
              {appointmentTime.isValid()
                ? appointmentTime.format('h:mm A')
                : 'Invalid Time'}
            </span>
          </div>
        );
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <StatusTag status={status} />
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Appointment) => (
        <ActionButtons record={record} {...props} />
      )
    }
  ];
  return columns;
};

const DateTimeCell = ({ appointmentDate, appointmentTime }: { 
  appointmentDate: string; 
  appointmentTime: string 
}) => {
  const date = moment(appointmentDate, 'YYYY-MM-DD');
  const time = moment(appointmentTime, 'HH:mm:ss');
  const isPast = date.isBefore(moment(), 'day');

  return (
    <div className="flex flex-col">
      <span className={`font-semibold ${isPast ? 'text-gray-400' : 'text-blue-600'}`}>
        {date.isValid() ? date.format('DD MMM YYYY') : 'Invalid Date'}
      </span>
      <span className={`text-sm ${isPast ? 'text-gray-400' : 'text-blue-600'}`}>
        {time.isValid() ? time.format('h:mm A') : 'Invalid Time'}
      </span>
    </div>
  );
};

const ActionButtons = ({ record, ...props }: any) => (
  <Space>
    <Button
      icon={<EditOutlined />}
      onClick={() => {
        props.setEditingAppointment(record);
        // Additional form setup if needed
      }}
    >
      Edit
    </Button>
    <Button
      danger
      icon={<DeleteOutlined />}
      onClick={() => {
        props.setAppointmentToDelete(record.id);
        props.setDeleteConfirmVisible(true);
      }}
    >
      Delete
    </Button>
    <Button onClick={() => {
      props.setSelectedAppointment(record);
      props.setShowNotesModal(true);
    }}>
      Notes
    </Button>
  </Space>
);

export default useTableColumns;