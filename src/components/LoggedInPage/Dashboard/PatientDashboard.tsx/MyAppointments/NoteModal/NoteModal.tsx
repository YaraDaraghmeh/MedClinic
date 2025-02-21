import React from "react";
import { Appointment } from "../../../../../../Types";
import './NoteModal.css';
interface NoteModalProps {
  showNoteModal: boolean;
  setShowNoteModal: (value: boolean) => void;
  selectedAppointment: Appointment | null;
}

const NoteModal: React.FC<NoteModalProps> = ({
  showNoteModal,
  setShowNoteModal,
  selectedAppointment,
}) => {
  if (!showNoteModal || !selectedAppointment) return null;

  return (
    <div className="note-modal">
      <div className="note-modal-content">
        <h3>Note from Doctor</h3>
        <p className="note-text">{selectedAppointment.note}</p>

        {selectedAppointment.documents && selectedAppointment.documents.length > 0 && (
          <div className="documents-section">
            <h4>Documents:</h4>
            <ul className="documents-list">
              {selectedAppointment.documents.map((document, index) => (
                <li key={index}>
                  <a
                    href={document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    <i className="fas fa-file-alt" style={{ marginRight: "3px" }}></i> Document {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={() => setShowNoteModal(false)} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

export default NoteModal;