import { Modal, Alert } from "antd";

interface DeleteConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      title={<span className="text-red-600">Confirm Deletion</span>}
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
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
  );
};

export default DeleteConfirmationModal;