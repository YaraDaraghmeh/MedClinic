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
  Row,
  Col,
} from "antd";
import moment from "moment";
import { getAppointmentsByDoctor } from "../../../../services/appointmentService";
import { Appointment } from "../../../../Types";
import { useAppointmentsContext } from "../../../../hooks/AppointmentContext";
import { useLoggedInUser } from "../../../../hooks/LoggedinUserContext";
import notesIcon from "../../../../assets/note.png";
import fileIcon from "../../../../assets/file-icon.png";
import videoIcon from "../../../../assets/video-icon.png";
const DoctorAppointmentsTable: React.FC = () => {
  const { loggedInUser } = useLoggedInUser();
  const { appointments, updateAppointment, deleteAppointment } =
    useAppointmentsContext();
  const [appointmentsbydoc, setAppointmentsbydoc] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [form] = Form.useForm();
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notes, setNotes] = useState("");
  const [existingDocs, setExistingDocs] = useState<string[]>([]);
  const [newDocs, setNewDocs] = useState<File[]>([]);
  const [docsToDelete, setDocsToDelete] = useState<string[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [newUrl, setNewUrl] = useState(""); // New state for URL input
  const [newUrls, setNewUrls] = useState<string[]>([]); // Changed from newDocs
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState<string | null>(
    null
  );

  const doctorEmail = loggedInUser?.email;

  useEffect(() => {
    const loadAppointments = async () => {
      if (!doctorEmail) return;
      try {
        const data = getAppointmentsByDoctor(appointments, doctorEmail);
        setAppointmentsbydoc(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [doctorEmail, appointments]);
  const checkFileType = (url: string) => {
    const path = url.split("?")[0];
    const filename = path.split("/").pop() || "";
    const extension = filename.split(".").pop()?.toLocaleLowerCase() || "";
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".bmp",
      ".svg",
      ".webp",
    ];
    const videoExtensions = [".mp4", ".webm", ".avi", ".mov", ".mkv"];

    if (imageExtensions.includes(extension)) return "image";
    if (videoExtensions.includes(extension)) return "video";
    return "file";
  };
  const renderDocumentsSection = (
    title: string,
    urls: string[],
    isExisting = false
  ) => (
    <div className="mt-4 space-y-2">
      <Typography.Text strong>{title}</Typography.Text>
      {urls.length === 0 && (
        <i className="text-gray-400 block ml-4 "> no documents uploaded</i>
      )}
      {urls.map((url, index) => (
        <div
          key={`${url}-${index}`}
          className="flex items-center justify-between"
        >
          {renderFileContent(url, index)}
          <a href={url} target="_blank" rel="noopener" className="truncate">
            {url}
          </a>
          <Button
            type="link"
            danger
            onClick={() =>
              isExisting
                ? setExistingDocs((prev) => prev.filter((_, i) => i !== index))
                : setNewUrls((prev) => prev.filter((_, i) => i !== index))
            }
          >
            ×
          </Button>
        </div>
      ))}
    </div>
  );
  const renderFileContent = (url: string, index: number) => {
    const fileType = checkFileType(url);
    return (
      <div key={`${url}-${index}`}>
        {fileType === "image" ? (
          <img src={url} alt="Preview" style={{ width: 50, height: 50 }} />
        ) : fileType === "video" ? (
          <img
            src={videoIcon}
            alt="Preview"
            style={{ width: 25, height: 25 }}
          />
        ) : (
          <img
            src={fileIcon}
            alt="Preview"
            style={{ width: 25, height: 25, marginRight: 7 }}
          />
        )}
      </div>
    );
  };

  const handleDelete = async () => {
    if (!appointmentToDelete) return;
    try {
      await deleteAppointment(appointmentToDelete);
      const updatedAppointments = getAppointmentsByDoctor(
        appointments,
        doctorEmail!
      );
      setAppointmentsbydoc(updatedAppointments);
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setDeleteConfirmVisible(false);
      setAppointmentToDelete(null);
    }
  };
  const showDeleteConfirm = (appointmentId: string) => {
    setAppointmentToDelete(appointmentId);
    setDeleteConfirmVisible(true);
  };
  const handleAddUrl = () => {
    if (newUrl.trim()) {
      setNewUrls((prev) => [...prev, newUrl.trim()]);
      setNewUrl(""); // Clear input after adding
    }
  };
  // Filtering logic
  const filteredAppointments = useMemo(() => {
    let filtered = appointmentsbydoc;

    if (searchTerm) {
      filtered = filtered.filter((appt) => {
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

    if (statusFilter !== "all") {
      filtered = filtered.filter((appt) => appt.status === statusFilter);
    }

    filtered.sort((a, b) => {
      const dateA = a.appointmentDate;
      const dateB = b.appointmentDate;
      return sortOrder === "asc"
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });

    return filtered;
  }, [appointmentsbydoc, searchTerm, statusFilter, sortOrder]);
  const isDateExceeding = useMemo(() => {
    if (!editingAppointment) return false;
    const selectedDate = moment(form.getFieldValue("appointmentDate"), "YYYY-MM-DD");
    return selectedDate.isBefore(moment().startOf("day")); 
  }, [form, editingAppointment]);
  
  const openEditModal = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    form.setFieldsValue({
      appointmentDate: moment(appointment.appointmentDate, "DD-MM-YYYY"),
      appointmentTime: moment(appointment.appointmentTime, "HH:mm"),
      status: appointment.status,
    });
  };
  
  const handleEditSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedData = {
        doctorEmail: doctorEmail!,
        patientEmail: editingAppointment!.patientEmail,
        appointmentDate: values.appointmentDate.format("YYYY-MM-DD"),
        appointmentTime: values.appointmentTime.format("HH:mm"),
        reason: editingAppointment!.reason,
        status: values.status,
      };

      await updateAppointment(editingAppointment!.id, updatedData);

      const updatedAppointments = getAppointmentsByDoctor(
        appointments,
        doctorEmail!
      );
      setAppointmentsbydoc(updatedAppointments);

      setEditingAppointment(null);
      form.resetFields();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    form.resetFields();
  };

  // Add notes modal logic
  const handleShowNotesModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setNotes(appointment.note || "");
    setExistingDocs(appointment.documents || []);
    setNewUrls([]);
    setDocsToDelete([]);
    setShowNotesModal(true);
  };
  const handleCloseNotesModal = () => {
    setShowNotesModal(false);
    setNotes("");
    setExistingDocs([]);
    setNewDocs([]);
    setDocsToDelete([]);
    setSelectedAppointment(null);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewDocs([...newDocs, ...Array.from(e.target.files)]);
    }
  };
  const handleSaveNotes = async () => {
    try {
      // Combine existing (filtered) docs with new URLs
      const updatedDocs = [
        ...existingDocs.filter((url) => !docsToDelete.includes(url)),
        ...newUrls,
      ];

      if (selectedAppointment) {
        await updateAppointment(selectedAppointment.id, {
          note: notes,
          documents: updatedDocs,
        });

        setAppointmentsbydoc((prev) =>
          prev.map((appt) =>
            appt.id === selectedAppointment.id
              ? { ...appt, note: notes, documents: updatedDocs }
              : appt
          )
        );
      }

      handleCloseNotesModal();
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const columns = [
    { title: "Patient", dataIndex: ["patientEmail"], key: "patient" },
    { title: "Date", dataIndex: ["appointmentDate"], key: "date" },
    { title: "Time", dataIndex: ["appointmentTime"], key: "time" },
    {
      title: "Status",
      dataIndex: ["status"],
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "confirmed"
              ? "green"
              : status === "pending"
                ? "yellow"
                : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Appointment) => (
        <Space>
          <Button
            type="primary" 
            disabled={isDateExceeding}
            onClick={() => openEditModal(record)}
           
            className="text-white bg-blue-500 hover:bg-blue-600"
          >
            Edit
          </Button>
          <Button
            type="default"
            onClick={() => showDeleteConfirm(record.id)}
            className="!text-white !border-0 !bg-red-500 hover:!bg-red-600"
          >
            Delete
          </Button>
          <Button
            type="default"
            onClick={() => handleShowNotesModal(record)}
            className="text-white bg-gray-500 hover:bg-gray-600"
          >
            <img src={notesIcon} alt="Notes" height={23} width={23} />
            {record.note ? "Update Note" : "Add Note"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <Typography.Title level={4} className="text-center text-blue-700 mb-4">
        My Appointments
      </Typography.Title>

      {/* Filters */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <Input
            placeholder="Search by patient, date, or time"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Select
            value={statusFilter}
            onChange={(value) => setStatusFilter(value)}
            className="w-full border-2 border-gray-300 rounded-lg"
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
            onChange={(value) => setSortOrder(value)}
            className="w-full border-2 border-gray-300 rounded-lg"
          >
            <Select.Option value="asc">Ascending</Select.Option>
            <Select.Option value="desc">Descending</Select.Option>
          </Select>
        </Col>
      </Row>

      {/* Appointments Table with Zebra Stripe */}
      <Table
        columns={columns}
        dataSource={filteredAppointments}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        scroll={{ x: true }}
        className="shadow-md table-zebra-striped"
        rowClassName={(record, index) =>
          index % 2 === 0 ? "bg-gray-100" : "bg-white"
        }
      />
 <Modal
  title={
    <span className="text-xl font-bold text-red-500 !important">
      Confirm Deletion
    </span>
  }
  open={deleteConfirmVisible}
  onOk={handleDelete}
  onCancel={() => setDeleteConfirmVisible(false)}
  okText="Yes, Delete"
  cancelText="Cancel"
  className="!rounded-lg  !border-none"
  okButtonProps={{
    className:
      "!bg-red-600 hover:!bg-red-700 !text-white !font-semibold !px-5 !py-2 !rounded-lg !transition-all !duration-300 !ease-in-out !shadow-md",
  }}
  cancelButtonProps={{
    className:
      "!bg-gray-700 hover:!bg-gray-600 !text-gray-300 !font-semibold !px-5 !py-2 !rounded-lg !transition-all !duration-300 !ease-in-out !shadow-md",
  }}
>
  <div className="flex flex-col items-center justify-center  space-y-3">
    <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <p className="!text-gray-600 text-center !important">
      Are you sure you want to delete this appointment?  
      <span className="text-red-400 !font-medium"> This action cannot be undone.</span>
    </p>
  </div>
</Modal>



      {/* Add Note Modal */}
      <Modal
        title={selectedAppointment?.note ? "Update Note" : "Add Note"}
        open={showNotesModal}
        onOk={handleSaveNotes}
        onCancel={handleCloseNotesModal}
      >
        <Form layout="vertical">
          <Form.Item label="Note">
            <Input.TextArea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </Form.Item>

          <Form.Item label="Document URLs">
            <div className="flex gap-2 mb-2">
              <Input
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Enter document URL"
                onPressEnter={handleAddUrl}
              />
              <Button onClick={handleAddUrl} type="primary">
                Add URL
              </Button>
            </div>

            {renderDocumentsSection("Existing Documents", existingDocs, true)}
            {renderDocumentsSection("New Documents", newUrls)}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DoctorAppointmentsTable;
