import React from 'react';
import StatusDropdown from './StatusDropdown';
import { Calendar, Building2, LinkIcon, Briefcase, Pencil, Trash2 } from 'lucide-react';

type Job = {
  id: number;
  title: string;
  company: string;
  date_applied: string;
  start_date?: string;
  status: string;
  type: string;
  link?: string;
};

type Props = {
  job: Job;
  onStatusChange: (id: number, newStatus: string) => void;
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
};

const statusColors: Record<string, string> = {
  Applied: 'bg-blue-600',
  Interview: 'bg-yellow-500',
  Offer: 'bg-green-500',
  Rejected: 'bg-red-500',
};

const typeColors: Record<string, string> = {
  Internship: 'bg-cyan-600',
  'Entry-Level': 'bg-emerald-600',
  'Co-Op': 'bg-indigo-600',
  Both: 'bg-purple-600',
};

const JobCard = ({ job, onStatusChange, onEdit,onDelete }: Props) => {
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg transition hover:scale-[1.01] hover:shadow-xl duration-200">
      {/* ✏️ Edit + 🗑️ Delete Buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={() => onEdit(job)}
            className="p-1 rounded hover:bg-gray-700 transition"
            title="Edit Job"
          >
            <Pencil className="w-4 h-4 text-gray-400 hover:text-blue-400" />
          </button>
          <button
            onClick={() => onDelete(job.id)}
            className="p-1 rounded hover:bg-red-700 transition"
            title="Delete Job"
          >
            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-400" />
          </button>
        </div>
      {/* Main */}
      <div className="flex-1 space-y-1.5">
        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-white" />
          {job.title}
        </h2>

        <p className="text-sm text-gray-300 flex items-center gap-1">
          <Building2 className="w-4 h-4" />
          {job.company}
        </p>

        <p className="text-xs text-gray-400 flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Applied: {job.date_applied}
        </p>

        {job.start_date && (
          <p className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Start: {job.start_date}
          </p>
        )}

        <p className="text-xs text-gray-300 flex items-center gap-1">
          🧠 Type:{' '}
          <span className={`ml-1 px-2 py-0.5 rounded text-xs text-white ${typeColors[job.type] || 'bg-gray-600'}`}>
            {job.type}
          </span>
        </p>

        {job.link && (
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline block pt-1 flex items-center gap-1"
          >
            <LinkIcon className="w-4 h-4" />
            View Posting
          </a>
        )}
      </div>

      <div className="flex flex-col sm:items-end gap-2">
        <label htmlFor="status" className="text-xs text-gray-400">
          Status
        </label>
        <StatusDropdown value={job.status} onChange={(newStatus) => onStatusChange(job.id, newStatus)} />
      </div>
    </div>
  );
};

export default JobCard;
