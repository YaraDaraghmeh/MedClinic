// components/Dashboard/PatientFormModal.tsx
import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { User } from '../../Types';

interface PatientFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSave: (values: User) => void;
  form: any;
}

const PatientFormModal: React.FC<PatientFormModalProps> = ({ visible, onCancel, onSave, form }) => {
  return (
    <Modal title="Add Patient" visible={visible} onCancel={onCancel} footer={null}>
      <Form form={form} onFinish={onSave}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="age" label="Age" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Address" rules={[{ required: true }]}>
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

export default PatientFormModal;