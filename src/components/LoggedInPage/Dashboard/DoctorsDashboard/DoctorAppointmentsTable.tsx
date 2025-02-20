import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Typography,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Alert,
} from "antd";
import moment from "moment";
import {
  SearchOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  DeleteOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  FileImageOutlined,
  EditOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { getAppointmentsByDoctor } from "../../../../services/appointmentService";
import { Appointment } from "../../../../Types";
import { useAppointmentsContext } from "../../../../hooks/AppointmentContext";
import { useLoggedInUser } from "../../../../hooks/LoggedinUserContext";

const statusColorConfig: Record<string, { bg: string; text: string; border: string }> = {
  confirmed: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
  completed: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
  canceled: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
};
const STATUS_COLORS = {
  pending: {
    backgroundColor: '#fffbeb',  
    textColor: '#b45309',       
    borderColor: '#f59e0b',       
  },
  confirmed: {
    backgroundColor: '#ecfdf5',   
    textColor: '#047857',         
    borderColor: '#10b981',      
  },
  completed: {
    backgroundColor: '#eff6ff',   
    textColor: '#1d4ed8',         
    borderColor: '#3b82f6',       
  },
  canceled: {
    backgroundColor: '#fef2f2',   
    textColor: '#b91c1c',         
    borderColor: '#ef4444',       
  },
};

const DoctorAppointmentsTable: React.FC = () => {
  const { loggedInUser } = useLoggedInUser();
  const { appointments, updateAppointment, deleteAppointment } = useAppointmentsContext();
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [form] = Form.useForm();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [existingDocs, setExistingDocs] = useState<string[]>([]);
  const [newUrls, setNewUrls] = useState<string[]>([]);
  const [docsToDelete, setDocsToDelete] = useState<string[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [newUrl, setNewUrl] = useState("");
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(null);

  useEffect(() => {
    const loadAppointments = () => {
      if (!loggedInUser?.email) return;
      try {
        const data = getAppointmentsByDoctor(appointments, loggedInUser.email);
        setFilteredAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAppointments();
  }, [loggedInUser?.email, appointments]);

  const checkFileType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) return 'image';
    if (['mp4', 'mov', 'avi'].includes(extension || '')) return 'video';
    if (['pdf', 'doc', 'docx'].includes(extension || '')) return 'document';
    return 'file';
  };

  const renderFileIcon = (url: string) => {
    const type = checkFileType(url);
    const iconProps = { className: "text-lg mr-2" };
    switch (type) {
      case 'image': return <FileImageOutlined {...iconProps} />;
      case 'video': return <VideoCameraOutlined {...iconProps} />;
      case 'document': return <FileTextOutlined {...iconProps} />;
      default: return <FileTextOutlined {...iconProps} />;
    }
  };

  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!editingAppointment) return;
  
      const updatedData = {
        ...editingAppointment,
        appointmentDate: values.appointmentDate.format('YYYY-MM-DD'),
        appointmentTime: values.appointmentTime.format('HH:mm'),
        status: values.status,
      };
  
      await updateAppointment(editingAppointment.id, updatedData);
      setEditingAppointment(null);
      form.resetFields();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const columns = [
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
        const appointmentTime = moment(record.appointmentTime, 'HH:mm:ss');
        const isPast = appointmentDate.isBefore(moment(), 'day');
    
        return (
          <div className="flex flex-col">
            <span className={`font-semibold ${isPast ? 'text-gray-400' : 'text-blue-600'}`}>
              {appointmentDate.isValid() 
                ? appointmentDate.format('DD MMM YYYY')
                : 'Invalid Date'}
            </span>
            <span className={`text-sm ${isPast ? 'text-gray-400' : 'text-blue-600'}`}>
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
      render: (status: keyof typeof STATUS_COLORS) => {
        const statusConfig = STATUS_COLORS[status] || STATUS_COLORS.pending;
        
        return (
          <Tag
            style={{
              backgroundColor: statusConfig.backgroundColor,
              color: statusConfig.textColor,
              border: `1px solid ${statusConfig.borderColor}`,
              borderRadius: '20px',
              padding: '4px 12px',
              fontWeight: 500,
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Appointment) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingAppointment(record);
              form.setFieldsValue({
                appointmentDate: moment(record.appointmentDate),
                appointmentTime: moment(record.appointmentTime, 'HH:mm'),
                status: record.status
              });
            }}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setAppointmentToDelete(record.id);
              setDeleteConfirmVisible(true);
            }}
          >
            Delete
          </Button>
          <Button 
            onClick={() => {
              setSelectedAppointment(record);
              setNotes(record.note || '');
              setExistingDocs(record.documents || []);
              setNewUrls([]);
              setDocsToDelete([]);
              setShowNotesModal(true);
            }}
          >
            Notes
          </Button>
        </Space>
      )
    }
  ];

  const filteredData = useMemo(() => {
    let data = [...filteredAppointments];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      data = data.filter(appt => {
        return (
          appt.patientEmail.toLowerCase().includes(lowerSearch) ||
          moment(appt.appointmentDate).format('DD/MM/YYYY').includes(lowerSearch) ||
          moment(appt.appointmentTime, 'HH:mm').format('hh:mm A').toLowerCase().includes(lowerSearch)
        );
      });
    }
  

    if (statusFilter !== 'all') {
      data = data.filter(appt => appt.status.toLowerCase() === statusFilter.toLowerCase());
    }
  

    return data.sort((a, b) => {
      const dateA = moment(a.appointmentDate);
      const dateB = moment(b.appointmentDate);
      return sortOrder === 'asc' ? dateA.diff(dateB) : dateB.diff(dateA);
    });
  }, [filteredAppointments, searchTerm, statusFilter, sortOrder]);

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <Typography.Title level={3} className="!mb-2">
          Appointment Management
        </Typography.Title>
        <Typography.Text type="secondary">
          Manage your upcoming patient appointments
        </Typography.Text>
      </div>

      <div className="flex flex-col gap-4 mb-6 lg:flex-row">
        <Input
          placeholder="Search appointments..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="lg:w-64"
        />
        
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          suffixIcon={<FilterOutlined />}
          className="lg:w-48"
        >
          <Select.Option value="all">All Statuses</Select.Option>
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="confirmed">Confirmed</Select.Option>
          <Select.Option value="completed">Completed</Select.Option>
          <Select.Option value="canceled">Canceled</Select.Option>
        </Select>

        <Button
          icon={sortOrder === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
          onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
        >
          Sort {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        className="rounded-md"
        rowClassName="hover:bg-gray-50"
      />

      {/* Edit Modal */}
      <Modal
        title="Edit Appointment"
        open={!!editingAppointment}
        onCancel={() => setEditingAppointment(null)}
        onOk={handleEditSubmit}
        footer={[
          <Button key="cancel" onClick={() => setEditingAppointment(null)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditSubmit}>
            Save Changes
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Appointment Date"
            name="appointmentDate"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker
              format="YYYY-MM-DD"
              disabledDate={(current) => current && current < moment().endOf('day')}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Appointment Time"
            name="appointmentTime"
            rules={[{ required: true, message: 'Please select a time' }]}
          >
            <TimePicker
              format="HH:mm"
              minuteStep={15}
              className="w-full"
            />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select>
              <Select.Option value="pending">
                <span className="text-yellow-600">Pending</span>
              </Select.Option>
              <Select.Option value="confirmed">
                <span className="text-green-600">Confirmed</span>
              </Select.Option>
              <Select.Option value="completed">
                <span className="text-blue-600">Completed</span>
              </Select.Option>
              <Select.Option value="canceled">
                <span className="text-red-600">Canceled</span>
              </Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Notes Modal */}
      <Modal
        title={<span className="text-blue-600">Patient Notes & Documents</span>}
        open={showNotesModal}
        onCancel={() => setShowNotesModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowNotesModal(false)}>
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={async () => {
              if (selectedAppointment) {
                const updatedDocs = [
                  ...existingDocs.filter(url => !docsToDelete.includes(url)),
                  ...newUrls
                ];
                
                await updateAppointment(selectedAppointment.id, {
                  ...selectedAppointment,
                  appointmentDate: moment(selectedAppointment.appointmentDate, 'YYYY-MM-DD').toDate(),
                  note: notes,
                  documents: updatedDocs
                });
                setShowNotesModal(false);
              }
            }}
          >
            Save
          </Button>,
        ]}
        width={800}
      >
        <div className="space-y-4">
          <Input.TextArea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add clinical notes..."
            rows={4}
            className="rounded-lg"
          />

          <div className="border-t pt-4">
            <Typography.Title level={5} className="!mb-4">
              Attached Documents
            </Typography.Title>
            
            <div className="flex gap-2 mb-4">
              <Input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Enter document URL"
                onPressEnter={(e) => {
                  e.preventDefault();
                  if (newUrl.trim()) {
                    setNewUrls(prev => [...prev, newUrl.trim()]);
                    setNewUrl('');
                  }
                }}
                className="flex-1"
              />
              <Button 
                onClick={() => {
                  if (newUrl.trim()) {
                    setNewUrls(prev => [...prev, newUrl.trim()]);
                    setNewUrl('');
                  }
                }}
              >
                Add URL
              </Button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {[...existingDocs, ...newUrls].map((url, index) => (
                <div key={`${url}-${index}`} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <div className="flex items-center flex-1">
                    {renderFileIcon(url)}
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener" 
                      className="ml-2 truncate text-blue-600 hover:underline"
                    >
                      {url.split('/').pop()}
                    </a>
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<CloseOutlined />}
                    onClick={() => {
                      if (existingDocs.includes(url)) {
                        setDocsToDelete(prev => [...prev, url]);
                      }
                      setNewUrls(prev => prev.filter(u => u !== url));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title={<span className="text-red-600">Confirm Deletion</span>}
        open={deleteConfirmVisible}
        onOk={async () => {
          if (appointmentToDelete) {
            await deleteAppointment(appointmentToDelete);
            setDeleteConfirmVisible(false);
            setFilteredAppointments(prev => 
              prev.filter(appt => appt.id !== appointmentToDelete)
            );
          }
        }}
        onCancel={() => setDeleteConfirmVisible(false)}
        okText="Delete"
        okButtonProps={{
          className: 'bg-red-600 hover:bg-red-700 text-white',
        }}
        cancelText="Cancel"
      >
        <Alert
          message="Warning"
          description="Are you sure you want to delete this appointment? This action cannot be undone."
          type="error"
          showIcon
          className="border-red-200 bg-red-50"
        />
      </Modal>
    </div>
  );
};

export default DoctorAppointmentsTable;