import { useState } from "react";
import { Appointment } from "../../Types";

interface AppointmentItemProps {
  appt: Appointment;
  handleStatusChange: (id: string, newStatus: string) => void;
  handleNoteSave: (id: string, note: string) => void;
}

export default function AppointmentItem({
  appt,
  handleStatusChange,
  handleNoteSave,
}: AppointmentItemProps) {
  const [newNote, setNewNote] = useState(appt.notes?.stringValue || "");
  const [showNoteInput, setShowNoteInput] = useState(false);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
    canceled: "bg-red-100 text-red-800",
  };

  const formatDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("-");
    return new Date(`${year}-${month}-${day}`).toLocaleDateString();
  };

  return (
    <div className="p-4 border rounded hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{appt.patientEmail.stringValue}</h3>
          <p className="text-gray-600">{formatDate(appt.appointmentDate.stringValue)}</p>
          <p className="text-gray-600">{appt.appointmentTime.stringValue}</p>
          <span
            className={`px-2 py-1 text-sm rounded ${
              statusColors[appt.status.stringValue as keyof typeof statusColors]
            }`}
          >
            {appt.status.stringValue}
          </span>
        </div>

        <div className="flex gap-2">
          <select
            value={appt.status.stringValue}
            onChange={(e) => handleStatusChange(appt.id, e.target.value)}
            className="p-1 border rounded"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
          <button
            onClick={() => setShowNoteInput(!showNoteInput)}
            className="px-2 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            {showNoteInput ? "Cancel" : appt.notes ? "Edit Note" : "Add Note"}
          </button>
        </div>
      </div>

      {showNoteInput && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="p-2 border rounded flex-1"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter notes..."
          />
          <button
            onClick={() => {
              handleNoteSave(appt.id, newNote);
              setShowNoteInput(false);
            }}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      )}

      {appt.notes?.stringValue && (
        <p className="mt-2 text-gray-600">Note: {appt.notes.stringValue}</p>
      )}
    </div>
  );
}