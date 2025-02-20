import React from "react";
import { Modal, Form, DatePicker, TimePicker, Select, Button } from "antd";
import moment from "moment";
import { Appointment } from "../../../../Types";
import { useLoggedInUser } from "../../../../hooks/LoggedinUserContext";

interface EditAppointmentModalProps {
  editingAppointment: Appointment | null;
  setEditingAppointment: (appointment: Appointment | null) => void;
  updateAppointment: (id: string, updatedData: Partial<Appointment>) => Promise<void>;
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  editingAppointment,
  setEditingAppointment,
  updateAppointment,
}) => {
  const [form] = Form.useForm();
  const { loggedInUser } = useLoggedInUser();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (!editingAppointment || !loggedInUser) return;

      // Convert moment objects to proper Date and string formats
      const updatedData: Partial<Appointment> = {
        ...editingAppointment,
        appointmentDate: values.appointmentDate.toDate(), // Convert moment to Date
        appointmentTime: values.appointmentTime.format('HH:mm'),
        status: values.status
      };

      await updateAppointment(editingAppointment.id, updatedData);
      setEditingAppointment(null);
      form.resetFields();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <Modal
      title="Edit Appointment"
      visible={!!editingAppointment}
      onCancel={() => setEditingAppointment(null)}
      onOk={handleSubmit}
      footer={[
        <Button key="cancel" onClick={() => setEditingAppointment(null)}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Save Changes
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          appointmentDate: editingAppointment?.appointmentDate 
            ? moment(editingAppointment.appointmentDate)
            : null,
          appointmentTime: editingAppointment?.appointmentTime 
            ? moment(editingAppointment.appointmentTime, 'HH:mm')
            : null,
          status: editingAppointment?.status || 'pending'
        }}
      >
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
  );
};

export default EditAppointmentModal;