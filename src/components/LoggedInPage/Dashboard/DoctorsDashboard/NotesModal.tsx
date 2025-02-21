import { Modal, Input, Typography, Button } from "antd";
import DocumentsList from "../DoctorsDashboard/DocumentsList";
import { useState } from "react";

const NotesModal = ({
  showNotesModal,
  setShowNotesModal,
  selectedAppointment,
  updateAppointment
}: any) => {
  const [notes, setNotes] = useState(selectedAppointment?.note || '');
  const [newUrls, setNewUrls] = useState<string[]>([]);
  const [docsToDelete, setDocsToDelete] = useState<string[]>([]);

  const handleSave = async () => {
    if (selectedAppointment) {
      const updatedDocs = [
        ...(selectedAppointment.documents || []).filter((url: string) => !docsToDelete.includes(url)),
        ...newUrls
      ];
      
      await updateAppointment(selectedAppointment.id, {
        ...selectedAppointment,
        note: notes,
        documents: updatedDocs,
        readNote:false,
      });
      setShowNotesModal(false);
    }
  };

  return (
    <Modal
      title="Patient Notes & Documents"
      open={showNotesModal}
      onCancel={() => setShowNotesModal(false)}
      onOk={handleSave}
      width={800}
    >
      <div className="space-y-4">
        <Input.TextArea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add clinical notes..."
          rows={4}
        />
        <DocumentsList
          existingDocs={selectedAppointment?.documents || []}
          newUrls={newUrls}
          setNewUrls={setNewUrls}
          docsToDelete={docsToDelete}
          setDocsToDelete={setDocsToDelete}
        />
      </div>
    </Modal>
  );
};

export default NotesModal;