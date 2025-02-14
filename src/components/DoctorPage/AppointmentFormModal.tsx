
import React from 'react';
import { Modal, Form, Input, DatePicker, Button } from 'antd';
import { FormValues } from '../../Types';

interface AppointmentFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: FormValues) => void;
  form: any;
}

const AppointmentFormModal: React.FC<AppointmentFormModalProps> = ({ visible, onCancel, onSave, form }) => {
  return (
    <Modal title="Add Appointment" visible={visible} onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={onSave}>
        <Form.Item name="patient" label="Patient" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="time" label="Time" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AppointmentFormModal;