import { useState } from 'react';
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
  
const jobTypes = ['Internship', 'Co-Op', 'Both', 'Entry-Level'];
const statuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
type Props = {
jobToEdit?: Job | null;
  onClose: () => void;
  onSubmit: (jobData: any) => void;
};

const AddJob = ({ jobToEdit, onClose, onSubmit }: Props) => {
    const [form, setForm] = useState({
      title: jobToEdit?.title || '',
      company: jobToEdit?.company || '',
      date_applied: jobToEdit?.date_applied || '',
      start_date: jobToEdit?.start_date || '',
      type: jobToEdit?.type || 'Internship',
      status: jobToEdit?.status || 'Applied',
      link: jobToEdit?.link || '',
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  onSubmit(form); // we send this back to Jobs.tsx
};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-md space-y-4 shadow-lg"
      >
        <h2 className="text-xl font-bold text-blue-400">Add Job</h2>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
          className="w-full px-3 py-2 rounded bg-gray-700 placeholder-gray-400"
        />

        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company"
          required
          className="w-full px-3 py-2 rounded bg-gray-700 placeholder-gray-400"
        />

        <input
          type="date"
          name="date_applied"
          value={form.date_applied}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 rounded bg-gray-700"
        />

        <input
          type="text"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700"
        />

        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700"
        >
          {jobTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded bg-gray-700"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          type="url"
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Job link (optional)"
          className="w-full px-3 py-2 rounded bg-gray-700 placeholder-gray-400"
        />

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-sm px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
          >
            Cancel
          </button>
          <button type="submit" className="text-sm px-4 py-2 rounded bg-blue-600 hover:bg-blue-700">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
