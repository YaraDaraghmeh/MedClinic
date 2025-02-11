import { Dispatch, SetStateAction } from "react";

interface AppointmentsControlsProps {
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
}

export default function AppointmentsControls({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}: AppointmentsControlsProps) {
  return (
    <div className="flex gap-4 mb-6">
      <input
        type="text"
        placeholder="Search patients..."
        className="p-2 border rounded flex-1"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select
        className="p-2 border rounded"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="All">All Statuses</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
        <option value="canceled">Canceled</option>
      </select>
    </div>
  );
}