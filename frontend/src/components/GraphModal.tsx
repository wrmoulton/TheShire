import React from 'react';
import { BarChart3, X } from 'lucide-react';
import Charts from './Charts'; // Make sure this import path is correct

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
  onClose: () => void;
  jobs: Job[]; // 👈 Required jobs prop
};

const GraphModal = ({ onClose, jobs }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-900 w-[90%] max-w-4xl p-6 rounded-2xl shadow-xl border border-gray-700 relative overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-900 z-10">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Job Analytics
          </h2>
          <button className="text-gray-400 hover:text-white" onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ✅ Inject the full chart component */}
        <Charts jobs={jobs} />
      </div>
    </div>
  );
};

export default GraphModal;
